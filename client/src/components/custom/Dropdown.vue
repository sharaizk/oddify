<template>
  <div
    class="dropdown_container"
    :class="[isOpen && 'active']"
    @click="toggleDropdown"
    v-click-out-side="closeDrop"
  >
    <label class="md semi-bold">{{ selected }}</label>
    <chev-down />
    <transition name="slide-fade-top">
      <div class="dropdown_list" v-if="isOpen">
        <div
          v-for="dropItem in arrayItems"
          :class="[selected === dropItem ? 'active_item' : '', 'item']"
          :key="dropItem"
          @click.stop="
            selectDropItem(itemKey, dropItem);
            closeDrop();
          "
        >
          <label class="sm semi-bold">
            {{ dropItem }}
          </label>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import ChevDown from "../icons/ChevDown.vue";
import clickOutSide from "@mahdikhashan/vue3-click-outside";
export default {
  data() {
    return {
      isOpen: false,
    };
  },
  directives: {
    clickOutSide,
  },
  components: {
    ChevDown,
  },

  props: {
    dropItems: {
      default: [],
    },

    selectDropItem: {
      type: Function,
      default: () => {},
    },

    selectedItem: {
      type: String,
      default: "",
    },

    itemKey: {
      type: String,
      default: "",
    },

    placeholder: {
      type: String,
      default: "",
    },
  },

  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    closeDrop() {
      if (this.isOpen) {
        this.isOpen = false;
      }
    },
  },

  computed: {
    arrayItems() {
      if (Array.isArray(this.dropItems)) {
        if (this.selectedItem) {
          return [
            this.dropItems.find((item) => item === this.selectedItem),
            ...this.dropItems.filter((item) => item !== this.selectedItem),
          ];
        }
        return this.dropItems;
      }
      return [];
    },

    selected() {
      return this.selectedItem || this.placeholder;
    },
  },
};
</script>
