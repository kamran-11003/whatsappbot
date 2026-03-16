// ─── Session Store ────────────────────────────────────────────────────────────
// Steps in order:
//   'lang_select'  → waiting for initial language choice (1=EN, 2=UR)
//   'location'     → waiting for province/location choice
//   'service_type' → Punjab only: Citizen or Business services tab
//   'category'     → waiting for category choice within province
//   'service_menu' → waiting for service choice within category
//   'lang'         → waiting for language switch choice
//   'settings'     → settings menu

const sessions = new Map();

const DEFAULT_SESSION = {
  lang:        'en',
  step:        'lang_select',
  location:    null,      // 'islamabad' | 'punjab' | 'kpk' | 'sindh'
  serviceType: null,      // 'citizen' | 'business' (Punjab only)
  category:    null,      // category key within province
  service:     null,      // service id within category
  _greeted:    false,
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

// Soft reset — keeps lang + location + serviceType; resets to category step
function softReset(phone) {
  const { lang, location, serviceType } = getSession(phone);
  sessions.set(phone, {
    ...DEFAULT_SESSION,
    lang,
    location,
    serviceType,
    step: 'category',
    _greeted: true,
  });
}

// Category reset — keeps lang + location + serviceType + category; resets service
function categoryReset(phone) {
  const { lang, location, serviceType, category } = getSession(phone);
  sessions.set(phone, {
    ...DEFAULT_SESSION,
    lang,
    location,
    serviceType,
    category,
    step: 'service_menu',
    _greeted: true,
  });
}

// Hard reset — wipes everything, restarts from language selection
function hardReset(phone) {
  sessions.set(phone, { ...DEFAULT_SESSION });
}

module.exports = { getSession, setSession, softReset, categoryReset, hardReset };
