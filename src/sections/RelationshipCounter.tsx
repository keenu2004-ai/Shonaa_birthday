import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Clock, Calendar, Sparkles, MessageCircle, Compass, Camera } from 'lucide-react';
import { loveStoryConfig } from '../config/loveStory';
import { calculatePreciseDuration, DetailedDuration } from '../utils/dateArithmetic';
import { SectionHeader } from '../components/ui/SectionHeader';

const AnimatedDigit: React.FC<{ value: number; label: string }> = ({ value, label }) => {
  const formatted = String(value).padStart(2, '0');
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 sm:p-5 text-center border border-blush-200/80 shadow-[0_8px_20px_-4px_rgba(42,30,34,0.06)] relative overflow-hidden group hover:border-rose-vintage/60 transition-all duration-300">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-vintage via-champagne to-rose-vintage opacity-75 group-hover:opacity-100 transition-opacity" />
      <div className="h-10 sm:h-12 md:h-14 overflow-hidden relative flex items-center justify-center">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={formatted}
            initial={{ y: 22, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -22, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-burgundy tracking-tight block"
          >
            {formatted}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-[10px] sm:text-xs font-sans uppercase tracking-widest text-espresso-muted font-bold mt-1.5 block">
        {label}
      </span>
    </div>
  );
};

export const RelationshipCounter: React.FC = () => {
  const [duration, setDuration] = useState<DetailedDuration>(() =>
    calculatePreciseDuration(loveStoryConfig.dates.relationshipStart)
  );

  useEffect(() => {
    // Tick every second with exact calendar arithmetic
    const interval = setInterval(() => {
      setDuration(calculatePreciseDuration(loveStoryConfig.dates.relationshipStart));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Unofficial Beginning Duration (Month-level precision from March 2025)
  const now = new Date();
  const diffMonths = (now.getFullYear() - 2025) * 12 + (now.getMonth() - 2); // March is 0-indexed month 2
  const unofficialYears = Math.max(0, Math.floor(diffMonths / 12));
  const unofficialMonths = Math.max(0, diffMonths % 12);

  const timeUnits = [
    { label: 'Years', value: duration.years },
    { label: 'Months', value: duration.months },
    { label: 'Days', value: duration.days },
    { label: 'Hours', value: duration.hours },
    { label: 'Minutes', value: duration.minutes },
    { label: 'Seconds', value: duration.seconds },
  ];

  // Derive milestones dynamically from central timeline config
  const milestones = loveStoryConfig.timeline.slice(0, 4).map((tl, i) => {
    const icons = [Compass, MessageCircle, Heart, Camera];
    return {
      title: tl.title,
      date: tl.date,
      icon: icons[i % icons.length],
      desc: tl.note || tl.description.slice(0, 60) + '...',
    };
  });

  return (
    <section id="counter" className="py-20 sm:py-28 bg-[#FFFDF9] relative paper-texture border-b border-blush-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader
          badge="Our Relationship Journey"
          title="Counting Every Precious Moment Together"
          subtitle={loveStoryConfig.dates.counterCaption}
        />

        {/* SECTION 2: UNOFFICIAL BEGINNING vs OFFICIAL RELATIONSHIP */}
        <div className="max-w-4xl mx-auto mb-10">
          {/* Unofficial Beginning Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#FAF6ED] rounded-2xl p-5 sm:p-6 border border-[#E8DCC9] shadow-sm mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-blush-100 text-burgundy flex items-center justify-center shrink-0 border border-rose-vintage/40">
                <Sparkles className="w-6 h-6 text-champagne" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-rose-vintage font-bold block">
                  The Unofficial Beginning • March 2025
                </span>
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-burgundy">
                  Our story began in March 2025.
                </h4>
                <p className="font-handwriting text-lg sm:text-xl text-rose-deep italic">
                  "Before the official date, there was already an us."
                </p>
              </div>
            </div>
            <div className="sm:text-right bg-white/90 px-4 py-2.5 rounded-xl border border-blush-200 shrink-0 w-full sm:w-auto">
              <span className="text-[11px] text-espresso-muted block font-sans uppercase tracking-wider font-semibold">
                Sparks & Laughter
              </span>
              <span className="font-serif text-base sm:text-lg font-bold text-burgundy">
                {unofficialYears > 0 ? `${unofficialYears} Year & ` : ''}{unofficialMonths} Months
              </span>
            </div>
          </motion.div>

          {/* Official Relationship Live Counter Header */}
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blush-100 text-burgundy text-xs font-serif italic border border-blush-200">
              <Heart className="w-3.5 h-3.5 text-rose-vintage fill-rose-vintage" />
              <span>Official Relationship Anniversary</span>
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-burgundy mt-2">
              14 April 2025 — The day we officially became us.
            </h3>
          </div>
        </div>

        {/* Counter Cards Grid with Animated Digits */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 max-w-4xl mx-auto">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <AnimatedDigit value={unit.value} label={unit.label} />
            </motion.div>
          ))}
        </div>

        {/* Total days subtitle */}
        <div className="text-center mt-6">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blush-50 text-xs sm:text-sm font-serif italic text-burgundy border border-blush-200 shadow-sm">
            <Clock className="w-3.5 h-3.5 text-rose-vintage" />
            Together for over {duration.totalDays.toLocaleString()} continuous days of laughter
          </span>
        </div>

        {/* Key Milestones Bar */}
        <div className="mt-16 pt-12 border-t border-blush-200/60">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-burgundy text-center mb-8">
            The Milestones That Brought Us Here
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {milestones.map((m, idx) => {
              const Icon = m.icon;
              return (
                <motion.div
                  key={m.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white/80 rounded-xl p-5 border border-blush-200 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="w-9 h-9 rounded-full bg-blush-100 text-burgundy flex items-center justify-center mb-3">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-rose-vintage font-bold block mb-1">
                      {m.date}
                    </span>
                    <h4 className="font-serif font-bold text-base text-burgundy">
                      {m.title}
                    </h4>
                    <p className="text-xs text-espresso-muted font-sans mt-1.5 leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

