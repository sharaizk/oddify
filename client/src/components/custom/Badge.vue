<template>
  <div class="badge">
    <label class="sm count">4</label>
    <slot></slot>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },
};
</script>
