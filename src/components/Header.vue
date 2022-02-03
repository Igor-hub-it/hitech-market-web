<template>
  <header class="header">
    <div class="supheader">
      <router-link :to="{ name: 'home' }">
        <div class="supheader__logo-and-discriptor">
          <button class="supheader__logo">
            <p>КK</p>
          </button>
          <p class="supheader__discriptor">Магазин Компьютерных Комплекующих</p>
        </div>
      </router-link>
      <div class="supheader__content">
        <button @click.stop="profileHandler" class="supheader__LK">
          <img class="supheader__LK-img" src="/images/profile.png" alt="" />
        </button>
        <router-link :to="{ name: 'basket' }">
          <button class="supheader__basket">
            <img
              class="supheader__basket-img"
              src="/images/basket.png"
              alt=""
            />
          </button>
        </router-link>
      </div>
      <button class="supheader__burger" @click.stop="toggleNavbarHandler">
        &#9776;
      </button>
    </div>
    <v-navbar :class="{ active: navbarActive }" />
  </header>
</template>

<script>
import vNavbar from '@/components/Navbar.vue'

export default {
  components: {
    vNavbar,
  },

  emits: ['click:profile'],

  data() {
    return {
      navbarActive: false,
    }
  },

  methods: {
    profileHandler() {
      this.$emit('click:profile')
    },
    toggleNavbarHandler() {
      this.navbarActive = !this.navbarActive
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  display: block;
  width: 100%;
  height: auto;
}

.supheader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 35px;
  background-color: #1c3062;
  color: white;
  z-index: 4;

  &__logo-and-discriptor {
    display: flex;
  }

  &__logo {
    width: 45px;
    height: 45px;
    border-radius: 3px;
    padding: 5px;
    p {
      font-size: 25px;
      font-weight: 700;
      cursor: pointer;
    }
  }

  &__discriptor {
    @media screen and (max-width: 750px) {
      display: none;
    }
    margin-left: 20px;
    display: flex;
    align-items: flex-end;
    color: white;
    font-size: 17px;
  }

  &__content {
    display: flex;
    gap: 20px;
  }

  &__LK {
    background-color: white;
    color: white;
    border-radius: 50%;
    width: 45px;
    height: 45px;
    &-img {
      width: 25px;
      height: 25px;
      cursor: pointer;
    }
  }

  &__basket {
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
  &__burger {
    background-color: #1c3062;
    color: white;
    font-size: 30px;
    @media screen and (min-width: 900px) {
      display: none;
    }
  }
}
</style>