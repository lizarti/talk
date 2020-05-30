import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'

import '@/assets/css/main.css'

/* Vuex */
import store from './store'

/* plugins */
import UserPlugin from './plugins/user'
import ChatPlugin from './plugins/chat'
import SpeechPlugin from './plugins/speech'
import NotificationPlugin from './plugins/notification'

/* components */
import TButton from './components/TButton/TButton'
import TSelect from './components/TSelect/TSelect'
import TTextField from './components/TForm/TTextField'
import TModal from './components/TModal/TModal'
import TAlert from './components/TAlert/TAlert'
import TNotification from './components/TNotification/TNotification'
import TIcon from './components/TIcon/TIcon'
import TColorPicker from './components/TColorPicker/TColorPicker'

import TSidebar from './components/TSidebar/TSidebar'
import TLogin from './components/TLogin/TLogin'
import TRoomListItem from './components/Chat/TRoomListItem'
import TMessage from './components/Chat/TMessage'
import TRoomConfig from './components/Chat/TRoomConfig'
import Conversation from './components/Conversation'

Vue.use(UserPlugin, { store })
Vue.use(ChatPlugin, { store })
Vue.use(SpeechPlugin, { store })
Vue.use(NotificationPlugin)

Vue.component(TButton.name, TButton)
Vue.component(TSelect.name, TSelect)
Vue.component(TTextField.name, TTextField)
Vue.component(TModal.name, TModal)
Vue.component(TAlert.name, TAlert)
Vue.component(TNotification.name, TNotification)
Vue.component(TIcon.name, TIcon)
Vue.component(TColorPicker.name, TColorPicker)
Vue.component(TSidebar.name, TSidebar)
Vue.component(TLogin.name, TLogin)
Vue.component(Conversation.name, Conversation)
Vue.component(TRoomListItem.name, TRoomListItem)
Vue.component(TMessage.name, TMessage)
Vue.component(TRoomConfig.name, TRoomConfig)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
