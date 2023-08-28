<template>
  <div class="table_container">
    <table id="table" cellspacing="0">
      <thead v-if="showLabels">
        <tr>
          <th
            v-for="table in columns"
            :key="table"
            :style="{
              textAlign: table.align,
              minWidth: table.minWidth,
            }"
          >
            <h5>{{ table.label }}</h5>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in items"
          :key="item"
          v-on:click="openDetail(item)"
          :class="[disabled && 'disabled']"
        >
          <td
            v-for="(table, ind) in columns"
            :key="`${table.id}-${ind}-${index}`"
            :style="{
              textAlign: table?.align,
              minWidth: table?.minWidth,
            }"
          >
            <p class="small-semi-bold" v-if="table?.id === 'openDate'">
              {{ convertDate(item[table.id]) }}
            </p>
            <p
              class="small-semi-bold"
              v-else-if="table.parentId && table.id === 'money'"
            >
              {{ parseFloat(Math.random() * 100).toFixed(2) }}€
            </p>
            <p class="small-semi-bold" v-else-if="table.id === 'league'">
              {{ item.league }}
            </p>

            <country-flag
              :country="item[table.id]"
              size="medium"
              v-else-if="table.id === 'countryCode'"
            />
            <p class="small-semi-bold" v-else-if="table.parentId">
              {{ item[table.parentId][table.id] }}
            </p>

            <p
              class="small-semi-bold"
              v-else-if="
                table.id === 'totalMatched' ||
                table.id === 'totalAvailable' ||
                table.id === 'calculatedTotalMatched'
              "
            >
              {{ parseFloat(item[table.id] || 0).toFixed(2) }}€
            </p>
            <p
              class="small-semi-bold"
              v-else-if="table.id === 'percent-money-on-market'"
            >
              {{
                getPercentMoneyOnMarket(
                  item["totalAvailable"],
                  item["totalMatched"]
                )
              }}%
            </p>

            <p
              class="small-semi-bold"
              v-else-if="table.id === 'marketStartTime'"
            >
              {{
                new Date(item.marketStartTime).toLocaleDateString(undefined, {
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              }}
            </p>
            <p class="small-semi-bold" v-else-if="table.id === 'lastMatchTime'">
              {{ getLastMatchTime(item.marketStartTime, item.lastMatchTime) }}
            </p>
            <p class="small-semi-bold" v-else-if="table.id === 'inplay'">
              <!-- {{ item[table.id] }} -->
              {{ getInplay(item[table.id]) }}
            </p>

            <p class="small-semi-bold" v-else-if="table.id === 'change'">0€</p>
            <p class="small-semi-bold" v-else-if="table.id === 'time'">-</p>
            <p class="small-semi-bold" v-else-if="table.id === 'score'">-</p>
            <p class="small-semi-bold" v-else-if="table.id === 'odds'">0.00</p>
            <p class="small-semi-bold" v-else-if="table.id === 'change%'">
              {{
                handleChange(item["initialTotalMatched"], item["totalMatched"])
              }}
            </p>

            <p class="small-semi-bold" v-else>
              {{ item[table.id] }}
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import CountryFlag from "vue-country-flag-next";
// import EventCompetition from "../custom/EventCompetition.vue";
export default {
  data() {
    return {};
  },
  props: {
    tableColumns: {
      type: Array,
      required: true,
    },
    items: {
      required: true,
      default: [],
    },
    openDetail: {
      type: Function,
      default: () => {},
    },
    showLabels: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    columns() {
      return this.tableColumns || [];
    },
  },

  methods: {
    convertDate(timestamp) {
      return new Date(timestamp).toLocaleString(undefined, {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    },
    getInplay(inplay) {
      return inplay ? "Live" : "Prematch";
    },

    getPercentMoneyOnMarket(total = 100, current = 0) {
      if (total === 0 && current === 0) {
        return 0;
      }
      return parseFloat((current / total) * 100).toFixed(2);
    },

    handleChange(prevTotalMatched, currentTotalMatched) {
      if (!prevTotalMatched || !currentTotalMatched) {
        return 0;
      }
      const gap = prevTotalMatched - currentTotalMatched;
      return (gap / prevTotalMatched) * 100;
    },

    getLastMatchTime(time = "", lastMatchTime = "") {
      if (!time || !lastMatchTime) {
        return "-";
      }
      const newDate = new Date(time);
      let startTime = newDate.getTime();

      let currentTime = new Date(lastMatchTime).getTime();
      let t = (currentTime - startTime) / 1000;
      if (isNaN(t)) {
        return "-";
      }
      t /= 60;
      t = Math.abs(Math.round(t));
      return `${t}'`;
    },
  },
  components: {
    "country-flag": CountryFlag,
    // EventCompetition,
  },
};
</script>
