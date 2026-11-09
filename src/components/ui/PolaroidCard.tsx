import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Heart } from 'lucide-react';
import { PhotoMemory } from '../../config/loveStory';

interface PolaroidCardProps {
  photo: PhotoMemory;
  onClick?: () => void;
  index?: number;
}

export const PolaroidCard: React.FC<PolaroidCardProps> = ({ photo, onClick, index = 0 }) => {
  const rotation = photo.rotation ?? ((index % 2 === 0 ? -1.5 : 1.5) * ((index % 3) + 1));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
      whileHover={{ y: -8, scale: 1.02, rotate: 0 }}
      onClick={onClick}
      style={{ rotate: `${rotation}deg` }}
      className="polaroid-frame relative p-3 sm:p-4 pb-6 sm:pb-8 rounded-sm bg-white cursor-pointer group transition-all duration-300"
    >
      {/* Subtle Washi Tape effect on random top corner */}
      <div 
        className="washi-tape -top-3 left-1/2 -translate-x-1/2 opacity-70 group-hover:opacity-100 transition-opacity" 
      />

      {/* Photo Frame Container */}
      <div className="relative aspect-[4/5] sm:aspect-square overflow-hidden rounded-sm bg-ivory-200">
        <img
          src={photo.src}
          alt={photo.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Soft film grain / vignette gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
          <span className="text-white text-xs flex items-center gap-1.5 font-medium tracking-wide">
            <Heart className="w-3.5 h-3.5 text-rose-vintage fill-rose-vintage animate-pulse" />
            Click to expand memory
          </span>
        </div>
      </div>

      {/* Handwritten Caption Section */}
      <div className="mt-3.5 sm:mt-4 px-1">
        <h3 className="font-handwriting text-xl sm:text-2xl text-burgundy tracking-tight leading-tight group-hover:text-burgundy-light transition-colors">
          {photo.title}
        </h3>
        
        {photo.caption && (
          <p className="mt-1 font-sans text-xs sm:text-sm text-espresso-muted leading-relaxed line-clamp-2">
            {photo.caption}
          </p>
        )}

        {/* Date & Location Meta Badges */}
        {(photo.date || photo.location) && (
          <div className="mt-2.5 pt-2 border-t border-blush-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-espresso-muted/80">
            {photo.date && (
              <span className="flex items-center gap-1 font-serif italic">
                <Calendar className="w-3 h-3 text-rose-vintage" />
                {photo.date}
              </span>
            )}
            {photo.location && (
              <span className="flex items-center gap-1 font-sans">
                <MapPin className="w-3 h-3 text-champagne" />
                {photo.location}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

