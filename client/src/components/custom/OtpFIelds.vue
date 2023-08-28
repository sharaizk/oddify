<template>
  <div class="otp-form-container" :class="[error && 'error']">
    <label class="bold">OTP Code</label>

    <div class="opt-blocks-container" ref="otpCont">
      <input
        type="text"
        class="otp-block"
        maxlength="1"
        :key="digit"
        v-for="(digit, ind) in digitCount"
        @keydown="handleOtp($event, ind)"
        v-model="digits[ind]"
      />
    </div>
    <label class="input-message sm t-error" v-if="error">{{ error }}</label>
    <label class="input-message sm" v-if="message && !error">{{
      message
    }}</label>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      default: null,
    },
    error: {
      type: String,
      default: "",
    },
    message: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      digitCount: 4,
      digits: [],
    };
  },

  computed: {
    getToken() {
      let token = "";
      for (let i = 0; i < this.digitCount; i++) {
        token += this.digits[i];
      }
      return token;
    },
  },

  methods: {
    handleOtp(event, index) {
      if (
        event.key !== "Tab" &&
        event.key !== "ArrowRight" &&
        event.key !== "ArrowLeft"
      ) {
        event.preventDefault();
      }

      if (event.key === "Backspace") {
        this.digits[index] = null;
        this.$emit("update:modelValue", null);

        return;
      }

      if (new RegExp("^([0-9])$").test(event.key)) {
        this.digits[index] = event.key;
        if (index != this.digitCount - 1) {
          this.$refs.otpCont.children[index + 1].focus();
        }
      }
      this.$emit("update:modelValue", parseInt(this.digits.join("")));
    },
  },
};
</script>
