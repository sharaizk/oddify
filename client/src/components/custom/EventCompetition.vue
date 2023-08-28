<template>
  <p class="small-semi-bold" v-if="competition">{{ competition }}</p>
</template>

<script>
import betfairInstance from "@/axios/betfairInstance";
export default {
  data() {
    return {
      competition: "",
    };
  },

  props: {
    eventId: {
      type: Number,
      default: 0,
    },
  },

  methods: {
    async fetchCompetition() {
      try {
        const competition = await betfairInstance.post("/get-competitions/1", {
          eventId: [this.eventId],
        });
        this.competition = competition.data.data.competition.name;
      } catch (error) {
        console.log(error);
      }
    },
  },

  beforeMount() {
    this.fetchCompetition();
  },
};
</script>
