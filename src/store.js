import Vue from 'vue'
import Vuex from 'vuex'

/* TYPES */
const SET_USER = 'SET_USER'
const SET_ROOMS = 'SET_ROOMS'
const UPDATE_USER_IN_ROOMS = 'UPDATE_USER_IN_ROOMS'
const EXIT = 'EXIT'
const ADD_ROOM = 'ADD_ROOM'
const UPDATE_ROOM = 'UPDATE_ROOM'
const REMOVE_ROOM = 'REMOVE_ROOM'
const ACTIVATE_ROOM = 'ACTIVATE_ROOM'
const DEACTIVATE_ROOM = 'DEACTIVATE_ROOM'
const ADD_MESSAGE_TO_ROOM = 'ADD_MESSAGE_TO_ROOM'
const SET_LANGUAGE_TO_ROOM = 'SET_LANGUAGE_TO_ROOM'

const initialState = () => {
  return {
    user: null,
    rooms: [],
    activeRoom: null
  }
}

const mutations = {
  [SET_USER] (state, user) {
    state.user = user
    localStorage.setItem('user', JSON.stringify(user))
  },
  [UPDATE_USER_IN_ROOMS] (state, user) {
    state.rooms.forEach(room => {
      const otherParticipant = room.otherParticipant(state.user)
      if (otherParticipant) {
        Object.assign(otherParticipant, user)
      }
    })
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
  [UPDATE_ROOM] (state, room) {
    const existingRoom = state.rooms.find(r => r.id === room.id)
    console.log('existingRoom', existingRoom)
    console.log('room', room)
    existingRoom.pattern = room.pattern
    if (room.languages[state.user.id]) {
      existingRoom.languages[state.user.id] = room.languages[state.user.id]
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
  },
  [SET_LANGUAGE_TO_ROOM] (state, payload) {
    payload.room.languages[state.user.id] = payload.languages
  },
  [EXIT] (state) {
    Object.assign(state, initialState())
    localStorage.removeItem('user')
  }
}

const actions = {
  setUser ({ commit }, user) {
    commit(SET_USER, user)
  },
  updateUser ({ commit }, user) {
    commit(SET_USER, user)
  },
  setRooms ({ commit }, rooms) {
    commit(SET_ROOMS, rooms)
  },
  updateUserInRooms ({ commit }, user) {
    commit(UPDATE_USER_IN_ROOMS, user)
  },
  addRoom ({ commit }, room) {
    commit(ADD_ROOM, room)
  },
  updateRoom ({ commit }, room) {
    commit(UPDATE_ROOM, room)
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
