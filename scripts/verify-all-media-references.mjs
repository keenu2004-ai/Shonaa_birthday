import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = path.resolve(process.cwd(), 'public');
const CONFIG_PATH = path.resolve(process.cwd(), 'src/config/loveStory.ts');

console.log('--- AUDITING ALL MEDIA PATHS REFERENCED IN CONFIG & CODE ---');

const content = fs.readFileSync(CONFIG_PATH, 'utf8');

// Match all strings starting with /memories/, /videos/, /audio/
const regex = /["'](\/(memories|videos|audio)\/[^"']+)["']/g;
const paths = new Set();
let match;
while ((match = regex.exec(content)) !== null) {
  paths.add(match[1]);
}

let missingCount = 0;
let existingCount = 0;

for (const p of paths) {
  // convert /memories/... to public/memories/...
  const localFile = path.resolve(PUBLIC_DIR, p.replace(/^\//, ''));
  if (fs.existsSync(localFile)) {
    console.log(`[EXISTS] ${p}`);
    existingCount++;
  } else {
    console.error(`[MISSING] ${p} -> ${localFile}`);
    missingCount++;
  }
}

console.log(`\nAudit Complete: ${existingCount} Existing, ${missingCount} Missing.`);
if (missingCount > 0) {
  process.exit(1);
}

