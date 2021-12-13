<template>
  <div class="header">
    <router-link :to="{ name: 'home' }">
      <button class="header__title">
        <p>Магазин компьютерных<br />комплектующих</p>
      </button>
    </router-link>
    <div class="header__content">
      <button @click.stop="profileHandler" class="header__LK">
        <img class="header__LK-img" src="/images/profile.png" alt="" />
      </button>
      <router-link :to="{ name: 'busket' }">
        <button class="header__basket">
          <img class="header__basket-img" src="/images/basket.png" alt="" />
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['click:profile'],

  methods: {
    profileHandler() {
      this.$emit('click:profile')
    }
  },
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 35px;
  background-color: #1c3062;
  color: white;

  &__title {
    border: 1.5px solid white;
    border-radius: 3px;
    padding: 5px;
    p {
      cursor: pointer;
    }
  }

  &__LK {
    // border: 2px solid white;
    background-color: white;
    color: white;
    border-radius: 50%;
    width: 45px;
    height: 45px;
    margin-right: 20px;

    &-img {
      width: 25px;
      height: 25px;
      cursor: pointer;
    }
  }

  &__basket {
    // border: 2px solid rgb(0, 0, 94);
    background-color: white;
    color: white;
    border-radius: 50%;
    width: 45px;
    height: 45px;

    &-img {
      cursor: pointer;
      width: 25px;
      height: 25px;
    }
  }
}
</style>