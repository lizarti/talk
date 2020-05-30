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
        <button class="opacity-75 cursor-pointer absolute top-0 right-0 py-1 px-3 hover:opacity-100">
          &times;
        </button>
        <div class="ml-2 mr-6">
          <span class="font-semibold tracking-widest mb-2" v-if="notification.title">{{ notification.title }}</span>
          <span class="block text-xs text-gray-600" v-if="notification.content">{{ notification.content }}</span>
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
  mounted () {
    let timer
    this.$notification.on('notify', notification => {
      clearTimeout(timer)
      this.notification = notification
      timer = setTimeout(() => {
        this.notification = null
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
