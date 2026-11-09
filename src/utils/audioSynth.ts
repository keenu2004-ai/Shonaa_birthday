/**
 * Generative Romantic Web Audio Ambient Soundscape
 * Provides a soothing, organic piano/harp music fallback
 * if external audio files fail to load or are missing.
 */

class RomanticSoundscape {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private intervalId: any = null;
  private gainNode: GainNode | null = null;
  private masterVolume: number = 0.4;

  // Pentatonic romantic notes in Hz (C major / A minor romantic chords: C, E, G, A, B, D)
  private frequencies: number[] = [
    261.63, // C4
    293.66, // D4
    329.63, // E4
    392.00, // G4
    440.00, // A4
    523.25, // C5
    587.33, // D5
    659.25, // E5
  ];

  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.gainNode = this.ctx.createGain();
        this.gainNode.gain.setValueAtTime(this.masterVolume, this.ctx.currentTime);
        this.gainNode.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(volume: number) {
    this.masterVolume = Math.max(0, Math.min(1, volume));
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(this.masterVolume, this.ctx.currentTime);
    }
  }

  public play() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;

    // Play a gentle note sequence every 1.8 seconds with reverberation
    this.playChord();
    this.intervalId = setInterval(() => {
      if (this.isPlaying) {
        this.playChord();
      }
    }, 2200);
  }

  public pause() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private playChord() {
    if (!this.ctx || !this.gainNode) return;

    // Pick 2 harmonious notes
    const note1 = this.frequencies[Math.floor(Math.random() * this.frequencies.length)];
    const note2 = this.frequencies[Math.floor(Math.random() * this.frequencies.length)];

    this.playTone(note1, 0, 3.5);
    this.playTone(note2, 0.4, 3.2);
  }

  private playTone(freq: number, delaySec: number, durationSec: number) {
    if (!this.ctx || !this.gainNode) return;

    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    osc.type = 'sine'; // Soft, warm sine tone
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime + delaySec);

    // Warm envelope: soft attack, gentle decay
    const startTime = this.ctx.currentTime + delaySec;
    noteGain.gain.setValueAtTime(0, startTime);
    noteGain.gain.linearRampToValueAtTime(0.18, startTime + 0.3); // Attack
    noteGain.gain.exponentialRampToValueAtTime(0.001, startTime + durationSec); // Decay

    osc.connect(noteGain);
    noteGain.connect(this.gainNode);

    osc.start(startTime);
    osc.stop(startTime + durationSec + 0.1);
  }

  public getStatus() {
    return this.isPlaying;
  }
}

export const soundscape = new RomanticSoundscape();

