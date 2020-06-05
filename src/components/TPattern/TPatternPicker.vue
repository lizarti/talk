<template>
  <div class="grid grid-cols-3 gap-2 py-2">
    <div v-for="pattern in patterns" :key="pattern" @click="select(pattern)">
      <t-pattern :name="pattern" color="000000">
        <div class="h-16 transition duration-200" :style="{'border-color': border_color}" :class="{'border-2 border-blue-300': pattern === value}"></div>
      </t-pattern>
    </div>
  </div>
</template>

<script>
import { patterns } from './patterns'
export default {
  name: 't-pattern-picker',
  props: {
    value: String,
    activeColor: String
  },
  data: () => ({
    patterns: Object.keys(patterns)
  }),
  methods: {
    select (pattern) {
      if (pattern !== this.value) {
        this.$emit('change', pattern)
        this.$emit('input', pattern)
      } else {
        this.$emit('input', '')
      }
    }
  },
  computed: {
    border_color () {
      if (this.activeColor) {
        return this.activeColor
      }
      return ''
    }
  }
}
</script>

<style>

</style>
