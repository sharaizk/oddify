import LoginPage from "@/pages/LoginPage.vue";
// import HomePage from "@/pages/HomePage.vue";
import Prematch from "@/pages/Games/Prematch.vue";
import Live from "@/pages/Games/Live.vue";
import GameDetail from "@/pages/Games/GameDetail.vue";
import GeneralSettings from "@/pages/Settings/General.vue";
import MoneyWaySettings from "@/pages/Settings/MoneyWay.vue";
import NotifySettings from "@/pages/Settings/Notify.vue";
import SubscribeSettings from "@/pages/Settings/Subscribe.vue";
import TelegramBot from "@/pages/Settings/Telegram.vue";
import DashboardMain from "@/pages/Dashboard/Test.vue";
import { createRouter, createWebHistory } from "vue-router";

export const routes = [
  {
    path: "/login",
    component: LoginPage,
    name: "login-page",
    meta: {
      layout: "BasicLayout",
    },
  },
  {
    path: "/",
    redirect: "/games/prematch",
    name: "home",
    meta: {
      layout: "DefaultLayout",
      requiresAuth: true,
    },
  },
  {
    path: "/games",
    name: "games",

    children: [
      {
        path: "",
        name: "main",
        redirect: "/games/prematch",
      },
      {
        path: "prematch",
        name: "prematch",
        component: Prematch,
        meta: {
          layout: "DefaultLayout",
          requiresAuth: true,
        },
      },
      {
        path: "live",
        name: "live",
        component: Live,
        meta: {
          layout: "DefaultLayout",
          requiresAuth: true,
        },
      },
      {
        path: "prematch",
        name: "prematch",
        component: Prematch,
        meta: {
          layout: "DefaultLayout",
          requiresAuth: true,
        },
      },
      {
        path: "detail/:eventId",
        name: "event-detail",
        component: GameDetail,
        meta: {
          layout: "DefaultLayout",
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: "/settings",
    name: "setting",
    children: [
      {
        path: "",
        name: "setting_main",
        redirect: "/settings/general",
      },
      {
        path: "general",
        name: "general_settings",
        component: GeneralSettings,
        meta: {
          layout: "DefaultLayout",
          requiresAuth: true,
        },
      },
      {
        path: "money-way",
        name: "moneyway_settings",
        component: MoneyWaySettings,
        meta: {
          layout: "DefaultLayout",
          requiresAuth: true,
        },
      },

      {
        path: "notify",
        name: "notify_settings",
        component: NotifySettings,
        meta: {
          layout: "DefaultLayout",
          requiresAuth: true,
        },
      },
      {
        path: "telegram-bot",
        name: "telegram_settings",
        component: TelegramBot,
        meta: {
          layout: "DefaultLayout",
          requiresAuth: true,
        },
      },
      {
        path: "subscribe",
        name: "subscribe_settings",
        component: SubscribeSettings,
        meta: {
          layout: "DefaultLayout",
          requiresAuth: true,
        },
      },
    ],
  },

  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardMain,
    meta: {
      layout: "DashboardLayout",
      // requiresAuth: true,
    },
  },
];

const routerOptions = {
  routes,
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 };
  },
};

const router = createRouter(routerOptions);

export default router;
