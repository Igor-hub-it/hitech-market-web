<template>
  <div class="main-layout">
    <v-header />
    <v-navbar />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import vHeader from '@/components/vHeader.vue'
import vNavbar from '@/components/vNavbar.vue'

export default {
  components: {
    vHeader, vNavbar,
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