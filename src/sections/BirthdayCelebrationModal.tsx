import React, { useEffect, useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Cake, PartyPopper } from 'lucide-react';
import { loveStoryConfig, PhotoMemory } from '../config/loveStory';
import { discoveredBirthdayPhotos, discoveredPhotos, uniquePersonalPhotos } from '../generated/mediaManifest';
import { triggerGrandBirthdayCelebration } from '../utils/confettiUtils';
import { ShuffleBag } from '../utils/shuffleBag';

interface BirthdayCelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlayBirthdayMusic?: () => void;
}

export const BirthdayCelebrationModal: React.FC<BirthdayCelebrationModalProps> = ({
  isOpen,
  onClose,
  onPlayBirthdayMusic,
}) => {
  const [candlesLit] = useState(true);

  // Full pool of unique photos mixing birthday, couple, vacations, and happy memories
  const allUniqueMedia: PhotoMemory[] = useMemo(() => {
    if (uniquePersonalPhotos && uniquePersonalPhotos.length > 0) {
      return uniquePersonalPhotos;
    }
    return discoveredPhotos;
  }, []);

  const shuffleBagRef = useRef<ShuffleBag<PhotoMemory>>(
    new ShuffleBag(allUniqueMedia, p => p.src)
  );

  // Initial set of 8 photos for desktop and 3 for mobile
  const [celebrationPhotos, setCelebrationPhotos] = useState<PhotoMemory[]>(() => {
    return shuffleBagRef.current.drawMultiple(8);
  });

  useEffect(() => {
    if (isOpen) {
      triggerGrandBirthdayCelebration();
      onPlayBirthdayMusic?.();

      // Refresh initial draw
      setCelebrationPhotos(shuffleBagRef.current.drawMultiple(8));

      // Continuously rotate 2 floating photos every 4.5 seconds with new memories from the shuffle bag
      const interval = setInterval(() => {
        if (document.visibilityState === 'hidden') return;

        setCelebrationPhotos(prev => {
          const updated = [...prev];
          const newPhoto1 = shuffleBagRef.current.draw();
          const newPhoto2 = shuffleBagRef.current.draw();
          const slot1 = Math.floor(Math.random() * updated.length);
          let slot2 = Math.floor(Math.random() * updated.length);
          if (slot2 === slot1) slot2 = (slot1 + 1) % updated.length;

          if (newPhoto1) updated[slot1] = newPhoto1;
          if (newPhoto2) updated[slot2] = newPhoto2;
          return updated;
        });
      }, 4500);

      return () => clearInterval(interval);
    }
  }, [isOpen, onPlayBirthdayMusic]);

  // Desktop perimeter positions
  const desktopPositions = [
    { top: '8%', left: '4%', rotate: -8 },
    { top: '10%', right: '6%', rotate: 10 },
    { bottom: '12%', left: '5%', rotate: 6 },
    { bottom: '14%', right: '7%', rotate: -12 },
    { top: '45%', left: '2%', rotate: -15 },
    { top: '48%', right: '3%', rotate: 12 },
    { top: '2%', left: '42%', rotate: -3 },
    { bottom: '4%', left: '38%', rotate: 4 },
  ];

  // Mobile positions (safe perimeter zones that do not overlap the central modal content)
  const mobilePositions = [
    { top: '1.5%', left: '3%', rotate: -6 },
    { top: '1.5%', right: '3%', rotate: 6 },
    { bottom: '1.5%', left: '6%', rotate: -4 },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Dark luxury backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#140A0D]/95 backdrop-blur-xl"
          />

          {/* Close button */}
          <button
            onClick={onClose}
            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close celebration"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Animated Photo Bombardment in Background — Automatically changing over time */}
          <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
            {/* Desktop Photos (8 distributed items continuously rotating) */}
            {celebrationPhotos.map((photo, index) => {
              const pos = desktopPositions[index % desktopPositions.length];
              return (
                <motion.div
                  key={`desktop-${photo.id}-${index}`}
                  initial={{ opacity: 0, scale: 0.8, y: 30 }}
                  animate={{ opacity: 0.85, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -30 }}
                  transition={{
                    type: 'spring',
                    stiffness: 150,
                    damping: 20,
                  }}
                  className="absolute hidden md:block w-36 h-44 lg:w-44 lg:h-52 p-2 bg-white rounded-lg shadow-2xl border-2 border-champagne"
                  style={{
                    ...pos,
                    transform: `rotate(${pos.rotate}deg)`,
                  }}
                >
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-full object-cover rounded"
                  />
                </motion.div>
              );
            })}

            {/* Mobile Photos (2-3 subtle floating miniatures on mobile viewports) */}
            {celebrationPhotos.slice(0, 3).map((photo, index) => {
              const pos = mobilePositions[index % mobilePositions.length];
              return (
                <motion.div
                  key={`mobile-${photo.id}-${index}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.75, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 160,
                    damping: 20,
                  }}
                  className="absolute md:hidden w-20 h-24 p-1 bg-white rounded shadow-xl border border-champagne"
                  style={{
                    ...pos,
                    transform: `rotate(${pos.rotate}deg)`,
                  }}
                >
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-full object-cover rounded"
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Central Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative z-20 max-w-xl w-full bg-[#FFFDF9] rounded-3xl p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.5)] border-2 border-champagne text-center overflow-hidden my-auto"
          >
            {/* Romantic background gradient glow */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-rose-vintage/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-gold-warm/20 rounded-full blur-3xl pointer-events-none" />

            {/* Cake / Party icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-burgundy/10 border-2 border-champagne/40 mb-6 relative">
              <Cake className="w-10 h-10 text-burgundy" />
              {candlesLit && (
                <span className="absolute -top-1 right-2 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-warm opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-gold-warm items-center justify-center">
                    <Sparkles className="w-2.5 h-2.5 text-white" />
                  </span>
                </span>
              )}
            </div>

            {/* Greeting Headline */}
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-burgundy tracking-tight mb-2">
              HAPPY BIRTHDAY SHONAA ❤️
            </h2>

            {/* Sub-badge */}
            <div className="inline-block px-4 py-1.5 rounded-full bg-blush-100/80 border border-blush-200 text-burgundy font-serif font-bold text-sm sm:text-base mb-6 shadow-sm">
              Today is 10 November 2026 — Celebrating Your 24th Birthday!
            </div>

            {/* Romantic Heartfelt Message */}
            <div className="space-y-4 text-espresso-soft font-sans text-sm sm:text-base leading-relaxed max-w-md mx-auto">
              <p>
                To my favourite person in the entire world, my Shonaa:
              </p>
              <p className="font-serif italic text-base sm:text-lg text-burgundy font-semibold">
                "May your 24th year be as radiant, joyful, and completely breathtaking as you make my life every single day."
              </p>
              <p>
                From March 2025 when our story first began, to officially becoming us on 14 April 2025, and every single second since — loving you is the greatest privilege of my life.
              </p>
            </div>

            {/* Fireworks / Re-trigger button */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => triggerGrandBirthdayCelebration()}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-burgundy hover:bg-rose-deep text-champagne font-serif font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 border border-champagne/40"
              >
                <PartyPopper className="w-4 h-4" />
                Launch Fireworks Again!
              </button>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-blush-50 hover:bg-blush-100 text-espresso-soft font-sans font-medium text-sm transition-colors border border-blush-200"
              >
                Explore The Rest of Your Universe
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
