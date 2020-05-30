<template>
  <button v-on="click_listeners" class="focus:outline-none focus:shadow-outline text-xs font-semibold bg-transparent flex transition duration-200" :class="{...computed_colors, ...computed_types}">
    <div v-if="!!$slots.prepend">
      <div class="leading-4" v-if="!!$slots.prepend" :class="{'mr-1':!icon}">
        <slot name="prepend"></slot>
      </div>
    </div>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 't-button',
  props: {
    color: String,
    primary: Boolean,
    disabled: Boolean,
    icon: Boolean,
    text: Boolean
  },
  data: () => ({
    defaultType: {
      border: true,
      rounded: true,
      'rounded-lg': false,
      'py-2': true,
      'px-4': true,
      'hover:bg-gray-300': true
    }
  }),
  computed: {
    computed_types () {
      const type = Object.assign({}, this.defaultType)
      if (this.icon) {
        type.border = false
        type['py-2'] = false
        type['px-4'] = false
        type['hover:bg-gray-300'] = false
        type['rounded-lg'] = true
      }
      if (this.text) {
        type.border = false
      }
      return type
    },
    computed_colors () {
      return {
        'text-blue-400': !!this.primary,
        'hover:text-white': !!this.primary,
        'hover:bg-blue-300': !!this.primary,
        ['bg-' + this.color]: !!this.color,
        'opacity-50 cursor-not-allowed': this.disabled
      }
    },
    click_listeners () {
      return Object.assign({},
        this.$listeners,
        {
          click: event => {
            if (!this.disabled) {
              this.$emit('click', event)
            }
          }
        }
      )
    }
  }
}
</script>

<style scoped>

</style>
