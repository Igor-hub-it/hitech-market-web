<template>
  <div class="input-wrap" :class="{ wrong }">
    <input
      @keydown="onPhoneKeyDown"
      @paste="onPhonePaste"
      @input="updateValue"
      @focusout="unfocus"
      @focus="focus"
      :id="name"
      :name="name"
      :type="type"
      :value="modelValue"
      class="input-wrap__field"
    />
    <label
      :for="name"
      :class="{ active: modelValue || focused }"
      class="input-wrap__label"
    >
      <p v-if="wrong">{{ errors[0] }}</p>
      <p v-else><slot></slot></p>
    </label>
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
    errors: {
      type: Array,
      default: [],
    },
    type: {
      type: String,
      default: 'text',
    },
  },

  emits: ['update:modelValue', 'touch'],

  data() {
    return {
      focused: false,
    }
  },

  computed: {
    wrong() {
      return this.errors?.length > 0
    },
  },

  methods: {
    updateValue(e) {
      if (this.type === 'tel') this.onPhoneInput(e)

      this.$emit('update:modelValue', e.target.value)
    },

    focus(e) {
      this.focused = true
    },

    unfocus(e) {
      this.focused = false
      this.$emit('touch')
    },

    getInputNumbersValue(input) {
      return input.value.replace(/\D/g, '')
    },

    onPhonePaste(e) {
      let input = e.target
      let inputNumbersValue = this.getInputNumbersValue(input)
      let pasted = e.clipboardData || window.clipboardData
      if (/\D/g.test(pasted?.getData('Text')))
        return (input.value = inputNumbersValue)
    },

    onPhoneInput(e) {
      let input = e.target
      let inputNumbersValue = this.getInputNumbersValue(input)
      let selectionStart = input.selectionStart
      let formattedInputValue = ''

      if (!inputNumbersValue) return (input.value = '')

      if (input.value.length != selectionStart) {
        if (e.data && /\D/g.test(e.data)) input.value = inputNumbersValue
        return
      }

      if ('789'.includes(inputNumbersValue[0])) {
        if (inputNumbersValue[0] == '9')
          inputNumbersValue = '7' + inputNumbersValue

        input.maxLength = inputNumbersValue[0] == '8' ? 17 : 18
        let firstSymbols = inputNumbersValue[0] == '8' ? '8' : '+7'

        formattedInputValue = input.value = firstSymbols + ' '
        if (inputNumbersValue.length > 1)
          formattedInputValue += '(' + inputNumbersValue.substring(1, 4)

        if (inputNumbersValue.length >= 5)
          formattedInputValue += ') ' + inputNumbersValue.substring(4, 7)

        if (inputNumbersValue.length >= 8)
          formattedInputValue += '-' + inputNumbersValue.substring(7, 9)

        if (inputNumbersValue.length >= 10)
          formattedInputValue += '-' + inputNumbersValue.substring(9, 11)
      } else {
        formattedInputValue = '+' + inputNumbersValue.substring(0, 16)
        input.maxLength = 20
      }
      input.value = formattedInputValue
    },

    onPhoneKeyDown(e) {
      let input = e.target
      let inputValue = input.value.replace(/\D/g, '')
      if (e.keyCode == 8 && inputValue.length == 1) {
        input.value = ''
      }
      this.$emit('update:modelValue', input.value)
    },
  },
}
</script>

<style lang="scss" scoped>
* {
  cursor: text;
}

$default: #2c2c2c;
$default-stroke: #dde1e6;

$error: #d23737;
$error-text: #dc8f8f;
$error-bg: #fff3f3;
$error-stroke: #f38888;

$hover: #b4bbc3;
$focus: #838383;
$focus-text: #909090;

.input-wrap {
  margin: 0 auto 16px;
  position: relative;
  width: 100%;
  max-height: 30%;

  &:first-child {
    margin-top: 0;
  }

  &.wrong {
    input {
      color: $error-text;
    }
    label {
      color: $error;
    }
    input,
    textarea {
      background-color: $error-bg;
      border-color: $error;
    }
  }

  &__field {
    padding: 22px 16px 10px;
    width: 100%;
    height: 100%;
    max-height: 55px;
    font-size: 14px;
    font-family: 'SF Pro';
    font-weight: 300;
    outline: none;
    border: solid 1px $default-stroke;
    border-radius: 3px;
    transition: border 0.2s ease-in-out;

    &:hover {
      border: solid 1px $hover;
    }

    &:focus {
      border: solid 1px $focus;
    }
  }

  &__label {
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translateY(-50%);
    color: $default;
    font-size: 14px;
    font-family: 'SF Pro';
    font-weight: 300;
    transition: all 0.1s ease-out, color 0.2s ease-in-out;

    &.active {
      top: 12px;
      left: 16px;
      font-size: 12px;
    }

    &:focus {
      color: $focus-text;
    }
  }

  &__error {
    padding: 5px 15px 0;
    color: $error;
    font-size: 14px;
    height: 19px;
  }
}
</style>