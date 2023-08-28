<template>
  <div class="avatar" :class="[variant]">
    <img :src="image" alt="avatar-img" />
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    image: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=1380&t=st=1680943474~exp=1680944074~hmac=964e5a3166abc5ce2c0ad1aa615702010a18e55159df7212a099eac81b745c55",
    },

    variant: {
      type: String,
      default: "",
    },
  },
};
</script>
