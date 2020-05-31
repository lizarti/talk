<template>
  <t-modal :value="true" title="Editar perfil" @input="val => $emit('input', val)">
    <div class="w-48">
      <t-text-field ref="username" placeholder="USERNAME" v-model="user.username" @keyup.enter="login()"></t-text-field>
      <t-color-picker v-model="user.color"></t-color-picker>
    </div>
    <template v-slot:footer>
      <div class="flex justify-center">
        <t-button @click="updateUser()" text>OK</t-button>
      </div>
    </template>
  </t-modal>
</template>

<script>
export default {
  name: 't-edit-user',
  data: () => ({
    user: {
      username: null,
      color: null
    }
  }),
  methods: {
    changeProfileColor (color) {
      this.user.color = color
    },
    updateUser () {
      if (this.edited) {
        this.$emit('edit', this.user)
      }
    }
  },
  computed: {
    edited () {
      return this.user.username !== this.$user.user().username || this.user.color !== this.$user.user().color
    }
  },
  created () {
    this.user.username = this.$user.user().username
    this.user.color = this.$user.user().color
  },
  mounted () {
    this.$refs.username.$el.querySelector('input').focus()
  }
}
</script>

<style>

</style>
