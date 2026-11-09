import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Calendar, MapPin, Heart } from 'lucide-react';
import { PhotoMemory } from '../../config/loveStory';

interface LightboxModalProps {
  photos: PhotoMemory[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  photos,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  const isOpen = currentIndex !== null && currentIndex >= 0 && currentIndex < photos.length;
  const currentPhoto = isOpen ? photos[currentIndex!] : null;

  const handlePrev = useCallback(() => {
    if (currentIndex !== null) {
      const prev = (currentIndex - 1 + photos.length) % photos.length;
      onNavigate(prev);
    }
  }, [currentIndex, photos.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex !== null) {
      const next = (currentIndex + 1) % photos.length;
      onNavigate(next);
    }
  }, [currentIndex, photos.length, onNavigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext]);

  return (
    <AnimatePresence>
      {isOpen && currentPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-espresso/90 backdrop-blur-md"
          />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all duration-200"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all duration-200"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all duration-200"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Content Container */}
          <motion.div
            key={currentPhoto.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            className="relative z-10 max-w-4xl w-full max-h-[92vh] flex flex-col items-center justify-center"
          >
            {/* Image Frame */}
            <div className="relative rounded-lg overflow-hidden max-h-[72vh] shadow-2xl bg-black/40 border border-white/10">
              <img
                src={currentPhoto.src}
                alt={currentPhoto.title}
                className="max-h-[72vh] w-auto object-contain mx-auto"
              />
            </div>

            {/* Photo Metadata Card */}
            <div className="mt-4 w-full bg-ivory-100/95 backdrop-blur-md rounded-xl p-4 sm:p-5 shadow-lg border border-blush-200 text-center max-w-2xl">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Heart className="w-4 h-4 text-rose-vintage fill-rose-vintage" />
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-burgundy">
                  {currentPhoto.title}
                </h3>
              </div>

              {currentPhoto.caption && (
                <p className="font-sans text-xs sm:text-sm text-espresso-soft max-w-xl mx-auto leading-relaxed">
                  {currentPhoto.caption}
                </p>
              )}

              <div className="mt-2.5 pt-2 border-t border-blush-200/50 flex items-center justify-center gap-6 text-xs text-espresso-muted">
                {currentPhoto.date && (
                  <span className="flex items-center gap-1 font-serif italic">
                    <Calendar className="w-3.5 h-3.5 text-rose-vintage" />
                    {currentPhoto.date}
                  </span>
                )}
                {currentPhoto.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-champagne" />
                    {currentPhoto.location}
                  </span>
                )}
                <span className="font-mono text-[11px] text-espresso-muted/60">
                  {currentIndex! + 1} of {photos.length}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
