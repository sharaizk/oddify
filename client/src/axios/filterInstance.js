import axios from "axios";
import { getToken } from "@/vuex/localstorage";

const filterInstance = axios.create({
  baseURL: `${process.env.VUE_APP_AXIOS_BASE_URL}filter`,
});

filterInstance.interceptors.request.use(
  async (config) => {
    config.headers = {
      Authorization: `Bearer ${getToken("token")}`,
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default filterInstance;
