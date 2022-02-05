<template>
  <div class="component-card">
    <img
      @click.stop="showDetailHandler"
      :src="image"
      class="component-card__image"
    />
    <p @click.stop="showDetailHandler" class="component-card__name">
      {{ brand }} {{ name }}
    </p>
    <div class="component-card__info">
      <div class="component-card__cost">Цена: {{ price }}р</div>
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
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    brand: String,
    image: String,
    price: Number | String,
    inBasket: Boolean,
  },

  emit: ['click:basket', 'click:detail'],

  methods: {
    pushBasketHandler() {
      this.$emit('click:basket')
    },

    showDetailHandler() {
      this.$emit('click:details')
    },
  },
}
</script>

<style lang="scss" scoped>
.component-card {
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 8px;
  height: 300px;
  width: 230px;
  box-shadow: 1px 2px 4px rgba(#000, 0.1);
  border-radius: 3px;

  &__image {
    width: 100%;
    flex: 1 1 auto;
    object-fit: contain;
    object-position: top;
    cursor: pointer;
  }

  &__name {
    cursor: pointer;
  }

  &__info {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 0 8px;
  }

  &__cost {
    flex: 1 1 auto;
    text-align: left;
  }

  &__assembly,
  &__basket {
    width: 25px;
    aspect-ratio: 1 / 1;
    font-size: 20px;
    border-radius: 2px;
    background-color: transparent;
    transition: 0.25s;

    &:hover {
      transform: translateY(-2px);
    }

    img {
      height: 100%;
      width: 100%;
      object-fit: contain;
      object-position: center;
      cursor: pointer;
    }
  }

  &__assembly {
    padding: 3px;
  }
}
</style>