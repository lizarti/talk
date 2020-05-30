const speech = (store) => store.state.speechService

export default function install (Vue, { store }) {
  Object.defineProperty(Vue.prototype, '$speech', {
    get () {
      return speech(store)
    }
  })
}
