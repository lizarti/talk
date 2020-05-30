import Vue from 'vue'
import Vuex from 'vuex'
import ChatService from './services/Chat'

/* TYPES */
const SET_USER = 'SET_USER'
const SET_ROOMS = 'SET_ROOMS'
const EXIT = 'EXIT'
const ADD_ROOM = 'ADD_ROOM'
const REMOVE_ROOM = 'REMOVE_ROOM'
const ACTIVATE_ROOM = 'ACTIVATE_ROOM'
const DEACTIVATE_ROOM = 'DEACTIVATE_ROOM'
const ADD_MESSAGE_TO_ROOM = 'ADD_MESSAGE_TO_ROOM'

const SET_LANGUAGE_TO_ROOM = 'SET_LANGUAGE_TO_ROOM'

const chatService = new ChatService()

const initialState = () => {
  return {
    user: null,
    rooms: [],
    chatService: chatService,
    activeRoom: null
  }
}

const mutations = {
  [SET_USER] (state, user) {
    state.user = user
    localStorage.setItem('user', JSON.stringify(user))
    state.chatService.login(user)
  },
  [EXIT] (state) {
    state.chatService.logout()
    Object.assign(state, initialState())
    localStorage.removeItem('user')
  },
  [SET_ROOMS] (state, rooms) {
    state.rooms = !state.drawer
  },
  [ADD_ROOM] (state, room) {
    const existingRoom = state.rooms.find(r => r.id === room.id)
    if (!existingRoom) {
      state.rooms.push(room)
    }
  },
  [REMOVE_ROOM] (state, room) {
    state.rooms = state.rooms.filter(r => r.id !== room.id)
  },
  [ACTIVATE_ROOM] (state, room) {
    state.activeRoom = room
    state.activeRoom.unreadMessages = 0
  },
  [DEACTIVATE_ROOM] (state) {
    state.activeRoom = null
  },
  [ADD_MESSAGE_TO_ROOM] (state, message) {
    const room = state.rooms.find(r => r.id === message.room.id)
    if (room !== state.activeRoom) {
      if (message.senderId !== state.user.id) {
        room.unreadMessages += 1
      }
    }
    room.messages.push(message)
    state.chatService.emit('MESSAGE_ADDED_TO_ROOM', message)
  },
  [SET_LANGUAGE_TO_ROOM] (state, payload) {
    payload.room.languages[state.user.id] = payload.languages
  }
}

const actions = {
  setUser ({ commit }, user) {
    commit(SET_USER, user)
  },
  setRooms ({ commit }, rooms) {
    commit(SET_ROOMS, rooms)
  },
  addRoom ({ commit }, room) {
    commit(ADD_ROOM, room)
  },
  removeRoom ({ commit }, room) {
    commit(REMOVE_ROOM, room)
  },
  activateRoom ({ commit }, room) {
    commit(ACTIVATE_ROOM, room)
  },
  deactivateRoom ({ commit }) {
    commit(DEACTIVATE_ROOM)
  },
  addMessageToRoom ({ commit }, message) {
    commit(ADD_MESSAGE_TO_ROOM, message)
  },
  setLanguageToRoom ({ commit }, payload) {
    commit(SET_LANGUAGE_TO_ROOM, payload)
  },
  exit ({ commit }) {
    commit(EXIT)
  }
}

const getters = {
  user (state) {
    return state.user
  },
  rooms (state) {
    return state.rooms
  },
  activeRoom (state) {
    return state.activeRoom
  },
  isActiveRoomValid (state) {
    return state.rooms.find(r => r === state.activeRoom)
  }
}

Vue.use(Vuex)

export default new Vuex.Store({
  state: initialState(),
  mutations,
  actions,
  getters
})
