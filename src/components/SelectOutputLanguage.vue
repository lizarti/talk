<template>
  <div class="flex ml-6 items-center">
    <span class="mr-3">{{ label }}</span>
    <div class="relative">
      <select
        class="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-indigo-500 text-base pl-3 pr-10"
        :value="value.name"
        @change="onChange">
        <option v-for="language in languages" :key="language.name" :value="language.name">{{ language.name }}</option>
      </select>
    </div>
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
    onChange (event) {
      const selectedLanguage = this.languages.find(l => l.name === event.target.value)
      if (selectedLanguage) {
        this.$emit('input', selectedLanguage)
      }
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
