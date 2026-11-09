import confetti from 'canvas-confetti';

/**
 * Romantic Confetti & Fireworks Celebration Utilities
 */

// Elegant romantic color palette for particles
export const ROMANTIC_CONFETTI_COLORS = [
  '#E08798', // vintage rose
  '#832232', // burgundy
  '#D4AF37', // champagne gold
  '#FFFDF9', // ivory
  '#FDF2F4', // blush
  '#FF758F', // bright coral pink
];

/**
 * Triggers a grand multi-stage birthday fireworks celebration
 */
export function triggerGrandBirthdayCelebration() {
  const duration = 6 * 1000;
  const animationEnd = Date.now() + duration;

  // Initial burst from center
  confetti({
    particleCount: 120,
    spread: 100,
    origin: { y: 0.6 },
    colors: ROMANTIC_CONFETTI_COLORS,
    disableForReducedMotion: true,
  });

  // Continuous left & right fireworks cannons
  const interval: any = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 40 * (timeLeft / duration);

    // Left cannon
    confetti({
      particleCount,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: ROMANTIC_CONFETTI_COLORS,
      disableForReducedMotion: true,
    });

    // Right cannon
    confetti({
      particleCount,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: ROMANTIC_CONFETTI_COLORS,
      disableForReducedMotion: true,
    });
  }, 250);
}

/**
 * Gentle sparkling heart burst for secret buttons and letters
 */
export function triggerHeartBurst(originX: number = 0.5, originY: number = 0.5) {
  confetti({
    particleCount: 50,
    spread: 60,
    origin: { x: originX, y: originY },
    colors: ['#E08798', '#832232', '#D4AF37'],
    shapes: ['circle'],
    ticks: 200,
    gravity: 0.7,
    scalar: 1.2,
    disableForReducedMotion: true,
  });
}

/**
 * Shimmer shower for countdown ticks or milestone clicks
 */
export function triggerGoldenShimmer() {
  confetti({
    particleCount: 30,
    spread: 45,
    origin: { y: 0.4 },
    colors: ['#D4AF37', '#FFFDF9', '#E08798'],
    scalar: 0.9,
    disableForReducedMotion: true,
  });
}

