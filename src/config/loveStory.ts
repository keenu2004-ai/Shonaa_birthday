/**
 * =========================================================================
 * OUR LITTLE UNIVERSE ❤️ — CENTRAL CONFIGURATION (src/config/loveStory.ts)
 * =========================================================================
 * 
 * Personalized for SHONAA BIRTHDAY ❤️ (10 November 2026)
 * All components across the application consume data directly from this configuration.
 */

export interface MilestoneItem {
  id: string;
  title: string;
  date: string;
  tag: string;
  description: string;
  image?: string;
  video?: string;
  note?: string;
}

export type PhotoCategory =
  | 'favourite' 
  | 'happy-moments' 
  | 'adventures' 
  | 'vacations' 
  | 'special-days' 
  | 'random' 
  | 'her-photos' 
  | 'our-photos'
  | 'birthday';

export interface PhotoMemory {
  id: string;
  title: string;
  category: PhotoCategory;
  src: string;
  caption: string;
  date?: string;
  location?: string;
  rotation?: number; // Visual tilt in degrees (-3 to 3) for scrapbook effect
  featured?: boolean; // Highlighted or hero photo
  displayOrder?: number; // Custom sorting order
  isBirthdayCelebration?: boolean; // Included in birthday fireworks/explosion
  isRealAsset?: boolean; // True if uploaded by user, false if SVG placeholder
  isDuplicate?: boolean; // True if identical hash duplicate of another file
  hash?: string; // MD5 content hash for integrity and deduplication
}

export interface MediaOverride {
  title?: string;
  caption?: string;
  date?: string;
  location?: string;
  category?: PhotoCategory;
  featured?: boolean;
  displayOrder?: number;
  isBirthdayCelebration?: boolean;
  rotation?: number;
}

export interface VideoMemory {
  id: string;
  title: string;
  src: string;
  thumbnail: string;
  caption: string;
  date?: string;
  duration?: string;
  isRealAsset?: boolean;
}

export interface TravelDestination {
  id: string;
  placeName: string;
  stateOrCountry: string;
  date: string;
  image: string;
  whatWeDid: string;
  favouriteMemory: string;
  personalNote: string;
  stampText?: string;
}

export interface BucketListItem {
  id: string;
  text: string;
  category: 'travel' | 'experience' | 'goals' | 'together';
  completed: boolean;
  notes?: string;
}

export interface LoveReason {
  id: number;
  reason: string;
  category: 'quirk' | 'heart' | 'smile' | 'together';
}

export interface OpenWhenLetter {
  id: string;
  trigger: string;
  tagline: string;
  title: string;
  letter: string;
  signature: string;
  photo?: string;
}

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  src: string;
  type: 'opening' | 'background' | 'birthday';
}

export const loveStoryConfig = {
  // =========================================================================
  // 1. NAMES & TITLES — SHONAA BIRTHDAY ❤️
  // =========================================================================
  names: {
    herName: "Shonaa",
    herNickname: "Shonaa",
    myName: "Vaibhav",
    websiteTitle: "SHONAA BIRTHDAY ❤️",
    heroOpeningTagline: "To my favourite person, my Shonaa. This little universe is all yours.",
    openingButtonText: "Open Your Little Universe, Shonaa ❤️",
    birthdayCelebrationTitle: "HAPPY BIRTHDAY SHONAA ❤️",
    birthdayAge: 24,
    heroCoverPhoto: "/memories/opening/hero-cover.jpeg",
  },

  // =========================================================================
  // 2. DATES & COUNTDOWNS
  // =========================================================================
  dates: {
    // 1. Unofficial Beginning: March 2025
    unofficialStart: "2025-03-01T00:00:00+05:30",
    unofficialStartDisplay: "March 2025",
    unofficialQuote: "Before the official date, there was already an us.",

    // 2. Official Relationship: 14 April 2025
    relationshipStart: "2025-04-14T00:00:00+05:30",
    relationshipStartDisplay: "14 April 2025",
    officialQuote: "14 April 2025 — The day we officially became us.",

    // 3. Her Birthday: 10 November 2026, 00:00 Asia/Kolkata
    birthdayDate: "2026-11-10T00:00:00+05:30",
    birthdayDisplay: "10 November 2026",
    birthdayTime: "00:00:00",
    timezone: "Asia/Kolkata",

    // Preview Flag: Set to true anytime to immediately test the Grand Birthday Fireworks Celebration!
    forceTestCelebration: false,

    counterCaption: "From our little beginning in March 2025 to officially becoming us on 14 April 2025.",
  },

  // =========================================================================
  // 3. BACKGROUND MUSIC PLAYLIST (Continuous Background Soundtrack)
  // =========================================================================
  music: {
    enabled: true,
    defaultVolume: 0.6,
    tracks: [
      {
        id: "kaise-bataaoon",
        title: "Kaise Bataaoon",
        artist: "KK & Mithoon (3G)",
        src: "/audio/background.mp3",
        type: "background",
      },
      {
        id: "rakhlo-tum-chupaake",
        title: "Rakhlo Tum Chupaake",
        artist: "Our Special Memories",
        src: "/audio/Rakhlo_Tum_Chupaake.webm",
        type: "background",
      },
      {
        id: "birthday-fanfare",
        title: "Birthday Wonder & Joy",
        artist: "Happy Birthday Shonaa Special",
        src: "/audio/background.mp3",
        type: "birthday",
      },
    ] as MusicTrack[],
  },

  // =========================================================================
  // 4. OUR MEMORIES — PHOTO GALLERY (Curated Real Photographs)
  // =========================================================================
  photos: [
    {
      id: "photo-1",
      title: "Our First Photograph Together",
      category: "our-photos",
      src: "/memories/birthday/WhatsApp Image 2026-11-09 at 11.17.03 PM.jpeg",
      caption: "Our very first photo together by the historic monument archway on our first date, wearing your white and blue ghagra.",
      date: "14 April 2025",
      location: "Historic Monument Walk",
      rotation: -2,
      featured: true,
      displayOrder: 1,
      isBirthdayCelebration: true,
      isRealAsset: true,
    },
    {
      id: "photo-2",
      title: "The Sweetest Cheek Kiss",
      category: "our-photos",
      src: "/memories/birthday/WhatsApp Image 2026-11-09 at 11.16.13 PM (2).jpeg",
      caption: "Pink bows, happy smiles, and the softest kiss on your cheek.",
      date: "Cozy Afternoon",
      location: "Our Safe Corner",
      rotation: 2.5,
      featured: true,
      displayOrder: 2,
      isBirthdayCelebration: true,
      isRealAsset: true,
    },
    {
      id: "photo-3",
      title: "Mussoorie Mall Road",
      category: "vacations",
      src: "/memories/birthday/WhatsApp Image 2026-11-09 at 11.17.00 PM.jpeg",
      caption: "Wandering through the cool hill station breeze with Gandhi Chowk behind us.",
      date: "Mussoorie Trip",
      location: "Mall Road, Mussoorie",
      rotation: -1.5,
      featured: true,
      displayOrder: 3,
      isBirthdayCelebration: true,
      isRealAsset: true,
    },
    {
      id: "photo-4",
      title: "Above The Clouds",
      category: "vacations",
      src: "/memories/birthday/WhatsApp Image 2026-11-09 at 11.15.56 PM.jpeg",
      caption: "Standing high above the Garhwal mountains with misty clouds rolling over the ridges.",
      date: "Mountain Getaway",
      location: "Mussoorie Heights",
      rotation: 2,
      displayOrder: 4,
      isBirthdayCelebration: true,
      isRealAsset: true,
    },
    {
      id: "photo-5",
      title: "Making A Birthday Wish",
      category: "birthday",
      src: "/memories/birthday/WhatsApp Image 2026-11-09 at 11.17.12 PM.jpeg",
      caption: "Watching candlelight glow on your face as you make a wish on your birthday cake.",
      date: "10 November 2025",
      location: "Birthday Midnight",
      rotation: -2.5,
      featured: true,
      displayOrder: 5,
      isBirthdayCelebration: true,
      isRealAsset: true,
    },
    {
      id: "photo-6",
      title: "Helmets & Open Roads",
      category: "our-photos",
      src: "/memories/birthday/WhatsApp Image 2026-11-09 at 11.16.45 PM.jpeg",
      caption: "Two helmets, open highways, wind in our faces, and endless laughter.",
      date: "Road Adventure",
      location: "Open Road",
      rotation: 1.5,
      displayOrder: 6,
      isBirthdayCelebration: true,
      isRealAsset: true,
    },
    {
      id: "photo-7",
      title: "Holiday Lights & Christmas Cheer",
      category: "special-days",
      src: "/memories/birthday/WhatsApp Image 2026-11-09 at 11.17.02 PM.jpeg",
      caption: "Warm golden fairy lights, holiday decorations, and feeling completely at home with you.",
      date: "December Holidays",
      location: "Holiday Warmth",
      rotation: -2,
      displayOrder: 7,
      isBirthdayCelebration: true,
      isRealAsset: true,
    },
    {
      id: "photo-8",
      title: "Cuddles & Plushie Friends",
      category: "happy-moments",
      src: "/memories/birthday/WhatsApp Image 2026-11-09 at 11.17.09 PM.jpeg",
      caption: "Hugging the plush penguin tight while smiling at memories on your phone.",
      date: "Cozy Evening",
      location: "Home Comfort",
      rotation: 1.8,
      displayOrder: 8,
      isBirthdayCelebration: true,
      isRealAsset: true,
    },
    {
      id: "photo-9",
      title: "Mind Your Head, Hold My Hand",
      category: "adventures",
      src: "/memories/birthday/WhatsApp Image 2026-11-09 at 11.15.57 PM (1).jpeg",
      caption: "Stepping through moss-covered cavern trails and laughing at low stone ceilings.",
      date: "Cave Hike",
      location: "Robber's Cave Trail",
      rotation: -1,
      displayOrder: 9,
      isBirthdayCelebration: true,
      isRealAsset: true,
    },
    {
      id: "photo-10",
      title: "Diwali Evening Radiance",
      category: "special-days",
      src: "/memories/birthday/WhatsApp Image 2026-11-09 at 11.15.58 PM (4).jpeg",
      caption: "Lighting golden diyas and flower rangoli in your regal purple silk suit.",
      date: "Festival of Lights",
      location: "Diwali Night",
      rotation: 2.2,
      displayOrder: 10,
      isBirthdayCelebration: true,
      isRealAsset: true,
    },
    {
      id: "photo-11",
      title: "Late Night Blanket Calls",
      category: "happy-moments",
      src: "/memories/birthday/WhatsApp Image 2026-11-09 at 11.15.58 PM (3).jpeg",
      caption: "Wrapped up like a blanket ghost holding a thermos, keeping each other company late into the night.",
      date: "Midnight Call",
      location: "Across The Screen",
      rotation: -2.5,
      displayOrder: 11,
      isBirthdayCelebration: true,
      isRealAsset: true,
    },
    {
      id: "photo-12",
      title: "High Above The Fairgrounds",
      category: "happy-moments",
      src: "/memories/birthday/WhatsApp Image 2026-11-09 at 11.15.58 PM (2).jpeg",
      caption: "At the top of the Ferris wheel under the nighttime carnival lights.",
      date: "Carnival Night",
      location: "City Fair",
      rotation: 1.5,
      displayOrder: 12,
      isBirthdayCelebration: true,
      isRealAsset: true,
    },
    {
      id: "photo-13",
      title: "Peace at Bangla Sahib",
      category: "special-days",
      src: "/memories/birthday/WhatsApp Image 2026-11-09 at 11.16.13 PM.jpeg",
      caption: "Serene night by the holy Sarovar waters with tilak and maroon dupatta.",
      date: "Spiritual Visit",
      location: "Gurudwara Bangla Sahib",
      rotation: -1.5,
      displayOrder: 13,
      isBirthdayCelebration: true,
      isRealAsset: true,
    },
    {
      id: "photo-14",
      title: "Golden Hour Radiance",
      category: "her-photos",
      src: "/memories/birthday/WhatsApp Image 2026-11-09 at 11.15.59 PM.jpeg",
      caption: "Soft daylight catching your smile in your cozy knit sweater.",
      date: "Winter Afternoon",
      location: "Sunlit Glow",
      rotation: 2,
      displayOrder: 14,
      isBirthdayCelebration: true,
      isRealAsset: true,
    },
    {
      id: "photo-15",
      title: "Raindrops at Christ Church",
      category: "vacations",
      src: "/memories/birthday/WhatsApp Image 2026-11-09 at 11.17.13 PM (1).jpeg",
      caption: "Standing in a blue rain poncho on the church grounds among tall Himalayan pines.",
      date: "Mussoorie Monsoons",
      location: "Christ Church, Mussoorie",
      rotation: -2,
      displayOrder: 15,
      isBirthdayCelebration: true,
      isRealAsset: true,
    },
    {
      id: "photo-16",
      title: "Historic Archway Walk",
      category: "adventures",
      src: "/memories/birthday/WhatsApp Image 2026-11-09 at 11.16.59 PM.jpeg",
      caption: "Your white and blue ghagra glowing against the ancient carved stone door.",
      date: "First Date",
      location: "Heritage Monument",
      rotation: 1.5,
      featured: true,
      displayOrder: 16,
      isBirthdayCelebration: true,
      isRealAsset: true,
    },
  ] as PhotoMemory[],

  mediaOverrides: {
  "WhatsApp Image 2026-11-09 at 11.15.53 PM.jpeg": {
    "title": "The Legendary Cafe Pout",
    "caption": "Arms crossed, waiting for food with that cute little pout that melts my heart every single time.",
    "category": "favourite",
    "location": "Cafe Date",
    "date": "2025",
    "featured": true,
    "displayOrder": 1
  },
  "WhatsApp Image 2026-11-09 at 11.15.54 PM (1).jpeg": {
    "title": "Hollow of the Ancient Tree",
    "caption": "Curled up comfortably inside the multi-trunk tree in the scenic hill station woods.",
    "category": "vacations",
    "location": "Mussoorie Hills",
    "date": "Our First Vacation",
    "featured": false,
    "displayOrder": 15
  },
  "WhatsApp Image 2026-11-09 at 11.15.54 PM.jpeg": {
    "title": "Mountain Bridge & Mist",
    "caption": "Standing on the green iron bridge against rolling clouds and misty Himalayan cliffs.",
    "category": "vacations",
    "location": "Mussoorie Trail",
    "date": "Our First Vacation",
    "featured": false,
    "displayOrder": 16
  },
  "WhatsApp Image 2026-11-09 at 11.15.56 PM (1).jpeg": {
    "title": "Light Breaking Through the Cavern",
    "caption": "A dramatic beam of sunlight cutting through the natural ceiling inside Robber's Cave.",
    "category": "adventures",
    "location": "Robber's Cave (Guchhupani)",
    "date": "Nature Trek",
    "featured": false,
    "displayOrder": 25
  },
  "WhatsApp Image 2026-11-09 at 11.15.56 PM.jpeg": {
    "title": "Queen of the Hills Ridge",
    "caption": "Looking out over endless green Himalayan mountain ranges with rolling clouds below.",
    "category": "vacations",
    "location": "Mussoorie Viewpoint",
    "date": "Our First Vacation",
    "featured": true,
    "displayOrder": 5
  },
  "WhatsApp Image 2026-11-09 at 11.15.57 PM (1).jpeg": {
    "title": "Mind Your Head at the Cave",
    "caption": "Laughing at the \"Mind Your Head\" sign on the mossy rock stairs entering the caverns.",
    "category": "adventures",
    "location": "Robber's Cave Caverns",
    "date": "Nature Trek",
    "featured": true,
    "displayOrder": 8
  },
  "WhatsApp Image 2026-11-09 at 11.15.57 PM.jpeg": {
    "title": "Reflections in the Stream",
    "caption": "Stepping through the cool natural cave stream under the towering limestone gorge.",
    "category": "adventures",
    "location": "Robber's Cave Trail",
    "date": "Nature Trek",
    "featured": false,
    "displayOrder": 26
  },
  "WhatsApp Image 2026-11-09 at 11.15.58 PM (1).jpeg": {
    "title": "Warmth in Red",
    "caption": "Solo portrait of Shonaa smiling warmly in her beautiful red patterned outfit.",
    "category": "her-photos",
    "location": "Portrait Memory",
    "date": "2025",
    "featured": false,
    "displayOrder": 35
  },
  "WhatsApp Image 2026-11-09 at 11.15.58 PM (2).jpeg": {
    "title": "High on the Ferris Wheel",
    "caption": "Arms outstretched at the top of the giant Ferris wheel with night festival lights glowing all around.",
    "category": "happy-moments",
    "location": "Night Fair Carnival",
    "date": "Pure Joy",
    "featured": true,
    "displayOrder": 4
  },
  "WhatsApp Image 2026-11-09 at 11.15.58 PM (3).jpeg": {
    "title": "Late Night Blanket Call",
    "caption": "Wrapped up in a warm blanket holding a thermos, sharing sleepy late-night whispers.",
    "category": "happy-moments",
    "location": "Late Night Screen",
    "date": "Everyday Magic",
    "featured": true,
    "displayOrder": 10
  },
  "WhatsApp Image 2026-11-09 at 11.15.58 PM (4).jpeg": {
    "title": "Diwali Diya Glow",
    "caption": "Lighting festive earthen lamps in purple silk embroidered attire, radiating festival warmth.",
    "category": "special-days",
    "location": "Diwali Celebration",
    "date": "Festival of Lights",
    "featured": true,
    "displayOrder": 9
  },
  "WhatsApp Image 2026-11-09 at 11.15.58 PM.jpeg": {
    "title": "Capsule Pod Nap",
    "caption": "Completely relaxed and fast asleep inside the futuristic massage pod capsule at the mall.",
    "category": "happy-moments",
    "location": "Mall Outing",
    "date": "Goofy Moments",
    "featured": false,
    "displayOrder": 20
  },
  "WhatsApp Image 2026-11-09 at 11.15.59 PM (1).jpeg": {
    "title": "Side-by-Side Smiles",
    "caption": "Casual cafe lunch date in collared shirts, smiling side by side without a care in the world.",
    "category": "our-photos",
    "location": "Cafe Lunch Date",
    "date": "2025",
    "featured": false,
    "displayOrder": 11
  },
  "WhatsApp Image 2026-11-09 at 11.15.59 PM.jpeg": {
    "title": "Soft Daylight & Checkered Knitwear",
    "caption": "Golden morning light illuminating your natural beauty in cozy checkered knitwear.",
    "category": "her-photos",
    "location": "Quiet Morning",
    "date": "2025",
    "featured": true,
    "displayOrder": 7
  },
  "WhatsApp Image 2026-11-09 at 11.16.02 PM (1).jpeg": {
    "title": "Plumeria in Your Hair",
    "caption": "Waving sweetly at the camera with a bright pink plumeria flower tucked into your long hair.",
    "category": "her-photos",
    "location": "Sweet Selfies",
    "date": "2025",
    "featured": false,
    "displayOrder": 36
  },
  "WhatsApp Image 2026-11-09 at 11.16.02 PM (2).jpeg": {
    "title": "Qutub Minar Under the Stars",
    "caption": "Standing by the soaring illuminated stone tower of Qutub Minar on our nighttime heritage stroll.",
    "category": "adventures",
    "location": "Qutub Complex Heritage Walk",
    "date": "Night Walk",
    "featured": true,
    "displayOrder": 6
  },
  "WhatsApp Image 2026-11-09 at 11.16.02 PM.jpeg": {
    "title": "Childhood Hug with Maa",
    "caption": "A cherished vintage memory of baby Shonaa held safely in mother's loving embrace.",
    "category": "her-photos",
    "location": "Childhood Keepsake",
    "date": "Precious Memories",
    "featured": false,
    "displayOrder": 45
  },
  "WhatsApp Image 2026-11-09 at 11.16.04 PM.jpeg": {
    "title": "Ancient Carvings & Heritage Arch",
    "caption": "Seated beneath the illuminated sandstone archways and historic motifs on our evening wander.",
    "category": "adventures",
    "location": "Historic Monuments",
    "date": "Heritage Night",
    "featured": false,
    "displayOrder": 27
  },
  "WhatsApp Image 2026-11-09 at 11.16.05 PM.jpeg": {
    "title": "Illuminated Minar Promenade",
    "caption": "A quiet, peaceful walk along the stone pathways beneath the glowing spire of Qutub Minar.",
    "category": "adventures",
    "location": "Qutub Heritage Grounds",
    "date": "Night Walk",
    "featured": false,
    "displayOrder": 28
  },
  "WhatsApp Image 2026-11-09 at 11.16.06 PM.jpeg": {
    "title": "Night Glow & Starlit Spire",
    "caption": "Looking over your shoulder as the architectural grandeur of centuries stands tall in the dark sky.",
    "category": "adventures",
    "location": "Qutub Complex",
    "date": "Night Walk",
    "featured": false,
    "displayOrder": 29
  },
  "WhatsApp Image 2026-11-09 at 11.16.07 PM.jpeg": {
    "title": "Little Golden Puppy Friend",
    "caption": "Holding the sweetest golden puppy on your lap in your Dragon Ball tee, pure compassion in your eyes.",
    "category": "happy-moments",
    "location": "Evening Walk",
    "date": "Puppy Love",
    "featured": true,
    "displayOrder": 12
  },
  "WhatsApp Image 2026-11-09 at 11.16.08 PM.jpeg": {
    "title": "Gentle Puppy Cuddles",
    "caption": "Gently comforting the tiny puppy — proof that your heart is the kindest place on earth.",
    "category": "happy-moments",
    "location": "Evening Walk",
    "date": "Puppy Love",
    "featured": false,
    "displayOrder": 21
  },
  "WhatsApp Image 2026-11-09 at 11.16.10 PM.jpeg": {
    "title": "Holding the Black-and-Tan Pup",
    "caption": "Smiling with pride while holding the curious little black-and-tan pup with both hands.",
    "category": "happy-moments",
    "location": "Evening Walk",
    "date": "Puppy Love",
    "featured": false,
    "displayOrder": 22
  },
  "WhatsApp Image 2026-11-09 at 11.16.11 PM.jpeg": {
    "title": "Paws & Pure Joy",
    "caption": "Looking down with so much tenderness at our little four-legged companion of the evening.",
    "category": "happy-moments",
    "location": "Evening Walk",
    "date": "Puppy Love",
    "featured": false,
    "displayOrder": 23
  },
  "WhatsApp Image 2026-11-09 at 11.16.12 PM.jpeg": {
    "title": "Bangla Sahib Sarovar Blessing",
    "caption": "A serene spiritual evening at Gurudwara Bangla Sahib, head covered with tilak by the holy sarovar.",
    "category": "special-days",
    "location": "Gurudwara Bangla Sahib",
    "date": "Sacred Moments",
    "featured": true,
    "displayOrder": 3
  },
  "WhatsApp Image 2026-11-09 at 11.16.13 PM (1).jpeg": {
    "title": "Baby Shonaa & Her Doll",
    "caption": "A precious vintage scan of little baby Shonaa hugging a wrapped doll on the bed.",
    "category": "her-photos",
    "location": "Childhood Memory",
    "date": "The Very Beginning",
    "featured": false,
    "displayOrder": 46
  },
  "WhatsApp Image 2026-11-09 at 11.16.13 PM (2).jpeg": {
    "title": "Cheek Kiss & Pink Bows",
    "caption": "An affectionate kiss on your cheek with cute pink bow doodles — one of my favourite photos of us.",
    "category": "our-photos",
    "location": "Together Always",
    "date": "Sweetest Love",
    "featured": true,
    "displayOrder": 2
  },
  "WhatsApp Image 2026-11-09 at 11.16.13 PM.jpeg": {
    "title": "Reflections in the Sacred Sarovar",
    "caption": "Standing quietly by the illuminated waters of Bangla Sahib Sarovar under the midnight sky.",
    "category": "special-days",
    "location": "Bangla Sahib Sarovar",
    "date": "Peaceful Night",
    "featured": false,
    "displayOrder": 30
  },
  "WhatsApp Image 2026-11-09 at 11.16.14 PM (1).jpeg": {
    "title": "Gazing at the City Lights",
    "caption": "Standing by the glass balcony rail overlooking the shimmering ocean of city nightlights.",
    "category": "her-photos",
    "location": "High-Rise Balcony",
    "date": "Nightscape",
    "featured": false,
    "displayOrder": 37
  },
  "WhatsApp Image 2026-11-09 at 11.16.14 PM.jpeg": {
    "title": "Cozy Corner Couch",
    "caption": "Seated comfortably on the grey lounge sofa under warm amber pendant lamps in a quiet cafe.",
    "category": "her-photos",
    "location": "Cafe Lounge",
    "date": "2025",
    "featured": false,
    "displayOrder": 38
  },
  "WhatsApp Image 2026-11-09 at 11.16.16 PM (1).jpeg": {
    "title": "Studying the Menu",
    "caption": "Looking up at the dessert and food court menus with that serious focus on picking something delicious.",
    "category": "her-photos",
    "location": "Food Court Date",
    "date": "2025",
    "featured": false,
    "displayOrder": 39
  },
  "WhatsApp Image 2026-11-09 at 11.16.16 PM.jpeg": {
    "title": "City Lights from the Balcony",
    "caption": "Wind blowing through your hair as you gaze out over the sparkling cityscape at night.",
    "category": "her-photos",
    "location": "Balcony Viewpoint",
    "date": "Night Thoughts",
    "featured": false,
    "displayOrder": 40
  },
  "WhatsApp Image 2026-11-09 at 11.16.17 PM (1).jpeg": {
    "title": "Soft Smiles by the Bar Stools",
    "caption": "A gentle, radiant smile standing by the high wooden bar stools in the illuminated cafe.",
    "category": "her-photos",
    "location": "Cafe Date",
    "date": "2025",
    "featured": false,
    "displayOrder": 41
  },
  "WhatsApp Image 2026-11-09 at 11.16.17 PM.jpeg": {
    "title": "Effortlessly Graceful",
    "caption": "Natural, poised, and beautiful without even trying — my favourite person in any room.",
    "category": "her-photos",
    "location": "Cafe Outing",
    "date": "2025",
    "featured": false,
    "displayOrder": 42
  },
  "WhatsApp Image 2026-11-09 at 11.16.18 PM (1).jpeg": {
    "title": "Table for Two",
    "caption": "Sitting right across from me with long hair framing your face, having the best conversations.",
    "category": "favourite",
    "location": "Keventers Date",
    "date": "2025",
    "featured": true,
    "displayOrder": 13
  },
  "WhatsApp Image 2026-11-09 at 11.16.18 PM.jpeg": {
    "title": "Casual & Chic",
    "caption": "Leaning effortlessly by the counter, looking stylish in wide-leg denim and black sleeveless top.",
    "category": "her-photos",
    "location": "Cafe Outing",
    "date": "2025",
    "featured": false,
    "displayOrder": 43
  },
  "WhatsApp Image 2026-11-09 at 11.16.20 PM.jpeg": {
    "title": "Your Eyes Tell Stories",
    "caption": "Arms crossed on the warm wooden table, looking straight at me with that gentle, serene gaze.",
    "category": "favourite",
    "location": "Cafe Conversation",
    "date": "2025",
    "featured": true,
    "displayOrder": 14
  },
  "WhatsApp Image 2026-11-09 at 11.16.21 PM.jpeg": {
    "title": "Silken Hair & Quiet Thoughts",
    "caption": "A quiet, unposed moment at Keventers, long glossy hair catching the warm ceiling lights.",
    "category": "her-photos",
    "location": "Keventers Cafe",
    "date": "2025",
    "featured": false,
    "displayOrder": 44
  },
  "WhatsApp Image 2026-11-09 at 11.16.25 PM.jpeg": {
    "title": "Gentle Focus",
    "caption": "Looking down at the table, lost in the quiet warmth of an afternoon spent together.",
    "category": "her-photos",
    "location": "Cafe Afternoon",
    "date": "2025",
    "featured": false,
    "displayOrder": 47
  },
  "WhatsApp Image 2026-11-09 at 11.16.26 PM.jpeg": {
    "title": "Profile in Sunlight",
    "caption": "Turning slightly toward the conversation, showing off that elegant side profile and flowing hair.",
    "category": "her-photos",
    "location": "Cafe Table",
    "date": "2025",
    "featured": false,
    "displayOrder": 48
  },
  "WhatsApp Image 2026-11-09 at 11.16.31 PM.jpeg": {
    "title": "Terrace Cafe in the Hills",
    "caption": "Looking out over the Himalayan valley and hillside town from a wrought-iron terrace cafe.",
    "category": "vacations",
    "location": "Mussoorie / Hill Station Terrace",
    "date": "Our First Vacation",
    "featured": true,
    "displayOrder": 17
  },
  "WhatsApp Image 2026-11-09 at 11.16.36 PM.jpeg": {
    "title": "Hillside Lake Valley Vista",
    "caption": "Standing by the viewing rail in a warm varsity jacket overlooking the tranquil lake in the valley below.",
    "category": "vacations",
    "location": "Scenic Lake Overlook",
    "date": "Hill Station Trip",
    "featured": false,
    "displayOrder": 18
  },
  "WhatsApp Image 2026-11-09 at 11.16.41 PM.jpeg": {
    "title": "Overlooking Rolling Mountain Clouds",
    "caption": "Gazing into the distance across the pine valleys with dramatic clouds sweeping over the peaks.",
    "category": "vacations",
    "location": "Himalayan Ridge",
    "date": "Our First Vacation",
    "featured": false,
    "displayOrder": 19
  },
  "WhatsApp Image 2026-11-09 at 11.16.42 PM.jpeg": {
    "title": "Walking the Mountain Road",
    "caption": "A peaceful stroll along the mountain road in a classic denim jacket against green terraced hills.",
    "category": "vacations",
    "location": "Valley Route",
    "date": "Hillside Walk",
    "featured": false,
    "displayOrder": 24
  },
  "WhatsApp Image 2026-11-09 at 11.16.45 PM.jpeg": {
    "title": "Helmets & Open Highways",
    "caption": "Helmets buckled, ready for a cool breeze highway ride together with the open road ahead.",
    "category": "our-photos",
    "location": "Motorcycle Adventure",
    "date": "Road Trip",
    "featured": true,
    "displayOrder": 18
  },
  "WhatsApp Image 2026-11-09 at 11.16.56 PM (1).jpeg": {
    "title": "Mountain Trail Steps",
    "caption": "Climbing the hill path surrounded by deodar trees and clean mountain air.",
    "category": "vacations",
    "location": "Mussoorie Hills",
    "date": "Our First Vacation",
    "featured": false,
    "displayOrder": 31
  },
  "WhatsApp Image 2026-11-09 at 11.16.56 PM.jpeg": {
    "title": "Hilltop Pine Breeze",
    "caption": "Enjoying the refreshing Himalayan breeze among tall evergreens.",
    "category": "vacations",
    "location": "Hill Station Trails",
    "date": "Our First Vacation",
    "featured": false,
    "displayOrder": 32
  },
  "WhatsApp Image 2026-11-09 at 11.16.57 PM.jpeg": {
    "title": "Scenic Mountain Overlook",
    "caption": "Taking in the sweeping vistas of the Garhwal range stretching toward the horizon.",
    "category": "vacations",
    "location": "Mussoorie Viewpoint",
    "date": "Our First Vacation",
    "featured": false,
    "displayOrder": 33
  },
  "WhatsApp Image 2026-11-09 at 11.16.58 PM (1).jpeg": {
    "title": "Himalayan Ridge Walk",
    "caption": "Walking hand in hand through the scenic trails of the Queen of the Hills.",
    "category": "vacations",
    "location": "Mussoorie Ridge",
    "date": "Our First Vacation",
    "featured": false,
    "displayOrder": 34
  },
  "WhatsApp Image 2026-11-09 at 11.16.58 PM (2).jpeg": {
    "title": "Tall Deodars of Mussoorie",
    "caption": "Standing beneath the towering Deodar cedars framing the misty mountain valley.",
    "category": "vacations",
    "location": "Deodar Cedar Forest",
    "date": "Our First Vacation",
    "featured": false,
    "displayOrder": 35
  },
  "WhatsApp Image 2026-11-09 at 11.16.58 PM.jpeg": {
    "title": "Valley Whispers",
    "caption": "Resting on the stone ledge overlooking the lush valley below.",
    "category": "vacations",
    "location": "Mussoorie Ridge",
    "date": "Our First Vacation",
    "featured": false,
    "displayOrder": 36
  },
  "WhatsApp Image 2026-11-09 at 11.16.59 PM.jpeg": {
    "title": "Grand Carved Stone Doorway",
    "caption": "Standing gracefully beside the historic carved monument portal in your blue kurti and white ghagra.",
    "category": "her-photos",
    "location": "Delhi Heritage Monument",
    "date": "Our First Official Date",
    "featured": true,
    "displayOrder": 20
  },
  "WhatsApp Image 2026-11-09 at 11.17.00 PM.jpeg": {
    "title": "Mussoorie Mall Road & Gandhi Chowk",
    "caption": "Couple selfie strolling down Mall Road with the famous Gandhi statue in the background.",
    "category": "our-photos",
    "location": "Mussoorie Mall Road",
    "date": "Our First Vacation",
    "featured": true,
    "displayOrder": 21
  },
  "WhatsApp Image 2026-11-09 at 11.17.01 PM.jpeg": {
    "title": "Heritage Grace in Ghagra",
    "caption": "Standing by ancient stone carvings on our first official date, looking like a royal vision.",
    "category": "her-photos",
    "location": "Heritage Grounds",
    "date": "Our First Official Date",
    "featured": false,
    "displayOrder": 49
  },
  "WhatsApp Image 2026-11-09 at 11.17.02 PM.jpeg": {
    "title": "Christmas Fairy Lights Celebration",
    "caption": "Surrounded by the warm glow of Christmas fairy lights and holiday wreaths together.",
    "category": "our-photos",
    "location": "Christmas Celebration",
    "date": "Holiday Season",
    "featured": true,
    "displayOrder": 22
  },
  "WhatsApp Image 2026-11-09 at 11.17.03 PM.jpeg": {
    "title": "Our First Official Date & First Photograph",
    "caption": "The very first couple picture we ever took together at the historic monument archway.",
    "category": "our-photos",
    "location": "Historic Monument Archway",
    "date": "April 2025",
    "featured": true,
    "displayOrder": 1
  },
  "WhatsApp Image 2026-11-09 at 11.17.04 PM (1).jpeg": {
    "title": "Stone Wall Valley Viewpoint",
    "caption": "Standing by the mountain stone wall overlooking the rolling foothills of Garhwal.",
    "category": "vacations",
    "location": "Mussoorie Viewpoint",
    "date": "Our First Vacation",
    "featured": false,
    "displayOrder": 37
  },
  "WhatsApp Image 2026-11-09 at 11.17.04 PM.jpeg": {
    "title": "Stairs of the Ancient Fort",
    "caption": "Walking down the historic stone steps after exploring the monument grounds.",
    "category": "adventures",
    "location": "Heritage Complex",
    "date": "Our First Official Date",
    "featured": false,
    "displayOrder": 38
  },
  "WhatsApp Image 2026-11-09 at 11.17.05 PM (1).jpeg": {
    "title": "Courtyard Echoes",
    "caption": "Wandering through the open stone courtyards under the warm April sun.",
    "category": "adventures",
    "location": "Monument Courtyard",
    "date": "Our First Official Date",
    "featured": false,
    "displayOrder": 39
  },
  "WhatsApp Image 2026-11-09 at 11.17.05 PM.jpeg": {
    "title": "Metro Travel After Our First Date",
    "caption": "Riding the metro together after our first official date, still wearing our first-date outfits with huge smiles.",
    "category": "our-photos",
    "location": "Metro Journey",
    "date": "Our First Official Date",
    "featured": true,
    "displayOrder": 23
  },
  "WhatsApp Image 2026-11-09 at 11.17.07 PM.jpeg": {
    "title": "Archway Whispers",
    "caption": "Posing naturally beneath the weathered historic stone arch on our walk.",
    "category": "adventures",
    "location": "Heritage Trail",
    "date": "Our First Official Date",
    "featured": false,
    "displayOrder": 40
  },
  "WhatsApp Image 2026-11-09 at 11.17.08 PM.jpeg": {
    "title": "Sunlit Pathways",
    "caption": "Following the stone trail where our journey as an official couple first began.",
    "category": "adventures",
    "location": "Monument Grounds",
    "date": "Our First Official Date",
    "featured": false,
    "displayOrder": 41
  },
  "WhatsApp Image 2026-11-09 at 11.17.09 PM.jpeg": {
    "title": "Hugging the Penguin Plushie",
    "caption": "Holding the soft stuffed penguin tight while relaxing on the bed — the definition of adorable.",
    "category": "happy-moments",
    "location": "Cozy Room",
    "date": "Pure Comfort",
    "featured": true,
    "displayOrder": 24
  },
  "WhatsApp Image 2026-11-09 at 11.17.12 PM.jpeg": {
    "title": "Blowing Out 23rd Birthday Candles",
    "caption": "Making a secret wish and blowing out the golden 23 candles with that unforgettable birthday smile.",
    "category": "birthday",
    "location": "Birthday Celebration",
    "date": "10 November 2025",
    "isBirthdayCelebration": true,
    "featured": true,
    "displayOrder": 25
  },
  "WhatsApp Image 2026-11-09 at 11.17.13 PM (1).jpeg": {
    "title": "Rain Poncho at Christ Church",
    "caption": "Walking across the lush green lawn of historic Christ Church Mussoorie in a blue rain poncho.",
    "category": "vacations",
    "location": "Christ Church Mussoorie",
    "date": "Our First Vacation",
    "featured": false,
    "displayOrder": 42
  },
  "WhatsApp Image 2026-11-09 at 11.17.13 PM (2).jpeg": {
    "title": "Christ Church Spire & Pine Trees",
    "caption": "The Gothic stone tower of Christ Church rising into the misty mountain air of the hills.",
    "category": "vacations",
    "location": "Christ Church Mussoorie",
    "date": "Our First Vacation",
    "featured": false,
    "displayOrder": 43
  },
  "WhatsApp Image 2026-11-09 at 11.17.13 PM.jpeg": {
    "title": "Birthday Cake & Golden Glow",
    "caption": "Admiring the birthday cake with golden sparklers and balloons on your 23rd birthday.",
    "category": "birthday",
    "location": "Birthday Night",
    "date": "10 November 2025",
    "isBirthdayCelebration": true,
    "featured": true,
    "displayOrder": 26
  },
  "WhatsApp Image 2026-11-10 at 1.03.33 AM.jpeg": {
    "title": "Breathtaking in White",
    "caption": "Stunning mirror selfie in your elegant white two-piece birthday dress — truly breathtaking.",
    "category": "her-photos",
    "location": "Birthday Glam",
    "date": "Special Occasion",
    "isBirthdayCelebration": true,
    "featured": true,
    "displayOrder": 27
  },
  "WhatsApp Image 2026-11-10 at 1.03.34 AM (1).jpeg": {
    "title": "Hello Kitty Smiles & Booth Cuddles",
    "caption": "Sitting close together on the teal booth with cute Hello Kitty face filters, overflowing with happiness.",
    "category": "our-photos",
    "location": "Cafe Booth Date",
    "date": "Pure Happiness",
    "featured": true,
    "displayOrder": 28
  },
  "WhatsApp Image 2026-11-10 at 1.03.34 AM (2).jpeg": {
    "title": "Christmas Wreath & Holiday Pout",
    "caption": "A sweet romantic pout beside me in front of festive Christmas garlands and warm lights.",
    "category": "our-photos",
    "location": "Holiday Festivities",
    "date": "Christmas Season",
    "featured": true,
    "displayOrder": 29
  },
  "WhatsApp Image 2026-11-10 at 1.03.34 AM.jpeg": {
    "title": "Mr. Penguin Smiling Back",
    "caption": "The adorable plushie with eyes squeezed in a happy smile — our official mascot of coziness.",
    "category": "happy-moments",
    "location": "Cozy Keepsakes",
    "date": "Sweet Memories",
    "featured": false,
    "displayOrder": 44
  },
  "WhatsApp Image 2026-11-10 at 1.03.35 AM.jpeg": {
    "title": "Cafe Pout Encore",
    "caption": "Another look at that adorable cafe pout that makes my heart flutter every time.",
    "category": "favourite",
    "location": "Cafe Date",
    "date": "Special Dates",
    "featured": false,
    "displayOrder": 50
  },
  "WhatsApp Image 2026-11-10 at 1.03.36 AM.jpeg": {
    "title": "Rajouri Garden Social Balcony",
    "caption": "Seated at the blue-tiled table at Rajouri Garden Social overlooking the vibrant lights below.",
    "category": "her-photos",
    "location": "Rajouri Garden Social",
    "date": "Dinner Date",
    "featured": true,
    "displayOrder": 30
  },
  "WhatsApp Image 2026-11-10 at 1.03.37 AM.jpeg": {
    "title": "Take the Backpack!",
    "caption": "Playfully handing me the backpack across the table with that funny, animated expression.",
    "category": "happy-moments",
    "location": "Rajouri Garden Social",
    "date": "Playful Moments",
    "featured": false,
    "displayOrder": 45
  },
  "WhatsApp Image 2026-11-10 at 1.03.38 AM (1).jpeg": {
    "title": "Sleeper Bus Road Trip Smiles",
    "caption": "Late-night sleeper bus adventure, Shonaa in clear glasses and Vaibhav smiling from ear to ear.",
    "category": "our-photos",
    "location": "Overnight Road Trip",
    "date": "Travel Adventures",
    "featured": true,
    "displayOrder": 31
  },
  "WhatsApp Image 2026-11-10 at 1.03.38 AM (2).jpeg": {
    "title": "Silly Face Filters on the Bed",
    "caption": "Cracking up over funny wide-face filters while lounging around together — pure unfiltered laughs.",
    "category": "happy-moments",
    "location": "Lazy Afternoon",
    "date": "Goofy Laughs",
    "featured": false,
    "displayOrder": 46
  },
  "WhatsApp Image 2026-11-10 at 1.03.38 AM.jpeg": {
    "title": "Gym Mirror Selfie — Tuti Fruti Energy",
    "caption": "Looking sporty in grey tee and track pants at the gym, staying active and focused on goals.",
    "category": "her-photos",
    "location": "Gym Workout",
    "date": "Fitness Days",
    "featured": false,
    "displayOrder": 47
  },
  "WhatsApp Image 2026-11-10 at 1.03.39 AM (1).jpeg": {
    "title": "Carnival Night Under the Lights",
    "caption": "Soaring high above the fairgrounds on the Ferris wheel with festival lights below.",
    "category": "happy-moments",
    "location": "Night Carnival",
    "date": "Pure Joy",
    "featured": false,
    "displayOrder": 51
  },
  "WhatsApp Image 2026-11-10 at 1.03.39 AM (2).jpeg": {
    "title": "Afternoon Lunch Date Together",
    "caption": "Enjoying our meal side by side in matching easygoing style, smiling for a quick memory.",
    "category": "our-photos",
    "location": "Lunch Date",
    "date": "2025",
    "featured": false,
    "displayOrder": 48
  },
  "WhatsApp Image 2026-11-10 at 1.03.39 AM.jpeg": {
    "title": "Doodle Hearts & Cozy Thoughts",
    "caption": "Outlined in hand-drawn white hearts and clouds, chilling together in our warm little universe.",
    "category": "our-photos",
    "location": "Cozy Afternoon",
    "date": "Doodle Love",
    "featured": true,
    "displayOrder": 32
  },
  "WhatsApp Image 2026-11-10 at 1.03.40 AM (1).jpeg": {
    "title": "Maa's Loving Arms",
    "caption": "A cherished childhood scan celebrating unconditional maternal warmth and love.",
    "category": "her-photos",
    "location": "Family Keepsake",
    "date": "Precious Memories",
    "featured": false,
    "displayOrder": 52
  },
  "WhatsApp Image 2026-11-10 at 1.03.40 AM (2).jpeg": {
    "title": "Plumeria Petals in the Breeze",
    "caption": "Soft smiles with the tropical plumeria flower tucked behind your ear.",
    "category": "her-photos",
    "location": "Sweet Selfies",
    "date": "2025",
    "featured": false,
    "displayOrder": 53
  },
  "WhatsApp Image 2026-11-10 at 1.03.40 AM.jpeg": {
    "title": "Dandiya Night in Sparkling Fuchsia",
    "caption": "Radiant in a glittering magenta traditional lehenga under the festive festival streamers.",
    "category": "special-days",
    "location": "Dandiya / Garba Festival",
    "date": "Festival Nights",
    "featured": true,
    "displayOrder": 33
  },
  "WhatsApp Image 2026-11-10 at 1.03.41 AM (1).jpeg": {
    "title": "Qutub Minar Halo",
    "caption": "The glowing stone pinnacle of Qutub Minar rising straight behind you like an architectural crown.",
    "category": "her-photos",
    "location": "Qutub Complex",
    "date": "Night Walk",
    "featured": false,
    "displayOrder": 49
  },
  "WhatsApp Image 2026-11-10 at 1.03.41 AM.jpeg": {
    "title": "Hardware Store Ski Goggles Explorer",
    "caption": "Trying on giant reflective blue ski goggles in the hardware aisle with the biggest, cheekiest smile.",
    "category": "happy-moments",
    "location": "DIY Hardware Store",
    "date": "Silly Adventures",
    "featured": true,
    "displayOrder": 34
  }
} as Record<string, MediaOverride>,

  // =========================================================================
  // 5. OUR VIDEOS
  // =========================================================================
  videos: [
    {
      id: "video-1",
      title: "Our Unfiltered Laughter",
      src: "/memories/birthday/WhatsApp Video 2026-11-09 at 11.15.56 PM.mp4",
      thumbnail: "/memories/birthday/WhatsApp Image 2026-11-09 at 11.15.56 PM.jpeg",
      caption: "The spontaneous, unposed moments that make us laugh till our stomachs hurt.",
      date: "Our Journey",
      duration: "0:25",
      isRealAsset: true,
    },
    {
      id: "video-2",
      title: "Sweet Memories & Playful Smiles",
      src: "/memories/birthday/WhatsApp Video 2026-11-09 at 11.16.10 PM.mp4",
      thumbnail: "/memories/birthday/WhatsApp Image 2026-11-09 at 11.16.13 PM (2).jpeg",
      caption: "The tender, quiet seconds where everything in the universe feels just right.",
      date: "Cherished Times",
      duration: "0:30",
      isRealAsset: true,
    },
    {
      id: "video-3",
      title: "Wanderlust & Breezy Roads",
      src: "/memories/birthday/WhatsApp Video 2026-11-09 at 11.16.28 PM.mp4",
      thumbnail: "/memories/birthday/WhatsApp Image 2026-11-09 at 11.17.00 PM.jpeg",
      caption: "Cool breezes, open roads, and traveling together side by side.",
      date: "Travel Diaries",
      duration: "0:45",
      isRealAsset: true,
    },
    {
      id: "video-4",
      title: "Birthday Cheer & Joy",
      src: "/memories/birthday/WhatsApp Video 2026-11-09 at 11.17.15 PM.mp4",
      thumbnail: "/memories/birthday/WhatsApp Image 2026-11-09 at 11.17.12 PM.jpeg",
      caption: "Celebrating your special day with overflowing joy and happiness.",
      date: "Birthday Celebration",
      duration: "0:20",
      isRealAsset: true,
    },
    {
      id: "video-5",
      title: "Rakhlo Tum Chupaake",
      src: "/audio/Rakhlo_Tum_Chupaake.webm",
      thumbnail: "/memories/birthday/WhatsApp Image 2026-11-09 at 11.16.13 PM (2).jpeg",
      caption: "A romantic musical memory kept close to our hearts.",
      date: "Our Special Song",
      duration: "3:40",
      isRealAsset: true,
    },
  ] as VideoMemory[],

  // =========================================================================
  // 6. OUR COMPLETE STORY — CHRONOLOGICAL TIMELINE
  // =========================================================================
  timeline: [
    {
      id: "tl-1",
      title: "The First Spark",
      date: "March 2025",
      tag: "The Beginning",
      description: "Our story began in March 2025. Before any official date, there was already an unspoken connection between us — a feeling that something rare and magical had quietly arrived.",
      image: "/memories/birthday/WhatsApp Image 2026-11-09 at 11.15.59 PM.jpeg",
      note: "Before the official date, there was already an us.",
    },
    {
      id: "tl-2",
      title: "14 April 2025 — Officially Us",
      date: "14 April 2025",
      tag: "Official Date",
      description: "The day we made it official. 14 April 2025 marks the exact moment we chose each other, took each other's hands, and began walking this beautiful road together.",
      image: "/memories/birthday/WhatsApp Image 2026-11-09 at 11.17.05 PM.jpeg",
      note: "14 April 2025 — The day we officially became us.",
    },
    {
      id: "tl-3",
      title: "Our First Official Date & First Photograph",
      date: "April 2025",
      tag: "First Photo",
      description: "Our first date after officially coming together. You wore your breathtaking white and blue ghagra, and we stood by the carved stone monument to take our very first photograph together as a couple.",
      image: "/memories/birthday/WhatsApp Image 2026-11-09 at 11.17.03 PM.jpeg",
      note: "The very first picture of us — the start of our memory gallery.",
    },
    {
      id: "tl-4",
      title: "First Vacation — Mussoorie Getaway",
      date: "Mussoorie Trip",
      tag: "First Vacation",
      description: "Our first trip together to the Queen of the Hills. Walking along Mall Road past Gandhi Chowk, climbing through cool mountain air, exploring Robber's Cave trails, and visiting Christ Church.",
      image: "/memories/birthday/WhatsApp Image 2026-11-09 at 11.17.00 PM.jpeg",
      note: "No mountain height or valley view compares to having you beside me.",
    },
    {
      id: "tl-5",
      title: "Helmets & Open Highway Rides",
      date: "Road Adventure",
      tag: "Adventures",
      description: "Strapping on our helmets, feeling the rush of cool wind, and holding on tight. Wherever the road leads, as long as it's with you, every journey is an adventure.",
      image: "/memories/birthday/WhatsApp Image 2026-11-09 at 11.16.45 PM.jpeg",
      note: "Two helmets, open roads, and an endless horizon together.",
    },
    {
      id: "tl-6",
      title: "Fairy Lights & Holiday Warmth",
      date: "December Holidays",
      tag: "Celebration",
      description: "Celebrating Christmas and festive evenings together surrounded by warm yellow fairy lights. Standing close, laughing, and realizing that home isn't a building — it's being with you.",
      image: "/memories/birthday/WhatsApp Image 2026-11-09 at 11.17.02 PM.jpeg",
      note: "Warm lights, holiday warmth, and the greatest gift of all — you.",
    },
    {
      id: "tl-7",
      title: "Your 23rd Birthday Celebration",
      date: "10 November 2025",
      tag: "Birthday Memories",
      description: "Watching the golden glow of candles light up your face as you made a wish and blew out the candles with golden number 23 on your cake.",
      image: "/memories/birthday/WhatsApp Image 2026-11-09 at 11.17.12 PM.jpeg",
      note: "A wish whispered in the dark, and a love that grows brighter every year.",
    },
    {
      id: "tl-8",
      title: "Today — Happy 24th Birthday, Shonaa! ❤️",
      date: "10 November 2026",
      tag: "Forever & Always",
      description: "Today is 10 November 2026 — your 24th birthday! This entire website, every song, every photo, and every word is built to celebrate you, my favourite person.",
      image: "/memories/birthday/WhatsApp Image 2026-11-09 at 11.16.13 PM (2).jpeg",
      note: "Happy 24th Birthday Shonaa. The universe is yours, today and forever.",
    },
  ] as MilestoneItem[],

  // =========================================================================
  // 7. OUR FIGHTS & RECONCILIATIONS (Playful & Loving)
  // =========================================================================
  imperfectChapters: {
    title: "Not Every Chapter Was Perfect, But Every Chapter Was Ours.",
    subtitle: "Because real love isn't a fairy tale with no bumps — it's laughing five minutes after arguing over something ridiculous.",
    fights: [
      {
        id: "fight-1",
        topic: "The Great 'What Should We Eat?' Debate",
        whatHappened: "\"I'm good with anything! Okay, pizza? No, definitely not pizza... 45 minutes of menu browsing later...\"",
        aftermath: "Ended up ordering our comfort food, eating together, and laughing at how silly we are every single time.",
        verdict: "I would still wait two hours just to eat whatever you are craving.",
      },
      {
        id: "fight-2",
        topic: "Just 5 More Minutes...",
        whatHappened: "\"Promised 'last round' three rounds ago while receiving the legendary loving side-eye.\"",
        aftermath: "Closed the screen, apologized sheepishly, and gave 100% undivided cuddles and attention.",
        verdict: "Winning any game < Making you smile.",
      },
      {
        id: "fight-3",
        topic: "Navigation & Missing The Highway Exit",
        whatHappened: "\"Turn left! No, the OTHER left! Missed the exit because we were singing too loud to notice the GPS.\"",
        aftermath: "Turned a 15-minute commute into a scenic 45-minute tour with songs on maximum volume.",
        verdict: "I never mind taking the scenic route when it means 30 more minutes with you.",
      },
      {
        id: "fight-4",
        topic: "The 'Who Loves Who More?' Battle",
        whatHappened: "\"An endless back-and-forth of 'I love you more' / 'No, scientifically impossible, I love you more.'\"",
        aftermath: "Agreed to declare it a tie, but deep down I know I'm the lucky one who got you.",
        verdict: "A disagreement I am happy to lose every single day of my life.",
      },
    ],
    reasonsToChooseYou: [
      "Because your angry pout is secretly the most adorable thing on earth.",
      "Because you never let an argument go to sleep without checking if we're okay.",
      "Because saying sorry to you feels like coming home.",
      "Because even when we disagree, you still hold my hand tight.",
    ],
  },

  // =========================================================================
  // 8. OUR HAPPY MOMENTS
  // =========================================================================
  happyMoments: {
    title: "If happiness had photographs, these would be my favourites.",
    subtitle: "The unscripted magic that turns ordinary weekdays into poetry.",
    moments: [
      {
        id: "hm-1",
        title: "Late Night Blanket Video Calls",
        description: "Whispering through the screen when the whole world is asleep, wrapped up in warm blankets, sharing sleepy giggles, and drifting off together.",
        badge: "Late Nights",
      },
      {
        id: "hm-2",
        title: "Uncontrollable Laugh Attacks",
        description: "Those moments when one of us says something absurd and we both laugh so hard our stomachs hurt and no sound comes out.",
        badge: "Pure Joy",
      },
      {
        id: "hm-3",
        title: "Food Comas & Shared Desserts",
        description: "Stealing the last fry, arguing over who gets more frosting, and claiming we're 'too full' right before ordering dessert.",
        badge: "Comfort",
      },
      {
        id: "hm-4",
        title: "Surprise Hugs & Cheek Kisses",
        description: "Wrapping arms around each other when least expected and feeling our whole bodies relax into our safest place.",
        badge: "Safe Place",
      },
    ],
  },

  // =========================================================================
  // 9. OUR TRAVEL DIARY & POSTCARDS
  // =========================================================================
  travelDiary: {
    title: "Everywhere feels like somewhere special when I'm with you.",
    subtitle: "Postcards from the trails, valleys, and streets we've wandered together.",
    destinations: [
      {
        id: "dest-1",
        placeName: "Mussoorie — Queen of the Hills",
        stateOrCountry: "Uttarakhand, India",
        date: "Our First Vacation",
        image: "/memories/birthday/WhatsApp Image 2026-11-09 at 11.15.56 PM.jpeg",
        whatWeDid: "Stood high on the cliffs overlooking misty mountain ridges, wandered Mall Road hand in hand past Gandhi Chowk, and visited historic Christ Church.",
        favouriteMemory: "The way the cool mountain breeze blew through your hair as you stood against the rolling clouds.",
        personalNote: "I used to admire scenic wallpapers; now I just admire you standing against the Himalayan mountains.",
        stampText: "HILL STATION POST",
      },
      {
        id: "dest-2",
        placeName: "Robber's Cave (Guchhupani) Nature Trail",
        stateOrCountry: "Dehradun / Mussoorie Route",
        date: "Nature Hike & Caverns",
        image: "/memories/birthday/WhatsApp Image 2026-11-09 at 11.15.57 PM (1).jpeg",
        whatWeDid: "Hiked through moss-covered cavernous trails, laughed at the 'Mind Your Head' sign, ducked beneath natural stone tunnels, and stepped through cool streams.",
        favouriteMemory: "Catching a beam of pure sunlight breaking through the dark cave ceiling right onto us.",
        personalNote: "No hike feels long or arduous when every step is taken beside you.",
        stampText: "ADVENTURE AIR MAIL",
      },
      {
        id: "dest-3",
        placeName: "Historic Monuments & Heritage Walk",
        stateOrCountry: "Delhi Heritage",
        date: "Our First Official Date",
        image: "/memories/birthday/WhatsApp Image 2026-11-09 at 11.16.59 PM.jpeg",
        whatWeDid: "Walked along historic stonework archways and carved jali windows on our first official date.",
        favouriteMemory: "You turning around in your white and blue ghagra with the calmest, most graceful smile.",
        personalNote: "Stone might stand for centuries, but what we have built is eternal.",
        stampText: "ROYAL POST — FIRST DATE",
      },
    ] as TravelDestination[],
  },

  // =========================================================================
  // 10. HER DREAMS AND ASPIRATIONS
  // =========================================================================
  dreams: {
    title: "Your Dreams Matter to Me, Shonaa.",
    subtitle: "I believe in your talent, your ambition, and your brilliant mind more than words can express.",
    aspirations: [
      {
        id: "asp-1",
        title: "Soaring In Your Career",
        description: "Watching you conquer new challenges, lead meaningful projects, and earn every bit of recognition and success you deserve.",
        icon: "Briefcase",
      },
      {
        id: "asp-2",
        title: "Independence & Cozy Living",
        description: "Building a space of your own, filled with warm lighting, cozy corners, flourishing plants, and your favourite books.",
        icon: "Sparkles",
      },
      {
        id: "asp-3",
        title: "Mastering New Passions",
        description: "Exploring creative pursuits, languages, culinary arts, and expanding that sharp, beautiful intellect.",
        icon: "BookOpen",
      },
      {
        id: "asp-4",
        title: "Inner Peace & Abundant Joy",
        description: "Days where you wake up without stress, surrounded by people who cherish you, feeling deeply fulfilled.",
        icon: "Heart",
      },
    ],
    bucketList: [
      { id: "bl-1", text: "Watch Northern Lights dancing under the Arctic sky in Norway", category: "travel", completed: false },
      { id: "bl-2", text: "Walk through pink cherry blossom tunnels in Kyoto, Japan", category: "travel", completed: false },
      { id: "bl-3", text: "Spend a week in a cozy glass-roof cottage in the Swiss Alps", category: "travel", completed: false },
      { id: "bl-4", text: "Midnight motorcycle rides with the cool wind and music playing", category: "experience", completed: true, notes: "One of our best adventures!" },
      { id: "bl-5", text: "Bake a multi-layer birthday cake from scratch together", category: "together", completed: false },
      { id: "bl-6", text: "Adopt a furry puppy and give it a silly name", category: "goals", completed: false },
      { id: "bl-7", text: "Build our dream home with a sunny reading nook and balcony garden", category: "together", completed: false },
      { id: "bl-8", text: "Celebrate your 50th birthday together, still laughing just as hard", category: "together", completed: false },
    ] as BucketListItem[],
    dreamDestinations: [
      { name: "Santorini, Greece", country: "White terraces & blue sunsets over the Aegean Sea" },
      { name: "Swiss Alps", country: "Snow-covered peaks, alpine trains, and cozy chalets" },
      { name: "Kyoto & Tokyo, Japan", country: "Lantern-lit streets, cherry blossoms & ramen" },
      { name: "Amalfi Coast, Italy", country: "Pastel cliffside villas overlooking turquoise waters" },
    ],
  },

  // =========================================================================
  // 11. REASONS I LOVE YOU
  // =========================================================================
  reasonsILoveYou: [
    { id: 1, reason: "The way your eyes crinkle at the corners when something genuinely amuses you.", category: "smile" },
    { id: 2, reason: "How you make anywhere we go feel safe, comfortable, and warm.", category: "heart" },
    { id: 3, reason: "The way you hold my arm tightly when we're walking through crowded streets.", category: "together" },
    { id: 4, reason: "Your silly little happy dance whenever delicious food arrives at the table.", category: "quirk" },
    { id: 5, reason: "How you genuinely care about people and animals around you.", category: "heart" },
    { id: 6, reason: "The sound of your voice first thing in the morning and right before sleep.", category: "smile" },
    { id: 7, reason: "How you can calm my stormy mind with just a single touch of your hand.", category: "heart" },
    { id: 8, reason: "Because you make me want to be the best version of myself every single day.", category: "together" },
    { id: 9, reason: "Your stubborn determination when you set your mind to achieving a goal.", category: "quirk" },
    { id: 10, reason: "The way you look in cozy oversized sweatshirts with hot coffee or tea.", category: "quirk" },
    { id: 11, reason: "How you remember the smallest details I mentioned weeks ago in passing.", category: "heart" },
    { id: 12, reason: "Because out of eight billion people on this planet, my soul chose you.", category: "together" },
  ] as LoveReason[],

  // =========================================================================
  // 12. OPEN WHEN... (Interactive Digital Envelopes)
  // =========================================================================
  openWhen: [
    {
      id: "ow-1",
      trigger: "Open When You Miss Me",
      tagline: "When distance feels too loud",
      title: "I Am Never Far From You",
      letter: `Whenever you feel far away from me, look at your phone, look at these photos, or close your eyes for ten seconds. 

Remember our rides under the open sky, our walks through Mussoorie, and every time you rested your head on my shoulder. Distance is just physical space — my heart is always right beside yours, listening, caring, and loving you every second.`,
      signature: "Always a heartbeat away, Vaibhav ❤️",
      photo: "/memories/birthday/WhatsApp Image 2026-11-09 at 11.16.13 PM (2).jpeg",
    },
    {
      id: "ow-2",
      trigger: "Open When You're Sad",
      tagline: "When the clouds roll in",
      title: "You Don't Have To Be Strong Today",
      letter: `It's okay to feel overwhelmed. It's okay to have days where you just want to curl up and do nothing. You don't have to carry the weight of the entire world on your shoulders.

You are safe, you are deeply cherished, and whatever is worrying you right now, we will handle it together. Take a deep breath, my love. You are never alone.`,
      signature: "Your safe haven, Vaibhav ❤️",
      photo: "/memories/birthday/WhatsApp Image 2026-11-09 at 11.17.09 PM.jpeg",
    },
    {
      id: "ow-3",
      trigger: "Open When You Need Motivation",
      tagline: "Before a big challenge or exam",
      title: "You Are Capable Of Anything",
      letter: `Remember how hard you've worked to get here. Remember every single challenge you thought was impossible, and yet you conquered it.

You have a sharp mind, an unstoppable spirit, and a heart full of courage. Walk into that room with your head held high. I believe in you with every fiber of my being.`,
      signature: "Cheering for you always, Vaibhav ❤️",
    },
    {
      id: "ow-4",
      trigger: "Open When You Want To Smile",
      tagline: "A quick dose of instant happiness",
      title: "Remember That Time...",
      letter: `Remember when you wrapped yourself in a blanket like a ghost holding a thermos on our late night call? Or when you fell asleep inside that futuristic massage chair capsule pod? Or how we argued for 45 minutes over what to eat only to order our exact usual comfort food?

You bring so much unfiltered joy into my life, Shonaa. Never stop smiling that radiant smile.`,
      signature: "Your goofy partner, Vaibhav ❤️",
      photo: "/memories/birthday/WhatsApp Image 2026-11-09 at 11.15.58 PM (3).jpeg",
    },
    {
      id: "ow-5",
      trigger: "Open When You Need A Reminder",
      tagline: "How truly special you are",
      title: "Just In Case You Forgot",
      letter: `You are breathtakingly beautiful — not just when you're dressed up in your white and blue ghagra, but in the morning with messy hair, in oversized hoodies, and when you're laughing so hard your nose scrunches up.

You make ordinary days feel extraordinary. Don't ever doubt how truly irreplaceable and treasured you are to me.`,
      signature: "Yours completely, Vaibhav ❤️",
      photo: "/memories/birthday/WhatsApp Image 2026-11-09 at 11.15.59 PM.jpeg",
    },
  ] as OpenWhenLetter[],

  // =========================================================================
  // 13. OUR FUTURE — SHARED BUCKET LIST
  // =========================================================================
  ourFuture: {
    title: "Our Future Together",
    subtitle: "A lifetime of adventures, quiet moments, and dreams we're building side by side.",
    futurePromises: [
      "To always listen to your thoughts, even when they're whispered late at night.",
      "To celebrate your small victories just as loudly as the big milestones.",
      "To hold your hand through every unfamiliar city and every unexpected storm.",
      "To never let our playful laughter fade as the years roll on.",
    ],
  },

  // =========================================================================
  // 14. THE FINAL LETTER (Closing Envelope & Birthday Surprise)
  // =========================================================================
  finalLetter: {
    envelopePrompt: "Click to open your special birthday letter, Shonaa",
    title: "My Dearest Shonaa,",
    subtitle: "A Letter From My Heart To Yours",
    date: "10 November 2026",
    content: `If I had to summarize everything you are to me in a single sentence, it would be this: You made my life feel like poetry.

Looking back on our journey — from that quiet spark in March 2025 to 14 April 2025 when we officially became us, through our first date in your white and blue ghagra, our chilly walks on Mussoorie's Mall Road, our motorcycle rides in the wind, and all the silly late-night blanket calls — every single second has been the greatest gift of my life.

You have the kindest heart, the most infectious smile, and a brilliance that inspires me every single day. Seeing you blow out your candles and smile that radiant smile is all I ever want.

Happy 24th Birthday, Shonaa. May this year bring you all the success, happiness, and peace you so richly deserve. I will always be right here, cheering for you, holding your hand, and loving you through every chapter of our lives.`,
    closingQuote: "Here's to you, to us, and to all the beautiful memories still waiting to happen.",
    signature: "Forever yours, Vaibhav ❤️",
  },
};
