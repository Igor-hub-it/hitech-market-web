<template>
  <main class="modal auth">
    <div class="modal__container auth__container">
      <form @submit.prevent="submitHandler" class="auth__form">
        <v-input
          v-if="inputVisible"
          v-model="name"
          :name="'name'"
          class="auth__field"
          >Имя*</v-input
        >
        <v-input
          v-model="email"
          :name="'email'"
          :type="'email'"
          class="auth__field"
          >Email*</v-input
        >
        <v-input
          v-model="password"
          :name="'password'"
          :type="'password'"
          class="auth__field"
          >Пароль*</v-input
        >
        <v-input
          v-if="inputVisible"
          v-model="passwordRepeat"
          :name="'passwordRepeat'"
          :type="'password'"
          class="auth__field"
          >Повтор пароля*</v-input
        >
        <form-button class="auth__submit">{{
          authLabels[authType].submit
        }}</form-button>
        <button @click.stop="switchAuthType" class="auth__switch">
          {{ authLabels[authType].switch }}
        </button>
        <router-link :to="{ name: 'home' }">
          <button class="auth__continue">Продолжить<br>без авторизации</button>
        </router-link>
      </form>
    </div>
  </main>
</template>

<script>
import FormButton from '@/components/FormButton.vue'
import vInput from '@/components/vInput.vue'

export default {
  components: {
    FormButton,
    vInput,
  },

  setup() {
    return {
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
      name: '',
      email: '',
      password: '',
      passwordRepeat: '',
    }
  },

  computed: {
    inputVisible() {
      return this.authType !== 'authorization'
    }
  },

  methods: {
    switchAuthType() {
      const types = Object.keys(this.authLabels)
      const current = types.indexOf(this.authType)

      this.authType = types[ (current + 1) % types.length] 
    },

    submitHandler() {
      let data = {
        full_name: this.name,
        email: this.email,
        password: this.password,
      }
      let url = '/user/resister'
      if (this.authType === 'authorization') {
        data = {
          username: this.email,
          password: this.password,
        }
        url = '/user/login'
      }
      
      const response = this.$axios.post(url, data)
        .then((res) => res.data)
        .catch((err) => err?.response?.status)

      switch (response) {
        case null:
          //Throw alert Чтото пошло не так
          break;

        case 404:
          //Throw alert Ошибка поля
          break;

        default:
          break;
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.auth {
  .auth__container {
    width: Min(100%, 500px);
    margin: auto;
    padding-top: 50px;
    max-height: 100%;
  }

  &__form {
    padding: 2em;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background-color: #fff;
  }

  &__switch {
    background-color: transparent;
    color: var(--primary-dark);
  }

  &__continue {
    margin-top: 15px;
    background-color: transparent;
  }
}
</style>