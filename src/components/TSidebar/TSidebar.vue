<template>
  <div class="md:flex flex-col flex-row md:min-h-screen" :class="navbar_classes">
    <div class="flex flex-col w-full md:w-56 text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800 flex-shrink-0 h-full">
      <div class="flex-shrink-0 px-6 py-4 flex flex-row items-center justify-between">
        <t-button icon class="md:hidden text-gray-800" @click="open = !open">
          <template v-slot:prepend>
            <t-icon class="h-5 w-5 text-x1" :name="open ? 'close' : 'menu'"></t-icon>
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
            <t-subheader>CONVERSAS</t-subheader>
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

    <t-join-room v-if="creating.modal" v-model="creating.modal" @userSelect="loginIntoRoom"></t-join-room>

    <t-edit-user v-if="profile.editing" v-model="profile.editing" @edit="updateUser"></t-edit-user>

  </div>
</template>

<script>
import TJoinRoom from '../Chat/TJoinRoom'
import TEditUser from '../Chat/TEditUser'
export default {
  name: 't-sidebar',
  components: {
    TJoinRoom,
    TEditUser
  },
  data: () => ({
    open: true,
    creating: {
      modal: false
    },
    profile: {
      editing: false
    }
  }),
  methods: {
    updateUser (user) {
      const updated = this.$user.user()
      updated.username = user.username
      updated.color = user.color
      this.$chat.updateUser(updated)
      this.profile.editing = false
    },
    openJoinRoom () {
      this.creating.modal = true
    },
    loginIntoRoom (user, config) {
      this.$chat.startConversation(user.id, config)
      this.creating.modal = false
    },
    selectRoom (room) {
      this.$store.dispatch('activateRoom', room)
      this.open = false
    },
    openProfileEdit () {
      this.profile.editing = true
    },
    exit () {
      this.$store.dispatch('exit')
      this.$chat.logout()
    }
  },
  computed: {
    navbar_classes () {
      return {
        'min-h-screen': this.open
      }
    },
    rooms () {
      return this.$store.getters.rooms
    }
  }
}
</script>

<style scoped>
.username {
  overflow-wrap: anywhere;
}
</style>
