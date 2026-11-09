import React from 'react';
import { motion } from 'framer-motion';
import { Smile, Sparkles, MessageCircle, Heart } from 'lucide-react';
import { loveStoryConfig } from '../config/loveStory';
import { SectionHeader } from '../components/ui/SectionHeader';

export const HappyMoments: React.FC = () => {
  const { happyMoments } = loveStoryConfig;

  return (
    <section id="happy" className="py-20 sm:py-28 bg-[#FFFDF9] relative paper-texture border-b border-blush-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader
          badge="Pure Joy"
          title={happyMoments.title}
          subtitle={happyMoments.subtitle}
        />

        {/* Happy Moments Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {happyMoments.moments.map((m, idx) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="bg-white rounded-2xl p-6 border border-blush-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider text-burgundy bg-blush-100 font-bold mb-4">
                  {m.badge}
                </span>

                <h3 className="font-serif text-xl font-bold text-burgundy mb-2">
                  {m.title}
                </h3>

                <p className="text-xs sm:text-sm text-espresso-soft font-sans leading-relaxed">
                  {m.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-blush-100 flex items-center justify-between text-rose-vintage text-xs">
                <span className="font-handwriting text-lg text-burgundy">Unfiltered bliss</span>
                <Heart className="w-4 h-4 fill-rose-vintage/40" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
