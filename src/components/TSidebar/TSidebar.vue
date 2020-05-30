<template>
  <div class="md:flex flex-col flex-row md:min-h-screen" :class="navbar_classes">
    <div class="flex flex-col w-full md:w-56 text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800 flex-shrink-0 h-full">
      <div class="flex-shrink-0 px-8 py-2 flex flex-row items-center justify-between">
        <t-button icon class="md:hidden text-gray-800 " @click="open = !open">
          <template v-slot:prepend>
            <t-icon class="h-4 w-4 text-x1" :name="open ? 'close' : 'menu'"></t-icon>
          </template>
        </t-button>
      </div>
      <nav :class="{'block': open, 'hidden': !open}" class="flex-grow md:block px-4 pb-4 md:pb-0 md:overflow-y-auto">
        <div class="flex flex-col h-full">
          <div class="text-center p-2 pb-4 mb-4 border-b" :style="{'color': $user.user().color}" v-if="!!$user.user().username">
            <img
              class="h-24 w-24 rounded-full mx-auto"
              :src="`https://api.adorable.io/avatars/160/${$user.user().username}@adorable.io.png`"
              :alt="$user.user.username"
            />
            <div class="relative">
              <t-button icon class="text-gray-800 absolute bottom-0 mb-4 ml-2" @click="openProfileEdit()">
                <template v-slot:prepend>
                  <t-icon class="h-5 w-5 text-x1" name="cog"></t-icon>
                </template>
              </t-button>
              <div class="w-40 m-auto">
                <p class="pt-4 text-lg font-semibold uppercase username">{{ $user.user().username }}</p>
                <p class="text-sm text-gray-600 select-all">{{ $user.user().id }}</p>
              </div>
            </div>
          </div>

          <div class="flex justify-center w-full">
            <h4 class="tracking-widest text-xs title-font font-medium mb-1 uppercase">CONVERSAS</h4>
          </div>

          <div class="px-4 py-4 flex justify-center">
            <t-button @click="openJoinRoom()">
              NOVA
            </t-button>
          </div>
          <div class="flex-grow overflow-y-auto">
            <t-room-list-item v-for="(room, index) of rooms" :key="index" :room="room" @select="selectRoom(room)" :active="room === $store.getters.activeRoom">
            </t-room-list-item>
          </div>
          <div class="px-4 py-4 flex flex-col items-center justify-center">
            <t-button @click="exit()">
              SAIR
            </t-button>
            <p class="mt-4 text-xs tracking-wide uppercase">Feito com <span :style="{ 'color':$user.user().color }"><t-icon class="h-4 w-4 text-x1" name="heart"></t-icon></span> e CSS</p>
          </div>
        </div>
      </nav>
    </div>

    <t-modal v-model="creating.modal" title="Nova conversa">
      <div class="w-64">
        <t-text-field ref="destinatario" placeholder="ID do destinatário" v-model="creating.id"></t-text-field>
        <t-alert type="error" v-if="existing_room">
          <p>Já possui uma conversa com esse usuário ({{ other_user.username }}).</p>
        </t-alert>
        <t-alert type="error" v-if="self_chat">
          <p>Você não pode começar uma convesa com você mesmo (pelo menos não por enquanto).</p>
        </t-alert>

      </div>
      <template v-slot:footer>
        <div class="flex justify-center">
          <t-button @click="loginIntoRoom()" :disabled="!is_valid">ENTRAR</t-button>
        </div>
      </template>
    </t-modal>

    <t-modal v-model="profile.modal" title="Editar perfil">
      <div class="w-48">
        <t-color-picker :value="$user.user().color" @input="changeProfileColor"></t-color-picker>
      </div>
      <template v-slot:footer>
        <div class="flex justify-center">
          <t-button @click="() => profile.modal = false" text>OK</t-button>
        </div>
      </template>
    </t-modal>

  </div>
</template>

<script>
export default {
  name: 't-sidebar',
  data: () => ({
    open: false,
    creating: {
      modal: false,
      id: '',
      found: false,
      timeout: 0
    },
    profile: {
      modal: false,
      color: ''
    }
  }),
  methods: {
    openJoinRoom () {
      this.creating.modal = true
      setTimeout(() => {
        this.$refs.destinatario.$el.querySelector('input').focus()
      }, 100)
    },
    searchForUser () {
      clearTimeout(this.creating.timeout)
      this.creating.timeout = setTimeout(() => {
        if (this.creating.id.length === 9) {
          this.loginIntoRoom()
        }
      }, 200)
    },
    loginIntoRoom () {
      this.$chat.startConversation(this.creating.id)
      this.creating.id = ''
      this.creating.modal = false
    },
    selectRoom (room) {
      this.$store.dispatch('activateRoom', room)
    },
    openProfileEdit () {
      this.profile.modal = true
    },
    changeProfileColor (color) {
      const user = this.$user.user()
      user.color = color
      this.updateUser(user)
    },
    updateUser (user) {
      this.$store.dispatch('setUser', user)
    },
    exit () {
      this.$store.dispatch('exit')
    }
  },
  computed: {
    is_valid () {
      return !this.existing_room && !this.self_chat && this.creating.id.length === 9
    },
    rooms () {
      return this.$store.getters.rooms
    },
    existing_room () {
      return this.rooms.find(r => {
        return r.participants.some(p => p.id === this.creating.id)
      })
    },
    self_chat () {
      return this.creating.id === this.$user.user().id
    },
    other_user () {
      return this.existing_room && this.existing_room.participants.find(p => p.id !== this.$user.user().id)
    },
    navbar_classes () {
      return {
        'min-h-screen': this.open
      }
    }
  }
}
</script>

<style scoped>
.username {
  overflow-wrap: anywhere;
}
</style>
