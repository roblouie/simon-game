export class GamePiece {
  div;
  audioContext;
  oscillator;
  soundFrequency;
  pressCallback;

  constructor(div) {
    this.div = div;
    this.audioContext = new AudioContext();
    this.soundFrequency = div.dataset.frequency;

    this.div.addEventListener('mousedown', () => this.press());
    this.div.addEventListener('mouseup', () => this.release());
    this.div.addEventListener('mouseleave', () => this.release());
  }

  onPress(callback) {
    this.pressCallback = callback;
  }

  press() {
    if (this.pressCallback) {
      this.pressCallback(this.color);
    }

    this.playSound();
    this.div.classList.add('game-piece-active');
  }

  get color() {
    return this.div.style.backgroundColor;
  }

  release() {
    this.stop();
    this.div.classList.remove('game-piece-active');
  }

  playSound() {
    this.oscillator = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    this.oscillator.type = 'square';
    this.oscillator.connect(gain);
    this.oscillator.frequency.value = this.soundFrequency;
    gain.connect(this.audioContext.destination);
    this.oscillator.start(0);
  }

  stop() {
    if (this.oscillator) {
      this.oscillator.stop();
    }
  }
}