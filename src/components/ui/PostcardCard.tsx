import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Heart, Compass } from 'lucide-react';
import { TravelDestination } from '../../config/loveStory';

interface PostcardCardProps {
  destination: TravelDestination;
  onClickImage?: () => void;
  index?: number;
}

export const PostcardCard: React.FC<PostcardCardProps> = ({ destination, onClickImage, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="relative bg-[#FFFDF9] rounded-lg p-5 sm:p-7 border border-[#E8DCC9] shadow-[0_12px_35px_-8px_rgba(42,30,34,0.12)] overflow-hidden"
    >
      {/* Decorative Postcard Header with Stamp & Postal Mark */}
      <div className="flex items-start justify-between border-b border-blush-200/60 pb-4 mb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-serif italic text-burgundy bg-blush-100 border border-blush-200">
            <Compass className="w-3 h-3 text-rose-vintage" />
            Postcard No. 0{index + 1}
          </span>
          <h3 className="mt-1 font-serif text-2xl sm:text-3xl font-bold text-burgundy">
            {destination.placeName}
          </h3>
          <p className="flex items-center gap-1 text-xs text-espresso-muted font-medium mt-0.5">
            <MapPin className="w-3.5 h-3.5 text-champagne" />
            {destination.stateOrCountry}
          </p>
        </div>

        {/* Vintage Postage Stamp */}
        <div className="postcard-stamp w-16 h-20 sm:w-20 sm:h-24 p-1.5 flex flex-col items-center justify-between shadow-sm rotate-2">
          <div className="text-[9px] font-mono tracking-widest text-burgundy font-bold">
            POSTAGE
          </div>
          <Heart className="w-6 h-6 text-rose-vintage fill-rose-vintage/30" />
          <div className="text-[8px] font-mono text-center text-espresso-muted">
            {destination.date}
          </div>
        </div>
      </div>

      {/* Grid: Photo & Handwritten Note */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Photo Column */}
        <div className="md:col-span-5 relative group cursor-pointer" onClick={onClickImage}>
          <div className="relative aspect-[4/3] rounded-sm overflow-hidden border-4 border-white shadow-md bg-ivory-200">
            <img
              src={destination.image}
              alt={destination.placeName}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-espresso/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-xs font-serif italic bg-burgundy/80 px-3 py-1 rounded-full">
                Enlarge View
              </span>
            </div>
          </div>
        </div>

        {/* Postcard Message Column */}
        <div className="md:col-span-7 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-rose-vintage font-bold">
                What We Experienced
              </span>
              <p className="text-sm font-sans text-espresso-soft mt-0.5 leading-relaxed">
                {destination.whatWeDid}
              </p>
            </div>

            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-rose-vintage font-bold">
                Favourite Memory
              </span>
              <p className="text-sm font-sans text-espresso-soft mt-0.5 leading-relaxed">
                {destination.favouriteMemory}
              </p>
            </div>
          </div>

          {/* Personal Handwritten Postcard Note */}
          <div className="p-3.5 bg-blush-50/80 rounded-md border-l-2 border-rose-vintage">
            <span className="text-[10px] font-mono uppercase tracking-wider text-burgundy font-bold block mb-1">
              Personal Postscript
            </span>
            <p className="font-handwriting text-lg sm:text-xl text-burgundy leading-snug">
              "{destination.personalNote}"
            </p>
          </div>

          {/* Postmark footer */}
          <div className="flex items-center justify-between text-xs text-espresso-muted font-serif italic pt-2 border-t border-blush-100">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-rose-vintage" />
              {destination.date}
            </span>
            <span className="text-[10px] font-mono text-champagne-dark tracking-widest font-bold">
              {destination.stampText || "CONFIDENTIAL & TREASURED"}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

