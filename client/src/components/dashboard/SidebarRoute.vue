<template>
  <div
    class="side-bar-route cursor-pointer"
    :class="[openedRouteList === title && 'active']"
    v-if="childRoutes.length > 0"
    @click.prevent="openNav(title)"
  >
    <div class="route_tab space-between">
      <div class="d-flex-row flex-8 justify-start">
        <component :is="icon">{{ icon }}</component>
        <label class="md semi-bold cursor-pointer">
          {{ title }}
        </label>
      </div>
      <chev-right v-if="childRoutes.length > 0" class="more_icon"/>
    </div>

    <div
      class="child_routes"
      v-if="childRoutes.length > 0"
      :class="[openedRouteList === title && 'active']"
    >
      <div
        class="d-flex-row justify-start"
        v-for="childRoute in childRoutes"
        :key="childRoute"
        style="padding: 0.35rem 0.35rem"
      >
        <component :is="childRoute.icon">{{ childRoute.icon }}</component>
        <label class="md semi-bold cursor-pointer">
          {{ childRoute.title }}
        </label>
      </div>
    </div>
  </div>

  <div
    class="side-bar-route cursor-pointer"
    :class="[isActive && 'active']"
    v-else
  >
    <div class="d-flex-row space-between">
      <div class="d-flex-row flex-8 justify-start">
        <component :is="icon">{{ icon }}</component>
        <label class="md semi-bold cursor-pointer">
          {{ title }}
        </label>
      </div>
      <chev-right v-if="childRoutes.length > 0" />
    </div>
  </div>
</template>

<script>
import ChevRight from "../icons/ChevRight.vue";
export default {
  data() {
    return {
      openedRouteList: "",
    };
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
  methods: {
    openNav(title) {
      if (this.openedRouteList === title) {
        this.openedRouteList = "";
        return;
      }
      this.openedRouteList = title;
    },
  },
  components: {
    ChevRight,
  },
};
</script>
