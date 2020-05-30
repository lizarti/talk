import shortId from 'shortid'

const user = (store) => ({
  login (user) {
    const id = shortId.generate()
    user.id = id
    store.dispatch('setUser', user)
  },
  user () {
    return store.state.user
  },
  isLoggedIn () {
    return !!store.state.user && !!store.state.user.username
  }
})

export default function install (Vue, { store }) {
  Object.defineProperty(Vue.prototype, '$user', {
    get () {
      return user(store)
    }
  })
}
