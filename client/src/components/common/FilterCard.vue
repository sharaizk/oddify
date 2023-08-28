<template>
  <div class="filter_card">
    <div class="d-flex-row space-between">
      <label class="md bold">Filter: {{ filterNumber + 1 }}</label>
      <label class="sm">
        Created at:
        <label class="sm semi-bold">{{ createdData }}</label>
      </label>
    </div>
    <h6 class="t-dark f-w-600">League Settings:</h6>

    <div class="d-flex-row space-between">
      <label class="sm">Highlight Start Odds: </label>
      <chip
        :text="highstartOdds"
        :variant="highlightStartOdds ? 'success' : 'danger'"
      />
    </div>

    <div class="d-flex-row space-between">
      <label class="sm flex-10">Both Teams To Score: </label>
      <chip
        v-for="bothTeam in bothTeamsToScore"
        :key="bothTeam"
        :text="bothTeam"
        variant="success"
      />
    </div>

    <div class="d-flex-row space-between">
      <label class="sm flex-10">Half Time Match odds: </label>
      <chip
        v-for="halfTime in halfTimeMatchOdds"
        :key="halfTime"
        :text="halfTime"
        variant="success"
      />
    </div>

    <div class="d-flex-row space-between">
      <label class="sm flex-10">Over/Under: </label>
      <chip v-for="ov in overUnder" :key="ov" :text="ov" variant="success" />
    </div>

    <div class="d-flex-column justify-start align-start">
      <label class="sm flex-10">Selected Competitions: </label>
      <div class="d-flex-row justify-start flex-wrap">
        <chip
          v-for="competion in selectedCompetitions"
          :key="competion"
          :text="competion.title"
          variant="success"
        />
      </div>
      <chip
        v-if="selectedCompetitions.length === 0"
        :text="'All'"
        variant="success"
      />
    </div>

    <h6 class="t-dark f-w-600">Bet Settings:</h6>
    <div class="d-flex-row space-between">
      <label class="sm">Enable Notifications: </label>
      <chip
        :text="enableNotifi"
        :variant="enableNotifications ? 'success' : 'danger'"
      />
    </div>

    <div class="d-flex-row justify-start flex-wrap">
      <div class="d-flex-row space-between flex-2" v-if="moneyRaise">
        <label class="sm white-space-no">Start Odds: </label>
        <chip :text="moneyRaise" variant="success" />
      </div>

      <div class="d-flex-row space-between flex-2" v-if="raisePercent">
        <label class="sm white-space-no">Raise Percent: </label>
        <chip :text="raisePercent" variant="success" />
      </div>

      <div class="d-flex-row space-between flex-2" v-if="marketMoney">
        <label class="sm white-space-no">Market Money: </label>
        <chip :text="marketMoney" variant="success" />
      </div>

      <div class="d-flex-row space-between flex-2" v-if="minimumOdds">
        <label class="sm white-space-no">Minimum Odds: </label>
        <chip :text="minimumOdds" variant="success" />
      </div>

      <div class="d-flex-row space-between flex-2" v-if="maximumOdds">
        <label class="sm white-space-no">Maximum Odds: </label>
        <chip :text="maximumOdds" variant="success" />
      </div>

      <div class="d-flex-row space-between flex-2" v-if="startOdds">
        <label class="sm white-space-no">Start Odds: </label>
        <chip :text="startOdds" variant="success" />
      </div>

      <div class="d-flex-row space-between flex-2" v-if="firstOddsPercent">
        <label class="sm white-space-no">First Odds Change Percent: </label>
        <chip :text="firstOddsPercent" variant="success" />
      </div>
      <div class="d-flex-row space-between flex-2" v-if="gameStatus">
        <label class="sm white-space-no">First Odds Change Percent: </label>
        <chip :text="gameStatus" variant="success" />
      </div>

      <div class="d-flex-row space-between flex-2" v-if="oddsDirection">
        <label class="sm white-space-no">First Odds Change Percent: </label>
        <chip :text="oddsDirection" variant="success" />
      </div>

    </div>

    <div class="d-flex-column justify-start align-start">
      <label class="sm flex-10">Selected Markets: </label>
      <div class="d-flex-row justify-start flex-wrap">
        <chip
          v-for="market in selectedMarkets"
          :key="market"
          :text="market"
          variant="success"
        />
      </div>
      <chip
        v-if="selectedMarkets.length === 0"
        :text="'All'"
        variant="success"
      />
    </div>
  </div>
</template>

<script>
import Chip from "../custom/Chip.vue";
export default {
  data() {
    return {};
  },

  props: {
    filterNumber: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: null,
    },
    highlightStartOdds: {
      type: Boolean,
      default: false,
    },
    bothTeamsToScore: {
      default: [],
    },
    halfTimeMatchOdds: {
      default: [],
    },
    overUnder: {
      default: [],
    },
    selectedCompetitions: {
      default: [],
    },

    enableNotifications: {
      type: Boolean,
      default: false,
    },
    moneyRaise: {
      type: Number,
      default: 0,
    },
    raisePercent: {
      type: Number,
      default: 0,
    },
    marketMoney: {
      type: Number,
      default: 0,
    },
    minimumOdds: {
      type: Number,
      default: 0,
    },
    maximumOdds: {
      type: Number,
      default: 0,
    },
    startOdds: {
      type: Number,
      default: 0,
    },
    firstOddsPercent: {
      type: Number,
      default: 0,
    },
    selectedMarkets: {
      default: [],
    },
    gameStatus: {
      type: String,
      default: "All",
    },
    oddsDirection: {
      type: String,
      default: "",
    },
  },

  computed: {
    createdData() {
      return new Date(this.createdAt).toLocaleDateString(undefined, {
        day: "2-digit",
        month: "short",
        year: "2-digit",
      });
    },

    highstartOdds() {
      return this.highlightStartOdds ? "Active" : "In Active";
    },

    enableNotifi() {
      return this.enableNotifications ? "Active" : "In Active";
    },
  },

  components: {
    Chip,
  },
};
</script>
