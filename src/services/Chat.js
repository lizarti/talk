import io from 'socket.io-client'
import { wsBaseUrl } from '../config'
import { EventEmitter } from '../utils/EventEmitter'
import Message from '../models/Message'
import Room from '../models/Room'
// import languagesJson from '../utils/languages.json'

// const synth = window.speechSynthesis

const EVENTS = {
  USER_CREATED: 'USER_CREATED',
  UPDATE_USER_IN_ROOMS: 'UPDATE_USER_IN_ROOMS',
  CREATE_ROOM: 'CREATE_ROOM',
  SEARCH_USER: 'SEARCH_USER',
  UPDATE_USER: 'UPDATE_USER',
  ROOM_CREATED: 'ROOM_CREATED',
  JOIN_ROOM: 'JOIN_ROOM',
  CLOSE_ROOM: 'CLOSE_ROOM',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  NEW_MESSAGE: 'NEW_MESSAGE',
  UPDATE_ROOM: 'UPDATE_ROOM',
  ROOM_UPDATED: 'ROOM_UPDATED'
}
export default class Chat extends EventEmitter {
  login (user) {
    this.chatSocket = io.connect(`${wsBaseUrl}`, {
      upgrade: false,
      path: '/socket.io/socket.io',
      // transports: ['websocket'],
      query: {
        username: user.username,
        color: user.color
      }
    })
    this.bindListeners()
  }

  startConversation (userId, config) {
    const data = {
      userId: userId,
      pattern: config.pattern
    }
    this.chatSocket.emit(EVENTS.CREATE_ROOM, data)
  }

  sendMessage (message) {
    this.chatSocket.emit(EVENTS.NEW_MESSAGE, message)
    console.log('MENSAGEM SAINDO', message)
  }

  searchForUser (userId) {
    this.chatSocket.emit(EVENTS.SEARCH_USER, userId)
  }

  updateUser (user) {
    this.chatSocket.emit(EVENTS.UPDATE_USER, user)
  }

  enterRoom (room) {
    this.chatSocket.emit(EVENTS.ENTER_ROOM, room)
  }

  updateRoom (room) {
    this.chatSocket.emit(EVENTS.UPDATE_ROOM, room)
  }

  bindListeners () {
    this.chatSocket.on(EVENTS.USER_CREATED, user => {
      this.emit(EVENTS.USER_CREATED, user)
    })
    this.chatSocket.on(EVENTS.ROOM_CREATED, room => {
      /* inicializa algumas coisas extras */
      room.messages = []
      room.unreadMessages = 0
      room.languages = {}
      this.emit(EVENTS.ROOM_CREATED, room)
    })
    this.chatSocket.on(EVENTS.NEW_MESSAGE, message => {
      message.room = new Room(message.room)
      this.emit(EVENTS.NEW_MESSAGE, new Message(message))
    })
    this.chatSocket.on(EVENTS.CLOSE_ROOM, roomId => {
      this.emit(EVENTS.CLOSE_ROOM, roomId)
    })
    this.chatSocket.on(EVENTS.SEARCH_USER, user => {
      this.emit(EVENTS.SEARCH_USER, user)
    })
    this.chatSocket.on(EVENTS.UPDATE_USER, user => {
      this.emit(EVENTS.UPDATE_USER, user)
    })
    this.chatSocket.on(EVENTS.UPDATE_USER_IN_ROOMS, user => {
      this.emit(EVENTS.UPDATE_USER_IN_ROOMS, user)
    })
    this.chatSocket.on(EVENTS.ROOM_UPDATED, room => {
      this.emit(EVENTS.ROOM_UPDATED, room)
    })
  }

  logout () {
    this.chatSocket.disconnect()
  }
}
