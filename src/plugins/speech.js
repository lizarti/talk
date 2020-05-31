import SpeechService from '../services/Speech'
const speechService = new SpeechService()

export default function install (Vue) {
  Object.defineProperty(Vue.prototype, '$speech', {
    get () {
      return speechService
    }
  })
}
