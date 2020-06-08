<template>
  <div class="flex flex-grow items-center ml-1" :class="computed_classes">
    <div v-if="!is_mine">
      <t-button icon class="text-gray-500 mt-6 mr-3" @click="speak()">
        <template v-slot:prepend>
          <t-icon class="h-4 w-4 text-x1" name="mic"></t-icon>
        </template>
      </t-button>
    </div>
    <div class="flex flex-col">
      <span class="text-xs text-gray-600 mb-1 inline-block">{{ formatted_date }}</span>
      <span class="leading-relaxed text-white rounded py-2 px-3 inline-block" :style="{'background-color': is_mine ? me_in_room.color : other_user.color }">{{ text_message }}</span>
    </div>
  </div>
</template>

<script>
import Message from '../../models/Message'
export default {
  name: 't-message',
  props: {
    message: Message
  },
  methods: {
    speak () {
      const message = Object.assign({}, this.message)
      message.utterance = this.text_message
      this.$speech.speak(message)
    }
  },
  computed: {
    formatted_date () {
      return new Date(this.message.timestamp).toLocaleString()
    },
    is_mine () {
      return this.message.senderId === this.$user.user().id
    },
    computed_classes () {
      return {
        'justify-start': !this.is_mine,
        'justify-end': this.is_mine
      }
    },
    me_in_room () {
      /* o eu da mensagem pode ter definições (de cores, por exemplo) diferentes do eu atual */
      return this.message.room.me(this.$user.user().id)
    },
    other_user () {
      return this.message.room.otherParticipant(this.$user.user().id)
    },
    should_be_translated () {
      return !!this.message.translated
    },
    text_message () {
      return this.is_mine ? this.message.text : (this.should_be_translated ? this.message.translated : this.message.text)
    }
  }
}
</script>

<style>

</style>
