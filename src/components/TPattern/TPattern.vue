<template>
  <div :style="styles" class="h-full w-full">
    <slot></slot>
  </div>
</template>

<script>
import { patterns } from './patterns'
export default {
  name: 't-pattern',
  props: {
    name: String,
    color: {
      type: String,
      default: '#000000'
    },
    bgcolor: {
      type: String,
      default: '#fefefe'
    }
  },
  computed: {
    pattern () {
      const pattern = patterns[this.name]
      if (pattern) {
        return pattern.replace('######', this.color.slice(1))
      }
      return ''
    },
    styles () {
      if (this.name && this.pattern) {
        const p = {
          'background-color': this.bgcolor,
          'background-image': `url("${this.pattern}")`
        }
        return p
      }
      return ''
    }
  }
}
</script>

<style>

</style>
