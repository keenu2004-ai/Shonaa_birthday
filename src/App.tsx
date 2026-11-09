import React, { useState } from 'react';
import { useAudioPlayer } from './hooks/useAudioPlayer';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { FloatingMusicPlayer } from './components/ui/FloatingMusicPlayer';
import { ParticleField } from './components/ui/ParticleField';
import { CursorTrail } from './components/ui/CursorTrail';
import { HeroOpening } from './sections/HeroOpening';
import { RelationshipCounter } from './sections/RelationshipCounter';
import { BirthdayCountdown } from './sections/BirthdayCountdown';
import { PhotoUniverse } from './sections/PhotoUniverse';
import { VideoMemories } from './sections/VideoMemories';
import { StoryTimeline } from './sections/StoryTimeline';
import { ImperfectChapters } from './sections/ImperfectChapters';
import { HappyMoments } from './sections/HappyMoments';
import { TravelDiary } from './sections/TravelDiary';
import { HerDreams } from './sections/HerDreams';
import { DigitalLetters } from './sections/DigitalLetters';
import { InteractiveSurprises } from './sections/InteractiveSurprises';
import { BirthdayCelebrationModal } from './sections/BirthdayCelebrationModal';

export const App: React.FC = () => {
  const [isUniverseOpen, setIsUniverseOpen] = useState<boolean>(() => {
    return sessionStorage.getItem('universe_unlocked') === 'true';
  });

  const [isCelebrationModalOpen, setIsCelebrationModalOpen] = useState<boolean>(false);

  const {
    isPlaying,
    isMuted,
    currentTrack,
    isSynthFallback,
    startMusic,
    togglePlay,
    toggleMute,
    nextTrack,
  } = useAudioPlayer();

  const handleOpenUniverse = () => {
    sessionStorage.setItem('universe_unlocked', 'true');
    setIsUniverseOpen(true);
    startMusic();
  };

  return (
    <div className="min-h-screen bg-ivory-100 text-espresso font-sans selection:bg-rose-vintage/30 selection:text-burgundy relative">
      {/* Floating Ambient Romantic Particles */}
      <ParticleField />
      <CursorTrail />

      {/* Persistent Floating Audio Soundtrack Pill */}
      {isUniverseOpen && (
        <FloatingMusicPlayer
          isPlaying={isPlaying}
          isMuted={isMuted}
          currentTrack={currentTrack}
          onTogglePlay={togglePlay}
          onToggleMute={toggleMute}
          onNextTrack={nextTrack}
          isSynthFallback={isSynthFallback}
        />
      )}

      {/* Opening Gateway Screen / Hero */}
      {!isUniverseOpen ? (
        <HeroOpening
          isOpen={false}
          onOpenUniverse={handleOpenUniverse}
        />
      ) : (
        <>
          {/* Top Sticky Navigation */}
          <Navbar onOpenBirthdayCelebration={() => setIsCelebrationModalOpen(true)} />

          <main>
            {/* Hero Opening Banner */}
            <HeroOpening
              isOpen={true}
              onOpenUniverse={handleOpenUniverse}
            />

            {/* Live Relationship Counter */}
            <RelationshipCounter />

            {/* Live Birthday Countdown */}
            <BirthdayCountdown
              onTriggerCelebration={() => setIsCelebrationModalOpen(true)}
            />

            {/* Photo Universe Gallery */}
            <PhotoUniverse />

            {/* Video Memories Cinema */}
            <VideoMemories />

            {/* Story Timeline */}
            <StoryTimeline />

            {/* Fights & Imperfect Chapters */}
            <ImperfectChapters />

            {/* Happy Moments */}
            <HappyMoments />

            {/* Travel Diary Postcards */}
            <TravelDiary />

            {/* Her Dreams & Aspirations */}
            <HerDreams />

            {/* Digital Letters & Envelopes */}
            <DigitalLetters />

            {/* Interactive Surprises & Jar */}
            <InteractiveSurprises />
          </main>

          {/* Footer */}
          <Footer />

          {/* Grand Birthday Fireworks & Photo Explosion Modal */}
          <BirthdayCelebrationModal
            isOpen={isCelebrationModalOpen}
            onClose={() => setIsCelebrationModalOpen(false)}
          />
        </>
      )}
    </div>
  );
};

export default App;

