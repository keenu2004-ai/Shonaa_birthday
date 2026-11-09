import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, Film, AlertCircle } from 'lucide-react';
import { VideoMemory } from '../../config/loveStory';

interface VideoPlayerModalProps {
  video: VideoMemory | null;
  onClose: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ video, onClose }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <AnimatePresence>
      {video && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-espresso/90 backdrop-blur-md"
          />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
            aria-label="Close video player"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Cinema Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative z-10 w-full max-w-3xl bg-[#1A1215] rounded-2xl overflow-hidden shadow-2xl border border-rose-vintage/30 flex flex-col"
          >
            {/* Vintage Film Reel Top Header */}
            <div className="h-6 bg-[#2A1E22] flex items-center justify-between px-3 film-sprocket border-b border-white/10" />

            {/* Video Container */}
            <div className="relative aspect-video bg-black flex items-center justify-center">
              {!hasError ? (
                <video
                  ref={videoRef}
                  src={video.src}
                  autoPlay
                  playsInline
                  controls
                  onError={() => setHasError(true)}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-center p-8 max-w-md">
                  <div className="w-16 h-16 rounded-full bg-rose-vintage/20 text-rose-vintage flex items-center justify-center mx-auto mb-4 border border-rose-vintage/40">
                    <Film className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-ivory-100 mb-2">
                    {video.title}
                  </h4>
                  <p className="text-xs text-ivory-300 mb-4 leading-relaxed font-sans">
                    This video is ready for your personal MP4 clip! Simply place your file at:
                    <br />
                    <code className="text-champagne bg-black/40 px-2 py-0.5 rounded text-[11px] block mt-1">
                      {video.src}
                    </code>
                  </p>
                  <div className="flex items-center justify-center gap-1.5 text-xs text-rose-vintage">
                    <AlertCircle className="w-4 h-4" />
                    <span>Configurable in src/config/loveStory.ts</span>
                  </div>
                </div>
              )}
            </div>

            {/* Vintage Film Reel Bottom Footer */}
            <div className="h-6 bg-[#2A1E22] flex items-center justify-between px-3 film-sprocket border-t border-white/10" />

            {/* Video Meta Info */}
            <div className="p-4 sm:p-5 bg-[#251A1E] text-ivory-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-white/10">
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-ivory-100">
                  {video.title}
                </h3>
                <p className="text-xs text-ivory-300 font-sans mt-0.5">
                  {video.caption}
                </p>
              </div>

              {video.date && (
                <span className="text-xs font-serif italic text-champagne shrink-0">
                  {video.date}
                </span>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

