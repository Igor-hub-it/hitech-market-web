<template>
  <div id="app">
    <v-header @click:profile="openModal('auth')" />
    <router-view />
    <v-footer />

    <transition name="fade">
      <v-auth
        v-if="authModal?.active"
        @close:modal="closeModal('auth')"
        @update:user="userByToken"
        :message="authModal?.message"
        class="modal"
      />
    </transition>
  </div>
</template>

<script>
import vHeader from '@/components/Header.vue'
import vFooter from '@/components/Footer.vue'
import vAuth from '@/components/Auth.vue'
import { mapMutations, mapGetters } from 'vuex'

export default {
  components: {
    vHeader,
    vFooter,
    vAuth,
  },

  provide() {
    return {
      axiosNotify: this.axiosNotify,
      logout: this.logoutHandler,
      syncUser: this.userByToken,
    }
  },

  created() {
    this.userByToken()
    this.loadComponents()
  },

  data() {
    return {
      catalog: null,
    }
  },

  computed: {
    ...mapGetters(['token', 'modal']),

    userLogedIn() {
      return this.user != null
    },

    authModal() {
      return this.modal?.auth
    },
  },

  methods: {
    ...mapMutations([
      'updateComponents',
      'updateUser',
      'updateToken',
      'showModal',
      'hideModal',
      'updateModalMessage',
    ]),

    async loadComponents() {
      const components = await this.$axios
        .get('/catalog')
        .then((res) => res.data)
        .catch((err) => console.warn(err))

      this.updateComponents(components)
    },

    async getUser() {
      return await this.$axios
        .get('/user')
        .then((res) => res.data)
        .catch(() => null)
    },

    setupToken() {
      this.$axios.defaults.headers.Authorization = `${this.token}`
    },

    async userByToken() {
      if (this.token == null) return

      this.setupToken()

      let user = await this.getUser()

      console.log(user)

      if (user) {
        return this.updateUser(user)
      }

      const token = this.$axios
        .post('/user/refresh')
        .then((res) => res.data)
        .catch(() => null)

      this.updateToken(token)
      this.setupToken()

      user = await this.getUser()

      if (user) {
        return this.updateUser(user)
      }

      this.updateModalMessage({
        modalName: 'auth',
        message: 'Ваша сессия истекла',
      })
    },

    logoutHandler() {
      this.$axios.defaults.headers.Authorization = null
      this.updateUser(null)
      this.updateToken(null)
    },

    axiosNotify(response, successMessage) {
      let type, notify, returnValue
      if (response === true) {
        notify = {
          title: 'Успех',
          description: successMessage,
        }
        type = 'success'
        returnValue = true
      } else {
        notify = {
          title: 'Ошибка',
          description: response || 'Неизвестная ошибка',
        }
        type = 'danger'
        returnValue = false
      }

      const getToastOptions = (timeout, type = 'default') => ({
        position: 'bottom-right',
        type,
        transition: 'bounce',
        timeout,
      })

      this.moshaToast(notify, getToastOptions(7000, type))

      return returnValue
    },

    openModal(name) {
      this.showModal(name)
    },

    closeModal(name) {
      this.hideModal(name)
    },
  },

  watch: {
    '$route.query.show'(modalName, oldModalName) {
      this.closeModal(oldModalName)
      this.openModal(modalName)
    },
  },
}
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  font-family: 'PT Sans', Open Sans;
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;700&family=PT+Sans:wght@400;700&display=swap');
}

.modal {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  cursor: pointer;

  .container {
    max-width: 100%;
    max-height: 100%;
    overflow: auto;
  }
}

.vld-container {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(3, 3, 3, 0.16);
  z-index: 1000;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>