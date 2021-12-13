<template>
  <div class="main-layout">
    <v-header @click:profile="profileHandler" />
    <v-navbar />
    <router-view />
  </div>
</template>

<script>
import vHeader from '@/components/vHeader.vue'
import vNavbar from '@/components/vNavbar.vue'

export default {
  emits: ['click:profile'],

  components: {
    vHeader,
    vNavbar,
  },

  methods: {
    profileHandler() {
      this.$emit('click:modal', 'auth')
    }
  }
}
</script>

<style lang="scss" scoped>
.accessories {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 35px;
  background-color: rgb(95, 95, 95);
  color: white;
}
</style>