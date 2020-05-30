<template>
  <div class="w-full relative">
    <div class="flex h-full">
      <div class="w-full flex-1 overflow-y-auto p-2 text-gray-800 h-full">
        <div class="bg-white shadow-md rounded px-8 py-2 h-full flex flex-col">
          <div class="flex items-center justify-center w-full mb-2">

            <t-button icon class="text-gray-800 absolute left-0 ml-8" @click="closeRoom()">
              <template v-slot:prepend>
                <t-icon class="h-4 w-4 text-x1" name="close"></t-icon>
              </template>
            </t-button>

            <div class="inline-block flex">
              <div class="mr-4">
                <img
                  class="h-10 w-10 rounded-full mx-auto"
                  :src="`https://api.adorable.io/avatars/160/${other_user.username}@adorable.io.png`"
                  :alt="$user.user.username"
                />
              </div>

              <div class="flex-col items-center">
                <h4 class="tracking-widest text-lg title-font font-medium uppercase" :style="{'color': other_user.color }">{{ other_user.username }}</h4>
                <p class="text-xs text-gray-400 -m-1 text-center">{{ other_user.id }}</p>
              </div>
            </div>

            <t-button icon class="text-gray-800 absolute right-0 mr-8" @click="openConfig()">
              <template v-slot:prepend>
                <t-icon class="h-5 w-5 text-x1" name="cog"></t-icon>
              </template>
            </t-button>

          </div>
          <div class="flex-1 mt-8 b-4 overflow-y-auto pr-8 -mr-8">
            <template v-for="(message) in room.messages">
              <message :message="message" :key="message.timestamp" class="mb-4"></message>
            </template>
          </div>
          <div class="flex items-center">
            <div class="text-gray-500 flex items-center">
              <t-button icon class="mr-4" @click="init()">
                <t-icon class="h-4 w-4 text-x1" name="mic"></t-icon>
              </t-button>
            </div>
            <t-text-field ref="inputmessage" placeholder="Mensagem" v-model="message" @keyup.enter="sendTextMessage()"></t-text-field>
            <t-button class="ml-4" @click="sendTextMessage()">ENVIAR</t-button>
          </div>
          <t-room-config :room="room" @configure="onConfigure" :opened="roomConfigModal"></t-room-config>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Message from '../models/Message'
export default {
  name: 'conversation',
  props: ['room'],
  data: () => ({
    message: '',
    roomConfigModal: false,
    initialized: false
  }),
  methods: {
    init () {
      this.initialized = false
      this.$speech.speechRecognition.abort()
      setTimeout(() => {
        this.$speech.listen()
        this.initialized = true
      }, 400)
    },
    onResult (res) {
      if (res.transcript) {
        this.sendMessage(res.transcript)
      }
    },
    onError (res) {
      this.initialized = false
    },
    onEnd (res) {
      this.initialized = false
    },
    speak (message) {
      message.utterance = message.translated || message.text
      this.$speech.speak(message)
    },
    sendMessage (text) {
      const message = new Message()
      message.text = text
      message.senderId = this.$user.user().id
      message.room = this.room

      this.$chat.sendMessage(message)
    },
    sendTextMessage () {
      this.sendMessage(this.message)
      this.message = ''
    },
    closeRoom () {
      this.$store.dispatch('deactivateRoom')
    },
    openConfig () {
      this.roomConfigModal = true
    },
    onConfigure (languages) {
      this.$store.dispatch('setLanguageToRoom', {
        room: this.room,
        languages
      })
      this.roomConfigModal = false
      this.$speech.config({
        lang: languages.input.value
      })
    }
  },
  computed: {
    me_in_room () {
      return this.room.participants.find(p => p.id === this.$user.user().id)
    },
    other_user () {
      return this.room.participants.find(p => p.id !== this.$user.user().id)
    },
    messages () {
      return this.room.messages
    },
    is_valid_chat () {
      return this.$state.getters.activeRoom
    },
    is_my_language_configured () {
      return this.room.languages[this.$user.user().id].input && this.room.languages[this.$user.user().id].output
    },
    is_other_language_configured () {
      return this.room.languages[this.other_user.id].input && this.room.languages[this.other_user.id].output
    }
  },
  mounted () {
    this.init()
    this.$chat.on('MESSAGE_ADDED_TO_ROOM', message => {
      if (message.senderId !== this.$user.user().id) {
        this.speak(message)
      }
    })
    this.$speech.bindEvents(this.onResult, this.onEnd, this.onError)
    this.$refs.inputmessage.$el.querySelector('input').focus()
  },
  beforeDestroy () {
    this.$chat.off('MESSAGE_ADDED_TO_ROOM')
  },
  destroyed () {
    this.$speech.init()
  }
}
</script>

<style>

</style>
