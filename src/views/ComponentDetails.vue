<template>
  <loading-content :loaded="contentReady">
    <main class="component">
      <p v-if="loadingError" class="loading-error">Что-то пошло не так</p>
      <template v-else>
        <img class="component__img" :src="component" alt="Фото продукта" />
        <p class="component__name">{{ component?.name }}</p>
        <p class="component__description">{{ component?.description }}</p>
        <div class="component__info">
          <div class="component__cost">Цена: {{ component?.price }}р</div>
          <button
            @click.stop="pushBasketHandler"
            class="component-card__assembly"
            title="Зарегистрировать в сборке"
          >
            <img src="/images/add.svg" alt="&plus;" />
          </button>
          <button
            @click.stop="pushBasketHandler"
            class="component-card__basket"
            title="Добавить в корзину"
          >
            <img src="/images/basket.svg" alt="&plus;" />
          </button>
        </div>
        <div class="component__specifications specifications">
          <div
            v-for="(spec, text, idx) in specifications"
            :key="idx"
            class="specifications__item"
          >
            <p class="specifications__title">{{ spec }}</p>
            <p class="specifications__description">{{ text }}</p>
          </div>
        </div>
      </template>
    </main>
  </loading-content>
</template>

<script>
import LoadingContent from '@/components/LoadingContent.vue'
import { mapMutations } from 'vuex'

export default {
  components: {
    LoadingContent,
  },

  created() {
    this.loadComponent()
  },

  data() {
    return {
      component: null,
      loadingError: false,
    }
  },

  computed: {
    contentReady() {
      return this.component != null || this.loadingError
    },

    specifications() {
      const specs = { ...this.component }
      delete specs.name
      delete specs.brand
      delete specs.price
      delete specs.image

      return specs
    },
  },

  methods: {
    ...mapMutations(['pushBasket']),

    async loadComponent() {
      const { componentName, componentId } = this.$route.params
      this.component = await this.$axios
        .get(`/components/${componentName}/${componentId}`)
        .then((res) => res.data)
        .catch(() => null)

      console.log(this.component)
      if (this.component == null) {
        this.loadingError = true
      }
    },

    pushBasketHandler(item) {
      this.pushBasket(item._id)
    },
  },
}
</script>

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
  &__info,
  &__characteristic {
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