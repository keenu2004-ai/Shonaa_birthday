import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Sparkles, MapPin, Briefcase, BookOpen, Heart } from 'lucide-react';
import { loveStoryConfig, BucketListItem } from '../config/loveStory';
import { SectionHeader } from '../components/ui/SectionHeader';
import { triggerHeartBurst } from '../utils/confettiUtils';

export const HerDreams: React.FC = () => {
  const { dreams } = loveStoryConfig;
  const [items, setItems] = useState<BucketListItem[]>(dreams.bucketList);

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextState = !item.completed;
          if (nextState) {
            triggerHeartBurst(0.5, 0.5);
          }
          return { ...item, completed: nextState };
        }
        return item;
      })
    );
  };

  const completedCount = items.filter((i) => i.completed).length;
  const progressPercent = Math.round((completedCount / items.length) * 100);

  return (
    <section id="dreams" className="py-20 sm:py-28 bg-[#FFFDF9] relative paper-texture border-b border-blush-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader
          badge="Her Dreams & Future"
          title={dreams.title}
          subtitle={dreams.subtitle}
        />

        {/* 4 Pillars of Aspirations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {dreams.aspirations.map((asp, idx) => (
            <motion.div
              key={asp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-blush-200 shadow-sm hover:shadow-md transition-all text-center flex flex-col items-center"
            >
              <div className="w-12 h-12 rounded-full bg-blush-100 text-burgundy flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-champagne" />
              </div>
              <h3 className="font-serif text-lg font-bold text-burgundy mb-2">
                {asp.title}
              </h3>
              <p className="text-xs sm:text-sm text-espresso-soft font-sans leading-relaxed">
                {asp.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Interactive Bucket List Card */}
        <div className="bg-[#FAF6ED] rounded-3xl p-6 sm:p-10 border border-[#E8DCC9] shadow-md max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-blush-200 pb-6 mb-6">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-burgundy">
                Our Adventures & Bucket List
              </h3>
              <p className="text-xs sm:text-sm text-espresso-muted font-serif italic mt-1">
                Click any goal to mark completed moments as we conquer them together!
              </p>
            </div>

            {/* Progress pill */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-xs font-mono uppercase font-bold text-burgundy">
                  Progress
                </span>
                <span className="text-xs font-mono text-espresso-muted block">
                  {completedCount} / {items.length} Done ({progressPercent}%)
                </span>
              </div>
              <div className="w-16 h-2 bg-blush-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-burgundy rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Bucket list items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {items.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-start gap-3 select-none ${
                  item.completed
                    ? 'bg-blush-100/70 border-rose-vintage/40 text-burgundy line-through'
                    : 'bg-white border-blush-200/80 text-espresso hover:border-burgundy/40'
                }`}
              >
                <button
                  className="mt-0.5 shrink-0 focus:outline-none"
                  aria-label={item.completed ? "Mark incomplete" : "Mark complete"}
                >
                  {item.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-burgundy fill-burgundy/20" />
                  ) : (
                    <Circle className="w-5 h-5 text-espresso-muted/50" />
                  )}
                </button>
                <div className="flex-1">
                  <span className="text-xs sm:text-sm font-sans font-medium block">
                    {item.text}
                  </span>
                  {item.notes && (
                    <span className="text-[11px] font-serif italic text-rose-deep block mt-0.5">
                      ✓ {item.notes}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Dream Destinations Badges */}
          <div className="mt-10 pt-6 border-t border-blush-200">
            <h4 className="font-serif text-lg font-bold text-burgundy mb-4 text-center">
              Dream Destinations On Her Radar
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {dreams.dreamDestinations.map((d, i) => (
                <div
                  key={i}
                  className="p-3 bg-white rounded-xl border border-blush-200 text-center"
                >
                  <MapPin className="w-4 h-4 text-champagne mx-auto mb-1" />
                  <span className="font-serif font-bold text-sm text-burgundy block">
                    {d.name}
                  </span>
                  <span className="text-[11px] text-espresso-muted font-sans block mt-0.5">
                    {d.country}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
