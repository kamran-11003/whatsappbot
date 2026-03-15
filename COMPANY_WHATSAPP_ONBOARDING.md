# Company WhatsApp Cloud API Onboarding Guide

This guide is for onboarding a company-owned WhatsApp bot from scratch, starting with only:
- a company email
- a company phone number

It is written for this project (`whatsapp-bot`) and includes all major steps we used: callback URL setup, webhook subscription, app live/publishing, system user token, phone registration, and common errors.

## 1. Prerequisites

Before starting, make sure you have:
- A company Facebook account (or one that can create/manage business assets)
- A company email address you can access
- A company phone number that can receive OTP/SMS/calls
- A hosted bot URL (example from this project: `https://whatsappbot-vg92.onrender.com`)
- Admin-level access in Meta Business Manager (recommended)

## 2. Create/Prepare Meta Business Account

1. Open `https://business.facebook.com`.
2. Create a new Business Account for the company (if not already created).
3. Add company details (legal name, business email, website if available).
4. In Business Settings, add yourself and any teammates under Users.
5. Give yourself full admin permissions on:
- Business Account
- WhatsApp Account
- App assets

Notes:
- If you only have Employee access, some controls (like Two-step verification management) may be disabled.
- Most "missing permission" errors are caused by incomplete asset permissions.

## 3. Create Meta Developer App (Business type)

1. Open `https://developers.facebook.com`.
2. Click My Apps -> Create App.
3. Select App Type: Business.
4. Enter app name (for example: `KhidmatApp Bot`) and company email.
5. Create app.

Then add product:
1. In app dashboard, Add Products.
2. Add WhatsApp.
3. Continue setup and connect/create WhatsApp Business Account (WABA).

## 4. Get Core IDs (keep these safe)

From `Developers -> Your App -> WhatsApp -> API Setup`, collect:
- Phone Number ID (example: `1084251878097802`)
- WhatsApp Business Account ID / WABA ID (example: `1374705051340622`)
- App ID and App Secret (from App settings)

Important:
- Do not mix IDs from another app or another business.
- Token + WABA + Phone Number ID must all belong to the same app/business context.

## 5. Add/Verify Company Phone Number

In WhatsApp Manager:
1. Go to Phone Numbers.
2. Add your company number in international format (example: `+923715336271`).
3. Complete OTP verification (SMS or call).
4. Wait until the number appears in your WABA phone list.

Status meanings:
- Pending: setup not fully complete yet
- Verified / Connected: number can be used after registration

## 6. Configure Webhook Callback (critical)

In `Developers -> App -> WhatsApp -> Configuration`:
1. Set Callback URL:
- `https://whatsappbot-vg92.onrender.com/webhook`
2. Set Verify Token:
- any secret string (must match `.env` VERIFY_TOKEN if your code uses it)
3. Click Verify and Save.
4. Click Manage fields, then Subscribe to `messages`.

If `messages` is not subscribed, your bot will not receive incoming events.

## 7. Set Environment Variables in Bot

In local `.env` and Render environment variables, set:

```env
WHATSAPP_PHONE_NUMBER_ID=<your_company_phone_number_id>
WHATSAPP_API_TOKEN=<your_access_token>
VERIFY_TOKEN=<your_webhook_verify_token>
PORT=3000
```

For this project, ensure `WHATSAPP_PHONE_NUMBER_ID` points to your company number ID, not the test number (`+1 555...`).

## 8. Create Permanent System User Token (recommended)

Temporary tokens expire quickly. Use a system user token for production.

1. Open `business.facebook.com/settings`.
2. Go to Users -> System Users.
3. Create system user (for example: `Bot`).
4. Assign assets:
- Your WhatsApp Account
- Your Meta App
- Phone number asset (if shown)
5. Grant permissions:
- `whatsapp_business_management`
- `whatsapp_business_messaging`
6. Generate token for your app.
7. Put this token into `.env` and Render env vars.

## 9. Register Phone Number via Graph API

Use PowerShell (example):

```powershell
curl.exe -X POST "https://graph.facebook.com/v23.0/<PHONE_NUMBER_ID>/register" `
  -H "Authorization: Bearer <TOKEN>" `
  -d "messaging_product=whatsapp"
```

If response says `The parameter pin is required`, run with PIN:

```powershell
curl.exe -X POST "https://graph.facebook.com/v23.0/<PHONE_NUMBER_ID>/register" `
  -H "Authorization: Bearer <TOKEN>" `
  -d "messaging_product=whatsapp" `
  -d "pin=<6_DIGIT_PIN>"
```

## 10. Two-Step Verification (PIN) behavior

Even when UI looks disabled, backend may still require PIN.

If PIN required:
1. In WhatsApp Manager -> Phone Numbers -> your number -> Two-step verification.
2. Use existing PIN, or reset PIN if available.
3. Re-run register call with `pin`.

## 11. Publish App / Live Mode

For production traffic and stable webhook behavior:
1. App Settings -> Basic:
- Add Privacy Policy URL (`/privacy`)
- Add Terms URL (`/terms`)
2. Save changes.
3. App Review -> switch app to Live mode.

Without proper app/live setup, you may be limited to test behavior.

## 12. End-to-End Test Checklist

1. Server running (`node index.js`) and reachable.
2. `GET /webhook` verification passed.
3. `messages` field subscribed.
4. Company number is verified and registered.
5. Correct Phone Number ID and token in environment.
6. Send test WhatsApp message to bot number.
7. Confirm incoming webhook in logs and outgoing response from bot.

## 13. Common Errors and Fixes

### Error: Unsupported post request / object does not exist / missing permissions
Cause:
- wrong token for that WABA/phone ID
- wrong app context
Fix:
- generate token from same app
- check system user asset assignment and permissions

### Error: The parameter pin is required
Cause:
- two-step PIN required on number
Fix:
- register again with `pin=<6_DIGIT_PIN>`

### Error: Webhook verified but no incoming messages
Cause:
- `messages` not subscribed
Fix:
- subscribe `messages` in webhook field settings

### Bot sends from test number instead of company number
Cause:
- old `WHATSAPP_PHONE_NUMBER_ID` in env
Fix:
- update env to company number ID and restart app

## 14. Security and Operations

- Rotate/revoke tokens if exposed.
- Never commit tokens to git.
- Keep production token in Render environment variables (not hardcoded).
- Keep at least two company admins in Business Manager to avoid lockout.

## 15. Go-Live Sequence (quick summary)

1. Business account + roles
2. App + WhatsApp product
3. Add/verify company number
4. Configure callback URL + verify token
5. Subscribe `messages`
6. Create system user token with proper permissions
7. Update env (phone ID + token)
8. Register number (with PIN if required)
9. Switch app to Live
10. Send/receive test and monitor logs
