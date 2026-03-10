// ─── Core Bot Logic ───────────────────────────────────────────────────────────

const { sendMessage }                          = require('./whatsapp');
const { getSession, setSession, softReset, hardReset } = require('./session');
const strings                                  = require('./strings');
const { DEPARTMENTS, DEPARTMENTS_UR, PROVINCES, PROVINCES_UR } = require('./services');
const { getDeptDetails }                       = require('./seed');

// Validation helpers
const isCnic    = (v) => /^\d{13}$/.test(v);
const isPhone   = (v) => /^03\d{9}$/.test(v);
const norm      = (t) => t.trim();
const normLower = (t) => t.toLowerCase().trim();

// ─── Send the main menu ────────────────────────────────────────────────────────
async function sendMenu(phone, lang) {
  await sendMessage(phone, strings[lang].menu);
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
    return sendMessage(phone, strings.askLang);
  }

  // ── Global hard-reset keyword ──────────────────────────────────────────────
  if (lower === 'reset') {
    hardReset(phone);
    return sendMessage(phone, strings.askLang);
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
      return sendMessage(phone, s.langSelect);
    }

    // Valid department 0–12
    if (!isNaN(num) && num >= 0 && num <= 12) {
      const deptName = lang === 'ur' ? DEPARTMENTS_UR[num] : DEPARTMENTS[num];
      setSession(phone, { step: 'province', dept: num });
      return sendMessage(phone, s.selectProvince(deptName));
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
        return sendMessage(phone, s.noService(deptName, provinceName));
      }

      return sendMessage(phone, detail);
    }

    // Invalid province input
    const deptName = lang === 'ur' ? DEPARTMENTS_UR[session.dept] : DEPARTMENTS[session.dept];
    await sendMessage(phone, s.invalidOption);
    return sendMessage(phone, s.selectProvince(deptName));
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
