<template>
  <component :is="layoutImport">
    <router-view></router-view>
  </component>
  <toast-bar />
</template>

<script>
import "./sass/app.scss";
import { getToken } from "@/vuex/localstorage";
import ToastBar from "./components/custom/ToastBar.vue";
import BasicLayout from "./layouts/BasicLayout.vue";
import DefaultLayout from "./layouts/DefaultLayout.vue";
import DashboardLayout from "./layouts/DashboardLayout.vue";
export default {
  name: "App",
  data() {
    return {
      layout: null,
    };
  },

  computed: {
    layoutImport() {
      return this.$route.meta.layout;
    },
  },
  methods: {
    getToken: getToken,
  },

  components: {
    ToastBar,
    BasicLayout,
    DefaultLayout,
    DashboardLayout
  },

  watch: {
    $route() {
      if (this.$route.meta.requiresAuth && !this.getToken("token")) {
        this.$router.push({ name: "login-page" });
      } else if (this.$route.name === "login-page" && this.getToken("token")) {
        this.$router.push({ name: "home" });
      }
    },
  },
};
</script>
