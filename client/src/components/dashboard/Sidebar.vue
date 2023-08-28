<template>
  <div class="dashboard_sidebar" :class="[openMdSidebar && 'active-sidebar']">
    <div class="sidebar_logo">
      <h2 class="display4">Oddify</h2>
      <indent-decreas-icon class="cursor-pointer sidebar_icon" @click="openSideBar" />
    </div>

    <div class="sidebar_routes">
      <sidebar-route
        v-for="route in routes"
        :key="route"
        :title="route.title"
        :icon="route.icon"
        :child-routes="route?.childRoutes"
      />
    </div>

    <button class="secondary medium full-width">Subscribe</button>
  </div>
</template>

<script>
import IndentDecreasIcon from "../icons/IndentDecreasIcon.vue";
import Tournament from "../icons/Tournament.vue";
import Telegram from "../icons/Telegram.vue";
import MailBox from "../icons/MailBox.vue";
import DeviceTv from "../icons/DeviceTv.vue";
import NotificationIcon from "../icons/NotificationIcon.vue";
import HistoryIcon from "../icons/HistoryIcon.vue";
import SettingsIcon from "../icons/SettingsIcon.vue";
import CashIcon from "../icons/CashIcon.vue";
import DollarIcon from "../icons/DollarIcon.vue";
import UserPlusIcon from "../icons/UserPlusIcon.vue";
import BellRingIcon from "../icons/BellRingIcon.vue";
import SidebarRoute from "./SidebarRoute.vue";
export default {
  data() {
    return {
      openMdSidebar: false,
      routes: [
        {
          title: "Games",
          icon: Tournament,
          childRoutes: [
            {
              title: "Prematch",
              icon: Tournament,
              to: "/games/prematch",
            },
            {
              title: "Live",
              icon: DeviceTv,
              to: "/games/live",
            },
            {
              title: "Notification",
              icon: NotificationIcon,
              to: "/games/notification",
            },
            {
              title: "History",
              icon: HistoryIcon,
              to: "/games/history",
            },
          ],
        },
        {
          title: "Telegram Channel",
          icon: Telegram,
        },
        {
          title: "Feedback",
          icon: MailBox,
        },
        {
          title: "Settings",
          icon: SettingsIcon,
          childRoutes: [
            {
              title: "General Settings",
              icon: SettingsIcon,
              to: "/settings/general",
            },
            {
              title: "Money Way",
              icon: CashIcon,
              to: "/settings/money-way",
            },
            {
              title: "Notify",
              icon: BellRingIcon,
              to: "/settings/notify",
            },
            {
              title: "Sharp Bets",
              icon: DollarIcon,
              to: "/settings/sharp-bets",
            },
            {
              title: "Telegram Bot",
              icon: Telegram,
              to: "/settings/telegram-bot",
            },
            {
              title: "Subscribe",
              icon: UserPlusIcon,
              to: "/settings/subscribe",
            },
          ],
        },
      ],
    };
  },
  components: {
    IndentDecreasIcon,
    SidebarRoute,
  },
  methods: {
    openSideBar() {
      this.openMdSidebar = !this.openMdSidebar;
    },
  },
};
</script>
