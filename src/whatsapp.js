// ─── Meta WhatsApp Cloud API Sender ──────────────────────────────────────────

const PHONE_ID  = process.env.WHATSAPP_PHONE_NUMBER_ID;
const API_TOKEN = process.env.WHATSAPP_API_TOKEN;
const API_URL   = `https://graph.facebook.com/v19.0/${PHONE_ID}/messages`;

async function sendMessage(to, text) {
  const body = {
    messaging_product: 'whatsapp',
    to,
    type: 'text',
    text: { body: text, preview_url: false },
  };

  const res = await fetch(API_URL, {
    method:  'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error(`❌  WhatsApp API error [${res.status}]:`, err);
  }
}

module.exports = { sendMessage };
