import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, X, Sparkles, Feather } from 'lucide-react';
import { triggerHeartBurst } from '../../utils/confettiUtils';

interface EnvelopeProps {
  title: string;
  subtitle?: string;
  triggerText: string;
  letterContent: string;
  signature?: string;
  photo?: string;
  badge?: string;
}

export const Envelope: React.FC<EnvelopeProps> = ({
  title,
  subtitle,
  triggerText,
  letterContent,
  signature,
  photo,
  badge,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    triggerHeartBurst(0.5, 0.5);
    setIsOpen(true);
  };

  return (
    <>
      {/* Closed Envelope Tile */}
      <motion.div
        whileHover={{ y: -6, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleOpen}
        className="relative bg-[#FAF6ED] rounded-xl p-6 sm:p-7 border border-[#E8DCC9] shadow-[0_10px_25px_-5px_rgba(42,30,34,0.08)] cursor-pointer overflow-hidden group transition-all duration-300"
      >
        {/* Envelope Top Flap Illusion */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-rose-vintage via-champagne to-rose-vintage opacity-75" />

        <div className="flex items-start justify-between">
          <div className="p-3 rounded-full bg-blush-100 text-burgundy group-hover:bg-burgundy group-hover:text-ivory-100 transition-colors duration-300">
            <Mail className="w-6 h-6" />
          </div>

          {/* Wax Seal Emblem */}
          <div className="w-10 h-10 rounded-full bg-burgundy flex items-center justify-center text-champagne shadow-md group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300 border-2 border-champagne/40">
            <Heart className="w-4 h-4 fill-champagne" />
          </div>
        </div>

        <div className="mt-5">
          {badge && (
            <span className="text-[11px] font-mono tracking-wider uppercase text-rose-vintage font-bold block mb-1">
              {badge}
            </span>
          )}
          <h4 className="font-serif text-xl sm:text-2xl font-bold text-burgundy group-hover:text-burgundy-light transition-colors">
            {triggerText}
          </h4>
          {subtitle && (
            <p className="text-xs sm:text-sm text-espresso-muted mt-1 font-serif italic">
              {subtitle}
            </p>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-blush-200/50 flex items-center justify-between text-xs font-medium text-burgundy">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-champagne" />
            Click to break seal & read
          </span>
          <Feather className="w-4 h-4 text-rose-vintage" />
        </div>
      </motion.div>

      {/* Modal / Unfolded Letter Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-espresso/60 backdrop-blur-sm"
            />

            {/* Unfolded Letter Paper */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl bg-[#FFFDF9] rounded-2xl shadow-2xl border border-[#E8DCC9] p-6 sm:p-10 z-10 max-h-[88vh] overflow-y-auto paper-texture"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-blush-100 text-burgundy hover:bg-burgundy hover:text-white transition-colors"
                aria-label="Close letter"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Letter Header */}
              <div className="border-b border-blush-200/60 pb-5 mb-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blush-100 mb-3 text-burgundy">
                  <Feather className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-burgundy">
                  {title}
                </h3>
                {subtitle && (
                  <p className="font-serif italic text-sm text-espresso-muted mt-1">
                    {subtitle}
                  </p>
                )}
              </div>

              {/* Attached Photo if any */}
              {photo && (
                <div className="mb-6 flex justify-center">
                  <div className="p-2 bg-white rounded shadow-md border border-blush-200 max-w-xs rotate-1">
                    <img
                      src={photo}
                      alt={title}
                      className="w-full h-44 object-cover rounded"
                    />
                  </div>
                </div>
              )}

              {/* Letter Body */}
              <div className="font-cormorant text-xl sm:text-2xl text-espresso-soft leading-relaxed space-y-4 whitespace-pre-line px-2 sm:px-6">
                {letterContent}
              </div>

              {/* Signature */}
              {signature && (
                <div className="mt-8 pt-6 border-t border-blush-200/50 text-right px-2 sm:px-6">
                  <p className="font-handwriting text-2xl sm:text-3xl text-burgundy">
                    {signature}
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
