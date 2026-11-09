import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Play, Pause, ChevronLeft, ChevronRight, Eye, Shuffle } from 'lucide-react';
import { loveStoryConfig, PhotoMemory } from '../config/loveStory';
import { discoveredPhotos, uniquePersonalPhotos } from '../generated/mediaManifest';
import { SectionHeader } from '../components/ui/SectionHeader';
import { PolaroidCard } from '../components/ui/PolaroidCard';
import { LightboxModal } from '../components/ui/LightboxModal';
import { ShuffleBag } from '../utils/shuffleBag';

export const PhotoUniverse: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  // All photos pool
  const allPhotos: PhotoMemory[] = useMemo(() => {
    if (discoveredPhotos && discoveredPhotos.length > 0) {
      return discoveredPhotos;
    }
    return loveStoryConfig.photos;
  }, []);

  // Unique photos pool for shuffle bag (81 unique photos)
  const uniquePhotos: PhotoMemory[] = useMemo(() => {
    if (uniquePersonalPhotos && uniquePersonalPhotos.length > 0) {
      return uniquePersonalPhotos;
    }
    return allPhotos;
  }, [allPhotos]);

  // Automatic Scrapbook Slideshow State
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [showcasePhoto, setShowcasePhoto] = useState<PhotoMemory>(() => uniquePhotos[0] || allPhotos[0]);
  const [photoCountShown, setPhotoCountShown] = useState<number>(1);

  const shuffleBagRef = useRef<ShuffleBag<PhotoMemory>>(
    new ShuffleBag(uniquePhotos, p => p.src)
  );

  // Draw next photo from shuffle bag
  const handleNextPhoto = () => {
    const next = shuffleBagRef.current.draw();
    if (next) {
      setShowcasePhoto(next);
      setPhotoCountShown(prev => prev + 1);
    }
  };

  // Draw previous photo (draws another random one for forward momentum)
  const handlePrevPhoto = () => {
    const next = shuffleBagRef.current.draw();
    if (next) setShowcasePhoto(next);
  };

  // Automatic slideshow timer (every 5.5 seconds)
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      if (document.visibilityState === 'hidden') return;
      handleNextPhoto();
    }, 5500);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const categories = useMemo(() => {
    const list = [
      { id: 'all', label: 'All Memories' },
      { id: 'favourite', label: 'Our Favourite Moments' },
      { id: 'happy-moments', label: 'Happy Moments' },
      { id: 'adventures', label: 'Adventures' },
      { id: 'vacations', label: 'Vacations' },
      { id: 'special-days', label: 'Special Days' },
      { id: 'her-photos', label: 'Just You' },
      { id: 'our-photos', label: 'Just Us' },
    ];
    if (allPhotos.some(p => p.category === 'birthday' || p.isBirthdayCelebration)) {
      list.push({ id: 'birthday', label: 'Birthday Special' });
    }
    return list;
  }, [allPhotos]);

  const filteredPhotos = selectedCategory === 'all'
    ? allPhotos
    : allPhotos.filter((p) => p.category === selectedCategory || (selectedCategory === 'birthday' && p.isBirthdayCelebration));

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-[#FFFDF9] relative paper-texture border-b border-blush-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Our Photo Universe"
          title="Scrapbook of Our Memories"
          subtitle="Every photograph tells a story of laughter, adventures, and quiet love."
        />

        {/* =========================================================================
            STYLE B: AUTOMATIC SCRAPBOOK LIVE CAROUSEL / SLIDESHOW
            ========================================================================= */}
        <div className="max-w-4xl mx-auto mb-20 bg-[#FAF6F0] rounded-2xl p-4 sm:p-8 shadow-xl border border-blush-200/80 relative overflow-hidden">
          {/* Subtle Vintage Stamps & Background Accents */}
          <div className="absolute top-3 right-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-[11px] font-mono bg-burgundy/10 text-burgundy font-semibold flex items-center gap-1.5 border border-burgundy/20">
              <Shuffle className="w-3 h-3 animate-spin-slow" />
              Continuous Random Memory
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center mt-2">
            {/* Featured Photo Frame with Crossfade Animation */}
            <div className="md:col-span-7 relative flex justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={showcasePhoto.id}
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.03, y: -15 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className="relative bg-white p-3 sm:p-4 pb-6 sm:pb-8 rounded-xl shadow-2xl border border-blush-200/60 cursor-pointer max-w-sm sm:max-w-md w-full"
                  onClick={() => {
                    const idx = allPhotos.findIndex(p => p.id === showcasePhoto.id);
                    setActivePhotoIndex(idx >= 0 ? idx : 0);
                  }}
                  title="Click to view in full resolution"
                >
                  {/* Washi Tape Pin Top */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-rose-vintage/40 backdrop-blur-sm -rotate-1 rounded-sm shadow-sm border-t border-white/60 pointer-events-none" />

                  <div className="aspect-[4/5] bg-espresso-light/10 rounded-lg overflow-hidden relative group">
                    <img
                      src={showcasePhoto.src}
                      alt={showcasePhoto.title}
                      loading="eager"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-3 py-1.5 rounded-full bg-black/60 text-white text-xs font-sans font-medium flex items-center gap-1.5 backdrop-blur-xs">
                        <Eye className="w-3.5 h-3.5" /> Fullscreen Lightbox
                      </span>
                    </div>
                  </div>

                  {/* Handwritten Polaroid Bottom */}
                  <div className="mt-3 text-center">
                    <p className="font-handwriting text-lg sm:text-xl text-burgundy font-bold truncate">
                      {showcasePhoto.title}
                    </p>
                    {showcasePhoto.date && (
                      <p className="text-xs font-serif italic text-espresso-muted">
                        {showcasePhoto.date}
                      </p>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Showcase Caption & Playback Controls */}
            <div className="md:col-span-5 flex flex-col justify-center space-y-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-rose-deep font-bold bg-rose-vintage/20 px-2.5 py-0.5 rounded-md">
                  {showcasePhoto.category.replace('-', ' ')}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-burgundy mt-2 leading-tight">
                  {showcasePhoto.title}
                </h3>
                {showcasePhoto.location && (
                  <p className="text-xs font-serif italic text-espresso-soft mt-1">
                    📍 {showcasePhoto.location}
                  </p>
                )}
                <p className="text-sm text-espresso-soft font-sans leading-relaxed mt-3">
                  {showcasePhoto.caption || "A precious memory from our universe, preserved forever."}
                </p>
              </div>

              {/* Progress & Auto-Play Controls */}
              <div className="pt-2 border-t border-blush-200/80">
                <div className="flex items-center justify-between text-xs text-espresso-muted font-mono mb-3">
                  <span>Shuffle Cycle: Active</span>
                  <span>{uniquePhotos.length} Unique Memories</span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Prev Button */}
                  <button
                    onClick={handlePrevPhoto}
                    className="p-2.5 rounded-full bg-white hover:bg-blush-100 text-burgundy border border-blush-200/80 shadow-sm transition-all"
                    title="Previous random memory"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {/* Auto-Play Toggle Button */}
                  <button
                    onClick={() => setIsAutoPlaying(prev => !prev)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-xs font-bold font-sans shadow-sm transition-all ${
                      isAutoPlaying
                        ? 'bg-burgundy text-champagne hover:bg-rose-deep'
                        : 'bg-white hover:bg-blush-100 text-burgundy border border-blush-200/80'
                    }`}
                  >
                    {isAutoPlaying ? (
                      <>
                        <Pause className="w-3.5 h-3.5" /> Pause Auto-Rotation
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-burgundy" /> Start Auto-Rotation
                      </>
                    )}
                  </button>

                  {/* Next Button */}
                  <button
                    onClick={handleNextPhoto}
                    className="p-2.5 rounded-full bg-white hover:bg-blush-100 text-burgundy border border-blush-200/80 shadow-sm transition-all"
                    title="Next random memory"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            STYLE C: PINTEREST-STYLE ANIMATED MEMORY WALL
            ========================================================================= */}
        <div className="text-center mb-8">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-burgundy">
            Browse All Photographs by Chapter
          </h3>
          <p className="text-sm text-espresso-muted max-w-lg mx-auto mt-1 font-sans">
            Filter our memories below or simply scroll through the scrapbook.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 sm:mb-16">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 font-sans ${
                selectedCategory === cat.id
                  ? 'bg-burgundy text-ivory-100 shadow-md scale-105'
                  : 'bg-blush-50 hover:bg-blush-100 text-espresso-soft border border-blush-200/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry / Scrapbook Photo Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 items-start"
        >
          <AnimatePresence>
            {filteredPhotos.map((photo, index) => {
              // Find index in global photo array for lightbox navigation
              const globalIndex = allPhotos.findIndex((p) => p.id === photo.id);

              return (
                <PolaroidCard
                  key={photo.id}
                  photo={photo}
                  index={index}
                  onClick={() => setActivePhotoIndex(globalIndex >= 0 ? globalIndex : index)}
                />
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredPhotos.length === 0 && (
          <div className="text-center py-12">
            <p className="font-serif italic text-espresso-muted">
              No photos added to this category yet.
            </p>
          </div>
        )}
      </div>

      {/* Lightbox Modal referencing allPhotos for complete navigation */}
      <LightboxModal
        photos={allPhotos}
        currentIndex={activePhotoIndex}
        onClose={() => setActivePhotoIndex(null)}
        onNavigate={(idx) => setActivePhotoIndex(idx)}
      />
    </section>
  );
};
