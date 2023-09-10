import axios from "axios";

const criptoYaInstance = axios.create({
  baseURL: 'https://criptoya.com/api/bitso',
  timeout: 5000,
});

export default {
  async getCriptoData(coin, volumen) {
    const response = await criptoYaInstance.get(`/${coin}/ars/0.1`);
    return response.data;
  }
}
