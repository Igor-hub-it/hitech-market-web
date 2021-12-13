<template>
  <main @click.self="closeModal" class="auth">
    <div class="container auth__container">
      <form @submit.prevent="submitHandler" class="auth__form">
        <p class="auth__error">{{ authError }}</p>
        <v-input
          v-if="isRegistration"
          v-model.trim="name"
          @update:modelValue="v$.name.$touch"
          :dirty="v$.name.$dirty"
          :errors="getErrors(v$.name)"
          :name="'name'"
          class="auth__field"
          >Имя*</v-input
        >
        <v-input
          v-model.trim="email"
          @update:modelValue="v$.email.$touch"
          :dirty="v$.email.$dirty"
          :errors="getErrors(v$.email)"
          :name="'email'"
          :type="'text'"
          class="auth__field"
          >Email*</v-input
        >
        <v-input
          v-if="isRegistration"
          v-model.trim="phone"
          :name="'phone'"
          :type="'tel'"
          class="auth__field"
          >Телефон</v-input
        >
        <v-input
          v-model.trim="password"
          @update:modelValue="v$.password.$touch"
          :dirty="v$.password.$dirty"
          :errors="getErrors(v$.password)"
          :name="'password'"
          :type="'password'"
          class="auth__field"
          >Пароль*</v-input
        >
        <v-input
          v-if="isRegistration"
          v-model.trim="passwordRepeat"
          @update:modelValue="updatePasswordRepeatHandler"
          @change="v$.passwordRepeat.$touch"
          :dirty="v$.passwordRepeat.$dirty"
          :errors="getErrors(v$.passwordRepeat)"
          :name="'passwordRepeat'"
          :type="'password'"
          class="auth__field"
          >Повтор пароля*</v-input
        >
        <form-button class="auth__submit">{{
          authLabels[authType].submit
        }}</form-button>
        <button @click.stop="switchAuthType" type="button" class="auth__switch">
          {{ authLabels[authType].switch }}
        </button>
      </form>
    </div>
  </main>
</template>

<script>
import FormButton from '@/components/FormButton.vue'
import vInput from '@/components/vInput.vue'
import { mapActions } from 'vuex'
import useVuelidate from '@vuelidate/core'
import { email, required, minLength, maxLength, sameAs } from '@vuelidate/validators'

export default {
  emits: ['close:modal', 'update:user'],
  
  components: {
    FormButton,
    vInput,
  },

  setup() {
    return {
      v$: useVuelidate(),
      authLabels: {
        authorization: {
          title: 'Авторизация',
          submit: 'Войти',
          switch: 'Создать аккаунт',
        },
        registration: {
          title: 'Регистрация',
          submit: 'Зарегистрироваться',
          switch: 'У меня уже есть аккаунт',
        }
      }
    }
  },

  data() {
    return {
      authType: 'authorization',
      authError: '',
      name: '',
      email: '',
      phone: '',
      password: '',
      passwordRepeat: '',
    }
  },

  validations() {
    const minPassword = minLength(8)
    const maxPassword = maxLength(30)
    const minName = minLength(4)
    const maxName = maxLength(30)

    return {
      name: { minLength: minName, maxLength: maxName, required },
      email: { email, required },
      password: { minLength: minPassword, maxLength: maxPassword, required },
      passwordRepeat: { sameAs: sameAs(this.password) },
    }
  },

  computed: {
    isRegistration() {
      return this.authType !== 'authorization'
    },

    emptyFieldExists() {
      let fields = [this.v$.email, this.v$.password]
      if (this.isRegistration)
        fields = [...fields, this.v$.name, this.v$.passwordRepeat]
      const emptyExists = fields.reduce((emptyExists, field) => emptyExists || Boolean(field?.required?.$invalid), false)

      return emptyExists
    }
  },

  methods: {
    ...mapActions(['updateUser', 'updateToken']),

    closeModal() {
      this.$emit('close:modal')
    },

    getErrors(vuelidate) {
      const validationRequired = this.isRegistration
      const errors = vuelidate.$silentErrors.map((error) => error.$message)
      console.log((validationRequired && errors) || [], errors)
      return (validationRequired && errors) || []
    },

    updatePasswordRepeatHandler() {
      if (this.password.length <= this.passwordRepeat.length)
        this.v$.passwordRepeat.$touch()
    },

    switchAuthType() {
      const types = Object.keys(this.authLabels)
      const current = types.indexOf(this.authType)

      this.authError = ''
      this.authType = types[(current + 1) % types.length] 
    },

    async submitHandler(e) {
      if (this.emptyFieldExists)
        return this.authError = 'Сначала заполните обязательные поля'

      let data, url
      if (this.isRegistration) {
        data = {
          username: this.name,
          email: this.email,
          phone: this.phone,
          password: this.password,
        }
        url = '/register'
      } else {
        data = {
          username: this.email,
          password: this.password,
        }
        url = '/login'
      }

      const loader = this.$loading.show({ container: e.target, canCancel: false })
      const response = await this.$axios.post(url, data)
        .then((res) => res.data)
        .catch((err) => err?.response?.status)

      switch (response) {
        case null:
          this.authError = 'Неизвестная ошибка'
          break

        case 400:
          if (this.isRegistration) {
            this.authError = 'Пользователь уже существует'
          }
          break

        case 404:
          if (!this.isRegistration) {
            this.authError = 'Неверный логин или пароль'
          }
          break

        case 422:
          this.authError = 'Кажется вы заполнили что-то неверно'
          break

        default:
          const token = `${response.token_type} ${response.access_token}`
          this.updateToken(token)
          this.$emit('update:user')
          this.$emit('close:modal')
      }
      loader.hide()
    },
  },

  watch: {
    emptyFieldExists(value) {
      if (value === false)
        this.authError = ''
    }
  },
}
</script>

<style lang="scss" scoped>
.auth {
  &__container {
    width: min(100%, 500px);
    max-height: 100%;
  }

  &__form {
    padding: 0.7em 2em 2em;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background-color: #fff;
  }

  &__error {
    margin: 0 0 0.7em;
    height: 1em;
    color: #ff3333;
    font-weight: 400;
  }

  &__switch {
    background-color: transparent;
    color: var(--primary-dark);
  }
}
</style>