<template>
  <main @click.self="closeModal" class="auth modal">
    <div class="auth__container modal__container">
      <form @submit.prevent="submitHandler" class="auth__form">
        <p class="auth__message" :class="{ error: authError || message }">
          {{ authError || message || authLabels[authType]?.title }}
        </p>
        <v-input
          v-if="isRegistration"
          v-model.trim="name"
          @update:modelValue="v$.name.$touch"
          @touch="v$.name.$touch"
          :errors="getErrors(v$.name)"
          :name="'name'"
          class="auth__field"
          >Имя Фамилия*</v-input
        >
        <v-input
          v-model.trim="email"
          @update:modelValue="v$.email.$touch"
          @touch="v$.email.$touch"
          :errors="getErrors(v$.email)"
          :name="'email'"
          :type="'email'"
          class="auth__field"
          >Email*</v-input
        >
        <v-input
          v-if="isRegistration"
          v-model.trim="phone"
          @update:modelValue="v$.phone.$touch"
          @touch="v$.phone.$touch"
          :errors="getErrors(v$.phone)"
          :name="'phone'"
          :type="'tel'"
          class="auth__field"
          >Телефон*</v-input
        >
        <v-input
          v-if="!isRecovery"
          v-model="password"
          @update:modelValue="v$.password.$touch"
          @touch="v$.password.$touch"
          :errors="getErrors(v$.password)"
          :name="'password'"
          :type="'password'"
          class="auth__field"
          >Пароль*</v-input
        >
        <v-input
          v-if="isRegistration"
          v-model="passwordRepeat"
          @update:modelValue="updatePasswordRepeatHandler"
          @touch="v$.passwordRepeat.$touch"
          :errors="getErrors(v$.passwordRepeat)"
          :name="'passwordRepeat'"
          :type="'password'"
          class="auth__field"
          >Повтор пароля*</v-input
        >
        <p v-if="isRegistration" class="auth__button auth__privacy-agree">
          Нажимая на кнопку зарегистрироваться вы соглашаетесь с
          <button @click.stop="showPrivacy" type="button" class="auth__link">
            Политикой конфиденциальности
          </button>
        </p>
        <form-button class="auth__submit">{{
          authLabels[authType].submit
        }}</form-button>
        <button
          v-if="!isAuthorization"
          @click.stop="switchToLogin"
          type="button"
          class="auth__button"
        >
          Войти в аккаунт
        </button>
        <button
          v-if="!isRegistration"
          @click.stop="switchToRegister"
          type="button"
          class="auth__button"
        >
          Создать аккаунт
        </button>
      </form>
    </div>
  </main>
</template>

<script>
import FormButton from '@/components/FormButton.vue'
import vInput from '@/components/Input.vue'
import { mapMutations } from 'vuex'
import useVuelidate from '@vuelidate/core'
import {
  helpers,
  email,
  required,
  minLength,
  maxLength,
  sameAs,
} from '@vuelidate/validators'

export default {
  props: {
    message: String,
  },

  emits: ['close:modal', 'update:user'],

  components: {
    FormButton,
    vInput,
  },

  inject: ['axiosNotify'],

  setup() {
    return {
      v$: useVuelidate(),
      authLabels: {
        authorization: {
          title: 'Авторизация',
          submit: 'Войти',
        },
        registration: {
          title: 'Регистрация',
          submit: 'Зарегистрироваться',
        },
      },
    }
  },

  data() {
    return {
      authType: 'authorization',
      authError: null,
      name: '',
      email: '',
      phone: '',
      password: '',
      passwordRepeat: '',
    }
  },

  validations() {
    const numberCaser = (number) => {
      const lastDigit = number % 10
      if (lastDigit === 1) return 'Символ'
      if (lastDigit > 1 && lastDigit < 5) return 'Символа'
      return 'Символов'
    }
    const needValidation = (validator) => {
      const helper = validator.$validator
      validator.$validator = (value) => !this.isRegistration || helper(value)

      return validator
    }

    const minPassword = 8
    const maxPassword = 30
    const minName = 4
    const maxName = 30

    return {
      name: {
        required: helpers.withMessage(
          'Имя Фамилия - обязательное поле',
          needValidation(required)
        ),
        minLength: helpers.withMessage(
          (field) =>
            `Минимальная длина имени ${field.$params.min} ${numberCaser(
              field.$params.min
            )}`,
          needValidation(minLength(minName))
        ),
        maxLength: helpers.withMessage(
          (field) =>
            `Максимальная длина имени ${field.$params.max} ${numberCaser(
              field.$params.max
            )}`,
          needValidation(maxLength(maxName))
        ),
      },
      email: {
        required: helpers.withMessage(
          'Электронная почта - обязательное поле',
          required
        ),
        email: helpers.withMessage(
          'Неверный формат электронной почты',
          needValidation(email)
        ),
      },
      phone: {
        required: helpers.withMessage(
          'Телефон - обязательное поле',
          needValidation(required)
        ),
      },
      password: {
        required: helpers.withMessage('Пароль - обязательное поле', required),
        minLength: helpers.withMessage(
          (field) =>
            `Минимальная длина пароля ${field.$params.min} ${numberCaser(
              field.$params.min
            )}`,
          needValidation(minLength(minPassword))
        ),
        maxLength: helpers.withMessage(
          (field) =>
            `Максимальная длина пароля ${field.$params.max} ${numberCaser(
              field.$params.max
            )}`,
          needValidation(maxLength(maxPassword))
        ),
      },
      passwordRepeat: {
        required: helpers.withMessage(
          'Подтверждение пароля - обязательное поле',
          needValidation(required)
        ),
        sameAs: helpers.withMessage(
          'Пароли не совпадают',
          needValidation(sameAs(this.password))
        ),
      },
    }
  },

  computed: {
    isRegistration() {
      return this.authType === 'registration'
    },
    isAuthorization() {
      return this.authType === 'authorization'
    },
    isRecovery() {
      return this.authType === 'recovery'
    },
  },

  methods: {
    ...mapMutations(['updateUser', 'updateToken']),

    closeModal() {
      this.$emit('close:modal')
    },

    showPrivacy() {
      this.showModal('privacy')
    },

    getErrors(vuelidatable) {
      return vuelidatable?.$errors?.map((err) => err.$message)
    },

    updatePasswordRepeatHandler() {
      if (this.password.length <= this.passwordRepeat.length)
        this.v$.passwordRepeat.$touch()
    },

    switchToRegister() {
      this.authType = 'registration'
      this.switchAuthType()
    },
    switchToLogin() {
      this.authType = 'authorization'
      this.switchAuthType()
    },
    switchAuthType() {
      this.v$.$reset()
      this.authError = null
    },

    async submitHandler(e) {
      if (!(await this.v$.$validate())) return

      let data = {},
        options = {},
        url = '/user'
      if (this.isRegistration) {
        data = {
          name: this.name,
          email: this.email.toLowerCase(),
          phone: this.phone,
          password: this.password,
        }
        url += '/register'
      } else if (this.isAuthorization) {
        data = {
          email: this.email.toLowerCase(),
          password: this.password,
        }
        url += '/login'
      } else {
        return (this.authError = 'Кажется что-то сломалось. Обновите страницу')
      }

      const loader = this.$loading.show({
        container: e.target,
        canCancel: false,
      })
      const response = await this.$axios
        .post(url, data, options)
        .then((res) => {
          console.log(res)
          return { message: res.data, status: res.status }
        })
        .catch((err) => ({
          message: err?.response?.data.detail,
          status: err?.response?.status,
        }))

      loader.hide()

      if (response.status >= 400) {
        if (response.message instanceof Array)
          return (this.authError = 'Что-то пошло не так')

        const res =
          response.message === 'Not authorized'
            ? 'Неверный логин или пароль'
            : response.message
        if (res) this.authError = res || 'Что-то пошло не так'
        return
      }

      const token = `bearer ${response.message.accessToken}`
      this.updateToken(token)
      this.$emit('update:user')
      this.$emit('close:modal')
    },
  },

  watch: {
    'v$.$errors'(errors) {
      if (errors.length === 0) this.authError = null
    },
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
    padding: 0 32px 32px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;
    border-radius: 1px;
    background-color: #fff;
  }

  &__message {
    margin: 24px 0;
    font-weight: 700;
    font-size: 20px;

    &.error {
      color: #c72727;
    }
  }

  &__submit {
    font-size: 24px;
    font-weight: 700;
  }

  &__button {
    margin: 10px 0 0;
    color: var(--font-dark);
    font-weight: 300;
    font-size: 14px;
    background-color: transparent;
  }

  &__privacy-agree {
    margin: 0;
    text-align: center;
  }

  &__link {
    font-size: inherit;
    font-weight: 500;
    font-family: inherit;
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-decoration-color: var(--primary-dark);
    color: var(--primary-dark);
    background-color: transparent;
  }
}
</style>