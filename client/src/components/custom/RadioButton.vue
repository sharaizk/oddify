<template>
  <label class="radio_btn" :class="variant">
    <input
      type="radio"
      :name="name"
      :checked="checked"
      @change="handleChange"
    />
    <span>
      <label class="sm text-capitalize">{{ label }}</label>
    </span>
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

    checked: {
      type: Boolean,
      default: false,
    },

    label: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    modelValue: {
      default: null,
    },
  },

  methods: {
    handleChange(e) {
      if (e.target.checked) {
        this.$emit("update:modelValue", this.label);
      }
    },
  },
};
</script>
