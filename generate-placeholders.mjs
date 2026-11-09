import fs from 'fs';
import path from 'path';

function createPlaceholderSvg(title, subtitle, iconType, bgColor = '#FFFDF9', accentColor = '#832232') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bgColor}" />
      <stop offset="100%" stop-color="#FDF2F4" />
    </linearGradient>
    <pattern id="paper" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1" fill="#E8DCC9" opacity="0.4"/>
    </pattern>
  </defs>
  
  <!-- Background Card -->
  <rect width="800" height="1000" fill="url(#grad)" />
  <rect width="800" height="1000" fill="url(#paper)" />
  
  <!-- Polaroid Inner Border -->
  <rect x="40" y="40" width="720" height="720" rx="12" fill="#FAF6ED" stroke="#E8DCC9" stroke-width="2" />
  
  <!-- Subtle Floral / Geometric Frame -->
  <circle cx="400" cy="400" r="160" fill="#FDF2F4" stroke="#E08798" stroke-width="1.5" stroke-dasharray="6,6" />
  
  <!-- Central Icon Graphic -->
  <g transform="translate(360, 350) scale(3.5)" fill="none" stroke="${accentColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#E08798" fill-opacity="0.25"/>
  </g>
  
  <!-- Text Labels -->
  <text x="400" y="520" font-family="'Playfair Display', Georgia, serif" font-size="28" font-weight="bold" fill="${accentColor}" text-anchor="middle" letter-spacing="1">
    ${title}
  </text>
  
  <text x="400" y="560" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" fill="#614B52" text-anchor="middle">
    ${subtitle}
  </text>
  
  <!-- Polaroid Caption Space -->
  <text x="400" y="840" font-family="'Dancing Script', cursive" font-size="34" font-weight="600" fill="${accentColor}" text-anchor="middle">
    "A moment waiting for our memory"
  </text>
  
  <text x="400" y="890" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" fill="#9E2D41" text-anchor="middle" letter-spacing="0.5">
    Replace in your media folder
  </text>
  
  <line x1="280" y1="920" x2="520" y2="920" stroke="#D4AF37" stroke-width="1.5" stroke-dasharray="4,4" />
</svg>`;
}

const placeholders = [
  { path: 'public/memories/opening/hero-cover.svg', title: 'Opening Memory', sub: 'public/memories/opening/hero-cover.jpg' },
  { path: 'public/memories/favourite/favourite-1.svg', title: 'Our Favourite Moment', sub: 'public/memories/favourite/photo-1.jpg' },
  { path: 'public/memories/favourite/favourite-2.svg', title: 'Wrapped In Warmth', sub: 'public/memories/favourite/photo-2.jpg' },
  { path: 'public/memories/happy-moments/happy-1.svg', title: 'Unfiltered Laughter', sub: 'public/memories/happy-moments/happy-1.jpg' },
  { path: 'public/memories/happy-moments/happy-2.svg', title: 'Silly Face Across Table', sub: 'public/memories/happy-moments/happy-2.jpg' },
  { path: 'public/memories/vacations/vacation-1.svg', title: 'Mountain Overlook', sub: 'public/memories/vacations/mountain-1.jpg' },
  { path: 'public/memories/travel/travel-1.svg', title: 'Forest & Moss Trail', sub: 'public/memories/travel/trail-1.jpg' },
  { path: 'public/memories/travel/travel-2.svg', title: 'Historic Archways', sub: 'public/memories/travel/historic-1.jpg' },
  { path: 'public/memories/special-days/anniversary-1.svg', title: 'Anniversary Glow', sub: 'public/memories/special-days/special-1.jpg' },
  { path: 'public/memories/her-photos/her-portrait-1.svg', title: 'Golden Hour Smile', sub: 'public/memories/her-photos/portrait-1.jpg' },
  { path: 'public/memories/her-photos/her-portrait-2.svg', title: 'Heart Doodle Portrait', sub: 'public/memories/her-photos/portrait-2.jpg' },
  { path: 'public/memories/our-photos/our-photo-1.svg', title: 'Cheek Kiss & Smiles', sub: 'public/memories/our-photos/kiss-1.jpg' },
  { path: 'public/memories/our-photos/our-photo-2.svg', title: 'Helmets & Open Roads', sub: 'public/memories/our-photos/ride-1.jpg' },
  { path: 'public/memories/birthday/birthday-cake.svg', title: 'Birthday Wish & Cake', sub: 'public/memories/birthday/cake-candles.jpg' },
  { path: 'public/memories/birthday/birthday-celebration.svg', title: 'Grand Celebration', sub: 'public/memories/birthday/celebration.jpg' },
];

for (const p of placeholders) {
  const dir = path.dirname(p.path);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(p.path, createPlaceholderSvg(p.title, p.sub, 'heart'));
}

console.log('Successfully generated all aesthetic SVG placeholders.');
