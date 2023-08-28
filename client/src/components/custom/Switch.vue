<template>
  <label class="switch" :class="[variant]">
    <label class="switch_label">{{ label }}</label>
    <input type="checkbox" :checked="modelValue" @change="handleChange" />
    <span class="slider"></span>
  </label>
</template>

<script>
export default {
  data() {
    return {};
  },

  props: {
    variant: {
      type: String,
      default: "primary",
    },
    label: {
      type: String,
      default: "",
    },
    modelValue: {
      default: null,
      required: true,
    },
  },

  methods: {
    handleChange(event) {
      this.$emit("update:modelValue", event.target.checked);
    },
  },
};
</script>
