# Media Management Guide — Our Little Universe ❤️

Welcome to the **Our Little Universe** media management system. This guide explains how to add your personal photos, videos, and music to the website, how automatic discovery works, and how to customize captions and metadata.

---

## 1. Quick Start: Where Does Everything Go?

All media lives in the `public/` directory. Simply drop your media files into the corresponding folders:

```
public/
├── memories/
│   ├── opening/         ← Place your opening hero photo (e.g. hero-cover.jpg)
│   ├── favourite/       ← Your absolute favourite memories together
│   ├── happy-moments/   ← Unfiltered, joyful, laughing candid photos
│   ├── vacations/       ← Trips, getaways, mountain views, beach days
│   ├── travel/          ← Nature walks, historic sights, explorations
│   ├── special-days/    ← Anniversaries, date nights, festivals
│   ├── her-photos/      ← Stunning solo portraits of her
│   ├── our-photos/      ← Couple photos of both of you together
│   └── birthday/        ← Birthday celebrations & cake photos
│
├── videos/
│   ├── memories/        ← Short 15-60s video clips of laughter and moments
│   ├── vacations/       ← Roadtrip and scenic travel videos
│   └── special-moments/ ← Birthday greetings, celebration videos
│
└── audio/
    ├── opening.mp3      ← Played when she clicks "Open Your Little Universe"
    ├── background.mp3   ← Gentle ambient acoustic/piano track
    └── birthday.mp3     ← Joyful fanfare played during fireworks modal
```

---

## 2. Supported File Formats

| Media Type | Supported Extensions |
| :--- | :--- |
| **Photographs** | `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`, `.svg` |
| **Videos** | `.mp4`, `.webm` |
| **Audio Tracks** | `.mp3`, `.m4a`, `.wav`, `.ogg` |

> [!NOTE]
> All photos and videos are automatically discovered at build time! You do **not** need to register every filename in code unless you want to add custom captions.

---

## 3. How Automatic Media Discovery Works

1. When you run `npm run dev` or `npm run build`, our discovery engine (`scripts/discover-media.mjs`) scans all folders under `public/memories/`, `public/videos/`, and `public/audio/`.
2. It automatically maps photos to gallery categories based on their folder name.
3. It generates clean titles from filenames (e.g. `mountain-getaway-sunset.jpg` becomes `"Mountain Getaway Sunset"`).
4. If a category folder has no personal photos yet, it automatically preserves the tasteful vector SVG placeholder so the website never looks broken.
5. In development mode (`npm run dev`), the Vite server continuously watches `public/` and updates the manifest in real-time as you add files.

---

## 4. How to Replace the Opening Hero Photo

1. Place your favourite photo in `public/memories/opening/` (for example, named `hero-cover.jpg` or `our-best-photo.jpg`).
2. Run `npm run build` or `npm run dev`.
3. The website will automatically detect your real photo and display it inside the opening scrapbook frame on the opening gateway!

---

## 5. How to Select Birthday Celebration Photos

The Grand Birthday Celebration modal features fireworks, confetti, and an explosion of photos floating around the screen.

You can select photos for this celebration in two simple ways:
- **Method A (Folder-based)**: Place your photos in `public/memories/birthday/`. Every photo in this folder is automatically tagged for the birthday celebration explosion.
- **Method B (Config-based)**: In `src/config/loveStory.ts`, add an override with `isBirthdayCelebration: true`:
  ```typescript
  mediaOverrides: {
    "our-favourite-trip.jpg": {
      isBirthdayCelebration: true,
    },
  }
  ```

---

## 6. How to Add Captions, Dates, and Locations

By default, the system displays a clean title derived from the filename and leaves dates/locations blank rather than inventing fake details.

To add real captions, dates, and locations, open [`src/config/loveStory.ts`](file:///c:/Users/Vaibhav/OneDrive/Music/birthday/src/config/loveStory.ts) and add your file to `mediaOverrides`:

```typescript
mediaOverrides: {
  "cozy-cafe.jpg": {
    title: "Our Rainy Day Coffee",
    caption: "The afternoon we spent three hours talking about everything and nothing.",
    date: "October 14, 2023",
    location: "Blue Tokai Cafe",
    rotation: -2, // Optional tilt in degrees (-3 to 3)
    featured: true, // Display with priority
  },
  "mountain-hike.jpg": {
    title: "Reaching The Summit",
    caption: "You were tired but kept smiling all the way to the top.",
    date: "June 2024",
    location: "Mussoorie Valley",
  },
}
```

---

## 7. How to Add Videos

1. Place your video files in `public/videos/memories/`, `public/videos/vacations/`, or `public/videos/special-moments/`.
2. Example filenames:
   - `public/videos/memories/our-laughter.mp4`
   - `public/videos/vacations/mountain-ride.mp4`
3. Optional video thumbnail: You can place an image with the same name (e.g. `our-laughter.jpg`) or set `thumbnail` in `mediaOverrides`.
4. Videos are configured with `preload="metadata"` so they **never slow down initial page loads** and do not autoplay without user interaction.

---

## 8. How to Add Background Music

1. Place your MP3/M4A/WAV songs in `public/audio/`:
   - `public/audio/opening.mp3`: Romantic acoustic/piano song for the opening screen.
   - `public/audio/background.mp3`: Warm romantic love song playing across the website.
   - `public/audio/birthday.mp3`: Celebration anthem triggered when she opens the fireworks modal.
2. If any audio file is missing, the built-in **Web Audio API ambient soundscape** activates automatically, ensuring silent, smooth, error-free playback at all times.

---

## 9. Do I Need to Rebuild After Adding Media?

- **During Development (`npm run dev`)**: No rebuild required! The Vite file-watcher detects newly added files and regenerates the manifest in real time. Simply refresh your browser tab.
- **For Production Build (`npm run build`)**: The build command automatically runs `discover-media` as a pre-build step (`prebuild`), bundling all discovered media into your final `dist/` directory.

---

## 10. Audit CLI: Checking Your Content Status

Run this command anytime to see which photos are verified and which placeholders remain:

```bash
npm run check-content
```

It reports:
- Number of verified personal photos vs placeholders.
- Presence of background audio and video files.
- Any unedited `[EDITABLE: ...]` placeholders remaining in `loveStory.ts`.
- Overall website readiness score.
