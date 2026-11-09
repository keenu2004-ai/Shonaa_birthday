import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Star, Gift, Wine } from 'lucide-react';
import { SectionHeader } from '../components/ui/SectionHeader';
import { triggerGrandBirthdayCelebration, triggerHeartBurst } from '../utils/confettiUtils';

export const InteractiveSurprises: React.FC = () => {
  const memoriesJar = [
    "That cold winter evening wrapped in blankets with fairy lights glowing.",
    "The evening scooter ride where we took the long way home just to keep talking.",
    "Eating pizza in total silence because it was so delicious we forgot to speak.",
    "Watching you close your eyes and make a birthday wish with candles glowing on your face.",
    "Standing high on mountain hills, breathing crisp air, feeling like the clouds belonged to us.",
    "That silly photo with the pink bows filter that still makes me smile every time I see it.",
    "Singing along terribly to our favourite songs with the car windows rolled down.",
    "The quiet moment when you fell asleep leaning on my shoulder during the drive.",
    "Looking across the cafe table at your funny face and realizing you're my best friend.",
    "Walking hand-in-hand through historic stone arches pretending we were inside a movie.",
  ];

  const [currentMemory, setCurrentMemory] = useState<string | null>(null);
  const [hasRevealedSecret, setHasRevealedSecret] = useState<boolean>(false);

  const drawMemory = () => {
    triggerHeartBurst(0.5, 0.4);
    const randomIndex = Math.floor(Math.random() * memoriesJar.length);
    setCurrentMemory(memoriesJar[randomIndex]);
  };

  const handleSecretClick = () => {
    triggerGrandBirthdayCelebration();
    setHasRevealedSecret(true);
  };

  return (
    <section className="py-20 sm:py-28 bg-[#FFFDF9] relative paper-texture border-b border-blush-200/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <SectionHeader
          badge="Special Surprises"
          title="Interactive Keepsakes"
          subtitle="Little games, jars of memories, and a hidden secret."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* EXPERIENCE 1: A JAR FULL OF MEMORIES */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-blush-200 shadow-md text-center">
            <div className="w-16 h-16 rounded-full bg-blush-100 text-burgundy flex items-center justify-center mx-auto mb-4 border border-rose-vintage/40">
              <Wine className="w-8 h-8 text-burgundy" />
            </div>

            <h3 className="font-serif text-2xl font-bold text-burgundy mb-2">
              A Jar Full of Memories
            </h3>
            <p className="text-xs sm:text-sm text-espresso-muted mb-6 font-sans">
              Reach into our digital jar to draw out a random treasured moment.
            </p>

            <AnimatePresence mode="wait">
              {currentMemory ? (
                <motion.div
                  key={currentMemory}
                  initial={{ opacity: 0, scale: 0.85, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: -10 }}
                  className="p-5 bg-blush-50 rounded-2xl border border-blush-200 min-h-[100px] flex items-center justify-center mb-6"
                >
                  <p className="font-handwriting text-xl sm:text-2xl text-burgundy">
                    "{currentMemory}"
                  </p>
                </motion.div>
              ) : (
                <div className="p-5 bg-ivory-200/50 rounded-2xl border border-dashed border-blush-300 min-h-[100px] flex items-center justify-center mb-6">
                  <span className="text-xs font-serif italic text-espresso-muted">
                    Tap the button below to draw your first memory note!
                  </span>
                </div>
              )}
            </AnimatePresence>

            <button
              onClick={drawMemory}
              className="px-6 py-3 rounded-full bg-burgundy hover:bg-burgundy-light text-ivory-100 font-serif font-bold text-xs shadow-md transition-all flex items-center gap-2 mx-auto"
            >
              <Sparkles className="w-4 h-4 text-champagne" />
              <span>Draw A Memory Note</span>
            </button>
          </div>

          {/* EXPERIENCE 2: ONE LAST SURPRISE */}
          <div className="bg-[#FAF6ED] rounded-3xl p-6 sm:p-8 border border-[#E8DCC9] shadow-md text-center">
            <div className="w-16 h-16 rounded-full bg-burgundy text-champagne flex items-center justify-center mx-auto mb-4 border-2 border-champagne/40">
              <Gift className="w-8 h-8" />
            </div>

            <h3 className="font-serif text-2xl font-bold text-burgundy mb-2">
              One Last Surprise
            </h3>
            <p className="text-xs sm:text-sm text-espresso-muted mb-6 font-sans">
              There is one secret message waiting behind this button...
            </p>

            <AnimatePresence mode="wait">
              {hasRevealedSecret ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-5 bg-white rounded-2xl border border-champagne shadow-md mb-6"
                >
                  <div className="flex items-center justify-center gap-1.5 mb-2 text-champagne">
                    <Star className="w-4 h-4 fill-champagne" />
                    <span className="font-serif italic text-xs font-bold text-burgundy">
                      The Secret Promise
                    </span>
                    <Star className="w-4 h-4 fill-champagne" />
                  </div>
                  <p className="font-cormorant text-lg sm:text-xl text-espresso-soft leading-relaxed italic">
                    "Through every season of this life — through busy Mondays, lazy Sundays, wild adventures, and every birthday yet to come — my heart has found its permanent home in you."
                  </p>
                </motion.div>
              ) : (
                <div className="p-5 bg-white/70 rounded-2xl border border-dashed border-blush-300 min-h-[100px] flex items-center justify-center mb-6">
                  <span className="text-xs font-serif italic text-espresso-muted">
                    Click below when you're ready for the secret message.
                  </span>
                </div>
              )}
            </AnimatePresence>

            <button
              onClick={handleSecretClick}
              className="px-6 py-3 rounded-full bg-champagne hover:bg-champagne-dark text-espresso font-serif font-bold text-xs shadow-md transition-all flex items-center gap-2 mx-auto"
            >
              <Heart className="w-4 h-4 fill-espresso" />
              <span>{hasRevealedSecret ? "Re-trigger Surprise Fireworks" : "Unlock The Secret Surprise"}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
