import React from 'react';
import { Heart, ArrowUp, Sparkles } from 'lucide-react';
import { loveStoryConfig } from '../../config/loveStory';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-16 bg-[#251A1E] text-ivory-100 relative paper-texture overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Heart Monogram */}
        <div className="w-12 h-12 rounded-full bg-burgundy/80 text-champagne flex items-center justify-center mx-auto mb-6 border border-champagne/40">
          <Heart className="w-6 h-6 fill-champagne" />
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ivory-100 tracking-tight">
          {loveStoryConfig.names.websiteTitle}
        </h3>

        <p className="mt-3 font-handwriting text-2xl sm:text-3xl text-rose-vintage max-w-xl mx-auto">
          "Here's to you, to us, and to all the beautiful memories still waiting to happen."
        </p>

        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ivory-300 font-sans">
          <span>
            Crafted with all my heart by {loveStoryConfig.names.myName} for {loveStoryConfig.names.herName}
          </span>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-ivory-100 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

