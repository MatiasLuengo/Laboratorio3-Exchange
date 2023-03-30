import axios from "axios";
const UtnInstance = axios.create({
  baseURL: "https://laboratorio3-f36a.restdb.io/rest/",
  timeout: 5000,
  headers: { "x-apikey": "60eb09146661365596af552f" },
});
export default UtnInstance;
