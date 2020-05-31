import ChatService from '../services/Chat'
const chatService = new ChatService()

export default function install (Vue) {
  Object.defineProperty(Vue.prototype, '$chat', {
    get () {
      return chatService
    }
  })
}
