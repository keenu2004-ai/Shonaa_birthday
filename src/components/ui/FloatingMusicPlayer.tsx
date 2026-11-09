import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause, SkipForward, Music } from 'lucide-react';
import { MusicTrack } from '../../config/loveStory';

interface FloatingMusicPlayerProps {
  isPlaying: boolean;
  isMuted: boolean;
  currentTrack: MusicTrack;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  onNextTrack: () => void;
  isSynthFallback?: boolean;
}

export const FloatingMusicPlayer: React.FC<FloatingMusicPlayerProps> = ({
  isPlaying,
  isMuted,
  currentTrack,
  onTogglePlay,
  onToggleMute,
  onNextTrack,
  isSynthFallback,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center bg-[#FFFDF9]/95 backdrop-blur-md border border-[#E08798]/40 shadow-[0_8px_30px_rgba(42,30,34,0.15)] rounded-full p-1.5 transition-all duration-300"
      >
        {/* Disc / Icon Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
            isPlaying && !isMuted
              ? 'bg-burgundy text-champagne shadow-md animate-spin-slow'
              : 'bg-blush-100 text-burgundy'
          }`}
          title="Click to view soundtrack controls"
          aria-label="Soundtrack controls"
        >
          <Music className="w-4 h-4" />
          {isPlaying && !isMuted && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-vintage opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-burgundy"></span>
            </span>
          )}
        </button>

        {/* Quick Play/Pause button */}
        <button
          onClick={onTogglePlay}
          className="ml-2 w-9 h-9 rounded-full bg-blush-100/80 hover:bg-blush-200 text-burgundy flex items-center justify-center transition-colors"
          title={isPlaying ? "Pause music" : "Play music"}
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-burgundy ml-0.5" />}
        </button>

        {/* Quick Mute button */}
        <button
          onClick={onToggleMute}
          className="ml-1 w-9 h-9 rounded-full bg-blush-100/80 hover:bg-blush-200 text-burgundy flex items-center justify-center transition-colors"
          title={isMuted ? "Unmute" : "Mute"}
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-deep" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Expanded Details Pane */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="flex items-center pl-3 pr-2 overflow-hidden whitespace-nowrap border-l border-blush-200/60 ml-2"
            >
              <div className="flex flex-col mr-3 max-w-[140px] sm:max-w-[180px]">
                <span className="text-xs font-serif font-bold text-burgundy truncate">
                  {currentTrack.title}
                </span>
                <span className="text-[10px] text-espresso-muted truncate font-sans">
                  {isSynthFallback ? '✨ Generative Love Melody' : currentTrack.artist}
                </span>
              </div>

              <button
                onClick={onNextTrack}
                className="p-1.5 rounded-full hover:bg-blush-200 text-burgundy transition-colors"
                title="Next song"
                aria-label="Next song"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
