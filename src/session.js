// ─── Session Store ────────────────────────────────────────────────────────────
// Steps in order:
//   'lang_select' → waiting for initial language choice (1=EN, 2=UR)
//   'cnic'        → waiting for 13-digit CNIC
//   'phone'       → waiting for 11-digit contact number
//   'location'    → waiting for location choice (1=Islamabad, 2=Punjab, 3=KPK)
//   'menu'        → main service menu
//   'lang'        → waiting for language switch choice
//   'settings'    → settings menu
//   'set_location'→ waiting for free-text location update

const sessions = new Map();

const DEFAULT_SESSION = {
  lang:     'en',
  step:     'lang_select',
  cnic:     null,
  contact:  null,
  location: null,   // 'islamabad' | 'punjab' | 'kpk'
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

// Soft reset — keeps profile + location, returns to menu
function softReset(phone) {
  const { lang, cnic, contact, location } = getSession(phone);
  sessions.set(phone, { ...DEFAULT_SESSION, lang, step: 'menu', cnic, contact, location });
}

// Hard reset — wipes everything, restarts from CNIC entry
function hardReset(phone) {
  sessions.set(phone, { ...DEFAULT_SESSION });
}

module.exports = { getSession, setSession, softReset, hardReset };
