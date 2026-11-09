/**
 * Generative Romantic Web Audio Ambient Soundscape — PERMANENTLY DISABLED
 * Per directive: All synthetic/ambient/oscillator sound generation is eliminated.
 * The application exclusively plays the real recorded soundtrack:
 * "Kaise Bataaoon — KK & Mithoon (3G)" via HTML5 Audio.
 */

class SilentSoundscape {
  public init(): void {
    // No-op: No Web Audio context or oscillators created
  }

  public setVolume(_volume: number): void {
    // No-op
  }

  public play(): void {
    // No-op: Pure silence, never generates synthetic tones
  }

  public pause(): void {
    // No-op
  }
}

export const soundscape = new SilentSoundscape();
