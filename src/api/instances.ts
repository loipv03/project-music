import axios from "axios";

const instance = axios.create({
  baseURL: "https://api-zingmp3-hk0s.onrender.com/api/",
});

export default instance;
