<template>
  <div class="flex flex-col items-center">
    <div class="w-full flex flex-col items-center">
      <div class="w-full px-4">
        <div class="flex flex-col items-center relative">
          <div class="w-full">
            <div class="my-2 p-1 bg-white flex border border-gray-200 rounded">
              <div class="p-1 px-2 appearance-none outline-none w-full text-gray-800 overflow-hidden whitespace-no-wrap">
                <span class="text-gray-500" v-if="!has_valid_value">{{ label}}</span>
                <span v-if="has_valid_value" class="">
                  {{ value[title] }}
                </span>
              </div>
              <div
                class="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200">
                <button
                  class="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none"
                  @click="opened = !opened">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="w-4 h-4">
                    <polyline :points="points_icon_chevron" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div v-if="opened" class="absolute shadow bg-white top-100 z-40 w-full lef-0 rounded max-h-select overflow-y-auto svelte-5uyqqj">
            <div class="flex flex-col w-full">
              <t-option v-for="(option, index) in options" :key="index"
                :title="option[title]"
                :subtitle="option[subtitle]"
                @click="onClick(option)"
                ></t-option>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TOption from './TOption'
export default {
  name: 't-select',
  components: {
    TOption
  },
  props: {
    label: String,
    options: {
      default: () => ([])
    },
    value: null,
    title: String,
    subtitle: String
  },
  data: () => ({
    opened: false
  }),
  methods: {
    onClick (option) {
      this.opened = false
      this.$emit('input', option)
      this.$emit('change', option)
    }
  },
  computed: {
    points_icon_chevron () {
      return this.opened ? '18 15 12 9 6 15' : '18 9 12 15 6 9'
    },
    has_valid_value () {
      return this.value !== null && this.value !== undefined
    }
  }
}
</script>

<style>
.top-100 {
  top: 100%;
}
.bottom-100 {
  bottom: 100%;
}
.max-h-select {
  max-height: 300px;
}
</style>
