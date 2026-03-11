// ─── Bilingual message strings ───────────────────────────────────────────────

const strings = {
  askLang:
    `السلام علیکم! Welcome to NITB Citizen Services Guide 🇵🇰\n\n` +
    `I will help you find the right government app and service center for your needs.\n\n` +
    `Please select your language / براہ کرم زبان منتخب کریں:`,

  en: {
    askCnic:
      `👋 *Welcome to NITB Citizen Services Guide!*\n\n` +
      `Please enter your *CNIC number* to get started.\n\n` +
      `_Example: 4210112345671 (13 digits, no dashes)_`,

    invalidCnic:
      `❌ Invalid CNIC. Please enter exactly *13 digits* with no spaces or dashes.\n\n` +
      `_Example: 4210112345671_`,

    askPhone:
      `✅ CNIC verified!\n\n` +
      `Now please enter your *mobile number*:\n\n` +
      `_Example: 03001234567_`,

    invalidPhone:
      `❌ Invalid number. Please enter an *11-digit* Pakistani mobile number starting with 03.\n\n` +
      `_Example: 03001234567_`,

    registered: (cnic, contact) =>
      `✅ *Registration complete!*\n\n` +
      `📋 CNIC: ${cnic}\n` +
      `📞 Contact: ${contact}\n\n` +
      `Please select your location to continue. 👇`,

    askLocation:
      `📍 *Select Your Location*\n\n` +
      `Please choose the region where you need services:`,

    askService:
      `✅ Location selected!\n\n` +
      `Please choose the service you need 👇`,

    noService:
      `⚠️ Sorry, this service detail is not available yet.\n\nPlease choose another service.`,

    nextAction:
      `What would you like to do next?`,

    langSelect:
      `🌐 *Select Language / زبان منتخب کریں*\n\n` +
      `Please choose your preferred language:`,

    langChanged: `✅ Language set to *English*.\n\nPlease select your location to continue.`,

    invalidOption:
      `❌ Invalid option. Please select from the options provided.`,

    settingsMenu: `⚙️ *Settings*\n\nWhat would you like to do?`,

    askLocationUpdate:
      `📍 Please enter your *city or area*:\n\n_Example: Islamabad, Lahore, Peshawar_`,

    locationSaved: (loc) =>
      `✅ Location noted as *${loc}*.\n\nPlease select your service location to continue.`,

    goodbye:
      `Thank you for using *NITB Citizen Services Guide!* 🙏🇵🇰\n\n` +
      `We hope we were able to help you.\n\n` +
      `To start a new inquiry, please enter your *CNIC number*:`,

    anotherService: `Returning to service selection. Please choose a service:`,

    changeLocation: `📍 Please select your location again:`,
  },

  ur: {
    askCnic:
      `👋 *NITB سٹیزن سروسز گائیڈ میں خوش آمدید!*\n\n` +
      `شروع کرنے کے لیے براہ کرم اپنا *شناختی کارڈ نمبر* درج کریں۔\n\n` +
      `_مثال: 4210112345671 (13 ہندسے، بغیر ڈیش)_`,

    invalidCnic:
      `❌ غلط شناختی کارڈ نمبر۔ براہ کرم بالکل *13 ہندسے* درج کریں۔\n\n` +
      `_مثال: 4210112345671_`,

    askPhone:
      `✅ شناختی کارڈ تصدیق ہو گیا!\n\n` +
      `اب براہ کرم اپنا *موبائل نمبر* درج کریں:\n\n` +
      `_مثال: 03001234567_`,

    invalidPhone:
      `❌ غلط نمبر۔ براہ کرم 03 سے شروع ہونے والا *11 ہندسوں* کا موبائل نمبر درج کریں۔\n\n` +
      `_مثال: 03001234567_`,

    registered: (cnic, contact) =>
      `✅ *رجسٹریشن مکمل!*\n\n` +
      `📋 شناختی کارڈ: ${cnic}\n` +
      `📞 موبائل: ${contact}\n\n` +
      `جاری رکھنے کے لیے براہ کرم اپنا مقام منتخب کریں۔ 👇`,

    askLocation:
      `📍 *اپنا مقام منتخب کریں*\n\n` +
      `براہ کرم وہ علاقہ منتخب کریں جہاں آپ کو خدمات درکار ہیں:`,

    askService:
      `✅ مقام منتخب ہو گیا!\n\n` +
      `براہ کرم مطلوبہ خدمت منتخب کریں 👇`,

    noService:
      `⚠️ معذرت، اس خدمت کی تفصیل ابھی دستیاب نہیں۔\n\nکوئی اور خدمت منتخب کریں۔`,

    nextAction:
      `آگے کیا کرنا چاہتے ہیں؟`,

    langSelect:
      `🌐 *زبان منتخب کریں / Select Language*\n\n` +
      `براہ کرم اپنی پسندیدہ زبان منتخب کریں:`,

    langChanged: `✅ زبان *اردو* میں تبدیل کر دی گئی۔\n\nجاری رکھنے کے لیے اپنا مقام منتخب کریں۔`,

    invalidOption:
      `❌ غلط آپشن۔ براہ کرم دیے گئے آپشنز میں سے منتخب کریں۔`,

    settingsMenu: `⚙️ *ترتیبات*\n\nکیا کرنا چاہتے ہیں؟`,

    askLocationUpdate:
      `📍 اپنا *شہر یا علاقہ* درج کریں:\n\n_مثال: اسلام آباد، لاہور، پشاور_`,

    locationSaved: (loc) =>
      `✅ مقام *${loc}* نوٹ ہو گیا۔\n\nجاری رکھنے کے لیے اپنا سروس مقام منتخب کریں۔`,

    goodbye:
      `*NITB سٹیزن سروسز گائیڈ* استعمال کرنے کا شکریہ! 🙏🇵🇰\n\n` +
      `ہمیں امید ہے کہ ہم آپ کی مدد کر سکے۔\n\n` +
      `نئی درخواست کے لیے اپنا *شناختی کارڈ نمبر* درج کریں:`,

    anotherService: `خدمت منتخب کریں:`,

    changeLocation: `📍 براہ کرم اپنا مقام دوبارہ منتخب کریں:`,
  },
};

module.exports = strings;
