<template>
  <form
    @submit.prevent="handleSubmit"
    class="settings_page page pad-1 gap-24 max-w-700"
  >
    <h2 class="display3">League Settings</h2>

    <Switch
      variant="warning"
      label="Highlight the start odds"
      v-model="params.highlightStartOdds"
    />
    <div class="d-flex-row md-row-to-col space-between">
      <div class="d-flex-column align-start">
        <label class="md semi-bold">Both Teams to Score?</label>
        <div class="d-flex-row justify-start">
          <checkbox
            variant="warning"
            :label="teamScore"
            :selectable-value="teamScore"
            v-for="teamScore in bothTeamsToScore"
            :key="teamScore"
            v-model="params.bothTeamsToScore"
          />
        </div>
      </div>

      <div class="d-flex-column align-start">
        <label class="md semi-bold">Half Time & Match Odds</label>
        <div class="d-flex-row justify-start">
          <checkbox
            variant="warning"
            :label="matchOdd"
            :selectable-value="matchOdd"
            v-model="params.halfTimeMatchOdds"
            v-for="matchOdd in matchOdds"
            :key="matchOdd"
          />
        </div>
      </div>

      <div class="d-flex-column align-start">
        <label class="md semi-bold">Over/Under Goals</label>
        <div class="d-flex-row justify-start">
          <checkbox
            variant="warning"
            :label="overunder"
            :selectable-value="overunder"
            v-model="params.overUnder"
            v-for="overunder in overunders"
            :key="overunder"
          />
        </div>
      </div>
    </div>

    <div class="countries_container flex-5" v-if="getCompetitions.length > 0">
      <h6 class="container_heading">
        Select Competitions to enable filter
        <label class="sm">(Default All)</label>
      </h6>
      <div class="d-flex-column justify-start align-start content gap-0">
        <div
          class="country_row"
          v-for="competition in getCompetitions"
          :key="competition"
        >
          <checkbox
            :label="competition.title"
            :selectable-value="competition.competitionId"
            v-model="params.selectedCompetitions"
          />
        </div>
      </div>
    </div>

    <div class="d-flex-row space-between">
      <button
        type="button"
        disabled
        class="primary outlined medium full-width max-200"
      >
        Back
      </button>
      <button type="submit" class="primary medium full-width max-200">
        Next
      </button>
    </div>
  </form>
</template>
<script>
import Switch from "@/components/custom/Switch.vue";
import Checkbox from "@/components/custom/Checkbox.vue";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      params: {
        highlightStartOdds: false,
        selectedCompetitions: [],
        bothTeamsToScore: ["Yes", "No"],
        halfTimeMatchOdds: ["1", "x", "2"],
        overUnder: ["Over", "Under"],
      },

      bothTeamsToScore: ["Yes", "No"],
      matchOdds: ["1", "x", "2"],
      overunders: ["Over", "Under"],
    };
  },
  components: {
    Switch,
    Checkbox,
  },

  props: {
    selectedParams: {
      default: {},
    },
    step: {
      type: Number,
      default: 1,
    },
    submitForm: {
      type: Function,
      default: () => {},
    },
  },

  computed: {
    ...mapGetters(["getCountries", "getCompetitions"]),
  },

  methods: {
    handleSubmit() {
      this.submitForm(this.step + 1, { leagueSettings: { ...this.params } });
    },
  },

  beforeMount() {
    if (Object.keys(this.selectedParams).length > 0) {
      this.params = {
        highlightStartOdds: this.selectedParams.leagueSettings.highlightStartOdds,
        selectedCompetitions: this.selectedParams.leagueSettings.selectedCompetitions,
        bothTeamsToScore: this.selectedParams.leagueSettings.bothTeamsToScore,
        halfTimeMatchOdds: this.selectedParams.leagueSettings.halfTimeMatchOdds,
        overUnder: this.selectedParams.leagueSettings.overUnder,
      };
    }
  },
};
</script>
