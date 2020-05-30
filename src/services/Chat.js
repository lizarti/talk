import io from 'socket.io-client'
import { wsBaseUrl } from '../config'
import { EventEmitter } from '../utils/EventEmitter'
import Message from '../models/Message'
import languagesJson from '../utils/languages.json'

const synth = window.speechSynthesis

const EVENTS = {
  CREATE_ROOM: 'CREATE_ROOM',
  ROOM_CREATED: 'ROOM_CREATED',
  JOIN_ROOM: 'JOIN_ROOM',
  NEW_MESSAGE: 'NEW_MESSAGE',
  CLOSE_ROOM: 'CLOSE_ROOM'
}
export default class Chat extends EventEmitter {
  login (user) {
    this.chatSocket = io.connect(`${wsBaseUrl}/chat`, {
      query: {
        id: user.id,
        username: user.username,
        color: user.color
      }
    })
    this.bindListeners()
  }

  startConversation (userId) {
    this.chatSocket.emit(EVENTS.CREATE_ROOM, userId)
  }

  sendMessage (message) {
    this.chatSocket.emit(EVENTS.NEW_MESSAGE, message)
  }

  bindListeners () {
    this.chatSocket.on(EVENTS.ROOM_CREATED, room => {
      /* inicializa algumas coisas extras */
      room.messages = []
      room.languages = {}
      room.participants.forEach(p => {
        room.languages[p.id] = {
          input: languagesJson.languages[0],
          output: synth.getVoices().map(v => {
            return {
              lang: v.lang,
              name: v.name
            }
          })[0]
        }
      })
      this.emit(EVENTS.ROOM_CREATED, room)
    })
    this.chatSocket.on(EVENTS.NEW_MESSAGE, message => {
      this.emit(EVENTS.NEW_MESSAGE, new Message(message))
    })
    this.chatSocket.on(EVENTS.CLOSE_ROOM, roomId => {
      this.emit(EVENTS.CLOSE_ROOM, roomId)
    })
  }

  logout () {
    this.chatSocket.disconnect()
  }
}
