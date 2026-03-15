// ─── Bilingual message strings ───────────────────────────────────────────────

const strings = {
  askLang:
    `السلام علیکم! Welcome to NITB Citizen Services Guide 🇵🇰\n\n` +
    `I will help you find the right government app and service center for your needs.\n\n` +
    `Please select your language / براہ کرم زبان منتخب کریں:`,

  en: {
    askLocation:
      `📍 *Select Your Location*\n\n` +
      `Please choose the region where you need services:`,

    locationListBody:
      `📍 *Select Your Location*\n\n` +
      `Please choose one of the following locations:`,

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
      `📍 Please select your location again:`,

    locationSaved: (loc) =>
      `✅ Location updated to *${loc}*.\n\nPlease choose the service you need.`,

    goodbye:
      `Thank you for using *NITB Citizen Services Guide!* 🙏🇵🇰\n\n` +
      `We hope we were able to help you.\n\n` +
      `To start again, please select your language:`,

    anotherService: `Returning to service selection. Please choose a service:`,

    changeLocation: `📍 Please select your location again:`,
  },

  ur: {
    askLocation:
      `📍 *اپنا مقام منتخب کریں*\n\n` +
      `براہ کرم وہ علاقہ منتخب کریں جہاں آپ کو خدمات درکار ہیں:`,

    locationListBody:
      `📍 *اپنا مقام منتخب کریں*\n\n` +
      `براہ کرم درج ذیل مقامات میں سے ایک منتخب کریں:`,

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
      `📍 براہ کرم اپنا مقام دوبارہ منتخب کریں:`,

    locationSaved: (loc) =>
      `✅ مقام *${loc}* اپڈیٹ ہو گیا۔\n\nبراہ کرم مطلوبہ خدمت منتخب کریں۔`,

    goodbye:
      `*NITB سٹیزن سروسز گائیڈ* استعمال کرنے کا شکریہ! 🙏🇵🇰\n\n` +
      `ہمیں امید ہے کہ ہم آپ کی مدد کر سکے۔\n\n` +
      `دوبارہ شروع کرنے کے لیے براہ کرم زبان منتخب کریں:`,

    anotherService: `خدمت منتخب کریں:`,

    changeLocation: `📍 براہ کرم اپنا مقام دوبارہ منتخب کریں:`,
  },
};

module.exports = strings;
