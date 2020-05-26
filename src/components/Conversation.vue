<template>
   <div class="flex flex-col">
      <div class="flex flex-1 items-center h-48 md:h-24 mb-2 bg-blue-500 text-white flex-wrap fixed w-full">
        <div class="w-full md:flex-1 flex flex-col">
          <h2 class="tracking-widest text-xs title-font font-medium text-white ml-4 mb-1">IDIOMA DE ENTRADA</h2>
          <select-input-language @input="onInputLanguageChange" class="justify-center" label="Idioma de entrada" v-model="inputLanguage"></select-input-language>
        </div>
        <div class="w-full md:flex-1 flex flex-col">
          <h2 class="tracking-widest text-xs title-font font-medium text-white ml-4 mb-1">VOZ DE SAÍDA</h2>
          <select-output-language class="justify-center" label="Voz de saída" v-model="outputVoiceLanguage"></select-output-language>
        </div>
      </div>

      <div class="flex w-full mt-48 md:mt-24">
        <div class="flex-1 overflow-y-auto p-4 text-gray-800">
          <h2 class="tracking-widest text-xs title-font font-medium text-gray-500 mb-4">SUAS MENSAGENS</h2>
          <template v-for="(message, index) in messages">
            <message :message="message" :key="index" class="mb-2"></message>
            <hr class="border-gray-200 mb-2" :key="index"/>
          </template>
        </div>
        <div class="flex-1 overflow-y-auto p-4 text-gray-800">
          <h2 class="tracking-widest text-xs title-font font-medium text-gray-500 mb-4">TRADUÇÕES</h2>
          <template v-for="(message, index) in translatedMessages">
            <message :message="message" :key="index" class="mb-2"></message>
            <hr class="border-gray-200 mb-2" :key="index"/>
          </template>
        </div>
      </div>
    </div>
</template>

<script>
import Conversation from '../services/Conversation'
import Translate from '../services/Translate'
import Message from '../models/Message'
import languagesJson from '../utils/languages.json'
const synth = window.speechSynthesis
export default {
  name: 'conversation',
  data: () => ({
    messages: [],
    translatedMessages: [],
    inputLanguage: {},
    outputVoiceLanguage: {},
    languages: [],
    conversationService: new Conversation(),
    translateService: new Translate()
  }),
  methods: {
    init () {
      this.conversationService.listen(this.onResult, this.onEnd, this.onError)
    },
    onResult (res) {
      const message = new Message()
      message.date = new Date().toLocaleString()
      message.message = res.transcript

      this.messages.push(message)

      const from = this.inputLanguage.value.substring(0, 2)
      const to = this.outputVoiceLanguage.lang.substring(0, 2)

      if (from === to) {
        /* se for igual, não traduz e adiciona a mensagem original */
        this.translatedMessages.push(message)

        this.speak(message.message, this.outputVoiceLanguage)
      } else {
        const sentence = {
          text: message.message,
          from: this.inputLanguage.value.substring(0, 2),
          to: this.outputVoiceLanguage.lang.substring(0, 2)
        }

        this.translateService.translateSentence(sentence).then(translated => {
          if (translated.text && translated.text.length) {
            const message = new Message()
            message.date = new Date().toLocaleString()
            message.message = translated.text[0]

            this.translatedMessages.push(message)

            this.speak(message.message, this.outputVoiceLanguage)
          }
        })
      }
    },
    onError (res) {

    },
    onEnd (res) {

    },
    speak (text, voice) {
      this.conversationService.speak(text, voice)
    },
    onInputLanguageChange (language) {
      this.conversationService.setLanguage(language.value)
    }
  },
  created () {
    this.inputLanguage = languagesJson.languages[0]
    this.init()
  },
  mounted () {
    setTimeout(() => {
      this.languages = synth.getVoices()
      this.outputVoiceLanguage = this.languages[0]
    }, 1000)
  }
}
</script>

<style>

</style>
