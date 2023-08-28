import betfairInstance from "@/axios/betfairInstance";
const general = {
  state: () => ({
    countries: [],
    competitions: [],
  }),

  mutations: {
    setCountries(state, payload) {
      state.countries = [...payload];
    },
    setCompetitions(state, payload) {
      state.competitions = [...payload];
    },
  },

  actions: {
    async getCurrencies(context) {
      try {
        const countries = await betfairInstance.get("/list-countries");
        context.commit("setCountries", countries.data.countries);
      } catch (error) {
        console.log(error);
      }
    },

    async getCompetitions(context) {
      try {
        const competitions = await betfairInstance.get("/get-competitions");
        context.commit("setCompetitions", competitions.data.competitions);
      } catch (error) {
        console.log(error);
      }
    },
  },

  getters: {
    getCountries(state) {
      return state.countries;
    },
    getCompetitions(state) {
      return state.competitions;
    },
  },
};

export default general;
