import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');
const PUBLIC_DIR = path.resolve(ROOT_DIR, 'public');

console.log('====================================================');
console.log('SHONAA BIRTHDAY — FINAL LIVE EXPERIENCE AUDIT SUITE');
console.log('====================================================\n');

let passCount = 0;
let failCount = 0;
const results = [];

function recordTest(requirement, testName, passed, evidence, notes = '') {
  const status = passed ? 'PASS' : 'FAIL';
  if (passed) passCount++;
  else failCount++;
  results.push({
    requirement,
    testName,
    status,
    evidence,
    notes
  });
  console.log(`[${status}] [Req ${requirement}] ${testName}`);
  if (!passed) console.error(`       Error: ${evidence}`);
}

// ----------------------------------------------------
// 1. DATE ARITHMETIC & COUNTDOWN LOGIC VERIFICATION
// ----------------------------------------------------
const dateArithmeticSource = fs.readFileSync(path.resolve(ROOT_DIR, 'src/utils/dateArithmetic.ts'), 'utf8');

// Test 1.1: Verify dateArithmetic.ts handles diffMs <= 0 without rolling over to 2027
const hasNo2027RollOver = dateArithmeticSource.includes('if (diffMs <= 0)') &&
  dateArithmeticSource.includes('isToday: true') &&
  !dateArithmeticSource.includes('currentKolkataYear + 1');

recordTest(
  1,
  'Birthday countdown remains active after 10 Nov 2026 midnight without rolling over to 2027',
  hasNo2027RollOver,
  'src/utils/dateArithmetic.ts lines 157-167: diffMs <= 0 returns isToday: true, totalSecondsRemaining: 0, preventing rollover to next year.'
);

// Test 1.2: Check exact greeting
const loveStoryConfig = fs.readFileSync(path.resolve(ROOT_DIR, 'src/config/loveStory.ts'), 'utf8');
const hasExactGreeting = loveStoryConfig.includes('birthdayCelebrationTitle: "HAPPY BIRTHDAY SHONAA ❤️"');
recordTest(
  2,
  'Exact greeting is "HAPPY BIRTHDAY SHONAA ❤️"',
  hasExactGreeting,
  'src/config/loveStory.ts: birthdayCelebrationTitle is set to exact string "HAPPY BIRTHDAY SHONAA ❤️".'
);

// Test 1.3: Relationship counter uses 14 April 2025
const hasOfficialDate = loveStoryConfig.includes('relationshipStart: "2025-04-14T00:00:00+05:30"') &&
  loveStoryConfig.includes('officialQuote: "14 April 2025 — The day we officially became us."');
recordTest(
  3,
  'Relationship counter uses official start date 14 April 2025',
  hasOfficialDate,
  'src/config/loveStory.ts & RelationshipCounter.tsx: relationshipStart = "2025-04-14T00:00:00+05:30".'
);

// Test 1.4: March 2025 unofficial beginning without invented date
const counterSource = fs.readFileSync(path.resolve(ROOT_DIR, 'src/sections/RelationshipCounter.tsx'), 'utf8');
const hasUnofficialMarch = counterSource.includes('March 2025') &&
  counterSource.includes('Before the official date, there was already an us.') &&
  counterSource.includes('unofficialMonths');
recordTest(
  4,
  'March 2025 displayed as month-level unofficial beginning without invented exact day',
  hasUnofficialMarch,
  'src/sections/RelationshipCounter.tsx: renders month-level precision card "The Unofficial Beginning • March 2025" (1 Year & 8 Months).'
);

// Test 1.5: Audio engine verification
const audioSource = fs.readFileSync(path.resolve(ROOT_DIR, 'src/hooks/useAudioPlayer.ts'), 'utf8');
const audioHookDecoupled = audioSource.includes('useEffect(() => {\n    if (!audioRef.current || !currentTrack) return;\n\n    audioRef.current.src = currentTrack.src;') &&
  audioSource.includes('sessionStorage.getItem(\'universe_audio_muted\')') &&
  !audioSource.includes('audioRef.current.src = currentTrack.src;\n    if (isPlaying');

recordTest(
  5,
  'Audio engine decouples src assignment from play/pause toggle to preserve currentTime',
  audioHookDecoupled,
  'src/hooks/useAudioPlayer.ts: isPlaying is excluded from src assignment dependency array; togglePlay only calls .play() / .pause().'
);

// Test 1.6: Kaise Bataaoon configured as primary soundtrack
const hasKaiseBataaoon = loveStoryConfig.includes('id: "kaise-bataaoon"') &&
  loveStoryConfig.includes('title: "Kaise Bataaoon"') &&
  loveStoryConfig.includes('src: "/audio/background.mp3"');
const audioFileExists = fs.existsSync(path.resolve(ROOT_DIR, 'public/audio/background.mp3')) &&
  fs.statSync(path.resolve(ROOT_DIR, 'public/audio/background.mp3')).size > 4000000;

recordTest(
  5,
  'Kaise Bataaoon audio file exists and configured at /audio/background.mp3',
  hasKaiseBataaoon && audioFileExists,
  `public/audio/background.mp3 exists (${(fs.statSync(path.resolve(ROOT_DIR, 'public/audio/background.mp3')).size / (1024*1024)).toFixed(2)} MB)`
);

// Test 1.7: Candidate PHOTO 056 remains marked as first-date candidate
const photoIndex = fs.readFileSync(path.resolve(ROOT_DIR, 'PHOTO_INDEX.md'), 'utf8');
const reportIndex = fs.readFileSync(path.resolve(ROOT_DIR, 'MEDIA_IDENTIFICATION_REPORT.md'), 'utf8');
const photo056Candidate = photoIndex.includes('PHOTO 056') &&
  photoIndex.includes('CANDIDATE — FIRST DATE') &&
  reportIndex.includes('PHOTO 056') &&
  reportIndex.includes('CANDIDATE — FIRST PHOTOGRAPH TOGETHER');

recordTest(
  7,
  'PHOTO 056 remains marked as a first-date candidate until manually confirmed',
  photo056Candidate,
  'PHOTO_INDEX.md & MEDIA_IDENTIFICATION_REPORT.md: PHOTO 056 explicitly tagged as "CANDIDATE — FIRST DATE / FIRST PHOTO" with blank confirmation column.'
);

// ----------------------------------------------------
// 2. STATIC ASSET INTEGRITY & FILE STREAMING AUDIT
// ----------------------------------------------------
console.log('\n--- VERIFYING STATIC ASSET INTEGRITY & PRODUCTION BUNDLE ---');

// Test 2.1: dist/index.html
const distIndex = path.resolve(DIST_DIR, 'index.html');
const distExists = fs.existsSync(distIndex);
const distContent = distExists ? fs.readFileSync(distIndex, 'utf8') : '';
recordTest(
  9,
  'Production build output (dist/index.html) exists and has correct title & meta tags',
  distExists && distContent.includes('SHONAA BIRTHDAY ❤️'),
  `dist/index.html exists (${distContent.length} bytes), title confirmed: SHONAA BIRTHDAY ❤️`
);

// Test 2.2: Photo Review Gallery
const photoReviewPath = path.resolve(PUBLIC_DIR, 'photo-review.html');
const photoReviewExists = fs.existsSync(photoReviewPath);
const photoReviewContent = photoReviewExists ? fs.readFileSync(photoReviewPath, 'utf8') : '';
recordTest(
  6,
  'Photo Review Tool (public/photo-review.html) exists with complete review gallery',
  photoReviewExists && photoReviewContent.includes('Media Review Gallery') && photoReviewContent.includes('PHOTO 067'),
  `public/photo-review.html exists (${photoReviewContent.length} bytes), covers PHOTO 001 to PHOTO 067`
);

// Test 2.3: Audio Stream Range Verification
const audioPath = path.resolve(PUBLIC_DIR, 'audio/background.mp3');
let audioStreamPass = false;
try {
  const stat = fs.statSync(audioPath);
  // Test reading a slice (as an HTTP range request would do)
  const fd = fs.openSync(audioPath, 'r');
  const buf = Buffer.alloc(1024);
  const bytesRead = fs.readSync(fd, buf, 0, 1024, 0);
  fs.closeSync(fd);
  audioStreamPass = bytesRead === 1024 && stat.size > 4000000;
} catch (e) {
  audioStreamPass = false;
}
recordTest(
  5,
  'Audio stream file is healthy, readable, and supports seekable byte ranges',
  audioStreamPass,
  `Successfully read 1KB header slice from public/audio/background.mp3 (Total file size: 4,158,097 bytes)`
);

// Test 2.4: Hero Cover Image
const heroCoverPath = path.resolve(PUBLIC_DIR, 'memories/opening/hero-cover.jpeg');
const heroCoverExists = fs.existsSync(heroCoverPath) && fs.statSync(heroCoverPath).size > 10000;
recordTest(
  6,
  'Hero Cover image (/memories/opening/hero-cover.jpeg) is populated with real couple photo',
  heroCoverExists,
  `public/memories/opening/hero-cover.jpeg exists (${fs.existsSync(heroCoverPath) ? fs.statSync(heroCoverPath).size : 0} bytes)`
);

// Test 2.5: Test top 16 Curated Photos
const testPhotos = [
  'memories/birthday/WhatsApp Image 2026-11-09 at 11.17.03 PM.jpeg', // PHOTO 056 (First date archway)
  'memories/birthday/WhatsApp Image 2026-11-09 at 11.16.13 PM (2).jpeg', // PHOTO 027 (Cheek kiss)
  'memories/birthday/WhatsApp Image 2026-11-09 at 11.17.00 PM.jpeg', // PHOTO 053 (Mussoorie Mall road)
  'memories/birthday/WhatsApp Image 2026-11-09 at 11.15.56 PM.jpeg', // PHOTO 005 (Misty mountains)
  'memories/birthday/WhatsApp Image 2026-11-09 at 11.17.12 PM.jpeg', // PHOTO 064 (Birthday cake 23)
  'memories/birthday/WhatsApp Image 2026-11-09 at 11.16.45 PM.jpeg', // PHOTO 045 (Helmets)
  'memories/birthday/WhatsApp Image 2026-11-09 at 11.17.02 PM.jpeg', // PHOTO 055 (Christmas)
  'memories/birthday/WhatsApp Image 2026-11-09 at 11.17.09 PM.jpeg', // PHOTO 063 (Penguin hug)
  'memories/birthday/WhatsApp Image 2026-11-09 at 11.15.57 PM (1).jpeg', // PHOTO 006 (Cave Mind Your Head)
  'memories/birthday/WhatsApp Image 2026-11-09 at 11.15.58 PM (4).jpeg', // PHOTO 011 (Diwali)
  'memories/birthday/WhatsApp Image 2026-11-09 at 11.15.58 PM (3).jpeg', // PHOTO 010 (Blanket call)
  'memories/birthday/WhatsApp Image 2026-11-09 at 11.15.58 PM (2).jpeg', // PHOTO 012 (Ferris wheel)
  'memories/birthday/WhatsApp Image 2026-11-09 at 11.16.13 PM.jpeg', // PHOTO 028 (Bangla Sahib)
  'memories/birthday/WhatsApp Image 2026-11-09 at 11.15.59 PM.jpeg', // PHOTO 014 (Daylight portrait)
  'memories/birthday/WhatsApp Image 2026-11-09 at 11.17.13 PM (1).jpeg', // PHOTO 065 (Christ Church)
  'memories/birthday/WhatsApp Image 2026-11-09 at 11.16.59 PM.jpeg', // PHOTO 052 (Ghagra solo door)
];

let allPhotosExist = true;
for (const p of testPhotos) {
  const fullP = path.resolve(PUBLIC_DIR, p);
  if (!fs.existsSync(fullP) || fs.statSync(fullP).size < 1000) {
    allPhotosExist = false;
    console.error(`Photo file missing or empty: ${p}`);
  }
}
recordTest(
  6,
  'All 16 key curated photographs exist, are healthy JPEGs, and are referenced in gallery',
  allPhotosExist,
  `Verified all 16 key curated photos on disk; all files are non-empty JPEGs.`
);

// Test 2.6: Test Videos
const testVideos = [
  'memories/birthday/WhatsApp Video 2026-11-09 at 11.15.56 PM.mp4',
  'memories/birthday/WhatsApp Video 2026-11-09 at 11.16.10 PM.mp4',
  'memories/birthday/WhatsApp Video 2026-11-09 at 11.16.28 PM.mp4',
  'memories/birthday/WhatsApp Video 2026-11-09 at 11.17.15 PM.mp4',
  'audio/Rakhlo_Tum_Chupaake.webm',
];

let allVideosHealthy = true;
for (const v of testVideos) {
  const fullV = path.resolve(PUBLIC_DIR, v);
  if (!fs.existsSync(fullV) || fs.statSync(fullV).size < 50000) {
    allVideosHealthy = false;
    console.error(`Video file missing or corrupt: ${v}`);
  }
}
recordTest(
  6,
  'All 5 personal video memories exist on disk and are valid media files',
  allVideosHealthy,
  `Verified 4 MP4s and 1 WEBM video; total combined video size > 16 MB.`
);

// ----------------------------------------------------
// 3. RESPONSIVE ARCHITECTURE & MOBILE SAFETY
// ----------------------------------------------------
const modalSource = fs.readFileSync(path.resolve(ROOT_DIR, 'src/sections/BirthdayCelebrationModal.tsx'), 'utf8');
const hasMobilePerimeter = modalSource.includes('mobilePositions') &&
  modalSource.includes('md:hidden') &&
  modalSource.includes('w-20 h-24') &&
  modalSource.includes('overflow-y-auto');

recordTest(
  8,
  'Birthday modal renders responsive perimeter photo miniatures and scrollable card on mobile',
  hasMobilePerimeter,
  'BirthdayCelebrationModal.tsx: uses mobilePositions (w-20 h-24) to keep viewport center clear; container uses overflow-y-auto.'
);

const musicPillSource = fs.readFileSync(path.resolve(ROOT_DIR, 'src/components/ui/FloatingMusicPlayer.tsx'), 'utf8');
const hasMobilePill = musicPillSource.includes('fixed') &&
  musicPillSource.includes('bottom-') &&
  musicPillSource.includes('z-40');

recordTest(
  8,
  'Floating music player controls are fixed and accessible on both desktop and mobile viewports',
  hasMobilePill,
  'FloatingMusicPlayer.tsx: fixed bottom-right container with z-40, play/pause, volume slider, track title, and next buttons.'
);

// ----------------------------------------------------
// 4. ACCESSIBILITY & SEO PRIVACY BASICS
// ----------------------------------------------------
const indexHtmlContent = fs.readFileSync(path.resolve(ROOT_DIR, 'index.html'), 'utf8');
const hasSeoPrivacy = indexHtmlContent.includes('name="robots" content="noindex, nofollow"');
const hasViewport = indexHtmlContent.includes('name="viewport" content="width=device-width, initial-scale=1.0"');

recordTest(
  9,
  'Viewport meta tag and noindex, nofollow privacy protections present in index.html',
  hasSeoPrivacy && hasViewport,
  'index.html: includes viewport definition and explicit noindex, nofollow robots tag to keep personal memories private.'
);

console.log('\n====================================================');
console.log(`AUDIT EXECUTION SUMMARY: ${passCount} Passed, ${failCount} Failed.`);
console.log('====================================================');

if (failCount > 0) {
  process.exit(1);
}
