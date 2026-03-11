// ─── Meta WhatsApp Cloud API Sender ──────────────────────────────────────────

const PHONE_ID  = process.env.WHATSAPP_PHONE_NUMBER_ID;
const API_TOKEN = process.env.WHATSAPP_API_TOKEN;
const API_URL   = `https://graph.facebook.com/v19.0/${PHONE_ID}/messages`;

async function _post(payload) {
  const res = await fetch(API_URL, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${API_TOKEN}` },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.text();
    console.error(`❌  WhatsApp API error [${res.status}]:`, err);
  }
}

// Plain text message
async function sendMessage(to, text) {
  await _post({
    messaging_product: 'whatsapp',
    to,
    type: 'text',
    text: { body: text, preview_url: false },
  });
}

// Interactive buttons — max 3, title max 20 chars each
// buttons: [{id, title}]
async function sendButtons(to, bodyText, buttons) {
  await _post({
    messaging_product: 'whatsapp',
    to,
    type: 'interactive',
    interactive: {
      type: 'button',
      body: { text: bodyText },
      action: {
        buttons: buttons.map(b => ({ type: 'reply', reply: { id: b.id, title: b.title } }))
      }
    }
  });
}

// Interactive list — multiple sections, row title max 24 chars
// sections: [{title, rows: [{id, title, description?}]}]
async function sendList(to, bodyText, buttonLabel, sections) {
  await _post({
    messaging_product: 'whatsapp',
    to,
    type: 'interactive',
    interactive: {
      type: 'list',
      body: { text: bodyText },
      action: { button: buttonLabel, sections }
    }
  });
}

module.exports = { sendMessage, sendButtons, sendList };
