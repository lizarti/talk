<template>
  <svg class="fill-current inline-block" v-bind="$attrs" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path :d="icon_path"/></svg>
</template>

<script>
import { zondicons } from './icons'
export default {
  name: 't-icon',
  props: {
    name: String,
    source: {
      type: String,
      default: 'zondicons'
    }
  },
  data: () => ({
    zondicons: zondicons
  }),
  computed: {
    icon_path () {
      return this[this.source][this.name]
    }
  }
}
</script>

<style>

</style>
