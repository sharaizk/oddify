<template>
  <label class="checkmark_container" :class="[variant]">
    <label class="sm text-capitalize">
      {{ label }}
    </label>
    <input type="checkbox" :checked="checked" @change="handleChange" />
    <span class="checkmark"></span>
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
      required: true,
    },
    modelValue: {
      default: null,
    },
    selectableValue: {
      required: true,
    },
  },

  methods: {
    handleChange(event) {
      if (this.modelValue !== null || this.modelValue !== undefined) {
        if (event.target.checked) {
          let updatedValue = [...this.modelValue, this.selectableValue];
          this.$emit("update:modelValue", updatedValue);
        } else {
          let updatedValue = this.modelValue.filter(
            (modelV) => modelV !== this.selectableValue
          );
          this.$emit("update:modelValue", updatedValue);
        }
      }
    },
  },

  computed: {
    checked() {
      return this.modelValue.includes(this.selectableValue);
    },
  },
};
</script>
