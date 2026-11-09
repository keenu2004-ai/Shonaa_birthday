import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Cake, PartyPopper } from 'lucide-react';
import { loveStoryConfig } from '../config/loveStory';
import { discoveredBirthdayPhotos, discoveredPhotos } from '../generated/mediaManifest';
import { triggerGrandBirthdayCelebration } from '../utils/confettiUtils';

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

  useEffect(() => {
    if (isOpen) {
      triggerGrandBirthdayCelebration();
      onPlayBirthdayMusic?.();
    }
  }, [isOpen, onPlayBirthdayMusic]);

  // Prioritize discovered birthday photographs, falling back gracefully
  const celebrationPhotos = useMemo(() => {
    if (discoveredBirthdayPhotos && discoveredBirthdayPhotos.length > 0) {
      return discoveredBirthdayPhotos.slice(0, 8);
    }
    const birthdayMarked = (discoveredPhotos || []).filter(p => p.isBirthdayCelebration || p.category === 'birthday');
    if (birthdayMarked.length > 0) {
      return birthdayMarked.slice(0, 8);
    }
    return loveStoryConfig.photos.slice(0, 8);
  }, []);

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

          {/* Animated Photo Bombardment in Background */}
          <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
            {/* Desktop Photos (8 distributed items) */}
            {celebrationPhotos.map((photo, index) => {
              const pos = desktopPositions[index % desktopPositions.length];
              return (
                <motion.div
                  key={`desktop-${photo.id}`}
                  initial={{ opacity: 0, scale: 0, y: 100 }}
                  animate={{ opacity: 0.85, scale: 1, y: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 150,
                    damping: 20,
                    delay: 0.2 + index * 0.1,
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
                  key={`mobile-${photo.id}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.75, scale: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 160,
                    damping: 20,
                    delay: 0.25 + index * 0.12,
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

          {/* Central Birthday Surprise Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 30 }}
            transition={{ type: 'spring', damping: 22, stiffness: 260 }}
            className="relative z-20 max-w-xl w-full bg-[#FFFDF9] rounded-3xl p-5 sm:p-10 text-center shadow-[0_25px_60px_-15px_rgba(212,175,55,0.3)] border-2 border-champagne/80 paper-texture my-6 sm:my-8"
          >
            {/* Animated Cake Icon */}
            <motion.div
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full bg-blush-100 flex items-center justify-center text-burgundy mb-4 sm:mb-6 border-2 border-rose-vintage/40 shadow-inner"
            >
              <Cake className="w-10 h-10 sm:w-12 sm:h-12 text-burgundy" />
              {candlesLit && (
                <span className="absolute -top-2 flex gap-1">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-champagne fill-champagne animate-pulse" />
                </span>
              )}
            </motion.div>

            {/* Sub-badge */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-blush-100 text-burgundy font-serif italic text-xs sm:text-sm mb-3">
              <PartyPopper className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-champagne" />
              <span>A Grand Celebration For You</span>
            </div>

            {/* Grand Birthday Headline */}
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-extrabold text-burgundy tracking-tight leading-tight">
              {loveStoryConfig.names.birthdayCelebrationTitle}
            </h2>

            {/* Emotional Birthday Subtitle */}
            <p className="mt-3 sm:mt-4 font-handwriting text-xl sm:text-2xl md:text-3xl text-rose-deep leading-relaxed">
              "The universe became infinitely more beautiful the day you were born."
            </p>

            <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-blush-200/60 text-xs sm:text-sm font-sans text-espresso-soft leading-relaxed space-y-2.5 sm:space-y-3 px-1 sm:px-2">
              <p>
                Today isn't just another day on the calendar. It is the day the world was gifted with your laughter, your gentle kindness, and your brilliant mind.
              </p>
              <p>
                May this year bring you closer to all your wildest dreams, fill your heart with overwhelming joy, and remind you every day that you are deeply, unconditionally loved.
              </p>
            </div>

            {/* Actions */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3">
              <button
                onClick={() => triggerGrandBirthdayCelebration()}
                className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-burgundy hover:bg-burgundy-light text-ivory-100 font-serif font-bold text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-champagne" />
                <span>Launch More Fireworks!</span>
              </button>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-blush-100 hover:bg-blush-200 text-burgundy font-serif font-bold text-xs sm:text-sm transition-all"
              >
                Continue In Our Universe
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
