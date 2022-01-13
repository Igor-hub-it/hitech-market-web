<template>
  <main>
    <div class="acsr-list">
      <div v-for="(item, idx) in stock" :key="idx" class="content__component component">
        <img class="component__img-cmpnt" src="/images/Без названия.jpg" alt="">
        <div class="component__description">Lorem ipsum dolor, sit amet consectetur adipisicing.</div>
        <div class="component__info">
          <div class="component__cost">Цена: {{ item.price }}</div>
          <button @click.stop="pushBasketHandler(item)" class="component__delete">&plus;</button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['basket']),
  },

  data() {
    return {
      stock: [],
    }
  },

  methods: {
    ...mapMutations(['pushBasket']),

    async loadStock() {
      const { component } = this.$route.params
      this.stock = this.$axios.get(`/components/${component}`)
        .then((res) => res.data)
        .catch((err) => console.warn(err))
    },

    pushBasketHandler(item) {
      this.pushBasket(item)
    }
  }
}
</script>

<style lang="scss" scoped>
  main {
    height: 100vh;
    background: #f6f6f6;
    padding: 30px 0;
  }
  .acsr-list {
    width: 80%;
    margin: auto;
    padding: 20px;
    border-radius: 5px;
    background: white;
  }
  .component {
    border: 0.5px solid #eee;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 20px;

    &__buying, &__info {
      display: flex;
      gap: 15px;
      justify-content: space-between;
      align-items: center;
    }

    img {
      height: 120px;
      width: 120px;
      border-radius: 5px;
    }
    &__description {
      padding-right: 15px;
    }
    &__delete {
      height: 50px;
      width: 50px;
      border: 1px solid #eee;
      margin-right: 20px;
      border-radius: 3px;
      background-color: #fff;
      font-size: 40px;
      @media screen and (max-width: 400px) {
        // : 20px;
        margin-bottom: 10px;
      }
    }
    &__delete:hover {
      border-radius: 3px;
      background-color: #eee;
    }

    &:hover {
      border: 0.1px solid #717bff;
    }
  }

  @media screen and (max-width: 900px) {
    .component {
      &__description {
        padding: 2em 16px;
        flex: 100%;
        text-align: center;
        order: 1000;
      }
    }
  }
</style>