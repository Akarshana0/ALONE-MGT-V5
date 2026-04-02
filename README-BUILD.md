# Alone Management Pro — Multi-Platform Build Guide
# සියලු Platform සඳහා App Build කිරීමේ මාර්ගෝපදේශය

---

## 📁 ඔබේ Project Folder Structure (ෆෝල්ඩරය සකස් කරන්න)

```
AloneManagement/
├── index.html          ✅ ඔබේ ප්‍රධාන file
├── manifest.json       ✅ (නව file - package එකෙන් ගන්න)
├── sw.js               ✅ ඔබේ service worker
├── icon.jpg            ✅ ඔබේ icon
├── Vue.js              ✅ ඔබේ Vue file
├── electron-main.js    🆕 (package ෙකෙන් ගන්න)
├── package.json        🆕 (package ෙකෙන් ගන්න)
└── capacitor.config.json 🆕 (package ෙකෙන් ගන්න)
```

---

## 🔧 Prerequisites (කලින් Install කරන්න)

```bash
# Node.js install කරන්න (https://nodejs.org) - Version 18+ 
node --version    # v18.x.x හෝ ඊට වැඩි නම් හරි

# Dependencies install කරන්න (Project folder ේ terminal)
npm install
```

---

## 🪟 Windows (.exe Installer + Portable)

```bash
# Windows installer (.exe) build කරන්න
npm run build:win
```

**Output → `dist/` folder:**
- `Alone Management Pro Setup.exe` — Installer (Install කරන්න)
- `Alone Management Pro.exe` — Portable (Install නෑ, directly run)

> 💡 Build PC ය Windows නම් directly build වෙයි.
> 💡 Mac/Linux PC ෙකෙන් build කරනවා නම් Docker use කරන්න.

---

## 🐧 Linux (.AppImage + .deb + .rpm)

```bash
# Linux apps build කරන්න
npm run build:linux
```

**Output → `dist/` folder:**
- `Alone.Management.Pro-x86_64.AppImage` — Ubuntu/Fedora/Any (double-click to run)
- `alone-management-pro_5.0.0_amd64.deb` — Ubuntu/Debian
- `alone-management-pro-5.0.0.x86_64.rpm` — Fedora/RHEL

---

## 🤖 Android (.APK / .AAB)

### ක්‍රමය 1: Capacitor (Native App - Recommended)

```bash
# Step 1: Capacitor init
npm run cap:init

# Step 2: Android platform add කරන්න
npm run cap:android

# Step 3: Android Studio ෙකෙදී open කරන්න
npm run cap:open-android
```

Android Studio ෙකෙදී:
1. `Build → Generate Signed Bundle / APK` click කරන්න
2. **APK** තෝරන්න → Sign කරන්න → Build
3. APK file `android/app/release/` folder ේ ලැෙබෙනවා

### ක්‍රමය 2: PWABuilder (ලේසිම!)

1. ඔබේ app **web server** ෙකෙකේ host කරන්න (GitHub Pages / Netlify free)
2. **https://www.pwabuilder.com** visit කරන්න
3. ඔබේ URL paste කරන්න → **Start** click
4. **Android → Download Package** click කරන්න ✅

---

## 🍎 iOS (.ipa)

> ⚠️ iOS Build කරන්න **Mac computer** + **Xcode** අනිවාර්යයි

```bash
# Step 1: iOS platform add
npm run cap:ios

# Step 2: Xcode ෙකෙදී open
npm run cap:open-ios
```

Xcode ෙකෙදී:
1. ඔබේ Apple Developer Account sign in කරන්න
2. `Product → Archive` click
3. Distribute App → App Store / Ad-hoc

### PWABuilder iOS Method:
1. Host කරන app URL → pwabuilder.com
2. **iOS → Download Package** → Xcode ෙකෙදී open කරන්න

---

## 🌐 PWA (Chrome/Edge ෙකෙදී Install — ඕනෑම OS)

No build required! Browser ෙකෙදීම:
- Chrome/Edge → Address bar ේ **Install icon** (➕) → Install
- **Android Chrome** → "Add to Home Screen"
- **iOS Safari** → Share → "Add to Home Screen"

---

## 🚀 Deploy for PWA (Free Hosting)

### GitHub Pages (Free):
```bash
# GitHub account create → New repository
# Files upload → Settings → Pages → Deploy from branch main
# URL: https://yourusername.github.io/alone-management/
```

### Netlify (Free - ලේසිම):
1. https://netlify.com → Sign up
2. Project folder drag & drop → Done! ✅
3. Auto URL ලැෙබෙනවා

---

## 📋 Summary Table

| Platform | File | Build Command | Special Requirement |
|----------|------|--------------|-------------------|
| Windows | .exe | `npm run build:win` | None |
| Linux | .AppImage | `npm run build:linux` | None |
| Android | .apk | `npm run cap:android` | Android Studio |
| iOS | .ipa | `npm run cap:ios` | Mac + Xcode |
| PWA | Browser | Host online | Any web server |

---

## ❓ Help / Issues

- Electron docs: https://electronjs.org
- Capacitor docs: https://capacitorjs.com
- PWABuilder: https://pwabuilder.com
