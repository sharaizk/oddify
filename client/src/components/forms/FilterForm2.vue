<template>
  <form
    @submit.prevent="handleSubmit"
    class="settings_page page pad-1 gap-24 max-w-700"
  >
    <h2 class="display3">Bets Settings</h2>
    <Switch
      variant="warning"
      label="Enable Notifications"
      v-model="params.enableNotifications"
    />
    <!-- FIRST ROW -->
    <div class="d-flex-row md-row-to-col align-start">
      <input-field
        type="number"
        label="Money raise for 1 min >"
        v-model="params.moneyRaise"
      />
      <input-field
        type="number"
        label="Raise percent for 1 min >"
        v-model="params.raisePercent"
      />
    </div>

    <div class="d-flex-row md-row-to-col align-start">
      <input-field
        type="number"
        label="Percent money on market >"
        v-model="params.marketMoney"
      />
      <input-field
        type="number"
        label="Minimum Odds >"
        v-model="params.minimumOdds"
      />
    </div>

    <!-- SECOND ROW -->
    <div class="d-flex-row md-row-to-col align-start">
      <input-field
        type="number"
        label="Maximum Odds <"
        v-model="params.maximumOdds"
      />
      <input-field
        type="number"
        label="Maximum Past Odds <"
        v-model="params.maximumPastOdds"
      />
    </div>

    <!-- THIRD ROW -->
    <div class="d-flex-row md-row-to-col align-start">
      <input-field
        type="number"
        label="Start Odds >"
        v-model="params.startOdds"
      />
      <input-field
        type="number"
        label="First Odds percent change"
        v-model="params.firstOddsChangePercent"
      />
    </div>

    <div class="d-flex-row md-row-to-col align-start space-between">
      <div class="d-flex-column justify-start align-start">
        <label>Game Status</label>
        <dropdown
          :drop-items="gameStatus"
          :selected-item="params.gameStatus"
          :select-drop-item="selectItem"
          item-key="gameStatus"
          placeholder="Select status"
        />
      </div>
      <div class="d-flex-column justify-start align-start">
        <label>Direction of Odds Change</label>
        <RadioGroup
          :options="directionOptions"
          variant="warning"
          v-model="params.oddsDirection"
          group-name="odds-direction"
        />
      </div>
    </div>

    <div class="d-flex-column align-start">
      <label class="lg semi-bold">Markets:</label>
      <checkbox
        variant="success"
        :label="market"
        v-for="market in markets"
        :key="market"
        :selectable-value="market"
        v-model="params.selectedMarkets"
      />
    </div>

    <div class="d-flex-row space-between">
      <button
        type="button"
        class="primary outlined medium full-width max-200"
        @click.stop="backStep({ betSettings: params })"
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
import Checkbox from "@/components/custom/Checkbox.vue";
import Switch from "@/components/custom/Switch.vue";
import InputField from "@/components/custom/InputField.vue";
import Dropdown from "@/components/custom/Dropdown.vue";
import RadioGroup from "@/components/custom/RadioGroup.vue";
export default {
  data() {
    return {
      params: {
        enableNotifications: false,
        moneyRaise: null,
        raisePercent: null,
        marketMoney: null,
        minimumOdds: null,
        maximumOdds: null,
        maximumPastOdds: null,
        startOdds: null,
        firstOddsChangePercent: null,
        selectedMarkets: [],
        gameStatus: "all",
        oddsDirection: null,
      },

      markets: [
        "Both Teams to Score",
        "Half time",
        "Match Odds",
        "First Half Goals 0.5",
        "First Half Goals 1.5",
        "First Half Goals 2.5",
        "Over/Under 0.5 Goals",
        "Over/Under 1.5 Goals",
        "Over/Under 2.5 Goals",
        "Over/Under 3.5 Goals",
        "Over/Under 4.5 Goals",
        "Over/Under 5.5 Goals",
        "Over/Under 6.5 Goals",
      ],

      gameStatus: ["Live", "Prematch", "All"],
      directionOptions: ["Raise", "Drop"],
    };
  },
  components: {
    Checkbox,
    InputField,
    Switch,
    Dropdown,
    RadioGroup,
  },
  props: {
    step: {
      type: Number,
      default: 1,
    },
    submitForm: {
      type: Function,
      default: () => {},
    },
    backStep: {
      type: Function,
      default: () => {},
    },
    selectedParams: {
      default: {},
    },
  },

  methods: {
    selectItem(key, item) {
      this.params[key] = item;
    },
    handleSubmit() {
      this.submitForm(this.step + 1, { betSettings: { ...this.params } });
    },
  },

  beforeMount() {
    const { betSettings } = this.selectedParams;
    this.params = {
      enableNotifications:
        betSettings?.enableNotifications !== undefined
          ? betSettings.enableNotifications
          : false,
      moneyRaise: betSettings?.moneyRaise || null,
      raisePercent: betSettings?.raisePercent || null,
      marketMoney: betSettings?.marketMoney || null,
      minimumOdds: betSettings?.minimumOdds || null,
      maximumOdds: betSettings?.maximumOdds || null,
      maximumPastOdds: betSettings?.maximumPastOdds || null,
      startOdds: betSettings?.startOdds || null,
      firstOddsChangePercent: betSettings?.firstOddsChangePercent || null,
      selectedMarkets: betSettings?.selectedMarkets || [],
      gameStatus: betSettings?.gameStatus || "all",
      oddsDirection: betSettings?.oddsDirection || null,
    };
  },
};
</script>
