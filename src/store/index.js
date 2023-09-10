import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      userId: "",
      errorAlert: false,
      userHistory: [],
      budget: null,
      actualState: {},
      criptoSaved: 0,
      convertedMoneySale: 0,
      editID: "",
      analiticsState: {},
      topCriptos: []
    };
  },
  mutations: {
    changeUserId(state, value) {
      state.userId = value;
    },
    changeErrorAlert(state, value) {
      state.errorAlert = value;
    },
    changeUserHistory(state, value) {
      state.userHistory = value;
      store.commit("changeActualState", value);
      store.commit("changeAnaliticsState", value);
    },
    changeTopCrypto(state, value) {
      state.topCriptos = value;
    },
    changeBudget(state, value) {
      state.budget = value;
    },
    changeActualState(state, values) {
      let walletStatus = {};
      const arr = Array.from(values);
      arr.forEach((history) => {
        if (!walletStatus[history.crypto_code]) {
          Object.defineProperty(walletStatus, history.crypto_code, {
            value: {
              name: history.crypto_code,
              amount: history.action == "purchase" ? Number(history.crypto_amount) : Number(history.crypto_amount) * -1,
            },
            writable: true,
            configurable: true,
            enumerable: true,
          });
        } else {
          walletStatus[history.crypto_code].amount += history.action == "purchase" ? Number(history.crypto_amount) : Number(history.crypto_amount) * -1;
        }
      });
      state.actualState = walletStatus;
    },
    changeCriptoSaved(state, value) {
      const result = state.userHistory.filter(
        (coin) => coin.crypto_code == value
      ); //filtro para buscar la cripto que quiere el cliente vender
      let total = 0;
      result.forEach((history) => {
        if (history.action == "purchase") {
          total += Number(history.crypto_amount);
        } else {
          total -= Number(history.crypto_amount);
        }
      });
      state.criptoSaved = total;
    },
    changeEditID(state, value) {
      state.editID = value;
    },
    changeAnaliticsState(state, values) {
      let analiticsWallet = {};
      let arr = Array.from(values);
      arr.forEach((history) => {
        if (!analiticsWallet[history.crypto_code]) {
          Object.defineProperty(analiticsWallet, history.crypto_code, {
            value: {
              name: history.crypto_code,
              amount: history.action == "purchase" ? Number(history.crypto_amount) : Number(history.crypto_amount) * -1,
              value: history.action == "purchase" ? Number(history.money) * -1 : Number(history.money),
            },
            writable: true,
            configurable: true,
            enumerable: true,
          });
        } else {
          analiticsWallet[history.crypto_code].amount += history.action == "purchase" ? Number(history.crypto_amount) : Number(history.crypto_amount) * -1;
          analiticsWallet[history.crypto_code].value += history.action == "purchase" ? Number(history.money) * -1 : Number(history.money);
        }
      });
      state.analiticsState = analiticsWallet;
    },
  }
});

export default store;

