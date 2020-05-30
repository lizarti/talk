const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

const defaultConfig = {
  lang: 'pt-BR',
  continuous: true,
  maxAlternatives: 1,
  rate: 1
}

export default class Speech {
  constructor () {
    this.init()
  }

  init () {
    this.speechRecognition = new SpeechRecognition()
    this.synth = window.speechSynthesis
    this.recognizing = false
    this.config()
  }

  listen (onResult, onEnd, onError) {
    this.speechRecognition.start()
  }

  bindEvents (onResult, onEnd, onError) {
    this.speechRecognition.addEventListener('start', () => {
      this.recognizing = true
    })

    this.speechRecognition.addEventListener('speechend', event => {
      this.recognizing = false
    })

    this.speechRecognition.addEventListener('result', event => {
      let transcript = event.results[event.results.length - 1][0].transcript.trim()
      transcript = transcript.charAt(0).toUpperCase() + transcript.slice(1)
      onResult({
        event,
        transcript
      })
    })

    this.speechRecognition.addEventListener('end', event => {
      this.recognizing = false
      onEnd(event)
    })

    this.speechRecognition.addEventListener('error', event => {
      onError(event)
    })
  }

  speak (message) {
    this.speechRecognition.abort()
    const utterThis = new SpeechSynthesisUtterance(message.utterance)
    utterThis.rate = this.rate
    const receiver = Object.keys(message.room.languages).find(k => k !== message.senderId)
    const messageVoice = message.room.languages[receiver].output
    const voice = this.synth.getVoices().find(voice => voice.name === messageVoice.name)
    utterThis.voice = voice
    this.synth.speak(utterThis)
    setTimeout(() => {
      this.speechRecognition.start()
    }, 2000)
  }

  config (config) {
    this.speechRecognition.abort()
    this.speechRecognition.stop()
    const merged = Object.assign({}, defaultConfig, config)
    this.speechRecognition.lang = merged.lang
    this.speechRecognition.continuous = merged.continuous
    this.speechRecognition.maxAlternatives = merged.maxAlternatives
    this.rate = merged.rate
    setTimeout(() => {
      this.speechRecognition.start()
    }, 400)
  }
}
