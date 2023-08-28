<template>
  <div class="prematch_page page pad-1">
    <h1 class="display4">Prematch</h1>
    <Transition name="fade">
      <table-vue
        :table-columns="tableColumn"
        :items="prematchItems"
        :open-detail="onRowClick"
        v-if="prematchItems.length > 0"
      />
    </Transition>
  </div>
</template>

<script>
import TableVue from "@/components/common/Table.vue";
import { prematchColumns } from "../../helpers/tables.config";
import betfairInstance from "@/axios/betfairInstance";
export default {
  data() {
    return {
      tableColumn: prematchColumns,
      prematchItems: [],
    };
  },
  components: {
    TableVue,
  },
  methods: {
    async fetchPrematchGames() {
      try {
        const prematchGamesResponse = await betfairInstance.post(
          "/list-events/1",
          {
            Inplay: false,
          }
        );
        this.prematchItems = prematchGamesResponse.data.data.sort(function (
          a,
          b
        ) {
          return new Date(a.openDate) - new Date(b.openDate);
        });
      } catch (error) {
        console.log(error);
      }
    },

    onRowClick(item) {
      const route = this.$router.resolve({
        name: "event-detail",
        params: { eventId: item.eventId },
      });
      window.open(route.href, "_blank");
    },
  },

  beforeMount() {
    this.fetchPrematchGames();
  },
};
</script>
