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

  // Initialize audio element
  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio();
      audio.preload = 'metadata';
      audio.loop = false;
      audioRef.current = audio;

      audio.addEventListener('ended', () => {
        // Auto play next track
        setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
      });

      audio.addEventListener('error', () => {
        console.info('Audio file not found, activating romantic ambient generative soundscape fallback.');
        setIsSynthFallback(true);
        if (isPlaying && !isMuted) {
          soundscape.play();
        }
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      soundscape.pause();
    };
  }, [tracks.length, isPlaying, isMuted]);

  // Handle track source update
  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.src = currentTrack.src;
      if (isPlaying && !isMuted && !isSynthFallback) {
        audioRef.current.play().catch(() => {
          setIsSynthFallback(true);
          soundscape.play();
        });
      }
    }
  }, [currentTrackIndex, currentTrack, isPlaying, isMuted, isSynthFallback]);

  // Handle mute toggling
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

  // Master start music function (invoked upon opening interaction)
  const startMusic = useCallback(() => {
    setHasInteracted(true);
    if (isMuted) return;

    setIsPlaying(true);
    if (audioRef.current && !isSynthFallback) {
      audioRef.current.play().catch(() => {
        setIsSynthFallback(true);
        soundscape.play();
      });
    } else {
      soundscape.play();
    }
  }, [isMuted, isSynthFallback]);

  // Toggle play / pause
  const togglePlay = useCallback(() => {
    setHasInteracted(true);
    if (isPlaying) {
      setIsPlaying(false);
      if (audioRef.current) audioRef.current.pause();
      soundscape.pause();
    } else {
      setIsPlaying(true);
      if (isSynthFallback) {
        soundscape.play();
      } else if (audioRef.current) {
        audioRef.current.play().catch(() => {
          setIsSynthFallback(true);
          soundscape.play();
        });
      }
    }
  }, [isPlaying, isSynthFallback]);

  // Toggle mute
  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  // Next track
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
