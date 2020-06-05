<template>
  <div>
    <t-modal :value="modalOpened" title="Login">
      <div>
        <t-text-field ref="username" placeholder="USERNAME" v-model="user.username" @keyup.enter="login()"></t-text-field>
        <t-color-picker :value="user.color" @input="color => user.color = color" :random="true"></t-color-picker>
      </div>
      <template v-slot:footer>
        <div class="flex justify-center">
          <t-button @click="login()" :disabled="!is_valid" text>LOGIN</t-button>
        </div>
      </template>
    </t-modal>
  </div>
</template>

<script>
export default {
  name: 't-login',
  data: () => ({
    modalOpened: true,
    user: {
      username: '',
      color: ''
    }
  }),
  methods: {
    login () {
      this.$chat.login(this.user)
      this.modalOpened = false
    }
  },
  computed: {
    is_valid () {
      return !!this.user.username && !!this.user.color.match(/^#(?:[0-9a-fA-F]{3}){1,2}$/i)
    }
  },
  mounted () {
    this.$refs.username.$el.querySelector('input').focus()
  }
}
</script>

<style>

</style>
