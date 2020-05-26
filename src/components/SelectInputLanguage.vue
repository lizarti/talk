<template>
  <div class="flex items-center flex-grow text-gray-700">
    <t-select class="flex-grow" :label="label" :options="languages" :value="value" @change="onChange" title="name"></t-select>
  </div>
</template>

<script>
import languagesJson from '../utils/languages.json'
export default {
  name: 'select-input-language',
  props: ['label', 'value'],
  data: () => ({
    languages: languagesJson.languages
  }),
  methods: {
    onChange (language) {
      this.$emit('input', language)
    }
  }
}
</script>

<style>

</style>
