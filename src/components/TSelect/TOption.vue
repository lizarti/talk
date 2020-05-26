<template>
  <div @click="emitClick()" class="cursor-pointer w-full border-gray-100 border-b hover:bg-teal-100" :class="{'bg-teal-200': selected}">
    <div class="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100">
      <div class="w-full items-center flex">
        <div class="mx-2 -mt-1">{{ title }}
          <div v-if="subtitle" class="text-xs truncate w-full normal-case font-normal -mt-1 text-gray-500">{{ subtitle }}</div>
        </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    title: String,
    subtitle: String,
    selected: Boolean
  },
  methods: {
    emitClick () {
      this.$emit('click')
    }
  }
}
</script>

<style>

</style>
