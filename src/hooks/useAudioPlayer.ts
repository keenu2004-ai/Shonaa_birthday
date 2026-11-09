import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { loveStoryConfig, MusicTrack } from '../config/loveStory';
import { discoveredAudioTracks } from '../generated/mediaManifest';

export function useAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    return sessionStorage.getItem('universe_audio_muted') === 'true';
  });
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Central configuration playlist: Kaise Bataaoon as primary track
  const tracks: MusicTrack[] = useMemo(() => {
    if (loveStoryConfig.music?.tracks && loveStoryConfig.music.tracks.length > 0) {
      return loveStoryConfig.music.tracks;
    }
    if (discoveredAudioTracks && discoveredAudioTracks.length > 0) {
      return discoveredAudioTracks;
    }
    return [
      {
        id: 'kaise-bataaoon',
        title: 'Kaise Bataaoon',
        artist: 'KK & Mithoon (3G)',
        src: '/audio/background.mp3',
        type: 'background',
      },
    ];
  }, []);

  const currentTrack: MusicTrack = tracks[currentTrackIndex] || tracks[0];

  // 1. One-time initialization and event listener attachment
  useEffect(() => {
    const initialSrc = currentTrack?.src || '/audio/background.mp3';
    const audio = new Audio(initialSrc);
    audio.preload = 'metadata';
    audio.loop = false;
    audio.volume = loveStoryConfig.music?.defaultVolume ?? 0.6;
    audioRef.current = audio;

    const handleEnded = () => {
      // Auto-advance to next track on finish
      setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    };

    const handleError = () => {
      if (audio.src && audio.error) {
        console.warn('Audio playback notice:', audio.error.message);
      }
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.pause();
    };
  }, [tracks.length]);

  // 2. Track source update: ONLY reassigns src when currentTrack.src changes
  // Crucial: isPlaying is NOT in dependencies! Prevents restarting audio on play/pause toggle
  useEffect(() => {
    if (!audioRef.current || !currentTrack) return;

    audioRef.current.src = currentTrack.src;
    audioRef.current.currentTime = 0;

    if (isPlaying && !isMuted) {
      audioRef.current.play().catch((err) => {
        console.info('Audio play deferred:', err.message);
      });
    }
  }, [currentTrackIndex, currentTrack.src]);

  // 3. Handle Mute state change
  useEffect(() => {
    sessionStorage.setItem('universe_audio_muted', isMuted ? 'true' : 'false');
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // 4. Start music upon opening gateway interaction ("Open Your Little Universe, Shonaa ❤️")
  const startMusic = useCallback(() => {
    setHasInteracted(true);
    setIsPlaying(true);

    if (audioRef.current) {
      audioRef.current.muted = isMuted;
      audioRef.current.volume = loveStoryConfig.music?.defaultVolume ?? 0.6;
      if (!audioRef.current.src || !audioRef.current.src.includes(currentTrack.src)) {
        audioRef.current.src = currentTrack.src;
      }
      if (!isMuted) {
        audioRef.current.play().catch((err) => {
          console.info('Browser playback waiting for user interaction:', err.message);
        });
      }
    }
  }, [isMuted, currentTrack.src]);

  // 5. Toggle play / pause: Seamlessly resumes from current playhead without restarting
  const togglePlay = useCallback(() => {
    setHasInteracted(true);
    if (isPlaying) {
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    } else {
      setIsPlaying(true);
      if (isMuted) return;
      if (audioRef.current) {
        audioRef.current.play().catch((err) => {
          console.info('Playback toggle notice:', err.message);
        });
      }
    }
  }, [isPlaying, isMuted]);

  // 6. Toggle mute
  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  // 7. Next track
  const nextTrack = useCallback(() => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
  }, [tracks.length]);

  // 8. Birthday celebration track transition
  const playBirthdayTrack = useCallback(() => {
    const bdayIndex = tracks.findIndex((t) => t.type === 'birthday');
    if (bdayIndex !== -1) {
      setCurrentTrackIndex(bdayIndex);
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.src = tracks[bdayIndex].src;
        if (!isMuted) {
          audioRef.current.play().catch(() => {});
        }
      }
    }
  }, [tracks, isMuted]);

  return {
    isPlaying,
    isMuted,
    currentTrack,
    hasInteracted,
    isSynthFallback: false,
    startMusic,
    togglePlay,
    toggleMute,
    nextTrack,
    playBirthdayTrack,
  };
}
