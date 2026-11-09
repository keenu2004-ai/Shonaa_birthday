import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronDown, Heart, Sparkles } from 'lucide-react';
import { loveStoryConfig } from '../config/loveStory';
import { SectionHeader } from '../components/ui/SectionHeader';

export const StoryTimeline: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="story" className="py-20 sm:py-28 bg-[#FFFDF9] relative paper-texture border-b border-blush-200/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <SectionHeader
          badge="Our Complete Journey"
          title="The Chapters of Us"
          subtitle="Every milestone, every turning point, and how two separate stories merged into one."
        />

        {/* Vertical Timeline Track */}
        <div className="relative border-l-2 border-blush-200 ml-4 sm:ml-32 md:ml-40 space-y-12">
          {loveStoryConfig.timeline.map((item, index) => {
            const isExpanded = expandedId === item.id;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative pl-6 sm:pl-10 group"
              >
                {/* Timeline Dot Node */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-rose-vintage group-hover:border-burgundy group-hover:scale-125 transition-all duration-300 shadow-sm" />

                {/* Milestone Date Tag (Desktop Left Side) */}
                <div className="hidden sm:block absolute -left-36 md:-left-44 top-1 w-28 md:w-36 text-right">
                  <span className="font-serif italic text-sm text-burgundy font-bold block">
                    {item.date}
                  </span>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-rose-vintage">
                    {item.tag}
                  </span>
                </div>

                {/* Mobile Date Tag */}
                <div className="sm:hidden mb-2">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-serif italic text-burgundy bg-blush-100 border border-blush-200">
                    {item.date} • {item.tag}
                  </span>
                </div>

                {/* Milestone Card */}
                <div
                  onClick={() => toggleExpand(item.id)}
                  className="bg-white rounded-2xl p-5 sm:p-7 border border-blush-200/80 shadow-[0_6px_20px_-4px_rgba(42,30,34,0.06)] hover:shadow-md transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-burgundy group-hover:text-burgundy-light transition-colors">
                      {item.title}
                    </h3>

                    <button
                      className={`p-1.5 rounded-full bg-blush-50 text-burgundy transition-transform duration-300 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                      aria-label="Expand milestone"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="mt-2 text-sm sm:text-base text-espresso-soft font-sans leading-relaxed">
                    {item.description}
                  </p>

                  {/* Expandable Media & Handwritten Note */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4 }}
                        className="overflow-hidden mt-4 pt-4 border-t border-blush-100"
                      >
                        {item.image && (
                          <div className="mb-4 rounded-xl overflow-hidden max-w-sm border-2 border-white shadow-md">
                            <img
                              src={item.image}
                              alt={item.title}
                              loading="lazy"
                              className="w-full h-48 object-cover"
                            />
                          </div>
                        )}

                        {item.note && (
                          <div className="p-3.5 bg-blush-50/80 rounded-lg border-l-2 border-champagne">
                            <p className="font-handwriting text-xl sm:text-2xl text-burgundy">
                              "{item.note}"
                            </p>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

