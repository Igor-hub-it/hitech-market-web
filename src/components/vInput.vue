<template>
  <div class="input-wrap" :class="{ wrong }">
    <input
      @keydown="onPhoneKeyDown"
      @paste="onPhonePaste"
      @change="inputChanged"
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
    <p class="input-wrap__error">
      <template v-if="wrong">
        <span v-for="(error, idx) in errors" :key="idx">{{ error }}</span>
      </template>
    </p>
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
    dirty: {
      type: Boolean,
      default: false,
    },
    errors: {
      type: Array,
      default: [],
    },
    type: {
      type: String,
      default: 'text',
    }
  },

  emits: ['update:modelValue', 'change'],

  data() {
    return {
      focused: false,
    }
  },

  computed: {
    wrong() {
      return this.dirty && this.errors.length !== 0
    }
  },

  methods: {
    updateValue(e) {
      if (this.type === 'tel') {
        this.onPhoneInput(e)
      }
      this.$emit('update:modelValue', e.target.value)
    },

    focus(e) {
      this.focused = true
    },

    unfocus(e) {
      this.focused = false
      this.$emit('change', e.target.value)
    },

    getInputNumbersValue(input) {
      return input.value.replace(/\D/g, '');
    },

    onPhonePaste(e) {
      if (this.type !== 'tel') return

      let input = e.target
      let inputNumbersValue = this.getInputNumbersValue(input)
      let pasted = e.clipboardData || window.clipboardData
      if (/\D/g.test(pasted?.getData('Text'))) 
        return input.value = inputNumbersValue
    },

    onPhoneInput(e) {
      if (this.type !== 'tel') return

      let input = e.target
      let inputNumbersValue = this.getInputNumbersValue(input)
      let selectionStart = input.selectionStart
      let formattedInputValue = ''

      if (!inputNumbersValue)
        return input.value = ''

      if (input.value.length != selectionStart) {
        if (e.data && /\D/g.test(e.data))
          input.value = inputNumbersValue
        return
      }

      if ('789'.includes(inputNumbersValue[0])) {
        if (inputNumbersValue[0] == '9')  
          inputNumbersValue = '7' + inputNumbersValue

        input.maxLength = (inputNumbersValue[0] == '8') ? 17 : 18 
        let firstSymbols = (inputNumbersValue[0] == '8') ? '8' : '+7'

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
      if (this.type !== 'tel') return

      let input = e.target
      let inputValue = input.value.replace(/\D/g, '')
      if (e.keyCode == 8 && inputValue.length == 1)
        return input.value = ''
    },
  }
}
</script>

<style lang="scss" scoped>
* {
  cursor: text;
}

$default: #848e99;
$default-border: #dde1e6;
$error: #ff3333;
$hover: #b4bbc3;
$focus: #1c3062;

.input-wrap {
  margin: 0 auto 0.7em;
  position: relative;
  width: 100%;
  max-height: 30%;

  &:first-child {
    margin-top: 0;
  }

  &.wrong {
    label {
      color: $error;
    }
    input,
    textarea {
      border-color: $error;
    }
  }

  &__field {
    padding: 22px 16px 10px;
    width: 100%;
    height: 100%;
    max-height: 55px;
    font: 16px "Roboto" 500;
    outline: none;
    border: solid 1px $default-border;
    border-radius: 1em;
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
    color: $default;
    left: 20px;
    top: 50%;
    transform: translateY(calc(-50% - 8px));
    transition: all 0.2s ease-in-out;
    pointer-events: none;

    &.active {
      font-size: 12px;
      top: 20px;
    }

    &.focus {
      color: $focus;
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