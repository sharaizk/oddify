<template>
  <div class="prematch_page page pad-1">
    <div class="d-flex-column">
      <h3>{{ competition }}</h3>
      <h4>{{ event }}</h4>
      <h4>{{ activeMarket }}</h4>
    </div>

    <Transition name="fade">
      <div class="tabs" v-if="sortedMarkets.length > 0">
        <div
          class="tab"
          :class="[activeMarket === market.bookId && 'active']"
          v-for="market in sortedMarkets"
          :key="market"
          @click="selectMarket(market.bookId)"
        >
          <p class="md">{{ market.marketName }}</p>
        </div>
      </div>
    </Transition>
    <Transition name="fade">
      <div
        class="books_table_container"
        v-if="marketBooks.length > 0 && !fetching"
      >
        <table-vue :table-columns="tableColumns" :items="marketBooks" />
      </div>
    </Transition>
  </div>
</template>

<script>
import betfairInstance from "@/axios/betfairInstance";
import TableVue from "@/components/common/Table.vue";
import { marketBookTableColumns } from "@/helpers/tables.config";
export default {
  data() {
    return {
      eventMarkets: [],
      event: "",
      competition: "",
      activeMarket: null,
      marketBooks: [],
      tableColumns: marketBookTableColumns,
      fetching: true,

      marketPriorityMap: {
        "Both teams to Score?": 0,
        "Team A To Score": 1,
        "Team B To Score": 2,
        "First Half Goals 0.5": 3,
        "First Half Goals 1.5": 4,
        "First Half Goals 2.5": 5,
        "First Half Goals 3.5": 6,
        "First Half Goals 5.5": 7,
        "First Half Goals 6.5": 8,
        "First Half Goals 7.5": 9,
        "First Half Goals 8.5": 10,
        "First Half Goals 9.5": 11,
        "Half Time": 12,
        "Match Odds": 13,
        "Half Time Score": 14,
        "Correct Score": 15,
        "Half Time/Full Time": 16,
        "Over/Under 0.5 Goals": 17,
        "Over/Under 1.5 Goals": 18,
        "Over/Under 2.5 Goals": 19,
        "Over/Under 3.5 Goals": 20,
        "Over/Under 4.5 Goals": 21,
        "Over/Under 5.5 Goals": 22,
        "Over/Under 6.5 Goals": 23,
        "Over/Under 7.5 Goals": 24,
        "Over/Under 8.5 Goals": 25,
        "Over/Under 9.5 Goals": 26,
      },
    };
  },
  components: {
    TableVue,
  },

  methods: {
    async fetchEventMarkets() {
      try {
        const eventMarketsResponse = await betfairInstance.post(
          `/list-market-catalogue/${this.eventId}`
        );
        this.eventMarkets = eventMarketsResponse.data.marketCatalogue;
        this.event = eventMarketsResponse.data.event;
        this.competition = eventMarketsResponse.data.competition;
        this.activeMarket = this.sortedMarkets[0].bookId;
      } catch (error) {
        console.log(error);
      }
    },

    selectMarket(marketId) {
      this.activeMarket = marketId;
    },
    async fetchMarketBooks() {
      try {
        this.fetching = true;
        const marketBooksResponse = await betfairInstance.post(
          `/list-market-book/${this.activeMarket}`
        );
        this.fetching = false;

        this.marketBooks = marketBooksResponse.data.marketRunners;
      } catch (error) {
        console.log(error);
      }
    },
  },

  computed: {
    eventId() {
      return this.$route.params.eventId;
    },

    sortedMarkets() {
      return [...this.eventMarkets].sort((a, b) => {
        return (
          this.marketPriorityMap[a.marketName] -
          this.marketPriorityMap[b.marketName]
        );
      });
    },
  },

  beforeMount() {
    this.fetchEventMarkets();
  },

  watch: {
    activeMarket() {
      this.fetchMarketBooks();
    },
  },
};
</script>
