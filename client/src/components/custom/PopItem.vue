<template>
  <div class="backgroud_mask_drop" @click="setOpen" v-if="isOpen" />

  <transition name="slide-fade-top">
    <div :class="type" class="pop_item_container" ref="popitem" v-if="isOpen">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  displayName: "PopItem",
  data() {
    return {
      anchorRect: null,
      selfRect: null,
    };
  },

  props: ["isOpen", "setOpen", "anchorEl", "type"],

  methods: {
    getPosition(anchorRect, selfRect) {
      //   let selfLeft = 0;
      //   let selfTop = 0;
      //   let selfWidth = 0;
      //   let x = 0;
      //   let y = 0;
      //   if (anchorRect && selfRect) {
      //     selfLeft = anchorRect?.left;
      //     selfTop = anchorRect?.bottom;
      //     selfWidth = selfRect?.width;
      //     x = anchorRect.x;
      //     y = anchorRect.y;
      //   }
      const { width } = selfRect;
      const { x, y } = anchorRect;
      console.log(width);
      if (x > y && this.$refs.popitem) {
        this.$refs.popitem.style.right = "0px";
      } else if (this.$refs.popitem) {
        this.$refs.popitem.style.left = "0px";
      }
    },
    setBounds() {
      if (this.$refs.popitem) {
        this.selfRect = this.$refs.popitem.getBoundingClientRect();
      }
      if (this.anchorEl) {
        this.anchorRect = this.anchorEl.getBoundingClientRect();
      }
      this.getPosition(this.anchorRect, this.selfRect);
    },
  },
  watch: {
    anchorEl() {
      this.$nextTick(function () {
        this.setBounds();
      });
    },
  },
};
</script>
