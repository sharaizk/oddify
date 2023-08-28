import userInstance from "@/axios/userInstance";
import { deleteToken } from "@/vuex/localstorage";
const user = {
  state: () => ({
    user: {},
    isLoggedIn: false,
  }),

  mutations: {
    setUser(state, payload) {
      state.user = { ...payload };
    },
    setLoggedIn(state, payload) {
      state.isLoggedIn = payload;
    },
  },

  actions: {
    async loadProfile(context) {
      try {
        const loggedInUser = await userInstance.get("/me");
        context.commit("setUser", loggedInUser.data.data);
        context.commit("setLoggedIn", true);
      } catch (error) {
        console.log(error);
        context.commit("setLoggedIn", false);
        this.$router.replace("/login");
        deleteToken("token");
      }
    },
  },

  getters: {
    getUser(state) {
      return state.user;
    },
    getIsLoggedIn(state) {
      return state.isLoggedIn;
    },
  },
};

export default user;
