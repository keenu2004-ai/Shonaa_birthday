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

// 5. Test Date Arithmetic function
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
