<template>
  <t-modal title="Configuração" v-model="opened">
    <div class="config--container">
      <div>
        <t-subheader class="my-2">PLANO DE FUNDO</t-subheader>
        <t-pattern-picker :value="selectedPattern" :activeColor="other_user.color" @change="onPatternChange"></t-pattern-picker>
      </div>
      <div>
        <t-subheader class="my-2">LINGUAGEM DE ENTRADA</t-subheader>
        <div class="flex items-center flex-grow text-gray-700">
          <t-select class="flex-grow" label="Linguagem de entrada" :options="inputLanguages" v-model="selected.inputLanguage" title="name"></t-select>
        </div>
      </div>

      <div>
        <h4 class="tracking-widest text-xs title-font font-medium mb-1 uppercase">VOZ DE SAÍDA</h4>
        <div class="flex items-center flex-grow text-gray-700">
          <t-select class="flex-grow" label="Voz de saída" :options="outputLanguages" v-model="selected.outputLanguage" title="name" subtitle="lang"></t-select>
        </div>
      </div>
    </div>

    <template v-slot:footer>
      <div class="flex justify-center">
        <t-button @click="onOK()">OK</t-button>
      </div>
    </template>
  </t-modal>
</template>

<script>
import TPatternPicker from '../TPattern/TPatternPicker'
import languagesJSON from '../../utils/languages.json'
const synth = window.speechSynthesis
export default {
  name: 't-room-config',
  props: ['room', 'opened'],
  components: {
    TPatternPicker
  },
  data: () => ({
    modalOpened: false,
    inputLanguages: [],
    outputLanguages: [],
    selected: {
      inputLanguage: null,
      outputLanguage: null
    },
    selectedPattern: null
  }),
  methods: {
    onOK () {
      const config = {
        languages: {
          input: this.selected.inputLanguage,
          output: this.selected.outputLanguage
        },
        pattern: this.selectedPattern
      }
      this.$emit('configure', config)
    },
    onPatternChange (pattern) {
      this.selectedPattern = pattern
    }
  },
  computed: {
    other_user () {
      return this.room.otherParticipant(this.$user.user().id)
    }
  },
  mounted () {
    this.inputLanguages = languagesJSON.languages
    setTimeout(() => {
      this.outputLanguages = synth.getVoices().map(voice => {
        return {
          lang: voice.lang,
          name: voice.name
        }
      })
    }, 1000)
  },
  created () {
    this.selected.inputLanguage = this.room.languages[this.$user.user().id].input
    this.selected.outputLanguage = this.room.languages[this.$user.user().id].output
    this.selectedPattern = this.room.pattern
  }
}
</script>

<style scoped>
  .config--container {
    width: 300px;
  }
</style>
