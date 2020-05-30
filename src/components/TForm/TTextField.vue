<template>
  <div class="w-full">
    <div class="bg-white">
      <input v-bind="$attrs" v-on="inputListeners" class="my-2 px-4 py-2 rounded border border-gray-200 focus:border-blue-200 appearance-none outline-none w-full text-gray-800" />
    </div>
  </div>
</template>

<script>
export default {
  name: 't-text-field',
  computed: {
    inputListeners () {
      return Object.assign({},
        this.$listeners,
        {
          input: event => {
            this.$emit('input', event.target.value)
          }
        }
      )
    }
  }
}
</script>

<style>

</style>
