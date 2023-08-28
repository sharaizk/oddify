<template>
  <div class="top_bar d-flex-row space-between">
    <h2>Oddify</h2>
    <div class="d-flex-row justify-end gap-16">
      <avatar :image="'/images/flags/usa.png'" :variant="'small'" />
      <badge :count="0">
        <bell-icon />
      </badge>
      <pop-over>
        <avatar />
        <pop-item>
          <router-link
            class="route-tab cursor-pointer"
            v-for="route in settingsRoutes"
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
    </div>
  </div>
</template>

<script>
import Avatar from "@/components/custom/Avatar.vue";
import BellIcon from "@/components/icons/BellIcon.vue";
import Badge from "@/components/custom/Badge.vue";
import PopOver from "@/components/custom/PopOver.vue";
import PopItem from "@/components/custom/PopItem.vue";
import SettingsIcon from "@/components/icons/SettingsIcon.vue";
import ChevRight from "@/components/icons/ChevRight.vue";
export default {
  data() {
    return {
      settingsRoutes: [
        {
          title: "Settings",
          to: "/settings",
          icon: SettingsIcon,
        },
      ],
    };
  },
  components: {
    Avatar,
    BellIcon,
    Badge,
    PopOver,
    PopItem,
    ChevRight,
  },
};
</script>
