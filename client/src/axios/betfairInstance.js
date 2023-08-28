import axios from "axios";

const betfairInstance = axios.create({
  baseURL: `${process.env.VUE_APP_AXIOS_BASE_URL}events`,
});


export default betfairInstance;
