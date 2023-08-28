import { createStore } from "vuex";
import general from "./module/general";
import user from "./module/user";
const store = createStore({
  state() {
    return {
      snackbar: {
        title: "",
        description: "",
        timeout: 2000,
        position: "bottom-left",
        isOpen: false,
      },
    };
  },
  mutations: {
    setSnack(state, payload) {
      state.snackbar = {
        title: payload.title,
        description: payload.description,
        timeout: payload.timeout || 5000,
        showProgress: payload.showProgress || false,
        type: payload.type,
        position: payload.position || "bottom-left",
        isOpen: true,
      };
    },
    resetSnack(state) {
      state.snackbar = {
        title: "",
        description: "",
        timeout: 500,
        showProgress: false,
        type: "",
        position: state.snackbar.position,
        isOpen: false,
      };
    },
  },
  actions: {},
  getters: {
    getSnack(state) {
      return state.snackbar;
    },
  },
  modules: {
    general,
    user,
  },
});

export default store;
