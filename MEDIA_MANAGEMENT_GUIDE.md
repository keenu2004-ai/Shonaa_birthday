# Media Management Guide — SHONAA BIRTHDAY ❤️

Welcome to the **SHONAA BIRTHDAY ❤️** media management system. This guide explains how personal photos, videos, and music are organized, how the local review gallery works, and how to customize captions and metadata.

---

## 1. Quick Media Review Tool (`public/photo-review.html`)

To effortlessly review and reference all 67 photos and 5 videos, open the standalone review gallery:

1. Open your browser and navigate to:
   ```
   http://localhost:3000/photo-review.html
   ```
   *(Or open `public/photo-review.html` directly in any web browser).*
2. **Features**:
   - Every photograph has a sequential ID: `PHOTO 001`, `PHOTO 002`, `PHOTO 003`...
   - Every video has a sequential ID: `VIDEO 001`, `VIDEO 002`...
   - Quick category filters: **All Media**, **First Date / Ghagra**, **Mussoorie Vacation**, **Birthday Celebration**, **Cute & Clingy**, **Her Portraits**, **Videos Only**.
   - **Clicking any thumbnail** opens a high-resolution lightbox modal.
   - **"Copy ID"** button copies `PHOTO XXX` to your clipboard for quick reference in configs.
   - **"Copy Path"** button copies `/memories/birthday/...` for direct use.

Complete tabular documentation of all media is saved in [`PHOTO_INDEX.md`](./PHOTO_INDEX.md).

---

## 2. Directory Layout & Shonaa's Uploaded Assets

All media lives in the `public/` directory:

```
public/
├── memories/
│   ├── opening/
│   │   └── hero-cover.jpeg      ← Opening Polaroid cover photo (Cheek kiss with pink bows)
│   ├── birthday/
│   │   ├── 67 JPEGs             ← WhatsApp photos from trips, dates, birthdays, celebrations
│   │   └── 4 MP4 videos         ← WhatsApp video memories
│   └── favourite/
│       ├── Kaise Bataaoon.mp3   ← Main background soundtrack
│       └── Rakhlo_Tum_Chupaake.webm
│
├── audio/
│   ├── background.mp3           ← Continuous background audio (Kaise Bataaoon)
│   ├── opening.mp3              ← Opening theme audio
│   └── Rakhlo_Tum_Chupaake.webm ← Secondary musical memory
│
└── photo-review.html            ← Interactive local media reviewer
```

---

## 3. Key Identified Memories

| Memory Category | Sequential ID | Filename | Key Visual Clue |
|---|---|---|---|
| **First Date / First Photograph** | `PHOTO 056` | `WhatsApp Image 2026-11-09 at 11.17.03 PM.jpeg` | White and blue ghagra at stone monument |
| **First Date (Solo Full-Length)** | `PHOTO 052` | `WhatsApp Image 2026-11-09 at 11.16.59 PM.jpeg` | White & blue ghagra at carved wooden door |
| **First Date (Commute)** | `PHOTO 060` | `WhatsApp Image 2026-11-09 at 11.17.05 PM.jpeg` | Metro / train selfie in first date outfits |
| **Mussoorie Vacation (Mall Road)** | `PHOTO 053` | `WhatsApp Image 2026-11-09 at 11.17.00 PM.jpeg` | Couple selfie by Gandhi statue, Mall Road |
| **Mussoorie (Misty Ridges)** | `PHOTO 005` | `WhatsApp Image 2026-11-09 at 11.15.56 PM.jpeg` | Mountain cliff overlooking clouds |
| **Mussoorie (Robber's Cave)** | `PHOTO 006` | `WhatsApp Image 2026-11-09 at 11.15.57 PM (1).jpeg` | "MIND YOUR HEAD" cave trail stairs |
| **Mussoorie (Christ Church)** | `PHOTO 065` | `WhatsApp Image 2026-11-09 at 11.17.13 PM (1).jpeg` | Blue rain poncho by historic church & pine |
| **Birthday Celebration** | `PHOTO 064` | `WhatsApp Image 2026-11-09 at 11.17.12 PM.jpeg` | Blowing glowing candles on cake (gold "23") |
| **Cute Cheek Kiss** | `PHOTO 027` | `WhatsApp Image 2026-11-09 at 11.16.13 PM (2).jpeg` | Vaibhav kissing cheek with pink bow filters |
| **Motorcycle Ride** | `PHOTO 045` | `WhatsApp Image 2026-11-09 at 11.16.45 PM.jpeg` | Couple selfie in motorcycle helmets |
| **Penguin Cuddle** | `PHOTO 063` | `WhatsApp Image 2026-11-09 at 11.17.09 PM.jpeg` | Hugging plush penguin tight |
| **Late Night Video Call** | `PHOTO 010` | `WhatsApp Image 2026-11-09 at 11.15.58 PM (3).jpeg` | Blanket ghost holding thermos |
| **Christmas Celebration** | `PHOTO 055` | `WhatsApp Image 2026-11-09 at 11.17.02 PM.jpeg` | Fairy lights & Santa decorations |
| **Diwali Diyas** | `PHOTO 011` | `WhatsApp Image 2026-11-09 at 11.15.58 PM (4).jpeg` | Lighting lamps in purple silk suit |
| **Gurudwara Bangla Sahib** | `PHOTO 028` | `WhatsApp Image 2026-11-09 at 11.16.13 PM.jpeg` | Sarovar at night with tilak & dupatta |

---

## 4. How to Customize Captions in `src/config/loveStory.ts`

To change the caption, location, date, or title of any photo in the website:

1. Open `src/config/loveStory.ts`.
2. Locate the `photos` array (around line 190).
3. Find the photo entry or add a new one referencing the photo path:
   ```ts
   {
     id: "my-photo",
     title: "Your Custom Title",
     category: "vacations",
     src: "/memories/birthday/WhatsApp Image 2026-11-09 at 11.17.00 PM.jpeg",
     caption: "Your personal romantic caption here",
     date: "Mussoorie Vacation",
     location: "Mall Road",
     rotation: -1.5,
   }
   ```
4. Save the file. The Vite dev server will instantly hot-reload with your changes!

---

## 5. Privacy & Asset Protection

- Original files are **never** altered or overwritten.
- `index.html` contains `<meta name="robots" content="noindex, nofollow">` to prevent web crawlers from indexing personal photographs.
- The project is configured for private local preview or secure password-protected hosting.
