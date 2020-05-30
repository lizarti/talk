<template>
  <div class="px-4 py-2 text-white rounded my-4" :class="type_classes">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 't-alert',
  props: {
    type: {
      type: String,
      required: false,
      validator: val => {
        return ['info', 'warn', 'error', 'success']
      }
    }
  },
  computed: {
    type_classes () {
      if (!this.type) {
        return {
          'bg-gray-400': true
        }
      }
      return {
        'bg-red-500': this.type === 'error',
        'bg-green-400': this.type === 'success',
        'bg-blue-400': this.type === 'info',
        'bg-orange-400': this.type === 'warn'
      }
    }
  }
}
</script>

<style>

</style>
