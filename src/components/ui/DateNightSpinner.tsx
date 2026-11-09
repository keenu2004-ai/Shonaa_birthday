import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Sparkles, Heart } from 'lucide-react';
import { triggerGoldenShimmer } from '../../utils/confettiUtils';

const DATE_IDEAS = [
  { title: "Cozy Pillow Fort & Movie Marathon", desc: "Blankets, fairy lights, hot popcorn, and watching our comfort movies all night." },
  { title: "Midnight Drive With 90s Songs", desc: "Windows down, cold breeze, hand on hand, singing at the top of our lungs." },
  { title: "Sunset Picnic & Sweet Pastries", desc: "A cozy blanket on the grass, watching golden hour fade with your favourite bakery treats." },
  { title: "Baking From Scratch (Mess Guaranteed)", desc: "Flour everywhere, arguing over frosting decorations, and eating batter off spoons." },
  { title: "Bookstore & Cafe Date", desc: "Browsing dusty book aisles, picking a surprise book for each other, and sipping coffee." },
  { title: "Stargazing Wrapped In One Blanket", desc: "Finding constellations, talking about the universe, and listening to the night." },
  { title: "Cooking A New Recipe Together", desc: "Italian homemade pasta or artisanal pizza, following a chef tutorial together." },
  { title: "Spontaneous Road Trip To Nowhere", desc: "Pick a direction on the map, no strict plans, just good playlists and exploring." },
];

export const DateNightSpinner: React.FC = () => {
  const [selectedIdea, setSelectedIdea] = useState<typeof DATE_IDEAS[0] | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const spinIdea = () => {
    setIsSpinning(true);
    triggerGoldenShimmer();

    let counter = 0;
    const interval = setInterval(() => {
      setSelectedIdea(DATE_IDEAS[Math.floor(Math.random() * DATE_IDEAS.length)]);
      counter++;
      if (counter > 8) {
        clearInterval(interval);
        setIsSpinning(false);
      }
    }, 80);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-blush-200 shadow-md text-center max-w-md mx-auto">
      <div className="w-14 h-14 rounded-full bg-blush-100 text-burgundy flex items-center justify-center mx-auto mb-4 border border-rose-vintage/40">
        <Compass className={`w-7 h-7 text-burgundy ${isSpinning ? 'animate-spin' : ''}`} />
      </div>

      <h3 className="font-serif text-xl sm:text-2xl font-bold text-burgundy mb-1">
        Our Next Date Idea
      </h3>
      <p className="text-xs text-espresso-muted mb-5 font-sans">
        Tap the spinner whenever you want the universe to choose our next adventure!
      </p>

      <AnimatePresence mode="wait">
        {selectedIdea ? (
          <motion.div
            key={selectedIdea.title}
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            className="p-4 bg-blush-50 rounded-2xl border border-blush-200 mb-5 text-center min-h-[90px] flex flex-col justify-center"
          >
            <h4 className="font-serif font-bold text-base text-burgundy">
              {selectedIdea.title}
            </h4>
            <p className="text-xs text-espresso-soft mt-1 font-sans leading-relaxed">
              {selectedIdea.desc}
            </p>
          </motion.div>
        ) : (
          <div className="p-4 bg-ivory-200/50 rounded-2xl border border-dashed border-blush-300 mb-5 min-h-[90px] flex items-center justify-center">
            <span className="text-xs font-serif italic text-espresso-muted">
              Ready to find our next date? Spin below!
            </span>
          </div>
        )}
      </AnimatePresence>

      <button
        onClick={spinIdea}
        disabled={isSpinning}
        className="px-6 py-2.5 rounded-full bg-burgundy hover:bg-burgundy-light text-ivory-100 font-serif font-bold text-xs shadow-md transition-all flex items-center gap-2 mx-auto disabled:opacity-50"
      >
        <Sparkles className="w-3.5 h-3.5 text-champagne" />
        <span>{isSpinning ? "Consulting The Stars..." : "Spin For A Date Idea"}</span>
      </button>
    </div>
  );
};

