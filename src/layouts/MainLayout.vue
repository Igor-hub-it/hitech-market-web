<template>
  <div class="main-layout">
    <v-header @click:profile="profileHandler" />
    <router-view />
    <v-footer />
  </div>
</template>

<script>
import vHeader from '@/components/vHeader.vue'
import vFooter from '@/components/vFooter.vue'

export default {
  emits: ['click:profile'],

  components: {
    vHeader,
    vFooter
  },

  methods: {
    profileHandler() {
      this.$emit('click:modal', 'auth')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>