<template>
  <section>
    <header-vue />
    <slot></slot>
  </section>
</template>

<script>
import HeaderVue from "../components/common/HeaderVue.vue";
import { mapGetters } from "vuex";

export default {
  name: "DefaultLayout",
  data() {
    return {};
  },

  components: {
    HeaderVue,
  },
  computed: {
    ...mapGetters(["getCountries", "getCompetitions"]),
  },

  beforeMount() {
    if (this.getCountries.length <= 0) {
      this.$store.dispatch("getCurrencies");
    }
    if (this.getCompetitions.length <= 0) {
      this.$store.dispatch("getCompetitions");
    }

    this.$store.dispatch("loadProfile");
  },
};
</script>
