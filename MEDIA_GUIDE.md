# Media Guide — Our Little Universe ❤️

This guide outlines exactly where to place your personal photographs, videos, and audio tracks, and how to seamlessly replace the built-in placeholder assets.

---

## 1. Directory Structure Overview

All media is served statically from the `public/` folder:

```
public/
├── memories/
│   ├── opening/           # Hero cover photo for the opening screen
│   ├── favourite/         # Top couple memories & holiday glow
│   ├── happy-moments/     # Unfiltered candid smiles & fun
│   ├── vacations/         # Mountain getaways & scenic overlooks
│   ├── travel/            # Forest caves, heritage archways & city walks
│   ├── special-days/      # Birthdays, anniversaries & milestones
│   ├── her-photos/        # Solo portraits of her (golden hour, smiles)
│   ├── our-photos/        # Couple selfies, kisses, scooter rides
│   └── birthday/          # Birthday cake, blowing candles, celebration
├── videos/
│   ├── memories/          # General relationship videos (MP4)
│   ├── vacations/         # Trip & road trip footage (MP4)
│   └── special-moments/   # Milestone video captures (MP4)
├── audio/
│   ├── opening.mp3        # Soft melody when opening the universe
│   ├── background.mp3     # Continuous acoustic/piano browsing soundtrack
│   └── birthday.mp3       # Celebration track when countdown hits zero
├── fonts/                 # Optional custom local webfonts
└── textures/              # Paper grain and pattern assets
```

---

## 2. Where To Place Your Photographs

| Category Folder | Recommended Content | Filename Suggestion | Config Property in `src/config/loveStory.ts` |
| :--- | :--- | :--- | :--- |
| `public/memories/opening/` | The most cinematic photo of her or both of you | `hero-cover.jpg` | Referenced in `HeroOpening.tsx` |
| `public/memories/favourite/` | Your personal top couple photos | `favourite-1.jpg`, `favourite-2.jpg` | `photos[0]`, `photos[10]` |
| `public/memories/happy-moments/` | Candid, funny, unscripted laugh moments | `happy-1.jpg`, `happy-2.jpg` | `photos[4]`, `photos[11]` |
| `public/memories/vacations/` | Scenic trips, mountain valleys, hills | `mountain-1.jpg` | `photos[2]` |
| `public/memories/travel/` | Nature trails, caves, architectural walks | `trail-1.jpg`, `arch-1.jpg` | `photos[5]`, `photos[8]`, `travelDiary` |
| `public/memories/special-days/` | Birthdays, dates, anniversaries | `birthday-cake.jpg` | `photos[9]`, `timeline[7]` |
| `public/memories/her-photos/` | Stunning solo portraits of her | `portrait-1.jpg`, `portrait-2.jpg` | `photos[3]`, `photos[7]` |
| `public/memories/our-photos/` | Cheek kisses, rides, casual selfies | `kiss-1.jpg`, `ride-1.jpg` | `photos[1]`, `photos[6]` |

---

## 3. How To Replace Placeholder Images

### Method A: Direct File Replacement (Fastest)
1. Convert or export your photo as `.jpg` or `.png`.
2. Name the file to match the placeholder (e.g. rename your favorite photo to `hero-cover.jpg` and place it into `public/memories/opening/`).
3. In `src/config/loveStory.ts`, update the extension if needed (change `.svg` to `.jpg`).
4. Save the file. The browser will update immediately via Vite HMR!

### Method B: Adding New Custom Photos
1. Drop your photo with any filename into the appropriate subfolder, for example:
   `public/memories/favourite/my-favourite-memory.jpg`
2. Open `src/config/loveStory.ts` and add or update an entry in the `photos` array:
   ```ts
   {
     id: "photo-custom-1",
     title: "Sunset Over The Hills",
     category: "favourite",
     src: "/memories/favourite/my-favourite-memory.jpg",
     caption: "The evening we sat watching the sunset and talked for four hours.",
     date: "October 14",
     location: "Sunset Point",
     rotation: -2,
   }
   ```

---

## 4. Video Files (MP4)

- **Format**: MP4 (H.264 video codec + AAC audio) for universal playback on Safari, Chrome, iOS, and Android.
- **Recommended Resolution**: 1080p (1920x1080) or 720p (1280x720).
- **Target File Size**: Under 25MB per video for instantaneous mobile streaming.
- **Placement**:
  - `public/videos/memories/our-laughter.mp4`
  - `public/videos/vacations/mountain-ride.mp4`
- **Config**: Update the `videos` array in `src/config/loveStory.ts`.

---

## 5. Background Music Files (MP3)

- **Supported Format**: MP3 or M4A.
- **Placement**:
  - `public/audio/opening.mp3` (Plays right after she clicks "Open Your Little Universe")
  - `public/audio/background.mp3` (Continuous ambient soundtrack)
  - `public/audio/birthday.mp3` (Celebration fanfare track for birthday fireworks)
- **Built-in Fallback**: If you do not have MP3 files ready immediately, the website features a **generative romantic Web Audio API synthesizer** (`src/utils/audioSynth.ts`) that plays gentle, soothing ambient piano/harp tones automatically!

