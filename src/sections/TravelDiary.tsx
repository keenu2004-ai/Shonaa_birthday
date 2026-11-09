import React from 'react';
import { loveStoryConfig } from '../config/loveStory';
import { SectionHeader } from '../components/ui/SectionHeader';
import { PostcardCard } from '../components/ui/PostcardCard';

export const TravelDiary: React.FC = () => {
  const { travelDiary } = loveStoryConfig;

  return (
    <section id="travel" className="py-20 sm:py-28 bg-[#FAF6ED] relative paper-texture border-b border-blush-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader
          badge="Our Travel Diary"
          title={travelDiary.title}
          subtitle={travelDiary.subtitle}
        />

        {/* Vintage Postcards Stack */}
        <div className="space-y-10 sm:space-y-12 max-w-4xl mx-auto">
          {travelDiary.destinations.map((dest, index) => (
            <PostcardCard
              key={dest.id}
              destination={dest}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
