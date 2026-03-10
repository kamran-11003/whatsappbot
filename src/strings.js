// ─── Bilingual message strings ───────────────────────────────────────────────

const strings = {
  en: {
    askCnic:
      `👋 *Welcome to the Governor House Info System!*\n\n` +
      `To get started, please enter your *CNIC number* (13 digits, no dashes).\n\n` +
      `_Example: 4210112345671_`,

    invalidCnic:
      `❌ Invalid CNIC. Please enter exactly *13 digits* with no spaces or dashes.\n\n` +
      `_Example: 4210112345671_`,

    askPhone:
      `✅ CNIC saved.\n\n` +
      `Please enter your *contact number* (11 digits, starting with 03).\n\n` +
      `_Example: 03001234567_`,

    invalidPhone:
      `❌ Invalid number. Please enter an *11-digit* Pakistani mobile number.\n\n` +
      `_Example: 03001234567_`,

    askLocation:
      `✅ Contact number saved.\n\n` +
      `Please enter your *city or area*.\n\n` +
      `_Example: Karachi, Lahore, Peshawar_`,

    registered: (cnic, contact, location) =>
      `✅ *Registration complete!*\n\n` +
      `📋 CNIC: ${cnic}\n` +
      `📞 Contact: ${contact}\n` +
      `📍 Location: ${location}\n\n` +
      `You can now access all government services. 👇`,

    menu:
      `🏛️ *Governor House Info System*\n\n` +
      `Please type the *option number* for your desired service:\n\n` +
      `0️⃣  View Complaint\n` +
      `1️⃣  NADRA\n` +
      `2️⃣  Police\n` +
      `3️⃣  Traffic Police\n` +
      `4️⃣  K Electric\n` +
      `5️⃣  KMC\n` +
      `6️⃣  Sui Gas\n` +
      `7️⃣  Water Board\n` +
      `8️⃣  Pakistan Bait ul Maal\n` +
      `9️⃣  Benazir Income Support\n` +
      `🔟  Zakat & Ushr Department\n` +
      `1️⃣1️⃣  Immigration & Passport\n` +
      `1️⃣2️⃣  Pakistan Customs\n` +
      `1️⃣3️⃣  Language Selection 🌐\n\n` +
      `_Type 0–13 to select._`,

    selectProvince: (dept) =>
      `You selected *${dept}*.\n\n` +
      `Please choose your *province*:\n\n` +
      `1️⃣  Sindh\n2️⃣  Punjab\n3️⃣  Khyber Pakhtunkhwa (KP)\n4️⃣  Federal / ICT\n\n` +
      `_Type 1–4 to select._`,

    detailCard: (d, steps) => {
      let msg =
        `✅ *${d.title}*\n\n` +
        `📝 ${d.description}\n\n` +
        `📞 *Helpline:* ${d.helpline}\n` +
        `🏢 *Address:* ${d.address}\n` +
        `🕐 *Timings:* ${d.timings}\n`;
      if (d.appLink) msg += `📲 *App:* ${d.appLink}\n`;
      if (d.webLink) msg += `🌐 *Web:* ${d.webLink}\n`;
      if (steps && steps.length) {
        msg += `\n📋 *How to use:*\n`;
        steps.forEach((s, i) => { msg += `${i + 1}. ${s}\n`; });
      }
      msg += `\n_Type *menu* to return to the main menu._`;
      return msg;
    },

    noService: (dept, province) =>
      `⚠️ Sorry, *${dept}* is not available in *${province}* yet.\n\nType *menu* to choose another service.`,

    langSelect:
      `🌐 *Select Language / زبان منتخب کریں*\n\n1️⃣  English\n2️⃣  اردو (Urdu)\n\n_Type 1 or 2._`,

    langChanged: `✅ Language set to *English*.\n\nType *menu* to see the main menu.`,

    invalidOption:
      `❌ Invalid option. Please type a number from the menu.\n\nType *menu* to see the options again.`,

    goodbye:
      `Thank you for using the Governor House Info System.\nType *menu* anytime to start again.`,
  },

  ur: {
    askCnic:
      `👋 *گورنر ہاؤس انفارمیشن سسٹم میں خوش آمدید!*\n\n` +
      `شروع کرنے کے لیے اپنا *شناختی کارڈ نمبر* (13 ہندسے، بغیر ڈیش) درج کریں۔\n\n` +
      `_مثال: 4210112345671_`,

    invalidCnic:
      `❌ غلط شناختی کارڈ نمبر۔ براہ کرم بالکل *13 ہندسے* درج کریں۔\n\n` +
      `_مثال: 4210112345671_`,

    askPhone:
      `✅ شناختی کارڈ نمبر محفوظ ہو گیا۔\n\n` +
      `براہ کرم اپنا *موبائل نمبر* (11 ہندسے، 03 سے شروع) درج کریں۔\n\n` +
      `_مثال: 03001234567_`,

    invalidPhone:
      `❌ غلط نمبر۔ براہ کرم *11 ہندسوں* والا موبائل نمبر درج کریں۔\n\n` +
      `_مثال: 03001234567_`,

    askLocation:
      `✅ موبائل نمبر محفوظ ہو گیا۔\n\n` +
      `براہ کرم اپنا *شہر یا علاقہ* درج کریں۔\n\n` +
      `_مثال: کراچی، لاہور، پشاور_`,

    registered: (cnic, contact, location) =>
      `✅ *رجسٹریشن مکمل!*\n\n` +
      `📋 شناختی کارڈ: ${cnic}\n` +
      `📞 موبائل: ${contact}\n` +
      `📍 مقام: ${location}\n\n` +
      `اب آپ تمام سرکاری خدمات تک رسائی حاصل کر سکتے ہیں۔ 👇`,

    menu:
      `🏛️ *گورنر ہاؤس انفارمیشن سسٹم*\n\n` +
      `اپنی مطلوبہ سروس کے لیے *نمبر* ٹائپ کریں:\n\n` +
      `0️⃣  شکایت دیکھیں\n` +
      `1️⃣  نادرا\n` +
      `2️⃣  پولیس\n` +
      `3️⃣  ٹریفک پولیس\n` +
      `4️⃣  کے الیکٹرک\n` +
      `5️⃣  کے ایم سی\n` +
      `6️⃣  سوئی گیس\n` +
      `7️⃣  واٹر بورڈ\n` +
      `8️⃣  پاکستان بیت المال\n` +
      `9️⃣  بے نظیر انکم سپورٹ\n` +
      `🔟  زکوٰۃ و عشر ڈیپارٹمنٹ\n` +
      `1️⃣1️⃣  امیگریشن اینڈ پاسپورٹ\n` +
      `1️⃣2️⃣  پاکستان کسٹمز\n` +
      `1️⃣3️⃣  زبان کا انتخاب 🌐\n\n` +
      `_0 سے 13 تک نمبر ٹائپ کریں۔_`,

    selectProvince: (dept) =>
      `آپ نے *${dept}* منتخب کیا۔\n\n` +
      `اپنا *صوبہ* منتخب کریں:\n\n` +
      `1️⃣  سندھ\n2️⃣  پنجاب\n3️⃣  خیبر پختونخوا\n4️⃣  وفاقی / آئی سی ٹی\n\n` +
      `_1 سے 4 تک نمبر ٹائپ کریں۔_`,

    detailCard: (d, steps) => {
      let msg =
        `✅ *${d.title}*\n\n` +
        `📝 ${d.description}\n\n` +
        `📞 *ہیلپ لائن:* ${d.helpline}\n` +
        `🏢 *پتہ:* ${d.address}\n` +
        `🕐 *اوقات:* ${d.timings}\n`;
      if (d.appLink) msg += `📲 *ایپ:* ${d.appLink}\n`;
      if (d.webLink) msg += `🌐 *ویب سائٹ:* ${d.webLink}\n`;
      if (steps && steps.length) {
        msg += `\n📋 *استعمال کا طریقہ:*\n`;
        steps.forEach((s, i) => { msg += `${i + 1}. ${s}\n`; });
      }
      msg += `\n_مین مینو پر واپس جانے کے لیے *menu* ٹائپ کریں۔_`;
      return msg;
    },

    noService: (dept, province) =>
      `⚠️ معذرت، *${dept}* کی سروس *${province}* میں ابھی دستیاب نہیں۔\n\n*menu* ٹائپ کریں۔`,

    langSelect:
      `🌐 *زبان منتخب کریں / Select Language*\n\n1️⃣  English\n2️⃣  اردو (Urdu)\n\n_1 یا 2 ٹائپ کریں۔_`,

    langChanged: `✅ زبان *اردو* میں تبدیل کر دی گئی۔\n\nمینو دیکھنے کے لیے *menu* ٹائپ کریں۔`,

    invalidOption:
      `❌ غلط آپشن۔ براہ کرم مینو سے نمبر ٹائپ کریں۔\n\n*menu* ٹائپ کریں۔`,

    goodbye:
      `گورنر ہاؤس انفارمیشن سسٹم استعمال کرنے کا شکریہ۔\nدوبارہ شروع کرنے کے لیے *menu* ٹائپ کریں۔`,
  },
};

module.exports = strings;
