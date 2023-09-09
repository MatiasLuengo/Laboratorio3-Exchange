<template>
  <section id="nueva-compra">
    <div class="conteiner">
      <div class="buy-conteiner">
        <i class='bx bxs-chevron-right'></i>
        <h1 class="buy-tittle">Compra</h1>
      </div>
      <div class="alertConteiner" v-if="errors">
        <div class="alert" v-for="error in errors">
          <p class="">{{error}}</p>
        </div>
      </div>
      <div class="body-conteiner">

        <div class="buy-part miniConteiner">

          <div>
            <p class="tittle">Cryptomoneda a comprar</p>
            <form class="form" @submit.prevent="obtenerCotizacion">
              <input id="volumen" v-model.number="volumen" type="number" step="any" min="0" placeholder="Cantidad a comprar"/>
              <select id="coin" v-model="coin">
                <option selected disabled >Criptos...</option>
                <option value="btc">BTC</option>
                <option value="eth">ETH</option>
                <option value="usdt">USDT</option>
                <option value="dai">DAI</option>
                <option value="doge">DOGE</option>
                <option value="dot">DOT</option>
                <option value="eos">EOS</option>
                <option value="link">LINK</option>
                <option value="ltc">LTC</option>
                <option value="mana">MANA</option>
                <option value="paxg">PAXG</option>
                <option value="sand">SAND</option>
                <option value="shib">SHIB</option>
                <option value="slp">SLP</option>
                <option value="sol">SOL</option>
                <option value="trx">TRX</option>
                <option value="uni">UNI</option>
                <option value="xlm">XLM</option>
                <option value="xrp">XRP</option>
              </select>
              <button>Optener Cotizacion</button>
            </form>

            <div class="sale-conteiner" v-if="yourBudget">
              <p class="tittle">Tú pagas</p>
              <div class="convert" >
                  <p>$ {{  yourBudget.toLocaleString() }} </p>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="miniConteiner">
          <p class="tittle">Día de compra</p>
          <input id="diaCompra" type="date" required />
        </div> -->
        <div class="miniConteiner">
          <button @click="buy">Comprar Ahora</button>
        </div>

      </div>
    </div>
  </section>
</template>
  
<script>
import criptoYaInstance from '../services/criptoYa.connection.service';
import store from "./../store";
import userService from './../services/user.service';
export default{
  data(){
      return{
        coin: "",
        volumen: null,
        yourBudget: null,
        errors: []
      }
    },
    methods:{
      obtenerCotizacion(){
        this.errors = [];
          if(this.volumen == null){
            this.errors.push("Es necesario la cantidad a cotizar") ;
          }
          if(this.volumen <= 0){
            this.errors.push("La cantidad a cotizar debe ser mayor a cero") ;
          }if (this.coin == "") {
            this.errors.push("Es necesario la cripto para cotizar")  ;
          }
          if(!this.errors.length > 0){
        criptoYaInstance.getCriptoData(this.coin, this.volumen)
        .then(response => {
          let total = Number((Number(response.ask)*Number(this.volumen)).toFixed(2));
          this.yourBudget = total;
        })
      }
      },
      buy(){
        this.errors = [];
        let dayPurchase = {
            day: new Date().getDate(),
            month: new Date().getMonth(),
            year: new Date().getFullYear(),
            hour: new Date().getHours(),
            minute: new Date().getMinutes(),
          };
        if(this.volumen == null){
          this.errors.push("Es necesario la cantidad a comprar") ;
        }
        if(this.volumen <= 0){          
          this.errors.push("La cantidad a comprar debe ser mayor a cero") ;
        }
        if (this.coin == "") {
          this.errors.push("Es necesario la cripto a comprar")  ;
        }
        if (this.yourBudget == null) {
          this.errors.push("Debes obtener una cotizacion primero")  ;
      }
        if(!this.errors.length > 0){
        store.commit("changeBudget", null)
        criptoYaInstance.getCriptoData(this.coin, this.volumen)
        .then(response => {
          let total = Number((Number(response.ask)*Number(this.volumen)).toFixed(2));
          store.commit("changeBudget", total)
          this.yourBudget = total;
        })
        userService.createPurchase({
            user_id: store.state.userId,
            action: "purchase",
            crypto_code: this.coin,
            crypto_amount: this.volumen,
            money: this.yourBudget,
            datetime: `${dayPurchase.year}-${dayPurchase.month + 1}-${dayPurchase.day + 1} ${dayPurchase.hour}:${dayPurchase.minute}`,
          })
          .then(() => {
            userService.getHistory(store.state.userId).then((history) => {
              store.commit("changeUserHistory", history);
            });
          })   
          .then(() => {
          this.coin= "";
          this.volumen= null;
          this.yourBudget= null;
        });
        alert("Compra de criptomoneda correcta");
      }
      }}
}
</script>
  
<style scoped>
button{
  font-weight: bold;
  cursor: pointer;
  height: 40px;
  width: 120px;
  border-radius: 6px;
  background-color: rgb(154, 255, 117);
}
button:hover{
  background-color: rgb(111, 209, 75);
}
.alertConteiner{
  width: 100%;
}
.alert{
  text-align: center;
  width: 40%;
  min-width: 200px;
  height: auto;
  background-color: gainsboro;
  margin: auto;
  margin-bottom: 6px;
  padding: 1px 4px;
}
.alert p{
  color: red;
  font-size: small;
  margin-top: 5px;
  margin-bottom: 5px;
}
.conteiner{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 95%;
  background-color: rgba(8, 161, 221, 0.10);
  border-radius: 6px;
  padding-bottom: 20px;
  margin: 0 auto;
}
.buy-conteiner{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 70%;
  height: auto;
  gap: 10px;
}
.buy-conteiner h1{
  font-weight: bold;
  font-size: 50px;
  color: black;
  margin: 20px 0;
}
i{
  font-size: 40px;
  color: rgb(54, 255, 47);
}
.body-conteiner{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50%;
  gap: 10px;
}
.miniConteiner{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40%;
  min-width: 200px;
  height: auto;
  background-color: rgb(249, 249, 249);
  border-radius: 6px;
  padding: 10px 5px;
  min-height: 80px;
 }
 #diaCompra{
  margin-top: 10px;
 }
 .tittle{
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  font-weight: bold;
  color: black;
 }
 .form{
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
 }
 .form input{
  max-width: 160px;
  text-align: center;
  min-height: 35px;
 }
 .form select{
  min-width: 120px;
  text-align: center;
  min-height: 40px;
 }
 .form button{
  min-height: 35px;
 }
 .sale-conteiner{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(240, 240, 240);
  padding-top: 10px;
  border-radius: 6px;
}
 .convert{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
 }
 .convert p{
  color: black;
 }

</style>