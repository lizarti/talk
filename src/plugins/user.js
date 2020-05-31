const user = (store) => ({
  user () {
    return store.state.user
  },
  isLoggedIn () {
    return !!store.state.user && !!store.state.user.id
  }
})

export default function install (Vue, { store }) {
  Object.defineProperty(Vue.prototype, '$user', {
    get () {
      return user(store)
    }
  })
}
