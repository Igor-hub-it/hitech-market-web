<template>
  <div class="home">
    <div class="components">
      <router-link :to="{ name: 'shop' }">
        <button class="components__CPU component">
          <img src="/images/cpu.png" alt="">
          <p class="component__CPU">Процессор</p></button>
      </router-link>
      <router-link :to="{ name: 'shop' }">
        <button class="components__cooler component">
          <img src="/images/cooler.png" alt="">
          <p class="component__cooler">Кулер</p></button>
      </router-link>
      <router-link :to="{ name: 'shop' }">
      <button class="components__MB component">
        <img src="/images/mother.png" alt="">
        <p class="component__MB">Материнская плата</p></button>
      </router-link>
      <router-link :to="{ name: 'shop' }">
      <button class="components__mem component">
        <img src="/images/ram.png" alt="">
        <p class="component__mem">Оперативная память</p></button>
      </router-link>
      <router-link :to="{ name: 'shop' }">
      <button class="components__hdd component">
        <img src="/images/hdd.png" alt="">
        <p class="component__hdd">Жесткий диск</p></button>
      </router-link>
      <router-link :to="{ name: 'shop' }">
      <button class="components__ssd component">
        <img src="/images/" alt="">
        <p class="component__ssd">SSD Накопитель</p></button>
      </router-link>
      <router-link :to="{ name: 'shop' }">
      <button class="components__gpu component">
        <img src="" alt="">
        <p class="component__gpu">Видеопамять</p></button>
      </router-link>
      <router-link :to="{ name: 'shop' }">
      <button class="components__frame component">
        <img src="/images/case.png" alt="">
        <p class="component__frame">Корпус</p></button>
      </router-link>
      <router-link :to="{ name: 'shop' }">
      <button class="components__power component">
        <img src="" alt="">
        <p class="component__power">Блок питания</p></button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss">
  .home {
    background-color: #f6f6f6;
  }

  .components {
    background-color: #f6f6f6;
    width: 80%;
    margin: auto;
    padding: 35px 50px 0 50px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 25px;
  }

  .component {
    width: 280px;
    height: 280px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    border: 1px solid rgb(87, 87, 87);
    border-radius: 20px;
    img {
      width: 90%;
      cursor: pointer;
    }
  }

  .component:hover {
    box-shadow: 0px 10px 16px 0px rgba(71, 83, 93, 0.07);
  }
</style>
