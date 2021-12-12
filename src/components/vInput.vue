<template>
  <div class="input-wrap" :class="{ wrong: error != null }">
    <input
      @focus="focus"
      @focusout="unfocus"
      @input="updateValue"
      :id="name"
      :type="type"
      :value="modelValue"
      class="input-wrap__field"
    />
    <label
      :for="name"
      :class="{ active: modelValue || focused, focus: focused }"
      class="input-wrap__label"
    >
      <slot></slot>
    </label>
    <p class="input-wrap__error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: 'InputMask',

  props: {
    name: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
      required: true,
    },
    error: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: 'text',
    }
  },

  emits: ['update:modelValue'],

  data() {
    return {
      focused: false,
    }
  },

  methods: {
    updateValue(e) {
      this.$emit('update:modelValue', e.target.value)
    },

    focus(e) {
      this.focused = true
    },

    unfocus(e) {
      this.focused = false
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  cursor: text;
}

.input-wrap {
  margin: 0 auto 15px;
  position: relative;
  width: 100%;
  max-height: 30%;

  &:first-child {
    margin-top: 0;
  }

  &.wrong {
    label {
      color: #ed414f;
    }
    input,
    textarea {
      border-color: #ed414f;
    }
  }

  &__field {
    padding: 22px 16px 10px;
    width: 100%;
    height: 100%;
    max-height: 55px;
    font: 16px "Roboto" 500;
    outline: none;
    border: solid 1px #dde1e6;
    border-radius: 1em;
    transition: border 0.2s ease-in-out;

    &:hover {
      border: solid 1px #b4bbc3;
    }

    &:focus {
      border: solid 1px #1c3062;
    }
  }

  &__label {
    position: absolute;
    color: #848e99;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    transition: all 0.2s ease-in-out;
    pointer-events: none;

    &.active {
      font-size: 12px;
      top: 12px;
    }

    &.focus {
      color: #1c3062;
    }
  }

  &__error {
    color: #ed414f;
    font-size: 12px;
  }
}
</style>