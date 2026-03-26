require('dotenv').config();
const express = require('express');
const { handleIncoming } = require('./src/handler');
const { getSession, setSession } = require('./src/session');
const strings = require('./src/strings');
const { sendMessage, sendButtons } = require('./src/whatsapp');

const app = express();
app.use(express.json());

// ─── Homepage ─────────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.send(`
    <html><head><meta charset="utf-8"><title>NITB Citizen Services Guide</title>
    <style>body{font-family:sans-serif;max-width:700px;margin:60px auto;padding:0 20px;color:#333}
    h1{color:#1a5276}p{line-height:1.7}.badge{display:inline-block;background:#27ae60;color:#fff;padding:6px 14px;border-radius:4px;font-size:14px}</style>
    </head><body>
      <h1>🏛️ NITB Citizen Services Guide</h1>
      <p class="badge">✅ Service Online</p>
      <p>This is the official WhatsApp chatbot by NITB (National Information Technology Board) for citizen services. It helps citizens find the right government app and service center for their needs.</p>
      <p>The bot supports both <strong>English</strong> and <strong>اردو (Urdu)</strong>.</p>
      <h2>Contact</h2>
      <p>For queries, contact NITB through official channels at <a href="https://www.nitb.gov.pk">www.nitb.gov.pk</a>.</p>
      <p><a href="/privacy">Privacy Policy</a> &nbsp;|&nbsp; <a href="/terms">Terms of Service</a></p>
    </body></html>
  `);
});

// ─── Webhook Verification (Meta requires this on first setup) ────────────────
app.get('/webhook', (req, res) => {
  const mode      = req.query['hub.mode'];
  const token     = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  console.log(`[verify] mode=${mode} received_token=${token} expected_token=${process.env.VERIFY_TOKEN}`);
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
    console.log('[post] raw body object:', body?.object, '| full:', JSON.stringify(body)?.slice(0, 300));
    if (body.object !== 'whatsapp_business_account') return res.sendStatus(404);

    const entry   = body.entry?.[0];
    const changes = entry?.changes?.[0];
    const value   = changes?.value;
    const message = value?.messages?.[0];

    if (!message) return res.sendStatus(200); // ack non-message events

    const from = message.from;               // sender's WhatsApp number
    console.log('[msg] from:', from, 'type:', message.type);
    const text = message.text?.body?.trim()
              || message.interactive?.button_reply?.id
              || message.interactive?.list_reply?.id;
    console.log('[msg] text extracted:', text);

    if (!text) return res.sendStatus(200);   // ignore media/stickers/etc

    const session = getSession(from);

    // Very first contact — user hasn't been greeted yet
    if (session.step === 'lang_select' && !session._greeted) {
      setSession(from, { _greeted: true });
      await sendButtons(from, strings.askLang, [
        { id: '1', title: 'English 🇬🇧' },
        { id: '2', title: 'اردو 🇵🇰' },
      ]);
      return res.sendStatus(200);
    }

    await handleIncoming(from, text);
    res.sendStatus(200);
  } catch (err) {
    console.error('Webhook error:', err.message);
    res.sendStatus(500);
  }
});

// ─── Privacy Policy & Terms ───────────────────────────────────────────────────
app.get('/terms', (req, res) => {
  res.send(`
    <html><body style="font-family:sans-serif;max-width:600px;margin:40px auto;padding:0 20px">
      <h1>Terms of Service</h1>
      <p>By using this WhatsApp bot, you agree to provide accurate information and use the service solely for legitimate citizen service requests via NITB (National Information Technology Board).</p>
      <h2>Acceptable Use</h2>
      <p>This service is intended for Pakistani citizens seeking government services. Misuse or abuse of this service is prohibited.</p>
      <h2>Disclaimer</h2>
      <p>This bot is provided as-is. Response times may vary depending on service availability.</p>
    </body></html>
  `);
});

app.get('/privacy', (req, res) => {
  res.send(`
    <html><body style="font-family:sans-serif;max-width:600px;margin:40px auto;padding:0 20px">
      <h1>Privacy Policy</h1>
      <p>This WhatsApp bot is operated by NITB (National Information Technology Board) and is used to provide citizen services.</p>
      <h2>Data We Collect</h2>
      <p>We collect your language preference, selected location, and selected service solely to respond to your request.</p>
      <h2>How We Use Your Data</h2>
      <p>Your data is used only to respond to your service request within this WhatsApp conversation. We do not share your data with third parties.</p>
      <h2>Data Retention</h2>
      <p>Session data is stored temporarily in memory and is cleared when the server restarts.</p>
      <h2>Contact</h2>
      <p>For any privacy concerns, contact us via NITB official channels at www.nitb.gov.pk.</p>
    </body></html>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀  NITB Citizen Services Bot running on port ${PORT}`));
