<template>
  <div
    class="input-field-containter"
    :class="[success && 'success', error && 'error']"
  >
    <label class="bold" v-if="label">{{ label }}</label>
    <div class="input-field">
      <component :is="leftIcon">{{ leftIcon }}</component>
      <input
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        @change="handleChange"
        @wheel="$event.target.blur()"
      />
      <component :is="rightIcon">{{ rightIcon }}</component>
      <success-icon v-if="success" />
      <error-icon v-if="error" />
    </div>
    <label class="input-message sm" v-if="message && !error">{{
      message
    }}</label>
    <label class="input-message sm" v-if="error">{{ error }}</label>
  </div>
</template>

<script>
import SuccessIcon from "../icons/SuccessIcon.vue";
import ErrorIcon from "../icons/ErrorIcon.vue";
export default {
  data() {
    return {};
  },
  props: {
    type: {
      type: String,
      default: "text",
    },
    label: {
      type: String,
      default: "",
    },
    message: {
      type: String,
      default: "",
    },
    error: {
      type: String,
      default: "",
    },
    success: {
      type: Boolean,
      default: false,
    },
    leftIcon: {
      default: null,
    },
    rightIcon: {
      default: null,
    },
    placeholder: {
      type: String,
      default: "",
    },
    modelValue: {
      default: null,
    },
  },
  methods: {
    handleChange($event) {
      if (this.type === "number") {
        this.$emit("update:modelValue", parseInt($event.target.value));
        return;
      }
      this.$emit("update:modelValue", $event.target.value);
    },
  },
  components: {
    SuccessIcon,
    ErrorIcon,
  },
};
</script>
