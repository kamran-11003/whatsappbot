// ─── Session Store ────────────────────────────────────────────────────────────
// Steps in order:
//   'lang_select' → waiting for initial language choice (1=EN, 2=UR)
//   'location'    → waiting for location choice (1=Islamabad, 2=Punjab, 3=KPK, 4=Sindh)
//   'menu'        → main service menu
//   'lang'        → waiting for language switch choice
//   'settings'    → settings menu

const sessions = new Map();

const DEFAULT_SESSION = {
  lang:     'en',
  step:     'lang_select',
  location: null,   // 'islamabad' | 'punjab' | 'kpk' | 'sindh'
  service:  null,   // 0–7 index
};

function getSession(phone) {
  if (!sessions.has(phone)) {
    sessions.set(phone, { ...DEFAULT_SESSION });
  }
  return sessions.get(phone);
}

function setSession(phone, data) {
  sessions.set(phone, { ...getSession(phone), ...data });
}

// Soft reset — keeps language + location, returns to menu
function softReset(phone) {
  const { lang, location } = getSession(phone);
  sessions.set(phone, { ...DEFAULT_SESSION, lang, step: 'menu', location });
}

// Hard reset — wipes everything, restarts from language selection
function hardReset(phone) {
  sessions.set(phone, { ...DEFAULT_SESSION });
}

module.exports = { getSession, setSession, softReset, hardReset };
