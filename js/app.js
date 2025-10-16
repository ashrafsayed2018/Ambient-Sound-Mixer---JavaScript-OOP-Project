import { sounds } from './soundData.js'
import { SoundManager } from './soundManager.js'
import { UI } from './ui.js'
class AmbientMixer {
  // Initialize dependencies and state
  constructor() {
    this.soundManager = new SoundManager(sounds)
    this.presetManager = null
    this.ui = new UI()
    this.timer = null
    this.currentSoundState = {}
    this.isInitialized = false
  }
  init() {
    try {
      // Initialize UI
      this.ui.init()

      // render the ui
      this.ui.renderSoundCards(sounds)
      // Load all sounds
      this.loadAllSounds()
      // Initialize sound manager
      this.isInitialized = true
    } catch (error) {
      console.error('Error during initialization:', error)
    }
  }

  // load all sounds
  loadAllSounds() {
    sounds.forEach((sound) => {
      const soundUrl = `audio/${sound.file}`
      const success = this.soundManager.loadSounds(sound.id, soundUrl)

      if (!success) {
        console.warn(`Failed to load sound: ${sound.id} from ${soundUrl}`)
      }
    })
  }
}

// initialize the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const app = new AmbientMixer()
  app.init()
})
