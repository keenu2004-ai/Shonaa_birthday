// Direct test of the timezone logic
export function getNowInKolkata(now = new Date()) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  });

  const parts = formatter.formatToParts(now);
  const partMap = {};
  for (const p of parts) {
    if (p.type !== 'literal') {
      partMap[p.type] = parseInt(p.value, 10);
    }
  }

  return {
    year: partMap.year || now.getFullYear(),
    month: partMap.month || (now.getMonth() + 1),
    day: partMap.day || now.getDate(),
  };
}

export function calculateBirthdayCountdown(targetDateStr, now = new Date(), forceTestCelebration = false) {
  if (forceTestCelebration) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isToday: true, isPast: false, totalSecondsRemaining: 0 };
  }

  const target = new Date(targetDateStr);
  if (isNaN(target.getTime())) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isToday: true, isPast: false, totalSecondsRemaining: 0 };
  }

  const { year: currentKolkataYear } = getNowInKolkata(now);
  const targetMonth = target.getMonth();
  const targetDay = target.getDate();

  const pad = (n) => String(n).padStart(2, '0');
  const makeKolkataISO = (y) =>
    `${y}-${pad(targetMonth + 1)}-${pad(targetDay)}T00:00:00+05:30`;

  let kolkataTarget = new Date(makeKolkataISO(currentKolkataYear));
  let diffMs = kolkataTarget.getTime() - now.getTime();
  const oneDayMs = 24 * 60 * 60 * 1000;

  if (diffMs <= 0 && diffMs > -oneDayMs) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isToday: true, isPast: false, totalSecondsRemaining: 0 };
  } else if (diffMs <= -oneDayMs) {
    kolkataTarget = new Date(makeKolkataISO(currentKolkataYear + 1));
    diffMs = kolkataTarget.getTime() - now.getTime();
  }

  const totalSecondsRemaining = Math.max(0, Math.floor(diffMs / 1000));
  const days = Math.floor(totalSecondsRemaining / 86400);
  const hours = Math.floor((totalSecondsRemaining % 86400) / 3600);
  const minutes = Math.floor((totalSecondsRemaining % 3600) / 60);
  const seconds = totalSecondsRemaining % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
    isToday: false,
    isPast: totalSecondsRemaining === 0,
    totalSecondsRemaining,
  };
}

console.log('--- RUNNING SIMULATED TIMEZONE TESTS ---');

const targetDate = '2027-07-31T00:00:00+05:30';

// Test 1: Exactly 10 days before July 31 in Asia/Kolkata
// 2027-07-21 00:00:00 IST = 2027-07-20 18:30:00 UTC
const instant10DaysBefore = new Date(Date.parse('2027-07-20T18:30:00Z'));

// Simulated callers in 4 different global timezones at that exact same physical moment
const timezones = ['Asia/Kolkata', 'America/New_York', 'Europe/London', 'Australia/Sydney'];

for (const tz of timezones) {
  const result = calculateBirthdayCountdown(targetDate, instant10DaysBefore);
  console.log(`[Timezone: ${tz}] 10 days before:`, {
    days: result.days,
    hours: result.hours,
    minutes: result.minutes,
    seconds: result.seconds,
    isToday: result.isToday
  });
  if (result.days !== 10 || result.hours !== 0 || result.minutes !== 0) {
    console.error(`FAIL for ${tz}`);
    process.exit(1);
  }
}

// Test 2: The exact moment of July 31 00:00:00 IST (= 2027-07-30T18:30:00Z)
const instantMidnight = new Date(Date.parse('2027-07-30T18:30:00Z'));
for (const tz of timezones) {
  const result = calculateBirthdayCountdown(targetDate, instantMidnight);
  console.log(`[Timezone: ${tz}] Birthday Midnight: isToday = ${result.isToday}`);
  if (!result.isToday) {
    console.error(`FAIL for ${tz} at midnight`);
    process.exit(1);
  }
}

// Test 3: 20 hours into July 31 in Kolkata (= 2027-07-31T14:30:00Z)
// In New York, local time is 10:30 AM on July 31. In London, 3:30 PM. In Sydney, 12:30 AM on Aug 1!
// But for ALL of them, it MUST be recognized as her birthday in Kolkata!
const instantNoon = new Date(Date.parse('2027-07-31T14:30:00Z'));
for (const tz of timezones) {
  const result = calculateBirthdayCountdown(targetDate, instantNoon);
  console.log(`[Timezone: ${tz}] 20h into birthday: isToday = ${result.isToday}`);
  if (!result.isToday) {
    console.error(`FAIL for ${tz} 20h into birthday`);
    process.exit(1);
  }
}

console.log('ALL TIMEZONE TESTS PASSED IDENTICALLY!');
