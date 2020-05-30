const chat = (store) => store.state.chatService

export default function install (Vue, { store }) {
  Object.defineProperty(Vue.prototype, '$chat', {
    get () {
      return chat(store)
    }
  })
}
