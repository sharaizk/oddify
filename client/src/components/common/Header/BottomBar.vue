<template>
  <div class="bottom_bar d-flex-row justify-start gap-16">
    <route-tabs
      v-for="route in mainRoutes"
      :key="route"
      :title="route.title"
      :icon="route?.icon"
      :to="route?.to"
      :child-routes="route?.childRoutes"
    />
  </div>
</template>

<script>
import RouteTabs from "./RouteTabs.vue";
import Tournament from "@/components/icons/Tournament.vue";
import Telegram from "@/components/icons/Telegram.vue";
import MailBox from "@/components/icons/MailBox.vue";
import DeviceTv from "@/components/icons/DeviceTv.vue";
import NotificationIcon from "@/components/icons/NotificationIcon.vue";
import HistoryIcon from "@/components/icons/HistoryIcon.vue";
import HomeIcon from "@/components/icons/HomeIcon.vue";
import SettingsIcon from "@/components/icons/SettingsIcon.vue";
import BellRingIcon from "@/components/icons/BellRingIcon.vue";
import { shallowRef } from "vue";
export default {
  data() {
    return {
      routes: [
        {
          title: "Games",
          icon: shallowRef(Tournament),
          childRoutes: [
            {
              title: "Prematch",
              icon: shallowRef(Tournament),
              to: "/games/prematch",
            },
            {
              title: "Live",
              icon: shallowRef(DeviceTv),
              to: "/games/live",
            },
            {
              title: "Notification",
              icon: shallowRef(NotificationIcon),
              to: "/games/notification",
            },
            {
              title: "History",
              icon: shallowRef(HistoryIcon),
              to: "/games/history",
            },
          ],
        },
        {
          title: "Telegram Channel",
          icon: shallowRef(Telegram),
        },
        {
          title: "Feedback",
          icon: shallowRef(MailBox),
        },
      ],

      settingRoutes: [
        {
          title: "Home",
          icon: shallowRef(HomeIcon),
          to: "/",
        },
        {
          title: "General Settings",
          icon: shallowRef(SettingsIcon),
          to: "/settings/general",
        },
        {
          title: "Filters",
          icon: shallowRef(BellRingIcon),
          to: "/settings/notify",
        },
        {
          title: "Telegram Bot",
          icon: shallowRef(Telegram),
          to: "/settings/telegram-bot",
        },
      ],
    };
  },
  components: {
    RouteTabs,
  },

  computed: {
    mainRoutes() {
      if (this.$route.path.includes("/settings")) {
        return this.settingRoutes;
      } else return this.routes;
    },
  },
};
</script>
