<template>
   <div class="flex flex-col">
      <div class="flex w-full items-center h-16 mb-2 bg-blue-300">
        <div class="flex-grow">
          <select-input-language @input="onInputLanguageChange" class="justify-center" label="Idioma de entrada" v-model="inputLanguage"></select-input-language>
        </div>
        <div class="flex-grow">
          <select-output-language class="justify-center" label="Voz de saída" v-model="outputVoiceLanguage"></select-output-language>
        </div>
      </div>

      <div class="flex w-full h-10 overflow-y-auto" style="height: calc(100vh - 4rem - 0.5rem);">
        <div class="flex-grow bg-red-100">
          <message v-for="(message, index) in messages" :key="index" :message="message"></message>
        </div>
        <div class="flex-grow bg-green-100">
          <message v-for="(message, index) in translatedMessages" :key="index" :message="message"></message>
        </div>
      </div>
    </div>
</template>

<script>
import Conversation from '../services/Conversation'
import Translate from '../services/Translate'
import Message from '../models/Message'
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
      console.log(res)
      const message = new Message()
      message.date = new Date().toLocaleString()
      message.message = res.transcript

      this.messages.push(message)

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
    },
    onError (res) {

    },
    onEnd (res) {

    },
    speak (text, voice) {
      this.conversationService.speak(text, voice)
    },
    onInputLanguageChange (language) {
      console.log(language)
      this.conversationService.setLanguage(language.value)
    }
  },
  created () {
    this.init()
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
