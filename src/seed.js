// ─── Service Detail Seed Data ─────────────────────────────────────────────────
// Structure: details[locationKey][serviceIndex] = { en, ur }
// locationKey: 'islamabad' | 'punjab' | 'kpk' | 'sindh'
// serviceIndex: 0–7 matching SERVICES array in services.js
//   0=Vehicle Registration  1=Property Tax       2=Domicile Certificate
//   3=Birth Certificate     4=Health Services    5=Electricity Bill
//   6=Water Bill            7=All Services

const FOOTER_EN = '\n\n💡 *Tip:* Keep your relevant documents ready!';
const FOOTER_UR = '\n\n💡 *ٹِپ:* اپنی متعلقہ دستاویزات تیار رکھیں!';

function buildMsg(emoji, nameEn, nameUr, locEn, locUr, appEn, webEn, appUr, webUr, cenEn, cenUr, stEn, stUr) {
  return {
    en:
      `✅ For your service "*${emoji} ${nameEn}*" in *${locEn}*, please use:\n\n` +
      `📱 *${appEn}*\n\n` +
      `🔹 Download from:\n• Google Play Store\n• Apple App Store\n\n` +
      `📝 *Steps:*\n${stEn}` + FOOTER_EN,
    ur:
      `✅ *${locUr}* میں آپ کی خدمت "*${emoji} ${nameUr}*" کے لیے:\n\n` +
      `📱 *${appUr}*\n\n` +
      `🔹 ڈاؤن لوڈ کریں:\n• گوگل پلے اسٹور\n• ایپل ایپ اسٹور\n\n` +
      `📝 *اقدامات:*\n${stUr}` + FOOTER_UR,
  };
}

function cloneForSindh(entries) {
  return entries.map((entry) => ({
    en: entry.en
      .replaceAll('*Punjab*', '*Sindh*')
      .replaceAll('Punjab Citizen Portal', 'Sindh Citizen Portal')
      .replaceAll('punjab.gov.pk', 'sindh.gov.pk'),
    ur: entry.ur
      .replaceAll('*پنجاب*', '*سندھ*')
      .replaceAll('پنجاب سٹیزن پورٹل', 'سندھ سٹیزن پورٹل')
      .replaceAll('punjab.gov.pk', 'sindh.gov.pk'),
  }));
}

// ─── ISLAMABAD ────────────────────────────────────────────────────────────────
const islamabad = [
  buildMsg('🚗','Vehicle Registration','گاڑی کی رجسٹریشن','Islamabad','اسلام آباد',
    'Pak App (Pakistan Citizen Portal)','portal.pakistan.gov.pk',
    'پاک ایپ (پاکستان سٹیزن پورٹل)','portal.pakistan.gov.pk',
    '• Islamabad Traffic Police Office, G-6\n• Excise & Taxation Office, G-5\n• Model Town Service Center',
    '• اسلام آباد ٹریفک پولیس آفس، جی-6\n• ایکسائز اور ٹیکسیشن آفس، جی-5\n• ماڈل ٹاؤن سروس سینٹر',
    "1. Open Pak App\n2. Go to 'Transport Services'\n3. Select 'Vehicle Registration'\n4. Fill required details\n5. Upload documents (CNIC, Form)\n6. Pay fee online\n7. Visit service center for verification",
    '1. پاک ایپ کھولیں\n2. \'ٹرانسپورٹ سروسز\' پر جائیں\n3. \'گاڑی رجسٹریشن\' منتخب کریں\n4. مطلوبہ تفصیلات پُر کریں\n5. دستاویزات اپلوڈ کریں (شناختی کارڈ، فارم)\n6. آن لائن فیس ادا کریں\n7. تصدیق کے لیے مرکز جائیں'),
  buildMsg('🏠','Property Tax','جائیداد ٹیکس','Islamabad','اسلام آباد',
    'Pak App (Pakistan Citizen Portal)','portal.pakistan.gov.pk',
    'پاک ایپ (پاکستان سٹیزن پورٹل)','portal.pakistan.gov.pk',
    '• CDA Office, G-7/4\n• Facilitation Center, F-6 Markaz\n• ICT Revenue Office, G-11',
    '• سی ڈی اے آفس، جی-7/4\n• فیسلیٹیشن سینٹر، ایف-6 مرکز\n• آئی سی ٹی ریونیو آفس، جی-11',
    "1. Open Pak App\n2. Go to 'Tax Services'\n3. Select 'Property Tax'\n4. Enter property details\n5. View bill\n6. Pay online or visit center",
    '1. پاک ایپ کھولیں\n2. \'ٹیکس سروسز\' پر جائیں\n3. \'جائیداد ٹیکس\' منتخب کریں\n4. جائیداد کی تفصیلات درج کریں\n5. بل دیکھیں\n6. آن لائن ادا کریں یا مرکز جائیں'),
  buildMsg('💳','Domicile Certificate','ڈومیسائل سرٹیفکیٹ','Islamabad','اسلام آباد',
    'Pak App (Pakistan Citizen Portal)','portal.pakistan.gov.pk',
    'پاک ایپ (پاکستان سٹیزن پورٹل)','portal.pakistan.gov.pk',
    '• Deputy Commissioner Office, G-11\n• ICT Administration Office, F-6\n• Sub-Division offices (Islamabad)',
    '• ڈپٹی کمشنر آفس، جی-11\n• آئی سی ٹی انتظامیہ آفس، ایف-6\n• سب ڈویژن آفسز (اسلام آباد)',
    "1. Open Pak App\n2. Select 'Revenue Services'\n3. Choose 'Domicile Certificate'\n4. Fill personal information\n5. Upload CNIC & proof of residence\n6. Submit application\n7. Track status in app",
    '1. پاک ایپ کھولیں\n2. \'ریونیو سروسز\' منتخب کریں\n3. \'ڈومیسائل سرٹیفکیٹ\' چنیں\n4. ذاتی معلومات پُر کریں\n5. شناختی کارڈ اور رہائش ثبوت اپلوڈ کریں\n6. درخواست جمع کریں\n7. ایپ میں اسٹیٹس ٹریک کریں'),
  buildMsg('📄','Birth Certificate','پیدائش سرٹیفکیٹ','Islamabad','اسلام آباد',
    'Pak App (Pakistan Citizen Portal)','portal.pakistan.gov.pk',
    'پاک ایپ (پاکستان سٹیزن پورٹل)','portal.pakistan.gov.pk',
    '• Union Council / Union Administration office\n• NADRA Registration Centre\n• CDA Birth Registration Counter',
    '• یونین کونسل / یونین انتظامیہ آفس\n• نادرا رجسٹریشن سینٹر\n• سی ڈی اے پیدائش رجسٹریشن کاؤنٹر',
    "1. Open Pak App\n2. Go to 'Civil Registration'\n3. Select 'Birth Certificate'\n4. Enter child details & parents CNIC\n5. Upload hospital birth slip\n6. Submit application\n7. Collect from Union Council or download",
    '1. پاک ایپ کھولیں\n2. \'سول رجسٹریشن\' پر جائیں\n3. \'پیدائش سرٹیفکیٹ\' منتخب کریں\n4. بچے کی تفصیلات اور والدین کا شناختی کارڈ درج کریں\n5. ہسپتال کی سلپ اپلوڈ کریں\n6. درخواست جمع کریں\n7. یونین کونسل سے حاصل کریں یا ڈاؤن لوڈ کریں'),
  buildMsg('🏥','Health Services','صحت کی خدمات','Islamabad','اسلام آباد',
    'Pak App (Pakistan Citizen Portal)','portal.pakistan.gov.pk',
    'پاک ایپ (پاکستان سٹیزن پورٹل)','portal.pakistan.gov.pk',
    '• PIMS Hospital, G-8 (Islamabad)\n• Polyclinic Hospital, G-6\n• Capital Hospital, G-6/2',
    '• پمز ہسپتال، جی-8 (اسلام آباد)\n• پولی کلینک ہسپتال، جی-6\n• کیپیٹل ہسپتال، جی-6/2',
    "1. Open Pak App\n2. Select 'Health Services'\n3. Choose hospital / service type\n4. Book appointment online\n5. Enter CNIC & contact details\n6. Confirm appointment\n7. Visit hospital at scheduled time",
    '1. پاک ایپ کھولیں\n2. \'صحت کی خدمات\' منتخب کریں\n3. ہسپتال / خدمت کی قسم چنیں\n4. آن لائن اپوائنٹمنٹ بک کریں\n5. شناختی کارڈ اور رابطہ تفصیلات درج کریں\n6. اپوائنٹمنٹ کنفرم کریں\n7. مقررہ وقت پر ہسپتال جائیں'),
  buildMsg('⚡','Electricity Bill','بجلی بل','Islamabad','اسلام آباد',
    'Pak App (Pakistan Citizen Portal)','iesco.com.pk',
    'پاک ایپ (پاکستان سٹیزن پورٹل)','iesco.com.pk',
    '• IESCO Customer Service Center, G-7\n• IESCO Online Portal (iesco.com.pk)\n• 1-Link / JazzCash payment points',
    '• آئیسکو کسٹمر سروس سینٹر، جی-7\n• آئیسکو آن لائن پورٹل (iesco.com.pk)\n• 1-لنک / جاز کیش پیمنٹ پوائنٹس',
    "1. Open Pak App\n2. Go to 'Utility Services'\n3. Select 'Electricity Bill'\n4. Enter IESCO Reference Number\n5. View bill details\n6. Pay via JazzCash / EasyPaisa / Bank",
    '1. پاک ایپ کھولیں\n2. \'یوٹیلیٹی سروسز\' پر جائیں\n3. \'بجلی بل\' منتخب کریں\n4. آئیسکو ریفرنس نمبر درج کریں\n5. بل کی تفصیلات دیکھیں\n6. جاز کیش / ایزی پیسہ / بینک سے ادا کریں'),
  buildMsg('💧','Water Bill','پانی بل','Islamabad','اسلام آباد',
    'Pak App (Pakistan Citizen Portal)','cda.gov.pk',
    'پاک ایپ (پاکستان سٹیزن پورٹل)','cda.gov.pk',
    '• CDA Water Management, I-9 Depot\n• MCI Water Supply Office\n• Online at cda.gov.pk',
    '• سی ڈی اے واٹر مینجمنٹ، آئی-9 ڈپو\n• ایم سی آئی واٹر سپلائی آفس\n• آن لائن cda.gov.pk پر',
    "1. Open Pak App\n2. Go to 'Utility Services'\n3. Select 'Water Bill'\n4. Enter CDA connection number\n5. View bill\n6. Pay online or at CDA office",
    '1. پاک ایپ کھولیں\n2. \'یوٹیلیٹی سروسز\' پر جائیں\n3. \'پانی بل\' منتخب کریں\n4. سی ڈی اے کنکشن نمبر درج کریں\n5. بل دیکھیں\n6. آن لائن یا سی ڈی اے آفس میں ادا کریں'),
  buildMsg('📋','All Services','تمام خدمات','Islamabad','اسلام آباد',
    'Pak App (Pakistan Citizen Portal)','portal.pakistan.gov.pk',
    'پاک ایپ (پاکستان سٹیزن پورٹل)','portal.pakistan.gov.pk',
    '• Nearest Pak Service Center, Islamabad\n• Federal Secretariat Help Desk, Constitution Ave\n• NITB Help Desk, Shahrah-e-Soharwardi',
    '• قریبی پاک سروس سینٹر، اسلام آباد\n• فیڈرل سیکریٹریٹ ہیلپ ڈیسک، کنسٹیٹیوشن ایو\n• این آئی ٹی بی ہیلپ ڈیسک، شاہراہ سہروردی',
    "1. Open Pak App\n2. Browse service categories\n3. Search for required service\n4. Follow in-app instructions\n5. Submit online or visit center",
    '1. پاک ایپ کھولیں\n2. خدمت کیٹیگریز دیکھیں\n3. مطلوبہ خدمت تلاش کریں\n4. ایپ کی ہدایات پر عمل کریں\n5. آن لائن جمع کریں یا مرکز جائیں'),
];

// ─── PUNJAB ───────────────────────────────────────────────────────────────────
const punjab = [
  buildMsg('🚗','Vehicle Registration','گاڑی کی رجسٹریشن','Punjab','پنجاب',
    'Dastarak App (Punjab Citizen Portal)','punjab.gov.pk',
    'داسترک ایپ (پنجاب سٹیزن پورٹل)','punjab.gov.pk',
    '• Punjab Safe Cities Authority (your city)\n• District Excise Office (your district)\n• Vehicle Registration Centers',
    '• پنجاب سیف سٹیز اتھارٹی (آپ کا شہر)\n• ضلع ایکسائز آفس (آپ کا ضلع)\n• گاڑی رجسٹریشن مراکز',
    "1. Open Dastarak App\n2. Select 'Transport Services'\n3. Choose 'Vehicle Registration'\n4. Enter vehicle details\n5. Upload documents (CNIC, Form)\n6. Pay registration fee\n7. Book appointment\n8. Visit center with original documents",
    '1. داسترک ایپ کھولیں\n2. \'ٹرانسپورٹ سروسز\' منتخب کریں\n3. \'گاڑی رجسٹریشن\' چنیں\n4. گاڑی کی تفصیلات درج کریں\n5. دستاویزات اپلوڈ کریں (شناختی کارڈ، فارم)\n6. رجسٹریشن فیس ادا کریں\n7. اپوائنٹمنٹ بک کریں\n8. اصل دستاویزات کے ساتھ مرکز جائیں'),
  buildMsg('🏠','Property Tax','جائیداد ٹیکس','Punjab','پنجاب',
    'Dastarak App (Punjab Citizen Portal)','punjab.gov.pk',
    'داسترک ایپ (پنجاب سٹیزن پورٹل)','punjab.gov.pk',
    '• Punjab Revenue Authority offices\n• District Municipal Administration offices\n• Tehsil offices (your tehsil)',
    '• پنجاب ریونیو اتھارٹی آفسز\n• ضلعی بلدیاتی انتظامیہ آفسز\n• تحصیل آفسز (آپ کی تحصیل)',
    "1. Open Dastarak App\n2. Go to 'Revenue Services'\n3. Select 'Property Tax'\n4. Enter property details\n5. Generate bill\n6. Pay via JazzCash / EasyPaisa / Bank",
    '1. داسترک ایپ کھولیں\n2. \'ریونیو سروسز\' پر جائیں\n3. \'جائیداد ٹیکس\' منتخب کریں\n4. جائیداد کی تفصیلات درج کریں\n5. بل جنریٹ کریں\n6. جاز کیش / ایزی پیسہ / بینک سے ادا کریں'),
  buildMsg('💳','Domicile Certificate','ڈومیسائل سرٹیفکیٹ','Punjab','پنجاب',
    'Dastarak App (Punjab Citizen Portal)','punjab.gov.pk',
    'داسترک ایپ (پنجاب سٹیزن پورٹل)','punjab.gov.pk',
    '• Deputy Commissioner Office (your district)\n• Assistant Commissioner Office (your tehsil)\n• District Revenue Office',
    '• ڈپٹی کمشنر آفس (آپ کا ضلع)\n• اسسٹنٹ کمشنر آفس (آپ کی تحصیل)\n• ضلعی ریونیو آفس',
    "1. Open Dastarak App\n2. Select 'Revenue Services'\n3. Choose 'Domicile Certificate'\n4. Enter personal information & CNIC\n5. Upload residence proof\n6. Submit application\n7. Collect from DC Office or track online",
    '1. داسترک ایپ کھولیں\n2. \'ریونیو سروسز\' منتخب کریں\n3. \'ڈومیسائل سرٹیفکیٹ\' چنیں\n4. ذاتی معلومات اور شناختی کارڈ درج کریں\n5. رہائش ثبوت اپلوڈ کریں\n6. درخواست جمع کریں\n7. ڈی سی آفس سے حاصل کریں یا آن لائن ٹریک کریں'),
  buildMsg('📄','Birth Certificate','پیدائش سرٹیفکیٹ','Punjab','پنجاب',
    'Dastarak App (Punjab Citizen Portal)','punjab.gov.pk',
    'داسترک ایپ (پنجاب سٹیزن پورٹل)','punjab.gov.pk',
    '• Union Council (your area)\n• NADRA Registration Centre\n• District Health Authority office',
    '• یونین کونسل (آپ کا علاقہ)\n• نادرا رجسٹریشن سینٹر\n• ضلعی صحت اتھارٹی آفس',
    "1. Open Dastarak App\n2. Go to 'Civil Registration'\n3. Select 'Birth Certificate'\n4. Enter child & parent details\n5. Upload hospital birth form (B-Form)\n6. Submit application\n7. Collect from Union Council",
    '1. داسترک ایپ کھولیں\n2. \'سول رجسٹریشن\' پر جائیں\n3. \'پیدائش سرٹیفکیٹ\' منتخب کریں\n4. بچے اور والدین کی تفصیلات درج کریں\n5. ہسپتال کا بی-فارم اپلوڈ کریں\n6. درخواست جمع کریں\n7. یونین کونسل سے حاصل کریں'),
  buildMsg('🏥','Health Services','صحت کی خدمات','Punjab','پنجاب',
    'Dastarak App (Punjab Citizen Portal)','punjab.gov.pk',
    'داسترک ایپ (پنجاب سٹیزن پورٹل)','punjab.gov.pk',
    '• Lahore General Hospital (Lahore)\n• District Headquarters Hospital (your district)\n• Punjab Health Authority Clinics',
    '• لاہور جنرل ہسپتال (لاہور)\n• ضلع ہیڈکوارٹر ہسپتال (آپ کا ضلع)\n• پنجاب ہیلتھ اتھارٹی کلینکس',
    "1. Open Dastarak App\n2. Select 'Health Services'\n3. Choose service / hospital\n4. Book appointment online\n5. Enter CNIC & contact info\n6. Confirm and receive SMS confirmation\n7. Visit hospital at scheduled time",
    '1. داسترک ایپ کھولیں\n2. \'صحت کی خدمات\' منتخب کریں\n3. خدمت / ہسپتال چنیں\n4. آن لائن اپوائنٹمنٹ بک کریں\n5. شناختی کارڈ اور رابطہ معلومات درج کریں\n6. کنفرم کریں اور SMS تصدیق حاصل کریں\n7. مقررہ وقت پر ہسپتال جائیں'),
  buildMsg('⚡','Electricity Bill','بجلی بل','Punjab','پنجاب',
    'Dastarak App (Punjab Citizen Portal)','punjab.gov.pk',
    'داسترک ایپ (پنجاب سٹیزن پورٹل)','punjab.gov.pk',
    '• LESCO Customer Center (Lahore)\n• MEPCO, GEPCO, FESCO offices (your area)\n• 1-Link / JazzCash agents',
    '• لیسکو کسٹمر سینٹر (لاہور)\n• میپکو، جیپکو، فیسکو آفسز (آپ کا علاقہ)\n• 1-لنک / جاز کیش ایجنٹس',
    "1. Open Dastarak App\n2. Go to 'Utility Services'\n3. Select 'Electricity Bill'\n4. Enter DISCO Reference Number\n5. View bill\n6. Pay via JazzCash / EasyPaisa / Bank",
    '1. داسترک ایپ کھولیں\n2. \'یوٹیلیٹی سروسز\' پر جائیں\n3. \'بجلی بل\' منتخب کریں\n4. ڈسکو ریفرنس نمبر درج کریں\n5. بل دیکھیں\n6. جاز کیش / ایزی پیسہ / بینک سے ادا کریں'),
  buildMsg('💧','Water Bill','پانی بل','Punjab','پنجاب',
    'Dastarak App (Punjab Citizen Portal)','punjab.gov.pk',
    'داسترک ایپ (پنجاب سٹیزن پورٹل)','punjab.gov.pk',
    '• WASA Customer Service (Lahore / your city)\n• Punjab Municipal Services offices\n• Online at punjab.gov.pk',
    '• واسہ کسٹمر سروس (لاہور / آپ کا شہر)\n• پنجاب میونسپل سروسز آفسز\n• آن لائن punjab.gov.pk پر',
    "1. Open Dastarak App\n2. Select 'Utility Services'\n3. Choose 'Water Bill'\n4. Enter WASA consumer number\n5. View current bill\n6. Pay online or at WASA office",
    '1. داسترک ایپ کھولیں\n2. \'یوٹیلیٹی سروسز\' منتخب کریں\n3. \'پانی بل\' چنیں\n4. واسہ کنزیومر نمبر درج کریں\n5. موجودہ بل دیکھیں\n6. آن لائن یا واسہ آفس میں ادا کریں'),
  buildMsg('📋','All Services','تمام خدمات','Punjab','پنجاب',
    'Dastarak App (Punjab Citizen Portal)','punjab.gov.pk',
    'داسترک ایپ (پنجاب سٹیزن پورٹل)','punjab.gov.pk',
    '• Nearest Dastarak Service Center (your district)\n• Punjab Facilitation Center (Lahore)\n• District Administration Complex',
    '• قریبی داسترک سروس سینٹر (آپ کا ضلع)\n• پنجاب فیسلیٹیشن سینٹر (لاہور)\n• ضلعی انتظامیہ کمپلیکس',
    "1. Open Dastarak App\n2. Browse service categories\n3. Select your required service\n4. Follow instructions\n5. Submit application online\n6. Track status in the app",
    '1. داسترک ایپ کھولیں\n2. خدمت کیٹیگریز دیکھیں\n3. مطلوبہ خدمت منتخب کریں\n4. ہدایات پر عمل کریں\n5. آن لائن درخواست جمع کریں\n6. ایپ میں اسٹیٹس ٹریک کریں'),
];

// ─── KPK ──────────────────────────────────────────────────────────────────────
const kpk = [
  buildMsg('🚗','Vehicle Registration','گاڑی کی رجسٹریشن','KPK','خیبر پختونخواہ',
    'Dastarak App (KPK Citizen Portal)','kp.gov.pk',
    'داسترک ایپ (کے پی کے سٹیزن پورٹل)','kp.gov.pk',
    '• KPK Excise & Taxation Office (your district)\n• District Motor Vehicle Registration office\n• Traffic Police Headquarters, Peshawar',
    '• کے پی کے ایکسائز اور ٹیکسیشن آفس (آپ کا ضلع)\n• ضلعی موٹر وہیکل رجسٹریشن آفس\n• ٹریفک پولیس ہیڈکوارٹر، پشاور',
    "1. Open Dastarak App\n2. Navigate to 'Vehicle Services'\n3. Select 'Registration'\n4. Fill vehicle information\n5. Upload required documents\n6. Pay registration charges\n7. Visit office for physical verification",
    '1. داسترک ایپ کھولیں\n2. \'وہیکل سروسز\' پر جائیں\n3. \'رجسٹریشن\' منتخب کریں\n4. گاڑی کی معلومات پُر کریں\n5. مطلوبہ دستاویزات اپلوڈ کریں\n6. رجسٹریشن چارجز ادا کریں\n7. جسمانی تصدیق کے لیے آفس جائیں'),
  buildMsg('🏠','Property Tax','جائیداد ٹیکس','KPK','خیبر پختونخواہ',
    'Dastarak App (KPK Citizen Portal)','kp.gov.pk',
    'داسترک ایپ (کے پی کے سٹیزن پورٹل)','kp.gov.pk',
    '• KPK Revenue Authority (KPRA) offices\n• Tehsil Municipal Administration offices\n• District Administration offices',
    '• کے پی کے ریونیو اتھارٹی (کے پی آر اے) آفسز\n• تحصیل میونسپل انتظامیہ آفسز\n• ضلعی انتظامیہ آفسز',
    "1. Open Dastarak App\n2. Access 'Tax Services'\n3. Select 'Property Tax'\n4. Input property information\n5. Calculate tax amount\n6. Make payment online",
    '1. داسترک ایپ کھولیں\n2. \'ٹیکس سروسز\' تک رسائی حاصل کریں\n3. \'جائیداد ٹیکس\' منتخب کریں\n4. جائیداد کی معلومات درج کریں\n5. ٹیکس کی رقم حساب کریں\n6. آن لائن ادائیگی کریں'),
  buildMsg('💳','Domicile Certificate','ڈومیسائل سرٹیفکیٹ','KPK','خیبر پختونخواہ',
    'Dastarak App (KPK Citizen Portal)','kp.gov.pk',
    'داسترک ایپ (کے پی کے سٹیزن پورٹل)','kp.gov.pk',
    '• Deputy Commissioner Office (your district)\n• Assistant Commissioner (your sub-division)\n• KPK Revenue Department',
    '• ڈپٹی کمشنر آفس (آپ کا ضلع)\n• اسسٹنٹ کمشنر (آپ کا سب ڈویژن)\n• کے پی کے ریونیو ڈیپارٹمنٹ',
    "1. Open Dastarak App\n2. Select 'Revenue Services'\n3. Choose 'Domicile Certificate'\n4. Enter personal details & CNIC\n5. Upload supporting documents\n6. Submit application\n7. Track in app; collect from DC Office",
    '1. داسترک ایپ کھولیں\n2. \'ریونیو سروسز\' منتخب کریں\n3. \'ڈومیسائل سرٹیفکیٹ\' چنیں\n4. ذاتی تفصیلات اور شناختی کارڈ درج کریں\n5. معاون دستاویزات اپلوڈ کریں\n6. درخواست جمع کریں\n7. ایپ میں ٹریک کریں؛ ڈی سی آفس سے حاصل کریں'),
  buildMsg('📄','Birth Certificate','پیدائش سرٹیفکیٹ','KPK','خیبر پختونخواہ',
    'Dastarak App (KPK Citizen Portal)','kp.gov.pk',
    'داسترک ایپ (کے پی کے سٹیزن پورٹل)','kp.gov.pk',
    '• Union Council (your area)\n• NADRA Registration Centre (Peshawar / district)\n• KPK Local Government offices',
    '• یونین کونسل (آپ کا علاقہ)\n• نادرا رجسٹریشن سینٹر (پشاور / ضلع)\n• کے پی کے لوکل گورنمنٹ آفسز',
    "1. Open Dastarak App\n2. Go to 'Civil Registration'\n3. Select 'Birth Certificate'\n4. Enter child & parent details\n5. Upload hospital birth slip / B-Form\n6. Submit application\n7. Collect from Union Council or download",
    '1. داسترک ایپ کھولیں\n2. \'سول رجسٹریشن\' پر جائیں\n3. \'پیدائش سرٹیفکیٹ\' منتخب کریں\n4. بچے اور والدین کی تفصیلات درج کریں\n5. ہسپتال کی سلپ / بی-فارم اپلوڈ کریں\n6. درخواست جمع کریں\n7. یونین کونسل سے حاصل کریں یا ڈاؤن لوڈ کریں'),
  buildMsg('🏥','Health Services','صحت کی خدمات','KPK','خیبر پختونخواہ',
    'Dastarak App (KPK Citizen Portal)','kp.gov.pk',
    'داسترک ایپ (کے پی کے سٹیزن پورٹل)','kp.gov.pk',
    '• Khyber Teaching Hospital, Peshawar\n• District Headquarters Hospital (your district)\n• KPK Health Department Clinics',
    '• خیبر ٹیچنگ ہسپتال، پشاور\n• ضلع ہیڈکوارٹر ہسپتال (آپ کا ضلع)\n• کے پی کے محکمہ صحت کلینکس',
    "1. Open Dastarak App\n2. Select 'Health Services'\n3. Choose hospital / type of service\n4. Book appointment\n5. Enter CNIC & contact information\n6. Receive SMS confirmation\n7. Visit at scheduled time",
    '1. داسترک ایپ کھولیں\n2. \'صحت کی خدمات\' منتخب کریں\n3. ہسپتال / خدمت کی قسم چنیں\n4. اپوائنٹمنٹ بک کریں\n5. شناختی کارڈ اور رابطہ معلومات درج کریں\n6. SMS تصدیق حاصل کریں\n7. مقررہ وقت پر جائیں'),
  buildMsg('⚡','Electricity Bill','بجلی بل','KPK','خیبر پختونخواہ',
    'Dastarak App (KPK Citizen Portal)','kp.gov.pk',
    'داسترک ایپ (کے پی کے سٹیزن پورٹل)','kp.gov.pk',
    '• PESCO Customer Service Center (Peshawar)\n• PESCO District offices (your area)\n• EasyPaisa / JazzCash agents',
    '• پیسکو کسٹمر سروس سینٹر (پشاور)\n• پیسکو ضلعی آفسز (آپ کا علاقہ)\n• ایزی پیسہ / جاز کیش ایجنٹس',
    "1. Open Dastarak App\n2. Go to 'Utility Services'\n3. Select 'Electricity Bill'\n4. Enter PESCO Reference Number\n5. View bill amount\n6. Pay via EasyPaisa / JazzCash / Bank",
    '1. داسترک ایپ کھولیں\n2. \'یوٹیلیٹی سروسز\' پر جائیں\n3. \'بجلی بل\' منتخب کریں\n4. پیسکو ریفرنس نمبر درج کریں\n5. بل کی رقم دیکھیں\n6. ایزی پیسہ / جاز کیش / بینک سے ادا کریں'),
  buildMsg('💧','Water Bill','پانی بل','KPK','خیبر پختونخواہ',
    'Dastarak App (KPK Citizen Portal)','kp.gov.pk',
    'داسترک ایپ (کے پی کے سٹیزن پورٹل)','kp.gov.pk',
    '• WSSP Customer Service Center (Peshawar)\n• Tehsil Municipal Administration offices\n• Online at kp.gov.pk',
    '• ڈبلیو ایس ایس پی کسٹمر سروس سینٹر (پشاور)\n• تحصیل میونسپل انتظامیہ آفسز\n• آن لائن kp.gov.pk پر',
    "1. Open Dastarak App\n2. Select 'Utility Services'\n3. Choose 'Water Bill'\n4. Enter WSSP consumer number\n5. View current bill\n6. Pay online or at WSSP office",
    '1. داسترک ایپ کھولیں\n2. \'یوٹیلیٹی سروسز\' منتخب کریں\n3. \'پانی بل\' چنیں\n4. ڈبلیو ایس ایس پی کنزیومر نمبر درج کریں\n5. موجودہ بل دیکھیں\n6. آن لائن یا ڈبلیو ایس ایس پی آفس میں ادا کریں'),
  buildMsg('📋','All Services','تمام خدمات','KPK','خیبر پختونخواہ',
    'Dastarak App (KPK Citizen Portal)','kp.gov.pk',
    'داسترک ایپ (کے پی کے سٹیزن پورٹل)','kp.gov.pk',
    '• Nearest Dastarak Service Center (KPK)\n• KPK IT Board, Peshawar\n• District Administration Complex',
    '• قریبی داسترک سروس سینٹر (کے پی کے)\n• کے پی کے آئی ٹی بورڈ، پشاور\n• ضلعی انتظامیہ کمپلیکس',
    "1. Open Dastarak App\n2. Search for service\n3. Complete online form\n4. Track application status\n5. Visit center if physical presence required",
    '1. داسترک ایپ کھولیں\n2. خدمت تلاش کریں\n3. آن لائن فارم مکمل کریں\n4. درخواست کی اسٹیٹس ٹریک کریں\n5. جسمانی حاضری ضروری ہو تو مرکز جائیں'),
];

  const sindh = cloneForSindh(punjab);

  const detailsMap = { islamabad, punjab, kpk, sindh };

/**
 * Returns the guidance string for a given location + service.
 * @param {string} locationKey  - 'islamabad' | 'punjab' | 'kpk'
 * @param {number} serviceIndex - 0–7
 * @param {string} lang         - 'en' | 'ur'
 */
function getServiceDetail(locationKey, serviceIndex, lang = 'en') {
  const loc = detailsMap[locationKey];
  if (!loc) return null;
  const entry = loc[serviceIndex];
  if (!entry) return null;
  return entry[lang] || entry.en;
}

// Legacy alias (was getDeptDetails)
function getDeptDetails(deptIndex, lang = 'en') {
  return getServiceDetail('islamabad', deptIndex, lang);
}

module.exports = { getServiceDetail, getDeptDetails };
