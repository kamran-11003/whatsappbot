// ─── Core Bot Logic ───────────────────────────────────────────────────────────

const { sendMessage, sendButtons, sendList }   = require('./whatsapp');
const { getSession, setSession, softReset, hardReset } = require('./session');
const strings                                  = require('./strings');
const { SERVICES, SERVICES_UR, LOCATION_KEY_MAP } = require('./services');
const { getServiceDetail }                     = require('./seed');

// Validation helpers
const isCnic    = (v) => /^\d{13}$/.test(v);
const isPhone   = (v) => /^03\d{9}$/.test(v);
const norm      = (t) => t.trim();
const normLower = (t) => t.toLowerCase().trim();

// ─── Language selection buttons ────────────────────────────────────────────────
async function sendLangButtons(phone, bodyText) {
  await sendButtons(phone, bodyText, [
    { id: '1', title: 'English 🇬🇧' },
    { id: '2', title: 'اردو 🇵🇰' },
  ]);
}

// ─── Location selection buttons (3 = fits WhatsApp button limit) ──────────────
async function sendLocationButtons(phone, lang, s) {
  await sendButtons(phone, s.askLocation, [
    { id: 'loc_1', title: '📍 Islamabad' },
    { id: 'loc_2', title: '📍 Punjab' },
    { id: 'loc_3', title: '📍 KPK' },
  ]);
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
  'loc_1': 'islamabad', 'loc_2': 'punjab', 'loc_3': 'kpk',
  '1': 'islamabad', '2': 'punjab', '3': 'kpk',
  'islamabad': 'islamabad', 'punjab': 'punjab', 'kpk': 'kpk',
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
      setSession(phone, { lang: 'en', step: 'cnic' });
      return sendMessage(phone, strings.en.askCnic);
    }
    if (input === '2') {
      setSession(phone, { lang: 'ur', step: 'cnic' });
      return sendMessage(phone, strings.ur.askCnic);
    }
    return sendLangButtons(phone, strings.askLang);
  }

  // ── Global hard-reset keyword ──────────────────────────────────────────────
  if (lower === 'reset') {
    hardReset(phone);
    return sendLangButtons(phone, strings.askLang);
  }

  // ── Global settings keyword ────────────────────────────────────────────────
  if ((lower === 'settings' || lower === 'ترتیبات') &&
      step !== 'cnic' && step !== 'phone' && step !== 'lang_select') {
    setSession(phone, { step: 'settings' });
    return sendSettings(phone, lang, s);
  }

  // ── Global exit keyword ────────────────────────────────────────────────────
  if ((lower === 'bye' || lower === 'exit' || lower === 'quit' ||
       lower === 'باہر' || lower === 'خروج' || lower === 'end_session') &&
      step !== 'cnic' && step !== 'phone' && step !== 'lang_select') {
    hardReset(phone);
    return sendLangButtons(phone, s.goodbye);
  }

  // ── After-detail action shortcuts ─────────────────────────────────────────
  if (lower === 'another_service' && step !== 'cnic' && step !== 'phone' && step !== 'lang_select') {
    softReset(phone);
    await sendMessage(phone, s.anotherService);
    return sendServiceMenu(phone, lang);
  }
  if (lower === 'change_location' && step !== 'cnic' && step !== 'phone' && step !== 'lang_select') {
    setSession(phone, { step: 'location', location: null });
    return sendLocationButtons(phone, lang, s);
  }

  // ══════════════════════════════════════════════════════════════════════════
  // STEP 1 — CNIC
  // ══════════════════════════════════════════════════════════════════════════
  if (step === 'cnic') {
    const digits = input.replace(/[-\s]/g, '');
    if (!isCnic(digits)) {
      return sendMessage(phone, s.invalidCnic);
    }
    setSession(phone, { cnic: digits, step: 'phone' });
    return sendMessage(phone, s.askPhone);
  }

  // ══════════════════════════════════════════════════════════════════════════
  // STEP 2 — PHONE NUMBER
  // ══════════════════════════════════════════════════════════════════════════
  if (step === 'phone') {
    const digits = input.replace(/[\s-]/g, '');
    if (!isPhone(digits)) {
      return sendMessage(phone, s.invalidPhone);
    }
    const { cnic } = getSession(phone);
    setSession(phone, { contact: digits, step: 'location' });
    await sendMessage(phone, s.registered(cnic, digits));
    return sendLocationButtons(phone, lang, s);
  }

  // ══════════════════════════════════════════════════════════════════════════
  // STEP 3 — LOCATION SELECTION
  // ══════════════════════════════════════════════════════════════════════════
  if (step === 'location') {
    const locKey = LOC_MAP[lower];
    if (locKey) {
      setSession(phone, { location: locKey, step: 'menu' });
      await sendMessage(phone, s.askService);
      return sendServiceMenu(phone, lang);
    }
    return sendLocationButtons(phone, lang, s);
  }

  // ══════════════════════════════════════════════════════════════════════════
  // STEP 4 — SERVICE MENU
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
  // STEP 5a — SETTINGS
  // ══════════════════════════════════════════════════════════════════════════
  if (step === 'settings') {
    if (lower === 'switch_lang') {
      setSession(phone, { step: 'lang' });
      return sendLangButtons(phone, s.langSelect);
    }
    if (lower === 'set_location') {
      setSession(phone, { step: 'set_location' });
      return sendMessage(phone, s.askLocationUpdate);
    }
    if (lower === 'restart') {
      hardReset(phone);
      return sendLangButtons(phone, strings.askLang);
    }
    return sendSettings(phone, lang, s);
  }

  // ══════════════════════════════════════════════════════════════════════════
  // STEP 5b — SET LOCATION (free-text city/area note)
  // ══════════════════════════════════════════════════════════════════════════
  if (step === 'set_location') {
    if (input.length < 2) return sendMessage(phone, s.askLocationUpdate);
    setSession(phone, { step: 'location' });
    await sendMessage(phone, s.locationSaved(input));
    return sendLocationButtons(phone, lang, s);
  }

  // ══════════════════════════════════════════════════════════════════════════
  // STEP 5c — LANGUAGE SELECTION
  // ══════════════════════════════════════════════════════════════════════════
  if (step === 'lang') {
    if (input === '1') {
      setSession(phone, { lang: 'en', step: 'location' });
      await sendMessage(phone, strings.en.langChanged);
      return sendLocationButtons(phone, 'en', strings.en);
    }
    if (input === '2') {
      setSession(phone, { lang: 'ur', step: 'location' });
      await sendMessage(phone, strings.ur.langChanged);
      return sendLocationButtons(phone, 'ur', strings.ur);
    }
    return sendLangButtons(phone, s.langSelect);
  }

  // ── Fallback ───────────────────────────────────────────────────────────────
  await sendMessage(phone, s.invalidOption);
  return sendServiceMenu(phone, lang);
}

module.exports = { handleIncoming };
