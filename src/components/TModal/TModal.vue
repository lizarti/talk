<template>
  <transition name="fade">
    <div v-if="value" class="fixed inset-0 z-30">
<!--       background -->
      <div v-show="value" @click="close()" class="bg-red bg-filter bg-white opacity-25 fixed inset-0 w-full h-full z-20">
      </div>
<!--          -->
      <div class="flex flex-col items-center justify-center h-full w-full -mt-16">
        <transition name="fade-up-down">
          <div v-show="value" class="modal-wrapper inline-block flex items-center z-30">
            <div class="modal bg-white max-h-screen shadow-lg flex-row rounded relative">

              <div class="mb-4 px-5 py-4 bg-blue-200">
                <template v-if="$slots.header">
                  <slot name="header"></slot>
                </template>
                <template v-if="!$slots.header && title">
                  <h5 class="text-lg text-blue-800 uppercase">{{ title }}</h5>
                </template>
              </div>

              <div class="modal-body px-6 mb-8 w-full h-full">
                <slot></slot>
              </div>

              <div class="modal-footer border0-t text-right bg-orange-200 py-4" v-if="$slots.footer">
                <slot name="footer"></slot>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 't-modal',
  props: {
    value: Boolean,
    title: String
  },
  data: () => ({
  }),
  methods: {
    open () {
      document.getElementsByTagName('html')[0].classList.add('overflow-y-hidden')
    },
    close () {
      document.getElementsByTagName('html')[0].classList.remove('overflow-y-hidden')
      this.$emit('input', false)
    }
  },
  watch: {
    value (newValue) {
      if (newValue) {
        this.open()
      } else {
        this.close()
      }
    }
  }
}
</script>

<style>
  .modal-body{
    max-height: 500px;
  }
  .bg-gray-800-opacity{
    background-color: #2D374850;
  }
  @media screen and (max-width: 768px){
    .modal-body {
        max-height: 400px;
    }
  }
</style>
