import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Film, Play, Sparkles } from 'lucide-react';
import { loveStoryConfig, VideoMemory } from '../config/loveStory';
import { SectionHeader } from '../components/ui/SectionHeader';
import { VideoPlayerModal } from '../components/ui/VideoPlayerModal';

export const VideoMemories: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<VideoMemory | null>(null);

  return (
    <section id="videos" className="py-20 sm:py-28 bg-[#FAF6ED] relative paper-texture border-b border-blush-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader
          badge="Moving Memories"
          title="Some Memories Are Too Beautiful To Stay Still"
          subtitle="Real motion, genuine laughs, and the way your smile lights up the room."
        />

        {/* Film Reel Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {loveStoryConfig.videos.map((vid, idx) => (
            <motion.div
              key={vid.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              onClick={() => setSelectedVideo(vid)}
              className="group cursor-pointer bg-[#251A1E] rounded-xl overflow-hidden shadow-xl border border-white/10 hover:border-champagne transition-all duration-300"
            >
              {/* Film Sprocket Strip Top */}
              <div className="h-4 bg-[#1A1215] film-sprocket opacity-60 border-b border-white/10" />

              {/* Video Thumbnail Frame */}
              <div className="relative aspect-video bg-black overflow-hidden">
                <img
                  src={vid.thumbnail}
                  alt={vid.title}
                  loading="lazy"
                  className="w-full h-full object-cover opacity-85 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
                />

                {/* Central Play Badge */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 flex items-center justify-center transition-colors">
                  <div className="w-14 h-14 rounded-full bg-burgundy/90 text-champagne flex items-center justify-center shadow-lg group-hover:scale-115 transition-transform duration-300 border border-champagne/40">
                    <Play className="w-6 h-6 fill-champagne ml-0.5" />
                  </div>
                </div>

                {/* Duration Badge */}
                {vid.duration && (
                  <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/70 text-white text-[11px] font-mono">
                    {vid.duration}
                  </span>
                )}
              </div>

              {/* Film Sprocket Strip Bottom */}
              <div className="h-4 bg-[#1A1215] film-sprocket opacity-60 border-t border-white/10" />

              {/* Caption Card */}
              <div className="p-4 sm:p-5 text-ivory-100 bg-[#251A1E]">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-ivory-100 group-hover:text-champagne transition-colors">
                    {vid.title}
                  </h3>
                  {vid.date && (
                    <span className="text-xs font-serif italic text-rose-vintage shrink-0">
                      {vid.date}
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-ivory-300 font-sans leading-relaxed line-clamp-2">
                  {vid.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Player Modal */}
      <VideoPlayerModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </section>
  );
};

