import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'

import '@/assets/css/main.css'

/* components */
import TSelect from './components/TSelect/TSelect'
import Conversation from './components/Conversation'
import SelectInputLanguage from './components/SelectInputLanguage'
import SelectOutputLanguage from './components/SelectOutputLanguage'
import Message from './components/Message'

Vue.component(TSelect.name, TSelect)
Vue.component(Conversation.name, Conversation)
Vue.component(SelectInputLanguage.name, SelectInputLanguage)
Vue.component(SelectOutputLanguage.name, SelectOutputLanguage)
Vue.component(Message.name, Message)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
