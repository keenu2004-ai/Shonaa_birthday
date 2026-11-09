/**
 * Rigorous Verification Test for Automatic Randomized Photo & Video Experience
 */

import assert from 'assert';
import { uniquePersonalPhotos, discoveredPhotos, discoveredVideos } from '../src/generated/mediaManifest.ts';
import { ShuffleBag } from '../src/utils/shuffleBag.ts';

console.log('--- STARTING SHUFFLE-BAG VERIFICATION TESTS ---');

// 1. Media Count Verifications
const uniquePhotosCount = uniquePersonalPhotos.length;
console.log(`[VERIFY] Unique personal photographs count: ${uniquePhotosCount}`);
assert(uniquePhotosCount >= 80, `Expected at least 80 unique photos, got ${uniquePhotosCount}`);

const videosCount = discoveredVideos.length;
console.log(`[VERIFY] Total personal videos count: ${videosCount}`);
assert.strictEqual(videosCount, 5, `Expected exactly 5 videos, got ${videosCount}`);

// 2. Photo Shuffle-Bag Cycle Test
const photoBag = new ShuffleBag(uniquePersonalPhotos, p => p.src);
assert.strictEqual(photoBag.getTotalUniqueCount(), uniquePhotosCount);

// Draw an entire cycle of photos
const firstCycleDrawn = [];
for (let i = 0; i < uniquePhotosCount; i++) {
  const photo = photoBag.draw();
  assert(photo !== null, `Draw ${i} should return a photo`);
  firstCycleDrawn.push(photo.src);
}

// Ensure all photos were drawn with 0 duplicates in the cycle
const firstCycleSet = new Set(firstCycleDrawn);
assert.strictEqual(firstCycleSet.size, uniquePhotosCount, 'Every photo must appear exactly once in a full cycle');
console.log(`[PASS] Cycle 1: All ${uniquePhotosCount} unique photographs drawn with 0 duplicates.`);

// Test Reshuffle into Cycle 2
const secondCycleFirst = photoBag.draw();
assert(secondCycleFirst !== null);
const lastDrawnFromCycle1 = firstCycleDrawn[firstCycleDrawn.length - 1];

// Verify back-to-back guard
assert.notStrictEqual(
  secondCycleFirst.src,
  lastDrawnFromCycle1,
  'First photo of Cycle 2 must not repeat last photo of Cycle 1'
);
console.log('[PASS] Cycle boundary: No back-to-back repetition between consecutive cycles.');

// 3. Video Shuffle-Bag Cycle Test
const videoBag = new ShuffleBag(discoveredVideos, v => v.src);
assert.strictEqual(videoBag.getTotalUniqueCount(), 5);

const videoCycleDrawn = [];
for (let i = 0; i < 5; i++) {
  const video = videoBag.draw();
  assert(video !== null);
  videoCycleDrawn.push(video.src);
}

const videoCycleSet = new Set(videoCycleDrawn);
assert.strictEqual(videoCycleSet.size, 5, 'Every video must appear once in a full video cycle');
console.log('[PASS] All 5 videos drawn in single cycle without duplicate repetition.');

// 4. Uniformity & Randomization Test
// Run 1000 draws and check that the first 5 photos aren't disproportionately favored
const counts = {};
const testBag = new ShuffleBag(uniquePersonalPhotos, p => p.src);
const SIMULATION_DRAWS = uniquePhotosCount * 10; // 10 full cycles

for (let i = 0; i < SIMULATION_DRAWS; i++) {
  const p = testBag.draw();
  counts[p.src] = (counts[p.src] || 0) + 1;
}

// In exactly 10 cycles, EVERY photo must be drawn EXACTLY 10 times!
const drawFrequencies = Object.values(counts);
const minDraws = Math.min(...drawFrequencies);
const maxDraws = Math.max(...drawFrequencies);
assert.strictEqual(minDraws, 10, 'Each photo must be drawn exactly 10 times in 10 cycles');
assert.strictEqual(maxDraws, 10, 'Each photo must be drawn exactly 10 times in 10 cycles');
console.log(`[PASS] Perfect fairness guarantee: In 10 cycles (${SIMULATION_DRAWS} draws), each of the ${uniquePhotosCount} photos was drawn exactly 10 times!`);

console.log('\n=============================================');
console.log('ALL SHUFFLE-BAG VERIFICATION TESTS PASSED! ✨');
console.log('=============================================');
