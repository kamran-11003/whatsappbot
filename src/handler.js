// ─── Core Bot Logic ──────────────────────────────────────────────────────────
// Conversation flow:
//   lang_select → location → [service_type (Punjab only)] → category → service_menu → detail
// All service detail responses are bilingual (EN + UR in one message).

const { sendMessage, sendButtons, sendList } = require('./whatsapp');
const { getSession, setSession, softReset, categoryReset, hardReset } = require('./session');
const strings = require('./strings');
const {
  APP_CONFIG,
  SERVICE_TREE,
  getCategories,
  getCategoryById,
  getServiceById,
  LOC_MAP,
} = require('./services');
const { getServiceDetail } = require('./seed');

const norm      = (t) => t.trim();
const normLower = (t) => t.toLowerCase().trim();
const stripEmoji = (t) => t.replace(/[\u00A9\u00AE\u203C-\u3299\uFE0F]|[\u{1F000}-\u{1FFFF}]/gu, '').replace(/\s+/g, ' ').trim();
const trunc     = (t) => { const s = stripEmoji(t); return s.length > 24 ? s.substring(0, 23) + '…' : s; };

// ─── Send language selection buttons ────────────────────────────────────────
async function sendLangButtons(phone, bodyText) {
  await sendButtons(phone, bodyText, [
    { id: '1', title: 'English' },
    { id: '2', title: 'Urdu' },
  ]);
}

// ─── Send province / location selection list ─────────────────────────────────
async function sendLocationMenu(phone, lang, s) {
  await sendList(
    phone,
    s.locationListBody,
    lang === 'ur' ? 'صوبہ منتخب کریں' : 'Select Province',
    [{
      title: lang === 'ur' ? 'صوبے / مقامات' : 'Provinces / Locations',
      rows: [
        { id: 'loc_1', title: lang === 'ur' ? 'اسلام آباد (وفاقی)' : 'Islamabad (Federal)' },
        { id: 'loc_2', title: lang === 'ur' ? 'پنجاب'              : 'Punjab' },
        { id: 'loc_3', title: lang === 'ur' ? 'خیبر پختونخواہ'    : 'KPK' },
        { id: 'loc_4', title: lang === 'ur' ? 'سندھ'               : 'Sindh' },
      ],
    }]
  );
}

// ─── Send Punjab service type buttons (Citizen / Business) ───────────────────
async function sendServiceTypeButtons(phone, lang, s) {
  await sendButtons(phone, s.askServiceType, [
    { id: 'stype_citizen',  title: lang === 'ur' ? 'شہری خدمات'    : 'Citizen Services' },
    { id: 'stype_business', title: lang === 'ur' ? 'کاروباری خدمات' : 'Business Services' },
  ]);
}

// ─── Send category selection list for a province ─────────────────────────────
async function sendCategoryMenu(phone, lang, locationKey, serviceType = null) {
  const s = strings[lang];
  const cats = getCategories(locationKey, serviceType);
  if (!cats || cats.length === 0) return sendMessage(phone, s.noService);

  const rows = cats.map((cat) => ({
    id: cat.id,
    title: trunc(lang === 'ur' ? cat.labelUr : cat.labelEn),
  }));

  // WhatsApp list max 10 rows — split if needed
  const chunk = rows.slice(0, 10);
  await sendList(
    phone,
    s.askCategory,
    lang === 'ur' ? 'کیٹیگری منتخب کریں' : 'Select Category',
    [{ title: lang === 'ur' ? 'خدمت کیٹیگریز' : 'Service Categories', rows: chunk }]
  );
}

// ─── Send service menu within a category ─────────────────────────────────────
async function sendServiceItemMenu(phone, lang, locationKey, categoryId, serviceType = null) {
  const s = strings[lang];
  const cat = getCategoryById(locationKey, categoryId, serviceType);
  if (!cat) return sendMessage(phone, s.noService);

  const rows = cat.services.map((svc) => ({
    id: svc.id,
    title: trunc(lang === 'ur' ? svc.labelUr : svc.labelEn),
  })).slice(0, 10);

  const catLabel = lang === 'ur' ? cat.labelUr : cat.labelEn;
  const cleanCatLabel = stripEmoji(catLabel);
  const promptText = (locationKey === 'sindh') 
    ? (lang === 'ur' ? 'براہ کرم کوئی خدمت منتخب کریں:' : 'Please choose a service:')
    : s.askServiceItem;

  await sendList(
    phone,
    `${promptText}\n\n*${cleanCatLabel}*`,
    lang === 'ur' ? 'خدمت منتخب کریں' : 'Select Service',
    [{ title: trunc(catLabel), rows }]
  );
}

// ─── Post-detail action buttons ───────────────────────────────────────────────
async function sendNextActions(phone, lang) {
  const s = strings[lang];
  await sendButtons(phone, s.nextAction, [
    { id: 'another_service', title: lang === 'ur' ? 'دوسری خدمت'  : 'Another Service' },
    { id: 'change_location', title: lang === 'ur' ? 'صوبہ بدلیں'  : 'Change Province' },
    { id: 'end_session',     title: lang === 'ur' ? 'اختتام'       : 'End Session' },
  ]);
}

// ─── Settings buttons ─────────────────────────────────────────────────────────
async function sendSettings(phone, lang, s) {
  await sendButtons(phone, s.settingsMenu, [
    { id: 'switch_lang',  title: lang === 'ur' ? 'زبان تبدیل'   : 'Switch Language' },
    { id: 'set_location', title: lang === 'ur' ? 'صوبہ اپڈیٹ'  : 'Update Province' },
    { id: 'restart',      title: lang === 'ur' ? 'دوبارہ شروع'  : 'Restart' },
  ]);
}

// ─── Province name helper ─────────────────────────────────────────────────────
const PROVINCE_LABELS = {
  islamabad: { en: 'Islamabad (Federal)', ur: 'اسلام آباد (وفاقی)' },
  punjab:    { en: 'Punjab',              ur: 'پنجاب' },
  kpk:       { en: 'KPK',                ur: 'خیبر پختونخواہ' },
  sindh:     { en: 'Sindh',              ur: 'سندھ' },
};

// ─── Main message handler ─────────────────────────────────────────────────────
async function handleIncoming(phone, text) {
  const session = getSession(phone);
  const { lang, step } = session;
  const s     = strings[lang];
  const input = norm(text);
  const lower = normLower(text);

  // ══════════════════════════════════════════════════════════════════════════
  // STEP: lang_select — initial language selection
  // ══════════════════════════════════════════════════════════════════════════
  if (step === 'lang_select') {
    if (input === '1') {
      setSession(phone, { lang: 'en', step: 'location' });
      return sendLocationMenu(phone, 'en', strings.en);
    }
    if (input === '2') {
      setSession(phone, { lang: 'ur', step: 'location' });
      return sendLocationMenu(phone, 'ur', strings.ur);
    }
    return sendLangButtons(phone, strings.askLang);
  }

  // ══════════════════════════════════════════════════════════════════════════
  // GLOBAL KEYWORDS (available at any step after lang_select)
  // ══════════════════════════════════════════════════════════════════════════

  // Greetings / Start (Soft Reset)
  if (['hello', 'hi', 'salam', 'السلام علیکم', 'start', 'menu', 'help'].includes(lower) && step !== 'lang_select') {
    hardReset(phone);
    return sendLangButtons(phone, strings.askLang);
  }

  // Global Location Override (Quick Switch)
  if (step !== 'lang_select' && step !== 'location') {
    const locKey = LOC_MAP[lower] || LOC_MAP[input];
    if (locKey) {
      // Force user to location step and re-run handler
      setSession(phone, { step: 'location', location: null, serviceType: null, category: null, service: null });
      return handleIncoming(phone, input);
    }
  }

  // Hard reset
  if (lower === 'reset') {
    hardReset(phone);
    return sendLangButtons(phone, strings.askLang);
  }

  // Settings
  if ((lower === 'settings' || lower === 'ترتیبات') && step !== 'lang_select') {
    setSession(phone, { step: 'settings' });
    return sendSettings(phone, lang, s);
  }

  // Exit / End session
  if (['bye', 'exit', 'quit', 'end', 'باہر', 'خروج', 'end_session', 'ختم'].includes(lower) &&
      step !== 'lang_select') {
    hardReset(phone);
    setSession(phone, { _greeted: true });
    return sendLangButtons(phone, s.goodbye);
  }

  // Another service → back to category list
  if (lower === 'another_service' && step !== 'lang_select') {
    softReset(phone);
    const updatedSession = getSession(phone);
    await sendMessage(phone, s.anotherService);
    return sendCategoryMenu(phone, lang, updatedSession.location, updatedSession.serviceType);
  }

  // Change category → back to category list (same location, keep service type)
  if (lower === 'change_category' && step !== 'lang_select') {
    const { location, serviceType } = session;
    setSession(phone, { step: 'category', category: null, service: null });
    await sendMessage(phone, s.anotherService);
    return sendCategoryMenu(phone, lang, location, serviceType);
  }

  // Change location / province
  if (lower === 'change_location' && step !== 'lang_select') {
    setSession(phone, { step: 'location', location: null, serviceType: null, category: null, service: null });
    return sendLocationMenu(phone, lang, s);
  }

  // Back to service list within current category
  if ((lower === '0' || lower === 'back' || lower === 'واپس') && step !== 'lang_select') {
    if (step === 'service_menu') {
      // From service_menu → go back to category list
      setSession(phone, { step: 'category', category: null, service: null });
      return sendCategoryMenu(phone, lang, session.location, session.serviceType);
    }
    if (step === 'category') {
      // From category → go back to location
      setSession(phone, { step: 'location', location: null, serviceType: null, category: null });
      return sendLocationMenu(phone, lang, s);
    }
  }

  // ══════════════════════════════════════════════════════════════════════════
  // STEP: location — province selection
  // ══════════════════════════════════════════════════════════════════════════
  if (step === 'location') {
    const locKey = LOC_MAP[lower] || LOC_MAP[input];
    if (locKey) {
      const tree = SERVICE_TREE[locKey];
      const appCfg = APP_CONFIG[locKey];

      if (locKey === 'punjab') {
        // Punjab: show service type selection first
        setSession(phone, { location: locKey, step: 'service_type' });
        const msg = lang === 'ur'
          ? strings.ur.punjabLocationConfirmed
          : strings.en.punjabLocationConfirmed;
        await sendMessage(phone, msg);
        return sendServiceTypeButtons(phone, lang, s);
      }

      if (tree && tree.flat) {
        // Sindh: flat list — go directly to service_menu
        const singleCat = tree.categories[0];
        setSession(phone, { location: locKey, step: 'service_menu', category: singleCat.id });
        const provinceName = PROVINCE_LABELS[locKey][lang];
        const msg = lang === 'ur'
          ? `${strings.ur.sindhMultiApp}\n\n${strings.ur.locationConfirmed(provinceName, appCfg.nameUr)}`
          : `${strings.en.sindhMultiApp}\n\n${strings.en.locationConfirmed(provinceName, appCfg.nameEn)}`;
        await sendMessage(phone, msg);
        return sendServiceItemMenu(phone, lang, locKey, singleCat.id);
      }

      // All other provinces: go to category selection
      setSession(phone, { location: locKey, step: 'category' });
      const provinceName = PROVINCE_LABELS[locKey][lang];
      const msg = lang === 'ur'
        ? strings.ur.locationConfirmed(provinceName, appCfg.nameUr)
        : strings.en.locationConfirmed(provinceName, appCfg.nameEn);
      await sendMessage(phone, msg);
      return sendCategoryMenu(phone, lang, locKey);
    }
    return sendLocationMenu(phone, lang, s);
  }

  // ══════════════════════════════════════════════════════════════════════════
  // STEP: service_type — Punjab only: Citizen or Business
  // ══════════════════════════════════════════════════════════════════════════
  if (step === 'service_type') {
    if (lower === 'stype_citizen' || lower === 'citizen' || lower === '1' || lower === 'شہری') {
      setSession(phone, { serviceType: 'citizen', step: 'category' });
      return sendCategoryMenu(phone, lang, 'punjab', 'citizen');
    }
    if (lower === 'stype_business' || lower === 'business' || lower === '2' || lower === 'کاروباری') {
      setSession(phone, { serviceType: 'business', step: 'category' });
      return sendCategoryMenu(phone, lang, 'punjab', 'business');
    }
    return sendServiceTypeButtons(phone, lang, s);
  }

  // ══════════════════════════════════════════════════════════════════════════
  // STEP: category — category selection within province
  // ══════════════════════════════════════════════════════════════════════════
  if (step === 'category') {
    const { location, serviceType } = session;
    const cats = getCategories(location, serviceType);
    const selectedCat = cats.find((c) => c.id === input || c.id === lower);

    if (selectedCat) {
      setSession(phone, { category: selectedCat.id, step: 'service_menu' });
      return sendServiceItemMenu(phone, lang, location, selectedCat.id, serviceType);
    }
    // Also try matching by number (1-based)
    const numIdx = parseInt(input, 10) - 1;
    if (!isNaN(numIdx) && numIdx >= 0 && numIdx < cats.length) {
      const cat = cats[numIdx];
      setSession(phone, { category: cat.id, step: 'service_menu' });
      return sendServiceItemMenu(phone, lang, location, cat.id, serviceType);
    }

    await sendMessage(phone, s.invalidOption);
    return sendCategoryMenu(phone, lang, location, serviceType);
  }

  // ══════════════════════════════════════════════════════════════════════════
  // STEP: service_menu — service selection within category
  // ══════════════════════════════════════════════════════════════════════════
  if (step === 'service_menu') {
    const { location, category, serviceType } = session;
    const cat = getCategoryById(location, category, serviceType);
    if (!cat) {
      setSession(phone, { step: 'category', category: null });
      return sendCategoryMenu(phone, lang, location, serviceType);
    }

    const selectedSvc = cat.services.find((sv) => sv.id === input || sv.id === lower);
    if (selectedSvc) {
      setSession(phone, { service: selectedSvc.id });
      const detail = getServiceDetail(selectedSvc.id, lang);
      if (!detail) {
        await sendMessage(phone, s.noService);
      } else {
        await sendMessage(phone, detail);
      }
      return sendNextActions(phone, lang);
    }

    // Try number-based selection
    const numIdx = parseInt(input, 10) - 1;
    if (!isNaN(numIdx) && numIdx >= 0 && numIdx < cat.services.length) {
      const svc = cat.services[numIdx];
      setSession(phone, { service: svc.id });
      const detail = getServiceDetail(svc.id, lang);
      if (!detail) {
        await sendMessage(phone, s.noService);
      } else {
        await sendMessage(phone, detail);
      }
      return sendNextActions(phone, lang);
    }

    const fallbackMsg = lang === 'ur' 
      ? `${s.invalidOption}\n(یا شروع میں جانے کے لیے "reset" لکھیں)` 
      : `${s.invalidOption}\n(Or type "reset" to start over)`;
    await sendMessage(phone, fallbackMsg);
    return sendServiceItemMenu(phone, lang, location, category, serviceType);
  }

  // ══════════════════════════════════════════════════════════════════════════
  // STEP: settings
  // ══════════════════════════════════════════════════════════════════════════
  if (step === 'settings') {
    if (lower === 'switch_lang') {
      setSession(phone, { step: 'lang' });
      return sendLangButtons(phone, s.langSelect);
    }
    if (lower === 'set_location') {
      setSession(phone, { step: 'location', location: null, serviceType: null, category: null });
      return sendLocationMenu(phone, lang, s);
    }
    if (lower === 'restart') {
      hardReset(phone);
      return sendLangButtons(phone, strings.askLang);
    }
    return sendSettings(phone, lang, s);
  }

  // ══════════════════════════════════════════════════════════════════════════
  // STEP: lang — language switch
  // ══════════════════════════════════════════════════════════════════════════
  if (step === 'lang') {
    if (input === '1') {
      setSession(phone, { lang: 'en', step: 'location' });
      await sendMessage(phone, strings.en.langChanged);
      return sendLocationMenu(phone, 'en', strings.en);
    }
    if (input === '2') {
      setSession(phone, { lang: 'ur', step: 'location' });
      await sendMessage(phone, strings.ur.langChanged);
      return sendLocationMenu(phone, 'ur', strings.ur);
    }
    return sendLangButtons(phone, s.langSelect);
  }

  // ── Fallback ───────────────────────────────────────────────────────────────
  await sendMessage(phone, s.invalidOption);
  const { location, serviceType, category } = session;
  if (step === 'location' || !location) return sendLocationMenu(phone, lang, s);
  if (step === 'service_type') return sendServiceTypeButtons(phone, lang, s);
  if (step === 'category' || !category) return sendCategoryMenu(phone, lang, location, serviceType);
  return sendServiceItemMenu(phone, lang, location, category, serviceType);
}

module.exports = { handleIncoming };
