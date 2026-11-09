import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { loveStoryConfig, PhotoMemory } from '../config/loveStory';
import { SectionHeader } from '../components/ui/SectionHeader';
import { PolaroidCard } from '../components/ui/PolaroidCard';
import { LightboxModal } from '../components/ui/LightboxModal';

export const PhotoUniverse: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Memories' },
    { id: 'favourite', label: 'Our Favourite Moments' },
    { id: 'happy-moments', label: 'Happy Moments' },
    { id: 'adventures', label: 'Adventures' },
    { id: 'vacations', label: 'Vacations' },
    { id: 'special-days', label: 'Special Days' },
    { id: 'her-photos', label: 'Just You' },
    { id: 'our-photos', label: 'Just Us' },
  ];

  const filteredPhotos = selectedCategory === 'all'
    ? loveStoryConfig.photos
    : loveStoryConfig.photos.filter((p) => p.category === selectedCategory);

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-[#FFFDF9] relative paper-texture border-b border-blush-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Our Photo Universe"
          title="Scrapbook of Our Favourite Memories"
          subtitle="A collection of fleeting seconds we captured to keep forever."
        />

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
              const globalIndex = loveStoryConfig.photos.findIndex((p) => p.id === photo.id);

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
              No photos added to this category yet. Add photos in src/config/loveStory.ts!
            </p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        photos={loveStoryConfig.photos}
        currentIndex={activePhotoIndex}
        onClose={() => setActivePhotoIndex(null)}
        onNavigate={(idx) => setActivePhotoIndex(idx)}
      />
    </section>
  );
};
