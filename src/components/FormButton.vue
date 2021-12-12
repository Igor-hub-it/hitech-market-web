<template>
  <div class="form-button">
    <button @click.stop="submit" type="submit" class="button">
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    submit() {
      this.$emit('submit')
    }
  }
}
</script>

<style lang="scss" scoped>
.form-button {
  margin-bottom: 15px;
  display: flex;
  width: 100%;
}

.button {
  margin: auto;
  padding: 0.5em 2em;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  color: #fff;
  background-color: #1c3062;
  transition: all 0.2s ease-in;

  &:hover {
    background-color: #223c80;
  }

  &:active {
    background-color: #3d5799;
  }
}
</style>