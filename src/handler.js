// ─── Core Bot Logic ───────────────────────────────────────────────────────────

const { sendMessage, sendButtons, sendList }   = require('./whatsapp');
const { getSession, setSession, softReset, hardReset } = require('./session');
const strings                                  = require('./strings');
const { SERVICES, SERVICES_UR }                = require('./services');
const { getServiceDetail }                     = require('./seed');

const norm      = (t) => t.trim();
const normLower = (t) => t.toLowerCase().trim();

// ─── Language selection buttons ────────────────────────────────────────────────
async function sendLangButtons(phone, bodyText) {
  await sendButtons(phone, bodyText, [
    { id: '1', title: 'English 🇬🇧' },
    { id: '2', title: 'اردو 🇵🇰' },
  ]);
}

// ─── Location selection list (4 rows = within 10-row limit) ─────────────────
async function sendLocationMenu(phone, lang, s) {
  await sendList(
    phone,
    s.locationListBody,
    lang === 'ur' ? 'مقام منتخب کریں' : 'Select Location',
    [{
      title: lang === 'ur' ? 'مقامات' : 'Locations',
      rows: [
        { id: 'loc_1', title: lang === 'ur' ? 'اسلام آباد' : 'Islamabad' },
        { id: 'loc_2', title: lang === 'ur' ? 'پنجاب' : 'Punjab' },
        { id: 'loc_3', title: lang === 'ur' ? 'خیبر پختونخواہ' : 'KPK' },
        { id: 'loc_4', title: lang === 'ur' ? 'سندھ' : 'Sindh' },
      ],
    }]
  );
}

// ─── Service selection list (8 rows = within 10-row limit) ────────────────────
async function sendServiceMenu(phone, lang) {
  const rows = (lang === 'ur' ? SERVICES_UR : SERVICES).map((name, i) => ({
    id: String(i),
    title: name,
  }));
  await sendList(
    phone,
    lang === 'ur'
      ? '🏛️ *NITB سٹیزن سروسز*\n\nاپنی مطلوبہ خدمت منتخب کریں:'
      : '🏛️ *NITB Citizen Services*\n\nPlease select the service you need:',
    lang === 'ur' ? 'خدمت منتخب کریں' : 'Select Service',
    [{ title: lang === 'ur' ? 'سرکاری خدمات' : 'Government Services', rows }]
  );
}

// ─── After-detail action buttons ──────────────────────────────────────────────
async function sendNextActions(phone, lang) {
  const s = strings[lang];
  await sendButtons(phone, s.nextAction, [
    { id: 'another_service', title: lang === 'ur' ? '🔄 دوسری خدمت' : '🔄 Another Service' },
    { id: 'change_location', title: lang === 'ur' ? '📍 مقام بدلیں' : '📍 Change Location' },
    { id: 'end_session',     title: lang === 'ur' ? '✅ اختتام'     : '✅ End Session' },
  ]);
}

// ─── Settings buttons ──────────────────────────────────────────────────────────
async function sendSettings(phone, lang, s) {
  await sendButtons(phone, s.settingsMenu, [
    { id: 'switch_lang',    title: lang === 'ur' ? '🌐 زبان تبدیل'   : '🌐 Switch Language' },
    { id: 'set_location',   title: lang === 'ur' ? '📍 مقام اپڈیٹ'  : '📍 Update Location' },
    { id: 'restart',        title: lang === 'ur' ? '🔄 دوبارہ شروع' : '🔄 Restart' },
  ]);
}

// ─── Location key resolver (button IDs and plain text numbers) ────────────────
const LOC_MAP = {
  'loc_1': 'islamabad', 'loc_2': 'punjab', 'loc_3': 'kpk', 'loc_4': 'sindh',
  '1': 'islamabad', '2': 'punjab', '3': 'kpk', '4': 'sindh',
  'islamabad': 'islamabad', 'punjab': 'punjab', 'kpk': 'kpk', 'sindh': 'sindh',
};

// ─── Main handler ─────────────────────────────────────────────────────────────
async function handleIncoming(phone, text) {
  const session = getSession(phone);
  const { lang, step } = session;
  const s     = strings[lang];
  const input = norm(text);
  const lower = normLower(text);

  // ── Initial language selection ─────────────────────────────────────────────
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

  // ── Global hard-reset keyword ──────────────────────────────────────────────
  if (lower === 'reset') {
    hardReset(phone);
    return sendLangButtons(phone, strings.askLang);
  }

  // ── Global settings keyword ────────────────────────────────────────────────
  if ((lower === 'settings' || lower === 'ترتیبات') && step !== 'lang_select') {
    setSession(phone, { step: 'settings' });
    return sendSettings(phone, lang, s);
  }

  // ── Global exit keyword ────────────────────────────────────────────────────
  if ((lower === 'bye' || lower === 'exit' || lower === 'quit' ||
       lower === 'باہر' || lower === 'خروج' || lower === 'end_session') && step !== 'lang_select') {
    hardReset(phone);
    return sendLangButtons(phone, s.goodbye);
  }

  // ── After-detail action shortcuts ─────────────────────────────────────────
  if (lower === 'another_service' && step !== 'lang_select') {
    softReset(phone);
    await sendMessage(phone, s.anotherService);
    return sendServiceMenu(phone, lang);
  }
  if (lower === 'change_location' && step !== 'lang_select') {
    setSession(phone, { step: 'location', location: null });
    return sendLocationMenu(phone, lang, s);
  }

  // ══════════════════════════════════════════════════════════════════════════
  // STEP 1 — LOCATION SELECTION
  // ══════════════════════════════════════════════════════════════════════════
  if (step === 'location') {
    const locKey = LOC_MAP[lower];
    if (locKey) {
      setSession(phone, { location: locKey, step: 'menu' });
      await sendMessage(phone, s.askService);
      return sendServiceMenu(phone, lang);
    }
    return sendLocationMenu(phone, lang, s);
  }

  // ══════════════════════════════════════════════════════════════════════════
  // STEP 2 — SERVICE MENU
  // ══════════════════════════════════════════════════════════════════════════
  if (step === 'menu') {
    if (lower === 'settings') {
      setSession(phone, { step: 'settings' });
      return sendSettings(phone, lang, s);
    }

    const num = parseInt(input, 10);
    if (!isNaN(num) && num >= 0 && num <= 7) {
      const locKey = session.location || 'islamabad';
      const detail = getServiceDetail(locKey, num, lang);
      setSession(phone, { service: num });
      softReset(phone); // preserves location, sets step back to 'menu'
      if (!detail) {
        await sendMessage(phone, s.noService);
        return sendNextActions(phone, lang);
      }
      await sendMessage(phone, detail);
      return sendNextActions(phone, lang);
    }

    await sendMessage(phone, s.invalidOption);
    return sendServiceMenu(phone, lang);
  }

  // ══════════════════════════════════════════════════════════════════════════
  // STEP 3a — SETTINGS
  // ══════════════════════════════════════════════════════════════════════════
  if (step === 'settings') {
    if (lower === 'switch_lang') {
      setSession(phone, { step: 'lang' });
      return sendLangButtons(phone, s.langSelect);
    }
    if (lower === 'set_location') {
      setSession(phone, { step: 'location' });
      return sendLocationMenu(phone, lang, s);
    }
    if (lower === 'restart') {
      hardReset(phone);
      return sendLangButtons(phone, strings.askLang);
    }
    return sendSettings(phone, lang, s);
  }

  // ══════════════════════════════════════════════════════════════════════════
  // STEP 3b — LANGUAGE SELECTION
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
  return step === 'location' ? sendLocationMenu(phone, lang, s) : sendServiceMenu(phone, lang);
}

module.exports = { handleIncoming };
