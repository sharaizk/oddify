<template>
  <div class="header">
    <top-bar />
    <hr class="horizontal" />
    <bottom-bar />
  </div>
</template>

<script>
import TopBar from "./Header/TopBar.vue";
import BottomBar from "./Header/BottomBar.vue";
export default {
  data() {
    return {};
  },
  components: {
    TopBar,
    BottomBar,
  },
};
</script>
