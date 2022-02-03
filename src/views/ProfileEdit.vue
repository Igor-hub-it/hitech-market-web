<template>
  <form ref="form" @submit.prevent="submitHandler" class="form">
    <div class="form__item">
      <p class="form__title">Изменить информацию о себе</p>
      <v-input v-model="newName" :errors="errors.newName" :name="'name'"
        >Введите имя фамилию</v-input
      >
      <v-input
        v-model="newPhone"
        :errors="errors.newPhone"
        :name="'phone'"
        :type="'tel'"
        >Введите номер телефона</v-input
      >
    </div>
    <div class="form__item">
      <p class="form__title">Сменить пароль</p>
      <v-input v-model="oldPassword" :name="oldPassword" :type="'password'"
        >Введите текущий пароль</v-input
      >
      <v-input
        v-model="newPassword"
        :errors="errors.newPassword"
        :name="'password'"
        :type="'password'"
        >Введите новый пароль</v-input
      >
      <v-input
        v-model="confirmPassword"
        :errors="errors.confirmPassword"
        :name="'confirmPassword'"
        :type="'password'"
        >Повторите новый пароль</v-input
      >
    </div>
    <div class="form__submit">
      <form-button :disabled="!saveAvaible">Сохранить изменения</form-button>
    </div>
  </form>
</template>

<script>
import vInput from '@/components/Input.vue'
import FormButton from '@/components/FormButton.vue'

export default {
  components: {
    vInput,
    FormButton,
  },

  inject: ['axiosNotify', 'syncUser'],

  data() {
    return {
      errors: {},
      newName: '',
      newPhone: '',
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    }
  },

  computed: {
    saveAvaible() {
      return (
        this.newName?.length > 0 ||
        this.newPhone?.length > 0 ||
        (this.oldPassword?.length > 0 &&
          this.newPassword?.length > 0 &&
          this.confirmPassword?.length > 0)
      )
    },
  },

  methods: {
    async submitHandler() {
      if (this.newName?.length > 0 || this.newPhone?.length > 0) {
        const loading = this.$loading.show({
          container: this.$refs.form,
          canCancel: false,
        })
        const data = { name: this.newName, phone: this.newPhone }
        const response = await this.$axios
          .post('/user/edit', data)
          .then(() => true)
          .catch((err) => err.response.data.detail)

        loading.hide()
        this.axiosNotify(response, `Информация обновлена`)
        this.syncUser()
      }

      if (this.oldPassword?.length > 0) {
        let err = false

        if (this.oldPassword === this.newPassword) {
          this.errors.newPassword = ['Пароль не может совпадать с текущим']
          err = true
        }
        if (this.newPassword !== this.confirmPassword) {
          this.errors.confirmPassword = ['Пароли не совпадают']
          this.errors.newPassword = ['Пароли не совпадают']
          err = true
        }
        if (this.newPassword?.length === 0) {
          this.errors.newPassword = ['Нужно ввести новый пароль']
          err = true
        }
        if (this.confirmPassword?.length === 0) {
          this.errors.confirmPassword = ['Нужно ввести новый пароль']
          err = true
        }

        if (!err) {
          this.errors = {}

          const loading = this.$loading.show({
            container: this.$refs.form,
            canCancel: false,
          })
          const data = {
            old_password: this.oldPassword,
            new_password: this.newPassword,
          }
          const response = await this.$axios
            .post('/user/reset-password', data)
            .then(() => true)
            .catch((err) => err.response.data.detail)

          loading.hide()
          this.axiosNotify(response, 'Пароль изменен')
        }
      }

      this.$router.push({ name: 'profile' })
    },
  },
}
</script>

<style lang="scss" scoped>
.form {
  margin: 0 auto;
  position: relative;
  width: Min(800px, 100%);

  &__item {
    margin-bottom: 32px;
  }

  &__title {
    margin-bottom: 8px;
  }

  &__submit {
    display: flex;
    justify-content: center;
    width: 100%;

    div {
      width: auto;
    }
  }
}
</style>