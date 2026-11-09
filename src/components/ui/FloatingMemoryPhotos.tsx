import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Eye, X, RefreshCw } from 'lucide-react';
import { PhotoMemory } from '../../config/loveStory';
import { uniquePersonalPhotos, discoveredPhotos } from '../../generated/mediaManifest';
import { ShuffleBag } from '../../utils/shuffleBag';
import { LightboxModal } from './LightboxModal';

interface FloatingMemoryPhotosProps {
  onOpenLightbox?: (photo: PhotoMemory) => void;
}

export const FloatingMemoryPhotos: React.FC<FloatingMemoryPhotosProps> = ({ onOpenLightbox }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentFloatPhoto, setCurrentFloatPhoto] = useState<PhotoMemory | null>(null);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const allPhotos = uniquePersonalPhotos && uniquePersonalPhotos.length > 0 ? uniquePersonalPhotos : discoveredPhotos;

  const bagRef = useRef<ShuffleBag<PhotoMemory>>(
    new ShuffleBag(allPhotos, p => p.src)
  );

  // Rotate floating photo every 8.5 seconds
  useEffect(() => {
    // Initial draw
    setCurrentFloatPhoto(bagRef.current.draw());

    const interval = setInterval(() => {
      if (document.visibilityState === 'hidden') return;
      const next = bagRef.current.draw();
      if (next) setCurrentFloatPhoto(next);
    }, 8500);

    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    if (onOpenLightbox && currentFloatPhoto) {
      onOpenLightbox(currentFloatPhoto);
    } else if (currentFloatPhoto) {
      const idx = allPhotos.findIndex(p => p.id === currentFloatPhoto.id);
      setActiveLightboxIndex(idx >= 0 ? idx : 0);
    }
  };

  if (!isVisible || !currentFloatPhoto) return null;

  return (
    <>
      <div className="fixed bottom-24 left-4 z-30 pointer-events-auto hidden md:block">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentFloatPhoto.id}
            initial={{ opacity: 0, y: 25, scale: 0.85, rotate: -6 }}
            animate={{
              opacity: 1,
              y: [0, -6, 0],
              scale: 1,
              rotate: currentFloatPhoto.rotation || -3,
              transition: {
                y: { repeat: Infinity, duration: 4.5, ease: 'easeInOut' },
                opacity: { duration: 0.8 },
                scale: { duration: 0.8 },
              },
            }}
            exit={{ opacity: 0, y: -20, scale: 0.9, transition: { duration: 0.6 } }}
            className="relative group bg-[#FFFDF9] p-2 pb-3 rounded-lg shadow-xl border border-blush-200/80 cursor-pointer w-40 hover:w-44 transition-all duration-300"
            onClick={handleClick}
            title="Click to view full photo"
          >
            {/* Subtle Washi Tape Pin */}
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-12 h-3.5 bg-rose-vintage/40 backdrop-blur-sm -rotate-2 rounded-sm shadow-sm border-t border-white/50 pointer-events-none" />

            {/* Dismiss button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsVisible(false);
              }}
              className="absolute -top-2 -right-2 w-5 h-5 bg-burgundy text-ivory-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-rose-deep text-xs"
              aria-label="Dismiss floating memories"
              title="Hide floating memory"
            >
              <X className="w-3 h-3" />
            </button>

            {/* Image */}
            <div className="relative aspect-[4/5] bg-espresso-light/10 rounded overflow-hidden mb-1.5">
              <img
                src={currentFloatPhoto.src}
                alt={currentFloatPhoto.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-1.5">
                <span className="text-[10px] text-white font-sans flex items-center gap-1 font-medium bg-black/50 px-2 py-0.5 rounded-full backdrop-blur-xs">
                  <Eye className="w-2.5 h-2.5" /> View
                </span>
              </div>
            </div>

            {/* Caption */}
            <div className="px-1 text-center">
              <p className="text-[11px] font-serif font-bold text-burgundy truncate leading-tight">
                {currentFloatPhoto.title}
              </p>
              <p className="text-[9px] text-espresso-muted font-sans truncate">
                {currentFloatPhoto.location || currentFloatPhoto.category}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Standalone Lightbox Modal */}
      <LightboxModal
        photos={allPhotos}
        currentIndex={activeLightboxIndex}
        onClose={() => setActiveLightboxIndex(null)}
        onNavigate={(idx) => setActiveLightboxIndex(idx)}
      />
    </>
  );
};
