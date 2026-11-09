import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Music } from 'lucide-react';
import { loveStoryConfig } from '../config/loveStory';
import { triggerGrandBirthdayCelebration, triggerHeartBurst } from '../utils/confettiUtils';

interface HeroOpeningProps {
  onOpenUniverse: () => void;
  isOpen: boolean;
}

export const HeroOpening: React.FC<HeroOpeningProps> = ({ onOpenUniverse, isOpen }) => {
  const handleOpen = () => {
    triggerHeartBurst(0.5, 0.6);
    onOpenUniverse();
  };

  if (isOpen) {
    // If universe has already been opened, show hero banner at top of page
    return (
      <header className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden paper-texture border-b border-blush-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blush-100 border border-blush-200 text-burgundy text-xs sm:text-sm font-serif italic mb-6 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-champagne" />
            <span>Welcome to our private digital scrapbook</span>
            <Sparkles className="w-3.5 h-3.5 text-champagne" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-burgundy tracking-tight leading-tight"
          >
            {loveStoryConfig.names.heroOpeningTagline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 font-handwriting text-2xl sm:text-3xl md:text-4xl text-rose-deep max-w-2xl mx-auto leading-relaxed"
          >
            "Every photograph, every laugh, and every quiet second — all preserved right here for you."
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#story"
              className="px-6 py-3 rounded-full bg-burgundy hover:bg-burgundy-light text-ivory-100 font-sans font-medium text-sm shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
            >
              <span>Explore Our Story</span>
              <Heart className="w-4 h-4 text-champagne fill-champagne" />
            </a>
            <a
              href="#countdown"
              className="px-6 py-3 rounded-full bg-white hover:bg-blush-50 text-burgundy border border-blush-200 font-sans font-medium text-sm shadow-sm hover:shadow transition-all duration-300"
            >
              Birthday Countdown
            </a>
          </motion.div>
        </div>
      </header>
    );
  }

  // Full-screen Opening Gateway Screen
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#FAF6ED] paper-texture overflow-hidden">
      {/* Soft romantic ambient background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-blush-100/60 via-transparent to-blush-200/40 pointer-events-none" />

      {/* Decorative floral corners */}
      <div className="absolute top-6 left-6 text-rose-vintage/40 font-serif italic text-xs tracking-widest hidden sm:block">
        CHAPTER I : THE BEGINNING
      </div>
      <div className="absolute bottom-6 right-6 text-rose-vintage/40 font-serif italic text-xs tracking-widest hidden sm:block">
        FOREVER & ALWAYS
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-10 max-w-lg w-full bg-white/90 backdrop-blur-md rounded-2xl p-6 sm:p-10 shadow-[0_20px_50px_-10px_rgba(42,30,34,0.18)] border border-[#E8DCC9] text-center"
      >
        {/* Replaceable Opening Photograph Frame */}
        <div className="relative mx-auto w-40 h-48 sm:w-48 sm:h-56 rounded-lg p-2 bg-white shadow-md border border-blush-200 -rotate-2 hover:rotate-0 transition-transform duration-500 mb-6 group">
          <div className="w-full h-full rounded overflow-hidden bg-ivory-200 relative">
            <img
              src={loveStoryConfig.names.heroCoverPhoto}
              alt="Opening memory"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent flex items-end justify-center p-2">
              <span className="text-[10px] text-white font-serif italic tracking-wider">
                Our Story
              </span>
            </div>
          </div>
        </div>

        {/* Small badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-serif italic text-burgundy bg-blush-100 border border-blush-200 mb-4">
          <Sparkles className="w-3.5 h-3.5 text-champagne" />
          <span>For My Beautiful Girlfriend</span>
        </div>

        {/* Cinematic Title */}
        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-burgundy leading-snug tracking-tight">
          "{loveStoryConfig.names.heroOpeningTagline}"
        </h1>

        {/* Handwritten Note */}
        <p className="mt-4 font-handwriting text-2xl sm:text-3xl text-rose-deep leading-relaxed">
          I made this little universe to remind you how loved and special you truly are.
        </p>

        {/* Music hint notice */}
        <p className="mt-3 text-[11px] text-espresso-muted/70 flex items-center justify-center gap-1.5 font-sans">
          <Music className="w-3 h-3 text-rose-vintage" />
          <span>Clicking below starts your soundtrack</span>
        </p>

        {/* Main CTA Button */}
        <motion.button
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleOpen}
          className="mt-6 w-full py-4 px-6 rounded-full bg-burgundy hover:bg-burgundy-light text-ivory-100 font-serif font-bold text-base sm:text-lg shadow-[0_8px_25px_rgba(131,34,50,0.3)] transition-all duration-300 flex items-center justify-center gap-3"
        >
          <span>{loveStoryConfig.names.openingButtonText}</span>
          <Heart className="w-5 h-5 text-champagne fill-champagne animate-pulse" />
        </motion.button>
      </motion.div>
    </div>
  );
};

