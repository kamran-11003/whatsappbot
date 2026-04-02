// ─── Message strings ──────────────────────────────────────────────────────────

const strings = {
  // ── Greeting (bilingual — shown before language is selected) ─────────────
  askLang:
    `السلام علیکم! Welcome to *NITB Citizen Services Guide*\n\n` +
    `I will help you find the right government app and service center for your needs.\n\n` +
    `خوش آمدید! میں آپ کو درست سرکاری ایپ اور سروس سینٹر تلاش کرنے میں مدد کروں گا۔\n\n` +
    `Please select your language / براہ کرم زبان منتخب کریں:`,

  // ── English strings ───────────────────────────────────────────────────────
  en: {
    locationListBody:
      `*Select Your Province / Location*\n\n` +
      `Please choose the region where you need services:`,

    askService:
      `Location selected.\n\nPlease choose a service category:`,

    askCategory:
      `*Select a Service Category*\n\nPlease choose a category to see available services:`,

    askServiceType:
      `*Dastak Punjab — Select Service Type*\n\n` +
      `Dastak Punjab offers two types of services. Which do you need?\n\n` +
      `- *Citizen Services* — Personal certificates, vehicle, property, police\n` +
      `- *Business Services* — EPA, Livestock, Food Authority, Energy & more`,

    askServiceItem:
      `*Select a Service*\n\nPlease choose the service you need from the list below:`,

    noService:
      `Sorry, details for this service are not available yet.\n\nPlease choose another service.`,

    nextAction:
      `What would you like to do next?`,

    langSelect:
      `*Select Language*\n\nPlease choose your preferred language:`,

    langChanged:
      `Language set to *English*.\n\nPlease select your province to continue.`,

    invalidOption:
      `Invalid option. Please select from the options provided.`,

    settingsMenu:
      `*Settings*\n\nWhat would you like to do?`,

    goodbye:
      `Thank you for using *NITB Citizen Services Guide*.\n\n` +
      `We hope we were able to help you.\n\n` +
      `To start again, please select your language:`,

    anotherService:
      `Returning to service categories. Please choose a category:`,

    backToCategory:
      `Returning to service list. Please choose a service:`,

    changeLocation:
      `Please select your province again:`,

    sessionTimeout:
      `Your session has been reset due to inactivity.\n\nPlease select your language to start again:`,

    sindhMultiApp:
      `Note: Sindh government services are available across multiple apps. ` +
      `The bot will guide you to the correct app for your selected service.`,

    locationConfirmed: (province, appName) =>
      `*${province}* selected.\nYou will use: *${appName}*\n\nPlease choose a service category:`,

    punjabLocationConfirmed:
      `*Punjab* selected.\nYou will use: *Dastak Punjab App*\n\nPlease choose the type of services you need:`,
  },

  // ── Urdu strings ──────────────────────────────────────────────────────────
  ur: {
    locationListBody:
      `*اپنا صوبہ / مقام منتخب کریں*\n\n` +
      `براہ کرم وہ علاقہ منتخب کریں جہاں آپ کو خدمات درکار ہیں:`,

    askService:
      `مقام منتخب ہو گیا۔\n\nبراہ کرم خدمت کیٹیگری منتخب کریں:`,

    askCategory:
      `*خدمت کیٹیگری منتخب کریں*\n\nبراہ کرم دستیاب خدمات دیکھنے کے لیے کیٹیگری منتخب کریں:`,

    askServiceType:
      `*داسترک پنجاب — خدمت کی قسم منتخب کریں*\n\n` +
      `داسترک پنجاب دو قسم کی خدمات فراہم کرتا ہے۔ آپ کو کون سی چاہیے؟\n\n` +
      `- *شہری خدمات* — ذاتی سرٹیفکیٹ، گاڑی، جائیداد، پولیس\n` +
      `- *کاروباری خدمات* — ای پی اے، لائیو اسٹاک، فوڈ اتھارٹی، توانائی وغیرہ`,

    askServiceItem:
      `*خدمت منتخب کریں*\n\nبراہ کرم نیچے فہرست سے مطلوبہ خدمت چنیں:`,

    noService:
      `معذرت، اس خدمت کی تفصیل ابھی دستیاب نہیں۔\n\nکوئی اور خدمت منتخب کریں۔`,

    nextAction:
      `آگے کیا کرنا چاہتے ہیں؟`,

    langSelect:
      `*زبان منتخب کریں*\n\nبراہ کرم اپنی پسندیدہ زبان منتخب کریں:`,

    langChanged:
      `زبان *اردو* میں تبدیل کر دی گئی۔\n\nجاری رکھنے کے لیے اپنا صوبہ منتخب کریں۔`,

    invalidOption:
      `غلط آپشن۔ براہ کرم دیے گئے آپشنز میں سے منتخب کریں۔`,

    settingsMenu:
      `*ترتیبات*\n\nکیا کرنا چاہتے ہیں؟`,

    goodbye:
      `*NITB سٹیزن سروسز گائیڈ* استعمال کرنے کا شکریہ۔\n\n` +
      `ہمیں امید ہے کہ ہم آپ کی مدد کر سکے۔\n\n` +
      `دوبارہ شروع کرنے کے لیے براہ کرم زبان منتخب کریں:`,

    anotherService:
      `خدمت کیٹیگریز پر واپس جا رہے ہیں۔ کیٹیگری منتخب کریں:`,

    backToCategory:
      `خدمت فہرست پر واپس۔ خدمت منتخب کریں:`,

    changeLocation:
      `براہ کرم اپنا صوبہ دوبارہ منتخب کریں:`,

    sessionTimeout:
      `غیرفعالیت کی وجہ سے آپ کا سیشن دوبارہ شروع ہو گیا ہے۔\n\nزبان منتخب کریں:`,

    sindhMultiApp:
      `نوٹ: سندھ کی سرکاری خدمات متعدد ایپس پر دستیاب ہیں۔ ` +
      `بوٹ آپ کو منتخب خدمت کے لیے درست ایپ تک رہنمائی کرے گا۔`,

    locationConfirmed: (province, appName) =>
      `*${province}* منتخب ہو گیا۔\nآپ استعمال کریں گے: *${appName}*\n\nبراہ کرم خدمت کیٹیگری منتخب کریں:`,

    punjabLocationConfirmed:
      `*پنجاب* منتخب ہو گیا۔\nآپ استعمال کریں گے: *داسترک پنجاب ایپ*\n\nبراہ کرم خدمت کی قسم منتخب کریں:`,
  },
};

module.exports = strings;
