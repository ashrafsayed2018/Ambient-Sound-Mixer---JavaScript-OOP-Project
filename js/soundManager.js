export class SoundManager {
  constructor(sounds) {
    this.audioElements = new Map()
    this.isPlaying = false
    console.log('soundManger created ...')
  }

  // load sound files
  loadSounds(soundId, filePath) {
    try {
      const audio = new Audio()
      audio.src = filePath
      audio.loop = true
      audio.preload = 'metadata'

      // add sound to audioElements map
      this.audioElements.set(soundId, audio)
      console.log(`Loaded sound: ${soundId} from ${filePath}`)

      return true
    } catch (error) {
      console.error(`Error loading sound ${soundId}:`, error)
      return false
    }
  }

  // play a specific sound

  async playSound(soundId) {
    const audio = this.audioElements.get(soundId)
    if (audio) {
      try {
        await audio.play()
        this.isPlaying = true
        console.log(`Playing sound: ${soundId}`)
      } catch (error) {
        console.error(`Error playing sound ${soundId}:`, error)
        return false
      }
    }
  }

  // pause a specific sound
  pauseSound(soundId) {
    const audio = this.audioElements.get(soundId)
    if (audio && !audio.paused) {
      audio.pause()
      this.isPlaying = false
      console.log(`Paused sound: ${soundId}`)
    }
  }
  // set volume for a specific sound
  setVolume(soundId, volume) {
    const audio = this.audioElements.get(soundId)

    if (!audio) {
      console.warn(`Sound ${soundId} not found for volume adjustment`)
      return false
    }
    // convert volume from 0-100 to 0.0-1.0
    const volumeLevel = Math.min(Math.max(volume / 100, 0), 1)
    audio.volume = volumeLevel
    console.log(`Set volume for sound: ${soundId} to ${volumeLevel}`)
    return true
  }
}
