import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Film, Play, Pause, Volume2, VolumeX, SkipForward, SkipBack, Sparkles, Shuffle } from 'lucide-react';
import { loveStoryConfig, VideoMemory } from '../config/loveStory';
import { discoveredVideos } from '../generated/mediaManifest';
import { SectionHeader } from '../components/ui/SectionHeader';
import { VideoPlayerModal } from '../components/ui/VideoPlayerModal';
import { ShuffleBag } from '../utils/shuffleBag';

export const VideoMemories: React.FC = () => {
  const [selectedModalVideo, setSelectedModalVideo] = useState<VideoMemory | null>(null);

  // All 5 videos from discovery
  const allVideos: VideoMemory[] = useMemo(() => {
    if (discoveredVideos && discoveredVideos.length > 0) {
      return discoveredVideos;
    }
    return loveStoryConfig.videos;
  }, []);

  // Shuffle Bag for automatic video sequencing
  const videoBagRef = useRef<ShuffleBag<VideoMemory>>(
    new ShuffleBag(allVideos, v => v.src)
  );

  // Active featured video in automatic cinema player
  const [activeVideo, setActiveVideo] = useState<VideoMemory>(() => allVideos[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true); // Muted by default to preserve Kaise Bataaoon soundtrack!
  const [isAutoAdvancing, setIsAutoAdvancing] = useState<boolean>(true);
  const [isInView, setIsInView] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Intersection Observer to detect when the video section is visible
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.25 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-play / pause based on visibility
  useEffect(() => {
    if (!videoRef.current) return;

    if (isInView && isPlaying) {
      videoRef.current.play().catch(() => {
        // Fallback for strict browser autoplay
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play().catch(() => {});
        }
      });
    } else {
      videoRef.current.pause();
    }
  }, [isInView, isPlaying, activeVideo.src]);

  // Next video in shuffle bag
  const handleNextVideo = useCallback(() => {
    const next = videoBagRef.current.draw();
    if (next) {
      setActiveVideo(next);
      setIsPlaying(true);
    }
  }, []);

  // Previous video
  const handlePrevVideo = useCallback(() => {
    const prev = videoBagRef.current.draw();
    if (prev) {
      setActiveVideo(prev);
      setIsPlaying(true);
    }
  }, []);

  // Handle video ended: automatically advance to next video!
  const handleVideoEnded = () => {
    if (isAutoAdvancing) {
      handleNextVideo();
    } else {
      setIsPlaying(false);
    }
  };

  // Toggle play/pause
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  // Toggle audio mute (keeping background music in mind)
  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  return (
    <section
      id="videos"
      ref={sectionRef}
      className="py-20 sm:py-28 bg-[#FAF6ED] relative paper-texture border-b border-blush-200/60"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader
          badge="Moving Memories"
          title="Some Memories Are Too Beautiful To Stay Still"
          subtitle="Real motion, genuine laughs, and the way your smile lights up the room."
        />

        {/* =========================================================================
            FEATURED AUTOMATIC VIDEO CINEMA THEATRE
            ========================================================================= */}
        <div className="max-w-4xl mx-auto mb-16 bg-[#1A1215] rounded-2xl overflow-hidden shadow-2xl border border-champagne/30">
          {/* Cinema Header Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-[#251A1E] border-b border-white/10 text-ivory-100">
            <div className="flex items-center gap-2">
              <Film className="w-4 h-4 text-champagne" />
              <span className="font-serif font-bold text-sm text-champagne">
                Automatic Cinema Experience
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono text-ivory-300 hidden sm:inline">
                {isAutoAdvancing ? '✨ Auto-Sequencing Active' : 'Manual Mode'}
              </span>
              <button
                onClick={() => setIsAutoAdvancing(prev => !prev)}
                className={`text-[10px] font-mono px-2.5 py-1 rounded-full border transition-colors ${
                  isAutoAdvancing
                    ? 'bg-rose-vintage/30 text-champagne border-champagne/40'
                    : 'bg-white/10 text-ivory-300 border-white/20'
                }`}
                title="Toggle automatic sequencing to next video on completion"
              >
                Auto-Next: {isAutoAdvancing ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>

          {/* Video Viewport Frame */}
          <div className="relative aspect-video bg-black overflow-hidden group">
            <video
              ref={videoRef}
              key={activeVideo.src}
              src={activeVideo.src}
              poster={activeVideo.thumbnail}
              playsInline
              muted={isMuted}
              autoPlay={isInView && isPlaying}
              onEnded={handleVideoEnded}
              preload="metadata"
              className="w-full h-full object-contain"
            />

            {/* Subtle Gradient Overlay on Hover for Controls */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4 sm:p-6 pointer-events-none">
              {/* Top Details */}
              <div className="flex items-center justify-between text-white pointer-events-auto">
                <span className="font-serif font-bold text-base sm:text-lg text-champagne drop-shadow">
                  {activeVideo.title}
                </span>
                {activeVideo.date && (
                  <span className="text-xs font-mono bg-black/60 px-2.5 py-1 rounded-full border border-white/20">
                    {activeVideo.date}
                  </span>
                )}
              </div>

              {/* Bottom Playback Control Bar */}
              <div className="flex items-center justify-between pointer-events-auto">
                <div className="flex items-center gap-2 sm:gap-3">
                  {/* Prev */}
                  <button
                    onClick={handlePrevVideo}
                    className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
                    title="Previous video"
                    aria-label="Previous video"
                  >
                    <SkipBack className="w-4 h-4" />
                  </button>

                  {/* Play / Pause */}
                  <button
                    onClick={togglePlay}
                    className="p-2.5 rounded-full bg-burgundy hover:bg-rose-deep text-champagne transition-all shadow-md"
                    title={isPlaying ? "Pause video" : "Play video"}
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-champagne ml-0.5" />}
                  </button>

                  {/* Next */}
                  <button
                    onClick={handleNextVideo}
                    className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
                    title="Next video"
                    aria-label="Next video"
                  >
                    <SkipForward className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {/* Sound Toggle Button with Helpful Label */}
                  <button
                    onClick={toggleMute}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 text-xs transition-colors"
                    title={isMuted ? "Unmute video sound" : "Mute video sound"}
                  >
                    {isMuted ? (
                      <>
                        <VolumeX className="w-3.5 h-3.5 text-rose-vintage" />
                        <span className="hidden sm:inline text-[11px]">Unmute Video</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5 text-champagne" />
                        <span className="hidden sm:inline text-[11px]">Mute Video</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Caption & Description Footer */}
          <div className="p-4 sm:p-6 bg-[#251A1E] text-ivory-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/10">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-champagne">
                {activeVideo.title}
              </h3>
              <p className="text-xs sm:text-sm text-ivory-300 font-sans mt-1 max-w-xl leading-relaxed">
                {activeVideo.caption}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[11px] font-mono text-ivory-400">
                Playing video in sequence • Next auto-advances
              </span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            COMPLETE FILM REEL SHOWCASE GRID (ALL 5 VIDEOS)
            ========================================================================= */}
        <div className="text-center mb-8">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-burgundy">
            Our Complete Moving Video Collection ({allVideos.length} Videos)
          </h3>
          <p className="text-xs sm:text-sm text-espresso-muted font-sans mt-1">
            Click any clip below to instantly load it into the cinema theatre.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {allVideos.map((vid, idx) => {
            const isCurrentlyPlaying = activeVideo.src === vid.src;

            return (
              <motion.div
                key={vid.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => {
                  setActiveVideo(vid);
                  setIsPlaying(true);
                }}
                className={`group cursor-pointer rounded-xl overflow-hidden shadow-xl transition-all duration-300 border ${
                  isCurrentlyPlaying
                    ? 'bg-[#2A1E24] border-champagne shadow-[0_0_20px_rgba(224,159,62,0.3)] scale-[1.02]'
                    : 'bg-[#251A1E] border-white/10 hover:border-champagne/60 hover:-translate-y-1'
                }`}
              >
                {/* Film Sprocket Strip Top */}
                <div className="h-3.5 bg-[#1A1215] film-sprocket opacity-60 border-b border-white/10" />

                {/* Video Thumbnail Frame */}
                <div className="relative aspect-video bg-black overflow-hidden">
                  <img
                    src={vid.thumbnail}
                    alt={vid.title}
                    loading="lazy"
                    className="w-full h-full object-cover opacity-85 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
                  />

                  {/* Central Play / Now Playing Badge */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 flex items-center justify-center transition-colors">
                    {isCurrentlyPlaying ? (
                      <span className="px-3 py-1 rounded-full bg-champagne text-burgundy text-xs font-bold font-mono shadow-lg flex items-center gap-1.5 animate-pulse">
                        <Play className="w-3 h-3 fill-burgundy" /> Now in Theatre
                      </span>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-burgundy/90 text-champagne flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 border border-champagne/40">
                        <Play className="w-5 h-5 fill-champagne ml-0.5" />
                      </div>
                    )}
                  </div>

                  {/* Duration Badge */}
                  {vid.duration && (
                    <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-mono">
                      {vid.duration}
                    </span>
                  )}
                </div>

                {/* Film Sprocket Strip Bottom */}
                <div className="h-3.5 bg-[#1A1215] film-sprocket opacity-60 border-t border-white/10" />

                {/* Caption Card */}
                <div className="p-4 text-ivory-100">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="font-serif text-base font-bold text-ivory-100 group-hover:text-champagne transition-colors truncate">
                      {vid.title}
                    </h4>
                    {vid.date && (
                      <span className="text-[11px] font-serif italic text-rose-vintage shrink-0">
                        {vid.date}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-ivory-300 font-sans leading-relaxed line-clamp-2">
                    {vid.caption}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Video Player Modal (for full-screen zoom if requested) */}
      <VideoPlayerModal
        video={selectedModalVideo}
        onClose={() => setSelectedModalVideo(null)}
      />
    </section>
  );
};
