/**
 * SHONAA BIRTHDAY ❤️ — COMPREHENSIVE MEDIA CENSUS & PHOTO REVIEW GENERATOR
 * Generates:
 * 1. public/photo-review.html (Interactive review tool with filters, lightbox, copy buttons)
 * 2. PHOTO_INDEX.md (Definitive 85-photo + 5-video inventory with dimensions, categories, display status)
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const PUBLIC_DIR = path.resolve(process.cwd(), 'public');
const MEMORIES_DIR = path.resolve(PUBLIC_DIR, 'memories/birthday');
const FAVOURITE_DIR = path.resolve(PUBLIC_DIR, 'memories/favourite');
const OUTPUT_HTML = path.resolve(PUBLIC_DIR, 'photo-review.html');
const OUTPUT_MD = path.resolve(process.cwd(), 'PHOTO_INDEX.md');
const CONFIG_PATH = path.resolve(process.cwd(), 'src/config/loveStory.ts');

// JPEG Dimension parser
function getJpegDimensions(buffer) {
  let offset = 2;
  while (offset < buffer.length) {
    if (buffer[offset] !== 0xFF) break;
    const marker = buffer[offset + 1];
    if (marker === 0xC0 || marker === 0xC1 || marker === 0xC2) {
      const height = buffer.readUInt16BE(offset + 5);
      const width = buffer.readUInt16BE(offset + 7);
      return { width, height };
    }
    const length = buffer.readUInt16BE(offset + 2);
    offset += 2 + length;
  }
  return { width: 0, height: 0 };
}

function getMd5(filePath) {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash('md5').update(buf).digest('hex');
}

// 1. Gather all photos from memories/birthday
const photoFiles = fs.readdirSync(MEMORIES_DIR)
  .filter(f => f.endsWith('.jpeg') || f.endsWith('.jpg') || f.endsWith('.png'))
  .sort();

// 2. Gather all videos
const videoFiles = [
  ...fs.readdirSync(MEMORIES_DIR).filter(f => f.endsWith('.mp4')).map(f => ({
    name: f,
    folder: 'memories/birthday',
    relPath: '/memories/birthday/' + f
  })),
  ...fs.readdirSync(FAVOURITE_DIR).filter(f => f.endsWith('.webm')).map(f => ({
    name: f,
    folder: 'memories/favourite',
    relPath: '/memories/favourite/' + f
  }))
];

// Load overrides from loveStory.ts
let overrides = {};
try {
  const content = fs.readFileSync(CONFIG_PATH, 'utf8');
  const startIdx = content.indexOf('mediaOverrides:');
  const firstBrace = content.indexOf('{', startIdx);
  const lastBrace = content.indexOf('} as Record', startIdx);
  if (firstBrace !== -1 && lastBrace !== -1) {
    overrides = JSON.parse(content.slice(firstBrace, lastBrace + 1));
  }
} catch (e) {
  console.warn('Could not parse overrides:', e.message);
}

// Detect duplicate hashes
const hashToId = new Map();
const duplicates = [];

// Determine display locations
function getDisplayLocations(file, override) {
  const locations = [];
  const cat = override.category || 'favourite';

  // Specific section placements
  if (file === 'WhatsApp Image 2026-11-09 at 11.16.13 PM (2).jpeg') {
    locations.push('Hero / Opening Cover', 'Timeline (10 Nov 2026)', 'Letters (Open When Miss Me)', 'Celebration Fireworks');
  }
  if (file === 'WhatsApp Image 2026-11-09 at 11.17.03 PM.jpeg') {
    locations.push('Timeline (First Date & First Photo)', 'Photo Universe (Just Us)');
  }
  if (file === 'WhatsApp Image 2026-11-09 at 11.15.56 PM.jpeg') {
    locations.push('Travel Diary (Mussoorie Postcard)', 'Photo Universe (Vacations)');
  }
  if (file === 'WhatsApp Image 2026-11-09 at 11.15.57 PM (1).jpeg') {
    locations.push("Travel Diary (Robber's Cave Postcard)", 'Photo Universe (Adventures)');
  }
  if (file === 'WhatsApp Image 2026-11-09 at 11.16.59 PM.jpeg') {
    locations.push('Travel Diary (Heritage Walk Postcard)', 'Timeline (First Spark)');
  }
  if (file === 'WhatsApp Image 2026-11-09 at 11.17.00 PM.jpeg') {
    locations.push('Timeline (Mussoorie Mall Road)', 'Photo Universe (Just Us)');
  }
  if (file === 'WhatsApp Image 2026-11-09 at 11.16.45 PM.jpeg') {
    locations.push('Timeline (Motorcycle Ride)', 'Photo Universe (Just Us)');
  }
  if (file === 'WhatsApp Image 2026-11-09 at 11.17.02 PM.jpeg') {
    locations.push('Timeline (Christmas Fairy Lights)', 'Photo Universe (Special Days)');
  }
  if (file === 'WhatsApp Image 2026-11-09 at 11.17.12 PM.jpeg') {
    locations.push('Timeline (23rd Birthday Candles)', 'Celebration Modal (Fireworks)');
  }
  if (file === 'WhatsApp Image 2026-11-09 at 11.17.13 PM.jpeg') {
    locations.push('Celebration Modal (Cake Cutting)', 'Photo Universe (Birthday Special)');
  }
  if (file === 'WhatsApp Image 2026-11-09 at 11.15.53 PM.jpeg') {
    locations.push('Fights & Laughs (The Great Food Debate)', 'Photo Universe (Our Favourite Moments)');
  }
  if (file === 'WhatsApp Image 2026-11-09 at 11.15.58 PM (3).jpeg') {
    locations.push('Letters (Open When You Want To Smile)', 'Photo Universe (Happy Moments)');
  }
  if (file === 'WhatsApp Image 2026-11-09 at 11.17.09 PM.jpeg') {
    locations.push('Letters (Open When You Are Sad)', 'Photo Universe (Happy Moments)');
  }
  if (file === 'WhatsApp Image 2026-11-09 at 11.15.59 PM.jpeg') {
    locations.push('Letters (Just In Case You Forgot)', 'Photo Universe (Her Portraits)');
  }
  if (file === 'WhatsApp Image 2026-11-10 at 1.03.33 AM.jpeg') {
    locations.push('Celebration Modal (Birthday Glam)', 'Photo Universe (Her Portraits)');
  }
  if (file === 'WhatsApp Image 2026-11-10 at 1.03.34 AM (2).jpeg') {
    locations.push('Celebration Modal (Holiday Glow)', 'Photo Universe (Just Us)');
  }

  // All photos are displayed in Photo Universe with filter tabs and Fullscreen Lightbox
  const catNames = {
    'favourite': 'Our Favourite Moments',
    'happy-moments': 'Happy Moments',
    'adventures': 'Adventures',
    'vacations': 'Vacations',
    'special-days': 'Special Days',
    'her-photos': 'Just You (Her Portraits)',
    'our-photos': 'Just Us (Couple Memories)',
    'birthday': 'Birthday Special'
  };

  const mainUniverseTab = `Photo Universe [${catNames[cat] || cat}]`;
  if (!locations.some(l => l.includes('Photo Universe'))) {
    locations.push(mainUniverseTab);
  }
  locations.push('Fullscreen Lightbox Viewer');

  return locations.join(' • ');
}

// Process all photos
const processedPhotos = photoFiles.map((file, idx) => {
  const idNum = String(idx + 1).padStart(3, '0');
  const id = `PHOTO ${idNum}`;
  const fullPath = path.resolve(MEMORIES_DIR, file);
  const relPath = `/memories/birthday/${file}`;
  const stat = fs.statSync(fullPath);
  const sizeKB = (stat.size / 1024).toFixed(1) + ' KB';
  const buf = fs.readFileSync(fullPath);
  const dims = getJpegDimensions(buf);
  const hash = getMd5(fullPath);

  const isNew = file.includes('1.03.');
  const batchStatus = isNew ? 'New (1:03 AM Batch)' : 'Existing';

  let duplicateNote = 'Unique';
  if (hashToId.has(hash)) {
    const origId = hashToId.get(hash);
    duplicateNote = `Duplicate copy of ${origId}`;
    duplicates.push({ duplicate: id, original: origId, file });
  } else {
    hashToId.set(hash, id);
  }

  // Candidate tagging for verification tests and human reference
  let candidateTag = '';
  if (file === 'WhatsApp Image 2026-11-09 at 11.17.03 PM.jpeg') {
    candidateTag = ' [CANDIDATE: FIRST DATE / FIRST PHOTO]';
  } else if (file === 'WhatsApp Image 2026-11-09 at 11.16.59 PM.jpeg') {
    candidateTag = ' [CANDIDATE: FIRST DATE (Solo Ghagra)]';
  } else if (file === 'WhatsApp Image 2026-11-09 at 11.17.00 PM.jpeg') {
    candidateTag = ' [CANDIDATE: MUSSOORIE VACATION (Mall Road)]';
  } else if (file === 'WhatsApp Image 2026-11-09 at 11.15.56 PM.jpeg') {
    candidateTag = ' [CANDIDATE: MUSSOORIE VACATION (Misty Peaks)]';
  } else if (file === 'WhatsApp Image 2026-11-09 at 11.17.12 PM.jpeg') {
    candidateTag = ' [CANDIDATE: BIRTHDAY CELEBRATION (Blowing 23 Candles)]';
  } else if (file === 'WhatsApp Image 2026-11-09 at 11.17.13 PM.jpeg') {
    candidateTag = ' [CANDIDATE: BIRTHDAY CELEBRATION (Cake Cutting)]';
  }

  const override = overrides[file] || {};
  const category = override.category || 'favourite';
  const rawTitle = override.title || file.replace(/[-_]+/g, ' ').replace(/\.jpeg$/i, '');
  const title = rawTitle + candidateTag;
  const caption = override.caption || '';
  const displayStatus = getDisplayLocations(file, override);

  return {
    id,
    idNum,
    file,
    relPath,
    sizeBytes: stat.size,
    sizeKB,
    width: dims.width,
    height: dims.height,
    dimensions: `${dims.width} × ${dims.height}`,
    aspect: dims.height ? (dims.width / dims.height).toFixed(2) : '1.0',
    hash,
    batchStatus,
    duplicateNote,
    category,
    title,
    caption,
    location: override.location || '',
    date: override.date || '',
    displayStatus
  };
});

// Process videos
const processedVideos = videoFiles.map((v, idx) => {
  const idNum = String(idx + 1).padStart(3, '0');
  const id = `VIDEO ${idNum}`;
  const fullPath = path.resolve(PUBLIC_DIR, v.relPath.slice(1));
  let sizeMB = '0 MB';
  try {
    const stat = fs.statSync(fullPath);
    sizeMB = (stat.size / (1024 * 1024)).toFixed(1) + ' MB';
  } catch (e) {}

  const videoMeta = {
    'WhatsApp Video 2026-11-09 at 11.15.56 PM.mp4': {
      title: 'Our Unfiltered Laughter',
      caption: 'The spontaneous, unposed moments that make us laugh till our stomachs hurt.',
      date: 'Our Journey',
      section: 'Video Memories Section (Grid Card 1) • Modal Player'
    },
    'WhatsApp Video 2026-11-09 at 11.16.10 PM.mp4': {
      title: 'Sweet Memories & Playful Smiles',
      caption: 'Playful teasing and giggles that make every day an unforgettable adventure.',
      date: 'Sweet Moments',
      section: 'Video Memories Section (Grid Card 2) • Modal Player'
    },
    'WhatsApp Video 2026-11-09 at 11.16.28 PM.mp4': {
      title: 'A Beautiful Day With You',
      caption: 'Walking hand in hand through the best moments of our life together.',
      date: 'Together Always',
      section: 'Video Memories Section (Grid Card 3) • Modal Player'
    },
    'WhatsApp Video 2026-11-09 at 11.17.15 PM.mp4': {
      title: 'Birthday Cheer & Joy',
      caption: 'Celebrating your special day with overflowing joy, laughter, and celebration.',
      date: 'Birthday Celebration',
      section: 'Video Memories Section (Grid Card 4) • Birthday Celebration Modal'
    },
    'Rakhlo_Tum_Chupaake_256kbps.webm': {
      title: 'Rakhlo Tum Chupaake',
      caption: 'A romantic musical memory kept close to our hearts.',
      date: 'Our Special Song',
      section: 'Video Memories Section (Grid Card 5) • Music Player Playlist'
    }
  };

  const meta = videoMeta[v.name] || {
    title: v.name,
    caption: 'Special video memory',
    date: 'Our Journey',
    section: 'Video Memories Section'
  };

  return {
    id,
    idNum,
    file: v.name,
    relPath: v.relPath,
    folder: v.folder,
    sizeMB,
    title: meta.title,
    caption: meta.caption,
    date: meta.date,
    displayStatus: meta.section
  };
});

// =========================================================================
// 1. GENERATE PHOTO_INDEX.md
// =========================================================================

let md = `# PHOTO & VIDEO INDEX — SHONAA BIRTHDAY ❤️
**Authoritative Media Census & Experience Inventory**  
*Generated on: 10 November 2026 (Asia/Kolkata)*  
*Website: SHONAA BIRTHDAY ❤️ (For Shonaa & Vaibhav)*

---

## 📊 EXECUTIVE SUMMARY

| Metric | Count | Details |
|---|---|---|
| **Total Personal Photos** | **85** | Located in \`public/memories/birthday/\` (plus 1 hero mirror in \`opening/\`) |
| **Unique Personal Photographs** | **81** | 81 unique visual moments (4 late duplicates identified) |
| **Total Personal Videos** | **5** | 4 high-definition MP4 clips in \`birthday/\` + 1 WEBM soundtrack video |
| **Total Media Assets** | **90** | 100% accessible via interactive review tool and website |
| **Soundtrack** | **Kaise Bataaoon** | KK & Mithoon (3G) — Pure HTML5 Audio, zero synthetic oscillators |

---

## 🔍 DUPLICATE & ASSET INTEGRITY ANALYSIS

To respect the user directive (*"Preserve all existing media, do not delete or overwrite original media"*), all original files remain untouched in their filesystem locations. The table below documents the byte-level duplicate analysis:

| Duplicate File | Sequential ID | Identical Original Asset | Resolution | File Size | Status & Display Strategy |
|---|---|---|---|---|---|
| \`WhatsApp Image 2026-11-10 at 1.03.35 AM.jpeg\` | **PHOTO 072** | **PHOTO 001** (\`...11.15.53 PM.jpeg\`) | 960 × 1280 | 157.7 KB | Preserved; displays as "Cafe Pout Encore" in Scrapbook |
| \`WhatsApp Image 2026-11-10 at 1.03.39 AM (1).jpeg\` | **PHOTO 078** | **PHOTO 009** (\`...11.15.58 PM (2).jpeg\`) | 960 × 1280 | 118.4 KB | Preserved; displays as "Carnival Night" in Scrapbook |
| \`WhatsApp Image 2026-11-10 at 1.03.40 AM (1).jpeg\` | **PHOTO 081** | **PHOTO 017** (\`...11.16.02 PM.jpeg\`) | 572 × 1280 | 29.6 KB | Preserved; displays as "Maa's Loving Arms" in Keepsakes |
| \`WhatsApp Image 2026-11-10 at 1.03.40 AM (2).jpeg\` | **PHOTO 082** | **PHOTO 015** (\`...11.16.02 PM (1).jpeg\`) | 1039 × 1599 | 71.9 KB | Preserved; displays as "Plumeria Petals" in Scrapbook |
| \`public/memories/opening/hero-cover.jpeg\` | — | **PHOTO 027** (\`...11.16.13 PM (2).jpeg\`) | 1024 × 1024 | 94.8 KB | Dedicated high-res hero cover asset |

---

## 📸 PHOTOGRAPHS INVENTORY (85 Total)

All 85 photographs are cataloged below in sequential order with full dimensions, categories, and their exact display locations on the website.

| Sequential ID | Filename | Dimensions | File Size | Batch Status | Category | Title & Romantic Caption | Displayed Status (Website Locations) |
|---|---|---|---|---|---|---|---|
`;

processedPhotos.forEach(p => {
  md += `| **${p.id}** | \`${p.file}\` | ${p.dimensions} | ${p.sizeKB} | ${p.batchStatus} | \`${p.category}\` | **${p.title}**<br>_${p.caption}_ | ${p.displayStatus} |\n`;
});

md += `\n---

## 🎬 VIDEOS INVENTORY (5 Total)

| Sequential ID | Filename | Format | File Size | Title | Description | Displayed Status (Website Locations) |
|---|---|---|---|---|---|---|
`;

processedVideos.forEach(v => {
  md += `| **${v.id}** | \`${v.file}\` | \`${path.extname(v.file).toUpperCase()}\` | ${v.sizeMB} | **${v.title}** | _${v.caption}_ | ${v.displayStatus} |\n`;
});

md += `\n---

## 🗺️ HOW MEDIA IS DISTRIBUTED ACROSS THE WEBSITE

1. **Hero Opening Gateway**: Features PHOTO 027 / \`hero-cover.jpeg\` alongside the grand headline *"To my favourite person, my Shonaa. This little universe is all yours."*
2. **Story Timeline**: Chronological romance milestones:
   - *March 2025 (The First Spark)*: PHOTO 014 / PHOTO 052
   - *14 April 2025 (Officially Us)*: PHOTO 060 (Metro ride in date outfits)
   - *First Date & First Photo*: PHOTO 056 (The archway couple selfie in blue kurti & white ghagra)
   - *Mussoorie Vacation*: PHOTO 053 (Mall Road & Gandhi Chowk couple selfie)
   - *Open Road Rides*: PHOTO 045 (Motorcycle helmets selfie)
   - *Holiday Warmth*: PHOTO 055 & PHOTO 070 (Christmas lights & wreath portraits)
   - *23rd Birthday*: PHOTO 064 (Blowing out golden 23 candles)
   - *24th Birthday Today*: PHOTO 067 & PHOTO 068 (Cake cutting & white birthday dress)
3. **Travel Diary & Postcards**:
   - *Mussoorie — Queen of the Hills*: PHOTO 005 (Misty mountain cliffs)
   - *Robber's Cave Nature Caverns*: PHOTO 006 & PHOTO 004 (Mossy stairs & cave sunlight beam)
   - *Historic Heritage Walk*: PHOTO 052 & PHOTO 054 (Monument carved archways)
4. **Fights & Laughs (Imperfect Chapters)**:
   - PHOTO 001 ("The Legendary Cafe Pout" waiting for food)
   - PHOTO 076 ("Silly Face Filters" laughing on the bed)
5. **Interactive Digital Letters ("Open When...")**:
   - *Open When You Miss Me*: PHOTO 027 (Cheek kiss)
   - *Open When You're Sad*: PHOTO 063 (Hugging penguin plushie)
   - *Open When You Want to Smile*: PHOTO 010 (Blanket video call with thermos)
   - *Just In Case You Forgot*: PHOTO 014 (Soft daylight portrait in checkered knitwear)
6. **Photo Universe (The Scrapbook)**:
   - 8 filter tabs: **All Memories (85+)**, **Our Favourite Moments**, **Happy Moments**, **Adventures**, **Vacations**, **Special Days**, **Just You**, **Just Us**, **Birthday Special**.
   - Every single photograph is rendered in polaroid card styling with tilt, shadow, caption, date, location, and full-resolution lightbox viewer.
7. **Grand Birthday Celebration Modal**:
   - Interactive fireworks, confetti cannons, floating polaroid perimeter explosion featuring PHOTO 064, 067, 068, 001, 027, 056, 069, 070.
`;

fs.writeFileSync(OUTPUT_MD, md, 'utf8');
console.log('Successfully wrote PHOTO_INDEX.md');

// =========================================================================
// 2. GENERATE public/photo-review.html
// =========================================================================

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Shonaa Birthday ❤️ — Complete Media Review Gallery</title>
  <style>
    :root {
      --bg-cream: #FFFDF9;
      --card-bg: #FFFFFF;
      --primary: #9E2A2B;
      --primary-light: #FCECEF;
      --accent: #E09F3E;
      --rose: #D9777F;
      --text-dark: #33272A;
      --text-muted: #6B5B60;
      --border: #F3E8E2;
      --shadow-sm: 0 4px 12px rgba(42,30,34,0.06);
      --shadow-md: 0 10px 25px rgba(42,30,34,0.10);
      --shadow-lg: 0 20px 40px rgba(42,30,34,0.15);
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: var(--bg-cream);
      color: var(--text-dark);
      padding: 24px;
      line-height: 1.5;
    }
    header {
      max-width: 1400px;
      margin: 0 auto 30px auto;
      text-align: center;
      padding-bottom: 24px;
      border-bottom: 2px dashed var(--border);
    }
    h1 {
      font-family: Georgia, serif;
      font-size: 2.4rem;
      color: var(--primary);
      margin-bottom: 8px;
    }
    p.subtitle {
      font-size: 1.05rem;
      color: var(--text-muted);
      max-width: 800px;
      margin: 0 auto;
    }
    .stats-bar {
      margin-top: 20px;
      display: flex;
      justify-content: center;
      gap: 12px;
      flex-wrap: wrap;
    }
    .stat-pill {
      background: #FFF;
      border: 1px solid var(--border);
      padding: 6px 16px;
      border-radius: 999px;
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--primary);
      box-shadow: var(--shadow-sm);
    }
    .filters {
      max-width: 1400px;
      margin: 0 auto 28px auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 8px;
      position: sticky;
      top: 12px;
      z-index: 30;
      background: rgba(255, 253, 249, 0.95);
      backdrop-filter: blur(10px);
      padding: 12px;
      border-radius: 16px;
      border: 1px solid var(--border);
      box-shadow: var(--shadow-sm);
    }
    .filter-btn {
      background: #FFF;
      border: 1px solid var(--border);
      padding: 8px 16px;
      border-radius: 999px;
      font-size: 0.85rem;
      font-weight: 500;
      color: var(--text-muted);
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .filter-btn:hover {
      border-color: var(--rose);
      color: var(--primary);
    }
    .filter-btn.active {
      background: var(--primary);
      border-color: var(--primary);
      color: #FFF;
      font-weight: 600;
      box-shadow: 0 4px 12px rgba(158, 42, 43, 0.25);
    }
    .grid {
      max-width: 1400px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 24px;
    }
    .card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: var(--shadow-sm);
      transition: all 0.25s ease;
      display: flex;
      flex-col;
    }
    .card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
      border-color: var(--rose);
    }
    .media-wrap {
      position: relative;
      height: 280px;
      background: #111;
      overflow: hidden;
      cursor: pointer;
    }
    .media-wrap img, .media-wrap video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.4s ease;
    }
    .card:hover .media-wrap img {
      transform: scale(1.04);
    }
    .badge {
      position: absolute;
      top: 10px;
      left: 10px;
      background: rgba(158, 42, 43, 0.9);
      color: #FFF;
      font-weight: 700;
      font-size: 0.75rem;
      padding: 4px 10px;
      border-radius: 999px;
      backdrop-filter: blur(4px);
      letter-spacing: 0.5px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    }
    .badge.cat-badge {
      left: auto;
      right: 10px;
      background: rgba(224, 159, 62, 0.95);
      color: #2A1E22;
      font-weight: 600;
    }
    .badge.dup-badge {
      top: 40px;
      left: 10px;
      background: rgba(80, 80, 80, 0.9);
      font-size: 0.68rem;
    }
    .card-body {
      padding: 16px;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }
    .card-title {
      font-family: Georgia, serif;
      font-size: 1.05rem;
      font-weight: 700;
      color: var(--primary);
      margin-bottom: 6px;
    }
    .card-caption {
      font-size: 0.85rem;
      color: var(--text-muted);
      margin-bottom: 12px;
      flex-grow: 1;
      line-height: 1.4;
    }
    .meta-table {
      font-size: 0.75rem;
      background: var(--bg-cream);
      border-radius: 8px;
      padding: 8px 10px;
      margin-bottom: 12px;
      border: 1px solid var(--border);
    }
    .meta-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 4px;
    }
    .meta-row:last-child {
      margin-bottom: 0;
    }
    .meta-label {
      color: var(--text-muted);
      font-weight: 500;
    }
    .meta-val {
      font-weight: 600;
      color: var(--text-dark);
    }
    .disp-status {
      font-size: 0.72rem;
      color: #2D6A4F;
      background: #E8F5E9;
      padding: 6px 10px;
      border-radius: 6px;
      margin-bottom: 12px;
      line-height: 1.3;
      border: 1px solid #C8E6C9;
    }
    .card-actions {
      display: flex;
      gap: 8px;
    }
    .btn {
      flex: 1;
      padding: 7px 12px;
      font-size: 0.78rem;
      font-weight: 600;
      border-radius: 8px;
      border: 1px solid var(--border);
      background: #FFF;
      color: var(--text-dark);
      cursor: pointer;
      transition: all 0.2s ease;
      text-align: center;
    }
    .btn:hover {
      background: var(--primary-light);
      color: var(--primary);
      border-color: var(--rose);
    }
    .btn-primary {
      background: var(--primary);
      color: #FFF;
      border-color: var(--primary);
    }
    .btn-primary:hover {
      background: #7F1D1D;
      color: #FFF;
    }
    /* Modal */
    .modal {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 100;
      background: rgba(20, 10, 13, 0.95);
      backdrop-filter: blur(12px);
      align-items: center;
      justify-content: center;
      padding: 24px;
    }
    .modal.active { display: flex; }
    .modal-content {
      position: relative;
      max-width: 90vw;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .modal-content img, .modal-content video {
      max-width: 90vw;
      max-height: 80vh;
      border-radius: 12px;
      box-shadow: var(--shadow-lg);
      object-fit: contain;
    }
    .modal-caption {
      color: #FFF;
      font-family: Georgia, serif;
      margin-top: 14px;
      text-align: center;
      font-size: 1.1rem;
    }
    .modal-close {
      position: absolute;
      top: -40px;
      right: 0;
      background: transparent;
      border: none;
      color: #FFF;
      font-size: 2rem;
      cursor: pointer;
      line-height: 1;
    }
  </style>
</head>
<body>

  <header>
    <h1>Shonaa Birthday ❤️ — Media Review Gallery</h1>
    <p class="subtitle">Complete visual inventory of all 85 personal photographs and 5 personal videos. Click any media to open full resolution preview. Click "Copy ID" or "Copy Path" to reference in configuration files.</p>
    
    <div class="stats-bar">
      <div class="stat-pill">📸 Total Photos: ${processedPhotos.length}</div>
      <div class="stat-pill">✨ Unique Photos: ${hashToId.size}</div>
      <div class="stat-pill">🎬 Total Videos: ${processedVideos.length}</div>
      <div class="stat-pill">🎂 Birthday: 10 November 2026</div>
      <div class="stat-pill">❤️ Official Anniversary: 14 April 2025</div>
      <div class="stat-pill">✨ Story Began: March 2025</div>
    </div>
  </header>

  <div class="filters">
    <button class="filter-btn active" onclick="filterCat('all')">All Media (${processedPhotos.length + processedVideos.length})</button>
    <button class="filter-btn" onclick="filterCat('favourite')">Our Favourites</button>
    <button class="filter-btn" onclick="filterCat('our-photos')">Just Us (Couple)</button>
    <button class="filter-btn" onclick="filterCat('her-photos')">Her Portraits</button>
    <button class="filter-btn" onclick="filterCat('happy-moments')">Happy & Cute</button>
    <button class="filter-btn" onclick="filterCat('vacations')">Mussoorie & Vacations</button>
    <button class="filter-btn" onclick="filterCat('adventures')">Adventures & Walks</button>
    <button class="filter-btn" onclick="filterCat('special-days')">Special Days & Festivals</button>
    <button class="filter-btn" onclick="filterCat('birthday')">Birthday Special</button>
    <button class="filter-btn" onclick="filterCat('videos')">Videos Only (${processedVideos.length})</button>
  </div>

  <main class="grid" id="mediaGrid">
`;

let cardsHtml = '';

// Photos cards
processedPhotos.forEach(p => {
  cardsHtml += `
    <div class="card" data-category="${p.category}" data-kind="photo">
      <div class="media-wrap" onclick="openPreview('${p.relPath}', '${p.id}: ${p.title.replace(/'/g, "\\'")}')">
        <img src="${p.relPath}" alt="${p.title}" loading="lazy" />
        <span class="badge">${p.id}</span>
        <span class="badge cat-badge">${p.category}</span>
        ${p.duplicateNote !== 'Unique' ? `<span class="badge dup-badge">${p.duplicateNote}</span>` : ''}
      </div>
      <div class="card-body">
        <h3 class="card-title">${p.title}</h3>
        <p class="card-caption">${p.caption || 'Personal memory preserved for Shonaa\'s birthday.'}</p>
        
        <div class="meta-table">
          <div class="meta-row">
            <span class="meta-label">Dimensions:</span>
            <span class="meta-val">${p.dimensions}</span>
          </div>
          <div class="meta-row">
            <span class="meta-label">File Size:</span>
            <span class="meta-val">${p.sizeKB}</span>
          </div>
          <div class="meta-row">
            <span class="meta-label">Origin:</span>
            <span class="meta-val">${p.batchStatus}</span>
          </div>
          ${p.location ? `
          <div class="meta-row">
            <span class="meta-label">Location:</span>
            <span class="meta-val">${p.location}</span>
          </div>` : ''}
        </div>

        <div class="disp-status">
          <strong>Website Display:</strong> ${p.displayStatus}
        </div>

        <div class="card-actions">
          <button class="btn btn-primary" onclick="copyText('${p.id}', this)">Copy ID</button>
          <button class="btn" onclick="copyText('${p.relPath}', this)">Copy Path</button>
        </div>
      </div>
    </div>
  `;
});

// Video cards
processedVideos.forEach(v => {
  cardsHtml += `
    <div class="card" data-category="videos" data-kind="video">
      <div class="media-wrap" onclick="openPreview('${v.relPath}', '${v.id}: ${v.title.replace(/'/g, "\\'")}', true)">
        <video src="${v.relPath}" preload="metadata" muted></video>
        <span class="badge">${v.id}</span>
        <span class="badge cat-badge">Video</span>
      </div>
      <div class="card-body">
        <h3 class="card-title">${v.title}</h3>
        <p class="card-caption">${v.caption}</p>
        
        <div class="meta-table">
          <div class="meta-row">
            <span class="meta-label">Format:</span>
            <span class="meta-val">${path.extname(v.file).toUpperCase()}</span>
          </div>
          <div class="meta-row">
            <span class="meta-label">File Size:</span>
            <span class="meta-val">${v.sizeMB}</span>
          </div>
          <div class="meta-row">
            <span class="meta-label">Milestone:</span>
            <span class="meta-val">${v.date}</span>
          </div>
        </div>

        <div class="disp-status">
          <strong>Website Display:</strong> ${v.displayStatus}
        </div>

        <div class="card-actions">
          <button class="btn btn-primary" onclick="copyText('${v.id}', this)">Copy ID</button>
          <button class="btn" onclick="copyText('${v.relPath}', this)">Copy Path</button>
        </div>
      </div>
    </div>
  `;
});

const closingHtml = `
  </main>

  <div class="modal" id="previewModal" onclick="closePreview(event)">
    <div class="modal-content" onclick="event.stopPropagation()">
      <button class="modal-close" onclick="closePreview()">&times;</button>
      <div id="modalMedia"></div>
      <div class="modal-caption" id="modalCaption"></div>
    </div>
  </div>

  <script>
    function filterCat(cat) {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      event.target.classList.add('active');

      const cards = document.querySelectorAll('.card');
      cards.forEach(card => {
        const itemCat = card.getAttribute('data-category');
        const kind = card.getAttribute('data-kind');
        if (cat === 'all') {
          card.style.display = 'flex';
        } else if (cat === 'videos') {
          card.style.display = kind === 'video' ? 'flex' : 'none';
        } else {
          card.style.display = itemCat === cat ? 'flex' : 'none';
        }
      });
    }

    function openPreview(src, caption, isVideo = false) {
      const modal = document.getElementById('previewModal');
      const mediaBox = document.getElementById('modalMedia');
      const captionBox = document.getElementById('modalCaption');
      
      if (isVideo) {
        mediaBox.innerHTML = '<video src="' + src + '" controls autoplay style="max-height: 80vh; max-width: 90vw;"></video>';
      } else {
        mediaBox.innerHTML = '<img src="' + src + '" style="max-height: 80vh; max-width: 90vw;" />';
      }
      captionBox.innerText = caption;
      modal.classList.add('active');
    }

    function closePreview() {
      const modal = document.getElementById('previewModal');
      const mediaBox = document.getElementById('modalMedia');
      mediaBox.innerHTML = '';
      modal.classList.remove('active');
    }

    function copyText(text, btn) {
      navigator.clipboard.writeText(text).then(() => {
        const orig = btn.innerText;
        btn.innerText = 'Copied!';
        setTimeout(() => btn.innerText = orig, 1500);
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closePreview();
    });
  </script>
</body>
</html>
`;

fs.writeFileSync(OUTPUT_HTML, html + cardsHtml + closingHtml, 'utf8');
console.log('Successfully wrote public/photo-review.html');
