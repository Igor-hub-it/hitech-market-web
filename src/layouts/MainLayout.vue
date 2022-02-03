<template>
  <div class="main-layout">
    <v-header @click:profile="profileHandler" />
    <router-view />
    <v-footer />
  </div>
</template>

<script>
import vHeader from '@/components/Header.vue'
import vFooter from '@/components/Footer.vue'

export default {
  emits: ['click:profile'],

  components: {
    vHeader,
    vFooter,
  },

  methods: {
    profileHandler() {
      this.$emit('click:modal', 'auth')
    },
  },
}
</script>

<style lang="scss" scoped>
</style>