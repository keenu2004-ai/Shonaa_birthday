# Content Guide — Personalizing Our Little Universe ❤️

Every single piece of text, name, date, memory, and personal note is centralized in one file:

📁 **`src/config/loveStory.ts`**

You do not need to modify HTML or React component files. Simply open `src/config/loveStory.ts` in any code editor and edit the fields below.

---

## 1. Names & Hero Titles

Find the `names` block at the top of `src/config/loveStory.ts`:

```typescript
names: {
  herName: "Theia",                   // Her name
  herNickname: "Shona",               // Pet name / nickname
  myName: "Vaibhav",                  // Your name
  websiteTitle: "Our Little Universe",// Title shown in navbar & header
  heroOpeningTagline: "For the girl who made my world beautiful.",
  openingButtonText: "Open Your Little Universe ❤️",
  birthdayCelebrationTitle: "Happy Birthday, Theia!",
  birthdayAge: 24,                    // Her age (optional)
}
```

---

## 2. Dates & Live Counters

### Relationship Start Date (Live Duration Counter)
Format: `YYYY-MM-DDTHH:mm:ss+05:30` (Asia/Kolkata timezone offset).

```typescript
relationshipStart: "2023-08-15T00:00:00+05:30",
relationshipStartDisplay: "August 15, 2023",
counterCaption: "Every second with you is my favourite second.",
```
*The website calculates exact calendar years, months, days, hours, minutes, and seconds from this timestamp in real time!*

### Her Birthday (Live Countdown & Celebration)
```typescript
birthdayDate: "2027-07-31T00:00:00+05:30",
birthdayDisplay: "July 31",
timezone: "Asia/Kolkata",
forceTestCelebration: false, // Set to true to preview fireworks anytime!
```

---

## 3. Our Complete Story (Chronological Timeline)

Milestones are stored in the `timeline` array. You can add as many as you like:

```typescript
timeline: [
  {
    id: "tl-1",
    title: "When Our Paths First Crossed",
    date: "Autumn 2022",
    tag: "The First Meeting",
    description: "A random day that turned out to be the most important turning point of my life...",
    image: "/memories/her-photos/her-portrait-1.jpg",
    note: "Some people walk into your life quietly, but their echo stays forever.",
  },
  // Add new milestone objects here
]
```

---

## 4. Fights & Imperfect Chapters

Located under `imperfectChapters`:

```typescript
imperfectChapters: {
  title: "Not Every Chapter Was Perfect, But Every Chapter Was Ours.",
  subtitle: "Because real love isn't a fairy tale with no bumps — it's laughing five minutes after arguing over something ridiculous.",
  fights: [
    {
      id: "fight-1",
      topic: "The Endless \"What Should We Eat?\" Debate",
      whatHappened: "\"I'm fine with anything!\" \"Okay, Chinese?\" \"No, not Chinese...\"",
      aftermath: "Ended up ordering our exact comfort order, eating together, and laughing...",
      verdict: "I would still wait 2 hours just to eat whatever you're craving.",
    },
  ],
  reasonsToChooseYou: [
    "Because your angry pout is secretly the most adorable thing on earth.",
    "Because saying sorry to you feels like coming home.",
  ],
}
```

---

## 5. Travel Diary (Vintage Postcards)

Stored in the `travelDiary.destinations` array:

```typescript
destinations: [
  {
    id: "dest-1",
    placeName: "Mountain Valley Overlook",
    stateOrCountry: "Uttarakhand Hills",
    date: "September Getaway",
    image: "/memories/vacations/mountain-1.jpg",
    whatWeDid: "Stood against the railing overlooking the vast winding roads...",
    favouriteMemory: "The way the golden afternoon sun hit your hair...",
    personalNote: "I used to look at scenic wallpapers; now I just look at you.",
    stampText: "AIR MAIL — HILLS 2023",
  },
]
```

---

## 6. Her Dreams & Interactive Bucket List

Located in `dreams`:

```typescript
aspirations: [
  { id: "asp-1", title: "Soaring In Your Career", description: "..." },
],
bucketList: [
  { id: "bl-1", text: "Watch Northern Lights in Norway", category: "travel", completed: false },
  { id: "bl-4", text: "Midnight seaside drive", category: "experience", completed: true, notes: "One of our best drives!" },
],
dreamDestinations: [
  { name: "Santorini, Greece", country: "White terraces & blue sunsets over the Aegean" },
]
```

---

## 7. Digital Letters & Envelopes

### "Reasons I Love You" Card Stack
Located in `reasonsILoveYou`:
```typescript
reasonsILoveYou: [
  { id: 1, reason: "The way your eyes crinkle at the corners when something genuinely amuses you." },
  { id: 2, reason: "How you make anywhere we go feel safe, comfortable, and warm." },
]
```

### "Open When..." Envelopes
Located in `openWhen`:
```typescript
openWhen: [
  {
    id: "ow-1",
    trigger: "Open When You Miss Me",
    tagline: "When distance feels too loud",
    title: "I Am Never Far From You",
    letter: "Whenever you feel far away from me, look at these photos...",
    signature: "Always a heartbeat away, Vaibhav",
    photo: "/memories/our-photos/our-photo-1.jpg",
  },
]
```

### The Final Birthday Letter
Located in `finalLetter`:
```typescript
finalLetter: {
  title: "My Dearest,",
  date: "July 31st",
  content: `If I had to summarize everything you are to me in a single sentence...`,
  closingQuote: "Here's to you, to us, and to all the beautiful memories still waiting to happen.",
  signature: "Forever yours, Vaibhav",
}
```
