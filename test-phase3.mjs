/**
 * PHASE 3 VERIFICATION TEST SUITE
 * Tests auto-discovery, category mapping, overrides, and cleanup.
 */

import fs from 'fs';
import path from 'path';
import { discoverMedia, writeManifest } from './scripts/discover-media.mjs';

console.log('--- STARTING PHASE 3 VERIFICATION TESTS ---');

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

const tempVacationPhoto = path.resolve(process.cwd(), 'public/memories/vacations/test-vacation-sunset.jpg');
const tempBirthdayPhoto = path.resolve(process.cwd(), 'public/memories/birthday/test-bday-candle.png');
const tempVideo = path.resolve(process.cwd(), 'public/videos/memories/test-sample-clip.mp4');

try {
  // 1. Create temporary sample files
  fs.writeFileSync(tempVacationPhoto, 'dummy image data');
  fs.writeFileSync(tempBirthdayPhoto, 'dummy image data');
  fs.writeFileSync(tempVideo, 'dummy video data');

  console.log('[Setup] Created temporary test media assets');

  // 2. Run discovery
  const result = discoverMedia();

  // 3. Verify discovery
  const vacationEntry = result.photos.find(p => p.src.includes('test-vacation-sunset.jpg'));
  assert(!!vacationEntry, 'Discovered temporary vacation photo');
  assert(vacationEntry?.category === 'vacations', 'Correctly mapped vacation photo to category "vacations"');
  assert(vacationEntry?.title === 'Test Vacation Sunset', 'Generated readable title "Test Vacation Sunset"');
  assert(vacationEntry?.isRealAsset === true, 'Flagged as isRealAsset: true');

  const bdayEntry = result.photos.find(p => p.src.includes('test-bday-candle.png'));
  assert(!!bdayEntry, 'Discovered temporary birthday photo');
  assert(bdayEntry?.isBirthdayCelebration === true, 'Birthday photo flagged as isBirthdayCelebration: true');

  const bdayInSelection = result.birthdayPhotos.find(p => p.src.includes('test-bday-candle.png'));
  assert(!!bdayInSelection, 'Birthday photo added to discoveredBirthdayPhotos array');

  const videoEntry = result.videos.find(v => v.src.includes('test-sample-clip.mp4'));
  assert(!!videoEntry, 'Discovered temporary video in public/videos/memories/');
  assert(videoEntry?.title === 'Test Sample Clip', 'Generated readable video title "Test Sample Clip"');

} finally {
  // 4. Cleanup temporary test files
  if (fs.existsSync(tempVacationPhoto)) fs.unlinkSync(tempVacationPhoto);
  if (fs.existsSync(tempBirthdayPhoto)) fs.unlinkSync(tempBirthdayPhoto);
  if (fs.existsSync(tempVideo)) fs.unlinkSync(tempVideo);

  console.log('[Teardown] Purged temporary test media assets cleanly');

  // 5. Restore manifest
  writeManifest();
  console.log('[Teardown] Restored pristine production manifest');
}

console.log(`\nPhase 3 Verification Summary: ${passed} Passed, ${failed} Failed.`);
if (failed > 0) {
  process.exit(1);
}
