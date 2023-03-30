import { createStore } from "vuex";

//creamos la store
const store = createStore({
  //variables globales
  state() {
    return {
      userId: "",
      errorAlert: false,
      userHistory: [],
      topCryptos: [],
      convertedMoney: "",
      criptoSelected: "",
      criptoCount: "",
      convertedMoneySale: "",
      criptoSelectedSale: "",
      criptoCountSale: "",
      criptoSaved: 0,
      editID: "",
      actualState: {},
      analiticsState: {},
    };
  },
  mutations: {
    //metodos
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
      state.topCryptos = value;
      console.log(value);
    },
    changeConvertedMoney(state) {
      if (state.criptoSelected === "okb") {
        state.convertedMoney = "Fuera de servicio";
      } else if (state.criptoCount !== "" && state.criptoSelected !== "") {
        const valueCripto = state.topCryptos.find(function (v) {
          return v.symbol == state.criptoSelected;
        });
        state.convertedMoney = `$ ${
          Number(state.criptoCount) *
          Number(valueCripto.current_price_ars[0].ask)
        } `;
      }
    },
    changeConvertedMoneySale(state) {
      if (state.criptoSelectedSale === "okb") {
        state.convertedMoneySale = "Fuera de servicio";
      } else if (
        state.criptoCountSale !== "" &&
        state.criptoSelectedSale !== ""
      ) {
        const cripto = state.topCryptos.find(function (v) {
          return v.symbol == state.criptoSelectedSale;
        });
        state.convertedMoneySale = `$ ${
          Number(state.criptoCountSale) *
          Number(cripto.current_price_ars[0].bid)
        } `;
      }
    },
    changeCriptoSelected(state, value) {
      state.criptoSelected = value;
      store.commit("changeConvertedMoney");
    },
    changeCriptoCount(state, value) {
      state.criptoCount = value;
      store.commit("changeConvertedMoney");
    },
    changeCriptoSelectedSale(state, value) {
      state.criptoSelectedSale = value;
      store.commit("changeConvertedMoneySale");
    },
    changeCriptoCountSale(state, value) {
      state.criptoCountSale = value;
      store.commit("changeConvertedMoneySale");
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
    changeActualState(state, values) {
      let walletStatus = {};
      values.forEach((history) => {
        if (!walletStatus[history.crypto_code]) {
          Object.defineProperty(walletStatus, history.crypto_code, {
            value: {
              name: history.crypto_code,
              amount:
                history.action == "purchase"
                  ? Number(history.crypto_amount)
                  : Number(history.crypto_amount) * -1,
            },
            writable: true,
            configurable: true,
            enumerable: true,
          });
        } else {
          walletStatus[history.crypto_code].amount +=
            history.action == "purchase"
              ? Number(history.crypto_amount)
              : Number(history.crypto_amount) * -1;
        }
      });

      state.actualState = walletStatus;
    },
    changeAnaliticsState(state, values) {
      let analiticsWallet = {};
      values.forEach((history) => {
        if (!analiticsWallet[history.crypto_code]) {
          Object.defineProperty(analiticsWallet, history.crypto_code, {
            value: {
              name: history.crypto_code,
              amount:
                history.action == "purchase"
                  ? Number(history.crypto_amount)
                  : Number(history.crypto_amount) * -1,
              value:
                history.action == "purchase"
                  ? Number(history.money) * -1
                  : Number(history.money),
            },
            writable: true,
            configurable: true,
            enumerable: true,
          });
        } else {
          analiticsWallet[history.crypto_code].amount +=
            history.action == "purchase"
              ? Number(history.crypto_amount)
              : Number(history.crypto_amount) * -1;
          analiticsWallet[history.crypto_code].value +=
            history.action == "purchase"
              ? Number(history.money) * -1
              : Number(history.money);
        }
      });

      state.analiticsState = analiticsWallet;
    },
  },
});

export default store;

