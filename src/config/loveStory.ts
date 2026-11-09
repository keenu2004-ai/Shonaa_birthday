/**
 * =========================================================================
 * OUR LITTLE UNIVERSE ❤️ — CENTRAL CONFIGURATION (src/config/loveStory.ts)
 * =========================================================================
 * 
 * Edit this single file to personalize the entire website!
 * You can change names, dates, photos, videos, love reasons, bucket lists,
 * letters, and background music without modifying any component code.
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

export interface PhotoMemory {
  id: string;
  title: string;
  category: 
    | 'favourite' 
    | 'happy-moments' 
    | 'adventures' 
    | 'vacations' 
    | 'special-days' 
    | 'random' 
    | 'her-photos' 
    | 'our-photos';
  src: string;
  caption: string;
  date?: string;
  location?: string;
  rotation?: number; // Visual tilt in degrees (-3 to 3) for scrapbook effect
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
  // 1. NAMES & TITLES
  // =========================================================================
  names: {
    herName: "My Love", // e.g. "Theia"
    herNickname: "Shona",
    myName: "Vaibhav",
    websiteTitle: "Our Little Universe",
    heroOpeningTagline: "For the girl who made my world beautiful.",
    openingButtonText: "Open Your Little Universe ❤️",
    birthdayCelebrationTitle: "Happy Birthday, Beautiful!",
    birthdayAge: 24, // Optional milestone age
  },

  // =========================================================================
  // 2. DATES & COUNTDOWNS
  // =========================================================================
  dates: {
    // Relationship start date: format "YYYY-MM-DDTHH:mm:ss+05:30"
    // Used for the live Years | Months | Days | Hours | Minutes | Seconds counter
    relationshipStart: "2023-08-15T00:00:00+05:30",
    relationshipStartDisplay: "August 15, 2023",

    // Her Birthday date & time in Asia/Kolkata timezone
    // Format: "YYYY-MM-DDTHH:mm:ss+05:30"
    birthdayDate: "2027-07-31T00:00:00+05:30",
    birthdayDisplay: "July 31",
    timezone: "Asia/Kolkata",

    // Set to true to preview the Grand Birthday Fireworks Celebration immediately!
    forceTestCelebration: false,

    // Relationship milestones for the counter header
    counterCaption: "Every second with you is my favourite second.",
  },

  // =========================================================================
  // 3. BACKGROUND MUSIC PLAYLIST
  // =========================================================================
  music: {
    enabled: true,
    defaultVolume: 0.5,
    // Add your mp3 audio files to public/audio/
    tracks: [
      {
        id: "opening-melody",
        title: "Golden Hour Piano",
        artist: "Our Soundtrack",
        src: "/audio/opening.mp3",
        type: "opening",
      },
      {
        id: "background-melody",
        title: "Acoustic Love Melody",
        artist: "Quiet Moments",
        src: "/audio/background.mp3",
        type: "background",
      },
      {
        id: "birthday-fanfare",
        title: "Birthday Wonder & Joy",
        artist: "Celebration Special",
        src: "/audio/birthday.mp3",
        type: "birthday",
      },
    ] as MusicTrack[],
  },

  // =========================================================================
  // 4. OUR MEMORIES — PHOTO GALLERY
  // =========================================================================
  // Place your photos in public/memories/<category>/ and update paths below!
  photos: [
    {
      id: "photo-1",
      title: "Our Warmest Holiday",
      category: "favourite",
      src: "/memories/favourite/favourite-1.svg",
      caption: "Wrapped in fairy lights and your warmth — my favourite holiday memory.",
      date: "Cozy Holiday Evening",
      location: "Our Warm Corner",
      rotation: -2,
    },
    {
      id: "photo-2",
      title: "The Sweetest Cheek Kiss",
      category: "our-photos",
      src: "/memories/our-photos/our-photo-1.svg",
      caption: "Every kiss feels like the first one. Never stop making me smile like this.",
      date: "Sunny Afternoon",
      location: "Everyday Magic",
      rotation: 2.5,
    },
    {
      id: "photo-3",
      title: "Mountain Heights & Valley Views",
      category: "vacations",
      src: "/memories/vacations/vacation-1.svg",
      caption: "High above the clouds, but nothing in this world is higher than how you make me feel.",
      date: "Mountain Getaway",
      location: "Scenic Mountain Overlook",
      rotation: -1.5,
    },
    {
      id: "photo-4",
      title: "Golden Hour Perfection",
      category: "her-photos",
      src: "/memories/her-photos/her-portrait-1.svg",
      caption: "The world stops for a second whenever you look into the camera and smile.",
      date: "Golden Hour",
      location: "Under The Sun",
      rotation: 2,
    },
    {
      id: "photo-5",
      title: "The Goofy Cafe Face",
      category: "happy-moments",
      src: "/memories/happy-moments/happy-2.svg",
      caption: "The goofy smile across the table that instantly ends any argument we could ever have.",
      date: "Cafe Date",
      location: "Food & Laughter",
      rotation: -3,
    },
    {
      id: "photo-6",
      title: "Lush Green Forest Cave Trail",
      category: "adventures",
      src: "/memories/travel/travel-1.svg",
      caption: "Lost in the wild greens, finding my favourite view in you.",
      date: "Trail Walk",
      location: "Emerald Forest Caves",
      rotation: 1.5,
    },
    {
      id: "photo-7",
      title: "Two Helmets, One Road",
      category: "our-photos",
      src: "/memories/our-photos/our-photo-2.svg",
      caption: "Wherever the road takes us, as long as you're riding with me.",
      date: "Evening Ride",
      location: "Open Roads",
      rotation: -2,
    },
    {
      id: "photo-8",
      title: "Radiant Smile & Heart Doodles",
      category: "her-photos",
      src: "/memories/her-photos/her-portrait-2.svg",
      caption: "A face that deserves all the love, happiness, and peace in the universe.",
      date: "Special Dinner",
      location: "City Lights",
      rotation: 1.8,
    },
    {
      id: "photo-9",
      title: "Historic Archway Elegance",
      category: "adventures",
      src: "/memories/travel/travel-2.svg",
      caption: "Standing against timeless stone, but you are the only timeless thing here.",
      date: "Heritage Tour",
      location: "Historic Gateway",
      rotation: -1,
    },
    {
      id: "photo-10",
      title: "Making A Birthday Wish",
      category: "special-days",
      src: "/memories/birthday/birthday-cake.svg",
      caption: "Watching you close your eyes and make a silent wish. May every wish come true.",
      date: "Birthday Midnight",
      location: "Birthday Glow",
      rotation: 2.2,
    },
    {
      id: "photo-11",
      title: "Celebration Glow",
      category: "favourite",
      src: "/memories/favourite/favourite-2.svg",
      caption: "My best present in every season of life.",
      date: "Holiday Night",
      location: "Home",
      rotation: -2.5,
    },
    {
      id: "photo-12",
      title: "Unfiltered Pure Joy",
      category: "happy-moments",
      src: "/memories/happy-moments/happy-1.svg",
      caption: "The spontaneous, unplanned moments that turned into our best memories.",
      date: "Random Tuesday",
      location: "Everywhere With You",
      rotation: 1.5,
    },
  ] as PhotoMemory[],

  // =========================================================================
  // 5. OUR VIDEOS
  // =========================================================================
  // Place video files in public/videos/memories/ and update paths below!
  videos: [
    {
      id: "video-1",
      title: "Our Unfiltered Laughter",
      src: "/videos/memories/our-laughter.mp4",
      thumbnail: "/memories/favourite/favourite-1.svg",
      caption: "The moments between the poses, the sound of your laugh, and how everything felt so effortless.",
      date: "Summer Memories",
      duration: "0:30",
    },
    {
      id: "video-2",
      title: "Roads, Wind & Us",
      src: "/videos/vacations/mountain-ride.mp4",
      thumbnail: "/memories/vacations/vacation-1.svg",
      caption: "Zipping through the cool mountain breeze with you holding on tight.",
      date: "Mountain Trip",
      duration: "0:45",
    },
  ] as VideoMemory[],

  // =========================================================================
  // 6. OUR COMPLETE STORY — CHRONOLOGICAL TIMELINE
  // =========================================================================
  timeline: [
    {
      id: "tl-1",
      title: "When Our Paths First Crossed",
      date: "Autumn 2022",
      tag: "The First Meeting",
      description: "A random day that turned out to be the most important turning point of my life. I remember your gentle smile and how the entire world suddenly felt brighter.",
      image: "/memories/her-photos/her-portrait-1.svg",
      note: "Some people walk into your life quietly, but their echo stays forever.",
    },
    {
      id: "tl-2",
      title: "Our Very First Conversation",
      date: "Late 2022",
      tag: "First Words",
      description: "It started with a simple exchange and ended up lasting for hours. Discovering your mind, your humor, your perspectives, and realizing I never wanted the call to end.",
      note: "That was the moment I realized you were someone genuinely rare.",
    },
    {
      id: "tl-3",
      title: "Our First Official Date",
      date: "Early 2023",
      tag: "First Date",
      description: "Sitting across from you with nervous smiles, lingering eye contact, and realizing that dinner was just an excuse to stay in each other's presence longer.",
      image: "/memories/our-photos/our-photo-1.svg",
      note: "I walked away with butterflies that haven't stopped flying since.",
    },
    {
      id: "tl-4",
      title: "Our First Photograph Together",
      date: "Mid 2023",
      tag: "First Photo",
      description: "The very first picture we snapped together. Shy poses, genuine smiles, and the beginning of a thousand photos we would capture and treasure.",
      image: "/memories/our-photos/our-photo-2.svg",
      note: "The start of our personal gallery.",
    },
    {
      id: "tl-5",
      title: "Climbing Mountains & Valley Views",
      date: "Autumn 2023",
      tag: "First Getaway",
      description: "Standing on the edge of mountain hills, looking out at miles of green valleys, breathing crisp mountain air, and holding hands above the clouds.",
      image: "/memories/vacations/vacation-1.svg",
      note: "No altitude can match the high of loving you.",
    },
    {
      id: "tl-6",
      title: "Holidays, Warm Lights & Cozy Nights",
      date: "Winter 2023",
      tag: "Celebration",
      description: "Celebrating surrounded by glowing fairy lights, hot beverages, exchanged gifts, and the peaceful contentment of knowing we are each other's safe home.",
      image: "/memories/favourite/favourite-1.svg",
      note: "Home isn't a building; it's you.",
    },
    {
      id: "tl-7",
      title: "Exploring Nature Trails & Secret Caves",
      date: "Summer 2024",
      tag: "Adventures",
      description: "Exploring secret water caves and moss-covered pathways. Ducking under rocks, laughing at low ceilings, and falling in love with your adventurous spirit.",
      image: "/memories/travel/travel-1.svg",
      note: "You turn every little hike into a story worth telling.",
    },
    {
      id: "tl-8",
      title: "Today — And Every Tomorrow",
      date: "Present & Future",
      tag: "Forever",
      description: "Every second we've shared has built this little universe of ours. And today, I celebrate the most incredible person in it: You.",
      image: "/memories/birthday/birthday-celebration.svg",
      note: "Happy Birthday, my love. The best chapters are yet to be written.",
    },
  ] as MilestoneItem[],

  // =========================================================================
  // 7. OUR FIGHTS & RECONCILIATIONS
  // =========================================================================
  imperfectChapters: {
    title: "Not Every Chapter Was Perfect, But Every Chapter Was Ours.",
    subtitle: "Because real love isn't a fairy tale with no bumps — it's laughing five minutes after arguing over something ridiculous.",
    fights: [
      {
        id: "fight-1",
        topic: "The Endless \"What Should We Eat?\" Debate",
        whatHappened: "\"I'm fine with anything!\" \"Okay, Chinese?\" \"No, not Chinese.\" \"Burgers?\" \"No, had heavy lunch.\" 45 minutes of browsing menus later...",
        aftermath: "Ended up ordering our exact comfort order, eating together, and laughing at how silly we are every single time.",
        verdict: "I would still wait 2 hours just to eat whatever you're craving.",
      },
      {
        id: "fight-2",
        topic: "\"Just 5 More Minutes Of Gaming\"",
        whatHappened: "Caught in an intense overtime round, promising 'last round' three rounds ago while getting the legendary loving side-eye.",
        aftermath: "Closed the game, apologized sheepishly, and spent the rest of the evening giving you 100% undivided cuddles and attention.",
        verdict: "Winning a game < Making you smile.",
      },
      {
        id: "fight-3",
        topic: "Google Maps Navigations & Missing The U-Turn",
        whatHappened: "\"Turn left! No, the OTHER left!\" Driving past the turn because we were singing too loud to notice the map.",
        aftermath: "Turned a 15-minute drive into a scenic 45-minute city tour with songs on full volume and wind in our hair.",
        verdict: "I never mind taking the long way home when it means 30 more minutes with you.",
      },
      {
        id: "fight-4",
        topic: "The \"Who Loves Who More?\" Argument",
        whatHappened: "An endless back-and-forth of 'I love you more' / 'No, scientifically impossible, I love you more.'",
        aftermath: "Agreed to declare it a tie, but deep down I know I'm the lucky one who got you.",
        verdict: "A disagreement I'm happy to lose every single day.",
      },
    ],
    reasonsToChooseYou: [
      "Because your angry pout is secretly the most adorable thing on earth.",
      "Because you never let an argument go to sleep without checking if we're okay.",
      "Because saying sorry to you feels like coming home.",
      "Because even when I'm annoying, you still hold my hand tight.",
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
        description: "Stealing the last fry, arguing over who gets the chocolate piece with more frosting, and claiming we're 'too full' right before ordering dessert.",
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

  // =========================================================================
  // 9. OUR TRAVEL DIARY & POSTCARDS
  // =========================================================================
  travelDiary: {
    title: "Everywhere feels like somewhere special when I'm with you.",
    subtitle: "Postcards from the trails, valleys, and streets we've wandered together.",
    destinations: [
      {
        id: "dest-1",
        placeName: "Mountain Valley Overlook",
        stateOrCountry: "Scenic Hill Country",
        date: "September Getaway",
        image: "/memories/vacations/vacation-1.svg",
        whatWeDid: "Stood against the railing overlooking the vast winding mountain roads, breathing in the fresh mountain air.",
        favouriteMemory: "The way the golden afternoon sun hit your hair while you looked out into the misty horizon.",
        personalNote: "I used to look at scenic wallpapers; now I just look at you standing against the hills.",
        stampText: "AIR MAIL — HILLS",
      },
      {
        id: "dest-2",
        placeName: "Emerald Moss & Water Caves",
        stateOrCountry: "Forest Nature Trails",
        date: "Summer Trail Walk",
        image: "/memories/travel/travel-1.svg",
        whatWeDid: "Hiked through moss-covered cavernous limestone trails, ducked beneath natural stone tunnels, and stepped through fresh streams.",
        favouriteMemory: "Warning each other at the low rock ceilings and taking candid photos under the natural stone canopy.",
        personalNote: "No hike feels long when every step is taken beside you.",
        stampText: "SPECIAL DELIVERY — FOREST",
      },
      {
        id: "dest-3",
        placeName: "Historic Heritage Archway",
        stateOrCountry: "Historic Monument Walk",
        date: "Autumn Walk",
        image: "/memories/travel/travel-2.svg",
        whatWeDid: "Walked along historic stonework archways and carved windows, discovering quiet corners away from the city buzz.",
        favouriteMemory: "You turning around with the calmest, most graceful smile.",
        personalNote: "Stone might stand for centuries, but what we have is eternal.",
        stampText: "ROYAL POST — HERITAGE",
      },
    ] as TravelDestination[],
  },

  // =========================================================================
  // 10. HER DREAMS AND ASPIRATIONS
  // =========================================================================
  dreams: {
    title: "Your Dreams Matter to Me.",
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
        title: "Creating A Life Of Independence & Grace",
        description: "Building a space of your own, filled with warm lighting, cozy corners, flourishing plants, and your favourite books.",
        icon: "Sparkles",
      },
      {
        id: "asp-3",
        title: "Mastering New Passions",
        description: "Exploring new creative pursuits, languages, culinary arts, and expanding that sharp, beautiful intellect.",
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
      { id: "bl-5", text: "Bake a multi-layer birthday cake from scratch together", category: "together", completed: false },
      { id: "bl-6", text: "Adopt a furry golden retriever puppy and give it a silly name", category: "goals", completed: false },
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

Every single memory we built is alive in my chest right now. I am carrying you with me wherever I walk today. Call me or text me, and no matter what I'm doing, you come first.`,
      signature: "Always a heartbeat away, Vaibhav",
      photo: "/memories/our-photos/our-photo-1.svg",
    },
    {
      id: "ow-2",
      trigger: "Open When You're Sad",
      tagline: "When the clouds roll in",
      title: "You Don't Have To Be Strong Today",
      letter: `It's okay to feel overwhelmed. It's okay to have days where you just want to curl up and do nothing. You don't have to carry the weight of the entire world on your shoulders.

Take a deep breath, drink some water, wrap yourself in your favourite blanket, and remember that bad days pass, but my love for you is immovable.`,
      signature: "Your safe haven, Vaibhav",
      photo: "/memories/her-photos/her-portrait-2.svg",
    },
    {
      id: "ow-3",
      trigger: "Open When You Need Motivation",
      tagline: "Before a big exam or interview",
      title: "You Are Capable Of Anything",
      letter: `Remember how hard you've worked to get here. Remember every single challenge you thought was impossible, and yet you conquered it.

You have an extraordinary mind, a resilient spirit, and a heart made of gold. Walk in with your head high — the world is about to see what I've known all along.`,
      signature: "Cheering for you always, Vaibhav",
    },
    {
      id: "ow-4",
      trigger: "Open When You Want To Smile",
      tagline: "A quick dose of instant happiness",
      title: "Remember That Time...",
      letter: `Remember when we argued over what to eat, looked at 40 different restaurants, got overwhelmed, and ended up eating our usual order while laughing at how ridiculous we are?

Or the time we got lost because we were singing too loud to notice the turn? Life with you is my favourite comedy movie.`,
      signature: "Your goofy partner, Vaibhav",
      photo: "/memories/happy-moments/happy-2.svg",
    },
    {
      id: "ow-5",
      trigger: "Open When You Need A Reminder",
      tagline: "How truly special you are",
      title: "Just In Case You Forgot",
      letter: `You are breathtakingly beautiful — not just in the photos where the light hits you right, but in the morning with messy hair, in oversized hoodies, and when you're laughing so hard your nose scrunches up.

You are brilliant, worthy of every good thing, and loved beyond measure.`,
      signature: "Yours completely, Vaibhav",
      photo: "/memories/her-photos/her-portrait-1.svg",
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
    envelopePrompt: "Click to open your special birthday letter",
    title: "My Dearest,",
    subtitle: "A Letter From My Heart To Yours",
    date: "July 31st",
    content: `If I had to summarize everything you are to me in a single sentence, it would be this: You made my life feel like poetry.

Before you, days followed an ordinary rhythm. But from the moment you walked into my world, you brought warmth, laughter, and light into spaces I didn't even realize were quiet. Your laughter became the soundtrack I listen for in crowded rooms. Your kindness became the standard by which I view goodness.

I look at you and I don't just see the person I love — I see my best friend, my confidante, my favourite adventure partner, and the gentlest safe haven my heart has ever known.

On your birthday today, my only prayer is that life gives back to you every single ounce of warmth, love, and sunshine you pour so freely into the world. May your year be filled with dream projects that succeed, spontaneous road trips, sweet treats, good health, and peace in your soul.

No matter where life leads us, one truth will never change: I will always be in your corner, cheering the loudest for you, holding your hand through the storms, and loving you more with each passing breath.`,
    closingQuote: "Here's to you, to us, and to all the beautiful memories still waiting to happen.",
    signature: "Forever yours, Vaibhav",
  },
};
