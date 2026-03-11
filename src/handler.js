// ─── Core Bot Logic ───────────────────────────────────────────────────────────

const { sendMessage, sendButtons, sendList }   = require('./whatsapp');
const { getSession, setSession, softReset, hardReset } = require('./session');
const strings                                  = require('./strings');
const { DEPARTMENTS, DEPARTMENTS_UR, PROVINCES, PROVINCES_UR } = require('./services');
const { getDeptDetails }                       = require('./seed');

// Validation helpers
const isCnic    = (v) => /^\d{13}$/.test(v);
const isPhone   = (v) => /^03\d{9}$/.test(v);
const norm      = (t) => t.trim();
const normLower = (t) => t.toLowerCase().trim();

// ─── Send the main menu as an interactive list ───────────────────────────────
async function sendMenu(phone, lang) {
  if (lang === 'ur') {
    await sendList(phone,
      '🏛️ *NITB سٹیزن سروسز گائیڈ*\n\nسروس منتخب کریں:',
      'سروس دیکھیں',
      [
        { title: 'سرکاری خدمات', rows: [
          { id: '0', title: 'شکایت دیکھیں' },
          { id: '1', title: 'نادرا' },
          { id: '2', title: 'پولیس' },
          { id: '3', title: 'ٹریفک پولیس' },
          { id: '4', title: 'کے الیکٹرک' },
          { id: '5', title: 'کے ایم سی' },
          { id: '6', title: 'سوئی گیس' },
          { id: '7', title: 'واٹر بورڈ' },
          { id: '8', title: 'پاکستان بیت المال' },
          { id: '9', title: 'بے نظیر انکم سپورٹ' },
        ]},
        { title: 'مزید خدمات', rows: [
          { id: '10', title: 'زکوٰۃ و عشر' },
          { id: '11', title: 'امیگریشن و پاسپورٹ' },
          { id: '12', title: 'پاکستان کسٹمز' },
          { id: '13', title: 'زبان تبدیل کریں 🌐' },
          { id: 'settings', title: '⚙️ ترتیبات' },
        ]},
      ]
    );
  } else {
    await sendList(phone,
      '🏛️ *NITB Citizen Services Guide*\n\nPlease select a service:',
      'View Services',
      [
        { title: 'Government Services', rows: [
          { id: '0', title: 'View Complaint' },
          { id: '1', title: 'NADRA' },
          { id: '2', title: 'Police' },
          { id: '3', title: 'Traffic Police' },
          { id: '4', title: 'K Electric' },
          { id: '5', title: 'KMC' },
          { id: '6', title: 'Sui Gas' },
          { id: '7', title: 'Water Board' },
          { id: '8', title: 'Pakistan Bait ul Maal' },
          { id: '9', title: 'Benazir Income Support' },
        ]},
        { title: 'More Services', rows: [
          { id: '10', title: 'Zakat & Ushr Dept' },
          { id: '11', title: 'Immigration & Passport' },
          { id: '12', title: 'Pakistan Customs' },
          { id: '13', title: 'Language Selection 🌐' },
          { id: 'settings', title: '⚙️ Settings' },
        ]},
      ]
    );
  }
}

// ─── Language selection buttons ────────────────────────────────────────────────
async function sendLangButtons(phone, bodyText) {
  await sendButtons(phone, bodyText, [
    { id: '1', title: 'English 🇬🇧' },
    { id: '2', title: 'اردو 🇵🇰' },
  ]);
}

// ─── Province selection list ───────────────────────────────────────────────────
async function sendProvinceList(phone, lang, deptName) {
  if (lang === 'ur') {
    await sendList(phone,
      `آپ نے *${deptName}* منتخب کیا۔\n\nاپنا صوبہ منتخب کریں:`,
      'صوبہ منتخب کریں',
      [{ title: 'صوبہ منتخب کریں', rows: [
        { id: '1', title: 'سندھ' },
        { id: '2', title: 'پنجاب' },
        { id: '3', title: 'خیبر پختونخوا' },
        { id: '4', title: 'وفاقی / آئی سی ٹی' },
        { id: '0', title: '⬅️ مینو پر واپس' },
      ]}]
    );
  } else {
    await sendList(phone,
      `You selected *${deptName}*.\n\nPlease choose your province:`,
      'Select Province',
      [{ title: 'Select Province', rows: [
        { id: '1', title: 'Sindh' },
        { id: '2', title: 'Punjab' },
        { id: '3', title: 'Khyber Pakhtunkhwa' },
        { id: '4', title: 'Federal / ICT' },
        { id: '0', title: '⬅️ Back to Menu' },
      ]}]
    );
  }
}

// ─── Settings buttons ──────────────────────────────────────────────────────────
async function sendSettings(phone, lang, s) {
  await sendButtons(phone, s.settingsMenu, [
    { id: 'switch_lang', title: lang === 'ur' ? '🌐 زبان تبدیل' : '🌐 Switch Language' },
    { id: 'set_location', title: lang === 'ur' ? '📍 مقام اپڈیٹ' : '📍 Update Location' },
    { id: 'restart', title: lang === 'ur' ? '🔄 دوبارہ شروع' : '🔄 Restart' },
  ]);
}

// ─── After-detail action buttons ──────────────────────────────────────────────
async function sendNextActions(phone, lang) {
  await sendButtons(phone,
    lang === 'ur' ? 'آگے کیا کریں؟' : 'What would you like to do next?', [
    { id: 'menu', title: lang === 'ur' ? '🏠 مین مینو' : '🏠 Main Menu' },
    { id: 'settings', title: lang === 'ur' ? '⚙️ ترتیبات' : '⚙️ Settings' },
  ]);
}

// ─── Main handler ─────────────────────────────────────────────────────────────
async function handleIncoming(phone, text) {
  const session = getSession(phone);
  const { lang, step } = session;
  const s     = strings[lang];
  const input = norm(text);
  const lower = normLower(text);

  // ── Initial language selection (handled before any global shortcuts) ───────
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

  // ── Global "menu" keyword (only after registration) ────────────────────────
  if ((lower === 'menu' || lower === 'مینو') && step !== 'cnic' && step !== 'phone' && step !== 'lang_select') {
    softReset(phone);
    return sendMenu(phone, lang);
  }

  if ((lower === 'bye' || lower === 'exit' || lower === 'quit' || lower === 'باہر' || lower === 'خروج') && step !== 'cnic' && step !== 'phone' && step !== 'lang_select') {
    softReset(phone);
    return sendMessage(phone, s.goodbye);
  }

  // ── Global settings keyword ────────────────────────────────────────────────
  if ((lower === 'settings' || lower === 'ترتیبات') && step !== 'cnic' && step !== 'phone' && step !== 'lang_select') {
    setSession(phone, { step: 'settings' });
    return sendSettings(phone, lang, s);
  }

  // ══════════════════════════════════════════════════════════════════════════
  // STEP 1 — CNIC
  // ══════════════════════════════════════════════════════════════════════════
  if (step === 'cnic') {
    const digits = input.replace(/[-\s]/g, ''); // strip dashes/spaces if any
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
    setSession(phone, { contact: digits, step: 'menu' });
    await sendMessage(phone, s.registered(cnic, digits));
    return sendMenu(phone, lang);
  }

  // ══════════════════════════════════════════════════════════════════════════
  // STEP 4 — MAIN MENU
  // ══════════════════════════════════════════════════════════════════════════
  if (step === 'menu') {
    const num = parseInt(input, 10);

    // Language selection
    if (num === 13) {
      setSession(phone, { step: 'lang' });
      return sendLangButtons(phone, s.langSelect);
    }

    // Valid department 0–12
    if (!isNaN(num) && num >= 0 && num <= 12) {
      const deptName = lang === 'ur' ? DEPARTMENTS_UR[num] : DEPARTMENTS[num];
      setSession(phone, { step: 'province', dept: num });
      return sendProvinceList(phone, lang, deptName);
    }

    await sendMessage(phone, s.invalidOption);
    return sendMenu(phone, lang);
  }

  // ══════════════════════════════════════════════════════════════════════════
  // STEP 5 — PROVINCE SELECTION
  // ══════════════════════════════════════════════════════════════════════════
  if (step === 'province') {
    const num = parseInt(input, 10);

    // 0 = back to main menu
    if (num === 0) {
      softReset(phone);
      return sendMenu(phone, lang);
    }

    if (!isNaN(num) && num >= 1 && num <= 4) {
      const provinceIndex = num - 1;
      const deptIndex     = session.dept;
      const deptName      = lang === 'ur' ? DEPARTMENTS_UR[deptIndex] : DEPARTMENTS[deptIndex];
      const provinceName  = lang === 'ur' ? PROVINCES_UR[provinceIndex] : PROVINCES[provinceIndex];

      // Get full seeded detail record
      const detail = getDeptDetails(deptIndex, lang);

      // Return to menu step, keep profile
      softReset(phone);

      if (!detail) {
        await sendMessage(phone, s.noService(deptName, provinceName));
        return sendNextActions(phone, lang);
      }

      await sendMessage(phone, detail);
      return sendNextActions(phone, lang);
    }

    // Invalid province input
    const deptName = lang === 'ur' ? DEPARTMENTS_UR[session.dept] : DEPARTMENTS[session.dept];
    await sendMessage(phone, s.invalidOption);
    return sendProvinceList(phone, lang, deptName);
  }

  // ══════════════════════════════════════════════════════════════════════════
  // STEP 5b — SETTINGS
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
  // STEP 5c — SET LOCATION
  // ══════════════════════════════════════════════════════════════════════════
  if (step === 'set_location') {
    if (input.length < 2) return sendMessage(phone, s.askLocationUpdate);
    setSession(phone, { location: input, step: 'menu' });
    await sendMessage(phone, s.locationSaved(input));
    return sendMenu(phone, lang);
  }

  // ══════════════════════════════════════════════════════════════════════════
  // STEP 6 — LANGUAGE SELECTION
  // ══════════════════════════════════════════════════════════════════════════
  if (step === 'lang') {
    if (input === '1') {
      setSession(phone, { lang: 'en', step: 'menu' });
      await sendMessage(phone, strings.en.langChanged);
      return sendMenu(phone, 'en');
    }
    if (input === '2') {
      setSession(phone, { lang: 'ur', step: 'menu' });
      await sendMessage(phone, strings.ur.langChanged);
      return sendMenu(phone, 'ur');
    }
    return sendMessage(phone, s.invalidOption);
  }

  // ── Fallback ───────────────────────────────────────────────────────────────
  await sendMessage(phone, s.invalidOption);
  return sendMenu(phone, lang);
}

module.exports = { handleIncoming };
