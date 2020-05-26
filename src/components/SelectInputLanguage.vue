<template>
  <div class="flex ml-6 items-center">
    <span class="mr-3">{{ label }}</span>
    <div class="relative">
      <select
        class="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-indigo-500 text-base pl-3 pr-10"
        :value="value.value"
        @change="onChange">
        <option v-for="language in languages" :key="language.name" :value="language.value">{{ language.name }}</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'select-input-language',
  props: ['label', 'value'],
  data: () => ({
    languages: [
      {
        name: 'Português (Brasil)',
        value: 'pt-BR'
      },
      {
        name: 'English (USA)',
        value: 'en-US'
      },
      {
        name: 'English (United Kingdom)',
        value: 'en-GB'
      }
    ]
  }),
  methods: {
    onChange (event) {
      const selectedLanguage = this.languages.find(l => l.value === event.target.value)
      if (selectedLanguage) {
        this.$emit('input', selectedLanguage)
      }
    }
  }
}
</script>

<style>

</style>
