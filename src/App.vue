<template>
  <div id="app" class="flex flex-col md:flex-row">
    <template v-if="initialized">
      <template v-if="$user.isLoggedIn()">
        <t-sidebar class="flex-initial"></t-sidebar>
        <conversation class="flex-grow" :room="active_room" v-if="active_room"></conversation>
      </template>
      <template v-if="!$user.isLoggedIn()">
        <t-login></t-login>
      </template>
    </template>
    <t-notification></t-notification>
  </div>
</template>

<script>
import Room from './models/Room'
import Translate from './services/Translate'
import languagesJson from './utils/languages.json'

const translateService = new Translate()
const synth = window.speechSynthesis

export default {
  name: 'App',
  components: {
  },
  data: () => ({
    initialized: false,
    activeRoom: {}
  }),
  methods: {
    addMessage (message) {
      this.$store.dispatch('addMessageToRoom', message)
      this.$chat.emit('MESSAGE_ADDED_TO_ROOM', message)
    },
    tryToLogin () {
      const user = localStorage.getItem('user')
      if (user) {
        this.$chat.login(JSON.parse(user))
      } else {
        this.initialized = true
      }
    }
  },
  computed: {
    active_room () {
      return this.$store.getters.activeRoom
    }
  },
  created () {
    this.tryToLogin()
  },
  mounted () {
    /* bind chat events */
    this.$chat.on('USER_CREATED', user => {
      this.$store.dispatch('setUser', user)
      this.initialized = true
    })

    this.$chat.on('ROOM_CREATED', room => {
      room.languages[this.$user.user().id] = {
        input: languagesJson.languages[0],
        output: synth.getVoices().map(v => {
          return {
            lang: v.lang,
            name: v.name
          }
        })[0]
      }
      const roomModel = new Room(room)
      this.$store.dispatch('addRoom', roomModel)
    })
    this.$chat.on('NEW_MESSAGE', message => {
      console.log('MENSAGEM RECEBIDA', message)

      const room = this.$store.getters.rooms.find(r => r.id === message.room.id)

      if (!room) {
        this.$notification.error({ title: 'Sala não encontrada', content: 'A sala pode já não existir mais' })
        return
      }

      /* atualiza os idiomas da sala de acordo com a mensagem */
      const updated = {}
      updated[message.senderId] = {
        input: message.inputLanguage
      }
      updated[this.$user.user().id] = room.languages[this.$user.user().id]
      room.languages = updated

      /* sincroniza a sala com a sala da mensagem */
      message.room.languages[this.$user.user().id] = room.languages[this.$user.user().id]

      /* traduz */
      if (message.senderId !== this.$user.user().id) {
        const incomingLanguage = message.inputLanguage.value.substring(0, 2)
        const myLanguage = room.languages[this.$user.user().id].output.lang.substring(0, 2)

        if (incomingLanguage !== myLanguage) {
          const sentence = {
            text: message.text,
            from: incomingLanguage,
            to: myLanguage
          }
          translateService.translateSentence(sentence).then(res => {
            message.translated = res.text[0]
            this.addMessage(message)
          })
        } else {
          this.addMessage(message)
        }
      } else {
        this.addMessage(message)
      }
    })

    this.$chat.on('UPDATE_USER_IN_ROOMS', user => {
      console.log('UPDATE_USER_IN_ROOMS', user)
      this.$store.dispatch('updateUserInRooms', user)
    })

    this.$chat.on('UPDATE_USER', user => {
      this.$store.dispatch('updateUser', user)
    })

    this.$chat.on('CLOSE_ROOM', roomId => {
      const room = this.$store.state.rooms.find(r => r.id === roomId)
      this.$store.dispatch('removeRoom', room)
      if (!this.$store.getters.isActiveRoomValid) {
        this.$store.dispatch('deactivateRoom')
        this.$notification.error({
          content: 'O usuário desconectou.'
        })
      }
    })

    this.$chat.on('ROOM_UPDATED', room => {
      this.$store.dispatch('updateRoom', room)
      if (room.languages[this.$user.user().id]) {
        this.$speech.config({
          lang: room.languages[this.$user.user().id].input.value
        })
      }
    })
  },
  destroyed () {
    this.$chat.off('ROOM_CREATED')
    this.$chat.off('NEW_MESSAGE')
    this.$chat.off('CLOSE_ROOM')
  }
}
</script>

<style>
#app {
  height: 100vh;
}
</style>
