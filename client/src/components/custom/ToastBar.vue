<template>
  <transition
    :enter-active-class="animation.enter"
    :leave-active-class="animation.leave"
  >
    <div
      class="toasbar-container"
      :style="{ ...positionStyle }"
      v-if="getSnack.isOpen"
    >
      <div class="d-flex-row justify-start gap-10 flex-3">
        <bell-icon /> <label class="bold">{{ getSnack.title }}</label>
      </div>
      <hr class="horizontal" />
      <p class="medium">{{ getSnack.description }}</p>
    </div>
  </transition>
</template>

<script>
import BellIcon from "../icons/BellIcon.vue";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      timeoutInterval: null,
    };
  },
  components: {
    BellIcon,
  },
  methods: {
    close() {
      this.$store.commit("resetSnack");
      if (this.timeoutInterval) {
        clearTimeout(this.timeoutInterval);
      }
    },
  },
  watch: {
    "getSnack.isOpen"() {
      this.timeoutInterval = setTimeout(() => {
        this.close();
      }, this.getSnack.timeout);
    },
  },
  computed: {
    ...mapGetters(["getSnack"]),
    positionStyle() {
      if (this.getSnack.position === "bottom-left") {
        return { bottom: "3%", left: "3%" };
      } else if (this.getSnack.position === "top-left") {
        return { top: "3%", left: "3%" };
      } else if (this.getSnack.position === "top-right") {
        return { top: "3%", right: "3%" };
      } else if (this.getSnack.position === "bottom-right") {
        return { bottom: "3%", right: "3%" };
      } else return { bottom: "3%", left: "3%" };
    },

    animation() {
      switch (this.getSnack.position) {
        case "bottom-left":
        case "top-left":
          return {
            enter: "left-slide-in",
            leave: "left-slide-out",
          };
        case "top-right":
        case "bottom-right":
          return {
            enter: "right-slide-in",
            leave: "right-slide-out",
          };
        default:
          return {
            enter: "left-slide-in",
            leave: "left-slide-out",
          };
      }
    },
  },
};
</script>
