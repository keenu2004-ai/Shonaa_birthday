import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { PhotoMemory, VideoMemory } from '../config/loveStory';
import { uniquePersonalPhotos, discoveredPhotos, discoveredVideos } from '../generated/mediaManifest';
import { ShuffleBag } from '../utils/shuffleBag';

export interface UseMediaShuffleOptions {
  photoIntervalMs?: number; // Time between photo transitions (default: 6000ms)
  autoStart?: boolean; // Default: true
}

export function useMediaShuffle(options: UseMediaShuffleOptions = {}) {
  const { photoIntervalMs = 6000, autoStart = true } = options;

  // Master auto-playback toggles (enabled by default per specification)
  const [isPhotoAutoPlay, setIsPhotoAutoPlay] = useState<boolean>(() => {
    const saved = localStorage.getItem('shonaa_autoplay_photos');
    return saved !== null ? saved === 'true' : autoStart;
  });

  const [isVideoAutoPlay, setIsVideoAutoPlay] = useState<boolean>(() => {
    const saved = localStorage.getItem('shonaa_autoplay_videos');
    return saved !== null ? saved === 'true' : autoStart;
  });

  const [isPaused, setIsPaused] = useState<boolean>(false);

  // 1. Initialize Shuffle Bags
  // Use uniquePersonalPhotos (81 unique photos), fallback to discoveredPhotos
  const photosPool: PhotoMemory[] = useMemo(() => {
    if (uniquePersonalPhotos && uniquePersonalPhotos.length > 0) {
      return uniquePersonalPhotos;
    }
    return discoveredPhotos;
  }, []);

  const videosPool: VideoMemory[] = useMemo(() => {
    return discoveredVideos;
  }, []);

  // Shuffle bag instances (persistent across re-renders)
  const photoBagRef = useRef<ShuffleBag<PhotoMemory>>(
    new ShuffleBag(photosPool, p => p.src)
  );

  const videoBagRef = useRef<ShuffleBag<VideoMemory>>(
    new ShuffleBag(videosPool, v => v.src)
  );

  // Current active media state
  const [currentPhoto, setCurrentPhoto] = useState<PhotoMemory | null>(() => {
    return photoBagRef.current.draw() || photosPool[0] || null;
  });

  const [nextPreloadPhoto, setNextPreloadPhoto] = useState<PhotoMemory | null>(() => {
    return photoBagRef.current.peekNext();
  });

  const [currentVideo, setCurrentVideo] = useState<VideoMemory | null>(() => {
    return videoBagRef.current.draw() || videosPool[0] || null;
  });

  // History stacks for previous button support
  const photoHistoryRef = useRef<PhotoMemory[]>([]);
  const videoHistoryRef = useRef<VideoMemory[]>([]);

  // Advance photo to next in shuffle bag
  const nextPhoto = useCallback(() => {
    const next = photoBagRef.current.draw();
    if (next) {
      if (currentPhoto) {
        photoHistoryRef.current.push(currentPhoto);
        if (photoHistoryRef.current.length > 50) photoHistoryRef.current.shift();
      }
      setCurrentPhoto(next);
      setNextPreloadPhoto(photoBagRef.current.peekNext());
    }
  }, [currentPhoto]);

  // Go to previous photo
  const prevPhoto = useCallback(() => {
    if (photoHistoryRef.current.length > 0) {
      const prev = photoHistoryRef.current.pop()!;
      setCurrentPhoto(prev);
    }
  }, []);

  // Advance video to next in shuffle bag
  const nextVideo = useCallback(() => {
    const next = videoBagRef.current.draw();
    if (next) {
      if (currentVideo) {
        videoHistoryRef.current.push(currentVideo);
        if (videoHistoryRef.current.length > 10) videoHistoryRef.current.shift();
      }
      setCurrentVideo(next);
    }
  }, [currentVideo]);

  // Go to previous video
  const prevVideo = useCallback(() => {
    if (videoHistoryRef.current.length > 0) {
      const prev = videoHistoryRef.current.pop()!;
      setCurrentVideo(prev);
    }
  }, []);

  // Preload next image into browser cache
  useEffect(() => {
    if (nextPreloadPhoto?.src) {
      const img = new Image();
      img.src = nextPreloadPhoto.src;
    }
  }, [nextPreloadPhoto]);

  // Auto-rotate photos on interval when enabled and tab is active
  useEffect(() => {
    if (!isPhotoAutoPlay || isPaused) return;

    const interval = setInterval(() => {
      // Pause automatic rotation if tab is in the background
      if (document.visibilityState === 'hidden') return;
      nextPhoto();
    }, photoIntervalMs);

    return () => clearInterval(interval);
  }, [isPhotoAutoPlay, isPaused, photoIntervalMs, nextPhoto]);

  // Handle visibilitychange to pause animations when hidden
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'hidden') {
        setIsPaused(true);
      } else {
        setIsPaused(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // Toggle helpers
  const togglePhotoAutoPlay = useCallback(() => {
    setIsPhotoAutoPlay(prev => {
      const next = !prev;
      localStorage.setItem('shonaa_autoplay_photos', String(next));
      return next;
    });
  }, []);

  const toggleVideoAutoPlay = useCallback(() => {
    setIsVideoAutoPlay(prev => {
      const next = !prev;
      localStorage.setItem('shonaa_autoplay_videos', String(next));
      return next;
    });
  }, []);

  const togglePauseResume = useCallback(() => {
    setIsPaused(prev => !prev);
  }, []);

  return {
    // Current media
    currentPhoto,
    currentVideo,
    nextPreloadPhoto,

    // Pools & stats
    totalUniquePhotos: photoBagRef.current.getTotalUniqueCount(),
    totalVideos: videoBagRef.current.getTotalUniqueCount(),
    photosRemainingInCycle: photoBagRef.current.getRemainingInCycle(),
    photoCycleCount: photoBagRef.current.getCycleCount(),

    // Controls
    isPhotoAutoPlay,
    isVideoAutoPlay,
    isPaused,
    nextPhoto,
    prevPhoto,
    nextVideo,
    prevVideo,
    togglePhotoAutoPlay,
    toggleVideoAutoPlay,
    togglePauseResume,
    setCurrentVideo,
    setCurrentPhoto,
  };
}

