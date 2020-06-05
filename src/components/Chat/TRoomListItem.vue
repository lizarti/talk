<template>
  <div class="flex justify-start relative cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2" @click="$emit('select')" :class="{'bg-blue-100 hover:bg-blue-200': active}">
    <!-- <span class="bg-gray-400 h-2 w-2 m-2 rounded-full" :style="{'background-color': other_participant.color}"></span> -->
     <img
        class="h-6 w-6 rounded-full"
        :src="`https://api.adorable.io/avatars/24/${other_participant.username}@adorable.io.png`"
        :alt="$user.user.username"
      />
    <div class="pl-3">
      <p class="text-sm font-medium text-gray-800 uppercase" :style="{'color': other_participant.color }">{{ other_participant.username }}</p>
      <p class="text-xs text-gray-500 uppercase">{{ other_participant.input_language }}</p>
    </div>
    <span class="absolute right-0 mr-2 py-1 text-xs text-red-400 font-semibold" style="line-height: 0.9rem;">
      {{ unread_counter }}
    </span>
  </div>
</template>

<script>
export default {
  name: 't-room-list-item',
  props: ['room', 'active'],
  computed: {
    other_participant () {
      return (this.room && this.room.otherParticipant(this.$user.user().id)) || {}
    },
    unread_counter () {
      return (this.room && this.room.unreadMessages) || ''
    }
  }
}
</script>

<style>

</style>
