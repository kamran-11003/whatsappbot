// ─── Department Details Seed Data ────────────────────────────────────────────
// Shown to the user BEFORE the province selection prompt.
// Each entry has English (en) and Urdu (ur) versions.
// Index matches DEPARTMENTS array in services.js

const deptDetails = [

  // 0 — View Complaint
  {
    en:
      '📌 *How to View / Submit a Complaint*\n\n' +
      '• You can check the status of an existing complaint or lodge a new one.\n' +
      '• Complaints are tracked through the provincial grievance portals.\n' +
      '• Keep your complaint reference number handy.\n' +
      '• Average response time: 3–7 working days.\n\n' +
      '📞 NITB Helpline: *111-000-722*',
    ur:
      '📌 *شکایت کیسے دیکھیں / درج کریں*\n\n' +
      '• آپ موجودہ شکایت کی صورتحال چیک کر سکتے ہیں یا نئی درج کر سکتے ہیں۔\n' +
      '• شکایات صوبائی گریوانس پورٹلز کے ذریعے ٹریک کی جاتی ہیں۔\n' +
      '• اپنا شکایت حوالہ نمبر تیار رکھیں۔\n' +
      '• اوسط جوابی وقت: 3 سے 7 کاری دن۔\n\n' +
      '📞 NITB ہیلپ لائن: *111-000-722*',
  },

  // 1 — NADRA
  {
    en:
      '🪪 *NADRA — National Database & Registration Authority*\n\n' +
      '• *CNIC* (Computerised National Identity Card) — new, renewal, duplicate\n' +
      '• *NICOP* — National Identity Card for Overseas Pakistanis\n' +
      '• *Smart Card* — biometric national ID card\n' +
      '• *Birth Certificate* — online registration and verification\n' +
      '• *Family Registration Certificate (FRC)*\n' +
      '• *Pakistan Origin Card (POC)* for foreign nationals of Pakistani origin\n\n' +
      '📞 NADRA Helpline: *1800*\n' +
      '🕐 Office Hours: Mon–Sat, 9am–5pm',
    ur:
      '🪪 *نادرا — قومی ڈیٹابیس اور رجسٹریشن اتھارٹی*\n\n' +
      '• *شناختی کارڈ* — نیا، تجدید، ڈپلیکیٹ\n' +
      '• *نیکوپ* — بیرون ملک پاکستانیوں کا شناختی کارڈ\n' +
      '• *سمارٹ کارڈ* — بایومیٹرک قومی شناختی کارڈ\n' +
      '• *پیدائش سرٹیفکیٹ* — آن لائن رجسٹریشن اور تصدیق\n' +
      '• *خاندانی رجسٹریشن سرٹیفکیٹ (ایف آر سی)*\n' +
      '• *پاکستان اوریجن کارڈ (پی او سی)*\n\n' +
      '📞 نادرا ہیلپ لائن: *1800*\n' +
      '🕐 دفتری اوقات: پیر تا ہفتہ، صبح 9 سے شام 5 بجے',
  },

  // 2 — Police
  {
    en:
      '👮 *Police Services*\n\n' +
      '• *FIR (First Information Report)* — lodge online or in person\n' +
      '• *Character Certificate* — for jobs, visa, education\n' +
      '• *Police Verification* — tenant, servant, employee\n' +
      '• *Missing Person Report*\n' +
      '• *Stolen Vehicle / Mobile Report*\n' +
      '• *Rescue 15* — emergency response\n\n' +
      '🆘 Emergency: *15*\n' +
      '📞 Complaints: *8787* (Punjab) / *1715* (Sindh)',
    ur:
      '👮 *پولیس سروسز*\n\n' +
      '• *ایف آئی آر* — آن لائن یا ذاتی طور پر درج کریں\n' +
      '• *کردار سرٹیفکیٹ* — ملازمت، ویزا، تعلیم کے لیے\n' +
      '• *پولیس تصدیق* — کرایہ دار، ملازم، نوکر\n' +
      '• *گمشدہ شخص کی رپورٹ*\n' +
      '• *گمشدہ گاڑی / موبائل کی رپورٹ*\n' +
      '• *ریسکیو 15* — ہنگامی ردعمل\n\n' +
      '🆘 ہنگامی صورت: *15*\n' +
      '📞 شکایات: *8787* (پنجاب) / *1715* (سندھ)',
  },

  // 3 — Traffic Police
  {
    en:
      '🚦 *Traffic Police Services*\n\n' +
      '• *Driving License* — new, renewal, duplicate, learner\n' +
      '• *Challan / Fine Payment* — check and pay online\n' +
      '• *Vehicle Registration Certificate (RC)* — duplicate, transfer\n' +
      '• *Token Tax* — annual vehicle token tax payment\n' +
      '• *Fitness Certificate* — mandatory for commercial vehicles\n' +
      '• *International Driving Permit (IDP)*\n\n' +
      '📞 Traffic Helpline: *1915*\n' +
      '🌐 License portal available after selecting province',
    ur:
      '🚦 *ٹریفک پولیس سروسز*\n\n' +
      '• *ڈرائیونگ لائسنس* — نیا، تجدید، ڈپلیکیٹ، لرنر\n' +
      '• *چالان / جرمانہ ادائیگی* — آن لائن چیک اور ادا کریں\n' +
      '• *گاڑی رجسٹریشن سرٹیفکیٹ* — ڈپلیکیٹ، منتقلی\n' +
      '• *ٹوکن ٹیکس* — سالانہ گاڑی ٹوکن ٹیکس\n' +
      '• *فٹنس سرٹیفکیٹ* — تجارتی گاڑیوں کے لیے لازمی\n' +
      '• *انٹرنیشنل ڈرائیونگ پرمٹ (آئی ڈی پی)*\n\n' +
      '📞 ٹریفک ہیلپ لائن: *1915*',
  },

  // 4 — K Electric
  {
    en:
      '⚡ *K-Electric Services* (Karachi only)\n\n' +
      '• *Bill Payment* — online via ke.com.pk or Easy Paisa / JazzCash\n' +
      '• *New Connection* — residential and commercial\n' +
      '• *Load Shedding Schedule* — check area-wise schedule\n' +
      '• *Complaint* — power outage, overbilling, meter fault\n' +
      '• *Meter Change Request*\n' +
      '• *Net Metering* — solar energy connection\n\n' +
      '📞 K-Electric 24/7 Helpline: *118*\n' +
      '⚠️ This service is only available in Sindh (Karachi)',
    ur:
      '⚡ *کے الیکٹرک سروسز* (صرف کراچی)\n\n' +
      '• *بل ادائیگی* — ke.com.pk یا ایزی پیسہ / جیز کیش کے ذریعے\n' +
      '• *نیا کنیکشن* — رہائشی اور تجارتی\n' +
      '• *لوڈ شیڈنگ شیڈول* — علاقہ وار شیڈول چیک کریں\n' +
      '• *شکایت* — بجلی بندش، زیادہ بلنگ، میٹر خرابی\n' +
      '• *میٹر تبدیلی درخواست*\n\n' +
      '📞 کے الیکٹرک 24/7 ہیلپ لائن: *118*\n' +
      '⚠️ یہ سروس صرف سندھ (کراچی) میں دستیاب ہے',
  },

  // 5 — KMC
  {
    en:
      '🏙️ *KMC — Karachi Metropolitan Corporation*\n\n' +
      '• *Birth & Death Certificate* — registration and copies\n' +
      '• *Trade License* — new and renewal for businesses\n' +
      '• *Building Plan Approval* — residential and commercial\n' +
      '• *Solid Waste / Garbage Complaint*\n' +
      '• *Road & Footpath Repair Complaint*\n' +
      '• *Property Tax* — check and payment\n\n' +
      '📞 KMC Helpline: *021-99251300*\n' +
      '⚠️ This service is only available in Sindh (Karachi)',
    ur:
      '🏙️ *کے ایم سی — کراچی میٹروپولیٹن کارپوریشن*\n\n' +
      '• *پیدائش اور موت کا سرٹیفکیٹ* — رجسٹریشن اور نقول\n' +
      '• *تجارتی لائسنس* — نیا اور تجدید\n' +
      '• *عمارت منصوبہ منظوری*\n' +
      '• *کوڑا کرکٹ شکایت*\n' +
      '• *سڑک اور فٹ پاتھ مرمت شکایت*\n' +
      '• *جائیداد ٹیکس* — چیک اور ادائیگی\n\n' +
      '📞 کے ایم سی ہیلپ لائن: *021-99251300*',
  },

  // 6 — Sui Gas
  {
    en:
      '🔥 *Sui Gas Services*\n\n' +
      '• *SSGC* (Sindh & Balochistan) — ssgc.com.pk\n' +
      '• *SNGPL* (Punjab, KP & Federal) — sngpl.com.pk\n\n' +
      '*Available Services:*\n' +
      '• Bill payment and duplicate bill\n' +
      '• Gas leakage complaint (24/7 emergency)\n' +
      '• New connection application\n' +
      '• Load management and pressure complaints\n' +
      '• Meter change request\n\n' +
      '🆘 Gas Emergency (SSGC): *119*\n' +
      '🆘 Gas Emergency (SNGPL): *1199*',
    ur:
      '🔥 *سوئی گیس سروسز*\n\n' +
      '• *ایس ایس جی سی* (سندھ و بلوچستان) — ssgc.com.pk\n' +
      '• *ایس این جی پی ایل* (پنجاب، کے پی اور وفاقی) — sngpl.com.pk\n\n' +
      '*دستیاب سروسز:*\n' +
      '• بل ادائیگی اور ڈپلیکیٹ بل\n' +
      '• گیس لیکیج شکایت (24 گھنٹے ہنگامی)\n' +
      '• نئی کنیکشن درخواست\n' +
      '• پریشر شکایات\n\n' +
      '🆘 گیس ہنگامی (ایس ایس جی سی): *119*\n' +
      '🆘 گیس ہنگامی (ایس این جی پی ایل): *1199*',
  },

  // 7 — Water Board
  {
    en:
      '💧 *Water Board Services*\n\n' +
      '• *Bill Payment* — check and pay online\n' +
      '• *New Water Connection* — residential and commercial\n' +
      '• *Water Shortage / No Water Complaint*\n' +
      '• *Pipeline Leakage Complaint*\n' +
      '• *Water Quality Complaint*\n' +
      '• *Tanker Booking* (Karachi — KWSB)\n\n' +
      '📞 KWSB Helpline (Karachi): *021-111-009-009*\n' +
      '📞 WASA Punjab Helpline: *042-111-927-222*',
    ur:
      '💧 *واٹر بورڈ سروسز*\n\n' +
      '• *بل ادائیگی* — آن لائن چیک اور ادائیگی\n' +
      '• *نئی پانی کی کنیکشن* — رہائشی اور تجارتی\n' +
      '• *پانی نہ آنے کی شکایت*\n' +
      '• *پائپ لائن لیکیج شکایت*\n' +
      '• *پانی کے معیار کی شکایت*\n' +
      '• *ٹینکر بکنگ* (کراچی — کے ڈبلیو ایس بی)\n\n' +
      '📞 کے ڈبلیو ایس بی ہیلپ لائن: *021-111-009-009*\n' +
      '📞 واسا پنجاب ہیلپ لائن: *042-111-927-222*',
  },

  // 8 — Pakistan Bait ul Maal
  {
    en:
      '🤲 *Pakistan Bait ul Maal (PBM)*\n\n' +
      '*Assistance Programs:*\n' +
      '• *Educational Stipends* — for destitute students (primary to matric)\n' +
      '• *Food Support Programme* — monthly ration for deserving families\n' +
      '• *Vocational Training* — skills development for poor youth\n' +
      '• *Child Labour Elimination* — rehabilitation support\n' +
      '• *Medical Assistance* — for patients unable to afford treatment\n\n' +
      '📋 *Eligibility:* Monthly income below Rs. 45,000, no government job, no property.\n\n' +
      '📞 PBM Helpline: *051-9246374*',
    ur:
      '🤲 *پاکستان بیت المال (پی بی ایم)*\n\n' +
      '*امدادی پروگرام:*\n' +
      '• *تعلیمی وظائف* — غریب طلباء کے لیے (پرائمری سے میٹرک)\n' +
      '• *فوڈ سپورٹ پروگرام* — مستحق خاندانوں کے لیے ماہانہ راشن\n' +
      '• *پیشہ وارانہ تربیت* — غریب نوجوانوں کے لیے\n' +
      '• *بچہ مزدوری خاتمہ* — بحالی امداد\n' +
      '• *طبی امداد* — علاج کی استطاعت نہ رکھنے والوں کے لیے\n\n' +
      '📋 *اہلیت:* ماہانہ آمدن 45,000 روپے سے کم، کوئی سرکاری ملازمت یا جائیداد نہ ہو۔\n\n' +
      '📞 پی بی ایم ہیلپ لائن: *051-9246374*',
  },

  // 9 — Benazir Income Support
  {
    en:
      '💚 *Benazir Income Support Programme (BISP)*\n\n' +
      '*Active Programs:*\n' +
      '• *Kafaalat* — quarterly cash transfers for poor women (Rs. 10,500/quarter)\n' +
      '• *Taleemi Wazaif* — education stipends for children of BISP beneficiaries\n' +
      '• *BISP Nashonuma* — nutrition support for children under 2 years\n' +
      '• *Graduation Programme* — livelihood support to exit poverty\n\n' +
      '📋 *Eligibility Check:* SMS your CNIC to *8171* or visit bisp.gov.pk\n\n' +
      '📞 BISP Helpline: *0800-26477* (toll free)\n' +
      '⚠️ Payments made through HBL, Bank Alfalah & Post Office',
    ur:
      '💚 *بے نظیر انکم سپورٹ پروگرام (بی آئی ایس پی)*\n\n' +
      '*فعال پروگرام:*\n' +
      '• *کفالت* — غریب خواتین کے لیے سہ ماہی نقد رقم (10,500 روپے فی سہ ماہی)\n' +
      '• *تعلیمی وظائف* — مستفیدین کے بچوں کے لیے تعلیمی وظائف\n' +
      '• *بی آئی ایس پی نشوونما* — 2 سال سے کم بچوں کے لیے غذائیت امداد\n' +
      '• *گریجویشن پروگرام* — غربت سے نکلنے کے لیے معاش امداد\n\n' +
      '📋 *اہلیت چیک:* اپنا شناختی کارڈ نمبر *8171* پر SMS کریں\n\n' +
      '📞 بی آئی ایس پی ہیلپ لائن: *0800-26477* (مفت)',
  },

  // 10 — Zakat & Ushr
  {
    en:
      '☪️ *Zakat & Ushr Department*\n\n' +
      '*Benefits Available:*\n' +
      '• *Guzara Allowance* — monthly stipend for destitute Muslims\n' +
      '• *Educational Stipends* — from primary to university level\n' +
      '• *Healthcare* — medical assistance for poor patients\n' +
      '• *Social Welfare* — support for widows, orphans, disabled persons\n' +
      '• *Rehabilitation* — self-employment loans and skill training\n\n' +
      '📋 *Eligibility:* Must be Muslim, Pakistani citizen, income below poverty line.\n' +
      '📋 *Apply via:* Local Zakat Committee or district Zakat office.\n\n' +
      '📞 Federal Zakat Helpline: *051-9204433*',
    ur:
      '☪️ *زکوٰۃ و عشر ڈیپارٹمنٹ*\n\n' +
      '*دستیاب فوائد:*\n' +
      '• *گزارہ الاؤنس* — مستحق مسلمانوں کے لیے ماہانہ وظیفہ\n' +
      '• *تعلیمی وظائف* — پرائمری سے یونیورسٹی سطح تک\n' +
      '• *صحت* — غریب مریضوں کے لیے طبی امداد\n' +
      '• *سماجی بہبود* — بیوہ، یتیم، معذور افراد کے لیے\n' +
      '• *بحالی* — خود روزگار قرضے اور ہنر تربیت\n\n' +
      '📋 *اہلیت:* مسلمان، پاکستانی شہری، آمدن خط افلاس سے کم۔\n\n' +
      '📞 وفاقی زکوٰۃ ہیلپ لائن: *051-9204433*',
  },

  // 11 — Immigration & Passport
  {
    en:
      '✈️ *Immigration & Passport Services*\n\n' +
      '• *New Passport* — apply online at dgip.gov.pk\n' +
      '• *Passport Renewal* — standard (6 weeks) or urgent (2 weeks)\n' +
      '• *Machine Readable Passport (MRP)*\n' +
      '• *Track Passport Status* — online tracking available\n' +
      '• *Visa on Arrival / E-Visa* — information and application\n' +
      '• *Immigration Card (FRC)* — for foreigners\n\n' +
      '📋 *Required documents:* CNIC, old passport (if renewal), passport photos.\n\n' +
      '📞 Passport Helpline: *051-9204433*\n' +
      '🌐 Online portal: dgip.gov.pk',
    ur:
      '✈️ *امیگریشن اینڈ پاسپورٹ سروسز*\n\n' +
      '• *نیا پاسپورٹ* — dgip.gov.pk پر آن لائن درخواست\n' +
      '• *پاسپورٹ تجدید* — معمول (6 ہفتے) یا ہنگامی (2 ہفتے)\n' +
      '• *مشین ریڈایبل پاسپورٹ (ایم آر پی)*\n' +
      '• *پاسپورٹ اسٹیٹس ٹریک کریں* — آن لائن ٹریکنگ\n' +
      '• *ویزا آن اریول / ای ویزا* — معلومات اور درخواست\n\n' +
      '📋 *ضروری دستاویزات:* شناختی کارڈ، پرانا پاسپورٹ، تصویریں۔\n\n' +
      '📞 پاسپورٹ ہیلپ لائن: *051-9204433*',
  },

  // 12 — Pakistan Customs
  {
    en:
      '🛃 *Pakistan Customs — FBR*\n\n' +
      '• *Import / Export Declarations* — via WeBOC system (weboc.gov.pk)\n' +
      '• *Customs Duty Calculator* — check applicable duty on goods\n' +
      '• *Vehicle Import* — duty and clearance for imported vehicles\n' +
      '• *Personal Baggage* — allowance rules for returning Pakistanis\n' +
      '• *Smuggling / Complaint* — report illegal goods\n' +
      '• *Authorized Economic Operator (AEO)* — for trade facilitation\n\n' +
      '📞 FBR Helpline: *051-111-772-772*\n' +
      '🌐 Portal: fbr.gov.pk | weboc.gov.pk',
    ur:
      '🛃 *پاکستان کسٹمز — ایف بی آر*\n\n' +
      '• *امپورٹ / ایکسپورٹ ڈیکلریشن* — ویبوک سسٹم (weboc.gov.pk) کے ذریعے\n' +
      '• *کسٹم ڈیوٹی کیلکولیٹر* — اشیاء پر لاگو ڈیوٹی چیک کریں\n' +
      '• *گاڑی امپورٹ* — درآمد شدہ گاڑیوں کی ڈیوٹی اور کلیئرنس\n' +
      '• *ذاتی سامان* — واپس آنے والے پاکستانیوں کے لیے قوانین\n' +
      '• *سمگلنگ / شکایت* — غیر قانونی اشیاء کی اطلاع\n\n' +
      '📞 ایف بی آر ہیلپ لائن: *051-111-772-772*',
  },
];

/**
 * Returns the detail string for a given department index and language.
 * @param {number} deptIndex  - 0 to 12
 * @param {string} lang       - 'en' or 'ur'
 * @returns {string|null}
 */
function getDeptDetails(deptIndex, lang = 'en') {
  const entry = deptDetails[deptIndex];
  if (!entry) return null;
  return entry[lang] || entry.en;
}

module.exports = { getDeptDetails };
