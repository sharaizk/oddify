<template>
  <pop-over v-if="childRoutes.length > 0">
    <div class="route-tab cursor-pointer" :class="[isActive && 'active']">
      <component :is="icon">{{ icon }}</component>
      <label class="md semi-bold cursor-pointer">
        {{ title }}
      </label>
      <chev-down v-if="childRoutes.length > 0" />
    </div>
    <pop-item>
      <router-link
        class="route-tab cursor-pointer"
        v-for="route in childRoutes"
        :key="route"
        :to="route.to"
        :active-class="'active'"
      >
        <div class="d-flex-row justify-start">
          <component :is="route?.icon">{{ route.icon }}</component>

          <label class="md semi-bold cursor-pointer">
            {{ route.title }}
          </label>
        </div>
        <chev-right />
      </router-link>
    </pop-item>
  </pop-over>

  <router-link
    :to="to"
    v-else-if="to"
    class="route-tab cursor-pointer"
    :active-class="'active'"
  >
    <component :is="icon">{{ icon }}</component>
    <label class="md semi-bold cursor-pointer">
      {{ title }}
    </label>
  </router-link>

  <div v-else class="route-tab cursor-pointer" :class="[isActive && 'active']">
    <component :is="icon">{{ icon }}</component>
    <label class="md semi-bold cursor-pointer">
      {{ title }}
    </label>
  </div>
</template>

<script>
import ChevDown from "@/components/icons/ChevDown.vue";
import ChevRight from "@/components/icons/ChevRight.vue";
import PopOver from "@/components/custom/PopOver.vue";
import PopItem from "@/components/custom/PopItem.vue";
export default {
  data() {
    return {};
  },

  props: {
    title: {
      type: String,
      default: "",
    },
    childRoutes: {
      default: [],
    },
    icon: {
      default: null,
    },
    to: {
      type: String,
      default: "",
    },
  },

  components: {
    ChevDown,
    PopOver,
    PopItem,
    ChevRight,
  },
  computed: {
    isActive() {
      return this.$route.path.includes(this.title.toLowerCase());
    },
  },
};
</script>
