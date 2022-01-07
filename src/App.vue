<template>
  <div id="app">
    <component :is="layout" @click:modal="openModal" />
    <v-auth
      v-if="showModal.auth"
      @close:modal="closeModal('auth')"
      @update:user="updateUser"
      class="modal"
    ></v-auth>
  </div>
</template>

<script>
import EmptyLayout from '@/layouts/EmptyLayout'
import MainLayout from '@/layouts/MainLayout'
import vAuth from '@/components/vAuth.vue'

export default {
  components: {
    EmptyLayout,
    MainLayout,
    vAuth,
  },

  data() {
    return {
      showModal: {
        auth: false,
      },
    }
  },

  computed: {
    layout() {
      return (this.$route.meta.layout || 'empty') + '-layout'
    },
  },

  methods: {
    updateUser() {
      // write it later
    },

    openModal(name) {
      this.showModal[name] = true
    },

    closeModal(name) {
      this.showModal[name] = false
    },
  },
}
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
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