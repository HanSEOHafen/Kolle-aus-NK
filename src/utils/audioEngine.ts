// Web Audio API Synthesizer generating a 2008-era cinematic Boombap / Rizbo style beat
// Features: Minor Piano chords, orchestral brass stabs, vinyl crackle, acoustic punchy kick & snare

class BeatEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private bpm: number = 86;
  private currentStep: number = 0; // 0 to 15 (16th notes in a 4/4 bar)
  private currentBeat: number = 1; // 1, 2, 3, 4
  private timerId: number | null = null;
  private volume: number = 0.7;
  private masterGain: GainNode | null = null;
  private onBeatCallback: ((beat: number, step: number) => void) | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public setOnBeat(cb: (beat: number, step: number) => void) {
    this.onBeatCallback = cb;
  }

  public setBpm(newBpm: number) {
    this.bpm = Math.max(65, Math.min(115, newBpm));
  }

  public setVolume(newVol: number) {
    this.volume = Math.max(0, Math.min(1, newVol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public getBpm(): number {
    return this.bpm;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public start() {
    this.initContext();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.currentStep = 0;

    const schedule = () => {
      if (!this.isPlaying || !this.ctx) return;
      this.playStep(this.currentStep);
      
      const beat = Math.floor(this.currentStep / 4) + 1;
      this.currentBeat = beat;
      if (this.onBeatCallback) {
        this.onBeatCallback(beat, this.currentStep);
      }

      this.currentStep = (this.currentStep + 1) % 16;
      // Step duration in ms: 60000 / BPM / 4
      const stepDuration = (60000 / this.bpm) / 4;
      this.timerId = window.setTimeout(schedule, stepDuration);
    };

    schedule();
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    this.currentStep = 0;
  }

  private playStep(step: number) {
    if (!this.ctx || !this.masterGain) return;
    const time = this.ctx.currentTime;

    // Kick on steps 0, 6, 10
    if (step === 0 || step === 6 || step === 10) {
      this.playKick(time);
    }

    // Snare on beat 2 (step 4) and beat 4 (step 12) - THE CORE RAP PUNCH
    if (step === 4 || step === 12) {
      this.playSnare(time, step === 12 ? 1.0 : 0.85);
    }

    // Hi-hat on every second 16th note (step 0, 2, 4, 6, 8, 10, 12, 14) with shuffle
    if (step % 2 === 0) {
      this.playHiHat(time, step % 4 === 0 ? 0.4 : 0.25);
    }

    // Cinematic Piano chords on beat 1 (step 0) and beat 3 (step 8)
    if (step === 0) {
      // D minor / Low octave mafia chord [D2, A2, D3, F3]
      this.playPianoChord([73.42, 110.0, 146.83, 174.61], time, 1.2);
      this.playBrassStab(146.83, time);
    } else if (step === 8) {
      // Bb Major / G minor turnaround [Bb2, D3, F3, A3]
      this.playPianoChord([116.54, 146.83, 174.61, 220.0], time, 1.0);
    }
  }

  private playKick(time: number) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(140, time);
    osc.frequency.exponentialRampToValueAtTime(42, time + 0.12);

    gain.gain.setValueAtTime(0.9, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.28);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + 0.3);
  }

  private playSnare(time: number, power: number = 1.0) {
    if (!this.ctx || !this.masterGain) return;
    // Tone body
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(190, time);
    osc.frequency.exponentialRampToValueAtTime(80, time + 0.08);

    oscGain.gain.setValueAtTime(0.4 * power, time);
    oscGain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);

    osc.connect(oscGain);
    oscGain.connect(this.masterGain);
    osc.start(time);
    osc.stop(time + 0.16);

    // Noise snap
    const bufferSize = this.ctx.sampleRate * 0.2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.setValueAtTime(950, time);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.55 * power, time);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, time + 0.18);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.masterGain);

    noise.start(time);
    noise.stop(time + 0.2);
  }

  private playHiHat(time: number, vol: number) {
    if (!this.ctx || !this.masterGain) return;
    const bufferSize = this.ctx.sampleRate * 0.05;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(8500, time);
    filter.Q.setValueAtTime(3, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(vol, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.045);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(time);
    noise.stop(time + 0.05);
  }

  private playPianoChord(frequencies: number[], time: number, duration: number) {
    if (!this.ctx || !this.masterGain) return;
    frequencies.forEach((freq) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, time);

      gain.gain.setValueAtTime(0.18, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(time);
      osc.stop(time + duration);
    });
  }

  private playBrassStab(rootFreq: number, time: number) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(rootFreq, time);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(450, time);
    filter.frequency.exponentialRampToValueAtTime(2200, time + 0.08);
    filter.frequency.exponentialRampToValueAtTime(300, time + 0.6);

    gain.gain.setValueAtTime(0.22, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.7);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + 0.7);
  }
}

export const beatEngine = new BeatEngine();
