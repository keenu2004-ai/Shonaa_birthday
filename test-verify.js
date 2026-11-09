import fs from 'fs';
import path from 'path';

console.log('--- STARTING VERIFICATION TEST SUITE (SHONAA BIRTHDAY ❤️) ---');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passed++;
  } else {
    console.error(`[FAIL] ${message}`);
    failed++;
  }
}

// 1. Verify build output
assert(fs.existsSync('dist/index.html'), 'dist/index.html exists');
assert(fs.existsSync('dist/assets'), 'dist/assets bundle directory exists');

// 2. Verify media folder structure
const requiredFolders = [
  'public/memories/opening',
  'public/memories/favourite',
  'public/memories/happy-moments',
  'public/memories/vacations',
  'public/memories/travel',
  'public/memories/special-days',
  'public/memories/her-photos',
  'public/memories/our-photos',
  'public/memories/birthday',
  'public/videos/memories',
  'public/videos/vacations',
  'public/videos/special-moments',
  'public/audio',
  'public/fonts',
  'public/textures',
];

for (const folder of requiredFolders) {
  assert(fs.existsSync(folder), `Media folder exists: ${folder}`);
}

// 3. Verify placeholder SVGs exist (fallback safety)
const requiredPlaceholders = [
  'public/memories/opening/hero-cover.svg',
  'public/memories/favourite/favourite-1.svg',
  'public/memories/happy-moments/happy-1.svg',
  'public/memories/vacations/vacation-1.svg',
  'public/memories/travel/travel-1.svg',
  'public/memories/special-days/anniversary-1.svg',
  'public/memories/her-photos/her-portrait-1.svg',
  'public/memories/our-photos/our-photo-1.svg',
  'public/memories/birthday/birthday-cake.svg',
];

for (const p of requiredPlaceholders) {
  assert(fs.existsSync(p), `Placeholder SVG exists: ${p}`);
}

// 4. Verify central configuration file exists
assert(fs.existsSync('src/config/loveStory.ts'), 'src/config/loveStory.ts exists');

// 5. Verify Shonaa Birthday Personalization
const loveStoryConfig = fs.readFileSync('src/config/loveStory.ts', 'utf8');
assert(loveStoryConfig.includes('herName: "Shonaa"'), 'loveStory.ts has herName set to Shonaa');
assert(loveStoryConfig.includes('myName: "Vaibhav"'), 'loveStory.ts has myName set to Vaibhav');
assert(loveStoryConfig.includes('websiteTitle: "SHONAA BIRTHDAY ❤️"'), 'loveStory.ts has websiteTitle set to SHONAA BIRTHDAY ❤️');
assert(loveStoryConfig.includes('birthdayCelebrationTitle: "HAPPY BIRTHDAY SHONAA ❤️"'), 'loveStory.ts has birthdayCelebrationTitle set');
assert(loveStoryConfig.includes('2026-11-10T00:00:00+05:30'), 'loveStory.ts has exact birthday date configured in Asia/Kolkata');
assert(loveStoryConfig.includes('2025-04-14T00:00:00+05:30'), 'loveStory.ts has official relationship date (14 April 2025)');
assert(loveStoryConfig.includes('2025-03-01T00:00:00+05:30'), 'loveStory.ts has unofficial beginning date (March 2025)');

// 6. Verify HTML Title and Privacy Meta
const indexHtml = fs.readFileSync('index.html', 'utf8');
assert(indexHtml.includes('<title>SHONAA BIRTHDAY ❤️</title>'), 'index.html has title SHONAA BIRTHDAY ❤️');
assert(indexHtml.includes('name="robots" content="noindex, nofollow"'), 'index.html contains noindex, nofollow privacy meta tag');

// 7. Verify Audio Soundtrack
assert(fs.existsSync('public/audio/background.mp3'), 'public/audio/background.mp3 (Kaise Bataaoon) exists');
assert(fs.existsSync('public/audio/opening.mp3'), 'public/audio/opening.mp3 exists');
const audioHook = fs.readFileSync('src/hooks/useAudioPlayer.ts', 'utf8');
assert(!audioHook.includes('useEffect(() => {\n    if (!audioRef.current) return;\n    audioRef.current.src'), 'Audio hook decouples src assignment from play/pause toggle');

// 8. Verify Photo Review Tool & Index
assert(fs.existsSync('public/photo-review.html'), 'public/photo-review.html tool exists');
assert(fs.existsSync('PHOTO_INDEX.md'), 'PHOTO_INDEX.md inventory exists');
const photoIndexMd = fs.readFileSync('PHOTO_INDEX.md', 'utf8');
assert(photoIndexMd.includes('PHOTO 001'), 'PHOTO_INDEX.md contains PHOTO 001');
assert(photoIndexMd.includes('VIDEO 001'), 'PHOTO_INDEX.md contains VIDEO 001');
assert(photoIndexMd.includes('FIRST DATE'), 'PHOTO_INDEX.md contains identified FIRST DATE candidates');
assert(photoIndexMd.includes('MUSSOORIE'), 'PHOTO_INDEX.md contains identified MUSSOORIE candidates');
assert(photoIndexMd.includes('BIRTHDAY CELEBRATION'), 'PHOTO_INDEX.md contains identified BIRTHDAY CELEBRATION candidates');

// 9. Verify Relationship Counter Dual Display
const counterCode = fs.readFileSync('src/sections/RelationshipCounter.tsx', 'utf8');
assert(counterCode.includes('Before the official date'), 'RelationshipCounter displays unofficial start quote');
assert(counterCode.includes('The day we officially became us'), 'RelationshipCounter displays official start quote');
assert(counterCode.includes('AnimatedDigit'), 'RelationshipCounter features animated digit transitions');

// 10. Verify Birthday Modal & Video Player
const modalCode = fs.readFileSync('src/sections/BirthdayCelebrationModal.tsx', 'utf8');
assert(modalCode.includes('md:hidden') && modalCode.includes('w-20 h-24'), 'BirthdayCelebrationModal renders non-obstructive mobile photo miniatures');

const videoModalCode = fs.readFileSync('src/components/ui/VideoPlayerModal.tsx', 'utf8');
assert(videoModalCode.includes('preload="metadata"'), 'Video modal uses preload="metadata" for fast page loads');
assert(!videoModalCode.includes('autoPlay'), 'Video modal does not use autoPlay');

// 11. Verify Automatic Discovery Engine & Manifest
assert(fs.existsSync('scripts/discover-media.mjs'), 'Automatic media discovery script exists');
assert(fs.existsSync('src/generated/mediaManifest.ts'), 'Auto-generated media manifest exists');

const manifestCode = fs.readFileSync('src/generated/mediaManifest.ts', 'utf8');
assert(manifestCode.includes('export const discoveredPhotos'), 'mediaManifest exports discoveredPhotos');
assert(manifestCode.includes('export const discoveredBirthdayPhotos'), 'mediaManifest exports discoveredBirthdayPhotos');
assert(manifestCode.includes('export const discoveredHeroCoverPhoto'), 'mediaManifest exports discoveredHeroCoverPhoto');

console.log(`\n========================================`);
console.log(`Test Summary: ${passed} Passed, ${failed} Failed.`);
console.log(`========================================`);

if (failed > 0) {
  process.exit(1);
}
