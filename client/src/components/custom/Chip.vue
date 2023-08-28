<template>
  <div class="chip_container" :class="[variant]">
    <label class="sm">{{ text }}</label>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  props: {
    text: {
      type: String,
      default: "",
    },
    variant: {
      type: String,
      default: "primary",
    },
  },
};
</script>
