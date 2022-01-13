<template>
  <main>
    <div class="element">
      <div v-for="(item, idx) in stock" :key="idx" class="element__info">
        <img class="element__img-cmpnt" src="/images/Без названия.jpg" alt="">
        <div  class="element__description">{{ item.description }}</div>
        <div class="element__info">
          <div class="element__cost">Цена: {{ item.price }}</div>
          <button @click.stop="pushBasketHandler(item)" class="element__">&plus;</button>
        </div>
      </div>
      <div class="element__characteristic">
        <div class="element__data_left"><p>Сокет:</p></div>
        <div class="element__data_right"><p>B8120</p></div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
  main {
    height: 100vh;
    padding: 30px;
    background-color: #f6f6f6;
  }
  .element {
    width: 80%;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 30px;
    &__info, &__characteristic {
      padding: 30px;
      background: white;
      border-radius: 5px;
    }
    &__characteristic {
      display: flex;
      justify-content: space-between;
    }
  }
</style>