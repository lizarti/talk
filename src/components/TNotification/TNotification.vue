<template>
  <div class="fixed top-0 right-0 m-6">
    <Transition name="slide-fade">
      <div
        v-if="notification"
        :class="{
          'bg-red-200 text-red-900': notification.type === 'error',
          'bg-green-200 text-green-900': notification.type === 'success',
          'bg-info-200 text-green-900': notification.type === 'info',
          'bg-orange-200 text-orange-900': notification.type === 'warn'
        }"
        class="rounded shadow-md p-2 pr-4"
        style="min-width: 240px">

        <t-button icon class="absolute right-0 mt-2 mr-4" @click="close()">
          <template v-slot:prepend>
            <t-icon class="h-4 w-4 text-x1" name="close"></t-icon>
          </template>
        </t-button>

        <div class="px-2 py-2 ml-2 mr-6">
          <span class="font-semibold tracking-widest mb-2" v-if="notification.title">{{ notification.title }}</span>
          <span class="block" v-if="notification.content">{{ notification.content }}</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  name: 't-notification',
  data () {
    return {
      notification: null
    }
  },
  methods: {
    close () {
      this.notification = null
    }
  },
  mounted () {
    let timer
    this.$notification.on('notify', notification => {
      clearTimeout(timer)
      this.notification = notification
      timer = setTimeout(() => {
        // this.notification = null
      }, 4000)
    })
  }
}
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(400px);
  opacity: 0;
}
</style>
