# Deployment Guide — Our Little Universe ❤️

This guide covers running the application locally, building the production bundle, and deploying the website publicly (with optional password protection).

---

## 1. Local Development

To run the application on your computer:

```bash
# Start local development server
npm run dev
```

Open your browser to: `http://localhost:3000` (or the URL shown in your terminal). Any changes you make to photos or `src/config/loveStory.ts` will instantly refresh in your browser.

---

## 2. Production Build

To test and verify the production build locally:

```bash
# 1. Compile TypeScript and build static bundle
npm run build

# 2. Preview the built website
npm run preview
```

The output files are generated in the `dist/` directory.

---

## 3. Recommended Free Hosting Platforms

Because **Our Little Universe** is a modern static single-page application (SPA), it can be deployed for free on any of these popular platforms:

### Option A: Vercel (Recommended)
1. Push your repository to GitHub or install Vercel CLI (`npm i -g vercel`).
2. Run `vercel` in the project root directory.
3. Settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Instant live HTTPS link generated!

### Option B: Netlify
1. Drag and drop the `dist` folder directly onto [Netlify Drop](https://app.netlify.com/drop).
2. Or connect your GitHub repository with:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`

### Option C: GitHub Pages
1. In `vite.config.ts`, set `base: '/<repo-name>/'` if using project pages.
2. Build with `npm run build` and deploy the `dist/` folder using `gh-pages` package.

---

## 4. Privacy & Password Protection

Since this is a deeply personal website for your girlfriend, you may want to prevent unexpected visitors from viewing it before you give her the link.

### Method A: Platform Password (Vercel / Netlify)
- **Vercel Pro**: Enable "Password Protection" in Project Settings → Deployment Protection.
- **Netlify**: Enable "Password Protection" under Site Access Control.

### Method B: Client-Side Passcode Gate
If hosting on free plans without built-in authentication, you can enable a client-side romantic passcode (e.g. your anniversary date or her pet name):

1. In `src/App.tsx`, check `sessionStorage.getItem('passcode_unlocked')`.
2. Present a sweet passcode prompt modal asking: *"What is the special date of us?"*
3. Once entered correctly, store `sessionStorage.setItem('passcode_unlocked', 'true')`.

---

## 5. Pre-Deployment Checklist

- [ ] All desired photos placed in `public/memories/`
- [ ] Any MP4 videos placed in `public/videos/`
- [ ] Any preferred MP3 songs placed in `public/audio/`
- [ ] Names, birthday date, and relationship start date updated in `src/config/loveStory.ts`
- [ ] Ran `npm run build` to verify clean compilation
- [ ] Tested responsive layout on mobile screen (Safari / Chrome DevTools)
- [ ] Confirmed birthday fireworks celebration works (previewed using the test button)
