// ─── Service Detail Seed Data ─────────────────────────────────────────────────
// All service details are BILINGUAL (English + Urdu in one message).
// Structure: DETAILS[serviceId] = bilingualString
// Based on verified bot flow documents — March 2026 — NITB / PITB / KPITB

const { APP_CONFIG, SINDH_APPS } = require('./services');

const DIV = '\n━━━━━━━━━━━━━━━━━━━\n';
const TIP_EN = '\n💡 *Tip:* Keep your CNIC and relevant documents ready!';
const TIP_UR = '\n💡 *ٹِپ:* اپنا شناختی کارڈ اور متعلقہ دستاویزات تیار رکھیں!';

// ─── Helper: build app download block ─────────────────────────────────────
function appBlock(cfg, extraWeb = null) {
  let block = `📱 *App:* ${cfg.nameEn} | ${cfg.nameUr}\n`;
  if (cfg.playStore && cfg.playStore.startsWith('http')) {
    block += `🤖 Android: ${cfg.playStore}\n`;
  } else if (cfg.playStore) {
    block += `🤖 Android: ${cfg.playStore}\n`;
  }
  if (cfg.appStore && cfg.appStore.startsWith('http')) {
    block += `🍎 iOS: ${cfg.appStore}\n`;
  } else if (cfg.appStore) {
    block += `🍎 iOS: ${cfg.appStore}\n`;
  }
  block += `🌐 Web: ${cfg.web}`;
  if (extraWeb) block += ` | ${extraWeb}`;
  if (cfg.helpline) block += `\n📞 Helpline: ${cfg.helpline}`;
  if (cfg.email)    block += `\n📧 ${cfg.email}`;
  return block;
}

// ─── Helper: build delivery model block ───────────────────────────────────
function modelBlock(cfg) {
  let block = `\n🏠 *Delivery | ڈیلیوری:* ${cfg.model}\n`;
  block += `💰 *Charge | فیس:* ${cfg.charge}`;
  if (cfg.courier) block += `\n🚚 *Courier | کوریئر:* ${cfg.courier}`;
  block += `\n🕐 *Hours | اوقات:* ${cfg.hours}`;
  return block;
}

// ─── Helper: build bilingual steps block ─────────────────────────────────
function stepsBlock(stEn, stUr) {
  return `📝 *Steps | اقدامات:*\n${stEn}\n\n${stUr}`;
}

// ─── Helper: build bilingual docs block ──────────────────────────────────
function docsBlock(docsEn, docsUr) {
  if (!docsEn) return '';
  return `\n\n📋 *Required Docs | ضروری دستاویزات:*\n${docsEn}\n${docsUr}`;
}

// ─── Helper: build full bilingual message ─────────────────────────────────
function buildMsg(titleEn, titleUr, province, appCfg, steps, docs = null, note = null, extraWeb = null) {
  let msg = `✅ *${titleEn} | ${titleUr}*\n📍 ${province}${DIV}`;
  msg += appBlock(appCfg, extraWeb);
  msg += modelBlock(appCfg);
  msg += DIV;
  msg += stepsBlock(steps.en, steps.ur);
  if (docs) msg += docsBlock(docs.en, docs.ur);
  if (note) msg += `\n\n⚠️ *Note:* ${note}`;
  msg += TIP_EN + TIP_UR;
  return msg;
}

// ─── ISB = Islamabad / PAK App ─────────────────────────────────────────────
const isb = APP_CONFIG.islamabad;

const DETAILS = {

  // ── ISLAMABAD — EXCISE ──────────────────────────────────────────────────
  isb_exc_1: buildMsg(
    'Vehicle Verification', 'گاڑی کی تصدیق', 'Islamabad — ICT | اسلام آباد', isb,
    {
      en: '1. Open PAK App\n2. Go to "Excise — Motor Vehicle"\n3. Select "Vehicle Verification"\n4. Enter registration number\n5. View owner name, tax status & token history',
      ur: '1. پاک ایپ کھولیں\n2. "ایکسائز — موٹر گاڑی" پر جائیں\n3. "گاڑی تصدیق" منتخب کریں\n4. رجسٹریشن نمبر درج کریں\n5. مالک کا نام، ٹیکس اسٹیٹس اور ٹوکن ہسٹری دیکھیں',
    },
    null,
    'Online only — no office visit required | صرف آن لائن — دفتر جانے کی ضرورت نہیں'
  ),

  isb_exc_2: buildMsg(
    'Excise Challan', 'ایکسائز چالان', 'Islamabad — ICT | اسلام آباد', isb,
    {
      en: '1. Open PAK App\n2. Go to "Excise — Motor Vehicle"\n3. Select "Excise Challan"\n4. Enter vehicle/challan details\n5. Pay online via EasyPaisa / JazzCash / Bank',
      ur: '1. پاک ایپ کھولیں\n2. "ایکسائز — موٹر گاڑی" پر جائیں\n3. "ایکسائز چالان" منتخب کریں\n4. گاڑی/چالان تفصیلات درج کریں\n5. ایزی پیسہ / جاز کیش / بینک سے ادا کریں',
    },
    { en: '• Vehicle registration book | گاڑی رجسٹریشن بک\n• CNIC | شناختی کارڈ', ur: '' }
  ),

  isb_exc_3: buildMsg(
    'Smart Card Status', 'سمارٹ کارڈ اسٹیٹس', 'Islamabad — ICT | اسلام آباد', isb,
    {
      en: '1. Open PAK App\n2. Go to "Excise — Motor Vehicle"\n3. Select "Smart Card Status"\n4. Enter registration number\n5. View dispatch/delivery status\n6. Collect from ICT Excise Office when ready',
      ur: '1. پاک ایپ کھولیں\n2. "ایکسائز — موٹر گاڑی" پر جائیں\n3. "سمارٹ کارڈ اسٹیٹس" منتخب کریں\n4. رجسٹریشن نمبر درج کریں\n5. ڈسپیچ/ڈیلیوری اسٹیٹس دیکھیں\n6. تیار ہونے پر آئی سی ٹی ایکسائز آفس سے لیں',
    }
  ),

  isb_exc_4: buildMsg(
    'Fee Calculator', 'فیس کیلکولیٹر', 'Islamabad — ICT | اسلام آباد', isb,
    {
      en: '1. Open PAK App\n2. Go to "Excise — Motor Vehicle"\n3. Select "Fee Calculator"\n4. Enter vehicle type, engine capacity & year\n5. View calculated registration fee — online tool only',
      ur: '1. پاک ایپ کھولیں\n2. "ایکسائز — موٹر گاڑی" پر جائیں\n3. "فیس کیلکولیٹر" منتخب کریں\n4. گاڑی کی قسم، انجن کی صلاحیت اور سال درج کریں\n5. حساب شدہ رجسٹریشن فیس دیکھیں',
    },
    null, 'Online calculator only | صرف آن لائن کیلکولیٹر'
  ),

  isb_exc_5: buildMsg(
    'View Challans', 'چالان دیکھیں', 'Islamabad — ICT | اسلام آباد', isb,
    {
      en: '1. Open PAK App\n2. Go to "Excise — Motor Vehicle"\n3. Select "View Challans"\n4. Enter registration number\n5. Review outstanding challans\n6. Pay online or visit ICT Excise Office for disputes',
      ur: '1. پاک ایپ کھولیں\n2. "ایکسائز — موٹر گاڑی" پر جائیں\n3. "چالان دیکھیں" منتخب کریں\n4. رجسٹریشن نمبر درج کریں\n5. واجب الادا چالان دیکھیں\n6. آن لائن ادا کریں یا تنازعے کے لیے آفس جائیں',
    }
  ),

  isb_exc_6: buildMsg(
    'Other Taxes', 'دیگر ٹیکس', 'Islamabad — ICT | اسلام آباد', isb,
    {
      en: '1. Open PAK App\n2. Go to "Excise — Motor Vehicle"\n3. Select "Other Taxes"\n4. Select tax type\n5. Pay or view details online\n6. Office: ICT Excise & Taxation Dept, Islamabad',
      ur: '1. پاک ایپ کھولیں\n2. "ایکسائز — موٹر گاڑی" پر جائیں\n3. "دیگر ٹیکس" منتخب کریں\n4. ٹیکس کی قسم منتخب کریں\n5. آن لائن ادا کریں یا تفصیلات دیکھیں',
    }
  ),

  // ── ISLAMABAD — TRANSPORT ─────────────────────────────────────────────
  isb_tr_1: buildMsg(
    'Driving License Verification', 'ڈرائیونگ لائسنس تصدیق', 'Islamabad — ICT | اسلام آباد', isb,
    {
      en: '1. Open PAK App\n2. Go to "Transport / Driving License"\n3. Select "Driving License Verification"\n4. Enter license number\n5. View holder name, expiry date, class & status\n6. Office: ICT Traffic Police HQ, Blue Area, Islamabad',
      ur: '1. پاک ایپ کھولیں\n2. "ٹرانسپورٹ / ڈرائیونگ لائسنس" پر جائیں\n3. "ڈرائیونگ لائسنس تصدیق" منتخب کریں\n4. لائسنس نمبر درج کریں\n5. ہولڈر کا نام، میعاد، کلاس اور اسٹیٹس دیکھیں',
    },
    null, 'Online only | صرف آن لائن'
  ),

  // ── ISLAMABAD — ARMS ──────────────────────────────────────────────────
  isb_arms_1: buildMsg(
    'Arms License — New / Renewal (ICT)', 'اسلحہ لائسنس — نیا / تجدید (آئی سی ٹی)', 'Islamabad — ICT | اسلام آباد', isb,
    {
      en: '1. Open PAK App\n2. Go to "Arms License (ICT)"\n3. Choose New Application or Renewal\n4. Fill personal & weapon details\n5. Upload CNIC + character certificate\n6. Pay fee online\n7. Visit DC Office ICT for biometric\n8. Collect license after approval\n🏢 Office: DC Office ICT — G-11, Islamabad | ⏱ 30–45 working days',
      ur: '1. پاک ایپ کھولیں\n2. "اسلحہ لائسنس (آئی سی ٹی)" پر جائیں\n3. نئی درخواست یا تجدید منتخب کریں\n4. ذاتی اور ہتھیار کی تفصیلات پُر کریں\n5. شناختی کارڈ + کردار سرٹیفکیٹ اپلوڈ کریں\n6. آن لائن فیس ادا کریں\n7. بائیومیٹرک کے لیے ڈی سی آفس جائیں\n8. منظوری کے بعد لائسنس لیں',
    },
    { en: '• CNIC (original + copy)\n• Character certificate\n• Police verification report\n• Passport photos\n• Fee receipt', ur: '• شناختی کارڈ (اصل + کاپی)\n• کردار سرٹیفکیٹ\n• پولیس تصدیق رپورٹ\n• پاسپورٹ تصاویر\n• فیس رسید' }
  ),

  // ── ISLAMABAD — UTILITY BILLS ─────────────────────────────────────────
  isb_ut_1: buildMsg(
    'IESCO Electricity Bill', 'آئیسکو بجلی بل', 'Islamabad — ICT | اسلام آباد', isb,
    {
      en: '1. Open PAK App\n2. Go to "Utility Bills"\n3. Select "IESCO Electricity Bill"\n4. Enter IESCO Reference Number\n5. View bill amount & due date\n6. Pay via EasyPaisa / JazzCash / Bank\n📞 IESCO: 051-844-0000 | Blue Area, Islamabad',
      ur: '1. پاک ایپ کھولیں\n2. "یوٹیلیٹی بلز" پر جائیں\n3. "آئیسکو بجلی بل" منتخب کریں\n4. آئیسکو ریفرنس نمبر درج کریں\n5. بل کی رقم اور آخری تاریخ دیکھیں\n6. ایزی پیسہ / جاز کیش / بینک سے ادا کریں',
    },
    null, 'Online payment only | صرف آن لائن ادائیگی'
  ),

  isb_ut_2: buildMsg(
    'PTCL Bill', 'پی ٹی سی ایل بل', 'Islamabad — ICT | اسلام آباد', isb,
    {
      en: '1. Open PAK App\n2. Go to "Utility Bills"\n3. Select "PTCL Bill"\n4. Enter PTCL Account or Telephone Number\n5. View bill amount\n6. Pay online',
      ur: '1. پاک ایپ کھولیں\n2. "یوٹیلیٹی بلز" پر جائیں\n3. "پی ٹی سی ایل بل" منتخب کریں\n4. پی ٹی سی ایل اکاؤنٹ یا فون نمبر درج کریں\n5. بل کی رقم دیکھیں\n6. آن لائن ادا کریں',
    }
  ),

  isb_ut_3: buildMsg(
    'SNGPL Gas Bill', 'ایس این جی پی ایل گیس بل', 'Islamabad — ICT | اسلام آباد', isb,
    {
      en: '1. Open PAK App\n2. Go to "Utility Bills"\n3. Select "SNGPL Gas Bill"\n4. Enter SNGPL Consumer Number\n5. View gas bill amount\n6. Pay online',
      ur: '1. پاک ایپ کھولیں\n2. "یوٹیلیٹی بلز" پر جائیں\n3. "ایس این جی پی ایل گیس بل" منتخب کریں\n4. کنزیومر نمبر درج کریں\n5. گیس بل دیکھیں\n6. آن لائن ادا کریں',
    }
  ),

  isb_ut_4: buildMsg(
    'Digital Payment Complaint', 'ڈیجیٹل پیمنٹ شکایت', 'Islamabad — ICT | اسلام آباد', isb,
    {
      en: '1. Open PAK App\n2. Go to "Utility Bills"\n3. Select "Digital Payment Complaint"\n4. Describe your complaint in detail\n5. Submit — receive Complaint Tracking Number\n6. Follow up: cityislamabad.support@nitb.gov.pk',
      ur: '1. پاک ایپ کھولیں\n2. "یوٹیلیٹی بلز" پر جائیں\n3. "ڈیجیٹل پیمنٹ شکایت" منتخب کریں\n4. شکایت تفصیل سے درج کریں\n5. جمع کریں — ٹریکنگ نمبر ملے گا\n6. فالو اپ: cityislamabad.support@nitb.gov.pk',
    }
  ),

  // ── ISLAMABAD — POLICE & SECURITY ────────────────────────────────────
  isb_pol_1: buildMsg(
    'Traffic Challan', 'ٹریفک چالان', 'Islamabad — ICT | اسلام آباد', isb,
    {
      en: '1. Open PAK App\n2. Go to "Police & Security"\n3. Select "Traffic Challan"\n4. Enter challan number or vehicle registration\n5. View challan details\n6. Pay online or visit ICT Traffic Police HQ\n📞 Emergency: 115 | 🏢 F-8/4, Islamabad',
      ur: '1. پاک ایپ کھولیں\n2. "پولیس اور سیکیورٹی" پر جائیں\n3. "ٹریفک چالان" منتخب کریں\n4. چالان نمبر یا گاڑی رجسٹریشن درج کریں\n5. چالان تفصیلات دیکھیں\n6. آن لائن ادا کریں یا آفس جائیں',
    }
  ),

  isb_pol_2: buildMsg(
    'E-Challan', 'ای چالان', 'Islamabad — ICT | اسلام آباد', isb,
    {
      en: '1. Open PAK App\n2. Go to "Police & Security"\n3. Select "E-Challan"\n4. Enter Reference Number from SMS notification\n5. Pay fine online — no office visit required',
      ur: '1. پاک ایپ کھولیں\n2. "پولیس اور سیکیورٹی" پر جائیں\n3. "ای چالان" منتخب کریں\n4. ایس ایم ایس سے ریفرنس نمبر درج کریں\n5. آن لائن جرمانہ ادا کریں',
    },
    null, 'Online payment only | صرف آن لائن ادائیگی'
  ),

  isb_pol_3: buildMsg(
    'Taxi Verification', 'ٹیکسی تصدیق', 'Islamabad — ICT | اسلام آباد', isb,
    {
      en: '1. Open PAK App\n2. Go to "Police & Security"\n3. Select "Taxi Verification"\n4. Enter taxi or ride-hailing vehicle number\n5. View registration & safety status\n⚠️ Report suspicious vehicle: Emergency 15',
      ur: '1. پاک ایپ کھولیں\n2. "پولیس اور سیکیورٹی" پر جائیں\n3. "ٹیکسی تصدیق" منتخب کریں\n4. ٹیکسی یا رائیڈ ہیلنگ گاڑی نمبر درج کریں\n5. رجسٹریشن اور حفاظتی اسٹیٹس دیکھیں',
    },
    null, 'Online only | صرف آن لائن'
  ),

  isb_pol_4: buildMsg(
    'Security Company Registration', 'سیکیورٹی کمپنی رجسٹریشن', 'Islamabad — ICT | اسلام آباد', isb,
    {
      en: '1. Open PAK App\n2. Go to "Police & Security"\n3. Select "Security Companies Registration (ICT)"\n4. Fill company registration form\n5. Upload required documents\n6. Submit & track application\n🏢 Office: DC Office ICT, G-11, Islamabad',
      ur: '1. پاک ایپ کھولیں\n2. "پولیس اور سیکیورٹی" پر جائیں\n3. "سیکیورٹی کمپنی رجسٹریشن" منتخب کریں\n4. رجسٹریشن فارم پُر کریں\n5. دستاویزات اپلوڈ کریں\n6. جمع کریں اور ٹریک کریں',
    },
    { en: '• Company registration docs\n• SECP certificate\n• Staff CNIC list', ur: '• کمپنی رجسٹریشن دستاویزات\n• ایس ای سی پی سرٹیفکیٹ\n• عملے کی شناختی کارڈ فہرست' }
  ),

  // ── ISLAMABAD — DOMICILE ──────────────────────────────────────────────
  isb_dom_1: buildMsg(
    'Domicile Certificate (ICT)', 'ڈومیسائل سرٹیفکیٹ (آئی سی ٹی)', 'Islamabad — ICT | اسلام آباد', isb,
    {
      en: '1. Open PAK App\n2. Go to "Domicile Certificate"\n3. Fill online form with personal details\n4. Upload CNIC + proof of residence\n5. Pay fee online\n6. Book appointment at DC Office ICT\n7. Collect certificate\n🏢 DC Office ICT (Domicile Branch), G-11, Islamabad',
      ur: '1. پاک ایپ کھولیں\n2. "ڈومیسائل سرٹیفکیٹ" پر جائیں\n3. آن لائن فارم پُر کریں\n4. شناختی کارڈ + رہائش ثبوت اپلوڈ کریں\n5. آن لائن فیس ادا کریں\n6. ڈی سی آفس میں اپوائنٹمنٹ بک کریں\n7. سرٹیفکیٹ حاصل کریں',
    },
    { en: '• CNIC original + copy\n• Utility bill or rent deed\n• B-Form (if school-going)\n• Passport photos', ur: '• شناختی کارڈ اصل + کاپی\n• بجلی بل یا رینٹ ڈیڈ\n• بی فارم (طالب علم ہو تو)\n• پاسپورٹ تصاویر' }
  ),

  // ── ISLAMABAD — EDUCATION ─────────────────────────────────────────────
  isb_edu_1: buildMsg(
    'Migration Certificate (FBISE)', 'مائیگریشن سرٹیفکیٹ', 'Islamabad — ICT | اسلام آباد', isb,
    {
      en: '1. Open PAK App\n2. Go to "Education (FBISE / HEC)"\n3. Select "Migration Certificate"\n4. Enter Roll Number / Registration Number\n5. Select your board\n6. Upload Result Card + CNIC\n7. Pay fee online\n8. Submit\n🏢 FBISE, H-8/4, Islamabad | ☎ 051-9269518',
      ur: '1. پاک ایپ کھولیں\n2. "تعلیم (ایف بی آئی ایس ای / ایچ ای سی)" پر جائیں\n3. "مائیگریشن سرٹیفکیٹ" منتخب کریں\n4. رول نمبر / رجسٹریشن نمبر درج کریں\n5. اپنا بورڈ منتخب کریں\n6. رزلٹ کارڈ + شناختی کارڈ اپلوڈ کریں\n7. فیس ادا کریں\n8. جمع کریں',
    },
    { en: '• CNIC copy\n• Result card\n• Fee receipt', ur: '• شناختی کارڈ کاپی\n• رزلٹ کارڈ\n• فیس رسید' }
  ),

  isb_edu_2: buildMsg(
    'Result Card Verification (FBISE)', 'رزلٹ کارڈ تصدیق', 'Islamabad — ICT | اسلام آباد', isb,
    {
      en: '1. Open PAK App\n2. Go to "Education"\n3. Select "Result Card Verification"\n4. Enter Roll Number and year\n5. View verification status — online only',
      ur: '1. پاک ایپ کھولیں\n2. "تعلیم" پر جائیں\n3. "رزلٹ کارڈ تصدیق" منتخب کریں\n4. رول نمبر اور سال درج کریں\n5. تصدیقی اسٹیٹس دیکھیں',
    },
    null, 'Online only | صرف آن لائن'
  ),

  isb_edu_3: buildMsg(
    'Certificate Verification (FBISE/HEC)', 'سرٹیفکیٹ تصدیق', 'Islamabad — ICT | اسلام آباد', isb,
    {
      en: '1. Open PAK App\n2. Go to "Education"\n3. Select "Certificate Verification"\n4. Enter Certificate Number\n5. Download verification report — online',
      ur: '1. پاک ایپ کھولیں\n2. "تعلیم" پر جائیں\n3. "سرٹیفکیٹ تصدیق" منتخب کریں\n4. سرٹیفکیٹ نمبر درج کریں\n5. تصدیقی رپورٹ ڈاؤن لوڈ کریں',
    },
    null, 'Online only | صرف آن لائن'
  ),

  isb_edu_4: buildMsg(
    'Duplicate Marks Sheet (FBISE)', 'ڈپلیکیٹ مارکس شیٹ', 'Islamabad — ICT | اسلام آباد', isb,
    {
      en: '1. Open PAK App\n2. Go to "Education"\n3. Select "Duplicate Marks Sheet"\n4. Enter Roll Number and board\n5. Pay fee online\n6. Collect from FBISE or receive by post\n🏢 FBISE, H-8/4, Islamabad',
      ur: '1. پاک ایپ کھولیں\n2. "تعلیم" پر جائیں\n3. "ڈپلیکیٹ مارکس شیٹ" منتخب کریں\n4. رول نمبر اور بورڈ درج کریں\n5. فیس ادا کریں\n6. ایف بی آئی ایس ای سے لیں یا ڈاک سے منگوائیں',
    },
    { en: '• CNIC copy\n• Fee receipt', ur: '• شناختی کارڈ کاپی\n• فیس رسید' }
  ),

  isb_edu_5: buildMsg(
    'Correction in Name (FBISE)', 'نام میں ترمیم', 'Islamabad — ICT | اسلام آباد', isb,
    {
      en: '1. Open PAK App\n2. Go to "Education"\n3. Select "Correction in Name"\n4. Enter Roll Number and correct name\n5. Upload CNIC or B-Form as proof\n6. Pay fee and submit',
      ur: '1. پاک ایپ کھولیں\n2. "تعلیم" پر جائیں\n3. "نام میں ترمیم" منتخب کریں\n4. رول نمبر اور درست نام درج کریں\n5. شناختی کارڈ یا بی فارم اپلوڈ کریں\n6. فیس ادا کریں اور جمع کریں',
    }
  ),

  isb_edu_6: buildMsg(
    'Change of Subject (FBISE)', 'مضمون تبدیل', 'Islamabad — ICT | اسلام آباد', isb,
    {
      en: '1. Open PAK App\n2. Go to "Education"\n3. Select "Change of Subject"\n4. Enter current enrollment details\n5. Select new subject\n6. Pay processing fee\n7. Await FBISE confirmation\n⚠️ Apply within FBISE deadline',
      ur: '1. پاک ایپ کھولیں\n2. "تعلیم" پر جائیں\n3. "مضمون تبدیل" منتخب کریں\n4. موجودہ انرولمنٹ تفصیلات درج کریں\n5. نیا مضمون منتخب کریں\n6. پروسیسنگ فیس ادا کریں\n7. ایف بی آئی ایس ای کی تصدیق کا انتظار کریں',
    }
  ),

  isb_edu_7: buildMsg(
    'Recounting HSSC (FBISE)', 'ایچ ایس ایس سی ری کاؤنٹنگ', 'Islamabad — ICT | اسلام آباد', isb,
    {
      en: '1. Open PAK App\n2. Go to "Education"\n3. Select "Recounting HSSC"\n4. Enter Roll Number and subject\n5. Pay recounting fee\n6. Await revised result (2–4 weeks)\n⚠️ Apply within 30 days of result announcement',
      ur: '1. پاک ایپ کھولیں\n2. "تعلیم" پر جائیں\n3. "ایچ ایس ایس سی ری کاؤنٹنگ" منتخب کریں\n4. رول نمبر اور مضمون درج کریں\n5. ری کاؤنٹنگ فیس ادا کریں\n6. نظرثانی شدہ نتیجے کا انتظار کریں (2-4 ہفتے)',
    }
  ),

  isb_edu_8: buildMsg(
    'Document Tracking (FBISE)', 'دستاویز ٹریکنگ', 'Islamabad — ICT | اسلام آباد', isb,
    {
      en: '1. Open PAK App\n2. Go to "Education"\n3. Select "Document Tracking"\n4. Enter Tracking / Application Number\n5. View processing status — online',
      ur: '1. پاک ایپ کھولیں\n2. "تعلیم" پر جائیں\n3. "دستاویز ٹریکنگ" منتخب کریں\n4. ٹریکنگ / درخواست نمبر درج کریں\n5. پروسیسنگ اسٹیٹس دیکھیں',
    },
    null, 'Online only | صرف آن لائن'
  ),

  isb_edu_9: buildMsg(
    'HEC Verify Document', 'ایچ ای سی دستاویز تصدیق', 'Islamabad — ICT | اسلام آباد', isb,
    {
      en: '1. Open PAK App\n2. Go to "Education"\n3. Select "HEC Verify Document"\n4. Enter Degree / Document Reference Number\n5. View HEC verification status — online\n🌐 hec.gov.pk | 🏢 H-9, Islamabad',
      ur: '1. پاک ایپ کھولیں\n2. "تعلیم" پر جائیں\n3. "ایچ ای سی دستاویز تصدیق" منتخب کریں\n4. ڈگری / دستاویز ریفرنس نمبر درج کریں\n5. ایچ ای سی تصدیقی اسٹیٹس دیکھیں',
    },
    null, 'Online only | صرف آن لائن'
  ),

  isb_edu_10: buildMsg(
    'Result Cancellation (FBISE)', 'نتیجہ منسوخی', 'Islamabad — ICT | اسلام آباد', isb,
    {
      en: '1. Open PAK App\n2. Go to "Education"\n3. Select "Result Cancellation"\n4. Enter Roll Number and reason\n5. Upload supporting documents\n6. Submit to FBISE for review\n🏢 FBISE, H-8/4, Islamabad',
      ur: '1. پاک ایپ کھولیں\n2. "تعلیم" پر جائیں\n3. "نتیجہ منسوخی" منتخب کریں\n4. رول نمبر اور وجہ درج کریں\n5. معاون دستاویزات اپلوڈ کریں\n6. ایف بی آئی ایس ای کو جمع کریں',
    }
  ),

  // ── ISLAMABAD — CITY GUIDE ────────────────────────────────────────────
  isb_cg_1: buildMsg(
    'Metro Bus Route', 'میٹرو بس روٹ', 'Islamabad — ICT | اسلام آباد', isb,
    {
      en: '1. Open PAK App\n2. Go to "City Guide & Information"\n3. Select "Metro Bus Route"\n4. Enter source and destination\n5. View recommended metro bus route — information only',
      ur: '1. پاک ایپ کھولیں\n2. "شہر گائیڈ اور معلومات" پر جائیں\n3. "میٹرو بس روٹ" منتخب کریں\n4. شروعاتی اور منزل کا مقام درج کریں\n5. میٹرو بس روٹ دیکھیں',
    },
    null, 'Information only | صرف معلومات'
  ),

  isb_cg_2: `✅ *Emergency Numbers | ہنگامی نمبر*\n📍 Islamabad — ICT | اسلام آباد${DIV}` +
    `🆘 *Emergency Contacts | ہنگامی رابطے:*\n` +
    `• 🚔 Police | پولیس: *15*\n` +
    `• 🚒 Rescue | ریسکیو: *1122*\n` +
    `• 🚑 Ambulance | ایمبولینس: *1122*\n` +
    `• 🔥 Fire Brigade | فائر بریگیڈ: *16*\n` +
    `• 🏥 Edhi Foundation | ایدھی: *115*\n` +
    `• 🆘 Emergency | ہنگامی: *1122*` +
    TIP_EN + TIP_UR,

  isb_cg_3: buildMsg(
    'Explore Islamabad (City Guide)', 'اسلام آباد دریافت کریں', 'Islamabad — ICT | اسلام آباد', isb,
    {
      en: '1. Open PAK App\n2. Go to "City Guide & Information"\n3. Select "Explore"\n4. Browse places, services & points of interest\n5. Find hospitals, courts, parks & government buildings near you',
      ur: '1. پاک ایپ کھولیں\n2. "شہر گائیڈ اور معلومات" پر جائیں\n3. "دریافت کریں" منتخب کریں\n4. مقامات، خدمات اور دلچسپ جگہیں دیکھیں\n5. قریبی ہسپتال، عدالتیں، پارک اور سرکاری عمارتیں تلاش کریں',
    },
    null, 'Information only | صرف معلومات'
  ),

  // ── ISLAMABAD — ICT SERVICES ──────────────────────────────────────────
  isb_ict_1: buildMsg(
    'International Driving Permit (IDP)', 'انٹرنیشنل ڈرائیونگ پرمٹ', 'Islamabad — ICT | اسلام آباد', isb,
    {
      en: '1. Open PAK App\n2. Go to "ICT Services"\n3. Select "IDP"\n4. Enter current driving license details\n5. Fill travel destination info\n6. Upload license copy + passport copy + photos\n7. Pay fee\n8. Collect from NTRC/DLA\n🏢 NTRC Islamabad, Agha Khan Road, F-5/1',
      ur: '1. پاک ایپ کھولیں\n2. "آئی سی ٹی خدمات" پر جائیں\n3. "آئی ڈی پی" منتخب کریں\n4. موجودہ ڈرائیونگ لائسنس تفصیلات درج کریں\n5. سفر منزل معلومات پُر کریں\n6. لائسنس + پاسپورٹ کاپی + تصاویر اپلوڈ کریں\n7. فیس ادا کریں\n8. این ٹی آر سی سے لیں',
    },
    { en: '• Valid driving license\n• Passport\n• Passport photos', ur: '• درست ڈرائیونگ لائسنس\n• پاسپورٹ\n• پاسپورٹ تصاویر' }
  ),

  isb_ict_2: buildMsg(
    'Report Violation (ICT)', 'خلاف ورزی رپورٹ', 'Islamabad — ICT | اسلام آباد', isb,
    {
      en: '1. Open PAK App\n2. Go to "ICT Services"\n3. Select "Report Violation"\n4. Select violation type\n5. Enter location and description\n6. Optionally upload photo or video\n7. Submit — anonymous reporting available',
      ur: '1. پاک ایپ کھولیں\n2. "آئی سی ٹی خدمات" پر جائیں\n3. "خلاف ورزی رپورٹ" منتخب کریں\n4. خلاف ورزی کی قسم منتخب کریں\n5. مقام اور تفصیل درج کریں\n6. اختیاری: تصویر یا ویڈیو اپلوڈ کریں\n7. جمع کریں — گمنام رپورٹنگ دستیاب',
    },
    null, 'Anonymous reporting available | گمنام رپورٹنگ دستیاب'
  ),

  isb_ict_3: buildMsg(
    'Jerrycan Fuel NOC', 'جیری کین فیول این او سی', 'Islamabad — ICT | اسلام آباد', isb,
    {
      en: '1. Open PAK App\n2. Go to "ICT Services"\n3. Select "Jerrycan Fuel NOC"\n4. Fill application with purpose and quantity\n5. Upload CNIC + justification letter\n6. Pay NOC fee\n7. Collect from DC Office ICT in 3–5 working days\n🏢 DC Office ICT, G-11, Islamabad',
      ur: '1. پاک ایپ کھولیں\n2. "آئی سی ٹی خدمات" پر جائیں\n3. "جیری کین فیول این او سی" منتخب کریں\n4. مقصد اور مقدار کے ساتھ درخواست پُر کریں\n5. شناختی کارڈ + جواز خط اپلوڈ کریں\n6. این او سی فیس ادا کریں\n7. 3-5 دن میں ڈی سی آفس سے لیں',
    },
    { en: '• CNIC original + copy\n• Justification letter\n• Fee receipt', ur: '• شناختی کارڈ اصل + کاپی\n• جواز خط\n• فیس رسید' }
  ),

  isb_ict_4: buildMsg(
    'Snooker Club NOC', 'سنوکر کلب این او سی', 'Islamabad — ICT | اسلام آباد', isb,
    {
      en: '1. Open PAK App\n2. Go to "ICT Services"\n3. Select "Snooker Club NOC"\n4. Enter business name and location\n5. Upload CNIC + lease agreement + premises docs\n6. Pay NOC fee\n7. ICT admin schedules inspection\n🏢 DC Office ICT, G-11, Islamabad',
      ur: '1. پاک ایپ کھولیں\n2. "آئی سی ٹی خدمات" پر جائیں\n3. "سنوکر کلب این او سی" منتخب کریں\n4. کاروباری نام اور مقام درج کریں\n5. شناختی کارڈ + لیز + احاطہ دستاویزات اپلوڈ کریں\n6. این او سی فیس ادا کریں\n7. معائنے کا انتظار کریں',
    }
  ),

  isb_ict_5: buildMsg(
    'Shisha NOC', 'شیشہ این او سی', 'Islamabad — ICT | اسلام آباد', isb,
    {
      en: '1. Open PAK App\n2. Go to "ICT Services"\n3. Select "Shisha NOC"\n4. Enter business name and address\n5. Upload required documents\n6. Pay fee\n7. Await ICT approval — subject to current regulations\n🏢 DC Office ICT, G-11, Islamabad',
      ur: '1. پاک ایپ کھولیں\n2. "آئی سی ٹی خدمات" پر جائیں\n3. "شیشہ این او سی" منتخب کریں\n4. کاروباری نام اور پتہ درج کریں\n5. دستاویزات اپلوڈ کریں\n6. فیس ادا کریں\n7. آئی سی ٹی منظوری کا انتظار کریں',
    }
  ),

  // ── ISLAMABAD — OTHER SERVICES ────────────────────────────────────────
  isb_oth_1: buildMsg(
    'National Jobs Portal', 'نیشنل جابز پورٹل', 'Islamabad — ICT | اسلام آباد', isb,
    {
      en: '1. Open PAK App\n2. Go to "Other Services"\n3. Select "National Jobs Portal"\n4. Browse available government job listings\n5. Apply directly via app\n🌐 jobportal.gov.pk',
      ur: '1. پاک ایپ کھولیں\n2. "دیگر خدمات" پر جائیں\n3. "نیشنل جابز پورٹل" منتخب کریں\n4. سرکاری نوکریاں دیکھیں\n5. ایپ سے براہ راست درخواست دیں',
    },
    null, 'Online only | صرف آن لائن'
  ),

  isb_oth_2: buildMsg(
    'PTA Services', 'پی ٹی اے خدمات', 'Islamabad — ICT | اسلام آباد', isb,
    {
      en: '1. Open PAK App\n2. Go to "Other Services"\n3. Select "PTA Services"\n4. Choose IMEI check / Device Registration / Complaint\n5. Follow service-specific steps\n🌐 device.pta.gov.pk | 🏢 PTA Regional Office, Islamabad',
      ur: '1. پاک ایپ کھولیں\n2. "دیگر خدمات" پر جائیں\n3. "پی ٹی اے خدمات" منتخب کریں\n4. آئی ایم ای آئی چیک / ڈیوائس رجسٹریشن / شکایت منتخب کریں\n5. خدمت کے مخصوص اقدامات پر عمل کریں',
    }
  ),

  isb_oth_3: buildMsg(
    'Apostille', 'اپوسٹیل', 'Islamabad — ICT | اسلام آباد', isb,
    {
      en: '1. Open PAK App\n2. Go to "Other Services"\n3. Select "Apostille"\n4. Identify document type\n5. Fill the online form\n6. Pay fee online\n7. Visit Ministry of Foreign Affairs for physical stamping\n🏢 Ministry of Foreign Affairs, Constitution Avenue, Islamabad',
      ur: '1. پاک ایپ کھولیں\n2. "دیگر خدمات" پر جائیں\n3. "اپوسٹیل" منتخب کریں\n4. دستاویز کی قسم شناخت کریں\n5. آن لائن فارم پُر کریں\n6. آن لائن فیس ادا کریں\n7. وزارت خارجہ میں جسمانی مہر کے لیے جائیں',
    },
    { en: '• Original document\n• CNIC\n• Fee receipt', ur: '• اصل دستاویز\n• شناختی کارڈ\n• فیس رسید' }
  ),

  isb_oth_4: buildMsg(
    'NCERT', 'این سی ای آر ٹی', 'Islamabad — ICT | اسلام آباد', isb,
    {
      en: '1. Open PAK App\n2. Go to "Other Services"\n3. Select "NCERT"\n4. Follow in-app instructions for National Certificate of Eligibility/Recognition\n5. Submit required documents\n🏢 NCERT Pakistan, Islamabad',
      ur: '1. پاک ایپ کھولیں\n2. "دیگر خدمات" پر جائیں\n3. "این سی ای آر ٹی" منتخب کریں\n4. قومی سرٹیفکیٹ آف اہلیت کے لیے ایپ ہدایات پر عمل کریں\n5. ضروری دستاویزات جمع کریں',
    }
  ),

  isb_oth_5: buildMsg(
    'NDEL Verification', 'این ڈی ای ایل تصدیق', 'Islamabad — ICT | اسلام آباد', isb,
    {
      en: '1. Open PAK App\n2. Go to "Other Services"\n3. Select "NDEL"\n4. Enter equipment or driver license number\n5. View licensing details — online verification',
      ur: '1. پاک ایپ کھولیں\n2. "دیگر خدمات" پر جائیں\n3. "این ڈی ای ایل" منتخب کریں\n4. سازوسامان یا ڈرائیور لائسنس نمبر درج کریں\n5. لائسنسنگ تفصیلات دیکھیں',
    },
    null, 'Online only | صرف آن لائن'
  ),

  isb_oth_6: buildMsg(
    'Feedback', 'رائے', 'Islamabad — ICT | اسلام آباد', isb,
    {
      en: '1. Open PAK App\n2. Go to "Other Services"\n3. Select "Feedback"\n4. Select the service you used\n5. Rate and write your comments\n6. Submit — monitored by NITB',
      ur: '1. پاک ایپ کھولیں\n2. "دیگر خدمات" پر جائیں\n3. "رائے" منتخب کریں\n4. استعمال شدہ خدمت منتخب کریں\n5. ریٹنگ اور تبصرہ لکھیں\n6. جمع کریں',
    }
  ),

  // ═══════════════════════════════════════════════════════════════════════
  // PUNJAB — DASTAK PUNJAB (Doorstep Delivery)
  // ═══════════════════════════════════════════════════════════════════════
  // ── PUNJAB — LOCAL GOVERNMENT ────────────────────────────────────────
  pun_lg_1: buildMsg(
    'New Domicile Certificate', 'نیا ڈومیسائل سرٹیفکیٹ', 'Punjab | پنجاب', APP_CONFIG.punjab,
    {
      en: '1. Open Dastak Punjab App\n2. Go to "Citizen Services"\n3. Select "Local Government — Certificates"\n4. Choose "New Domicile Certificate"\n5. Book date & time for Facilitator home visit\n6. Facilitator arrives, scans documents\n7. Certificate delivered home in 5–10 working days via TCS/Leopard\n📞 Helpline: 1202 (24/7)',
      ur: '1. داسترک پنجاب ایپ کھولیں\n2. "شہری خدمات" پر جائیں\n3. "مقامی حکومت — سرٹیفکیٹس" منتخب کریں\n4. "نیا ڈومیسائل سرٹیفکیٹ" چنیں\n5. سہولت کار کے گھر آنے کی تاریخ بک کریں\n6. سہولت کار آئے گا، دستاویزات اسکین کرے گا\n7. سرٹیفکیٹ 5-10 دن میں گھر آئے گا',
    },
    { en: '• CNIC original\n• Utility bill or rent deed\n• B-Form (if school-going)\n• Passport photos', ur: '• شناختی کارڈ اصل\n• بجلی بل یا رینٹ ڈیڈ\n• بی فارم (طالب علم ہو تو)\n• پاسپورٹ تصاویر' }
  ),

  pun_lg_2: buildMsg(
    'Duplicate Domicile Certificate', 'ڈپلیکیٹ ڈومیسائل سرٹیفکیٹ', 'Punjab | پنجاب', APP_CONFIG.punjab,
    {
      en: '1. Open Dastak Punjab App\n2. Go to "Citizen Services" → "Local Government"\n3. Select "Duplicate Domicile Certificate"\n4. Book Facilitator home visit\n5. Facilitator scans CNIC + original domicile or FIR/affidavit\n6. Duplicate certificate delivered home',
      ur: '1. داسترک پنجاب ایپ کھولیں\n2. "شہری خدمات" → "مقامی حکومت" پر جائیں\n3. "ڈپلیکیٹ ڈومیسائل سرٹیفکیٹ" منتخب کریں\n4. سہولت کار کے لیے وقت بک کریں\n5. شناختی کارڈ + اصل ڈومیسائل یا ایف آئی آر اسکین ہوگی\n6. ڈپلیکیٹ سرٹیفکیٹ گھر آئے گا',
    },
    { en: '• CNIC\n• Original domicile OR FIR copy if lost', ur: '• شناختی کارڈ\n• اصل ڈومیسائل یا گم ہونے پر ایف آئی آر کاپی' }
  ),

  pun_lg_3: buildMsg(
    'Modification of Domicile', 'ڈومیسائل ترمیم', 'Punjab | پنجاب', APP_CONFIG.punjab,
    {
      en: '1. Open Dastak Punjab App\n2. Go to "Local Government" → "Modification of Domicile"\n3. Book Facilitator home visit\n4. Facilitator scans existing domicile + supporting correction document\n5. Modified certificate delivered home',
      ur: '1. داسترک پنجاب ایپ کھولیں\n2. "مقامی حکومت" → "ڈومیسائل ترمیم" پر جائیں\n3. سہولت کار کے لیے وقت بک کریں\n4. موجودہ ڈومیسائل + ترمیم دستاویز اسکین ہوگی\n5. ترمیم شدہ سرٹیفکیٹ گھر آئے گا',
    },
    { en: '• Existing domicile\n• CNIC\n• Supporting correction document', ur: '• موجودہ ڈومیسائل\n• شناختی کارڈ\n• ترمیم کی معاون دستاویز' }
  ),

  pun_lg_4: buildMsg(
    'NOC for Domicile Transfer', 'ڈومیسائل ٹرانسفر این او سی', 'Punjab | پنجاب', APP_CONFIG.punjab,
    {
      en: '1. Open Dastak Punjab App\n2. Go to "Local Government" → "NOC for Domicile Transfer"\n3. Book Facilitator home visit\n4. Facilitator collects CNIC, current domicile, and transfer reason letter\n5. NOC delivered home',
      ur: '1. داسترک پنجاب ایپ کھولیں\n2. "مقامی حکومت" → "ڈومیسائل ٹرانسفر این او سی" پر جائیں\n3. سہولت کار کے لیے وقت بک کریں\n4. شناختی کارڈ، موجودہ ڈومیسائل اور ٹرانسفر وجہ خط اکٹھا ہوگا\n5. این او سی گھر آئے گا',
    },
    { en: '• CNIC\n• Current domicile\n• Reason letter for transfer to new district', ur: '• شناختی کارڈ\n• موجودہ ڈومیسائل\n• نئے ضلع میں ٹرانسفر کی وجہ خط' }
  ),

  pun_lg_5: buildMsg(
    'Birth Certificate', 'پیدائش سرٹیفکیٹ', 'Punjab | پنجاب', APP_CONFIG.punjab,
    {
      en: '1. Open Dastak Punjab App\n2. Go to "Local Government" → "Birth Certificate"\n3. Book Facilitator home visit\n4. Facilitator collects hospital discharge summary, parents\' CNICs, Nikah Nama\n5. Union Council computerised certificate delivered home\n⚠️ Late entry: Affidavit + witnesses may be needed',
      ur: '1. داسترک پنجاب ایپ کھولیں\n2. "مقامی حکومت" → "پیدائش سرٹیفکیٹ" پر جائیں\n3. سہولت کار کے لیے وقت بک کریں\n4. ہسپتال ڈسچارج سلپ، والدین کے شناختی کارڈ، نکاح نامہ اکٹھا ہوگا\n5. یونین کونسل سرٹیفکیٹ گھر آئے گا',
    },
    { en: '• Hospital discharge slip\n• Both parents\' CNIC\n• Nikah Nama', ur: '• ہسپتال ڈسچارج سلپ\n• والدین کے شناختی کارڈ\n• نکاح نامہ' }
  ),

  pun_lg_6: buildMsg(
    'Death Certificate', 'وفات سرٹیفکیٹ', 'Punjab | پنجاب', APP_CONFIG.punjab,
    {
      en: '1. Open Dastak Punjab App\n2. Go to "Local Government" → "Death Certificate"\n3. Book Facilitator home visit\n4. Facilitator collects hospital death cert/graveyard slip, deceased\'s CNIC, next-of-kin CNIC\n5. Death certificate delivered home',
      ur: '1. داسترک پنجاب ایپ کھولیں\n2. "مقامی حکومت" → "وفات سرٹیفکیٹ" پر جائیں\n3. سہولت کار کے لیے وقت بک کریں\n4. ہسپتال وفات سرٹیفکیٹ/قبرستان سلپ، مرحوم کا شناختی کارڈ اکٹھا ہوگا\n5. وفات سرٹیفکیٹ گھر آئے گا',
    },
    { en: '• Hospital/graveyard death slip\n• Deceased\'s CNIC\n• Applicant CNIC', ur: '• ہسپتال/قبرستان سلپ\n• مرحوم کا شناختی کارڈ\n• درخواست گزار کا شناختی کارڈ' }
  ),

  pun_lg_7: buildMsg(
    'Marriage Certificate (Nikah Nama)', 'نکاح نامہ سرٹیفکیٹ', 'Punjab | پنجاب', APP_CONFIG.punjab,
    {
      en: '1. Open Dastak Punjab App\n2. Go to "Local Government" → "Marriage Certificate"\n3. Book Facilitator home visit\n4. Facilitator collects original Nikah Nama, both spouses\' CNICs, witness details\n5. Marriage certificate delivered home',
      ur: '1. داسترک پنجاب ایپ کھولیں\n2. "مقامی حکومت" → "نکاح نامہ" پر جائیں\n3. سہولت کار کے لیے وقت بک کریں\n4. اصل نکاح نامہ، دونوں میاں بیوی کے شناختی کارڈ، گواہان کی تفصیل اکٹھی ہوگی\n5. سرٹیفکیٹ گھر آئے گا',
    },
    { en: '• Original Nikah Nama\n• Both spouses\' CNIC\n• 2 witnesses\' CNICs', ur: '• اصل نکاح نامہ\n• دونوں میاں بیوی کے شناختی کارڈ\n• 2 گواہوں کے شناختی کارڈ' }
  ),

  pun_lg_8: buildMsg(
    'Divorce Certificate', 'طلاق سرٹیفکیٹ', 'Punjab | پنجاب', APP_CONFIG.punjab,
    {
      en: '1. Open Dastak Punjab App\n2. Go to "Local Government" → "Divorce Certificate"\n3. Book Facilitator home visit\n4. Facilitator collects Talaqnama or court decree, both parties\' CNICs\n5. Divorce certificate delivered home',
      ur: '1. داسترک پنجاب ایپ کھولیں\n2. "مقامی حکومت" → "طلاق سرٹیفکیٹ" پر جائیں\n3. سہولت کار کے لیے وقت بک کریں\n4. طلاق نامہ یا عدالتی حکم، دونوں فریقین کے شناختی کارڈ اکٹھے ہوں گے\n5. طلاق سرٹیفکیٹ گھر آئے گا',
    },
    { en: '• Signed Talaqnama or court order\n• Both parties\' CNIC', ur: '• دستخط شدہ طلاق نامہ یا عدالتی حکم\n• دونوں فریقین کے شناختی کارڈ' }
  ),

  // ── PUNJAB — EXCISE & VEHICLE ─────────────────────────────────────────
  pun_exc_1: buildMsg(
    'New Vehicle Registration', 'نئی گاڑی رجسٹریشن', 'Punjab | پنجاب', APP_CONFIG.punjab,
    {
      en: '1. Open Dastak Punjab App\n2. Go to "Citizen Services" → "Excise & Taxation — Vehicle"\n3. Select "New Vehicle Registration"\n4. Book Facilitator home visit\n5. Facilitator scans CNIC, purchase invoice, customs clearance & insurance\n6. Registration book + number plate delivered home in 7–14 working days\n📞 Helpline: 1202',
      ur: '1. داسترک پنجاب ایپ کھولیں\n2. "شہری خدمات" → "ایکسائز اور ٹیکسیشن" پر جائیں\n3. "نئی گاڑی رجسٹریشن" منتخب کریں\n4. سہولت کار کے گھر آنے کی تاریخ بک کریں\n5. شناختی کارڈ، خریداری رسید، کسٹمز، انشورنس اسکین ہوگی\n6. رجسٹریشن بک اور نمبر پلیٹ 7-14 دن میں گھر آئے گی',
    },
    { en: '• CNIC\n• Purchase invoice\n• Customs papers (if imported)\n• Insurance certificate', ur: '• شناختی کارڈ\n• خریداری رسید\n• کسٹمز کاغذات (اگر درآمد ہو)\n• انشورنس سرٹیفکیٹ' }
  ),

  pun_exc_2: buildMsg(
    'Transfer of Motor Vehicle', 'موٹر گاڑی ٹرانسفر', 'Punjab | پنجاب', APP_CONFIG.punjab,
    {
      en: '1. Open Dastak Punjab App\n2. Go to "Excise & Vehicle" → "Transfer of Motor Vehicle"\n3. Book Facilitator home visit\n4. Facilitator scans seller & buyer CNICs, original registration book, sale deed\n5. Updated registration book delivered to buyer\'s home',
      ur: '1. داسترک پنجاب ایپ کھولیں\n2. "ایکسائز اور گاڑی" → "موٹر گاڑی ٹرانسفر" پر جائیں\n3. سہولت کار کے لیے وقت بک کریں\n4. بیچنے والے اور خریدار کے شناختی کارڈ، رجسٹریشن بک، سیل ڈیڈ اسکین ہوگی\n5. اپڈیٹ شدہ رجسٹریشن بک خریدار کے گھر آئے گی',
    },
    { en: '• Both seller & buyer CNIC\n• Original registration book\n• Sale affidavit', ur: '• بیچنے والے اور خریدار کے شناختی کارڈ\n• اصل رجسٹریشن بک\n• سیل حلف نامہ' }
  ),

  pun_exc_3: buildMsg(
    'Token Tax Payment', 'ٹوکن ٹیکس ادائیگی', 'Punjab | پنجاب', APP_CONFIG.punjab,
    {
      en: '1. Open Dastak Punjab App\n2. Go to "Excise & Vehicle" → "Token Tax Payment"\n3. Enter vehicle registration number\n4. View tax amount\n5. Pay online — JazzCash / EasyPaisa / IBFT / PSID\n6. Receipt generated instantly\n⚠️ Online only — no Facilitator needed',
      ur: '1. داسترک پنجاب ایپ کھولیں\n2. "ایکسائز اور گاڑی" → "ٹوکن ٹیکس ادائیگی" پر جائیں\n3. گاڑی رجسٹریشن نمبر درج کریں\n4. ٹیکس کی رقم دیکھیں\n5. آن لائن ادا کریں\n6. رسید فوری جنریٹ ہوگی',
    },
    null, 'Online only — no Facilitator visit needed | صرف آن لائن'
  ),

  pun_exc_4: buildMsg(
    'Vehicle Verification (Online)', 'گاڑی تصدیق (آن لائن)', 'Punjab | پنجاب', APP_CONFIG.punjab,
    {
      en: '1. Open Dastak Punjab App\n2. Go to "Excise & Vehicle" → "Vehicle Verification"\n3. Enter registration number\n4. View owner name, tax status & token history\n⚠️ Online only — no Facilitator needed',
      ur: '1. داسترک پنجاب ایپ کھولیں\n2. "ایکسائز اور گاڑی" → "گاڑی تصدیق" پر جائیں\n3. رجسٹریشن نمبر درج کریں\n4. مالک کا نام، ٹیکس اسٹیٹس دیکھیں',
    },
    null, 'Online only | صرف آن لائن'
  ),

  pun_exc_5: buildMsg(
    'Duplicate Driving License', 'ڈپلیکیٹ ڈرائیونگ لائسنس', 'Punjab | پنجاب', APP_CONFIG.punjab,
    {
      en: '1. Open Dastak Punjab App\n2. Go to "Excise & Vehicle" → "Duplicate Driving License"\n3. Book Facilitator home visit\n4. Facilitator scans CNIC + FIR/affidavit (if lost) or damaged license\n5. New license delivered home in 5–10 working days',
      ur: '1. داسترک پنجاب ایپ کھولیں\n2. "ایکسائز اور گاڑی" → "ڈپلیکیٹ ڈرائیونگ لائسنس" پر جائیں\n3. سہولت کار کے لیے وقت بک کریں\n4. شناختی کارڈ + ایف آئی آر/حلف نامہ یا خراب لائسنس اسکین ہوگا\n5. نیا لائسنس 5-10 دن میں گھر آئے گا',
    },
    { en: '• CNIC\n• FIR or affidavit for lost license (or damaged license)', ur: '• شناختی کارڈ\n• گم لائسنس کے لیے ایف آئی آر یا حلف نامہ' }
  ),

  pun_exc_6: buildMsg(
    'Learner Driving License', 'لرنر ڈرائیونگ لائسنس', 'Punjab | پنجاب', APP_CONFIG.punjab,
    {
      en: '1. Open Dastak Punjab App\n2. Go to "Excise & Vehicle" → "Learner Driving License"\n3. Book Facilitator home visit\n4. Facilitator scans CNIC, medical fitness certificate, passport photos\n5. Learner permit delivered home (valid 6 months)\n⚠️ Minimum age: 17 years',
      ur: '1. داسترک پنجاب ایپ کھولیں\n2. "ایکسائز اور گاڑی" → "لرنر ڈرائیونگ لائسنس" پر جائیں\n3. سہولت کار کے لیے وقت بک کریں\n4. شناختی کارڈ، میڈیکل فٹنس سرٹیفکیٹ، تصاویر اسکین ہوں گی\n5. لرنر پرمٹ گھر آئے گا (6 ماہ کے لیے)',
    },
    { en: '• CNIC\n• Medical fitness certificate\n• 2 passport photos', ur: '• شناختی کارڈ\n• میڈیکل فٹنس سرٹیفکیٹ\n• 2 پاسپورٹ تصاویر' }
  ),

  pun_exc_7: buildMsg(
    'Renewal — International Driving License', 'انٹرنیشنل ڈرائیونگ لائسنس تجدید', 'Punjab | پنجاب', APP_CONFIG.punjab,
    {
      en: '1. Open Dastak Punjab App\n2. Go to "Excise & Vehicle" → "International Driving License Renewal"\n3. Book Facilitator home visit\n4. Facilitator scans CNIC, existing IDL, valid local license, passport copy\n5. New IDL delivered home — valid 1 year',
      ur: '1. داسترک پنجاب ایپ کھولیں\n2. "ایکسائز اور گاڑی" → "انٹرنیشنل ڈرائیونگ لائسنس تجدید" پر جائیں\n3. سہولت کار کے لیے وقت بک کریں\n4. شناختی کارڈ، موجودہ آئی ڈی ایل، مقامی لائسنس، پاسپورٹ اسکین ہوگا\n5. نیا آئی ڈی ایل گھر آئے گا',
    },
    { en: '• CNIC\n• Existing IDL\n• Valid local license\n• Passport copy\n• Photos', ur: '• شناختی کارڈ\n• موجودہ آئی ڈی ایل\n• درست مقامی لائسنس\n• پاسپورٹ کاپی\n• تصاویر' }
  ),

  pun_exc_8: buildMsg(
    'Renewal — Learner Driving License', 'لرنر ڈرائیونگ لائسنس تجدید', 'Punjab | پنجاب', APP_CONFIG.punjab,
    {
      en: '1. Open Dastak Punjab App\n2. Go to "Excise & Vehicle" → "Renewal — Learner Driving License"\n3. Book Facilitator home visit\n4. Facilitator scans CNIC + expired learner license\n⚠️ If expired more than 1 year, apply for a fresh Learner DL instead',
      ur: '1. داسترک پنجاب ایپ کھولیں\n2. "ایکسائز اور گاڑی" → "لرنر ڈرائیونگ لائسنس تجدید" پر جائیں\n3. سہولت کار کے لیے وقت بک کریں\n4. شناختی کارڈ + میعاد ختم لرنر لائسنس اسکین ہوگا',
    },
    { en: '• CNIC\n• Expired learner license', ur: '• شناختی کارڈ\n• میعاد ختم لرنر لائسنس' },
    '1 سال سے زیادہ میعاد ختم ہو تو نئے لرنر لائسنس کے لیے درخواست دیں | If expired >1 year, apply fresh'
  ),

  pun_exc_9: buildMsg(
    'Renewal — Regular Driving License', 'ریگولر ڈرائیونگ لائسنس تجدید', 'Punjab | پنجاب', APP_CONFIG.punjab,
    {
      en: '1. Open Dastak Punjab App\n2. Go to "Excise & Vehicle" → "Renewal — Regular Driving License"\n3. Book Facilitator home visit\n4. Facilitator scans CNIC, current/expired license, medical cert, photos\n5. Renewed license delivered home in 7–14 working days\n⚠️ Apply before or within 30 days of expiry',
      ur: '1. داسترک پنجاب ایپ کھولیں\n2. "ایکسائز اور گاڑی" → "ریگولر ڈرائیونگ لائسنس تجدید" پر جائیں\n3. سہولت کار کے لیے وقت بک کریں\n4. شناختی کارڈ، موجودہ/میعاد ختم لائسنس، میڈیکل سرٹیفکیٹ، تصاویر اسکین ہوں گی\n5. تجدید شدہ لائسنس 7-14 دن میں گھر آئے گا',
    },
    { en: '• CNIC\n• Existing license\n• Medical fitness certificate\n• Passport photos', ur: '• شناختی کارڈ\n• موجودہ لائسنس\n• میڈیکل فٹنس سرٹیفکیٹ\n• پاسپورٹ تصاویر' }
  ),

  // ── PUNJAB — REVENUE & PROPERTY ──────────────────────────────────────
  pun_rev_1: buildMsg(
    'Pay Property Tax', 'جائیداد ٹیکس ادائیگی', 'Punjab | پنجاب', APP_CONFIG.punjab,
    {
      en: '1. Open Dastak Punjab App\n2. Go to "Citizen Services" → "Revenue & Property"\n3. Select "Pay Property Tax"\n4. Enter property ID or CNIC\n5. View tax amount\n6. Pay via JazzCash / EasyPaisa / IBFT / COD / PSID\n7. Receipt generated instantly',
      ur: '1. داسترک پنجاب ایپ کھولیں\n2. "شہری خدمات" → "ریونیو اور جائیداد" پر جائیں\n3. "جائیداد ٹیکس ادائیگی" منتخب کریں\n4. پراپرٹی آئی ڈی یا شناختی کارڈ درج کریں\n5. ٹیکس کی رقم دیکھیں\n6. آن لائن ادا کریں\n7. رسید فوری جنریٹ ہوگی',
    }
  ),

  pun_rev_2: buildMsg(
    'Property Tax NOC', 'جائیداد ٹیکس این او سی', 'Punjab | پنجاب', APP_CONFIG.punjab,
    {
      en: '1. Open Dastak Punjab App\n2. Go to "Revenue & Property" → "Property Tax NOC"\n3. Book Facilitator home visit\n4. Facilitator collects CNIC, property ownership docs, latest tax payment proof\n5. NOC delivered home — used for sale, transfer, bank loan, construction permit',
      ur: '1. داسترک پنجاب ایپ کھولیں\n2. "ریونیو اور جائیداد" → "جائیداد ٹیکس این او سی" پر جائیں\n3. سہولت کار کے لیے وقت بک کریں\n4. شناختی کارڈ، ملکیت دستاویزات، تازہ ٹیکس ادائیگی ثبوت اکٹھا ہوگا\n5. این او سی گھر آئے گا',
    },
    { en: '• CNIC\n• Property ownership docs\n• Latest tax payment proof', ur: '• شناختی کارڈ\n• ملکیت دستاویزات\n• تازہ ٹیکس ادائیگی ثبوت' }
  ),

  pun_rev_3: buildMsg(
    'Cotton Fee Payment', 'کپاس فیس ادائیگی', 'Punjab | پنجاب', APP_CONFIG.punjab,
    {
      en: '1. Open Dastak Punjab App\n2. Go to "Revenue & Property" → "Cotton Fee"\n3. Enter landowner and crop details\n4. View fee amount\n5. Pay online\n📋 Required: Land record/Girdawari, CNIC',
      ur: '1. داسترک پنجاب ایپ کھولیں\n2. "ریونیو اور جائیداد" → "کپاس فیس" پر جائیں\n3. زمیندار اور فصل کی تفصیلات درج کریں\n4. فیس کی رقم دیکھیں\n5. آن لائن ادا کریں',
    }
  ),

  pun_rev_4: buildMsg(
    'Professional Tax', 'پروفیشنل ٹیکس', 'Punjab | پنجاب', APP_CONFIG.punjab,
    {
      en: '1. Open Dastak Punjab App\n2. Go to "Revenue & Property" → "Professional Tax"\n3. Enter business or professional details\n4. View annual tax amount\n5. Pay online — annual payment required\n📋 Required: Business NTN, CNIC',
      ur: '1. داسترک پنجاب ایپ کھولیں\n2. "ریونیو اور جائیداد" → "پروفیشنل ٹیکس" پر جائیں\n3. کاروباری یا پیشہ ورانہ تفصیلات درج کریں\n4. سالانہ ٹیکس کی رقم دیکھیں\n5. آن لائن ادا کریں',
    }
  ),

  pun_rev_5: buildMsg(
    'eAuction Payments', 'ای نیلامی ادائیگی', 'Punjab | پنجاب', APP_CONFIG.punjab,
    {
      en: '1. Open Dastak Punjab App\n2. Go to "Revenue & Property" → "eAuction Payments"\n3. Enter auction lot or bid reference\n4. View payment due\n5. Pay securely online\n📋 Required: Auction reference number, CNIC',
      ur: '1. داسترک پنجاب ایپ کھولیں\n2. "ریونیو اور جائیداد" → "ای نیلامی ادائیگی" پر جائیں\n3. نیلامی لاٹ یا بِڈ ریفرنس درج کریں\n4. واجب الادا رقم دیکھیں\n5. محفوظ طریقے سے آن لائن ادا کریں',
    }
  ),

  pun_rev_6: buildMsg(
    'E-Stamping', 'ای سٹیمپنگ', 'Punjab | پنجاب', APP_CONFIG.punjab,
    {
      en: '1. Open Dastak Punjab App\n2. Go to "Revenue & Property" → "E-Stamping"\n3. Book Facilitator home visit\n4. Facilitator collects both parties\' CNICs, document purpose, stamp value\n5. E-stamp paper generated digitally via PITB\n✅ Accepted by all courts and offices in Punjab',
      ur: '1. داسترک پنجاب ایپ کھولیں\n2. "ریونیو اور جائیداد" → "ای سٹیمپنگ" پر جائیں\n3. سہولت کار کے لیے وقت بک کریں\n4. دونوں فریقین کے شناختی کارڈ، دستاویز مقصد، سٹیمپ ویلیو اکٹھی ہوگی\n5. ای سٹیمپ ڈیجیٹل طریقے سے جنریٹ ہوگا',
    },
    { en: '• Both parties\' CNIC\n• Document purpose (sale deed/rental/affidavit)\n• Stamp value', ur: '• دونوں فریقین کے شناختی کارڈ\n• دستاویز مقصد\n• سٹیمپ ویلیو' }
  ),

  pun_rev_7: buildMsg(
    'Get Mutation Copy (Intiqal)', 'انتقال کاپی', 'Punjab | پنجاب', APP_CONFIG.punjab,
    {
      en: '1. Open Dastak Punjab App\n2. Go to "Revenue & Property" → "Get Mutation Copy"\n3. Book Facilitator home visit\n4. Mutation copy requested from PLRA, delivered home\n📋 Required: CNIC, Khasra/Khatooni number, District/Tehsil/Mauza details',
      ur: '1. داسترک پنجاب ایپ کھولیں\n2. "ریونیو اور جائیداد" → "انتقال کاپی" پر جائیں\n3. سہولت کار کے لیے وقت بک کریں\n4. پی ایل آر اے سے انتقال کاپی منگوائی جائے گی',
    },
    { en: '• CNIC\n• Khasra / Khatooni number\n• District/Tehsil/Mauza details', ur: '• شناختی کارڈ\n• خسرہ / خاطونی نمبر\n• ضلع/تحصیل/موضع تفصیل' }
  ),

  pun_rev_8: buildMsg(
    'Get Registry Copy', 'رجسٹری کاپی', 'Punjab | پنجاب', APP_CONFIG.punjab,
    {
      en: '1. Open Dastak Punjab App\n2. Go to "Revenue & Property" → "Get Registry Copy"\n3. Book Facilitator home visit\n4. Certified registry copy obtained from Sub-Registrar Office, delivered home\n📋 Required: CNIC, registration deed number or property details, date of registration',
      ur: '1. داسترک پنجاب ایپ کھولیں\n2. "ریونیو اور جائیداد" → "رجسٹری کاپی" پر جائیں\n3. سہولت کار کے لیے وقت بک کریں\n4. سب رجسٹرار آفس سے تصدیق شدہ رجسٹری کاپی گھر آئے گی',
    },
    { en: '• CNIC\n• Registration deed number or property details\n• Date of registration', ur: '• شناختی کارڈ\n• رجسٹریشن ڈیڈ نمبر یا جائیداد تفصیل\n• رجسٹریشن تاریخ' }
  ),

  pun_rev_9: buildMsg(
    'New Fard Issuance', 'نئی فرد اجراء', 'Punjab | پنجاب', APP_CONFIG.punjab,
    {
      en: '1. Open Dastak Punjab App\n2. Go to "Revenue & Property" → "New Fard Issuance"\n3. Book Facilitator home visit\n4. Fard issued via PLRA, delivered home\n✅ Fard is official land ownership proof in Punjab\n📋 Required: CNIC, Khasra number, Mauza/Tehsil/District details',
      ur: '1. داسترک پنجاب ایپ کھولیں\n2. "ریونیو اور جائیداد" → "نئی فرد اجراء" پر جائیں\n3. سہولت کار کے لیے وقت بک کریں\n4. پی ایل آر اے سے فرد جاری ہوگی اور گھر آئے گی',
    },
    { en: '• CNIC\n• Khasra number\n• Mauza/Tehsil/District details', ur: '• شناختی کارڈ\n• خسرہ نمبر\n• موضع/تحصیل/ضلع تفصیل' }
  ),

  // ── PUNJAB — POLICE & SECURITY ────────────────────────────────────────
  pun_pol_1: buildMsg(
    'Character Certificate', 'کردار سرٹیفکیٹ', 'Punjab | پنجاب', APP_CONFIG.punjab,
    {
      en: '1. Open Dastak Punjab App\n2. Go to "Police & Security" → "Character Certificate"\n3. Book Facilitator home visit\n4. Facilitator scans CNIC + purpose letter\n5. Submitted to local police/SPU\n6. Certificate delivered home in 3–7 working days',
      ur: '1. داسترک پنجاب ایپ کھولیں\n2. "پولیس اور سیکیورٹی" → "کردار سرٹیفکیٹ" پر جائیں\n3. سہولت کار کے لیے وقت بک کریں\n4. شناختی کارڈ + مقصد خط اسکین ہوگا\n5. 3-7 دن میں سرٹیفکیٹ گھر آئے گا',
    },
    { en: '• CNIC\n• Purpose statement (job/visa/education/admission)', ur: '• شناختی کارڈ\n• مقصد بیان (ملازمت/ویزا/تعلیم/داخلہ)' }
  ),

  pun_pol_2: buildMsg(
    'Copy of FIR', 'ایف آئی آر کاپی', 'Punjab | پنجاب', APP_CONFIG.punjab,
    {
      en: '1. Open Dastak Punjab App\n2. Go to "Police & Security" → "Copy of FIR"\n3. Book Facilitator home visit\n4. Facilitator scans CNIC + FIR reference number\n5. Certified copy delivered home',
      ur: '1. داسترک پنجاب ایپ کھولیں\n2. "پولیس اور سیکیورٹی" → "ایف آئی آر کاپی" پر جائیں\n3. سہولت کار کے لیے وقت بک کریں\n4. شناختی کارڈ + ایف آئی آر ریفرنس نمبر اسکین ہوگا\n5. تصدیق شدہ کاپی گھر آئے گی',
    },
    { en: '• CNIC\n• FIR number or incident details\n• Complainant relationship proof', ur: '• شناختی کارڈ\n• ایف آئی آر نمبر یا واقعہ تفصیل\n• شکایت گزار تعلق ثبوت' }
  ),

  pun_pol_3: buildMsg(
    'Crime Report', 'جرم رپورٹ', 'Punjab | پنجاب', APP_CONFIG.punjab,
    {
      en: '1. Open Dastak Punjab App\n2. Go to "Police & Security" → "Crime Report"\n3. Book Facilitator home visit\n4. Facilitator records incident details\n5. Crime report lodged with local police station on your behalf\n⚠️ Serious crimes may require in-person follow-up',
      ur: '1. داسترک پنجاب ایپ کھولیں\n2. "پولیس اور سیکیورٹی" → "جرم رپورٹ" پر جائیں\n3. سہولت کار کے لیے وقت بک کریں\n4. سہولت کار واقعہ تفصیل ریکارڈ کرے گا\n5. آپ کی طرف سے پولیس تھانے میں رپورٹ درج ہوگی',
    },
    { en: '• CNIC\n• Incident details\n• Evidence if available', ur: '• شناختی کارڈ\n• واقعہ تفصیل\n• دستیاب ثبوت' }
  ),

  pun_pol_4: buildMsg(
    'General Police Verification', 'پولیس تصدیق', 'Punjab | پنجاب', APP_CONFIG.punjab,
    {
      en: '1. Open Dastak Punjab App\n2. Go to "Police & Security" → "General Police Verification"\n3. Book Facilitator home visit\n4. Facilitator scans CNIC, photos, purpose document\n5. Verification certificate delivered home',
      ur: '1. داسترک پنجاب ایپ کھولیں\n2. "پولیس اور سیکیورٹی" → "پولیس تصدیق" پر جائیں\n3. سہولت کار کے لیے وقت بک کریں\n4. شناختی کارڈ، تصاویر، مقصد دستاویز اسکین ہوگی\n5. تصدیقی سرٹیفکیٹ گھر آئے گا',
    },
    { en: '• CNIC\n• Purpose (domestic worker/tenant/employee verification)', ur: '• شناختی کارڈ\n• مقصد (گھریلو ملازم/کرایہ دار/ملازم تصدیق)' }
  ),

  pun_pol_5: buildMsg(
    'Loss Report', 'گم شدہ اشیاء رپورٹ', 'Punjab | پنجاب', APP_CONFIG.punjab,
    {
      en: '1. Open Dastak Punjab App\n2. Go to "Police & Security" → "Loss Report"\n3. Book Facilitator home visit\n4. Facilitator records details of lost item\n5. Loss report + certificate delivered home',
      ur: '1. داسترک پنجاب ایپ کھولیں\n2. "پولیس اور سیکیورٹی" → "گم شدہ اشیاء رپورٹ" پر جائیں\n3. سہولت کار کے لیے وقت بک کریں\n4. سہولت کار گم شدہ اشیاء کی تفصیل ریکارڈ کرے گا\n5. رپورٹ گھر آئے گی',
    },
    { en: '• CNIC\n• Description of lost items\n• Date and location of loss', ur: '• شناختی کارڈ\n• گم شدہ اشیاء کی تفصیل\n• گم ہونے کی تاریخ اور مقام' }
  ),

  pun_pol_6: buildMsg(
    'Tenant Registration', 'کرایہ دار رجسٹریشن', 'Punjab | پنجاب', APP_CONFIG.punjab,
    {
      en: '1. Open Dastak Punjab App\n2. Go to "Police & Security" → "Tenant Registration"\n3. Book Facilitator home visit\n4. Facilitator scans landlord CNIC, tenant CNIC, rental agreement\n5. Tenant registered with local police\n⚠️ Legally required for all landlords in Punjab | Fine if not done: Rs. 5,000+',
      ur: '1. داسترک پنجاب ایپ کھولیں\n2. "پولیس اور سیکیورٹی" → "کرایہ دار رجسٹریشن" پر جائیں\n3. سہولت کار کے لیے وقت بک کریں\n4. مالک مکان، کرایہ دار کے شناختی کارڈ، کرایہ نامہ اسکین ہوگا\n5. کرایہ دار مقامی پولیس میں رجسٹر ہوگا',
    },
    { en: '• Landlord CNIC\n• Tenant CNIC\n• Signed rental agreement', ur: '• مالک مکان کا شناختی کارڈ\n• کرایہ دار کا شناختی کارڈ\n• دستخط شدہ کرایہ نامہ' }
  ),

  pun_pol_7: buildMsg(
    'Safe City Traffic Challan (Online)', 'سیف سٹی ٹریفک چالان (آن لائن)', 'Punjab | پنجاب', APP_CONFIG.punjab,
    {
      en: '1. Open Dastak Punjab App\n2. Go to "Police & Security" → "Safe City Traffic Challan"\n3. Enter challan reference number from SMS\n4. View challan details\n5. Pay online\n⚠️ Pay before deadline | Online only — no Facilitator needed',
      ur: '1. داسترک پنجاب ایپ کھولیں\n2. "پولیس اور سیکیورٹی" → "سیف سٹی ٹریفک چالان" پر جائیں\n3. ایس ایم ایس کا ریفرنس نمبر درج کریں\n4. چالان تفصیلات دیکھیں\n5. آن لائن ادا کریں',
    },
    null, 'Online only | صرف آن لائن'
  ),

  pun_pol_8: buildMsg(
    'Traffic Challan — Punjab Police', 'ٹریفک چالان — پنجاب پولیس', 'Punjab | پنجاب', APP_CONFIG.punjab,
    {
      en: '1. Open Dastak Punjab App\n2. Go to "Police & Security" → "Traffic Challan (Punjab Police)"\n3. Enter challan number or vehicle registration\n4. Pay online\n📞 Disputes: Punjab Traffic Police helpline 1915\n⚠️ Online only — no Facilitator needed',
      ur: '1. داسترک پنجاب ایپ کھولیں\n2. "پولیس اور سیکیورٹی" → "ٹریفک چالان (پنجاب پولیس)" پر جائیں\n3. چالان نمبر یا گاڑی رجسٹریشن درج کریں\n4. آن لائن ادا کریں',
    },
    null, 'Online only | صرف آن لائن'
  ),

  // ── PUNJAB — FISHERIES ────────────────────────────────────────────────
  pun_fish_1: buildMsg(
    'Fisheries E-License', 'فشریز ای لائسنس', 'Punjab | پنجاب', APP_CONFIG.punjab,
    {
      en: '1. Open Dastak Punjab App\n2. Go to "Citizen Services" → "E-License Fisheries"\n3. Book Facilitator home visit\n4. Facilitator scans CNIC, fishing area/pond details, previous license (if renewal)\n5. E-license submitted to Punjab Fisheries Dept and delivered home\n✅ For commercial fishing and fish farming in Punjab',
      ur: '1. داسترک پنجاب ایپ کھولیں\n2. "شہری خدمات" → "ای لائسنس فشریز" پر جائیں\n3. سہولت کار کے لیے وقت بک کریں\n4. شناختی کارڈ، ماہی گیری علاقہ/تالاب تفصیل، پچھلا لائسنس اسکین ہوگا\n5. ای لائسنس پنجاب فشریز ڈیپارٹمنٹ میں جمع ہوگا',
    },
    { en: '• CNIC\n• Fishing area details\n• Previous license (for renewal)', ur: '• شناختی کارڈ\n• ماہی گیری علاقہ تفصیل\n• پچھلا لائسنس (تجدید کے لیے)' }
  ),

  // ── PUNJAB — BUSINESS SERVICES (generalized with common format) ───────
  pun_ind_1: buildMsg(
    'Registration of Inspection Authority', 'معائنہ اتھارٹی رجسٹریشن', 'Punjab — Business Services | پنجاب', APP_CONFIG.punjab,
    {
      en: '1. Open Dastak Punjab App\n2. Go to "Business Services" → "Industries, Commerce & Skills"\n3. Select "Registration of Inspection Authority"\n4. Book Facilitator visit to business address\n5. Facilitator scans CNIC, SECP certificate, technical staff qualifications, equipment inventory\n6. Certificate delivered to business address\n⏱ Processing: 15–30 working days',
      ur: '1. داسترک پنجاب ایپ کھولیں\n2. "کاروباری خدمات" → "صنعت، تجارت اور ہنرمندی" پر جائیں\n3. "معائنہ اتھارٹی رجسٹریشن" منتخب کریں\n4. کاروباری پتے پر سہولت کار کا دورہ بک کریں\n5. شناختی کارڈ، ایس ای سی پی سرٹیفکیٹ، تکنیکی عملہ اسناد اسکین ہوں گی',
    },
    { en: '• CNIC\n• SECP certificate\n• Technical staff CVs\n• Equipment list\n• Facility address', ur: '• شناختی کارڈ\n• ایس ای سی پی سرٹیفکیٹ\n• تکنیکی عملہ سی وی\n• آلات کی فہرست\n• سہولت کا پتہ' }
  ),

  pun_epa_1: buildMsg('EPA Confirmation of Compliance', 'ای پی اے تعمیل تصدیق', 'Punjab — Business | پنجاب', APP_CONFIG.punjab,
    { en: '1. Open Dastak Punjab App → "Business Services" → "EPA"\n2. Select "Confirmation of Compliance (HQ)"\n3. Book Facilitator visit\n4. Facilitator collects CNIC, business registration, factory license, prior EPA letters\n5. Certificate delivered | ⏱ 10–20 working days', ur: '1. داسترک ایپ → "کاروباری خدمات" → "ای پی اے"\n2. "تعمیل کی تصدیق (ایچ کیو)" منتخب کریں\n3. سہولت کار کا دورہ بک کریں\n4. شناختی کارڈ، کاروباری رجسٹریشن، فیکٹری لائسنس، ای پی اے خطوط اسکین ہوں گے' },
    { en: '• CNIC\n• Business registration\n• Factory license\n• Prior EPA letters', ur: '• شناختی کارڈ\n• کاروباری رجسٹریشن\n• فیکٹری لائسنس\n• پچھلے ای پی اے خطوط' }
  ),

  pun_epa_2: buildMsg('Environmental Approval IEE (District)', 'ماحولیاتی منظوری آئی ای ای (ضلع)', 'Punjab — Business | پنجاب', APP_CONFIG.punjab,
    { en: '1. Open Dastak Punjab App → "Business Services" → "EPA"\n2. Select "Environmental Approval (IEE) at District Level"\n3. Book Facilitator visit\n4. Facilitator collects CNIC, project description, site plan, land ownership docs\n5. Submitted to District EPA Office', ur: '1. داسترک ایپ → "کاروباری خدمات" → "ای پی اے"\n2. "ماحولیاتی منظوری آئی ای ای (ضلعی سطح)" منتخب کریں\n3. سہولت کار کا دورہ بک کریں\n4. شناختی کارڈ، منصوبے کی تفصیل، سائٹ پلان، زمین دستاویزات اکٹھی ہوں گی' },
    { en: '• CNIC\n• Project description\n• Site plan\n• Land ownership docs', ur: '• شناختی کارڈ\n• منصوبے کی تفصیل\n• سائٹ پلان\n• زمین ملکیت دستاویزات' }
  ),

  pun_epa_3: buildMsg('Environmental Approval IEE (Division)', 'ماحولیاتی منظوری آئی ای ای (ڈویژن)', 'Punjab — Business | پنجاب', APP_CONFIG.punjab,
    { en: '1. Open Dastak Punjab App → "Business Services" → "EPA"\n2. Select "Environmental Approval (IEE) at Divisional Level"\n3. Book Facilitator visit\n4. Facilitator collects divisional-level project docs\n5. Submitted to Divisional EPA Office', ur: '1. داسترک ایپ → "کاروباری خدمات" → "ای پی اے"\n2. "ماحولیاتی منظوری آئی ای ای (ڈویژنل سطح)" منتخب کریں\n3. سہولت کار کا دورہ بک کریں\n4. ڈویژنل منصوبہ دستاویزات اکٹھی ہوں گی' },
    { en: '• Detailed project docs\n• Site assessment\n• CNIC', ur: '• تفصیلی منصوبہ دستاویزات\n• سائٹ تشخیص\n• شناختی کارڈ' }
  ),

  pun_epa_4: buildMsg('Environmental Approval EIA (EPA HQ)', 'ماحولیاتی منظوری ای آئی اے (ایچ کیو)', 'Punjab — Business | پنجاب', APP_CONFIG.punjab,
    { en: '1. Open Dastak Punjab App → "Business Services" → "EPA"\n2. Select "Environmental Approval — EIA at EPA HQ"\n3. Book Facilitator visit\n4. Facilitator collects full EIA report + supporting docs\n5. Submitted to Punjab EPA HQ | ⏱ 30–90 working days', ur: '1. داسترک ایپ → "کاروباری خدمات" → "ای پی اے"\n2. "ماحولیاتی منظوری ای آئی اے (ایچ کیو)" منتخب کریں\n3. سہولت کار کا دورہ بک کریں\n4. مکمل ای آئی اے رپورٹ + معاون دستاویزات اکٹھی ہوں گی' },
    { en: '• Full EIA report\n• Project plans\n• Corporate docs\n• CNIC', ur: '• مکمل ای آئی اے رپورٹ\n• منصوبہ جات\n• کارپوریٹ دستاویزات\n• شناختی کارڈ' }
  ),

  pun_epa_5: buildMsg('Environmental Approval IEE (EPA HQ)', 'ماحولیاتی منظوری آئی ای ای (ایچ کیو)', 'Punjab — Business | پنجاب', APP_CONFIG.punjab,
    { en: '1. Open Dastak Punjab App → "Business Services" → "EPA"\n2. Select "Environmental Approval — IEE at EPA HQ"\n3. Book Facilitator visit\n4. Facilitator collects IEE report, CNIC, project documents\n5. Submitted to Punjab EPA HQ', ur: '1. داسترک ایپ → "کاروباری خدمات" → "ای پی اے"\n2. "ماحولیاتی منظوری آئی ای ای (ایچ کیو)" منتخب کریں\n3. سہولت کار کا دورہ بک کریں\n4. آئی ای ای رپورٹ، شناختی کارڈ، منصوبہ دستاویزات اکٹھی ہوں گی' },
    { en: '• IEE report\n• Project plan\n• CNIC\n• Corporate registration', ur: '• آئی ای ای رپورٹ\n• منصوبہ پلان\n• شناختی کارڈ\n• کارپوریٹ رجسٹریشن' }
  ),

  pun_epa_6: buildMsg('Import/Export Environmental Recommendation', 'درآمد/برآمد ماحولیاتی سفارش', 'Punjab — Business | پنجاب', APP_CONFIG.punjab,
    { en: '1. Open Dastak Punjab App → "Business Services" → "EPA"\n2. Select "Recommendation for Import/Export Approval"\n3. Book Facilitator visit\n4. Facilitator collects trade documents, goods manifest, CNIC, previous EPA clearance\n5. Submitted to Punjab EPA', ur: '1. داسترک ایپ → "کاروباری خدمات" → "ای پی اے"\n2. "درآمد/برآمد سفارش" منتخب کریں\n3. سہولت کار کا دورہ بک کریں\n4. تجارتی دستاویزات، مال منشور، شناختی کارڈ، پچھلا ای پی اے کلیئرنس اکٹھا ہوگا' },
    { en: '• Trade license\n• Goods manifest\n• CNIC\n• Prior EPA clearance', ur: '• تجارتی لائسنس\n• مال منشور\n• شناختی کارڈ\n• پچھلا ای پی اے کلیئرنس' }
  ),

  pun_live_1: buildMsg('Animal Compound Feed Mill License', 'جانور فیڈ مل لائسنس', 'Punjab — Business | پنجاب', APP_CONFIG.punjab,
    { en: '1. Open Dastak Punjab App → "Business Services" → "Livestock"\n2. Select "Animal Feed Mill License"\n3. Book Facilitator visit to business address\n4. Facilitator collects CNIC, SECP registration, premises lease, staff qualifications, equipment inventory\n5. License certificate delivered | ⏱ 15–30 working days\n🌐 lddd.punjab.gov.pk', ur: '1. داسترک ایپ → "کاروباری خدمات" → "لائیو اسٹاک"\n2. "جانور فیڈ مل لائسنس" منتخب کریں\n3. کاروباری پتے پر سہولت کار کا دورہ بک کریں\n4. شناختی کارڈ، ایس ای سی پی رجسٹریشن، احاطہ لیز، عملہ اسناد، آلات فہرست اکٹھی ہوگی' },
    { en: '• CNIC\n• SECP/Chamber registration\n• Premises lease/ownership\n• Staff technical qualifications\n• Equipment inventory', ur: '• شناختی کارڈ\n• ایس ای سی پی رجسٹریشن\n• احاطہ لیز/ملکیت\n• عملہ تکنیکی اسناد\n• آلات فہرست' }
  ),

  pun_live_2: buildMsg('AI Training Institute License', 'اے آئی ٹریننگ انسٹیٹیوٹ لائسنس', 'Punjab — Business | پنجاب', APP_CONFIG.punjab,
    { en: '1. Open Dastak Punjab App → "Business Services" → "Livestock"\n2. Select "AI Training Institute License"\n3. Book Facilitator visit\n4. Facilitator collects CNIC, SECP registration, premises, staff qualifications\n5. License delivered | ⏱ 15–30 working days', ur: '1. داسترک ایپ → "لائیو اسٹاک"\n2. "اے آئی ٹریننگ انسٹیٹیوٹ لائسنس" منتخب کریں\n3. سہولت کار کا دورہ بک کریں\n4. شناختی کارڈ، ایس ای سی پی، احاطہ، عملہ اسناد اکٹھی ہوگی' },
    { en: '• CNIC\n• SECP registration\n• Premises docs\n• Staff qualifications', ur: '• شناختی کارڈ\n• ایس ای سی پی رجسٹریشن\n• احاطہ دستاویزات\n• عملہ اسناد' }
  ),

  pun_live_3: buildMsg('Semen Production Unit License', 'سیمن پروڈکشن یونٹ لائسنس', 'Punjab — Business | پنجاب', APP_CONFIG.punjab,
    { en: '1. Open Dastak Punjab App → "Business Services" → "Livestock"\n2. Select "Semen Production Unit License"\n3. Book Facilitator visit\n4. Facilitator collects required documents\n5. License delivered | ⏱ 15–30 working days', ur: '1. داسترک ایپ → "لائیو اسٹاک"\n2. "سیمن پروڈکشن یونٹ لائسنس" منتخب کریں\n3. سہولت کار کا دورہ بک کریں\n4. مطلوبہ دستاویزات اکٹھی ہوگی' },
    { en: '• CNIC\n• SECP registration\n• Technical qualifications\n• Equipment docs', ur: '• شناختی کارڈ\n• ایس ای سی پی رجسٹریشن\n• تکنیکی اسناد\n• آلات دستاویزات' }
  ),

  pun_live_4: buildMsg('AI Technicians License', 'اے آئی ٹیکنیشن لائسنس', 'Punjab — Business | پنجاب', APP_CONFIG.punjab,
    { en: '1. Open Dastak Punjab App → "Business Services" → "Livestock"\n2. Select "AI Technicians License"\n3. Book Facilitator visit\n4. Facilitator collects CNIC, qualification certificates, experience docs\n5. License delivered | ⏱ 15–30 working days', ur: '1. داسترک ایپ → "لائیو اسٹاک"\n2. "اے آئی ٹیکنیشن لائسنس" منتخب کریں\n3. سہولت کار کا دورہ بک کریں\n4. شناختی کارڈ، اہلیت سرٹیفکیٹ، تجربہ دستاویزات اکٹھی ہوگی' },
    { en: '• CNIC\n• Qualification certificates\n• Experience documents', ur: '• شناختی کارڈ\n• اہلیت سرٹیفکیٹ\n• تجربہ دستاویزات' }
  ),

  pun_live_5: buildMsg('Semen Distributor License', 'سیمن ڈسٹریبیوٹر لائسنس', 'Punjab — Business | پنجاب', APP_CONFIG.punjab,
    { en: '1. Open Dastak Punjab App → "Business Services" → "Livestock"\n2. Select "Semen Distributor License"\n3. Book Facilitator visit\n4. Facilitator collects required business & technical docs\n5. License delivered | ⏱ 15–30 working days', ur: '1. داسترک ایپ → "لائیو اسٹاک"\n2. "سیمن ڈسٹریبیوٹر لائسنس" منتخب کریں\n3. سہولت کار کا دورہ بک کریں' },
    { en: '• CNIC\n• Business registration\n• Technical docs', ur: '• شناختی کارڈ\n• کاروباری رجسٹریشن\n• تکنیکی دستاویزات' }
  ),

  pun_live_6: buildMsg('Semen/Embryo Importer License', 'سیمن/ایمبریو امپورٹر لائسنس', 'Punjab — Business | پنجاب', APP_CONFIG.punjab,
    { en: '1. Open Dastak Punjab App → "Business Services" → "Livestock"\n2. Select "Semen/Embryo Importer License"\n3. Book Facilitator visit\n4. Facilitator collects CNIC, import docs, business registration\n5. License delivered | ⏱ 15–30 working days', ur: '1. داسترک ایپ → "لائیو اسٹاک"\n2. "سیمن/ایمبریو امپورٹر لائسنس" منتخب کریں\n3. سہولت کار کا دورہ بک کریں' },
    { en: '• CNIC\n• Import documentation\n• Business registration', ur: '• شناختی کارڈ\n• درآمد دستاویزات\n• کاروباری رجسٹریشن' }
  ),

  pun_live_7: buildMsg('NOC for Animal Feed Mill', 'جانور فیڈ مل این او سی', 'Punjab — Business | پنجاب', APP_CONFIG.punjab,
    { en: '1. Open Dastak Punjab App → "Business Services" → "Livestock"\n2. Select "NOC for Animal Feed Mill"\n3. Book Facilitator visit\n4. Facilitator collects site plan, CNIC, EPA NOC, business registration\n5. NOC delivered — physical inspection may be required', ur: '1. داسترک ایپ → "لائیو اسٹاک"\n2. "جانور فیڈ مل این او سی" منتخب کریں\n3. سہولت کار کا دورہ بک کریں\n4. سائٹ پلان، شناختی کارڈ، ای پی اے این او سی، کاروباری رجسٹریشن اکٹھی ہوگی' },
    { en: '• CNIC\n• Site plan\n• EPA NOC\n• Business registration', ur: '• شناختی کارڈ\n• سائٹ پلان\n• ای پی اے این او سی\n• کاروباری رجسٹریشن' }
  ),

  pun_live_8: buildMsg('NOC for Poultry Feed Mill', 'پولٹری فیڈ مل این او سی', 'Punjab — Business | پنجاب', APP_CONFIG.punjab,
    { en: '1. Open Dastak Punjab App → "Business Services" → "Livestock"\n2. Select "NOC for Poultry Feed Mill"\n3. Book Facilitator visit — same process as Animal Feed Mill NOC\n4. Physical inspection of premises may be required', ur: '1. داسترک ایپ → "لائیو اسٹاک"\n2. "پولٹری فیڈ مل این او سی" منتخب کریں\n3. جانور فیڈ مل این او سی جیسا عمل' },
    { en: '• CNIC\n• Site plan\n• EPA NOC\n• Business registration', ur: '• شناختی کارڈ\n• سائٹ پلان\n• ای پی اے این او سی\n• کاروباری رجسٹریشن' }
  ),

  pun_live_9: buildMsg('Renew AI Technician License', 'اے آئی ٹیکنیشن لائسنس تجدید', 'Punjab — Business | پنجاب', APP_CONFIG.punjab,
    { en: '1. Open Dastak Punjab App → "Business Services" → "Livestock"\n2. Select "Renew AI Technician License"\n3. Book Facilitator visit\n4. Submit existing license, CNIC, updated docs\n⚠️ Renew before expiry to avoid penalty', ur: '1. داسترک ایپ → "لائیو اسٹاک"\n2. "اے آئی ٹیکنیشن لائسنس تجدید" منتخب کریں\n3. سہولت کار کا دورہ بک کریں\n4. موجودہ لائسنس، شناختی کارڈ، اپڈیٹ شدہ دستاویزات جمع کریں' },
    { en: '• Existing license\n• CNIC\n• Updated qualifications', ur: '• موجودہ لائسنس\n• شناختی کارڈ\n• اپڈیٹ شدہ اسناد' }
  ),

  pun_live_10: buildMsg('Renew Semen Production License', 'سیمن پروڈکشن لائسنس تجدید', 'Punjab — Business | پنجاب', APP_CONFIG.punjab,
    { en: '1. Open Dastak Punjab App → "Business Services" → "Livestock"\n2. Select "Renew Semen Production Unit License"\n3. Book Facilitator visit\n4. Submit existing license, CNIC, updated facility docs\n⚠️ Renew before expiry', ur: '1. داسترک ایپ → "لائیو اسٹاک"\n2. "سیمن پروڈکشن لائسنس تجدید" منتخب کریں\n3. سہولت کار کا دورہ بک کریں' },
    { en: '• Existing license\n• CNIC\n• Updated facility docs', ur: '• موجودہ لائسنس\n• شناختی کارڈ\n• اپڈیٹ شدہ سہولت دستاویزات' }
  ),

  pun_eng_1: buildMsg('Power Plant Grid Connection Sanction', 'پاور پلانٹ گرڈ کنکشن منظوری', 'Punjab — Business | پنجاب', APP_CONFIG.punjab,
    { en: '1. Open Dastak Punjab App → "Business Services" → "Energy"\n2. Select "Power Plant Grid Connection Sanction"\n3. Book Facilitator visit\n4. Facilitator collects CNIC, power plant technical specs, land ownership docs, WAPDA/LESCO correspondence\n5. Sanction letter delivered\n🌐 energy.punjab.gov.pk', ur: '1. داسترک ایپ → "توانائی"\n2. "پاور پلانٹ گرڈ کنکشن منظوری" منتخب کریں\n3. سہولت کار کا دورہ بک کریں\n4. شناختی کارڈ، پاور پلانٹ تکنیکی وضاحت، زمین دستاویزات اکٹھی ہوگی' },
    { en: '• CNIC\n• Company registration\n• Land docs\n• NEPRA license (if applicable)\n• Technical specs', ur: '• شناختی کارڈ\n• کمپنی رجسٹریشن\n• زمین دستاویزات\n• نیپرا لائسنس (اگر لاگو ہو)\n• تکنیکی وضاحت' }
  ),

  pun_tour_1: buildMsg('Tourist Guide License', 'سیاحتی گائیڈ لائسنس', 'Punjab — Business | پنجاب', APP_CONFIG.punjab,
    { en: '1. Open Dastak Punjab App → "Business Services" → "Tourist Services"\n2. Select "Licensing of Tourist Guide"\n3. Book Facilitator visit\n4. Facilitator scans CNIC, qualification/language proficiency docs, photos\n5. License certificate delivered | ⏱ 10–15 working days', ur: '1. داسترک ایپ → "سیاحتی خدمات"\n2. "سیاحتی گائیڈ لائسنس" منتخب کریں\n3. سہولت کار کا دورہ بک کریں\n4. شناختی کارڈ، اہلیت/زبان مہارت دستاویزات، تصاویر اسکین ہوں گی' },
    { en: '• CNIC\n• Educational certificates\n• Language proficiency proof\n• Passport photos\n• Prior tourism experience letter', ur: '• شناختی کارڈ\n• تعلیمی سرٹیفکیٹ\n• زبان مہارت ثبوت\n• پاسپورٹ تصاویر\n• سیاحت تجربہ خط' }
  ),

  pun_health_1: buildMsg('Free Sale Certificate', 'فری سیل سرٹیفکیٹ', 'Punjab — Business | پنجاب', APP_CONFIG.punjab,
    { en: '1. Open Dastak Punjab App → "Business Services" → "District Health Authorities"\n2. Select "Free Sale Certificate"\n3. Book Facilitator visit\n4. Facilitator scans CNIC, product registration certificate, product details, manufacturing/import docs\n5. Certificate delivered', ur: '1. داسترک ایپ → "ضلعی صحت اتھارٹی"\n2. "فری سیل سرٹیفکیٹ" منتخب کریں\n3. سہولت کار کا دورہ بک کریں\n4. شناختی کارڈ، پروڈکٹ رجسٹریشن، تفصیل، مینوفیکچرنگ/درآمد دستاویزات اسکین ہوں گی' },
    { en: '• CNIC\n• Product registration\n• DRAP certificate (if applicable)\n• Manufacturing licence', ur: '• شناختی کارڈ\n• پروڈکٹ رجسٹریشن\n• ڈریپ سرٹیفکیٹ (اگر لاگو)\n• مینوفیکچرنگ لائسنس' }
  ),

  pun_home_1: buildMsg('Fire Prevention NOC', 'فائر پریوینشن این او سی', 'Punjab — Business | پنجاب', APP_CONFIG.punjab,
    { en: '1. Open Dastak Punjab App → "Business Services" → "Home Department"\n2. Select "NOC Pertaining to Fire Prevention Measures"\n3. Book Facilitator visit\n4. Facilitator collects CNIC, business/factory registration, premises details, fire equipment inventory\n5. Fire NOC delivered\n⚠️ Physical inspection by Fire Dept may be required', ur: '1. داسترک ایپ → "محکمہ داخلہ"\n2. "فائر پریوینشن این او سی" منتخب کریں\n3. سہولت کار کا دورہ بک کریں\n4. شناختی کارڈ، کاروباری رجسٹریشن، احاطہ تفصیل، آگ بجھانے کے آلات فہرست اکٹھی ہوگی' },
    { en: '• CNIC\n• Business registration\n• Premises layout\n• Fire equipment list', ur: '• شناختی کارڈ\n• کاروباری رجسٹریشن\n• احاطہ لے آؤٹ\n• آگ بجھانے آلات فہرست' }
  ),

  pun_pfa_1: buildMsg('Product Registration Certificate (PFA)', 'پروڈکٹ رجسٹریشن سرٹیفکیٹ', 'Punjab — Business | پنجاب', APP_CONFIG.punjab,
    { en: '1. Open Dastak Punjab App → "Business Services" → "Punjab Food Authority"\n2. Select "Certificate of Product Registration"\n3. Book Facilitator visit\n4. Facilitator scans CNIC, product details, lab test reports, manufacturing premises docs\n5. Submitted to PFA | 🌐 pfa.punjab.gov.pk', ur: '1. داسترک ایپ → "پنجاب فوڈ اتھارٹی"\n2. "پروڈکٹ رجسٹریشن سرٹیفکیٹ" منتخب کریں\n3. سہولت کار کا دورہ بک کریں\n4. شناختی کارڈ، پروڈکٹ تفصیل، لیب ٹیسٹ رپورٹ اسکین ہوگی' },
    { en: '• CNIC\n• Product name/composition\n• Lab test results\n• Manufacturing address', ur: '• شناختی کارڈ\n• پروڈکٹ نام/ترکیب\n• لیب ٹیسٹ نتائج\n• مینوفیکچرنگ پتہ' }
  ),

  pun_pfa_2: buildMsg('Food Business License', 'فوڈ بزنس لائسنس', 'Punjab — Business | پنجاب', APP_CONFIG.punjab,
    { en: '1. Open Dastak Punjab App → "Business Services" → "Punjab Food Authority"\n2. Select "Food Business License"\n3. Book Facilitator visit\n4. Facilitator scans CNIC, business registration, premises details, hygiene certificate\n5. PFA inspection may be conducted before approval', ur: '1. داسترک ایپ → "پنجاب فوڈ اتھارٹی"\n2. "فوڈ بزنس لائسنس" منتخب کریں\n3. سہولت کار کا دورہ بک کریں\n4. شناختی کارڈ، کاروباری رجسٹریشن، احاطہ تفصیل، صفائی سرٹیفکیٹ اسکین ہوگا' },
    { en: '• CNIC\n• Business registration\n• Premises lease\n• Staff health certificates', ur: '• شناختی کارڈ\n• کاروباری رجسٹریشن\n• احاطہ لیز\n• عملہ صحت سرٹیفکیٹ' }
  ),

  pun_pfa_3: buildMsg('Label Approval Letter (PFA)', 'لیبل اپروول خط', 'Punjab — Business | پنجاب', APP_CONFIG.punjab,
    { en: '1. Open Dastak Punjab App → "Business Services" → "Punjab Food Authority"\n2. Select "Label Approval Letter"\n3. Book Facilitator visit\n4. Facilitator collects CNIC, product label artwork, full ingredient list, nutritional info\n5. Approval letter delivered', ur: '1. داسترک ایپ → "پنجاب فوڈ اتھارٹی"\n2. "لیبل اپروول خط" منتخب کریں\n3. سہولت کار کا دورہ بک کریں\n4. شناختی کارڈ، لیبل آرٹ ورک، اجزاء فہرست، غذائی معلومات اکٹھی ہوگی' },
    { en: '• CNIC\n• Label artwork\n• Ingredient list\n• Nutritional information\n• Product registration (if done)', ur: '• شناختی کارڈ\n• لیبل آرٹ ورک\n• اجزاء فہرست\n• غذائی معلومات\n• پروڈکٹ رجسٹریشن (اگر ہوئی ہو)' }
  ),

  pun_irr_1: buildMsg('Flood Zone Clearance Certificate', 'سیلابی علاقہ کلیئرنس سرٹیفکیٹ', 'Punjab — Business | پنجاب', APP_CONFIG.punjab,
    { en: '1. Open Dastak Punjab App → "Business Services" → "Irrigation Department"\n2. Select "Site is Not Prone to Flooding Certificate"\n3. Book Facilitator visit\n4. Facilitator scans CNIC, land records (Fard), site coordinates/map, ownership proof\n5. Certificate delivered in 7–15 working days\n🌐 irrigation.punjab.gov.pk', ur: '1. داسترک ایپ → "محکمہ آبپاشی"\n2. "سیلابی علاقہ کلیئرنس سرٹیفکیٹ" منتخب کریں\n3. سہولت کار کا دورہ بک کریں\n4. شناختی کارڈ، زمین ریکارڈ (فرد)، سائٹ نقاط/نقشہ، ملکیت ثبوت اسکین ہوگا' },
    { en: '• CNIC\n• Land records (Fard)\n• Site coordinates/map\n• Ownership proof', ur: '• شناختی کارڈ\n• زمین ریکارڈ (فرد)\n• سائٹ نقاط/نقشہ\n• ملکیت ثبوت' }
  ),

  // ═══════════════════════════════════════════════════════════════════════
  // KPK — DASTAK KPK
  // ═══════════════════════════════════════════════════════════════════════
  kpk_exc_1: buildMsg('Vehicle Verification', 'گاڑی تصدیق', 'KPK — خیبر پختونخواہ', APP_CONFIG.kpk,
    { en: '1. Open Dastak KPK App\n2. Go to "Excise — Motor Vehicle"\n3. Select "Vehicle Verification"\n4. Enter registration number\n5. View owner name, tax status & token history — online only', ur: '1. داسترک کے پی کے ایپ کھولیں\n2. "ایکسائز — موٹر گاڑی" پر جائیں\n3. "گاڑی تصدیق" منتخب کریں\n4. رجسٹریشن نمبر درج کریں\n5. آن لائن مالک کا نام، ٹیکس اسٹیٹس دیکھیں' },
    null, 'Online only | صرف آن لائن'
  ),

  kpk_exc_2: buildMsg('New Vehicle Registration', 'نئی گاڑی رجسٹریشن', 'KPK — خیبر پختونخواہ', APP_CONFIG.kpk,
    { en: '1. Open Dastak KPK App\n2. Go to "Excise — Motor Vehicle" → "New Registration"\n3. Fill vehicle information\n4. Upload CNIC, invoice, customs clearance, insurance\n5. Pay registration fee online\n6. Book appointment at District Excise Office\n7. Visit office with original documents for verification\n🏢 District Excise Office (your district)', ur: '1. داسترک کے پی کے ایپ کھولیں\n2. "ایکسائز" → "نئی رجسٹریشن" پر جائیں\n3. گاڑی کی معلومات پُر کریں\n4. شناختی کارڈ، رسید، کسٹمز، انشورنس اپلوڈ کریں\n5. آن لائن رجسٹریشن فیس ادا کریں\n6. ضلعی ایکسائز آفس میں اپوائنٹمنٹ بک کریں\n7. اصل دستاویزات کے ساتھ آفس جائیں' },
    { en: '• CNIC\n• Purchase invoice\n• Customs clearance\n• Insurance certificate', ur: '• شناختی کارڈ\n• خریداری رسید\n• کسٹمز کلیئرنس\n• انشورنس سرٹیفکیٹ' }
  ),

  kpk_exc_3: buildMsg('Pay Token Tax', 'ٹوکن ٹیکس ادائیگی', 'KPK — خیبر پختونخواہ', APP_CONFIG.kpk,
    { en: '1. Open Dastak KPK App\n2. Go to "Excise" → "Pay Token Tax"\n3. Enter registration number\n4. View tax amount\n5. Pay via EasyPaisa / JazzCash / 1Link — receipt auto-generated', ur: '1. داسترک کے پی کے ایپ کھولیں\n2. "ایکسائز" → "ٹوکن ٹیکس ادائیگی" پر جائیں\n3. رجسٹریشن نمبر درج کریں\n4. ٹیکس کی رقم دیکھیں\n5. ادا کریں — رسید فوری جنریٹ' },
    null, 'Online only | صرف آن لائن'
  ),

  kpk_exc_4: buildMsg('Pay Token Tax (Other Vehicle)', 'دوسری گاڑی ٹوکن ٹیکس', 'KPK — خیبر پختونخواہ', APP_CONFIG.kpk,
    { en: '1. Open Dastak KPK App\n2. Go to "Excise" → "Pay Token Tax (Other Vehicle)"\n3. Enter the other vehicle\'s registration number\n4. View and pay tax online — useful for fleet owners and dealers', ur: '1. داسترک کے پی کے ایپ کھولیں\n2. "ایکسائز" → "دوسری گاڑی ٹوکن ٹیکس" پر جائیں\n3. دوسری گاڑی کا رجسٹریشن نمبر درج کریں\n4. ٹیکس دیکھیں اور ادا کریں' },
    null, 'Online only | صرف آن لائن'
  ),

  kpk_exc_5: buildMsg('Apply Universal Number Plate', 'یونیورسل نمبر پلیٹ درخواست', 'KPK — خیبر پختونخواہ', APP_CONFIG.kpk,
    { en: '1. Open Dastak KPK App\n2. Go to "Excise" → "Apply for Universal Number Plate"\n3. Upload CNIC + registration book\n4. Pay fee online\n5. Collect from District Excise Office in 5–7 working days\n🏢 District Excise Office (your district)', ur: '1. داسترک کے پی کے ایپ کھولیں\n2. "ایکسائز" → "یونیورسل نمبر پلیٹ" پر جائیں\n3. شناختی کارڈ + رجسٹریشن بک اپلوڈ کریں\n4. آن لائن فیس ادا کریں\n5. 5-7 دن میں ضلعی ایکسائز آفس سے لیں' },
    { en: '• CNIC\n• Registration book', ur: '• شناختی کارڈ\n• رجسٹریشن بک' }
  ),

  kpk_exc_6: buildMsg('Replace Damaged Registration Book', 'خراب رجسٹریشن بک بدلیں', 'KPK — خیبر پختونخواہ', APP_CONFIG.kpk,
    { en: '1. Open Dastak KPK App\n2. Go to "Excise" → "Replace Damaged Reg. Book"\n3. Upload CNIC + photo of damaged book\n4. Pay replacement fee online\n5. Collect new book from District Excise Office', ur: '1. داسترک کے پی کے ایپ کھولیں\n2. "ایکسائز" → "خراب رجسٹریشن بک بدلیں" پر جائیں\n3. شناختی کارڈ + خراب بک کی تصویر اپلوڈ کریں\n4. تبدیلی فیس ادا کریں\n5. ضلعی ایکسائز آفس سے نئی بک لیں' },
    { en: '• CNIC\n• Photo of damaged book', ur: '• شناختی کارڈ\n• خراب بک کی تصویر' }
  ),

  kpk_exc_7: buildMsg('Duplicate Registration Book', 'ڈپلیکیٹ رجسٹریشن بک', 'KPK — خیبر پختونخواہ', APP_CONFIG.kpk,
    { en: '1. Open Dastak KPK App\n2. Go to "Excise" → "Apply Duplicate Book"\n3. Upload CNIC + affidavit for lost book\n4. Pay fee online\n5. Collect from District Excise Office in 5–10 working days', ur: '1. داسترک کے پی کے ایپ کھولیں\n2. "ایکسائز" → "ڈپلیکیٹ بک" پر جائیں\n3. شناختی کارڈ + گم ہونے کا حلف نامہ اپلوڈ کریں\n4. فیس ادا کریں\n5. 5-10 دن میں ضلعی ایکسائز آفس سے لیں' },
    { en: '• CNIC\n• Affidavit for lost book', ur: '• شناختی کارڈ\n• گم بک کا حلف نامہ' }
  ),

  kpk_exc_8: buildMsg('Duplicate Number Plate', 'ڈپلیکیٹ نمبر پلیٹ', 'KPK — خیبر پختونخواہ', APP_CONFIG.kpk,
    { en: '1. Open Dastak KPK App\n2. Go to "Excise" → "Apply Duplicate Number Plate"\n3. Upload CNIC + FIR or affidavit\n4. Pay fee online\n5. Collect from District Excise Office in 5–7 working days', ur: '1. داسترک کے پی کے ایپ کھولیں\n2. "ایکسائز" → "ڈپلیکیٹ نمبر پلیٹ" پر جائیں\n3. شناختی کارڈ + ایف آئی آر یا حلف نامہ اپلوڈ کریں\n4. فیس ادا کریں\n5. 5-7 دن میں آفس سے لیں' },
    { en: '• CNIC\n• FIR or affidavit', ur: '• شناختی کارڈ\n• ایف آئی آر یا حلف نامہ' }
  ),

  kpk_exc_9: buildMsg('Track Excise Applications', 'ایکسائز درخواستیں ٹریک', 'KPK — خیبر پختونخواہ', APP_CONFIG.kpk,
    { en: '1. Open Dastak KPK App\n2. Go to "Excise" → "All Submitted Applications"\n3. View all your excise applications and their current status\n🟡 Pending | 🔵 Under Review | 🟠 Docs Required | 🟢 Approved | ✅ Completed', ur: '1. داسترک کے پی کے ایپ کھولیں\n2. "ایکسائز" → "تمام جمع درخواستیں" پر جائیں\n3. اپنی تمام ایکسائز درخواستیں اور اسٹیٹس دیکھیں' },
    null, 'Online tracking | آن لائن ٹریکنگ'
  ),

  kpk_tr_1: buildMsg('Verify Driving License', 'ڈرائیونگ لائسنس تصدیق', 'KPK — خیبر پختونخواہ', APP_CONFIG.kpk,
    { en: '1. Open Dastak KPK App\n2. Go to "Transport / Driving License"\n3. Select "Verify Driving License"\n4. Enter license number\n5. View holder name, expiry date, class & status — online only', ur: '1. داسترک کے پی کے ایپ کھولیں\n2. "ٹرانسپورٹ / ڈرائیونگ لائسنس" پر جائیں\n3. "ڈرائیونگ لائسنس تصدیق" منتخب کریں\n4. لائسنس نمبر درج کریں\n5. ہولڈر کی تفصیلات دیکھیں' },
    null, 'Online only | صرف آن لائن'
  ),

  kpk_tr_2: buildMsg('New Driving License', 'نیا ڈرائیونگ لائسنس', 'KPK — خیبر پختونخواہ', APP_CONFIG.kpk,
    { en: '1. Open Dastak KPK App\n2. Go to "Transport" → "New Driving License"\n3. Choose Learner or Regular license\n4. Upload CNIC, medical certificate, 2 photos\n5. Pay fee online\n6. Book test at Driving License Authority\n7. Attend written + driving test\n8. Collect license after approval\n🏢 District Traffic Police Office | ⚠️ Minimum age: 18', ur: '1. داسترک کے پی کے ایپ کھولیں\n2. "ٹرانسپورٹ" → "نیا ڈرائیونگ لائسنس" پر جائیں\n3. لرنر یا ریگولر لائسنس منتخب کریں\n4. شناختی کارڈ، میڈیکل سرٹیفکیٹ، 2 تصاویر اپلوڈ کریں\n5. آن لائن فیس ادا کریں\n6. ٹیسٹ بک کریں\n7. لکھائی + ڈرائیونگ ٹیسٹ دیں\n8. منظوری کے بعد لائسنس لیں' },
    { en: '• CNIC\n• Medical certificate\n• 2 passport photos\n• Fee receipt', ur: '• شناختی کارڈ\n• میڈیکل سرٹیفکیٹ\n• 2 پاسپورٹ تصاویر\n• فیس رسید' }
  ),

  kpk_tr_3: buildMsg('Track Transport Applications', 'ٹرانسپورٹ درخواستیں ٹریک', 'KPK — خیبر پختونخواہ', APP_CONFIG.kpk,
    { en: '1. Open Dastak KPK App\n2. Go to "Transport" → "All Submitted Applications"\n3. View application status\n🟡 Submitted | 🔵 Test Scheduled | 🟢 Approved | ✅ Issued', ur: '1. داسترک کے پی کے ایپ کھولیں\n2. "ٹرانسپورٹ" → "تمام جمع درخواستیں" پر جائیں\n3. درخواست اسٹیٹس دیکھیں' },
    null, 'Online tracking | آن لائن ٹریکنگ'
  ),

  kpk_arm_1: buildMsg('New / Fresh Arms License (Personal)', 'نیا اسلحہ لائسنس (ذاتی)', 'KPK — خیبر پختونخواہ', APP_CONFIG.kpk,
    { en: '1. Open Dastak KPK App\n2. Go to "Arms License (Personal)" → "New / Fresh License"\n3. Fill application form with weapon details\n4. Upload CNIC, character certificate, police verification\n5. Pay fee online\n6. Book appointment at DC Office\n7. Appear for biometric verification\n8. Collect card after approval\n🏢 DC Office — Arms Branch, District HQ | ⏱ 30–45 working days', ur: '1. داسترک کے پی کے ایپ کھولیں\n2. "اسلحہ لائسنس (ذاتی)" → "نیا لائسنس" پر جائیں\n3. فارم پُر کریں\n4. شناختی کارڈ، کردار سرٹیفکیٹ، پولیس تصدیق اپلوڈ کریں\n5. آن لائن فیس ادا کریں\n6. ڈی سی آفس میں اپوائنٹمنٹ بک کریں\n7. بائیومیٹرک دیں\n8. کارڈ لیں' },
    { en: '• CNIC\n• Police character certificate\n• 2 passport photos\n• Fee receipt', ur: '• شناختی کارڈ\n• پولیس کردار سرٹیفکیٹ\n• 2 پاسپورٹ تصاویر\n• فیس رسید' }
  ),

  kpk_arm_2: buildMsg('Copy to Smart Card Conversion', 'سمارٹ کارڈ تبدیلی', 'KPK — خیبر پختونخواہ', APP_CONFIG.kpk,
    { en: '1. Open Dastak KPK App\n2. Go to "Arms License (Personal)" → "Copy to Card Conversion"\n3. Upload old paper license + CNIC\n4. Pay conversion fee\n5. Visit DC Office for biometric\n6. Collect new smart card\n⏱ 15–20 working days', ur: '1. داسترک کے پی کے ایپ کھولیں\n2. "اسلحہ لائسنس" → "سمارٹ کارڈ تبدیلی" پر جائیں\n3. پرانا کاغذی لائسنس + شناختی کارڈ اپلوڈ کریں\n4. تبدیلی فیس ادا کریں\n5. بائیومیٹرک کے لیے ڈی سی آفس جائیں\n6. سمارٹ کارڈ لیں' },
    { en: '• Old paper license\n• CNIC', ur: '• پرانا کاغذی لائسنس\n• شناختی کارڈ' }
  ),

  kpk_arm_3: buildMsg('Renew Expired Arms License', 'میعاد ختم اسلحہ لائسنس تجدید', 'KPK — خیبر پختونخواہ', APP_CONFIG.kpk,
    { en: '1. Open Dastak KPK App\n2. Go to "Arms License (Personal)" → "Renew Expired License"\n3. Upload CNIC + expired license\n4. Pay renewal fee\n5. Visit DC Office for biometric\n6. Collect renewed card\n⚠️ Apply within 3 months of expiry to avoid issues', ur: '1. داسترک کے پی کے ایپ کھولیں\n2. "اسلحہ لائسنس" → "میعاد ختم لائسنس تجدید" پر جائیں\n3. شناختی کارڈ + میعاد ختم لائسنس اپلوڈ کریں\n4. تجدید فیس ادا کریں\n5. بائیومیٹرک دیں\n6. تجدید شدہ کارڈ لیں' },
    { en: '• CNIC\n• Expired license', ur: '• شناختی کارڈ\n• میعاد ختم لائسنس' }
  ),

  kpk_arm_4: buildMsg('Weapon Change', 'ہتھیار تبدیلی', 'KPK — خیبر پختونخواہ', APP_CONFIG.kpk,
    { en: '1. Open Dastak KPK App\n2. Go to "Arms License (Personal)" → "Weapon Change"\n3. Enter current license number + new weapon details\n4. Upload CNIC + purchase receipt\n5. Pay amendment fee\n6. Visit DC Office for verification', ur: '1. داسترک کے پی کے ایپ کھولیں\n2. "اسلحہ لائسنس" → "ہتھیار تبدیلی" پر جائیں\n3. موجودہ لائسنس نمبر + نئے ہتھیار کی تفصیل درج کریں\n4. شناختی کارڈ + خریداری رسید اپلوڈ کریں\n5. ترمیم فیس ادا کریں\n6. ڈی سی آفس جائیں' },
    { en: '• CNIC\n• Current license\n• New weapon purchase receipt', ur: '• شناختی کارڈ\n• موجودہ لائسنس\n• نئے ہتھیار کی خریداری رسید' }
  ),

  kpk_arm_5: buildMsg('Cartridge Increase', 'کارتوس اضافہ', 'KPK — خیبر پختونخواہ', APP_CONFIG.kpk,
    { en: '1. Open Dastak KPK App\n2. Go to "Arms License (Personal)" → "Cartridge Increase"\n3. Enter license number and state reason\n4. Upload supporting docs\n5. Pay fee\n6. DC Office reviews request\n⚠️ Subject to district quota', ur: '1. داسترک کے پی کے ایپ کھولیں\n2. "اسلحہ لائسنس" → "کارتوس اضافہ" پر جائیں\n3. لائسنس نمبر اور وجہ درج کریں\n4. معاون دستاویزات اپلوڈ کریں\n5. فیس ادا کریں\n6. ڈی سی آفس نظرثانی کرے گا' },
    { en: '• CNIC\n• License number\n• Supporting docs for reason', ur: '• شناختی کارڈ\n• لائسنس نمبر\n• وجہ کی معاون دستاویزات' }
  ),

  kpk_arm_6: buildMsg('Duplicate Arms License Card', 'ڈپلیکیٹ اسلحہ لائسنس کارڈ', 'KPK — خیبر پختونخواہ', APP_CONFIG.kpk,
    { en: '1. Open Dastak KPK App\n2. Go to "Arms License (Personal)" → "Duplicate Card"\n3. Upload CNIC + FIR (if stolen) or affidavit (if lost)\n4. Pay fee\n5. Visit DC Office for biometric\n6. Collect duplicate card', ur: '1. داسترک کے پی کے ایپ کھولیں\n2. "اسلحہ لائسنس" → "ڈپلیکیٹ کارڈ" پر جائیں\n3. شناختی کارڈ + ایف آئی آر (چوری) یا حلف نامہ (گم) اپلوڈ کریں\n4. فیس ادا کریں\n5. بائیومیٹرک دیں\n6. ڈپلیکیٹ کارڈ لیں' },
    { en: '• CNIC\n• FIR (if stolen) or affidavit (if lost)', ur: '• شناختی کارڈ\n• ایف آئی آر (چوری) یا حلف نامہ (گم)' }
  ),

  kpk_arm_7: buildMsg('Provincial to All Pakistan Arms License', 'صوبائی سے آل پاکستان اسلحہ لائسنس', 'KPK — خیبر پختونخواہ', APP_CONFIG.kpk,
    { en: '1. Open Dastak KPK App\n2. Go to "Arms License (Personal)" → "Provincial to All Pakistan"\n3. Upload CNIC + existing provincial license\n4. Pay upgrade fee\n5. Visit DC Office\n6. Collect All-Pakistan license\n⚠️ Must have valid provincial license first', ur: '1. داسترک کے پی کے ایپ کھولیں\n2. "اسلحہ لائسنس" → "صوبائی سے آل پاکستان" پر جائیں\n3. شناختی کارڈ + موجودہ صوبائی لائسنس اپلوڈ کریں\n4. اپگریڈ فیس ادا کریں\n5. ڈی سی آفس جائیں\n6. آل پاکستان لائسنس لیں' },
    { en: '• CNIC\n• Valid provincial license', ur: '• شناختی کارڈ\n• درست صوبائی لائسنس' }
  ),

  kpk_arm_8: buildMsg('Track Arms License Applications', 'اسلحہ لائسنس درخواستیں ٹریک', 'KPK — خیبر پختونخواہ', APP_CONFIG.kpk,
    { en: '1. Open Dastak KPK App\n2. Go to "Arms License (Personal)" → "All Submitted Applications"\n3. View all your arms license applications and their status\n🟡 Pending | 🔵 Under Review | 🟢 Approved | ✅ Completed', ur: '1. داسترک کے پی کے ایپ کھولیں\n2. "اسلحہ لائسنس" → "تمام جمع درخواستیں" پر جائیں\n3. اپنی تمام اسلحہ درخواستیں اور اسٹیٹس دیکھیں' },
    null, 'Online tracking | آن لائن ٹریکنگ'
  ),

  kpk_arb_1: buildMsg('New Arms Dealership License (Business)', 'نئی اسلحہ ڈیلرشپ لائسنس', 'KPK — Business | خیبر پختونخواہ', APP_CONFIG.kpk,
    { en: '1. Open Dastak KPK App → "Arms & Ammunition (Business)" → "New Dealership License"\n2. Fill application form\n3. Upload CNIC, SECP registration, premises lease, security clearance\n4. Pay fee online\n5. Book appointment at DC Office\n6. DC Office reviews and approves\n⏱ 45–60 working days\n🏢 DC Office — Arms Branch, District HQ', ur: '1. داسترک ایپ → "اسلحہ کاروبار" → "نئی ڈیلرشپ لائسنس"\n2. فارم پُر کریں\n3. شناختی کارڈ، ایس ای سی پی، احاطہ لیز، سیکیورٹی کلیئرنس اپلوڈ کریں\n4. فیس ادا کریں\n5. ڈی سی آفس میں اپوائنٹمنٹ بک کریں' },
    { en: '• CNIC\n• SECP registration\n• Premises lease\n• Security clearance', ur: '• شناختی کارڈ\n• ایس ای سی پی رجسٹریشن\n• احاطہ لیز\n• سیکیورٹی کلیئرنس' }
  ),

  kpk_arb_2: buildMsg('Arms Manufacturing License (Business)', 'اسلحہ مینوفیکچرنگ لائسنس', 'KPK — Business | خیبر پختونخواہ', APP_CONFIG.kpk,
    { en: '1. Open Dastak KPK App → "Arms & Ammunition (Business)" → "Manufacturing License"\n2. Fill application form\n3. Upload CNIC, SECP, premises, security clearance, manufacturing equipment list\n4. Pay fee and book appointment at DC Office\n⏱ 45–60 working days', ur: '1. داسترک ایپ → "اسلحہ کاروبار" → "مینوفیکچرنگ لائسنس"\n2. فارم پُر کریں\n3. شناختی کارڈ، ایس ای سی پی، احاطہ، سیکیورٹی کلیئرنس، آلات فہرست اپلوڈ کریں\n4. فیس ادا کریں' },
    { en: '• CNIC\n• SECP registration\n• Premises docs\n• Security clearance\n• Equipment list', ur: '• شناختی کارڈ\n• ایس ای سی پی\n• احاطہ دستاویزات\n• سیکیورٹی کلیئرنس\n• آلات فہرست' }
  ),

  kpk_arb_3: buildMsg('Arms Repair Shop License', 'اسلحہ مرمت شاپ لائسنس', 'KPK — Business | خیبر پختونخواہ', APP_CONFIG.kpk,
    { en: '1. Open Dastak KPK App → "Arms & Ammunition (Business)" → "Repair Shop License"\n2. Fill form, upload required docs, pay fee\n3. Visit DC Office for approval\n⏱ 45–60 working days', ur: '1. داسترک ایپ → "اسلحہ کاروبار" → "مرمت شاپ لائسنس"\n2. فارم پُر کریں، دستاویزات اپلوڈ کریں، فیس ادا کریں\n3. منظوری کے لیے ڈی سی آفس جائیں' },
    { en: '• CNIC\n• SECP registration\n• Premises lease\n• Security clearance', ur: '• شناختی کارڈ\n• ایس ای سی پی\n• احاطہ لیز\n• سیکیورٹی کلیئرنس' }
  ),

  kpk_arb_4: buildMsg('Arms Business License Renewal', 'اسلحہ کاروبار لائسنس تجدید', 'KPK — Business | خیبر پختونخواہ', APP_CONFIG.kpk,
    { en: '1. Open Dastak KPK App → "Arms & Ammunition (Business)" → "Renewal License"\n2. Upload existing license, CNIC, updated docs\n3. Pay renewal fee\n4. Visit DC Office', ur: '1. داسترک ایپ → "اسلحہ کاروبار" → "تجدید لائسنس"\n2. موجودہ لائسنس، شناختی کارڈ، اپڈیٹ دستاویزات اپلوڈ کریں\n3. تجدید فیس ادا کریں' },
    { en: '• Existing license\n• CNIC\n• Updated business docs', ur: '• موجودہ لائسنس\n• شناختی کارڈ\n• اپڈیٹ کاروباری دستاویزات' }
  ),

  kpk_arb_5: buildMsg('Conversion Old to New Forms', 'پرانے سے نئے فارمز تبدیلی', 'KPK — Business | خیبر پختونخواہ', APP_CONFIG.kpk,
    { en: '1. Open Dastak KPK App → "Arms & Ammunition (Business)" → "Conversion (Old to New Forms)"\n2. Upload existing license and CNIC\n3. Pay conversion fee\n4. Visit DC Office for processing', ur: '1. داسترک ایپ → "اسلحہ کاروبار" → "پرانے سے نئے فارمز تبدیلی"\n2. موجودہ لائسنس اور شناختی کارڈ اپلوڈ کریں\n3. تبدیلی فیس ادا کریں' },
    { en: '• Existing license\n• CNIC', ur: '• موجودہ لائسنس\n• شناختی کارڈ' }
  ),

  kpk_arb_6: buildMsg('Addition of New Arms Forms', 'نئے اسلحہ فارمز اضافہ', 'KPK — Business | خیبر پختونخواہ', APP_CONFIG.kpk,
    { en: '1. Open Dastak KPK App → "Arms & Ammunition (Business)" → "Addition of New Forms"\n2. Specify new forms/weapons to add\n3. Upload CNIC and current license\n4. Pay fee and visit DC Office', ur: '1. داسترک ایپ → "اسلحہ کاروبار" → "نئے فارمز اضافہ"\n2. شامل کیے جانے والے نئے فارمز/ہتھیار بیان کریں\n3. شناختی کارڈ اور موجودہ لائسنس اپلوڈ کریں\n4. فیس ادا کریں' },
    { en: '• CNIC\n• Current license\n• Details of new forms', ur: '• شناختی کارڈ\n• موجودہ لائسنس\n• نئے فارمز کی تفصیل' }
  ),

  kpk_arb_7: buildMsg('Change Business Title', 'کاروباری نام تبدیل', 'KPK — Business | خیبر پختونخواہ', APP_CONFIG.kpk,
    { en: '1. Open Dastak KPK App → "Arms & Ammunition (Business)" → "Change Business Title"\n2. Enter current and new business name\n3. Upload CNIC, current license, SECP name-change docs\n4. Pay fee and submit to DC Office', ur: '1. داسترک ایپ → "اسلحہ کاروبار" → "کاروباری نام تبدیل"\n2. موجودہ اور نیا کاروباری نام درج کریں\n3. شناختی کارڈ، لائسنس، ایس ای سی پی نام تبدیلی دستاویزات اپلوڈ کریں' },
    { en: '• CNIC\n• Current license\n• SECP name-change docs', ur: '• شناختی کارڈ\n• موجودہ لائسنس\n• ایس ای سی پی نام تبدیلی دستاویزات' }
  ),

  kpk_arb_8: buildMsg('Change Business Location', 'کاروباری مقام تبدیل', 'KPK — Business | خیبر پختونخواہ', APP_CONFIG.kpk,
    { en: '1. Open Dastak KPK App → "Arms & Ammunition (Business)" → "Change Business Location"\n2. Enter new premises details\n3. Upload CNIC, current license, new lease/ownership docs\n4. Pay fee — physical inspection of new premises required', ur: '1. داسترک ایپ → "اسلحہ کاروبار" → "کاروباری مقام تبدیل"\n2. نئے احاطے کی تفصیلات درج کریں\n3. شناختی کارڈ، لائسنس، نئی لیز/ملکیت دستاویزات اپلوڈ کریں\n4. فیس ادا کریں — نئے احاطے کا معائنہ ضروری' },
    { en: '• CNIC\n• Current license\n• New premises lease/ownership', ur: '• شناختی کارڈ\n• موجودہ لائسنس\n• نئی لیز/ملکیت' }
  ),

  kpk_arb_9: buildMsg('Add Sales Agent', 'سیلز ایجنٹ شامل کریں', 'KPK — Business | خیبر پختونخواہ', APP_CONFIG.kpk,
    { en: '1. Open Dastak KPK App → "Arms & Ammunition (Business)" → "Add Sales Agent"\n2. Enter agent details (CNIC, name, contact)\n3. Upload agent CNIC + business license\n4. Pay fee and submit to DC Office', ur: '1. داسترک ایپ → "اسلحہ کاروبار" → "سیلز ایجنٹ شامل"\n2. ایجنٹ کی تفصیلات درج کریں\n3. ایجنٹ شناختی کارڈ + کاروباری لائسنس اپلوڈ کریں\n4. فیس ادا کریں' },
    { en: '• CNIC (business owner)\n• Agent CNIC\n• Business license', ur: '• کاروباری مالک کا شناختی کارڈ\n• ایجنٹ کا شناختی کارڈ\n• کاروباری لائسنس' }
  ),

  kpk_arb_10: buildMsg('Business Transfer Ownership', 'کاروبار ملکیت منتقلی', 'KPK — Business | خیبر پختونخواہ', APP_CONFIG.kpk,
    { en: '1. Open Dastak KPK App → "Arms & Ammunition (Business)" → "Business Transfer Ownership"\n2. Enter current and new owner details\n3. Upload both parties\' CNICs, transfer deed, current license\n4. Pay transfer fee and visit DC Office', ur: '1. داسترک ایپ → "اسلحہ کاروبار" → "ملکیت منتقلی"\n2. موجودہ اور نئے مالک کی تفصیلات درج کریں\n3. دونوں کے شناختی کارڈ، منتقلی ڈیڈ، موجودہ لائسنس اپلوڈ کریں\n4. منتقلی فیس ادا کریں' },
    { en: '• Both parties\' CNIC\n• Transfer deed\n• Current license', ur: '• دونوں فریقین کے شناختی کارڈ\n• منتقلی ڈیڈ\n• موجودہ لائسنس' }
  ),

  kpk_pt_1: buildMsg('Pay Property Tax', 'جائیداد ٹیکس ادائیگی', 'KPK — خیبر پختونخواہ', APP_CONFIG.kpk,
    { en: '1. Open Dastak KPK App\n2. Go to "Property Tax" → "Pay Property Tax"\n3. Enter property ID or owner CNIC\n4. View tax assessment\n5. Pay online via EasyPaisa / JazzCash / 1Link / Bank\n6. Download receipt\n🏢 KPK Board of Revenue — Excise & Taxation Dept', ur: '1. داسترک کے پی کے ایپ کھولیں\n2. "جائیداد ٹیکس" → "جائیداد ٹیکس ادائیگی" پر جائیں\n3. پراپرٹی آئی ڈی یا شناختی کارڈ درج کریں\n4. ٹیکس کی رقم دیکھیں\n5. آن لائن ادا کریں\n6. رسید ڈاؤن لوڈ کریں' },
    null, 'Online only | صرف آن لائن'
  ),

  kpk_hs_1: buildMsg('Housing Foundation for Govt Servants', 'ہاؤسنگ فاؤنڈیشن (سرکاری ملازمین)', 'KPK — خیبر پختونخواہ', APP_CONFIG.kpk,
    { en: '1. Open Dastak KPK App\n2. Go to "Housing" → "Housing Foundation for Govt Servants"\n3. View available schemes and check eligibility (min 5 years KPK govt service)\n4. Upload CNIC, service book, appointment letter, pay slip\n5. Pay application fee\n6. Track in app\n🏢 KPK Housing Foundation, Civil Secretariat, Peshawar', ur: '1. داسترک کے پی کے ایپ کھولیں\n2. "ہاؤسنگ" → "ہاؤسنگ فاؤنڈیشن (سرکاری ملازمین)" پر جائیں\n3. دستیاب اسکیمز دیکھیں — اہلیت: 5+ سال کے پی کے سرکاری ملازمت\n4. شناختی کارڈ، سروس بک، تقرری خط اپلوڈ کریں\n5. درخواست فیس ادا کریں' },
    { en: '• CNIC\n• Service book\n• Appointment letter\n• Recent pay slip', ur: '• شناختی کارڈ\n• سروس بک\n• تقرری خط\n• حالیہ تنخواہ سلپ' }
  ),

  kpk_hs_2: buildMsg('KP Housing Authority', 'کے پی ہاؤسنگ اتھارٹی', 'KPK — خیبر پختونخواہ', APP_CONFIG.kpk,
    { en: '1. Open Dastak KPK App\n2. Go to "Housing" → "KP Housing Authority"\n3. Browse available housing projects and plots\n4. Select project and category\n5. Fill application form\n6. Upload CNIC + required docs\n7. Pay initial fee\n8. Await balloting or allotment\n🏢 KPHA, Hayatabad, Peshawar | ☎ +92 91 5891234', ur: '1. داسترک کے پی کے ایپ کھولیں\n2. "ہاؤسنگ" → "کے پی ہاؤسنگ اتھارٹی" پر جائیں\n3. دستیاب ہاؤسنگ منصوبے اور پلاٹ دیکھیں\n4. منصوبہ اور کیٹیگری منتخب کریں\n5. درخواست فارم پُر کریں\n6. شناختی کارڈ اپلوڈ کریں\n7. ابتدائی فیس ادا کریں\n8. بیلٹنگ/الاٹمنٹ کا انتظار کریں' },
    { en: '• CNIC\n• Proof of income (if required)\n• Application fee', ur: '• شناختی کارڈ\n• آمدنی ثبوت (اگر ضروری ہو)\n• درخواست فیس' }
  ),

  kpk_wl_1: buildMsg('Hunting License', 'شکار لائسنس', 'KPK — خیبر پختونخواہ', APP_CONFIG.kpk,
    { en: '1. Open Dastak KPK App\n2. Go to "Wildlife & Hunting" → "Hunting License"\n3. Choose license type (resident/non-resident, bird/big game)\n4. Upload CNIC + arms license (if needed)\n5. Pay fee online\n6. Download hunting license — valid for current season\n⚠️ Fine for hunting without license: up to Rs. 50,000\n🏢 KPK Wildlife Dept, Civil Secretariat, Peshawar', ur: '1. داسترک کے پی کے ایپ کھولیں\n2. "وائلڈ لائف اور شکار" → "شکار لائسنس" پر جائیں\n3. لائسنس کی قسم منتخب کریں\n4. شناختی کارڈ + اسلحہ لائسنس (اگر ضروری ہو) اپلوڈ کریں\n5. آن لائن فیس ادا کریں\n6. شکار لائسنس ڈاؤن لوڈ کریں' },
    { en: '• CNIC\n• Arms license (if required)\n• Fee receipt', ur: '• شناختی کارڈ\n• اسلحہ لائسنس (اگر ضروری ہو)\n• فیس رسید' }
  ),

  kpk_oth_1: buildMsg('Driving License Verification (Other Services)', 'ڈرائیونگ لائسنس تصدیق', 'KPK — خیبر پختونخواہ', APP_CONFIG.kpk,
    { en: '1. Open Dastak KPK App\n2. Go to "Other Services" → "Driving License Verification"\n3. Enter license number\n4. View holder name, expiry, class & status — online only\n(Also available under Transport category)', ur: '1. داسترک کے پی کے ایپ کھولیں\n2. "دیگر خدمات" → "ڈرائیونگ لائسنس تصدیق" پر جائیں\n3. لائسنس نمبر درج کریں\n4. ہولڈر کی تفصیلات دیکھیں' },
    null, 'Online only | صرف آن لائن'
  ),

  kpk_trk_1: `✅ *Track All KPK Applications | تمام کے پی کے درخواستیں ٹریک کریں*\n📍 KPK — خیبر پختونخواہ${DIV}` +
    `${appBlock(APP_CONFIG.kpk)}${DIV}` +
    `📱 *How to Track | کیسے ٹریک کریں:*\n` +
    `1. Open Dastak KPK App | داسترک ایپ کھولیں\n` +
    `2. Go to "My Applications" | "میری درخواستیں" پر جائیں\n` +
    `3. OR go to the specific department → "All Submitted Applications"\n` +
    `   یا متعلقہ ڈیپارٹمنٹ → "تمام جمع درخواستیں"\n\n` +
    `🔵 Status Types | اسٹیٹس کی اقسام:\n` +
    `🟡 Pending | زیر التوا\n` +
    `🔵 Under Review | زیر جائزہ\n` +
    `🟠 Documents Required | دستاویزات درکار\n` +
    `🟢 Approved | منظور\n` +
    `🔴 Rejected | مسترد\n` +
    `✅ Completed | مکمل` +
    TIP_EN + TIP_UR,

  // ═══════════════════════════════════════════════════════════════════════
  // SINDH — Multiple Apps
  // ═══════════════════════════════════════════════════════════════════════
  sindh_1: buildMsg(
    'Vehicle Registration', 'گاڑی رجسٹریشن', 'Sindh | سندھ', SINDH_APPS.excise,
    {
      en: '1. Visit excise.gos.pk or search "Excise Sindh" on Play Store / App Store\n2. Create an account using your CNIC\n3. Select "Vehicle Registration" or "New Registration"\n4. Fill vehicle details and upload documents\n5. Pay registration fee via online banking\n6. Visit your nearest Excise & Taxation Office for physical verification with original documents\n🌐 excise.gos.pk | 🏢 Excise, Taxation & Narcotics Control Dept, Sindh',
      ur: '1. excise.gos.pk پر جائیں یا "Excise Sindh" ڈاؤن لوڈ کریں\n2. شناختی کارڈ سے اکاؤنٹ بنائیں\n3. "گاڑی رجسٹریشن" یا "نئی رجسٹریشن" منتخب کریں\n4. گاڑی کی تفصیلات پُر کریں اور دستاویزات اپلوڈ کریں\n5. آن لائن رجسٹریشن فیس ادا کریں\n6. اصل دستاویزات کے ساتھ قریبی ایکسائز آفس جائیں',
    },
    { en: '• CNIC\n• Vehicle purchase invoice\n• Customs clearance (if imported)\n• Insurance certificate', ur: '• شناختی کارڈ\n• گاڑی خریداری رسید\n• کسٹمز کلیئرنس (اگر درآمد ہو)\n• انشورنس سرٹیفکیٹ' }
  ),

  sindh_2: `✅ *Property Tax | جائیداد ٹیکس*\n📍 Sindh | سندھ${DIV}` +
    `📱 *App 1:* ${SINDH_APPS.excise.nameEn} | ${SINDH_APPS.excise.nameUr}\n` +
    `🌐 Web: ${SINDH_APPS.excise.web} (view tax details)\n\n` +
    `📱 *App 2:* ${SINDH_APPS.epay.nameEn} | ${SINDH_APPS.epay.nameUr}\n` +
    `🌐 Web: ${SINDH_APPS.epay.web} (make payment)\n` +
    `📞 Supports: Mobile banking, credit/debit cards, ATM, bank transfer${DIV}` +
    `📝 *Steps | اقدامات:*\n` +
    `1. Go to excise.gos.pk | excise.gos.pk پر جائیں\n` +
    `2. Enter property ID or CNIC | پراپرٹی آئی ڈی یا شناختی کارڈ درج کریں\n` +
    `3. View property tax assessment | جائیداد ٹیکس کا جائزہ دیکھیں\n` +
    `4. For payment, go to epay.gos.pk | ادائیگی کے لیے epay.gos.pk پر جائیں\n` +
    `5. Select "Property Tax" and complete payment | "جائیداد ٹیکس" منتخب کریں اور ادائیگی کریں\n` +
    `6. Download receipt | رسید ڈاؤن لوڈ کریں\n\n` +
    `📋 *Required | ضروری:* CNIC | شناختی کارڈ — Property ID | پراپرٹی آئی ڈی` +
    TIP_EN + TIP_UR,

  sindh_3: buildMsg(
    'Domicile Certificate', 'ڈومیسائل سرٹیفکیٹ', 'Sindh | سندھ', SINDH_APPS.eservices,
    {
      en: '1. Download "E-Services Sindh" from Play Store or App Store\n2. Register with your CNIC\n3. Select "Domicile / PRC Certificate"\n4. Fill personal details and proof of residence\n5. Upload required documents\n6. Submit application\n7. Track status in app — collect from relevant office when ready\n🌐 eservices.sindh.gov.pk',
      ur: '1. "E-Services Sindh" ڈاؤن لوڈ کریں\n2. شناختی کارڈ سے رجسٹر کریں\n3. "ڈومیسائل / پی آر سی سرٹیفکیٹ" منتخب کریں\n4. ذاتی تفصیلات اور رہائش ثبوت پُر کریں\n5. دستاویزات اپلوڈ کریں\n6. درخواست جمع کریں\n7. ایپ میں اسٹیٹس ٹریک کریں',
    },
    { en: '• CNIC original + copy\n• Utility bill or rent deed\n• Passport photos', ur: '• شناختی کارڈ اصل + کاپی\n• بجلی بل یا رینٹ ڈیڈ\n• پاسپورٹ تصاویر' }
  ),

  sindh_4: buildMsg(
    'Birth Certificate (CRMS Sindh)', 'پیدائش سرٹیفکیٹ', 'Sindh | سندھ', SINDH_APPS.crms,
    {
      en: '1. CRMS Sindh (Civil Registration Management System) was launched in November 2025 in collaboration with NADRA\n2. Currently rolling out across 30 districts and 769 health facilities\n3. Contact your nearest NADRA Registration Centre or District Health Facility\n4. Alternatively, visit your local Union Council for manual birth registration\n🌐 nadra.gov.pk\n⚠️ Full digital service still being deployed across Sindh',
      ur: '1. سی آر ایم ایس سندھ (سول رجسٹریشن مینجمنٹ سسٹم) نومبر 2025 میں نادرا کے ساتھ شروع ہوا\n2. ابھی 30 اضلاع اور 769 صحت سہولیات میں توسیع ہو رہی ہے\n3. قریبی نادرا رجسٹریشن سینٹر یا ضلعی صحت سہولت سے رابطہ کریں\n4. یا یونین کونسل میں دستی پیدائش رجسٹریشن کرائیں',
    },
    { en: '• Hospital discharge slip / birth form\n• Both parents\' CNIC\n• Nikah Nama', ur: '• ہسپتال ڈسچارج سلپ / پیدائش فارم\n• والدین کے شناختی کارڈ\n• نکاح نامہ' },
    'CRMS Sindh launched November 2025 — still rolling out. Contact nearest NADRA office for current availability | ابھی مکمل طور پر نافذ نہیں — نادرا آفس سے رابطہ کریں'
  ),

  sindh_5: buildMsg(
    'Health Services', 'صحت خدمات', 'Sindh | سندھ', SINDH_APPS.eservices,
    {
      en: '1. Download "E-Services Sindh" from Play Store or App Store\n2. Register with CNIC\n3. Select "Health Services"\n4. Choose service type (hospital registration, appointment, health card)\n5. Follow in-app instructions\n6. Visit hospital at scheduled time\n🌐 eservices.sindh.gov.pk',
      ur: '1. "E-Services Sindh" ڈاؤن لوڈ کریں\n2. شناختی کارڈ سے رجسٹر کریں\n3. "صحت خدمات" منتخب کریں\n4. خدمت کی قسم منتخب کریں\n5. ایپ ہدایات پر عمل کریں\n6. مقررہ وقت پر ہسپتال جائیں',
    },
    { en: '• CNIC\n• Health card (if available)', ur: '• شناختی کارڈ\n• ہیلتھ کارڈ (اگر ہو)' }
  ),

  sindh_6: buildMsg(
    'Electricity Bill', 'بجلی بل', 'Sindh | سندھ', SINDH_APPS.eservices,
    {
      en: '1. Download "E-Services Sindh" from Play Store or App Store\n2. Select "Electricity Bill"\n3. Enter your consumer reference number\n4. View bill amount and due date\n5. Pay via app or visit K-Electric / HESCO / SEPCO office\n🌐 K-Electric: ke.com.pk | HESCO: hesco.gov.pk | SEPCO: sepco.gov.pk',
      ur: '1. "E-Services Sindh" ڈاؤن لوڈ کریں\n2. "بجلی بل" منتخب کریں\n3. کنزیومر ریفرنس نمبر درج کریں\n4. بل کی رقم اور آخری تاریخ دیکھیں\n5. ایپ سے ادا کریں یا کے الیکٹرک / ہیسکو / سیپکو آفس جائیں',
    }
  ),

  sindh_7: buildMsg(
    'Water Bill (KWSB)', 'پانی بل (کے ڈبلیو ایس بی)', 'Sindh | سندھ', SINDH_APPS.kwsb,
    {
      en: '1. Visit kwsb.gos.pk or search "KWSB" on Play Store / App Store\n2. Select "Water Bill" or "Online Tanker Service"\n3. Enter KWSB consumer number\n4. View current bill\n5. Pay online or at KWSB office\n6. For water tanker delivery: book via app from nearest hydrant\n🌐 kwsb.gos.pk | 🏢 KWSB Customer Service, Karachi',
      ur: '1. kwsb.gos.pk پر جائیں یا "KWSB" ڈاؤن لوڈ کریں\n2. "پانی بل" یا "آن لائن ٹینکر سروس" منتخب کریں\n3. کے ڈبلیو ایس بی کنزیومر نمبر درج کریں\n4. موجودہ بل دیکھیں\n5. آن لائن یا کے ڈبلیو ایس بی آفس میں ادا کریں\n6. پانی ٹینکر کے لیے قریبی ہائیڈرینٹ سے ایپ کے ذریعے بک کریں',
    }
  ),

  sindh_8: buildMsg(
    'All Government Services (E-Services Sindh)', 'تمام سرکاری خدمات (ای سروسز سندھ)', 'Sindh | سندھ', SINDH_APPS.eservices,
    {
      en: '1. Download "E-Services Sindh" from Play Store or App Store\n2. Register with CNIC\n3. Browse all available service categories:\n   • Domicile / PRC Certificate\n   • Solvency Certificate\n   • Land Records\n   • Industrial NOCs\n   • Health Services\n   • Utility Bills\n4. Select your required service and follow in-app instructions\n🌐 eservices.sindh.gov.pk',
      ur: '1. "E-Services Sindh" ڈاؤن لوڈ کریں\n2. شناختی کارڈ سے رجسٹر کریں\n3. تمام دستیاب خدمت کیٹیگریز دیکھیں:\n   • ڈومیسائل / پی آر سی سرٹیفکیٹ\n   • ملاحظہ سرٹیفکیٹ\n   • زمین ریکارڈ\n   • صنعتی این او سی\n   • صحت خدمات\n   • یوٹیلیٹی بلز\n4. مطلوبہ خدمت منتخب کریں اور ایپ ہدایات پر عمل کریں',
    }
  ),
};

function getServiceDetail(serviceId) {
  return DETAILS[serviceId] || null;
}

module.exports = { getServiceDetail, DETAILS };
