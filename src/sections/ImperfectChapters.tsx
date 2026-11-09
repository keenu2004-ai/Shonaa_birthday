import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Smile, Sparkles, Coffee } from 'lucide-react';
import { loveStoryConfig } from '../config/loveStory';
import { SectionHeader } from '../components/ui/SectionHeader';

export const ImperfectChapters: React.FC = () => {
  const { imperfectChapters } = loveStoryConfig;

  return (
    <section id="fights" className="py-20 sm:py-28 bg-[#FAF6ED] relative paper-texture border-b border-blush-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader
          badge="Imperfect & Beautiful"
          title={imperfectChapters.title}
          subtitle={imperfectChapters.subtitle}
        />

        {/* Fights / Silly Arguments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {imperfectChapters.fights.map((f, i) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E8DCC9] shadow-[0_8px_25px_-5px_rgba(42,30,34,0.08)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="p-2 rounded-full bg-blush-100 text-burgundy">
                    <Coffee className="w-4 h-4" />
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-burgundy">
                    {f.topic}
                  </h3>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-espresso-soft font-sans leading-relaxed">
                  <div>
                    <span className="font-semibold text-rose-vintage uppercase text-[10px] tracking-wider block">
                      The Disagreement:
                    </span>
                    <p className="mt-0.5 italic">{f.whatHappened}</p>
                  </div>

                  <div>
                    <span className="font-semibold text-rose-vintage uppercase text-[10px] tracking-wider block">
                      The Aftermath:
                    </span>
                    <p className="mt-0.5">{f.aftermath}</p>
                  </div>
                </div>
              </div>

              {/* The Verdict / Why I choose you */}
              <div className="mt-5 pt-4 border-t border-blush-100 bg-blush-50/60 -mx-6 sm:-mx-7 -mb-6 sm:-mb-7 p-4 sm:p-5 rounded-b-2xl">
                <span className="text-[10px] font-mono uppercase tracking-wider text-burgundy font-bold block mb-1">
                  The Sweet Verdict:
                </span>
                <p className="font-handwriting text-lg sm:text-xl text-burgundy leading-snug">
                  "{f.verdict}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Why I Choose You Every Single Day */}
        <div className="mt-16 max-w-3xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-blush-200 text-center shadow-md">
          <Heart className="w-8 h-8 text-rose-vintage fill-rose-vintage/30 mx-auto mb-3" />
          <h4 className="font-serif text-2xl font-bold text-burgundy mb-4">
            Things I Would Still Choose You For
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
            {imperfectChapters.reasonsToChooseYou.map((r, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-blush-50/70 border border-blush-100 text-xs sm:text-sm font-sans text-espresso"
              >
                <Sparkles className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
                <span>{r}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

