/**
 * Precise calendar date arithmetic and timezone-aware countdown utilities
 */

export interface DetailedDuration {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
}

export interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isToday: boolean;
  isPast: boolean;
  totalSecondsRemaining: number;
}

/**
 * Calculates exact calendar difference between two dates handling:
 * - Variable days per month (28, 29, 30, 31)
 * - Leap years
 * - Consistency across timezones
 */
export function calculatePreciseDuration(startDateStr: string, currentDate: Date = new Date()): DetailedDuration {
  const start = new Date(startDateStr);
  const end = currentDate;

  if (isNaN(start.getTime())) {
    return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0, totalDays: 0 };
  }

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();
  let hours = end.getHours() - start.getHours();
  let minutes = end.getMinutes() - start.getMinutes();
  let seconds = end.getSeconds() - start.getSeconds();

  if (seconds < 0) {
    seconds += 60;
    minutes--;
  }

  if (minutes < 0) {
    minutes += 60;
    hours--;
  }

  if (hours < 0) {
    hours += 24;
    days--;
  }

  if (days < 0) {
    // Get days in previous month of end date
    const prevMonthLastDay = new Date(end.getFullYear(), end.getMonth(), 0).getDate();
    days += prevMonthLastDay;
    months--;
  }

  if (months < 0) {
    months += 12;
    years--;
  }

  const diffMs = Math.max(0, end.getTime() - start.getTime());
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  return {
    years: Math.max(0, years),
    months: Math.max(0, months),
    days: Math.max(0, days),
    hours: Math.max(0, hours),
    minutes: Math.max(0, minutes),
    seconds: Math.max(0, seconds),
    totalDays,
  };
}

/**
 * Helper to get the current timestamp in Asia/Kolkata (IST = UTC + 5:30)
 */
export function getNowInKolkata(): { kolkataDate: Date; year: number; month: number; day: number } {
  const now = new Date();
  // Using Intl API to format to Asia/Kolkata
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
  const partMap: Record<string, number> = {};
  for (const p of parts) {
    if (p.type !== 'literal') {
      partMap[p.type] = parseInt(p.value, 10);
    }
  }

  return {
    kolkataDate: now,
    year: partMap.year || now.getFullYear(),
    month: partMap.month || now.getMonth() + 1,
    day: partMap.day || now.getDate(),
  };
}

/**
 * Computes live countdown to target birthday specifically calibrated to Asia/Kolkata
 */
export function calculateBirthdayCountdown(
  targetDateStr: string,
  now: Date = new Date(),
  forceTestCelebration: boolean = false
): CountdownState {
  if (forceTestCelebration) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isToday: true, isPast: false, totalSecondsRemaining: 0 };
  }

  const target = new Date(targetDateStr);
  if (isNaN(target.getTime())) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isToday: true, isPast: false, totalSecondsRemaining: 0 };
  }

  // Determine current year in Asia/Kolkata
  const { year: currentKolkataYear } = getNowInKolkata();

  // Target birthday month and day from input
  const targetMonth = target.getMonth(); // 0-indexed
  const targetDay = target.getDate();

  // Build target ISO string in Asia/Kolkata for current year
  // e.g. 2027-07-31T00:00:00+05:30
  const pad = (n: number) => String(n).padStart(2, '0');
  const makeKolkataISO = (y: number) =>
    `${y}-${pad(targetMonth + 1)}-${pad(targetDay)}T00:00:00+05:30`;

  let kolkataTarget = new Date(makeKolkataISO(currentKolkataYear));
  let diffMs = kolkataTarget.getTime() - now.getTime();
  const oneDayMs = 24 * 60 * 60 * 1000;

  let isToday = false;
  let isPast = false;

  // If we are within the 24-hour birthday window in Asia/Kolkata
  if (diffMs <= 0 && diffMs > -oneDayMs) {
    isToday = true;
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isToday: true, isPast: false, totalSecondsRemaining: 0 };
  } else if (diffMs <= -oneDayMs) {
    // Birthday has passed this year, count down to next year's birthday
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
    isToday,
    isPast: totalSecondsRemaining === 0 && !isToday,
    totalSecondsRemaining,
  };
}
