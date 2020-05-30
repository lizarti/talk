<template>
  <div class="flex-grow">
    <div class="flex flex-col" :class="computed_classes">
      <span class="text-xs text-gray-600 mb-2 tracking-wider inline-block">{{ formatted_date }}</span>
      <span class="leading-relaxed text-white rounded py-2 px-3 inline-block" :style="{'background-color': is_mine ? this.$user.user().color : other_user.color }">{{ message.text_message }}</span>
    </div>
  </div>
</template>

<script>
import Message from '../../models/Message'
export default {
  name: 'message',
  props: {
    message: Message
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
        'items-start': !this.is_mine,
        'items-end': this.is_mine
      }
    },
    other_user () {
      return this.message.room.participants.find(p => p.id !== this.$user.user().id)
    },
    should_be_translated () {
      return !!this.message.translated
    },
    text_message () {
      return this.should_be_translated ? this.should_be_translated : this.message.text
    }
  }
}
</script>

<style>

</style>
