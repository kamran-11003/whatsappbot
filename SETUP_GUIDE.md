# WhatsApp Cloud API — Meta Setup Guide (2025–2026)

How to create a Meta developer account, get API credentials, and publish your app.

---

### Step 1: Create a Facebook/Meta Developer Account

1. Go to https://developers.facebook.com
2. Log in with your Facebook account
3. Click **My Apps → Create App**
4. Choose **Business** as the app type
5. Enter an app name (e.g. `GovernorHouseBot`) and your email
6. Click **Create App**

---

### Step 2: Add WhatsApp Product to Your App

1. Inside your App Dashboard, find **"Add Products"** in the left sidebar
2. Find **WhatsApp** and click **Set Up**
3. When asked, select or create a **WhatsApp Business Account (WABA)**
4. Meta will automatically create:
   - A free test phone number (`+1 555 153 3333`)
   - A temporary access token
   - A WhatsApp Business Account ID

---

### Step 3: Get Your API Credentials

Go to **WhatsApp → API Setup** in the left sidebar. You will see:

| Credential | Where to find it | Example |
|---|---|---|
| `WHATSAPP_PHONE_NUMBER_ID` | Under "From" section | `1066935926495410` |
| `WHATSAPP_BUSINESS_ACCOUNT_ID` | Same page | `1247373383561949` |
| `WHATSAPP_API_TOKEN` | Click "Generate access token" | `EAATuFI...` |

> ⚠️ The token generated here is **temporary (24 hours)**. See Part 4 for a permanent token.

---

### Step 4: Add a Test Recipient (Your Phone Number)

1. On the **API Setup** page, find the **"To"** dropdown
2. Click **Manage phone number list**
3. Click **Add phone number**
4. Enter your WhatsApp number in international format: `+923001234567`
5. You will receive a WhatsApp OTP — enter it to verify

> ℹ️ In Development Mode, the bot can ONLY send messages to numbers in this approved list (max 5 numbers).

---

### Step 5: Configure Webhook

1. Go to **WhatsApp → Configuration** in the left sidebar
2. Under **Webhook**, click **Edit**
3. Enter:
   - **Callback URL**: `https://your-app.onrender.com/webhook`
   - **Verify Token**: any secret string you choose (e.g. `bot_secret`) — must match your `.env`
4. Click **Verify and Save**
5. After saving, click **Manage** next to Webhook Fields
6. Find **`messages`** and click **Subscribe** ← critical step most people miss

---

### Step 6: Publish Your App (Required for Webhooks to Work)

> ⚠️ Meta only delivers webhook events to **published** apps.

1. Go to **App Settings → Basic**
2. Fill in:
   - **Privacy Policy URL**: `https://your-app.onrender.com/privacy`
   - **Terms of Service URL**: `https://your-app.onrender.com/terms`
3. Click **Save Changes**
4. Go to **App Review** in the left sidebar
5. Toggle **Make App Live** → confirm

| `getDetail is not a function` | Wrong import name | Use `getDeptDetails` from seed.js |
| `No messages in Render logs` | `messages` field not subscribed | Go to Webhook → Manage → Subscribe to `messages` |
| Bot doesn't reply after app goes live | App not published | App Review → Make App Live |
| Slow first response | Render free tier sleep | Set up UptimeRobot to ping every 5 min |
