// ─── Session Store ────────────────────────────────────────────────────────────
// Steps in order:
//   'cnic'     → waiting for 13-digit CNIC
//   'phone'    → waiting for 11-digit contact number
//   'location' → waiting for city/area text
//   'menu'     → main department menu
//   'province' → waiting for province choice (after dept selected)
//   'lang'     → waiting for language choice (option 13)

const sessions = new Map();

const DEFAULT_SESSION = {
  lang:     'en',
  step:     'cnic',   // ← first step for every new user
  cnic:     null,
  contact:  null,
  location: null,
  dept:     null,
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

// Soft reset — keeps user profile, goes back to menu
function softReset(phone) {
  const { lang, cnic, contact, location } = getSession(phone);
  sessions.set(phone, { ...DEFAULT_SESSION, lang, step: 'menu', cnic, contact, location });
}

// Hard reset — wipes everything, restarts from CNIC entry
function hardReset(phone) {
  sessions.set(phone, { ...DEFAULT_SESSION });
}

module.exports = { getSession, setSession, softReset, hardReset };
