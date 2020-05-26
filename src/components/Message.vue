<template>
  <div class="flex-grow pl-4">
    <h2 class="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">{{ message.date }}</h2>
    <p class="leading-relaxed">{{ message.message }}</p>
  </div>
</template>

<script>
import Message from '../models/Message'
export default {
  name: 'message',
  props: {
    message: Message
  }
}
</script>

<style>

</style>
