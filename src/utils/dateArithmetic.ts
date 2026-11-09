/**
 * Precise calendar date arithmetic and countdown utilities
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
 * - Timezone consistency
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
 * Computes live countdown to target birthday
 */
export function calculateBirthdayCountdown(targetDateStr: string, now: Date = new Date()): CountdownState {
  const target = new Date(targetDateStr);
  
  if (isNaN(target.getTime())) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isToday: true, isPast: false, totalSecondsRemaining: 0 };
  }

  // Calculate target for current or upcoming birthday
  let targetYear = now.getFullYear();
  let currentYearTarget = new Date(target);
  currentYearTarget.setFullYear(targetYear);

  let diffMs = currentYearTarget.getTime() - now.getTime();

  // If birthday has passed for this year by more than 24 hours, count to next year's birthday
  // If it's within the 24-hour birthday window, isToday = true
  const dayMs = 24 * 60 * 60 * 1000;
  
  let isToday = false;
  let isPast = false;

  if (diffMs <= 0 && diffMs > -dayMs) {
    // It's her birthday right now!
    isToday = true;
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isToday: true, isPast: false, totalSecondsRemaining: 0 };
  } else if (diffMs < -dayMs) {
    // Birthday passed this year, point to next year
    currentYearTarget.setFullYear(targetYear + 1);
    diffMs = currentYearTarget.getTime() - now.getTime();
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

