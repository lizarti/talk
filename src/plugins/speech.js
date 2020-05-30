import SpeechService from '../services/Speech'
const speech = new SpeechService()

export default function install (Vue) {
  Object.defineProperty(Vue.prototype, '$speech', {
    get () {
      return speech
    }
  })
}
