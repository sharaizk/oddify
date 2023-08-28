<template>
  <section>
    <div class="dashboard_layout">
      <sidebar />
      <div class="dashboard_content_area">
        <router-view />
      </div>
    </div>
  </section>
</template>

<script>
import Sidebar from "@/components/dashboard/Sidebar.vue";

export default {
  data() {
    return {};
  },
  components: {
    Sidebar,
  },
};
</script>
