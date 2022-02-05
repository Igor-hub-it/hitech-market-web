<template>
  <div class="home">
    <div class="components">
      <router-link
        v-for="({ name, image }, key) in components"
        :key="name"
        :to="{ name: 'components-list', params: { componentName: key } }"
      >
        <button class="components__CPU component">
          <img :src="`${staticUrl}/${image}`" :alt="name" />
          <p class="component__CPU">{{ name }}</p>
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  setup() {
    return {
      staticUrl: process.env.VUE_APP_STATIC_URL,
    }
  },

  computed: {
    ...mapGetters(['components']),
  },
}
</script>

<style lang="scss" scoped>
.home {
  background-color: #f6f6f6;
  font-size: 18px;
}

.components {
  background-color: #f6f6f6;
  width: 80%;
  margin: auto;
  padding: 35px 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (max-width: 750px) {
    grid-template-columns: 1fr;
  }
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
  // border: 1px solid rgb(87, 87, 87);
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
