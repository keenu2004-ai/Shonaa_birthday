# Deployment & Hosting Guide — Our Little Universe ❤️

This guide covers running the application locally, building the production bundle, deploying the website, and honestly securing your personal website.

---

## 1. Local Development

To run the application locally on your computer:

```bash
# Start local development server
npm run dev
```

Open your browser to: `http://localhost:3000` (or the local port shown in your terminal). Any changes you make to photos in `public/memories/` or content in `src/config/loveStory.ts` will refresh immediately via Vite Hot Module Replacement (HMR).

---

## 2. Production Build

To test and compile the production bundle:

```bash
# Compile TypeScript and build static bundle
npm run build

# Preview the built distribution locally
npm run preview
```

The output files are generated in the `dist/` directory.

---

## 3. Recommended Free Hosting Platforms

Because **Our Little Universe** is a static single-page application (SPA), it can be deployed on any modern static hosting service:

### Option A: Vercel (Recommended)
1. Push your repository to a **Private GitHub Repository**.
2. Connect the repository at [vercel.com](https://vercel.com).
3. Project Settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Instant live HTTPS link generated.

### Option B: Netlify
1. Connect your private repository at [netlify.com](https://netlify.com).
2. Configure:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`

### Option C: Cloudflare Pages
1. Connect your private repository to Cloudflare Pages.
2. Build command: `npm run build`, output: `dist`.

---

## 4. Privacy & Password Protection: The Honest Truth

When sharing an intimate romantic website on the internet, it is critical to understand what is secure and what is merely visual.

### Level 1: Decorative Invitation Curtain (Built-in)
- **What it is**: The full-screen opening screen (*"For the girl who made my world beautiful"* with the *"Open Your Little Universe ❤️"* button).
- **What it does**: Creates a cinematic curtain and satisfies browser audio autoplay policies.
- **Security Reality**: **ZERO cryptographic security.** Anyone visiting the URL can click the button to enter.

### Level 2: Client-Side Passcode Gate (Aesthetic Barrier Only)
- **What it is**: An interactive prompt asking for an anniversary date or pet name, checking the answer via JavaScript / `sessionStorage`.
- **What it does**: Prevents someone who accidentally clicks the link from casually seeing the content.
- **Security Reality**: **NOT SECURE.** In static websites, all JavaScript, images, and text bundles are downloaded by the visitor's browser before the passcode executes. Anyone opening Chrome DevTools (F12) can read the source code, inspect assets, and view text without entering the passcode.

### Level 3: Genuine Hosting-Level Deployment Protection (Real Security)
To ensure that **only you and your girlfriend** can ever access the website:

1. **Private GitHub Repository**: Keep your repository **Private** so source code and uploaded personal photos are never public on GitHub.
2. **Platform Password Protection (Edge-Level HTTP Auth)**:
   - **Vercel**: In Project Settings → Deployment Protection, enable **Password Protection**. Vercel will require a password at the server edge before sending any HTML, JavaScript, or media to the browser.
   - **Netlify**: In Site Configuration → Access Management, enable **Visitor Access Password**.
   - **Cloudflare Access / Zero Trust**: Set up a free Cloudflare Access policy that requires a one-time PIN sent to her email.
3. **Private Unlisted / Obfuscated Domain**: If hosting on a free plan without edge password features, use a secret random slug subdomain (e.g. `theia-and-vaibhav-universe-8392.vercel.app`) rather than a predictable name, and ensure search indexing is disabled via `<meta name="robots" content="noindex, nofollow" />`.

---

## 5. Pre-Deployment Checklist

Before sharing the live link with her:

- [ ] Updated her name, your name, and nickname in `src/config/loveStory.ts`
- [ ] Set your actual relationship start date in `src/config/loveStory.ts`
- [ ] Set her actual birthday date and midnight time in `src/config/loveStory.ts`
- [ ] Replaced placeholder memories and stories with your personal memories
- [ ] Placed your photos in `public/memories/` and updated paths in `loveStory.ts`
- [ ] Placed your MP3 audio files in `public/audio/`
- [ ] Ran `npm run build` to verify clean compilation with 0 errors
- [ ] Tested on a mobile phone screen to verify layout and animations
- [ ] Previewed the grand birthday fireworks using the preview button in the countdown section
