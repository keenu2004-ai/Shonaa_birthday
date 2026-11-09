import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// Minimal JPEG dimension reader
function getJpegDimensions(buffer) {
  let offset = 2; // skip SOI
  while (offset < buffer.length) {
    if (buffer[offset] !== 0xFF) break;
    const marker = buffer[offset + 1];
    // SOF markers: SOF0 (0xC0), SOF1 (0xC1), SOF2 (0xC2)
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

function walk(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else {
      results.push(fullPath);
    }
  }
  return results;
}

const allFiles = walk('public');
const jpegs = allFiles.filter(f => f.toLowerCase().endsWith('.jpeg') || f.toLowerCase().endsWith('.jpg'));
const mp4s = allFiles.filter(f => f.toLowerCase().endsWith('.mp4'));
const webms = allFiles.filter(f => f.toLowerCase().endsWith('.webm'));
const mp3s = allFiles.filter(f => f.toLowerCase().endsWith('.mp3'));
const svgs = allFiles.filter(f => f.toLowerCase().endsWith('.svg'));

console.log(`Found ${jpegs.length} JPEGs, ${mp4s.length} MP4s, ${webms.length} WEBMs, ${mp3s.length} MP3s, ${svgs.length} SVGs`);

const hashes = new Map();
const duplicates = [];

const photoReport = [];

for (const j of jpegs) {
  const hash = getMd5(j);
  const size = fs.statSync(j).size;
  const buf = fs.readFileSync(j);
  const dims = getJpegDimensions(buf);
  const rel = j.replace(/\\/g, '/');
  
  if (hashes.has(hash)) {
    duplicates.push({ original: hashes.get(hash), duplicate: rel });
  } else {
    hashes.set(hash, rel);
  }

  photoReport.push({
    file: rel,
    size,
    width: dims.width,
    height: dims.height,
    hash
  });
}

console.log('\n--- DUPLICATES FOUND ---');
console.log(JSON.stringify(duplicates, null, 2));

console.log('\n--- SUMMARY ---');
console.log(`Total JPEGs: ${photoReport.length}`);
console.log(`Unique Hashes: ${hashes.size}`);

fs.writeFileSync('scripts/census-result.json', JSON.stringify({
  jpegs: photoReport,
  duplicates,
  totalUniqueJpegs: hashes.size,
  mp4s: mp4s.map(f => ({ file: f.replace(/\\/g, '/'), size: fs.statSync(f).size })),
  webms: webms.map(f => ({ file: f.replace(/\\/g, '/'), size: fs.statSync(f).size })),
  mp3s: mp3s.map(f => ({ file: f.replace(/\\/g, '/'), size: fs.statSync(f).size }))
}, null, 2));

console.log('Saved scripts/census-result.json');

