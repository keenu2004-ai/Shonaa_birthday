import { useState, useEffect, useRef, useCallback } from 'react';
import { loveStoryConfig, MusicTrack } from '../config/loveStory';
import { soundscape } from '../utils/audioSynth';

export function useAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    return sessionStorage.getItem('universe_audio_muted') === 'true';
  });
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [isSynthFallback, setIsSynthFallback] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const tracks = loveStoryConfig.music.tracks;
  const currentTrack: MusicTrack = tracks[currentTrackIndex] || tracks[0];

  // 1. One-time initialization and event listener attachment
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'metadata';
    audio.loop = false;
    audioRef.current = audio;

    const handleEnded = () => {
      // Auto-advance to next track on finish
      setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    };

    const handleError = () => {
      console.info('Audio file not found, activating romantic ambient generative soundscape fallback.');
      setIsSynthFallback(true);
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.pause();
      soundscape.pause();
    };
  }, [tracks.length]);

  // 2. Track source update: ONLY reassigns src when currentTrack.src changes
  useEffect(() => {
    if (!audioRef.current || !currentTrack) return;

    audioRef.current.src = currentTrack.src;
    audioRef.current.currentTime = 0;

    if (isPlaying && !isMuted) {
      if (isSynthFallback) {
        soundscape.play();
      } else {
        audioRef.current.play().catch(() => {
          setIsSynthFallback(true);
          soundscape.play();
        });
      }
    }
  }, [currentTrackIndex, currentTrack.src]); // Notice: isPlaying is NOT in dependencies! Prevents restart on play/pause

  // 3. Handle Mute state change
  useEffect(() => {
    sessionStorage.setItem('universe_audio_muted', isMuted ? 'true' : 'false');
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
    if (isMuted) {
      soundscape.pause();
    } else if (isPlaying && isSynthFallback) {
      soundscape.play();
    }
  }, [isMuted, isPlaying, isSynthFallback]);

  // 4. Start music upon opening gateway interaction
  const startMusic = useCallback(() => {
    setHasInteracted(true);
    if (isMuted) return;

    setIsPlaying(true);
    if (isSynthFallback) {
      soundscape.play();
    } else if (audioRef.current) {
      audioRef.current.play().catch(() => {
        setIsSynthFallback(true);
        soundscape.play();
      });
    }
  }, [isMuted, isSynthFallback]);

  // 5. Toggle play / pause: Resumes seamlessly from current playhead without restarting
  const togglePlay = useCallback(() => {
    setHasInteracted(true);
    if (isPlaying) {
      setIsPlaying(false);
      if (audioRef.current) audioRef.current.pause();
      soundscape.pause();
    } else {
      setIsPlaying(true);
      if (isMuted) return;

      if (isSynthFallback) {
        soundscape.play();
      } else if (audioRef.current) {
        audioRef.current.play().catch(() => {
          setIsSynthFallback(true);
          soundscape.play();
        });
      }
    }
  }, [isPlaying, isMuted, isSynthFallback]);

  // 6. Toggle mute
  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  // 7. Next track
  const nextTrack = useCallback(() => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
  }, [tracks.length]);

  return {
    isPlaying,
    isMuted,
    currentTrack,
    hasInteracted,
    isSynthFallback,
    startMusic,
    togglePlay,
    toggleMute,
    nextTrack,
  };
}
