<template>
  <div class="settings_page page pad-1">
    <h2 class="display3">Saved Filters</h2>

    <div class="d-flex-row md-row-to-col justify-start align-start flex-wrap">
      <filter-card
        v-for="(myFilter, i) in myFilters"
        :key="myFilter"
        :filter-number="i"
        :created-at="myFilter.created_at"
        :highlight-start-odds="myFilter.leagueSettings.highlightStartOdds"
        :both-teams-to-score="myFilter.leagueSettings.bothTeamsToScore"
        :half-time-match-odds="myFilter.leagueSettings.halfTimeMatchOdds"
        :over-under="myFilter.leagueSettings.overUnder"
        :selected-competitions="myFilter.competitions"
        :enable-notifications="myFilter.betSettings.enableNotifications"
        :money-raise="myFilter.betSettings.moneyRaise"
        :raise-percent="myFilter.betSettings.raisePercent"
        :market-money="myFilter.betSettings.marketMoney"
        :minimum-odds="myFilter.betSettings.minimumOdds"
        :maximum-odds="myFilter.betSettings.maximumOdds"
        :start-odds="myFilter.betSettings.startOdds"
        :first-odds-percent="myFilter.betSettings.firstOddsChangePercent"
        :selected-markets="myFilter.betSettings.selectedMarkets"
        :game-status="myFilter.betSettings.gameStatus"
        :odds-direction="myFilter.betSettings.oddsDirection"
      />
    </div>
  </div>
</template>

<script>
import filterInstance from "@/axios/filterInstance";
import FilterCard from "@/components/common/FilterCard.vue";
export default {
  data() {
    return {
      myFilters: [],
    };
  },

  methods: {
    async fetchMyFilters() {
      try {
        const myFilterResponse = await filterInstance.get("/my-filters");
        console.log(myFilterResponse.data.filters);
        this.myFilters = myFilterResponse.data.filters;
      } catch (error) {
        console.log(error);
      }
    },
  },
  beforeMount() {
    this.fetchMyFilters();
  },

  components: {
    FilterCard,
  },
};
</script>
