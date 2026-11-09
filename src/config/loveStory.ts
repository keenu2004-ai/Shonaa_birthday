/**
 * =========================================================================
 * OUR LITTLE UNIVERSE ❤️ — CENTRAL CONFIGURATION (src/config/loveStory.ts)
 * =========================================================================
 * 
 * Edit this single file to personalize the entire website!
 * Replace the bracketed placeholders [LIKE THIS] with your real information.
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
    herName: "[Her Name]",              // [EDITABLE: e.g. "Theia"]
    herNickname: "[Her Nickname]",      // [EDITABLE: e.g. "Shona"]
    myName: "[My Name]",                // [EDITABLE: e.g. "Vaibhav"]
    websiteTitle: "Our Little Universe",// Title shown in navbar & header
    heroOpeningTagline: "For the girl who made my world beautiful.",
    openingButtonText: "Open Your Little Universe ❤️",
    birthdayCelebrationTitle: "Happy Birthday, Beautiful!",
    birthdayAge: 24,                    // [EDITABLE: Her milestone age, optional]
    heroCoverPhoto: "/memories/opening/hero-cover.svg", // [EDITABLE: Set to "/memories/opening/hero-cover.jpg" once you add your photo]
  },

  // =========================================================================
  // 2. DATES & COUNTDOWNS
  // =========================================================================
  dates: {
    // Relationship start date: format "YYYY-MM-DDTHH:mm:ss+05:30"
    // Used for the live Years | Months | Days | Hours | Minutes | Seconds counter
    relationshipStart: "2023-01-01T00:00:00+05:30", // [EDITABLE: Replace with your actual anniversary date]
    relationshipStartDisplay: "[Month Day, Year]",    // [EDITABLE: e.g. "August 15, 2023"]

    // Her Birthday date & midnight time in Asia/Kolkata timezone
    // Format: "YYYY-MM-DDTHH:mm:ss+05:30"
    birthdayDate: "2027-07-31T00:00:00+05:30",        // [EDITABLE: Replace with her upcoming birthday date]
    birthdayDisplay: "[Her Birthday: e.g. July 31]",  // [EDITABLE: e.g. "July 31"]
    timezone: "Asia/Kolkata",

    // Preview Flag: Set to true anytime to immediately test the Grand Birthday Fireworks Celebration!
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
    // Add your mp3 audio files to public/audio/ (fallback synthesizer plays automatically if not present)
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
  // Drop your photos into public/memories/<category>/ and update filenames below!
  photos: [
    {
      id: "photo-1",
      title: "[Memory Title: e.g. Our Warmest Holiday]",
      category: "favourite",
      src: "/memories/favourite/favourite-1.svg",
      caption: "[Caption: Add a personal caption for your favourite memory here]",
      date: "[Date: e.g. Cozy Holiday Evening]",
      location: "[Location: e.g. Our Warm Corner]",
      rotation: -2,
    },
    {
      id: "photo-2",
      title: "[Memory Title: e.g. The Sweetest Cheek Kiss]",
      category: "our-photos",
      src: "/memories/our-photos/our-photo-1.svg",
      caption: "[Caption: A sweet memory of laughing and smiling together]",
      date: "[Date: e.g. Sunny Afternoon]",
      location: "[Location: e.g. Everyday Magic]",
      rotation: 2.5,
    },
    {
      id: "photo-3",
      title: "[Memory Title: e.g. Mountain Heights & Valley Views]",
      category: "vacations",
      src: "/memories/vacations/vacation-1.svg",
      caption: "[Caption: A breathtaking view from our travels together]",
      date: "[Date: e.g. Mountain Getaway]",
      location: "[Location: e.g. Scenic Mountain Overlook]",
      rotation: -1.5,
    },
    {
      id: "photo-4",
      title: "[Memory Title: e.g. Golden Hour Radiance]",
      category: "her-photos",
      src: "/memories/her-photos/her-portrait-1.svg",
      caption: "[Caption: My favourite solo photograph of you smiling]",
      date: "[Date: e.g. Golden Hour]",
      location: "[Location: e.g. Under The Sun]",
      rotation: 2,
    },
    {
      id: "photo-5",
      title: "[Memory Title: e.g. Silly Face Across The Table]",
      category: "happy-moments",
      src: "/memories/happy-moments/happy-2.svg",
      caption: "[Caption: The playful candid smile that always makes me laugh]",
      date: "[Date: e.g. Cafe Date]",
      location: "[Location: e.g. Food & Laughter]",
      rotation: -3,
    },
    {
      id: "photo-6",
      title: "[Memory Title: e.g. Nature Trail Walk]",
      category: "adventures",
      src: "/memories/travel/travel-1.svg",
      caption: "[Caption: Exploring new pathways and trails hand in hand]",
      date: "[Date: e.g. Weekend Trail]",
      location: "[Location: e.g. Forest Caves]",
      rotation: 1.5,
    },
    {
      id: "photo-7",
      title: "[Memory Title: e.g. Helmets & Open Roads]",
      category: "our-photos",
      src: "/memories/our-photos/our-photo-2.svg",
      caption: "[Caption: Wherever the road takes us, as long as you're with me]",
      date: "[Date: e.g. Evening Ride]",
      location: "[Location: e.g. Open Roads]",
      rotation: -2,
    },
    {
      id: "photo-8",
      title: "[Memory Title: e.g. Radiant Smile]",
      category: "her-photos",
      src: "/memories/her-photos/her-portrait-2.svg",
      caption: "[Caption: A face that deserves all the love and happiness in the universe]",
      date: "[Date: e.g. Special Evening]",
      location: "[Location: e.g. City Lights]",
      rotation: 1.8,
    },
    {
      id: "photo-9",
      title: "[Memory Title: e.g. Historic Archways]",
      category: "adventures",
      src: "/memories/travel/travel-2.svg",
      caption: "[Caption: Exploring historic architecture and quiet corners]",
      date: "[Date: e.g. Day Trip]",
      location: "[Location: e.g. Heritage Walk]",
      rotation: -1,
    },
    {
      id: "photo-10",
      title: "[Memory Title: e.g. Making A Birthday Wish]",
      category: "special-days",
      src: "/memories/birthday/birthday-cake.svg",
      caption: "[Caption: Watching you make a wish with glowing candles on your face]",
      date: "[Date: e.g. Birthday Midnight]",
      location: "[Location: e.g. Birthday Warmth]",
      rotation: 2.2,
    },
    {
      id: "photo-11",
      title: "[Memory Title: e.g. Festive Celebrations]",
      category: "favourite",
      src: "/memories/favourite/favourite-2.svg",
      caption: "[Caption: My favourite present in every season of life]",
      date: "[Date: e.g. Holiday Season]",
      location: "[Location: e.g. Home]",
      rotation: -2.5,
    },
    {
      id: "photo-12",
      title: "[Memory Title: e.g. Unfiltered Happiness]",
      category: "happy-moments",
      src: "/memories/happy-moments/happy-1.svg",
      caption: "[Caption: The spontaneous, unplanned moments that turned into our best memories]",
      date: "[Date: e.g. Random Afternoon]",
      location: "[Location: e.g. Together]",
      rotation: 1.5,
    },
  ] as PhotoMemory[],

  // =========================================================================
  // 5. OUR VIDEOS
  // =========================================================================
  // Place your video files in public/videos/memories/ and update paths below!
  videos: [
    {
      id: "video-1",
      title: "[Video 1 Title: e.g. Our Unfiltered Laughter]",
      src: "/videos/memories/our-laughter.mp4",
      thumbnail: "/memories/favourite/favourite-1.svg",
      caption: "[Caption: The moments between the poses, the sound of your laugh, and how everything felt so effortless]",
      date: "[Date: e.g. Summer Memories]",
      duration: "0:30",
    },
    {
      id: "video-2",
      title: "[Video 2 Title: e.g. Roads, Wind & Us]",
      src: "/videos/vacations/mountain-ride.mp4",
      thumbnail: "/memories/vacations/vacation-1.svg",
      caption: "[Caption: Zipping through the cool breeze with you holding on tight]",
      date: "[Date: e.g. Road Trip]",
      duration: "0:45",
    },
  ] as VideoMemory[],

  // =========================================================================
  // 6. OUR COMPLETE STORY — CHRONOLOGICAL TIMELINE
  // =========================================================================
  timeline: [
    {
      id: "tl-1",
      title: "[Milestone 1: The First Time We Met]",
      date: "[Date: e.g. Autumn 2022]",
      tag: "The First Meeting",
      description: "[Description: Write about the day you first saw each other, what you noticed about her, and how that moment became the turning point of your story.]",
      image: "/memories/her-photos/her-portrait-1.svg",
      note: "Some people walk into your life quietly, but their echo stays forever.",
    },
    {
      id: "tl-2",
      title: "[Milestone 2: Our Very First Conversation]",
      date: "[Date: e.g. Late 2022]",
      tag: "First Words",
      description: "[Description: Describe your first long conversation where hours felt like minutes, and you realized how rare and special she is.]",
      note: "That was the moment I realized you were someone genuinely rare.",
    },
    {
      id: "tl-3",
      title: "[Milestone 3: Our First Official Date]",
      date: "[Date: e.g. Early 2023]",
      tag: "First Date",
      description: "[Description: Share what it felt like sitting across from her with butterflies, shy smiles, and not wanting the night to end.]",
      image: "/memories/our-photos/our-photo-1.svg",
      note: "I walked away with butterflies that haven't stopped flying since.",
    },
    {
      id: "tl-4",
      title: "[Milestone 4: Our First Photograph Together]",
      date: "[Date: e.g. Mid 2023]",
      tag: "First Photo",
      description: "[Description: The story behind the first picture you took together, and the start of your memory scrapbook.]",
      image: "/memories/our-photos/our-photo-2.svg",
      note: "The start of our personal gallery.",
    },
    {
      id: "tl-5",
      title: "[Milestone 5: Our First Getaway / Trip]",
      date: "[Date: e.g. Autumn 2023]",
      tag: "First Getaway",
      description: "[Description: Describe your first trip together, traveling side by side, and discovering that the journey is sweeter with her.]",
      image: "/memories/vacations/vacation-1.svg",
      note: "No altitude or view can match the high of loving you.",
    },
    {
      id: "tl-6",
      title: "[Milestone 6: Special Holiday Celebration]",
      date: "[Date: e.g. Winter 2023]",
      tag: "Celebration",
      description: "[Description: Celebrating holidays together, glowing lights, warm drinks, and feeling completely at home in her presence.]",
      image: "/memories/favourite/favourite-1.svg",
      note: "Home isn't a building; it's you.",
    },
    {
      id: "tl-7",
      title: "[Milestone 7: Outdoor Adventures & Walks]",
      date: "[Date: e.g. Summer 2024]",
      tag: "Adventures",
      description: "[Description: Exploring nature, hiking trails, laughing at silly hurdles, and falling in love with her adventurous spirit.]",
      image: "/memories/travel/travel-1.svg",
      note: "You turn every little walk into a story worth telling.",
    },
    {
      id: "tl-8",
      title: "[Milestone 8: Today — And Every Tomorrow]",
      date: "Present & Future",
      tag: "Forever",
      description: "[Description: A message celebrating everything you have built together, and wishing her the happiest birthday today.]",
      image: "/memories/birthday/birthday-celebration.svg",
      note: "Happy Birthday, my love. The best chapters are yet to be written.",
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
        topic: "[Disagreement 1: e.g. The \"What Should We Eat?\" Debate]",
        whatHappened: "\"[What Happened: 'I'm fine with anything!' 'Okay, pizza?' 'No, not pizza...' 45 minutes of menu browsing later...]\"",
        aftermath: "[The Aftermath: Ended up ordering our comfort order, eating together, and laughing at how silly we are every single time.]",
        verdict: "[The Sweet Verdict: I would still wait 2 hours just to eat whatever you're craving.]",
      },
      {
        id: "fight-2",
        topic: "[Disagreement 2: e.g. \"Just 5 More Minutes Of My Game/Hobby\"]",
        whatHappened: "\"[What Happened: Promised 'last round' three rounds ago while getting the legendary loving side-eye.]\"",
        aftermath: "[The Aftermath: Closed the game, apologized sheepishly, and gave 100% undivided cuddles and attention.]",
        verdict: "[The Sweet Verdict: Winning any game < Making you smile.]",
      },
      {
        id: "fight-3",
        topic: "[Disagreement 3: e.g. Navigation & Missing The Turn]",
        whatHappened: "\"[What Happened: 'Turn left! No, the OTHER left!' Missed the exit because we were singing too loud to notice the map.]\"",
        aftermath: "[The Aftermath: Turned a 15-minute drive into a scenic 45-minute tour with songs on full volume.]",
        verdict: "[The Sweet Verdict: I never mind taking the long way home when it means 30 more minutes with you.]",
      },
      {
        id: "fight-4",
        topic: "[Disagreement 4: e.g. The \"Who Loves Who More?\" Debate]",
        whatHappened: "\"[What Happened: An endless back-and-forth of 'I love you more' / 'No, scientifically impossible, I love you more.']\"",
        aftermath: "[The Aftermath: Agreed to declare it a tie, but deep down I know I'm the lucky one who got you.]",
        verdict: "[The Sweet Verdict: A disagreement I'm happy to lose every single day.]",
      },
    ],
    reasonsToChooseYou: [
      "[Reason 1: Because your angry pout is secretly the most adorable thing on earth.]",
      "[Reason 2: Because you never let an argument go to sleep without checking if we're okay.]",
      "[Reason 3: Because saying sorry to you feels like coming home.]",
      "[Reason 4: Because even when we disagree, you still hold my hand tight.]",
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
        title: "[Happy Moment 1: Random Midnight Calls]",
        description: "[Description: Whispering through the dark when the whole world is asleep, sharing silly thoughts, sleepy giggles, and drifting off to the sound of each other breathing.]",
        badge: "Late Nights",
      },
      {
        id: "hm-2",
        title: "[Happy Moment 2: The Uncontrollable Laugh Attacks]",
        description: "[Description: Those moments when one of us says something totally absurd and we both laugh so hard our stomachs hurt and no sound comes out.]",
        badge: "Pure Joy",
      },
      {
        id: "hm-3",
        title: "[Happy Moment 3: Food Comas & Shared Desserts]",
        description: "[Description: Stealing the last fry, arguing over who gets more frosting, and claiming we're 'too full' right before ordering dessert.]",
        badge: "Comfort",
      },
      {
        id: "hm-4",
        title: "[Happy Moment 4: Surprise Hugs From Behind]",
        description: "[Description: Wrapping arms around each other when least expected and feeling our whole bodies relax into a safe place.]",
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
        placeName: "[Destination 1: e.g. Mountain Valley Overlook]",
        stateOrCountry: "[Location: e.g. Scenic Hill Country]",
        date: "[Date: e.g. September Getaway]",
        image: "/memories/vacations/vacation-1.svg",
        whatWeDid: "[What We Did: Stood against the railing overlooking winding mountain roads, breathing in the fresh mountain air.]",
        favouriteMemory: "[Favourite Memory: The way the golden afternoon sun hit your hair while looking out into the misty horizon.]",
        personalNote: "[Personal Note: I used to look at scenic wallpapers; now I just look at you standing against the hills.]",
        stampText: "AIR MAIL — SPECIAL",
      },
      {
        id: "dest-2",
        placeName: "[Destination 2: e.g. Nature Trail & Water Caves]",
        stateOrCountry: "[Location: e.g. Forest Nature Trails]",
        date: "[Date: e.g. Summer Trail Walk]",
        image: "/memories/travel/travel-1.svg",
        whatWeDid: "[What We Did: Hiked through moss-covered cavernous trails, ducked beneath natural stone tunnels, and stepped through fresh streams.]",
        favouriteMemory: "[Favourite Memory: Warning each other at the low rock ceilings and taking candid photos under the stone canopy.]",
        personalNote: "[Personal Note: No hike feels long when every step is taken beside you.]",
        stampText: "SPECIAL DELIVERY",
      },
      {
        id: "dest-3",
        placeName: "[Destination 3: e.g. Historic Heritage Archways]",
        stateOrCountry: "[Location: e.g. Heritage Monument Walk]",
        date: "[Date: e.g. Autumn Walk]",
        image: "/memories/travel/travel-2.svg",
        whatWeDid: "[What We Did: Walked along historic stonework archways and carved windows, discovering quiet corners away from the city buzz.]",
        favouriteMemory: "[Favourite Memory: You turning around with the calmest, most graceful smile.]",
        personalNote: "[Personal Note: Stone might stand for centuries, but what we have is eternal.]",
        stampText: "ROYAL POST",
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
        title: "[Aspiration 1: Soaring In Your Career]",
        description: "[Description: Watching you conquer new challenges, lead meaningful projects, and earn every bit of recognition and success you deserve.]",
        icon: "Briefcase",
      },
      {
        id: "asp-2",
        title: "[Aspiration 2: Independence & Cozy Living]",
        description: "[Description: Building a space of your own, filled with warm lighting, cozy corners, flourishing plants, and your favourite books.]",
        icon: "Sparkles",
      },
      {
        id: "asp-3",
        title: "[Aspiration 3: Mastering New Passions]",
        description: "[Description: Exploring creative pursuits, languages, culinary arts, and expanding that sharp, beautiful intellect.]",
        icon: "BookOpen",
      },
      {
        id: "asp-4",
        title: "[Aspiration 4: Inner Peace & Abundant Joy]",
        description: "[Description: Days where you wake up without stress, surrounded by people who cherish you, feeling deeply fulfilled.]",
        icon: "Heart",
      },
    ],
    bucketList: [
      { id: "bl-1", text: "[Bucket List 1: Watch Northern Lights dancing under the Arctic sky in Norway]", category: "travel", completed: false },
      { id: "bl-2", text: "[Bucket List 2: Walk through pink cherry blossom tunnels in Kyoto, Japan]", category: "travel", completed: false },
      { id: "bl-3", text: "[Bucket List 3: Spend a week in a cozy glass-roof cottage in the Swiss Alps]", category: "travel", completed: false },
      { id: "bl-4", text: "[Bucket List 4: Go on a midnight seaside drive with windows down and music up]", category: "experience", completed: true, notes: "One of our best drives!" },
      { id: "bl-5", text: "[Bucket List 5: Bake a multi-layer birthday cake from scratch together]", category: "together", completed: false },
      { id: "bl-6", text: "[Bucket List 6: Adopt a furry golden retriever puppy and give it a silly name]", category: "goals", completed: false },
      { id: "bl-7", text: "[Bucket List 7: Build our dream home with a sunny reading nook and balcony garden]", category: "together", completed: false },
      { id: "bl-8", text: "[Bucket List 8: Celebrate your 50th birthday together, still laughing just as hard]", category: "together", completed: false },
    ] as BucketListItem[],
    dreamDestinations: [
      { name: "[Destination 1: Santorini, Greece]", country: "[Description: White terraces & blue sunsets over the Aegean]" },
      { name: "[Destination 2: Switzerland]", country: "[Description: Snow-covered peaks, alpine trains, and fondue]" },
      { name: "[Destination 3: Kyoto & Tokyo, Japan]", country: "[Description: Lantern-lit streets, cherry blossoms & ramen]" },
      { name: "[Destination 4: Amalfi Coast, Italy]", country: "[Description: Pastel cliffside villas overlooking turquoise waters]" },
    ],
  },

  // =========================================================================
  // 11. REASONS I LOVE YOU
  // =========================================================================
  reasonsILoveYou: [
    { id: 1, reason: "[Reason 1: The way your eyes crinkle at the corners when something genuinely amuses you.]", category: "smile" },
    { id: 2, reason: "[Reason 2: How you make anywhere we go feel safe, comfortable, and warm.]", category: "heart" },
    { id: 3, reason: "[Reason 3: The way you hold my arm tightly when we're walking through crowded streets.]", category: "together" },
    { id: 4, reason: "[Reason 4: Your silly little happy dance whenever delicious food arrives at the table.]", category: "quirk" },
    { id: 5, reason: "[Reason 5: How you genuinely care about people and animals around you.]", category: "heart" },
    { id: 6, reason: "[Reason 6: The sound of your voice first thing in the morning and right before sleep.]", category: "smile" },
    { id: 7, reason: "[Reason 7: How you can calm my stormy mind with just a single touch of your hand.]", category: "heart" },
    { id: 8, reason: "[Reason 8: Because you make me want to be the best version of myself every single day.]", category: "together" },
    { id: 9, reason: "[Reason 9: Your stubborn determination when you set your mind to achieving a goal.]", category: "quirk" },
    { id: 10, reason: "[Reason 10: The way you look in cozy oversized sweatshirts with hot coffee or tea.]", category: "quirk" },
    { id: 11, reason: "[Reason 11: How you remember the smallest details I mentioned weeks ago in passing.]", category: "heart" },
    { id: 12, reason: "[Reason 12: Because out of eight billion people on this planet, my soul chose you.]", category: "together" },
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

[EDITABLE: Write your personal comfort message for when she misses you. Remind her that distance is temporary, but your love is always with her.]`,
      signature: "Always a heartbeat away, [My Name]",
      photo: "/memories/our-photos/our-photo-1.svg",
    },
    {
      id: "ow-2",
      trigger: "Open When You're Sad",
      tagline: "When the clouds roll in",
      title: "You Don't Have To Be Strong Today",
      letter: `It's okay to feel overwhelmed. It's okay to have days where you just want to curl up and do nothing. You don't have to carry the weight of the entire world on your shoulders.

[EDITABLE: Write your gentle words for when she feels down. Remind her she is safe, cared for, and never alone.]`,
      signature: "Your safe haven, [My Name]",
      photo: "/memories/her-photos/her-portrait-2.svg",
    },
    {
      id: "ow-3",
      trigger: "Open When You Need Motivation",
      tagline: "Before a big challenge or exam",
      title: "You Are Capable Of Anything",
      letter: `Remember how hard you've worked to get here. Remember every single challenge you thought was impossible, and yet you conquered it.

[EDITABLE: Write an inspiring pep-talk reminding her of her brilliance, resilience, and unique strength.]`,
      signature: "Cheering for you always, [My Name]",
    },
    {
      id: "ow-4",
      trigger: "Open When You Want To Smile",
      tagline: "A quick dose of instant happiness",
      title: "Remember That Time...",
      letter: `Remember the funny little moments that made us laugh until our stomachs hurt?

[EDITABLE: Write a funny inside joke, silly memory, or funny story that never fails to make her grin.]`,
      signature: "Your goofy partner, [My Name]",
      photo: "/memories/happy-moments/happy-2.svg",
    },
    {
      id: "ow-5",
      trigger: "Open When You Need A Reminder",
      tagline: "How truly special you are",
      title: "Just In Case You Forgot",
      letter: `You are breathtakingly beautiful — not just when you're dressed up, but in the morning with messy hair, in oversized hoodies, and when you're laughing so hard your nose scrunches up.

[EDITABLE: Remind her of all the reasons she is worthy, cherished, and uniquely irreplaceable.]`,
      signature: "Yours completely, [My Name]",
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
      "[Promise 1: To always listen to your thoughts, even when they're whispered late at night.]",
      "[Promise 2: To celebrate your small victories just as loudly as the big milestones.]",
      "[Promise 3: To hold your hand through every unfamiliar city and every unexpected storm.]",
      "[Promise 4: To never let our playful laughter fade as the years roll on.]",
    ],
  },

  // =========================================================================
  // 14. THE FINAL LETTER (Closing Envelope & Birthday Surprise)
  // =========================================================================
  finalLetter: {
    envelopePrompt: "Click to open your special birthday letter",
    title: "My Dearest [Her Name],",
    subtitle: "A Letter From My Heart To Yours",
    date: "[Her Birthday: e.g. July 31st]",
    content: `If I had to summarize everything you are to me in a single sentence, it would be this: You made my life feel like poetry.

[EDITABLE: Pour your heart out here! Write your full personal birthday letter to her.
Tell her how she changed your life, what you cherish about her soul, and your warmest wishes for her year ahead.]`,
    closingQuote: "Here's to you, to us, and to all the beautiful memories still waiting to happen.",
    signature: "Forever yours, [My Name]",
  },
};
