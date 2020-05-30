<template>
  <div class="flex justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2" @click="$emit('select')" :class="{'bg-blue-100 hover:bg-blue-200': active}">
    <!-- <span class="bg-gray-400 h-2 w-2 m-2 rounded-full" :style="{'background-color': other_participant.color}"></span> -->
     <img
        class="h-6 w-6 rounded-full"
        :src="`https://api.adorable.io/avatars/160/${other_participant.username}@adorable.io.png`"
        :alt="$user.user.username"
      />
    <div class="pl-3">
      <p class="text-sm font-medium text-gray-800 uppercase" :style="{'color': other_participant.color }">{{ other_participant.username }}</p>
      <p class="text-xs text-gray-500 uppercase">{{ other_participant.input_language }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 't-room-list-item',
  props: ['room', 'active'],
  computed: {
    other_participant () {
      return (this.room && this.room.participants && this.room.participants.find(p => {
        return p.id !== this.$user.user().id
      })) || {}
    }
  }
}
</script>

<style>

</style>
