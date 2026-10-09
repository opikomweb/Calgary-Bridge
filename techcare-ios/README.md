# TechCare iOS app

A Capacitor wrapper that loads the live techcares.ca site as a native iOS app.
No Mac needed — Codemagic builds, signs, and uploads to TestFlight in the cloud.

- Bundle ID: `com.wilglobo.techcare`
- App name: TechCare
- Loads: https://techcares.ca (always reflects the live site, no separate deploy step for content changes)
- Icon/splash: generated from the existing TechCare logo mark

## What's already done
- Capacitor project scaffolded, iOS platform added
- App icon (1024x1024, flattened, no transparency) and splash screens generated and wired into the Xcode asset catalog
- `codemagic.yaml` configured for an App Store Connect build + TestFlight upload

## What you need to do (15-20 minutes, all in a browser)

### 1. App Store Connect — register the app
1. Go to https://appstoreconnect.apple.com (sign in with your paid developer account)
2. My Apps → "+" → New App
3. Platform: iOS. Name: **TechCare**. Primary language: English (Canada).
   Bundle ID: register `com.wilglobo.techcare` if it's not already listed (Certificates, Identifiers & Profiles → Identifiers → "+" first, if needed).
   SKU: anything unique, e.g. `techcare-ios-01`.
4. Fill the required listing fields later (see step 4) — you can save as draft now.

### 2. Generate an App Store Connect API key (not your password)
This is what lets Codemagic build and upload on your behalf, without ever seeing your Apple ID or password.
1. App Store Connect → Users and Access → Integrations → App Store Connect API
2. "+" to generate a new key. Name it `codemagic-techcare`. Access: **App Manager**.
3. Download the `.p8` key file **once** (Apple only lets you download it once — save it somewhere safe).
4. Note the **Key ID** and **Issuer ID** shown on that page.

### 3. Codemagic — connect the repo and the API key
1. Go to https://codemagic.io and sign up/sign in with GitHub (free tier covers this — 500 build minutes/month).
2. Add application → pick this repo (`opikomweb/Calgary-Bridge`) → it should auto-detect `codemagic.yaml` on this branch (`ios-app`), or point it at `techcare-ios/codemagic.yaml`.
3. Team settings → Integrations → App Store Connect → add the `.p8` key, Key ID, and Issuer ID from step 2. Name the integration `techcare_asc_key` (must match `codemagic.yaml`).
4. In `codemagic.yaml`, replace `APP_STORE_APPLE_ID` with the numeric Apple ID shown on your app's App Store Connect page (App Information → Apple ID).
5. Codemagic will also need an iOS distribution certificate + provisioning profile — easiest path: in the workflow's code signing settings, let Codemagic **automatically generate and manage** these using the same API key from step 2 (it can do this without you touching Xcode).

### 4. Fill in the App Store listing
Before TestFlight will accept a build, App Store Connect needs:
- App description, keywords, support URL (use `https://techcares.ca`), marketing URL (optional)
- Privacy policy URL: `https://techcares.ca/privacy.html` (already live)
- Category: Business or Utilities
- Age rating questionnaire (straightforward — no objectionable content)
- At least one screenshot per required device size — I can generate these from the live site if you want, once you confirm you want to proceed past TestFlight to a public release

### 5. Trigger the build
Push to this branch, or click "Start new build" in Codemagic. It builds, signs, and uploads straight to TestFlight. You'll get an email from Apple when it's ready to test — install the TestFlight app on your phone and you're in.

## Notes
- This wraps the **live website**, so any future change to techcares.ca shows up in the app automatically — no rebuild needed for content/text changes. You only need a new build for icon, name, or native-behavior changes.
- `submit_to_app_store: false` in `codemagic.yaml` on purpose — it stops at TestFlight. Flip it to `true` only when you're ready for public App Store review, after you've tested the TestFlight build yourself.
