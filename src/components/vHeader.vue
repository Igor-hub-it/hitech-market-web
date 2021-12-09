<template>
  <div class="header">
    <div class="header__title">
      <p>Магазин компьютерных<br />комплектующих</p>
    </div>
    <div class="header__content">
      <button class="header__LK">
        <img class="header__LK-img" src="/images/profile.png" alt="" />
      </button>
      <button class="header__basket">
        <img class="header__basket-img" src="/images/basket.png" alt="" />
      </button>
    </div>
  </div>
</template>

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
      width: 25px;
      height: 25px;
    }
  }
}
</style>