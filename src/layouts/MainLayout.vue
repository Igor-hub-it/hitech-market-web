<template>
  <div class="main-layout">
    <v-header />
    <div class="navbar">
      <div class="accessories">
        <div class="accessories__CPU">процессор</div>
        <div class="accessories__cooler">кулер</div>
        <div class="accessories__MB">материнская плата</div>
        <div class="accessories__mem">опер. память</div>
        <div class="accessories__hdd">винчестер</div>
        <div class="accessories__ssd">ссд</div>
        <div class="accessories__gpu">видеопамять</div>
        <div class="accessories__frame">корпус</div>
        <div class="accessories__power">блок питания</div>
      </div>
    </div>

    <main></main>
  </div>
</template>

<script>
import vHeader from '@/components/vHeader.vue'

export default {
  components: {
    vHeader,
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