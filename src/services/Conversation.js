const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

const defaultConfig = {
  lang: 'pt-BR',
  continuous: true,
  maxAlternatives: 1
}

export default class Conversation {
  constructor (config) {
    this.speechRecognition = new SpeechRecognition()
    this.synth = window.speechSynthesis
    this.recognizing = false
    this.config(config)
  }

  listen (onResult, onEnd, onError) {
    this.bindEvents(onResult, onEnd, onError)
    this.speechRecognition.start()
  }

  bindEvents (onResult, onEnd, onError) {
    this.speechRecognition.addEventListener('start', () => {
      console.log('Start listening...')
      this.recognizing = true
    })

    this.speechRecognition.addEventListener('speechend', event => {
      console.log('SPEECHEND')
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
      console.log('end')
      this.recognizing = false
      onEnd(event)
    })

    this.speechRecognition.addEventListener('error', event => {
      onError(event)
    })
  }

  speak (message) {
    const utterThis = new SpeechSynthesisUtterance(message.text)
    console.log('utterThis', message)
    const receiver = Object.keys(message.room.languages).find(k => k !== message.senderId)
    const messageVoice = message.room.languages[receiver].output
    const voice = this.synth.getVoices().find(voice => voice.name === messageVoice.name)
    console.log('voice', voice)
    utterThis.voice = voice
    this.synth.speak(utterThis)
  }

  config (config) {
    const merged = Object.assign(defaultConfig, config)
    this.speechRecognition.lang = merged.lang
    this.speechRecognition.continuous = merged.continuous
    this.speechRecognition.maxAlternatives = merged.maxAlternatives
  }

  setLanguage (language) {
    if (this.recognizing) {
      this.recognizing = false
      this.speechRecognition.stop()
    }
    this.speechRecognition.lang = language
    setTimeout(() => {
      this.speechRecognition.start()
    }, 400)
  }
}
