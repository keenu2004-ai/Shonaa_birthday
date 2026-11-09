import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  alignment?: 'center' | 'left';
  highlightWord?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  subtitle,
  alignment = 'center',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7 }}
      className={`mb-12 sm:mb-16 ${alignment === 'center' ? 'text-center mx-auto' : 'text-left'} max-w-3xl`}
    >
      {badge && (
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-serif italic text-burgundy bg-blush-100 border border-blush-200/80 mb-3.5 ${alignment === 'center' ? 'mx-auto' : ''}`}>
          <Sparkles className="w-3 h-3 text-champagne" />
          <span>{badge}</span>
        </div>
      )}

      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-burgundy tracking-tight leading-tight">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-3.5 font-cormorant text-xl sm:text-2xl text-espresso-soft/85 italic leading-relaxed">
          "{subtitle}"
        </p>
      )}

      {/* Decorative Gold & Rose Divider */}
      <div className={`flex items-center gap-3 mt-4 ${alignment === 'center' ? 'justify-center' : 'justify-start'}`}>
        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-rose-vintage/60" />
        <Heart className="w-3.5 h-3.5 text-rose-vintage fill-rose-vintage/40" />
        <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-rose-vintage/60" />
      </div>
    </motion.div>
  );
};

