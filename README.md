# 🏛️ Governor House WhatsApp Citizen Services Bot

Bilingual (English / Urdu) WhatsApp bot that guides citizens to government
services across NADRA, Police, Utilities, Welfare departments and more.

---

## 📁 Project Structure

```
whatsapp-bot/
├── index.js          ← Express server + webhook entry point
├── .env.example      ← Copy to .env and fill in your keys
├── package.json
└── src/
    ├── handler.js    ← All bot logic (menu, province, language)
    ├── services.js   ← Department × Province → service URL mapping
    ├── session.js    ← In-memory user session state
    ├── strings.js    ← All English & Urdu message text
    └── whatsapp.js   ← Meta Cloud API sender
```

---

## 🔑 Keys You Will Need

| Key | Where to get it |
|-----|----------------|
| `WHATSAPP_PHONE_NUMBER_ID` | Meta Developer Dashboard → App → WhatsApp → API Setup |
| `WHATSAPP_API_TOKEN` | Meta Developer Dashboard → System Users → Generate Token |
| `VERIFY_TOKEN` | Any secret string you invent — you paste the same string in Meta dashboard |

---

## 🚀 Setup Steps

### Step 1 — Install Node.js
Download and install Node.js 18+ from https://nodejs.org

### Step 2 — Clone / download this project
```bash
cd your-folder
# paste the project files here
```

### Step 3 — Install dependencies
```bash
npm install
```

### Step 4 — Create your .env file
```bash
cp .env.example .env
```
Open `.env` and fill in your three values:
```
WHATSAPP_PHONE_NUMBER_ID=123456789012345
WHATSAPP_API_TOKEN=EAAJxxxxxxxxxx
VERIFY_TOKEN=governor_house_bot_secret
```

### Step 5 — Run locally to test
```bash
npm start
# Server starts on http://localhost:3000
```

### Step 6 — Expose your local server to the internet (for Meta webhook)

During development use **ngrok** (free):
```bash
# Install ngrok from https://ngrok.com
ngrok http 3000
# Copy the https URL it gives you, e.g. https://abc123.ngrok.io
```

### Step 7 — Register the webhook on Meta

1. Go to **Meta Developer Dashboard** → Your App → **WhatsApp → Configuration**
2. Under **Webhook**, click **Edit**
3. Set **Callback URL** to: `https://abc123.ngrok.io/webhook`
4. Set **Verify Token** to the same string in your `.env` (`governor_house_bot_secret`)
5. Click **Verify and Save**
6. Subscribe to: `messages`

### Step 8 — Test the bot

Send a WhatsApp message to your registered business number:
- Say `hi` — bot greets you and shows the menu
- Type `1` — selects NADRA, then type `1`–`4` for province
- Type `13` — language switch menu
- Type `menu` — returns to main menu anytime

---

## ☁️ Deploying to DigitalOcean

### Create a Droplet
1. Sign up at https://digitalocean.com
2. Create a new Droplet → Ubuntu 22.04 → Basic → $12/month (1 vCPU / 2GB)
3. Add your SSH key and launch

### SSH into your Droplet
```bash
ssh root@YOUR_DROPLET_IP
```

### Install Node.js on the server
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Upload your project
```bash
# On your local machine:
scp -r ./whatsapp-bot root@YOUR_DROPLET_IP:/root/whatsapp-bot
```

### Install PM2 (keeps bot running 24/7)
```bash
npm install -g pm2
cd /root/whatsapp-bot
npm install
pm2 start index.js --name gov-bot
pm2 save
pm2 startup
```

### Set up HTTPS with Nginx + Let's Encrypt
```bash
sudo apt install nginx certbot python3-certbot-nginx -y

# Point your domain DNS A record → Droplet IP first, then:
certbot --nginx -d yourdomain.com
```

Nginx config (`/etc/nginx/sites-available/default`):
```nginx
server {
    listen 443 ssl;
    server_name yourdomain.com;

    location /webhook {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }
}
```

```bash
nginx -t && systemctl reload nginx
```

Now update your Meta webhook URL to: `https://yourdomain.com/webhook`

---

## 🛠️ Customisation

### Add or update service links
Open `src/services.js` and update the URLs in each department's province blocks:
```js
1: { // NADRA
  sindh:   { url: 'https://...', note: 'Description shown to user' },
  punjab:  { url: 'https://...', note: '...' },
  ...
}
```
Set a province to `null` if the service doesn't exist there.

### Add more languages
In `src/strings.js`, copy the `en` block and add a new key (e.g. `'sd'` for Sindhi).
Then add a 3rd option to the `langSelect` string and handle `'3'` in `handler.js`.

### Add more departments
In `src/services.js`, extend the `DEPARTMENTS` array and add a matching entry in `services`.
Update both `strings.js` menu blocks accordingly.

---

## ✅ Bot Flow Summary

```
User sends any message
        ↓
Bot sends welcome + menu (13 options)
        ↓
User types 0–12 (department)
        ↓
Bot asks province (1–4)
        ↓
Bot sends official service link
        ↓
User types "menu" to start again
        ↓
User types "13" to switch language
```

---

## 📋 Requirements Summary

| Item | Value |
|------|-------|
| Node.js | 18+ |
| WhatsApp API | Meta Cloud API (free tier) |
| Hosting | DigitalOcean $12/month Droplet |
| Domain | Any .com or .pk domain |
| SSL | Let's Encrypt (free) |
| Monthly cost | ~$14–40 depending on traffic |
