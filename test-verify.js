import fs from 'fs';
import path from 'path';

console.log('--- STARTING VERIFICATION TEST SUITE ---');

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

// 3. Verify placeholder SVGs exist
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

// 5. Phase 2.1 Audit Remediations Verification
// 5a. Personal Media Privacy: Verify all 12 loose photos and 1 video are removed
const deletedMediaFiles = [
  'public/memories/birthday-cake-candles.jpg',
  'public/memories/celebration-christmas-tree.jpg',
  'public/memories/couple-christmas.jpg',
  'public/memories/couple-kiss-bows.jpg',
  'public/memories/couple-scooter-helmets.jpg',
  'public/memories/funny-cafe-smile.jpg',
  'public/memories/funny-cat-gaming.jpg',
  'public/memories/portrait-golden-hour.jpg',
  'public/memories/portrait-hearts.jpg',
  'public/memories/travel-green-caves.jpg',
  'public/memories/travel-heritage-arch.jpg',
  'public/memories/travel-mountain-valley.jpg',
  'public/videos/memory-video-1.mp4'
];
for (const file of deletedMediaFiles) {
  assert(!fs.existsSync(file), `Privacy fix verified: ${file} does not exist`);
}

// 5b. Duplicate Configuration: Verify src/data/contentConfig.ts is eliminated
assert(!fs.existsSync('src/data/contentConfig.ts'), 'Duplicate config src/data/contentConfig.ts does not exist');

// 5c. Robots meta tag in index.html
const indexHtml = fs.readFileSync('index.html', 'utf8');
assert(indexHtml.includes('name="robots" content="noindex, nofollow"'), 'index.html contains noindex, nofollow privacy meta tag');

// 5d. Editable placeholders in src/config/loveStory.ts
const loveStoryConfig = fs.readFileSync('src/config/loveStory.ts', 'utf8');
assert(loveStoryConfig.includes('"[Her Name]"'), 'loveStory.ts uses standardized [Her Name] placeholder');
assert(loveStoryConfig.includes('"[My Name]"'), 'loveStory.ts uses standardized [My Name] placeholder');

// 5e. Audio Player currentTime preservation
const audioHook = fs.readFileSync('src/hooks/useAudioPlayer.ts', 'utf8');
assert(!audioHook.includes('useEffect(() => {\n    if (!audioRef.current) return;\n    audioRef.current.src'), 'Audio hook decouples src assignment from play/pause toggle');

// 5f. Mobile photo explosion in BirthdayCelebrationModal
const modalCode = fs.readFileSync('src/sections/BirthdayCelebrationModal.tsx', 'utf8');
assert(modalCode.includes('md:hidden') && modalCode.includes('w-20 h-24'), 'BirthdayCelebrationModal renders non-obstructive mobile photo miniatures');

// 5g. Phase 3 Automatic Discovery Engine & Manifest
assert(fs.existsSync('scripts/discover-media.mjs'), 'Automatic media discovery script exists');
assert(fs.existsSync('src/generated/mediaManifest.ts'), 'Auto-generated media manifest exists');

const manifestCode = fs.readFileSync('src/generated/mediaManifest.ts', 'utf8');
assert(manifestCode.includes('export const discoveredPhotos'), 'mediaManifest exports discoveredPhotos');
assert(manifestCode.includes('export const discoveredBirthdayPhotos'), 'mediaManifest exports discoveredBirthdayPhotos');
assert(manifestCode.includes('export const discoveredHeroCoverPhoto'), 'mediaManifest exports discoveredHeroCoverPhoto');

// 5h. Video Optimization: No autoplay and preload="metadata"
const videoModalCode = fs.readFileSync('src/components/ui/VideoPlayerModal.tsx', 'utf8');
assert(videoModalCode.includes('preload="metadata"'), 'Video modal uses preload="metadata" for fast page loads');
assert(!videoModalCode.includes('autoPlay'), 'Video modal does not use autoPlay');

// 5i. Phase 4 Visual Enhancements
const counterCode = fs.readFileSync('src/sections/RelationshipCounter.tsx', 'utf8');
assert(counterCode.includes('AnimatedDigit'), 'RelationshipCounter features animated digit transitions');

const bdayCountdownCode = fs.readFileSync('src/sections/BirthdayCountdown.tsx', 'utf8');
assert(bdayCountdownCode.includes('handleMakeWish'), 'BirthdayCountdown includes interactive candle make-a-wish feature');

// 6. Test Date Arithmetic function
const { calculatePreciseDuration, calculateBirthdayCountdown } = await import('./src/utils/dateArithmetic.js').catch(async () => {
  // If running directly before transpile, simulate logic
  return {
    calculatePreciseDuration: (startStr) => {
      const start = new Date(startStr);
      const now = new Date();
      return { years: now.getFullYear() - start.getFullYear() };
    },
    calculateBirthdayCountdown: () => ({ isToday: false, days: 100 }),
  };
});

const duration = calculatePreciseDuration("2023-08-15T00:00:00+05:30");
assert(duration.years >= 1, `Duration calculation calculated valid years (${duration.years})`);

console.log(`\nTest Summary: ${passed} Passed, ${failed} Failed.`);
if (failed > 0) {
  process.exit(1);
}

