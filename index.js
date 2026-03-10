require('dotenv').config();
const express = require('express');
const { handleIncoming } = require('./src/handler');
const { getSession, setSession } = require('./src/session');
const strings = require('./src/strings');
const { sendMessage } = require('./src/whatsapp');

const app = express();
app.use(express.json());

// ─── Webhook Verification (Meta requires this on first setup) ────────────────
app.get('/webhook', (req, res) => {
  const mode      = req.query['hub.mode'];
  const token     = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) {
    console.log('✅  Webhook verified by Meta');
    return res.status(200).send(challenge);
  }
  console.warn('❌  Webhook verification failed');
  res.sendStatus(403);
});

// ─── Incoming Messages ───────────────────────────────────────────────────────
app.post('/webhook', async (req, res) => {
  try {
    const body = req.body;
    if (body.object !== 'whatsapp_business_account') return res.sendStatus(404);

    const entry   = body.entry?.[0];
    const changes = entry?.changes?.[0];
    const value   = changes?.value;
    const message = value?.messages?.[0];

    if (!message) return res.sendStatus(200); // ack non-message events

    const from = message.from;               // sender's WhatsApp number
    const text = message.text?.body?.trim(); // message body

    if (!text) return res.sendStatus(200);   // ignore media/stickers/etc

    const session = getSession(from);

    // Very first contact — user hasn't been greeted yet
    if (session.step === 'cnic' && !session._greeted) {
      setSession(from, { _greeted: true });
      const lang = session.lang || 'en';
      await sendMessage(from, strings[lang].askCnic);
      return res.sendStatus(200);
    }

    await handleIncoming(from, text);
    res.sendStatus(200);
  } catch (err) {
    console.error('Webhook error:', err.message);
    res.sendStatus(500);
  }
});

// ─── Privacy Policy ──────────────────────────────────────────────────────────
app.get('/privacy', (req, res) => {
  res.send(`
    <html><body style="font-family:sans-serif;max-width:600px;margin:40px auto;padding:0 20px">
      <h1>Privacy Policy</h1>
      <p>This WhatsApp bot is operated by Governor House and is used to provide citizen services.</p>
      <h2>Data We Collect</h2>
      <p>We collect your CNIC number, phone number, and location (city/area) solely to process your service request.</p>
      <h2>How We Use Your Data</h2>
      <p>Your data is used only to respond to your service request within this WhatsApp conversation. We do not share your data with third parties.</p>
      <h2>Data Retention</h2>
      <p>Session data is stored temporarily in memory and is cleared when the server restarts.</p>
      <h2>Contact</h2>
      <p>For any privacy concerns, contact us via the Governor House official channels.</p>
    </body></html>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀  Governor House Bot running on port ${PORT}`));
