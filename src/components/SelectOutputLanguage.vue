<template>
  <div class="flex items-center text-gray-700">
    <t-select class="flex-grow" :label="label" :options="languages" :value="value" @change="onChange" title="name" subtitle="lang"></t-select>
  </div>
</template>

<script>
const synth = window.speechSynthesis
const SpeechSynthesisVoice = window.SpeechSynthesisVoice
export default {
  name: 'select-output-language',
  props: {
    label: String,
    value: SpeechSynthesisVoice
  },
  data: () => ({
    languages: [],
    selectedOption: {}
  }),
  methods: {
    onChange (option) {
      this.$emit('input', option)
    }
  },
  mounted () {
    setTimeout(() => {
      this.languages = synth.getVoices()
    }, 1000)
  }
}
</script>

<style>

</style>
