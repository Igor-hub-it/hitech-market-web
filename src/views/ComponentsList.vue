<template>
  <main>
    <div class="acsr-list">
      <div
        v-for="(item, idx) in stock"
        :key="idx"
        class="content__component component"
      >
        <component-card
          @click:basket="pushBasketHandler(item._id)"
          @click:details="pushDetailsViewHandler(item._id)"
          :brand="item.brand"
          :name="item.name"
          :image="item.image"
          :price="item.price"
          :inBasket="itemInBasket(item._id)"
        />
      </div>
    </div>
  </main>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import ComponentCard from '@/components/ComponentCard.vue'

export default {
  components: {
    ComponentCard,
  },

  setup() {
    return {
      staticUrl: process.env.VUE_APP_STATIC_URL,
    }
  },

  created() {
    this.loadStock()
  },

  data() {
    return {
      stock: [],
    }
  },

  computed: {
    ...mapGetters(['basket']),

    componentName() {
      return this.$route.params.componentName
    },
  },

  methods: {
    ...mapMutations(['pushBasket']),

    async loadStock() {
      this.stock = await this.$axios
        .get(`/components/${this.componentName}`)
        .then((res) => res.data)
        .catch((err) => console.warn(err))
    },

    pushDetailsViewHandler(componentId) {
      this.$router.push({
        name: 'component-details',
        params: { componentName: this.componentName, componentId },
      })
    },

    pushBasketHandler(componentId) {
      this.pushBasket(componentId)
    },

    itemInBasket(componentId) {
      return this.basket.includes(componentId)
    },
  },

  watch: {
    $route() {
      this.loadStock()
    },
  },
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
</style>