<template>
  <t-modal :value="true" title="Nova conversa" @input="val => $emit('input', val)">
    <div class="w-64">
      <t-subheader class="mb-1">PLANO DE FUNDO</t-subheader>
      <t-pattern-picker v-model="selectedPattern" :activeColor="user && user.color"></t-pattern-picker>
      <t-text-field maxlength="9" ref="destinatario" placeholder="ID do destinatário" v-model="id" @keyup="searchForUser"></t-text-field>
      <t-alert type="error" v-if="existing_room">
        <p>Já possui uma conversa com o usuário <span class="font-semibold"> {{ other_user.username }}</span>.</p>
      </t-alert>
      <t-alert type="error" v-if="self_chat">
        <p>Você não pode começar uma convesa com você mesmo (pelo menos não por enquanto).</p>
      </t-alert>

    </div>
    <t-alert v-if="searching" type="info">
      Procurando. . .
    </t-alert>
    <t-alert v-if="is_valid && notFound" type="error">
      Usuário não encontrado
    </t-alert>
    <div v-if="is_valid && user">
      <div class="flex justify-start relative cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2" @click="selectRoom()">
        <!-- <span class="bg-gray-400 h-2 w-2 m-2 rounded-full" :style="{'background-color': user.color}"></span> -->
        <img
            class="h-6 w-6 rounded-full"
            :src="`https://api.adorable.io/avatars/24/${user.username}@adorable.io.png`"
            :alt="$user.user.username"
          />
        <div class="pl-3">
          <p class="text-sm font-medium text-gray-800 uppercase" :style="{'color': user.color }">{{ user.username }}</p>
        </div>
      </div>
    </div>
  </t-modal>
</template>

<script>
import TPatternPicker from '../TPattern/TPatternPicker'
export default {
  name: 't-join-room',
  components: {
    TPatternPicker
  },
  data: () => ({
    user: null,
    id: '',
    timeout: 0,
    searching: false,
    notFound: false,
    patterns: ['jigsaw', 'falling-triangles', 'hideout'],
    selectedPattern: null
  }),
  methods: {
    searchForUser () {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        if (this.id.length === 9) {
          this.searching = false
          this.notFound = false
          this.$chat.searchForUser(this.id)
        }
      }, 200)
    },
    selectRoom () {
      if (!this.is_valid) {
        return
      }
      this.$emit('userSelect', this.user, {
        pattern: this.selectedPattern
      })
      this.user = null
      this.notFound = null
      this.searching = null
    }
  },
  computed: {
    is_valid () {
      return !this.existing_room && !this.self_chat && this.id.length === 9
    },
    rooms () {
      return this.$store.getters.rooms
    },
    existing_room () {
      return this.id !== this.$user.user().id && this.rooms.find(r => r.hasUser(this.id))
    },
    other_user () {
      return (this.existing_room && this.existing_room.otherParticipant(this.$user.user().id)) || {}
    },
    self_chat () {
      return this.id === this.$user.user().id
    }
  },
  created () {
    this.$chat.on('SEARCH_USER', user => {
      this.user = user
      this.notFound = !user
      this.searching = false
    })
  },
  mounted () {
    setTimeout(() => {
      this.$refs.destinatario.$el.querySelector('input').focus()
    }, 200)
  },
  beforeDestroy () {
    this.$chat.off('SEARCH_USER')
  }
}
</script>

<style>

</style>
