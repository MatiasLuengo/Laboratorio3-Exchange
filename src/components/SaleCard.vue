<template>
    <section id="nueva-venta">
      <div class="conteiner">
        <div class="sale-conteiner">
          <h1>Venta</h1>
          <i class='bx bxs-chevron-left' ></i>
        </div>
        <div class="alertConteiner" v-if="errors">
          <div class="alert" v-for="error in errors">
            <p class="">{{error}}</p>
          </div>
        </div>
        <div class="body-conteiner">
          <div class="sale-part miniConteiner">
            <p class="tittle">Cryptomoneda a vender</p>
            <form class="form" @submit.prevent="obtenerCotizacionVenta">
              <input id="criptoMoneySale" type="number" step="any" min="0" v-model.number="volumen" placeholder="Cantidad a vender"/>
              <select id="coin" v-model="coin" @change="handlerChangeSelectCriptoSale($event)">
                <option selected disabled >Criptos..</option>
                <option value="btc">BTC</option>
                <option value="eth">ETH</option>
                <option value="usdt">USDT</option>
            </select>
            <button>Optener Cotizacion</button>
            </form>
            <div class="result-conteiner" v-if="coin">
              <p class="tittle">En la billetera tienes</p>
              <div class="yourWallet">
                <p>{{ wallet }}</p>
                <p>{{ coin.toLocaleUpperCase() }}</p>
              </div>
            </div>
            <div class="result-conteiner" v-if="yourBudget">
              <p class="tittle">Tú vendes</p>
              <p class="yourBudget"> $ {{ yourBudget.toLocaleString() }} </p> 
            </div>
          </div>
          <!-- <div class="miniConteiner">
            <p class="tittle">Día de venta</p>
            <input id="diaVenta" type="date" class="pl-2" required />
          </div> -->
          <div class="miniConteiner">
            <button @click="sale">Vender Ahora</button>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
    import store from "./../store";
    import userService from './../services/user.service';
    import criptoYaInstance from '../services/criptoYa.connection.service';
    export default{
      data(){
        return{
          coin: "",
          volumen: null,
          yourBudget: null,
          errors: [],
          wallet: null
        }
      },
      methods:{
        obtenerCotizacionVenta(){
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
            let total = Number(response.bid)*Number(this.volumen);
            this.yourBudget = total;
          })
        }
        },
        handlerChangeSelectCriptoSale(cripto){
          store.commit("changeCriptoSaved", cripto.target.value);
          this.wallet = store.state.criptoSaved;
        },
        sale(){
          this.errors = [];
          let dayPurchase = {
              day: new Date().getDate(),
              month: new Date().getMonth(),
              year: new Date().getFullYear(),
              hour: new Date().getHours(),
              minute: new Date().getMinutes(),
            };
          if(this.volumen == null){
            this.errors.push("Es necesario la cantidad a vender") ;
          }
          if(this.volumen <= 0){
            this.errors.push("La cantidad a vender debe ser mayor a cero") ;
          }if (this.coin == "") {
            this.errors.push("Es necesario la cripto a vender")  ;
          }
          if(this.wallet < this.volumen){
            this.errors.push("No tiene esa cantidad en la cartera")  ;
          }
          if (this.yourBudget == null) {
          this.errors.push("Debes obtener una cotizacion primero")  ;
      }
          if(!this.errors.length > 0){
          store.commit("changeBudget", null)
          criptoYaInstance.getCriptoData(this.coin, this.volumen)
          .then(response => {
            let total = Number(response.bid)*Number(this.volumen);
            store.commit("changeBudget", total)
            this.yourBudget = total;
          })
          userService.createSale({
            user_id: store.state.userId,
            action: "sale",
            crypto_code: this.coin,
            crypto_amount: this.volumen,
            money: this.yourBudget,
            datetime: `${dayPurchase.day + 1}-${dayPurchase.month + 1}-${dayPurchase.year} ${dayPurchase.hour}:${dayPurchase.minute}`,
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
        alert("Venta de criptomoneda correcta");
      }
      }
      },
      computed:{
      }
    }
  </script>

<style scoped>
i{
  font-size: 40px;
  color: rgb(236, 66, 66);
}
.sale-conteiner{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 70%;
  height: auto;
  gap: 10px;
}
.sale-conteiner h1{
  font-weight: bold;
  font-size: 50px;
  color: black;
  margin: 20px 0;
}
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
  width: 50%;
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
.body-conteiner{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50%;
  gap: 10px;
}
 .tittle{
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  font-weight: bold;
  color: black;
 }
 .tittle p{
  text-align: center;
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
 .yourBudget{
  color: black;
 }
 .yourWallet{
  display: flex;
  flex-direction: row;
  gap: 15px;
 }
 .yourWallet p{
  color: black;
 }

 .result-conteiner{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(240, 240, 240);
  padding-top: 10px;
  border-radius: 6px;
  margin-top: 7px;
}
#diaVenta{
  margin-top: 10px;
}
</style>
  