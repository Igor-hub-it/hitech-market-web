<template>
  <main
    ref="content"
    :class="{ 'vld-transparent': transparent }"
    class="vld-parent"
  >
    <transition v-show="loaded" name="longfade">
      <div>
        <slot />
      </div>
    </transition>
  </main>
</template>

<script>
export default {
  props: {
    transparent: {
      type: Boolean,
      default: true,
    },
    loaded: {
      type: Boolean,
      default: true,
    },
  },

  mounted() {
    if (this.loaded === false) {
      this.loader = this.$loading.show({
        container: this.$refs.content,
        canCancel: false,
      })
    }
  },

  data() {
    return {
      loader: null,
    }
  },

  watch: {
    loaded(value) {
      console.log('updated', this.loader)
      if (value === true) {
        this.loader.hide()
        this.loader = null
      }
    },
  },
}
</script>