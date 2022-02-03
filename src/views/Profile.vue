<template>
  <div class="profile"></div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.profile {
  &__title {
    margin: Min(7vmin, 40px) 0;
  }

  &__link {
    padding: 16px 40px;
    color: #fff;
    background-color: var(--primary-dark);
    font-weight: 500;
    font-size: 20px;
    cursor: pointer;
    text-shadow: 1px 1px 2px rgba(#000, 0.05);
  }
}
</style>