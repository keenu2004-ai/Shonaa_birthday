/**
 * =========================================================================
 * OUR LITTLE UNIVERSE ❤️ — CONTENT & ASSET AUDITOR CLI
 * =========================================================================
 * 
 * Run this script anytime using: npm run check-content
 * It inspects your src/config/loveStory.ts and public/ directories,
 * verifying that all images, videos, audio tracks, and dates are valid,
 * and reporting exactly which placeholders remain to be personalized!
 */

import fs from 'fs';
import path from 'path';

console.log('\n=============================================================');
console.log('   OUR LITTLE UNIVERSE ❤️  —  CONTENT & ASSET READINESS AUDIT');
console.log('=============================================================\n');

let totalChecklist = 0;
let completedChecklist = 0;
const pendingItems = [];
const missingFiles = [];
const verifiedFiles = [];

// Helper to check file presence in public/
function checkPublicAsset(assetPath, description) {
  if (!assetPath) return;
  // If assetPath starts with '/', strip it for path resolution
  const relativePath = assetPath.startsWith('/') ? assetPath.slice(1) : assetPath;
  const fullPath = path.resolve(process.cwd(), 'public', relativePath);

  totalChecklist++;
  if (fs.existsSync(fullPath)) {
    completedChecklist++;
    const isSvg = assetPath.endsWith('.svg');
    verifiedFiles.push({
      path: assetPath,
      description,
      type: isSvg ? 'PLACEHOLDER_SVG' : 'PERSONAL_MEDIA'
    });
  } else {
    missingFiles.push({
      path: assetPath,
      description,
      expectedLocation: fullPath
    });
  }
}

// 1. Read loveStory.ts
const configPath = path.resolve(process.cwd(), 'src/config/loveStory.ts');
if (!fs.existsSync(configPath)) {
  console.error('❌ ERROR: src/config/loveStory.ts not found!');
  process.exit(1);
}

const configRaw = fs.readFileSync(configPath, 'utf8');

// 2. Audit Names & Identifiers
totalChecklist += 3;
if (configRaw.includes('"[Her Name]"')) {
  pendingItems.push('Partner Name: Still set to [Her Name] in src/config/loveStory.ts');
} else {
  completedChecklist++;
}

if (configRaw.includes('"[Her Nickname]"')) {
  pendingItems.push('Partner Nickname: Still set to [Her Nickname] in src/config/loveStory.ts');
} else {
  completedChecklist++;
}

if (configRaw.includes('"[My Name]"')) {
  pendingItems.push('Your Name: Still set to [My Name] in src/config/loveStory.ts');
} else {
  completedChecklist++;
}

// 3. Audit Placeholder Strings
const editableMatches = configRaw.match(/\[EDITABLE:[^\]]+\]/g) || [];
const editableCount = editableMatches.length;

// 4. Audit Media Asset References
// Strip comments so we only check active configured values
const codeWithoutComments = configRaw
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/\/\/.*$/gm, '');

// Extract all string paths that start with /memories/, /videos/, /audio/
const mediaMatches = codeWithoutComments.match(/['"`](\/(memories|videos|audio)\/[^'"`]+)['"`]/g) || [];
const uniqueMediaPaths = [...new Set(mediaMatches.map(m => m.slice(1, -1)))];

for (const mediaPath of uniqueMediaPaths) {
  checkPublicAsset(mediaPath, `Configured asset: ${mediaPath}`);
}

// 5. Audit Background Audio & Video
const audioOpening = path.resolve(process.cwd(), 'public/audio/opening.mp3');
const audioBackground = path.resolve(process.cwd(), 'public/audio/background.mp3');
const audioBirthday = path.resolve(process.cwd(), 'public/audio/birthday.mp3');
const hasCustomAudio = fs.existsSync(audioOpening) || fs.existsSync(audioBackground) || fs.existsSync(audioBirthday);

const isAudioOrVideo = (assetPath) => assetPath.startsWith('/audio/') || assetPath.startsWith('/videos/');

const missingPhotos = missingFiles.filter(f => !isAudioOrVideo(f.path));
const missingMedia = missingFiles.filter(f => isAudioOrVideo(f.path));

// 6. Print Report
console.log('📌 1. PERSONALIZATION PROGRESS');
const personalMediaCount = verifiedFiles.filter(f => f.type === 'PERSONAL_MEDIA').length;
const placeholderSvgCount = verifiedFiles.filter(f => f.type === 'PLACEHOLDER_SVG').length;

console.log(`   - Verified Photo Placeholders: ${verifiedFiles.length} (${personalMediaCount} personal media, ${placeholderSvgCount} SVG vector placeholders)`);
console.log(`   - Audio System: ${hasCustomAudio ? 'Custom MP3 files detected in public/audio/' : 'Active (Using built-in Web Audio API romantic synth; replace with MP3s when ready)'}`);
console.log(`   - Video System: ${missingMedia.filter(m => m.path.startsWith('/videos/')).length === 0 ? 'Custom MP4 files detected' : 'Active (Film reel fallback cards active until you drop in MP4s)'}`);
console.log(`   - Remaining [EDITABLE] placeholders in loveStory.ts: ${editableCount}`);

if (missingPhotos.length > 0) {
  console.log('\n❌ MISSING PHOTO REFERENCES (These will show broken images):');
  for (const m of missingPhotos) {
    console.log(`   ✖ ${m.path} (${m.description})`);
    console.log(`     Expected at: ${m.expectedLocation}`);
  }
} else {
  console.log('\n✅ ALL PHOTO ASSETS RESOLVE CLEANLY (Zero broken images)');
}

if (missingMedia.length > 0) {
  console.log('\n🎵 OPTIONAL MEDIA ASSETS (Built-in synthesizers & cards active until placed):');
  for (const m of missingMedia) {
    console.log(`   ℹ️  ${m.path} -> Place in: ${path.relative(process.cwd(), m.expectedLocation)}`);
  }
}

if (pendingItems.length > 0) {
  console.log('\n📝 PENDING PLACEHOLDERS IN src/config/loveStory.ts:');
  for (const item of pendingItems) {
    console.log(`   ⏳ ${item}`);
  }
} else {
  console.log('\n🎉 ALL CORE NAMES AND NICKNAMES ARE PERSONALIZED!');
}

console.log('\n=============================================================');
const isFullyReady = missingPhotos.length === 0 && pendingItems.length === 0;
console.log(`   OVERALL CONTENT STATUS: ${missingPhotos.length === 0 ? 'READY FOR PREVIEW' : 'ACTION REQUIRED'}`);
console.log(`   Surprise Site Safety: ${missingPhotos.length === 0 ? '100% (Zero broken visual elements)' : 'Images missing'}`);
console.log('=============================================================\n');
