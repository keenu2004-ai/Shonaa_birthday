/**
 * =========================================================================
 * OUR LITTLE UNIVERSE ❤️ — BUILD-TIME AUTOMATIC MEDIA DISCOVERY ENGINE
 * =========================================================================
 * 
 * Automatically scans public/memories/, public/videos/, and public/audio/
 * Supports JPG, JPEG, PNG, WEBP, AVIF, SVG, MP4, WEBM, MP3, M4A, WAV, OGG.
 * Generates src/generated/mediaManifest.ts with TypeScript types.
 * Merges manual metadata overrides from src/config/loveStory.ts.
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const PUBLIC_DIR = path.resolve(process.cwd(), 'public');
const GENERATED_DIR = path.resolve(process.cwd(), 'src/generated');
const MANIFEST_PATH = path.resolve(GENERATED_DIR, 'mediaManifest.ts');
const CONFIG_PATH = path.resolve(process.cwd(), 'src/config/loveStory.ts');

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.svg']);
const VIDEO_EXTENSIONS = new Set(['.mp4', '.webm']);
const AUDIO_EXTENSIONS = new Set(['.mp3', '.m4a', '.wav', '.ogg']);

// Category mapping based on directory names
const CATEGORY_MAP = {
  'favourite': 'favourite',
  'happy-moments': 'happy-moments',
  'vacations': 'vacations',
  'travel': 'adventures',
  'special-days': 'special-days',
  'her-photos': 'her-photos',
  'our-photos': 'our-photos',
  'birthday': 'birthday',
  'opening': 'favourite',
};

// Helper to get MD5 hash for image deduplication
function getMd5(filePath) {
  try {
    const buf = fs.readFileSync(filePath);
    return crypto.createHash('md5').update(buf).digest('hex');
  } catch (e) {
    return null;
  }
}

// Convert filename (e.g. "cozy-hill-evening.jpg") into readable Title
function formatTitleFromFilename(filename) {
  const nameWithoutExt = path.parse(filename).name;
  return nameWithoutExt
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
    .trim();
}

// Generate pseudo-random deterministic rotation (-3 to 3) based on filename
function getDeterministicRotation(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  const tilts = [-2.5, -2, -1.5, -1, 1, 1.5, 2, 2.5, 3];
  const idx = Math.abs(hash) % tilts.length;
  return tilts[idx];
}

// Extract mediaOverrides from src/config/loveStory.ts
function parseMediaOverrides() {
  if (!fs.existsSync(CONFIG_PATH)) return {};
  try {
    const content = fs.readFileSync(CONFIG_PATH, 'utf8');
    const startIdx = content.indexOf('mediaOverrides:');
    if (startIdx === -1) return {};
    const firstBrace = content.indexOf('{', startIdx);
    const lastBrace = content.indexOf('} as Record', startIdx);
    if (firstBrace !== -1 && lastBrace !== -1) {
      const jsonStr = content.slice(firstBrace, lastBrace + 1);
      return JSON.parse(jsonStr);
    }
  } catch (err) {
    console.warn('[Media Discovery] Warning: could not parse mediaOverrides:', err.message);
  }
  return {};
}

export function discoverMedia() {
  const overrides = parseMediaOverrides();
  const memoriesDir = path.resolve(PUBLIC_DIR, 'memories');
  const videosDir = path.resolve(PUBLIC_DIR, 'videos');
  const audioDir = path.resolve(PUBLIC_DIR, 'audio');

  const photos = [];
  const uniquePersonalPhotos = [];
  const seenHashes = new Set();
  const videos = [];
  const audioTracks = [];
  let heroCoverPhoto = '/memories/opening/hero-cover.svg';

  // 1. Scan Memories Directory
  if (fs.existsSync(memoriesDir)) {
    const subdirs = fs.readdirSync(memoriesDir, { withFileTypes: true });

    for (const subdir of subdirs) {
      if (!subdir.isDirectory()) continue;
      const folderName = subdir.name;
      const folderPath = path.resolve(memoriesDir, folderName);
      const files = fs.readdirSync(folderPath);

      // Separate real photos from placeholders
      const realPhotos = files.filter(f => {
        const ext = path.extname(f).toLowerCase();
        return IMAGE_EXTENSIONS.has(ext) && ext !== '.svg';
      });

      const svgPlaceholders = files.filter(f => path.extname(f).toLowerCase() === '.svg');

      // Check opening hero photo
      if (folderName === 'opening') {
        if (realPhotos.length > 0) {
          heroCoverPhoto = `/memories/opening/${realPhotos[0]}`;
        }
      }

      // If user provided real photos in this folder, prioritize them!
      // Otherwise, keep the SVG placeholders so the UI never displays broken cards.
      const filesToInclude = realPhotos.length > 0 ? realPhotos : svgPlaceholders;

      const category = CATEGORY_MAP[folderName] || 'favourite';

      for (const file of filesToInclude) {
        const ext = path.extname(file).toLowerCase();
        if (!IMAGE_EXTENSIONS.has(ext)) continue;

        const webPath = `/memories/${folderName}/${file}`;
        const override = overrides[file] || overrides[webPath] || {};

        const isReal = ext !== '.svg';
        const defaultTitle = formatTitleFromFilename(file);

        let hash = undefined;
        let isDuplicate = false;
        if (isReal) {
          hash = getMd5(path.resolve(folderPath, file));
          if (hash) {
            if (seenHashes.has(hash)) {
              isDuplicate = true;
            } else {
              seenHashes.add(hash);
            }
          }
        }

        const photoItem = {
          id: `photo-${folderName}-${path.parse(file).name}`,
          title: override.title || defaultTitle,
          category: override.category || category,
          src: webPath,
          caption: override.caption || (isReal ? '' : defaultTitle),
          date: override.date || undefined,
          location: override.location || undefined,
          rotation: override.rotation || getDeterministicRotation(file),
          featured: override.featured || false,
          displayOrder: override.displayOrder !== undefined ? override.displayOrder : 99,
          isBirthdayCelebration: override.isBirthdayCelebration || folderName === 'birthday',
          isRealAsset: isReal,
          isDuplicate,
          hash: hash || undefined,
        };

        photos.push(photoItem);

        if (isReal && !isDuplicate) {
          uniquePersonalPhotos.push(photoItem);
        }
      }

      // Check for videos placed in memories subfolders (e.g. memories/birthday/)
      const memoryVideos = files.filter(f => {
        const ext = path.extname(f).toLowerCase();
        return VIDEO_EXTENSIONS.has(ext);
      });

      for (const file of memoryVideos) {
        const webPath = `/memories/${folderName}/${file}`;
        const override = overrides[file] || overrides[webPath] || {};

        videos.push({
          id: `video-${folderName}-${path.parse(file).name}`,
          title: override.title || formatTitleFromFilename(file),
          src: webPath,
          thumbnail: override.thumbnail || '/memories/birthday/birthday-cake.svg',
          caption: override.caption || `A special video memory from our ${folderName.replace('-', ' ')}.`,
          date: override.date || undefined,
          duration: override.duration || undefined,
          isRealAsset: true,
        });
      }

      // Check for audio files placed in memories subfolders (e.g. memories/favourite/)
      const memoryAudio = files.filter(f => {
        const ext = path.extname(f).toLowerCase();
        return AUDIO_EXTENSIONS.has(ext);
      });

      for (const file of memoryAudio) {
        const webPath = `/memories/${folderName}/${file}`;
        audioTracks.push({
          id: `audio-${folderName}-${path.parse(file).name}`,
          title: formatTitleFromFilename(file),
          artist: 'Our Soundtrack',
          src: webPath,
          type: 'background',
        });
      }
    }
  }

  // Sort photos by displayOrder then by category
  photos.sort((a, b) => (a.displayOrder || 99) - (b.displayOrder || 99));

  // 2. Scan Videos Directory
  if (fs.existsSync(videosDir)) {
    const subdirs = fs.readdirSync(videosDir, { withFileTypes: true });

    for (const subdir of subdirs) {
      if (!subdir.isDirectory()) continue;
      const folderName = subdir.name;
      const folderPath = path.resolve(videosDir, folderName);
      const files = fs.readdirSync(folderPath);

      for (const file of files) {
        const ext = path.extname(file).toLowerCase();
        if (!VIDEO_EXTENSIONS.has(ext)) continue;

        const webPath = `/videos/${folderName}/${file}`;
        const override = overrides[file] || overrides[webPath] || {};

        videos.push({
          id: `video-${folderName}-${path.parse(file).name}`,
          title: override.title || formatTitleFromFilename(file),
          src: webPath,
          thumbnail: override.thumbnail || '/memories/favourite/favourite-1.svg',
          caption: override.caption || 'A moving snapshot from our journey together.',
          date: override.date || undefined,
          duration: override.duration || undefined,
          isRealAsset: true,
        });
      }
    }
  }

  // 3. Scan Audio Directory
  if (fs.existsSync(audioDir)) {
    const files = fs.readdirSync(audioDir);
    const audioMap = {
      opening: null,
      background: null,
      birthday: null,
    };

    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (!AUDIO_EXTENSIONS.has(ext)) continue;
      const baseName = path.parse(file).name.toLowerCase();

      if (baseName.includes('opening') && !audioMap.opening) {
        audioMap.opening = `/audio/${file}`;
      } else if (baseName.includes('birthday') && !audioMap.birthday) {
        audioMap.birthday = `/audio/${file}`;
      } else if ((baseName.includes('background') || baseName.includes('music') || baseName.includes('love')) && !audioMap.background) {
        audioMap.background = `/audio/${file}`;
      }
    }

    if (audioMap.opening) {
      audioTracks.push({
        id: 'opening-melody',
        title: 'Opening Theme',
        artist: 'Our Soundtrack',
        src: audioMap.opening,
        type: 'opening',
      });
    }
    if (audioMap.background) {
      audioTracks.push({
        id: 'background-melody',
        title: 'Background Melody',
        artist: 'Quiet Moments',
        src: audioMap.background,
        type: 'background',
      });
    }
    if (audioMap.birthday) {
      audioTracks.push({
        id: 'birthday-fanfare',
        title: 'Birthday Celebration Song',
        artist: 'Celebration Special',
        src: audioMap.birthday,
        type: 'birthday',
      });
    }
  }

  // Filter birthday photos
  const birthdayPhotos = photos.filter(p => p.isBirthdayCelebration || p.category === 'birthday');

  // Stats
  const personalPhotos = photos.filter(p => p.isRealAsset).length;
  const totalPhotos = photos.length;

  return {
    photos,
    uniquePersonalPhotos,
    videos,
    audioTracks,
    birthdayPhotos,
    heroCoverPhoto,
    stats: {
      totalPhotos,
      personalPhotos,
      totalUniquePhotos: uniquePersonalPhotos.length,
      totalVideos: videos.length,
      hasCustomAudio: audioTracks.length > 0,
    },
  };
}

// Generate the TypeScript file
export function writeManifest() {
  if (!fs.existsSync(GENERATED_DIR)) {
    fs.mkdirSync(GENERATED_DIR, { recursive: true });
  }

  const data = discoverMedia();

  const tsContent = `/**
 * AUTOGENERATED FILE — DO NOT EDIT DIRECTLY.
 * Generated by scripts/discover-media.mjs
 * Run \`npm run discover-media\` or build the project to regenerate.
 */

import type { PhotoMemory, VideoMemory, MusicTrack } from '../config/loveStory';

export const discoveredPhotos: PhotoMemory[] = ${JSON.stringify(data.photos, null, 2)};

export const uniquePersonalPhotos: PhotoMemory[] = ${JSON.stringify(data.uniquePersonalPhotos, null, 2)};

export const discoveredVideos: VideoMemory[] = ${JSON.stringify(data.videos, null, 2)};

export const discoveredAudioTracks: MusicTrack[] = ${JSON.stringify(data.audioTracks, null, 2)};

export const discoveredBirthdayPhotos: PhotoMemory[] = ${JSON.stringify(data.birthdayPhotos, null, 2)};

export const discoveredHeroCoverPhoto: string = ${JSON.stringify(data.heroCoverPhoto)};

export const mediaDiscoveryStats = ${JSON.stringify(data.stats, null, 2)};
`;

  fs.writeFileSync(MANIFEST_PATH, tsContent, 'utf8');
  console.log(`[Media Discovery] Manifest generated at: ${MANIFEST_PATH}`);
  console.log(`[Media Discovery] Total Photos: ${data.stats.totalPhotos} (${data.stats.personalPhotos} personal, ${data.stats.totalUniquePhotos} unique) | Videos: ${data.stats.totalVideos} | Custom Audio: ${data.stats.hasCustomAudio ? 'Yes' : 'No'}`);

  return data;
}

// If executed directly:
if (import.meta.url === `file:///${process.argv[1].replace(/\\/g, '/')}`) {
  writeManifest();
}
