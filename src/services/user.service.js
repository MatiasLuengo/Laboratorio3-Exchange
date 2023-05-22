import UtnInstance from "./utn.connection.service";

export default new (class UserService {
  async getHistory(userId) {
    const response = await UtnInstance.get(
      `transactions?q={"user_id":"${userId}"}`
    );
    return response.data;
  }
  async createPurchase(data) {
    const response = await UtnInstance.post("transactions", data, {});
    console.log(response);
  }
  async createSale(data) {
    const response = await UtnInstance.post("transactions", data, {});
    return response.data;
  }
  async deleteHistory(id) {
    const response = await UtnInstance.delete(`transactions/${id}`);
    return response.data;
  }
  async editHistory(id, payload) {
    const response = await UtnInstance.patch(`transactions/${id}`, payload);
    return response.data;
  }
})();
