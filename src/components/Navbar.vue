<template>
  <div class="navbar">
    <div class="accessories">
      <router-link
        v-for="({ name }, key) in components"
        :key="name"
        class="accessories__CPU acsr"
        :to="{ name: 'components-list', params: { componentName: key } }"
        >{{ name }}</router-link
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['components']),
  },
}
</script>


<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;700&family=PT+Sans&display=swap');
.accessories {
  padding: 0 35px;
  height: 42.5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Open Sant', PT Sans;
  color: rgb(95, 95, 95);
  background-color: white;

  @media screen and (max-width: 900px) {
    height: 100%;
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}
.burger {
  margin: 10px 0;
  display: flex;
  justify-content: center;
}
.acsr {
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  color: #4d4d4d;

  &:hover::after {
    width: 100%;
  }

  &::after {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 2px;
    width: 0;
    background-color: rgb(0, 0, 80);
    transition: 0.2s ease;
  }
}

.navbar {
  @media screen and (max-width: 900px) {
    position: fixed;
    top: calc(-100% - 50px);
    left: 0;
    right: 0;
    transition: 0.9s linear;
    z-index: 2;
  }
  &.active {
    top: 85px;
  }
}
</style>