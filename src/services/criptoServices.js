import store from "../store/index";
import criptoYaInstance from "../services/criptoYa.connection.service";
import userService from "./user.service";

export default new (class CryptoService {
    async getCrypto() {
        let criptos = ["btc", "eth", "usdt"];
        let criptosData = [];
        for (let index = 0; index < criptos.length; index++) {
            try {
                await criptoYaInstance.getCriptoData(criptos[index],1)
                .then(response => {
                    let cripto = {
                        name: criptos[index],
                        buyPrice: response.ask,
                        salePrice: response.bid
                    }
                    criptosData.push(cripto);
                })
            } catch (error) {
            }
        }
        //console.log(criptosData);
        store.commit("changeTopCrypto", criptosData);
    }

    async upload(){
        await userService.getHistory(store.state.userId)
        .then((history) => {store.commit("changeUserHistory", history);});
    }
})();
