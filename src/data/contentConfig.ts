/**
 * OUR LITTLE UNIVERSE — CENTRAL CONTENT CONFIGURATION
 * 
 * Edit any names, dates, memories, photos, letters, or music tracks here.
 * All components across the application consume data directly from this configuration.
 */

export interface MilestoneItem {
  id: string;
  title: string;
  date: string;
  tag: string;
  description: string;
  image?: string;
  note?: string;
}

export interface PhotoMemory {
  id: string;
  title: string;
  category: 'favourite' | 'smile' | 'random' | 'best-days' | 'just-you' | 'just-us' | 'unforgettable';
  src: string;
  thumbnail?: string;
  caption: string;
  date?: string;
  location?: string;
  rotation?: number; // Tilt degree for scrapbook feel
}

export interface VideoMemory {
  id: string;
  title: string;
  src: string;
  thumbnail: string;
  caption: string;
  date?: string;
  duration?: string;
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
  category: 'travel' | 'experience' | 'personal' | 'together';
  completed: boolean;
  notes?: string;
}

export interface LoveReason {
  id: number;
  reason: string;
  category: 'quirk' | 'heart' | 'smile' | 'together';
  icon?: string;
}

export interface OpenWhenLetter {
  id: string;
  trigger: string;
  tagline: string;
  title: string;
  letter: string;
  signature: string;
  photo?: string;
  songRecommendation?: string;
}

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  src: string;
  isCustomFile: boolean;
  type: 'ambient' | 'celebration' | 'acoustic';
}

export const contentConfig = {
  // ==========================================
  // 1. COUPLE IDENTITY & CORE DATES
  // ==========================================
  couple: {
    girlfriendName: "Theia",
    girlfriendNickname: "Shona",
    boyfriendName: "Vaibhav",
    websiteTitle: "Our Little Universe",
    tagline: "For the girl who made my world beautiful.",
    birthdayCelebrationTitle: "Happy Birthday, Theia!",
    birthdayAge: 24, // Editable
  },

  // ==========================================
  // 2. IMPORTANT TIMELINE DATES & COUNTDOWNS
  // ==========================================
  dates: {
    // Relationship start date (ISO string or YYYY-MM-DDTHH:mm:ss)
    // Used for the live relationship duration counter
    relationshipStart: "2023-08-15T00:00:00+05:30", 
    relationshipStartDisplay: "August 15, 2023",

    // Her Birthday date & time in Asia/Kolkata timezone
    // Format: YYYY-MM-DDTHH:mm:ss
    nextBirthday: "2027-07-31T00:00:00+05:30",
    birthdayDisplay: "July 31",
    timezone: "Asia/Kolkata",

    // Relationship Key Milestones
    firstMeeting: {
      date: "September 2022",
      title: "The Day Our Paths Crossed",
      description: "A random day that turned out to be the most important turning point of my life.",
      location: "Campus / First Meeting Place",
    },
    firstConversation: {
      date: "October 2022",
      title: "Our Very First Conversation",
      description: "It started with a simple exchange and ended up lasting for hours without either of us noticing the time.",
    },
    firstDate: {
      date: "February 2023",
      title: "Our First Official Date",
      description: "Nervous smiles, lingering eye contact, and realizing that dinner was just an excuse to stay together longer.",
    },
    firstPhoto: {
      date: "June 2023",
      title: "Our First Photograph Together",
      description: "The beginning of a thousand photos we'd take, capture, and treasure.",
    },
  },

  // ==========================================
  // 3. BACKGROUND MUSIC PLAYLIST
  // ==========================================
  music: {
    enabled: true,
    defaultVolume: 0.5,
    autoPlayPrompt: "Click anywhere or press Open to experience Our Little Universe with sound",
    tracks: [
      {
        id: "ambient-love",
        title: "Golden Hour Piano & Strings",
        artist: "Our Soundtrack",
        src: "/audio/ambient-melody.mp3",
        isCustomFile: true,
        type: "ambient",
      },
      {
        id: "acoustic-memories",
        title: "Soft Acoustic Sunset",
        artist: "Quiet Moments",
        src: "/audio/acoustic-love.mp3",
        isCustomFile: true,
        type: "acoustic",
      },
      {
        id: "birthday-fanfare",
        title: "Birthday Wonder & Celebration",
        artist: "Celebration Special",
        src: "/audio/birthday-celebration.mp3",
        isCustomFile: true,
        type: "celebration",
      },
    ] as MusicTrack[],
  },

  // ==========================================
  // 4. MEMORY PHOTO GALLERY
  // ==========================================
  photos: [
    {
      id: "photo-1",
      title: "Wrapped In Your Warmth",
      category: "favourite",
      src: "/memories/couple-christmas.jpg",
      caption: "Surrounded by fairy lights and warm festive glow, but the brightest thing in the room was you.",
      date: "Christmas Evening",
      location: "Home & Cozy Lights",
      rotation: -2,
    },
    {
      id: "photo-2",
      title: "The Sweetest Cheek Kiss",
      category: "smile",
      src: "/memories/couple-kiss-bows.jpg",
      caption: "Pink bows, cheek kisses, and the unfiltered happiness of being completely ourselves together.",
      date: "Candid Afternoon",
      location: "Our Happy Corner",
      rotation: 3,
    },
    {
      id: "photo-3",
      title: "Mountain Heights & Open Skies",
      category: "best-days",
      src: "/memories/travel-mountain-valley.jpg",
      caption: "High above the misty valleys, wind in your hair, standing on top of the world with you.",
      date: "Hill Station Getaway",
      location: "Scenic Mountain Overlook",
      rotation: -1,
    },
    {
      id: "photo-4",
      title: "Golden Hour Perfection",
      category: "just-you",
      src: "/memories/portrait-golden-hour.jpg",
      caption: "The sunlight was just trying to match how effortlessly radiant you look every single day.",
      date: "Summer Golden Hour",
      location: "Under The Sun",
      rotation: 2,
    },
    {
      id: "photo-5",
      title: "The Goofy Cafe Face",
      category: "random",
      src: "/memories/funny-cafe-smile.jpg",
      caption: "The mischievous grin across the table that can dissolve any bad mood in five seconds flat.",
      date: "Cafe Date",
      location: "Food & Laughter",
      rotation: -3,
    },
    {
      id: "photo-6",
      title: "Lush Green Adventure",
      category: "best-days",
      src: "/memories/travel-green-caves.jpg",
      caption: "Walking through emerald moss and shaded forest caves — you made nature look even more beautiful.",
      date: "Nature Trail Trail",
      location: "Forest Trail & Moss Caves",
      rotation: 1,
    },
    {
      id: "photo-7",
      title: "Two Helmets, One Road",
      category: "just-us",
      src: "/memories/couple-scooter-helmets.jpg",
      caption: "Any road becomes my favourite road when you're sitting behind me holding on tight.",
      date: "Evening Ride",
      location: "Open Roads",
      rotation: -2,
    },
    {
      id: "photo-8",
      title: "Heart Doodles & That Smile",
      category: "just-you",
      src: "/memories/portrait-hearts.jpg",
      caption: "Hearts drawn on the screen because there isn't a frame big enough to hold my affection.",
      date: "Special Evening",
      location: "Dinner Outing",
      rotation: 2,
    },
    {
      id: "photo-9",
      title: "Historic Archway Grace",
      category: "best-days",
      src: "/memories/travel-heritage-arch.jpg",
      caption: "Centuries-old stone architecture, but you were the only masterpiece I was looking at.",
      date: "Day Trip Exploration",
      location: "Heritage Monument",
      rotation: -1,
    },
    {
      id: "photo-10",
      title: "Making A Birthday Wish",
      category: "unforgettable",
      src: "/memories/birthday-cake-candles.jpg",
      caption: "Watching you close your eyes, make a silent wish, and blow out the candles. May life give you everything.",
      date: "Birthday Midnight",
      location: "Birthday Cake & Warmth",
      rotation: 3,
    },
    {
      id: "photo-11",
      title: "Christmas Tree Magic",
      category: "favourite",
      src: "/memories/celebration-christmas-tree.jpg",
      caption: "Tinsel, ornaments, and holiday packages, but having you here makes every single day a holiday.",
      date: "Holiday Cheer",
      location: "Festive Living Room",
      rotation: -3,
    },
    {
      id: "photo-12",
      title: "Gamer Cat In Focus",
      category: "random",
      src: "/memories/funny-cat-gaming.jpg",
      caption: "When he says 'just 5 minutes babe, let me finish this match' — accurate inside joke depiction!",
      date: "Every Weekend",
      location: "Gaming Den",
      rotation: 2,
    },
  ] as PhotoMemory[],

  // ==========================================
  // 5. MOVING MEMORIES (VIDEOS)
  // ==========================================
  videos: [
    {
      id: "video-1",
      title: "Our Unfiltered Laughter",
      src: "/videos/memory-video-1.mp4",
      thumbnail: "/memories/couple-christmas.jpg",
      caption: "The moments between the poses, the sound of your laugh, and how everything felt so effortless.",
      date: "Memories In Motion",
      duration: "0:30",
    },
  ] as VideoMemory[],

  // ==========================================
  // 6. OUR STORY — CHRONOLOGICAL TIMELINE
  // ==========================================
  timeline: [
    {
      id: "tl-1",
      title: "The First Time I Saw You",
      date: "Autumn 2022",
      tag: "The Spark",
      description: "I remember what you were wearing and how you carried yourself with an easy, radiant warmth. I had no idea that brief moment would completely reshape my life.",
      image: "/memories/portrait-golden-hour.jpg",
      note: "Some people walk into your life quietly, but their echo stays forever.",
    },
    {
      id: "tl-2",
      title: "When Talking To You Felt Like Breathing",
      date: "Late 2022",
      tag: "Conversations",
      description: "Our first long conversations where hours felt like minutes. Discovering your mind, your humor, your perspectives, and realizing I never wanted the call to end.",
      note: "That was the moment I realized you weren't just someone new — you were someone rare.",
    },
    {
      id: "tl-3",
      title: "Our First Date & Shy Smiles",
      date: "Early 2023",
      tag: "Beginning",
      description: "Sitting across from you, trying not to stare too obvious, laughing at silly things, and walking together hoping the night would never run out of streetlights.",
      image: "/memories/couple-kiss-bows.jpg",
      note: "I walked away with butterflies that haven't stopped flying since.",
    },
    {
      id: "tl-4",
      title: "Taking On The World On Two Wheels",
      date: "Mid 2023",
      tag: "Adventures",
      description: "Zipping through evening traffic, wind against our helmets, exploring random corners of the city, and discovering that the journey is ten times sweeter with you.",
      image: "/memories/couple-scooter-helmets.jpg",
      note: "The simple rides on the scooter will always beat the fanciest destinations.",
    },
    {
      id: "tl-5",
      title: "Climbing Mountains & Valley Views",
      date: "Autumn 2023",
      tag: "Getaways",
      description: "Standing on the edge of mountain hills, looking out at miles of green valleys, breathing crisp mountain air, and holding hands above the clouds.",
      image: "/memories/travel-mountain-valley.jpg",
      note: "No altitude can match the high of loving you.",
    },
    {
      id: "tl-6",
      title: "Fairy Lights, Christmas Trees & Warmth",
      date: "Winter 2023",
      tag: "Celebration",
      description: "Celebrating holidays surrounded by glowing fairy lights, hot beverages, exchanged gifts, and the peaceful contentment of knowing we are each other's safe home.",
      image: "/memories/celebration-christmas-tree.jpg",
      note: "Home isn't a building; it's you.",
    },
    {
      id: "tl-7",
      title: "Cave Trails & Forest Walks",
      date: "Summer 2024",
      tag: "Nature",
      description: "Exploring secret water caves and moss-covered pathways. Ducking under rocks, laughing at low ceilings, and falling in love with your adventurous spirit.",
      image: "/memories/travel-green-caves.jpg",
      note: "You turn every little hike into a story worth telling.",
    },
    {
      id: "tl-8",
      title: "Today — And Every Tomorrow",
      date: "Present",
      tag: "Forever",
      description: "Every second we've shared has built this little universe of ours. And today, I celebrate the most incredible person in it: You.",
      image: "/memories/birthday-cake-candles.jpg",
      note: "Happy Birthday, my love. The best chapters are yet to be written.",
    },
  ] as MilestoneItem[],

  // ==========================================
  // 7. OUR FIGHTS & IMPERFECT CHAPTERS (Playful & Warm)
  // ==========================================
  imperfectChapters: {
    title: "Not Every Chapter Was Perfect, But Every Chapter Was Ours.",
    subtitle: "Because real love isn't a fairy tale with no bumps — it's laughing five minutes after arguing over something ridiculous.",
    fights: [
      {
        id: "fight-1",
        topic: "What To Eat For Dinner",
        whatHappened: "\"I'm fine with anything.\" \"Okay, Chinese?\" \"No, not Chinese.\" \"Burgers?\" \"No, had heavy lunch.\" 45 minutes of browsing menus later...",
        aftermath: "Ended up ordering the exact same thing we always order, eating in bed, and bursting out laughing at our indecisiveness.",
        verdict: "I would still starve for 2 hours just to eat what you like.",
      },
      {
        id: "fight-2",
        topic: "\"Just 5 More Minutes of CS:GO / Gaming\"",
        whatHappened: "Vaibhav caught in an intense overtime round, promising 'last round' three rounds ago while Theia gave the ultimate side-eye.",
        aftermath: "He closed the laptop, apologized sheepishly, and spent the rest of the evening giving full uninterrupted cuddles and attention.",
        verdict: "Winning a clutch in game < Making her smile.",
      },
      {
        id: "fight-3",
        topic: "Google Maps Navigations",
        whatHappened: "\"Turn left! No, the OTHER left!\" Going past the U-turn because we were talking too excitedly about something random.",
        aftermath: "Turned a 15-minute drive into a scenic 45-minute city tour with songs on full volume and wind in our faces.",
        verdict: "I never mind taking the long way home when it means 30 more minutes with you.",
      },
      {
        id: "fight-4",
        topic: "Who Loves Who More?",
        whatHappened: "An endless back-and-forth of 'I love you more' / 'No, scientifically impossible, I love you more.'",
        aftermath: "Agreed to declare it a tie, but deep down I know I'm the lucky one who got you.",
        verdict: "A disagreement I'm happy to lose every single day.",
      },
    ],
    reasonsToChooseYou: [
      "Because your angry pout is secretly the most adorable thing on earth.",
      "Because you never let an argument go to sleep without checking if we're okay.",
      "Because saying sorry to you feels like coming home.",
      "Because even when I'm annoying, you still hold my hand.",
    ],
  },

  // ==========================================
  // 8. OUR HAPPY MOMENTS
  // ==========================================
  happyMoments: {
    title: "If happiness had photographs, these would be my favourites.",
    subtitle: "The unscripted magic that turns ordinary weekdays into poetry.",
    moments: [
      {
        id: "hm-1",
        title: "Random Midnight Calls",
        description: "Whispering through the dark when the whole world is asleep, sharing silly thoughts, sleepy giggles, and drifting off to the sound of each other breathing.",
        badge: "Late Nights",
      },
      {
        id: "hm-2",
        title: "The Uncontrollable Laugh Attacks",
        description: "Those moments when one of us says something totally absurd and we both start laughing so hard our stomachs hurt and no sound even comes out.",
        badge: "Pure Joy",
      },
      {
        id: "hm-3",
        title: "Food Comas & Shared Desserts",
        description: "Stealing the last fry, arguing over who gets the chocolate piece with more frosting, and claiming we're 'too full' right before ordering ice cream.",
        badge: "Comfort",
      },
      {
        id: "hm-4",
        title: "Surprise Hugs From Behind",
        description: "Wrapping my arms around you when you least expect it and feeling your whole body relax into mine.",
        badge: "Safe Place",
      },
    ],
  },

  // ==========================================
  // 9. OUR TRAVEL DIARY & POSTCARDS
  // ==========================================
  travelDiary: {
    title: "Everywhere feels like somewhere special when I'm with you.",
    subtitle: "Postcards from the trails, valleys, and streets we've wandered together.",
    destinations: [
      {
        id: "dest-1",
        placeName: "Mountain Valley Overlook",
        stateOrCountry: "Uttarakhand / Hill Trails",
        date: "September Getaway",
        image: "/memories/travel-mountain-valley.jpg",
        whatWeDid: "Stood against the railing overlooking the vast winding mountain roads, breathing in the fresh cedar breeze.",
        favouriteMemory: "The way the golden afternoon sun hit your hair while you looked out into the misty horizon.",
        personalNote: "I used to look at scenic wallpapers; now I just look at you standing against the hills.",
        stampText: "AIR MAIL — HILLS 2023",
      },
      {
        id: "dest-2",
        placeName: "Emerald Moss & Water Caves",
        stateOrCountry: "Dehradun / Robber's Cave Trails",
        date: "Summer Trail Walk",
        image: "/memories/travel-green-caves.jpg",
        whatWeDid: "Hiked through moss-covered cavernous limestone trails, ducked beneath natural stone tunnels, and stepped through mountain streams.",
        favouriteMemory: "Warning each other at the 'Mind Your Head' sign and taking candid photos under the natural rock canopy.",
        personalNote: "No hike feels long when every step is taken beside you.",
        stampText: "SPECIAL DELIVERY — FOREST",
      },
      {
        id: "dest-3",
        placeName: "Historic Heritage Archway",
        stateOrCountry: "Delhi Heritage Forts",
        date: "Autumn Walk",
        image: "/memories/travel-heritage-arch.jpg",
        whatWeDid: "Walked along historic stonework archways and intricately carved windows, discovering quiet corners away from the city buzz.",
        favouriteMemory: "You turning around in that blue block-print kurti with the calmest, most graceful smile.",
        personalNote: "Stone might stand for centuries, but what we have is eternal.",
        stampText: "ROYAL POST — HERITAGE",
      },
    ] as TravelDestination[],
  },

  // ==========================================
  // 10. HER DREAMS & FUTURE BUCKET LIST
  // ==========================================
  dreams: {
    title: "Your dreams matter to me, because your happiness matters to me.",
    subtitle: "I believe in your talent, your ambition, and your brilliant mind more than words can express.",
    aspirations: [
      {
        id: "asp-1",
        title: "Soaring In Your Career",
        description: "Watching you conquer new challenges, graduate with flying colors, lead projects, and earn every bit of recognition you deserve.",
        icon: "Briefcase",
      },
      {
        id: "asp-2",
        title: "Creating A Life Of Independence & Grace",
        description: "Building a space of your own, filled with plants, warm lighting, cozy corners, and your favourite books.",
        icon: "Sparkles",
      },
      {
        id: "asp-3",
        title: "Mastering New Skills",
        description: "Exploring new creative pursuits, languages, cooking delicacies, and expanding that sharp, beautiful intellect.",
        icon: "BookOpen",
      },
      {
        id: "asp-4",
        title: "Inner Peace & Abundant Joy",
        description: "Days where you wake up without stress, surrounded by people who cherish you, feeling deeply fulfilled in your heart.",
        icon: "Heart",
      },
    ],
    bucketList: [
      { id: "bl-1", text: "Watch Northern Lights dancing under the Arctic sky in Norway", category: "travel", completed: false },
      { id: "bl-2", text: "Walk through pink cherry blossom tunnels in Kyoto, Japan", category: "travel", completed: false },
      { id: "bl-3", text: "Spend a week in a cozy glass-roof cottage in the Swiss Alps", category: "travel", completed: false },
      { id: "bl-4", text: "Go on a midnight seaside drive with the windows down and music up", category: "experience", completed: true, notes: "One of our best drives!" },
      { id: "bl-5", text: "Bake a multi-layer cake from scratch together (even if it turns out messy)", category: "together", completed: false },
      { id: "bl-6", text: "Adopt a furry golden retriever puppy and give it a silly name", category: "personal", completed: false },
      { id: "bl-7", text: "Build our dream home with a sunny reading nook and balcony garden", category: "together", completed: false },
      { id: "bl-8", text: "Celebrate your 50th birthday together, still laughing just as hard", category: "together", completed: false },
    ] as BucketListItem[],
    dreamDestinations: [
      { name: "Santorini, Greece", country: "White terraces & blue sunsets over the Aegean" },
      { name: "Switzerland", country: "Snow-covered peaks, alpine trains, and fondue" },
      { name: "Kyoto & Tokyo, Japan", country: "Lantern-lit streets, cherry blossoms & ramen" },
      { name: "Amalfi Coast, Italy", country: "Pastel cliffside villas overlooking turquoise waters" },
    ],
  },

  // ==========================================
  // 11. LETTERS & PERSONAL MESSAGES
  // ==========================================
  letters: {
    birthdayLetter: {
      title: "My Dearest Theia,",
      subtitle: "A Letter For Your Birthday",
      date: "July 31st",
      content: `If I had to summarize everything you are to me in a single sentence, it would be this: You made my life feel like poetry.

Before you, the days followed an ordinary rhythm. But from the moment you walked into my world, you brought color into spaces I didn't even realize were monochrome. Your laughter became the soundtrack I listen for in crowded rooms. Your kindness became the standard by which I view goodness in this world.

I look at you and I don't just see the person I love — I see my best friend, my confidante, my favourite adventure partner, and the gentlest safe haven my heart has ever known. You have this quiet, effortless grace that makes everyone around you feel valued, yet you remain so humble, so pure, and so genuinely true to who you are.

On your birthday today, my only prayer is that life gives back to you every single ounce of warmth, love, and sunshine you pour so freely into the world. May your year be filled with dream projects that succeed, spontaneous road trips, sweet treats, good health, and peace in your soul.

No matter where life leads us, one truth will never change: I will always be in your corner, cheering the loudest for you, holding your hand through the storms, and loving you more with each passing breath.

Happy Birthday, my beautiful Theia. Thank you for existing.`,
      signature: "Forever yours, Vaibhav",
    },
    openWhen: [
      {
        id: "ow-1",
        trigger: "Open When You Miss Me",
        tagline: "When distance feels too loud",
        title: "I Am Never Far From You",
        letter: "Whenever you feel far away from me, look at your phone, look at these photos, or close your eyes for ten seconds. Every single memory we built is alive in my chest right now. I am carrying you with me wherever I walk today. Call me or text me, and no matter what I'm doing, you come first.",
        signature: "Always a heartbeat away, Vaibhav",
        photo: "/memories/couple-kiss-bows.jpg",
        songRecommendation: "Coldplay — Yellow",
      },
      {
        id: "ow-2",
        trigger: "Open When You're Sad",
        tagline: "When the clouds roll in",
        title: "You Don't Have To Be Strong Today",
        letter: "It's okay to feel overwhelmed. It's okay to have days where you just want to curl up and do nothing. You don't have to carry the weight of everything on your shoulders. Take a deep breath, drink some water, wrap yourself in your favourite blanket, and remember that bad days pass, but my love for you is immovable.",
        signature: "Your biggest fan, Vaibhav",
        photo: "/memories/portrait-hearts.jpg",
      },
      {
        id: "ow-3",
        trigger: "Open When You Need Motivation",
        tagline: "Before a big exam or interview",
        title: "You Are Capable Of Anything",
        letter: "Remember how hard you've worked to get here. Remember every single challenge you thought you couldn't overcome, and yet you conquered it. You have an extraordinary brain, a resilient spirit, and a heart made of gold. Walk into that room with your head high — the world is about to see what I've known all along.",
        signature: "Cheering for you always, Vaibhav",
      },
      {
        id: "ow-4",
        trigger: "Open When You Want To Smile",
        tagline: "A quick dose of instant happiness",
        title: "Remember That Time...",
        letter: "Remember when we argued over what to eat, looked at 40 different restaurants, got overwhelmed, and ended up eating our usual food while laughing at how ridiculous we are? Or the time we got lost because we were singing too loud to notice the turn? Life with you is a comedy movie I'd watch a million times.",
        signature: "Your goofy partner, Vaibhav",
        photo: "/memories/funny-cafe-smile.jpg",
      },
      {
        id: "ow-5",
        trigger: "Open When You Need A Reminder",
        tagline: "How truly special you are",
        title: "Just In Case You Forgot",
        letter: "You are breathtakingly beautiful — not just in the photos where the light hits you right, but in the morning with messy hair, in oversized hoodies, and when you're laughing so hard your nose scrunches up. You are brilliant, worthy of every good thing, and loved beyond measure.",
        signature: "Yours completely, Vaibhav",
        photo: "/memories/portrait-golden-hour.jpg",
      },
    ] as OpenWhenLetter[],
  },

  // ==========================================
  // 12. SPECIAL INTERACTIVE EXPERIENCES
  // ==========================================
  interactive: {
    reasonsILoveYou: [
      { id: 1, reason: "The way your eyes crinkle at the corners when something genuinely amuses you.", category: "smile" },
      { id: 2, reason: "How you make anywhere we go feel safe, comfortable, and warm.", category: "heart" },
      { id: 3, reason: "The way you hold my arm tightly when we're walking through crowded streets.", category: "together" },
      { id: 4, reason: "Your silly little dances when good food arrives at the table.", category: "quirk" },
      { id: 5, reason: "How you genuinely care about people and animals around you.", category: "heart" },
      { id: 6, reason: "The sound of your voice first thing in the morning and right before sleep.", category: "smile" },
      { id: 7, reason: "How you can calm my stormy mind with just a single touch of your hand.", category: "heart" },
      { id: 8, reason: "Because you make me want to be the best version of myself every single day.", category: "together" },
      { id: 9, reason: "Your stubborn determination when you set your mind to achieving a goal.", category: "quirk" },
      { id: 10, reason: "The way you look in cozy oversized sweatshirts with hot chocolate.", category: "quirk" },
      { id: 11, reason: "How you remember the smallest details I mentioned weeks ago in passing.", category: "heart" },
      { id: 12, reason: "Because out of eight billion people on this planet, my soul chose you.", category: "together" },
    ] as LoveReason[],

    jarOfMemories: [
      "That cold winter evening wrapped in blankets with fairy lights glowing.",
      "The scooter ride where we took the long way just to keep talking.",
      "Eating pizza in silence because it was so delicious we forgot to speak.",
      "Watching you make a birthday wish with your eyes tightly closed.",
      "Standing high in the mountains feeling like the clouds belonged to us.",
      "That silly photo with the pink bows filter that still makes me smile.",
      "Singing along terribly to our favourite songs with the windows rolled down.",
      "The quiet moment when you fell asleep leaning on my shoulder during the drive.",
      "Laughing at the cat gaming meme and saying 'that is literally Vaibhav'.",
      "Walking hand-in-hand through historic stone arches pretending we were in a movie.",
    ],

    secretSurprise: {
      buttonPrompt: "There's one more secret waiting for you...",
      revealTitle: "My Final Promise To You",
      revealMessage: "Through every season of this life — through busy Mondays, lazy Sundays, wild adventures, quiet evenings, and every birthday yet to come — my heart has found its home in you. I will cherish you, protect your dreams, celebrate your victories, and love you more tomorrow than I do today. Happy Birthday, my whole universe.",
      confettiCount: 250,
    },
  },
};

