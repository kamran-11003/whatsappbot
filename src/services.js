// ─── Service Configuration ─────────────────────────────────────────────────
// Province → App config + Category tree → Services
// Based on verified bot flow documents (March 2026):
//   PAK App (Islamabad/Federal) — NITB — 41 services
//   Dastak Punjab (Punjab) — PITB — 62 services
//   Dastak KPK (KPK) — KPITB — 36 services
//   Sindh — 5 separate apps — 8 mapped services

// ─── App Configuration per Province ────────────────────────────────────────
const APP_CONFIG = {
  islamabad: {
    nameEn:    'PAK App (Pakistan Citizen Portal)',
    nameUr:    'پاک ایپ (پاکستان سٹیزن پورٹل)',
    playStore: 'https://play.google.com/store/apps/details?id=com.nitb.pak.islamabad',
    appStore:  "Search 'PAK App' on Apple App Store",
    web:       'https://portal.pakistan.gov.pk',
    website:   'www.nitb.gov.pk',
    email:     'cityislamabad.support@nitb.gov.pk',
    helpline:  null,
    model:     'Self-service app + Office visit',
    modelUr:   'سیلف سروس ایپ + دفتری دورہ',
    hours:     'Mon–Fri 9AM–5PM | Sat 9AM–2PM',
    hoursUr:   'پیر–جمعہ صبح 9 سے شام 5 | ہفتہ صبح 9 سے دوپہر 2',
    charge:    'Government fee only',
    chargeUr:  'صرف سرکاری فیس',
  },
  punjab: {
    nameEn:    'Dastak Punjab (Doorstep Services)',
    nameUr:    'داسترک پنجاب (دروازے پر خدمات)',
    playStore: 'https://play.google.com/store/apps/details?id=pk.pitb.gov.dastakHomeDelivery',
    appStore:  "Search 'Dastak' on Apple App Store",
    web:       'https://dastak.punjab.gov.pk',
    website:   'dastak.punjab.gov.pk',
    email:     'support@dastak.punjab.gov.pk',
    helpline:  '1202 (24/7 — any network)',
    model:     'Facilitator visits YOUR HOME — no office visit needed',
    modelUr:   'سہولت کار آپ کے گھر آتا ہے — دفتر جانے کی ضرورت نہیں',
    hours:     '24/7 (Facilitator available 7 days a week)',
    hoursUr:   '24/7 (سہولت کار ہفتے کے 7 دن دستیاب)',
    charge:    'Govt fee + approx Rs. 900–1,200 per service',
    chargeUr:  'سرکاری فیس + تقریباً 900–1,200 روپے فی خدمت',
    courier:   'TCS / Leopard — documents delivered to your home',
    courierUr: 'ٹی سی ایس / لیپرڈ — دستاویزات گھر پر ڈیلیور',
  },
  kpk: {
    nameEn:    'Dastak KPK',
    nameUr:    'داسترک خیبر پختونخواہ',
    playStore: 'https://play.google.com/store/apps/details?id=com.kp_service_delivery_portal',
    appStore:  'https://apps.apple.com/pk/app/dastak-app/id6473087600',
    web:       'https://dastak.kp.gov.pk',
    website:   'www.kpitb.gov.pk',
    email:     'info@kpitb.gov.pk',
    helpline:  null,
    model:     'App submission + Office visit/pickup',
    modelUr:   'ایپ پر درخواست + دفتری دورہ / کلیکشن',
    hours:     'Mon–Fri 9AM–5PM',
    hoursUr:   'پیر–جمعہ صبح 9 سے شام 5',
    charge:    'Government fee only (online payment)',
    chargeUr:  'صرف سرکاری فیس (آن لائن ادائیگی)',
  },
  sindh: {
    // Sindh uses multiple apps — config per service is in SERVICE_TREE
    nameEn:    'E-Services Sindh (Primary App)',
    nameUr:    'ای سروسز سندھ (بنیادی ایپ)',
    playStore: 'https://play.google.com/store/apps/details?id=pk.pitb.gov.eServicesSindh',
    appStore:  'https://apps.apple.com/mm/app/e-services-sindh/id6473825875',
    web:       'https://eservices.sindh.gov.pk',
    website:   'eservices.sindh.gov.pk',
    email:     null,
    helpline:  null,
    model:     'Multiple apps — routed by service type',
    modelUr:   'متعدد ایپس — خدمت کی نوعیت کے مطابق',
    hours:     'Mon–Fri 9AM–5PM',
    hoursUr:   'پیر–جمعہ صبح 9 سے شام 5',
    charge:    'Government fee only',
    chargeUr:  'صرف سرکاری فیس',
  },
};

// Secondary Sindh app configs (used in seed.js for specific services)
const SINDH_APPS = {
  excise: {
    nameEn:    'Excise Sindh',
    nameUr:    'ایکسائز سندھ',
    playStore: 'Search "Excise Sindh" on Google Play',
    appStore:  'Search "Excise Sindh" on Apple App Store',
    web:       'https://excise.gos.pk',
  },
  epay: {
    nameEn:    'ePay Sindh',
    nameUr:    'ای پے سندھ',
    playStore: null,
    appStore:  null,
    web:       'https://epay.gos.pk',
  },
  eservices: {
    nameEn:    'E-Services Sindh',
    nameUr:    'ای سروسز سندھ',
    playStore: 'https://play.google.com/store/apps/details?id=pk.pitb.gov.eServicesSindh',
    appStore:  'https://apps.apple.com/mm/app/e-services-sindh/id6473825875',
    web:       'https://eservices.sindh.gov.pk',
  },
  kwsb: {
    nameEn:    'KWSB OTS (Online Tanker Service)',
    nameUr:    'کے ڈبلیو ایس بی آن لائن ٹینکر سروس',
    playStore: 'Search "KWSB" on Google Play',
    appStore:  'Search "KWSB" on Apple App Store',
    web:       'https://kwsb.gos.pk',
  },
  crms: {
    nameEn:    'CRMS Sindh (Civil Registration — NADRA)',
    nameUr:    'سی آر ایم ایس سندھ (سول رجسٹریشن — نادرا)',
    playStore: 'Contact nearest NADRA office',
    appStore:  'Contact nearest NADRA office',
    web:       'https://nadra.gov.pk',
    note:      'CRMS Sindh launched November 2025 and is still in rollout phase across 30 districts.',
    noteUr:    'سی آر ایم ایس سندھ نومبر 2025 میں شروع ہوا اور ابھی 30 اضلاع میں توسیع ہو رہی ہے۔',
  },
};

// ─── Service Tree ────────────────────────────────────────────────────────────
// SERVICE_TREE[locationKey] = { hasTabs, categories }
// category: { id, labelEn, labelUr, emoji, services: [{id, labelEn, labelUr}] }
// WhatsApp list max = 10 rows. Categories with >10 services are split with a
// "More…" entry where needed.

const SERVICE_TREE = {

  // ── ISLAMABAD / PAK APP — 10 categories, 41 services ──────────────────────
  islamabad: {
    hasTabs: false,
    categories: [
      {
        id: 'isb_excise', emoji: '🚗',
        labelEn: '🚗 Excise — Motor Vehicle',
        labelUr: '🚗 ایکسائز — موٹر گاڑی',
        services: [
          { id: 'isb_exc_1', labelEn: '🔍 Vehicle Verification',         labelUr: '🔍 گاڑی کی تصدیق' },
          { id: 'isb_exc_2', labelEn: '📋 Excise Challan',               labelUr: '📋 ایکسائز چالان' },
          { id: 'isb_exc_3', labelEn: '💳 Smart Card Status',            labelUr: '💳 سمارٹ کارڈ اسٹیٹس' },
          { id: 'isb_exc_4', labelEn: '🧮 Fee Calculator',               labelUr: '🧮 فیس کیلکولیٹر' },
          { id: 'isb_exc_5', labelEn: '📄 View Challans',                labelUr: '📄 چالان دیکھیں' },
          { id: 'isb_exc_6', labelEn: '💰 Other Taxes',                  labelUr: '💰 دیگر ٹیکس' },
        ],
      },
      {
        id: 'isb_transport', emoji: '🚘',
        labelEn: '🚘 Transport / Driving License',
        labelUr: '🚘 ٹرانسپورٹ / ڈرائیونگ لائسنس',
        services: [
          { id: 'isb_tr_1', labelEn: '🔍 Driving License Verification',  labelUr: '🔍 ڈرائیونگ لائسنس تصدیق' },
        ],
      },
      {
        id: 'isb_arms', emoji: '🔫',
        labelEn: '🔫 Arms License (ICT)',
        labelUr: '🔫 اسلحہ لائسنس (آئی سی ٹی)',
        services: [
          { id: 'isb_arms_1', labelEn: '🆕 Arms License (New / Renewal)', labelUr: '🆕 اسلحہ لائسنس (نیا / تجدید)' },
        ],
      },
      {
        id: 'isb_utility', emoji: '⚡',
        labelEn: '⚡ Utility Bills',
        labelUr: '⚡ یوٹیلیٹی بلز',
        services: [
          { id: 'isb_ut_1', labelEn: '⚡ IESCO Electricity Bill',        labelUr: '⚡ آئیسکو بجلی بل' },
          { id: 'isb_ut_2', labelEn: '📞 PTCL Bill',                     labelUr: '📞 پی ٹی سی ایل بل' },
          { id: 'isb_ut_3', labelEn: '🔥 SNGPL Gas Bill',                labelUr: '🔥 ایس این جی پی ایل گیس بل' },
          { id: 'isb_ut_4', labelEn: '📝 Digital Payment Complaint',     labelUr: '📝 ڈیجیٹل پیمنٹ شکایت' },
        ],
      },
      {
        id: 'isb_police', emoji: '🚔',
        labelEn: '🚔 Police & Security',
        labelUr: '🚔 پولیس اور سیکیورٹی',
        services: [
          { id: 'isb_pol_1', labelEn: '🚦 Traffic Challan',              labelUr: '🚦 ٹریفک چالان' },
          { id: 'isb_pol_2', labelEn: '📲 E-Challan',                    labelUr: '📲 ای چالان' },
          { id: 'isb_pol_3', labelEn: '🚖 Taxi Verification',            labelUr: '🚖 ٹیکسی تصدیق' },
          { id: 'isb_pol_4', labelEn: '🏢 Security Company Registration', labelUr: '🏢 سیکیورٹی کمپنی رجسٹریشن' },
        ],
      },
      {
        id: 'isb_localgov', emoji: '📜',
        labelEn: '📜 Domicile Certificate',
        labelUr: '📜 ڈومیسائل سرٹیفکیٹ',
        services: [
          { id: 'isb_dom_1', labelEn: '📜 Domicile Certificate',         labelUr: '📜 ڈومیسائل سرٹیفکیٹ' },
        ],
      },
      {
        id: 'isb_education', emoji: '🎓',
        labelEn: '🎓 Education (FBISE / HEC)',
        labelUr: '🎓 تعلیم (ایف بی آئی ایس ای / ایچ ای سی)',
        services: [
          { id: 'isb_edu_1', labelEn: '📋 Migration Certificate',        labelUr: '📋 مائیگریشن سرٹیفکیٹ' },
          { id: 'isb_edu_2', labelEn: '✅ Result Card Verification',      labelUr: '✅ رزلٹ کارڈ تصدیق' },
          { id: 'isb_edu_3', labelEn: '📄 Certificate Verification',     labelUr: '📄 سرٹیفکیٹ تصدیق' },
          { id: 'isb_edu_4', labelEn: '📑 Duplicate Marks Sheet',        labelUr: '📑 ڈپلیکیٹ مارکس شیٹ' },
          { id: 'isb_edu_5', labelEn: '✏️ Correction in Name',           labelUr: '✏️ نام میں ترمیم' },
          { id: 'isb_edu_6', labelEn: '🔄 Change of Subject',            labelUr: '🔄 مضمون تبدیل' },
          { id: 'isb_edu_7', labelEn: '🔢 Recounting HSSC',              labelUr: '🔢 ایچ ایس ایس سی ری کاؤنٹنگ' },
          { id: 'isb_edu_8', labelEn: '🔍 Document Tracking',            labelUr: '🔍 دستاویز ٹریکنگ' },
          { id: 'isb_edu_9', labelEn: '🎓 HEC Verify Document',          labelUr: '🎓 ایچ ای سی دستاویز تصدیق' },
          { id: 'isb_edu_10', labelEn: '❌ Result Cancellation',         labelUr: '❌ نتیجہ منسوخی' },
        ],
      },
      {
        id: 'isb_cityguide', emoji: '🏙️',
        labelEn: '🏙️ City Guide & Information',
        labelUr: '🏙️ شہر گائیڈ اور معلومات',
        services: [
          { id: 'isb_cg_1', labelEn: '🚌 Metro Bus Route',               labelUr: '🚌 میٹرو بس روٹ' },
          { id: 'isb_cg_2', labelEn: '🆘 Emergency Numbers',             labelUr: '🆘 ہنگامی نمبر' },
          { id: 'isb_cg_3', labelEn: '🗺️ Explore Islamabad',             labelUr: '🗺️ اسلام آباد دریافت کریں' },
        ],
      },
      {
        id: 'isb_ict', emoji: '🏛️',
        labelEn: '🏛️ ICT Services',
        labelUr: '🏛️ آئی سی ٹی خدمات',
        services: [
          { id: 'isb_ict_1', labelEn: '🌍 International Driving Permit', labelUr: '🌍 انٹرنیشنل ڈرائیونگ پرمٹ' },
          { id: 'isb_ict_2', labelEn: '🚨 Report Violation',             labelUr: '🚨 خلاف ورزی رپورٹ' },
          { id: 'isb_ict_3', labelEn: '⛽ Jerrycan Fuel NOC',            labelUr: '⛽ جیری کین فیول این او سی' },
          { id: 'isb_ict_4', labelEn: '🎱 Snooker Club NOC',             labelUr: '🎱 سنوکر کلب این او سی' },
          { id: 'isb_ict_5', labelEn: '💨 Shisha NOC',                   labelUr: '💨 شیشہ این او سی' },
        ],
      },
      {
        id: 'isb_other', emoji: '📦',
        labelEn: '📦 Other Services',
        labelUr: '📦 دیگر خدمات',
        services: [
          { id: 'isb_oth_1', labelEn: '💼 National Jobs Portal',         labelUr: '💼 نیشنل جابز پورٹل' },
          { id: 'isb_oth_2', labelEn: '📱 PTA Services',                 labelUr: '📱 پی ٹی اے خدمات' },
          { id: 'isb_oth_3', labelEn: '📜 Apostille',                    labelUr: '📜 اپوسٹیل' },
          { id: 'isb_oth_4', labelEn: '🎓 NCERT',                        labelUr: '🎓 این سی ای آر ٹی' },
          { id: 'isb_oth_5', labelEn: '🔍 NDEL Verification',            labelUr: '🔍 این ڈی ای ایل تصدیق' },
          { id: 'isb_oth_6', labelEn: '⭐ Feedback',                     labelUr: '⭐ رائے' },
        ],
      },
    ],
  },

  // ── PUNJAB / DASTAK PUNJAB — 2 tabs, 14 categories, 62 services ───────────
  punjab: {
    hasTabs: true,
    tabs: {
      citizen: {
        labelEn: '👤 Citizen Services',
        labelUr: '👤 شہری خدمات',
        categories: [
          {
            id: 'pun_localgov', emoji: '📜',
            labelEn: '📜 Local Government — Certificates',
            labelUr: '📜 مقامی حکومت — سرٹیفکیٹس',
            services: [
              { id: 'pun_lg_1',  labelEn: '📜 New Domicile Certificate',     labelUr: '📜 نیا ڈومیسائل سرٹیفکیٹ' },
              { id: 'pun_lg_2',  labelEn: '🔁 Duplicate Domicile',           labelUr: '🔁 ڈپلیکیٹ ڈومیسائل' },
              { id: 'pun_lg_3',  labelEn: '✏️ Modification of Domicile',     labelUr: '✏️ ڈومیسائل ترمیم' },
              { id: 'pun_lg_4',  labelEn: '🔀 NOC for Domicile Transfer',    labelUr: '🔀 ڈومیسائل ٹرانسفر این او سی' },
              { id: 'pun_lg_5',  labelEn: '👶 Birth Certificate',            labelUr: '👶 پیدائش سرٹیفکیٹ' },
              { id: 'pun_lg_6',  labelEn: '🕊️ Death Certificate',            labelUr: '🕊️ وفات سرٹیفکیٹ' },
              { id: 'pun_lg_7',  labelEn: '💍 Marriage Certificate (Nikah)', labelUr: '💍 نکاح نامہ سرٹیفکیٹ' },
              { id: 'pun_lg_8',  labelEn: '⚖️ Divorce Certificate',          labelUr: '⚖️ طلاق سرٹیفکیٹ' },
            ],
          },
          {
            id: 'pun_excise', emoji: '🚗',
            labelEn: '🚗 Excise & Taxation — Vehicle',
            labelUr: '🚗 ایکسائز اور ٹیکسیشن — گاڑی',
            services: [
              { id: 'pun_exc_1', labelEn: '🆕 New Vehicle Registration',     labelUr: '🆕 نئی گاڑی رجسٹریشن' },
              { id: 'pun_exc_2', labelEn: '🔄 Transfer of Motor Vehicle',    labelUr: '🔄 موٹر گاڑی ٹرانسفر' },
              { id: 'pun_exc_3', labelEn: '💰 Token Tax Payment',            labelUr: '💰 ٹوکن ٹیکس ادائیگی' },
              { id: 'pun_exc_4', labelEn: '🔍 Vehicle Verification',         labelUr: '🔍 گاڑی تصدیق' },
              { id: 'pun_exc_5', labelEn: '📋 Duplicate Driving License',    labelUr: '📋 ڈپلیکیٹ ڈرائیونگ لائسنس' },
              { id: 'pun_exc_6', labelEn: '🆕 Learner Driving License',      labelUr: '🆕 لرنر ڈرائیونگ لائسنس' },
              { id: 'pun_exc_7', labelEn: '🌍 International Driving License', labelUr: '🌍 انٹرنیشنل ڈرائیونگ لائسنس' },
              { id: 'pun_exc_8', labelEn: '🔁 Renew Learner DL',             labelUr: '🔁 لرنر ڈی ایل تجدید' },
              { id: 'pun_exc_9', labelEn: '🔁 Renew Regular DL',             labelUr: '🔁 ریگولر ڈی ایل تجدید' },
            ],
          },
          {
            id: 'pun_revenue', emoji: '🏠',
            labelEn: '🏠 Revenue & Property',
            labelUr: '🏠 ریونیو اور جائیداد',
            services: [
              { id: 'pun_rev_1', labelEn: '💰 Pay Property Tax',            labelUr: '💰 جائیداد ٹیکس ادائیگی' },
              { id: 'pun_rev_2', labelEn: '📄 Property Tax NOC',             labelUr: '📄 جائیداد ٹیکس این او سی' },
              { id: 'pun_rev_3', labelEn: '🌾 Cotton Fee',                   labelUr: '🌾 کپاس فیس' },
              { id: 'pun_rev_4', labelEn: '💼 Professional Tax',             labelUr: '💼 پروفیشنل ٹیکس' },
              { id: 'pun_rev_5', labelEn: '🏷️ eAuction Payments',           labelUr: '🏷️ ای نیلامی ادائیگی' },
              { id: 'pun_rev_6', labelEn: '📋 E-Stamping',                   labelUr: '📋 ای سٹیمپنگ' },
              { id: 'pun_rev_7', labelEn: '📑 Get Mutation Copy (Intiqal)',  labelUr: '📑 انتقال کاپی' },
              { id: 'pun_rev_8', labelEn: '📝 Get Registry Copy',            labelUr: '📝 رجسٹری کاپی' },
              { id: 'pun_rev_9', labelEn: '🌍 New Fard Issuance',            labelUr: '🌍 نئی فرد اجراء' },
            ],
          },
          {
            id: 'pun_police', emoji: '🚔',
            labelEn: '🚔 Police & Security Services',
            labelUr: '🚔 پولیس اور سیکیورٹی خدمات',
            services: [
              { id: 'pun_pol_1', labelEn: '📄 Character Certificate',        labelUr: '📄 کردار سرٹیفکیٹ' },
              { id: 'pun_pol_2', labelEn: '📋 Copy of FIR',                  labelUr: '📋 ایف آئی آر کاپی' },
              { id: 'pun_pol_3', labelEn: '🚨 Crime Report',                 labelUr: '🚨 جرم رپورٹ' },
              { id: 'pun_pol_4', labelEn: '✅ General Police Verification',  labelUr: '✅ پولیس تصدیق' },
              { id: 'pun_pol_5', labelEn: '📋 Loss Report',                  labelUr: '📋 گم شدہ اشیاء رپورٹ' },
              { id: 'pun_pol_6', labelEn: '🏠 Tenant Registration',          labelUr: '🏠 کرایہ دار رجسٹریشن' },
              { id: 'pun_pol_7', labelEn: '🚦 Safe City Traffic Challan',    labelUr: '🚦 سیف سٹی ٹریفک چالان' },
              { id: 'pun_pol_8', labelEn: '🚦 Traffic Challan (Punjab Police)', labelUr: '🚦 ٹریفک چالان (پنجاب پولیس)' },
            ],
          },
          {
            id: 'pun_fisheries', emoji: '🐟',
            labelEn: '🐟 E-License Fisheries',
            labelUr: '🐟 ای لائسنس فشریز',
            services: [
              { id: 'pun_fish_1', labelEn: '🐟 Fisheries E-License',         labelUr: '🐟 فشریز ای لائسنس' },
            ],
          },
        ],
      },
      business: {
        labelEn: '🏭 Business Services',
        labelUr: '🏭 کاروباری خدمات',
        categories: [
          {
            id: 'pun_industries', emoji: '🏭',
            labelEn: '🏭 Industries, Commerce & Skills',
            labelUr: '🏭 صنعت، تجارت اور ہنرمندی',
            services: [
              { id: 'pun_ind_1', labelEn: '📋 Registration of Inspection Authority', labelUr: '📋 معائنہ اتھارٹی رجسٹریشن' },
            ],
          },
          {
            id: 'pun_epa', emoji: '🌿',
            labelEn: '🌿 Environmental Protection (EPA)',
            labelUr: '🌿 ماحولیاتی تحفظ (ای پی اے)',
            services: [
              { id: 'pun_epa_1', labelEn: '✅ Confirmation of Compliance (HQ)',   labelUr: '✅ تعمیل کی تصدیق (ایچ کیو)' },
              { id: 'pun_epa_2', labelEn: '📋 Env. Approval IEE (District)',      labelUr: '📋 ماحولیاتی منظوری آئی ای ای (ضلع)' },
              { id: 'pun_epa_3', labelEn: '📋 Env. Approval IEE (Division)',      labelUr: '📋 ماحولیاتی منظوری آئی ای ای (ڈویژن)' },
              { id: 'pun_epa_4', labelEn: '📋 Env. Approval EIA (EPA HQ)',        labelUr: '📋 ماحولیاتی منظوری ای آئی اے (ایچ کیو)' },
              { id: 'pun_epa_5', labelEn: '📋 Env. Approval IEE (EPA HQ)',        labelUr: '📋 ماحولیاتی منظوری آئی ای ای (ایچ کیو)' },
              { id: 'pun_epa_6', labelEn: '🚢 Import/Export Env. Recommendation', labelUr: '🚢 درآمد/برآمد ماحولیاتی سفارش' },
            ],
          },
          {
            id: 'pun_livestock', emoji: '🐄',
            labelEn: '🐄 Livestock & Dairy Development',
            labelUr: '🐄 لائیو اسٹاک اور ڈیری ترقی',
            services: [
              { id: 'pun_live_1',  labelEn: '📋 Animal Feed Mill License',         labelUr: '📋 جانور فیڈ مل لائسنس' },
              { id: 'pun_live_2',  labelEn: '📋 AI Training Institute License',    labelUr: '📋 اے آئی ٹریننگ انسٹیٹیوٹ لائسنس' },
              { id: 'pun_live_3',  labelEn: '📋 Semen Production Unit License',   labelUr: '📋 سیمن پروڈکشن یونٹ لائسنس' },
              { id: 'pun_live_4',  labelEn: '📋 AI Technicians License',           labelUr: '📋 اے آئی ٹیکنیشن لائسنس' },
              { id: 'pun_live_5',  labelEn: '📋 Semen Distributor License',        labelUr: '📋 سیمن ڈسٹریبیوٹر لائسنس' },
              { id: 'pun_live_6',  labelEn: '📋 Semen/Embryo Importer License',   labelUr: '📋 سیمن/ایمبریو امپورٹر لائسنس' },
              { id: 'pun_live_7',  labelEn: '📋 NOC for Animal Feed Mill',         labelUr: '📋 جانور فیڈ مل این او سی' },
              { id: 'pun_live_8',  labelEn: '📋 NOC for Poultry Feed Mill',        labelUr: '📋 پولٹری فیڈ مل این او سی' },
              { id: 'pun_live_9',  labelEn: '🔁 Renew AI Technician License',     labelUr: '🔁 اے آئی ٹیکنیشن لائسنس تجدید' },
              { id: 'pun_live_10', labelEn: '🔁 Renew Semen Production License',  labelUr: '🔁 سیمن پروڈکشن لائسنس تجدید' },
            ],
          },
          {
            id: 'pun_energy', emoji: '⚡',
            labelEn: '⚡ Energy Department',
            labelUr: '⚡ محکمہ توانائی',
            services: [
              { id: 'pun_eng_1', labelEn: '⚡ Power Plant Grid Connection Sanction', labelUr: '⚡ پاور پلانٹ گرڈ کنکشن منظوری' },
            ],
          },
          {
            id: 'pun_tourism', emoji: '🗺️',
            labelEn: '🗺️ Tourist Services',
            labelUr: '🗺️ سیاحتی خدمات',
            services: [
              { id: 'pun_tour_1', labelEn: '🏷️ Tourist Guide License',            labelUr: '🏷️ سیاحتی گائیڈ لائسنس' },
            ],
          },
          {
            id: 'pun_health', emoji: '🏥',
            labelEn: '🏥 District Health Authorities',
            labelUr: '🏥 ضلعی صحت اتھارٹیز',
            services: [
              { id: 'pun_health_1', labelEn: '📋 Free Sale Certificate',           labelUr: '📋 فری سیل سرٹیفکیٹ' },
            ],
          },
          {
            id: 'pun_home', emoji: '🏠',
            labelEn: '🏠 Home Department',
            labelUr: '🏠 محکمہ داخلہ',
            services: [
              { id: 'pun_home_1', labelEn: '🔥 Fire Prevention NOC',              labelUr: '🔥 فائر پریوینشن این او سی' },
            ],
          },
          {
            id: 'pun_pfa', emoji: '🍽️',
            labelEn: '🍽️ Punjab Food Authority',
            labelUr: '🍽️ پنجاب فوڈ اتھارٹی',
            services: [
              { id: 'pun_pfa_1', labelEn: '📋 Product Registration Certificate',  labelUr: '📋 پروڈکٹ رجسٹریشن سرٹیفکیٹ' },
              { id: 'pun_pfa_2', labelEn: '🍽️ Food Business License',             labelUr: '🍽️ فوڈ بزنس لائسنس' },
              { id: 'pun_pfa_3', labelEn: '🏷️ Label Approval Letter',             labelUr: '🏷️ لیبل اپروول خط' },
            ],
          },
          {
            id: 'pun_irrigation', emoji: '💧',
            labelEn: '💧 Irrigation Department',
            labelUr: '💧 محکمہ آبپاشی',
            services: [
              { id: 'pun_irr_1', labelEn: '🌊 Flood Zone Clearance Certificate',  labelUr: '🌊 سیلابی علاقہ کلیئرنس سرٹیفکیٹ' },
            ],
          },
        ],
      },
    },
  },

  // ── KPK / DASTAK KPK — 9 categories, 36 services ─────────────────────────
  kpk: {
    hasTabs: false,
    categories: [
      {
        id: 'kpk_excise', emoji: '🚗',
        labelEn: '🚗 Excise — Motor Vehicle',
        labelUr: '🚗 ایکسائز — موٹر گاڑی',
        services: [
          { id: 'kpk_exc_1', labelEn: '🔍 Vehicle Verification',          labelUr: '🔍 گاڑی تصدیق' },
          { id: 'kpk_exc_2', labelEn: '🆕 New Vehicle Registration',      labelUr: '🆕 نئی گاڑی رجسٹریشن' },
          { id: 'kpk_exc_3', labelEn: '💰 Pay Token Tax',                 labelUr: '💰 ٹوکن ٹیکس ادائیگی' },
          { id: 'kpk_exc_4', labelEn: '💰 Pay Token Tax (Other Vehicle)', labelUr: '💰 دوسری گاڑی ٹوکن ٹیکس' },
          { id: 'kpk_exc_5', labelEn: '🔢 Apply Universal Number Plate',  labelUr: '🔢 یونیورسل نمبر پلیٹ درخواست' },
          { id: 'kpk_exc_6', labelEn: '📋 Replace Damaged Reg. Book',     labelUr: '📋 خراب رجسٹریشن بک بدلیں' },
          { id: 'kpk_exc_7', labelEn: '📋 Duplicate Registration Book',   labelUr: '📋 ڈپلیکیٹ رجسٹریشن بک' },
          { id: 'kpk_exc_8', labelEn: '📋 Duplicate Number Plate',        labelUr: '📋 ڈپلیکیٹ نمبر پلیٹ' },
          { id: 'kpk_exc_9', labelEn: '🔍 Track Excise Applications',     labelUr: '🔍 ایکسائز درخواستیں ٹریک کریں' },
        ],
      },
      {
        id: 'kpk_transport', emoji: '🚘',
        labelEn: '🚘 Transport / Driving License',
        labelUr: '🚘 ٹرانسپورٹ / ڈرائیونگ لائسنس',
        services: [
          { id: 'kpk_tr_1', labelEn: '🔍 Verify Driving License',         labelUr: '🔍 ڈرائیونگ لائسنس تصدیق' },
          { id: 'kpk_tr_2', labelEn: '🆕 New Driving License',            labelUr: '🆕 نیا ڈرائیونگ لائسنس' },
          { id: 'kpk_tr_3', labelEn: '🔍 Track Transport Applications',   labelUr: '🔍 ٹرانسپورٹ درخواستیں ٹریک' },
        ],
      },
      {
        id: 'kpk_arms_personal', emoji: '🔫',
        labelEn: '🔫 Arms License (Personal)',
        labelUr: '🔫 اسلحہ لائسنس (ذاتی)',
        services: [
          { id: 'kpk_arm_1', labelEn: '🆕 New / Fresh Arms License',      labelUr: '🆕 نیا اسلحہ لائسنس' },
          { id: 'kpk_arm_2', labelEn: '💳 Copy to Smart Card Conversion', labelUr: '💳 سمارٹ کارڈ تبدیلی' },
          { id: 'kpk_arm_3', labelEn: '🔁 Renew Expired License',         labelUr: '🔁 میعاد ختم لائسنس تجدید' },
          { id: 'kpk_arm_4', labelEn: '🔄 Weapon Change',                 labelUr: '🔄 ہتھیار تبدیلی' },
          { id: 'kpk_arm_5', labelEn: '📈 Cartridge Increase',            labelUr: '📈 کارتوس اضافہ' },
          { id: 'kpk_arm_6', labelEn: '🔁 Duplicate Card',                labelUr: '🔁 ڈپلیکیٹ کارڈ' },
          { id: 'kpk_arm_7', labelEn: '🌍 Provincial to All Pakistan',    labelUr: '🌍 صوبائی سے آل پاکستان' },
          { id: 'kpk_arm_8', labelEn: '🔍 Track Arms Applications',       labelUr: '🔍 اسلحہ درخواستیں ٹریک' },
        ],
      },
      {
        id: 'kpk_arms_business', emoji: '🏭',
        labelEn: '🏭 Arms & Ammunition (Business)',
        labelUr: '🏭 اسلحہ اور گولہ بارود (کاروبار)',
        services: [
          { id: 'kpk_arb_1',  labelEn: '🆕 New Dealership License',       labelUr: '🆕 نئی ڈیلرشپ لائسنس' },
          { id: 'kpk_arb_2',  labelEn: '🆕 Manufacturing License',        labelUr: '🆕 مینوفیکچرنگ لائسنس' },
          { id: 'kpk_arb_3',  labelEn: '🆕 Repair Shop License',          labelUr: '🆕 مرمت شاپ لائسنس' },
          { id: 'kpk_arb_4',  labelEn: '🔁 Renewal License',              labelUr: '🔁 تجدید لائسنس' },
          { id: 'kpk_arb_5',  labelEn: '🔄 Conversion (Old to New Forms)', labelUr: '🔄 پرانے سے نئے فارمز تبدیلی' },
          { id: 'kpk_arb_6',  labelEn: '➕ Addition of New Forms',        labelUr: '➕ نئے فارمز اضافہ' },
          { id: 'kpk_arb_7',  labelEn: '✏️ Change Business Title',        labelUr: '✏️ کاروباری نام تبدیل' },
          { id: 'kpk_arb_8',  labelEn: '📍 Change Business Location',     labelUr: '📍 کاروباری مقام تبدیل' },
          { id: 'kpk_arb_9',  labelEn: '👤 Add Sales Agent',              labelUr: '👤 سیلز ایجنٹ شامل کریں' },
          { id: 'kpk_arb_10', labelEn: '🤝 Business Transfer Ownership',  labelUr: '🤝 کاروبار ملکیت منتقلی' },
        ],
      },
      {
        id: 'kpk_propertytax', emoji: '🏠',
        labelEn: '🏠 Property Tax',
        labelUr: '🏠 جائیداد ٹیکس',
        services: [
          { id: 'kpk_pt_1', labelEn: '💰 Pay Property Tax',               labelUr: '💰 جائیداد ٹیکس ادائیگی' },
        ],
      },
      {
        id: 'kpk_housing', emoji: '🏘️',
        labelEn: '🏘️ Housing',
        labelUr: '🏘️ ہاؤسنگ',
        services: [
          { id: 'kpk_hs_1', labelEn: '🏠 Housing Foundation (Govt Servants)', labelUr: '🏠 ہاؤسنگ فاؤنڈیشن (سرکاری ملازمین)' },
          { id: 'kpk_hs_2', labelEn: '🏙️ KP Housing Authority',           labelUr: '🏙️ کے پی ہاؤسنگ اتھارٹی' },
        ],
      },
      {
        id: 'kpk_wildlife', emoji: '🦅',
        labelEn: '🦅 Wildlife & Hunting',
        labelUr: '🦅 وائلڈ لائف اور شکار',
        services: [
          { id: 'kpk_wl_1', labelEn: '🏹 Hunting License',                labelUr: '🏹 شکار لائسنس' },
        ],
      },
      {
        id: 'kpk_other', emoji: '📋',
        labelEn: '📋 Other Services',
        labelUr: '📋 دیگر خدمات',
        services: [
          { id: 'kpk_oth_1', labelEn: '🔍 Driving License Verification',  labelUr: '🔍 ڈرائیونگ لائسنس تصدیق' },
        ],
      },
      {
        id: 'kpk_track', emoji: '🔍',
        labelEn: '🔍 Track All Applications',
        labelUr: '🔍 تمام درخواستیں ٹریک کریں',
        services: [
          { id: 'kpk_trk_1', labelEn: '🔍 Track My Applications',         labelUr: '🔍 میری درخواستیں ٹریک' },
        ],
      },
    ],
  },

  // ── SINDH — 8 services (flat list, no category level) ─────────────────────
  sindh: {
    hasTabs: false,
    flat: true,   // skip category step, go straight to service_menu
    categories: [
      {
        id: 'sindh_all', emoji: '🏛️',
        labelEn: '🏛️ Sindh Government Services',
        labelUr: '🏛️ سندھ سرکاری خدمات',
        services: [
          { id: 'sindh_1', labelEn: '🚗 Vehicle Registration',            labelUr: '🚗 گاڑی رجسٹریشن' },
          { id: 'sindh_2', labelEn: '🏠 Property Tax',                    labelUr: '🏠 جائیداد ٹیکس' },
          { id: 'sindh_3', labelEn: '💳 Domicile Certificate',            labelUr: '💳 ڈومیسائل سرٹیفکیٹ' },
          { id: 'sindh_4', labelEn: '👶 Birth Certificate',               labelUr: '👶 پیدائش سرٹیفکیٹ' },
          { id: 'sindh_5', labelEn: '🏥 Health Services',                 labelUr: '🏥 صحت خدمات' },
          { id: 'sindh_6', labelEn: '⚡ Electricity Bill',                labelUr: '⚡ بجلی بل' },
          { id: 'sindh_7', labelEn: '💧 Water Bill (KWSB)',               labelUr: '💧 پانی بل (کے ڈبلیو ایس بی)' },
          { id: 'sindh_8', labelEn: '📋 All Services (E-Services Sindh)', labelUr: '📋 تمام خدمات (ای سروسز سندھ)' },
        ],
      },
    ],
  },
};

// ─── Helper: get all categories for a province (and optional tab) ─────────
function getCategories(locationKey, serviceType = null) {
  const tree = SERVICE_TREE[locationKey];
  if (!tree) return [];
  if (tree.hasTabs && serviceType) {
    return tree.tabs[serviceType]?.categories || [];
  }
  return tree.categories || [];
}

// ─── Helper: get category by id ───────────────────────────────────────────
function getCategoryById(locationKey, categoryId, serviceType = null) {
  return getCategories(locationKey, serviceType).find(c => c.id === categoryId) || null;
}

// ─── Helper: get service by id within a category ─────────────────────────
function getServiceById(locationKey, categoryId, serviceId, serviceType = null) {
  const cat = getCategoryById(locationKey, categoryId, serviceType);
  if (!cat) return null;
  return cat.services.find(s => s.id === serviceId) || null;
}

// ─── Location labels ──────────────────────────────────────────────────────
const LOCATIONS    = ['Islamabad', 'Punjab', 'Khyber Pakhtunkhwa (KPK)', 'Sindh'];
const LOCATIONS_UR = ['اسلام آباد', 'پنجاب', 'خیبر پختونخواہ', 'سندھ'];
const LOCATION_KEYS = ['islamabad', 'punjab', 'kpk', 'sindh'];

const LOC_MAP = {
  'loc_1': 'islamabad', 'loc_2': 'punjab', 'loc_3': 'kpk', 'loc_4': 'sindh',
  '1': 'islamabad', '2': 'punjab', '3': 'kpk', '4': 'sindh',
  'islamabad': 'islamabad', 'punjab': 'punjab', 'kpk': 'kpk', 'sindh': 'sindh',
};

module.exports = {
  APP_CONFIG,
  SINDH_APPS,
  SERVICE_TREE,
  getCategories,
  getCategoryById,
  getServiceById,
  LOCATIONS,
  LOCATIONS_UR,
  LOCATION_KEYS,
  LOC_MAP,
};
