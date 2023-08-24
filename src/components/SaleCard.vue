<template>
    <section id="nueva-venta">
      <div class="conteiner">
        <div class="sale-conteiner">
          <h2 class="sale-tittle">Venta</h2>
          <i class='bx bxs-chevron-left' ></i>
        </div>
        <div class="alertConteiner" v-if="errors">
          <div class="alert" v-for="error in errors">
            <p class="">{{error}}</p>
          </div>
        </div>
        <div class="body-conteiner">
          <div class="sale-part miniConteiner">
            <div class="tittle">Cryptomoneda a vender</div>
            <form class="form" @submit.prevent="obtenerCotizacionVenta">
              <input id="criptoMoneySale" type="number" step="any" min="0" v-model.number="volumen" class="cantidad" placeholder="Cantidad a vender"/>
              <select class="select" id="coin" v-model="coin" @change="handlerChangeSelectCriptoSale($event)">
                <option selected disabled >Criptos..</option>
                <option value="btc">BTC</option>
                <option value="eth">ETH</option>
                <option value="usdt">USDT</option>
            </select>
            <button>Optener Cotizacion</button>
            </form>
          </div>
          <div class="miniConteiner yourWallet tittle">
            <p>En la billetera tienes:</p>
            <p>{{ wallet }}</p>
          </div>
            <div class="miniConteiner yourSale tittle">Tú vendes
              <div v-if="yourBudget">
                <p> $ {{ yourBudget }} </p> 
              </div>
            </div>
          <div class="day-conteiner miniConteiner">
            <div class="tittle">Día de venta</div>
            <input id="diaVenta" type="date" class="pl-2" required />
          </div>
          <div class="buy-now miniConteiner">
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
          criptoYaInstance.getCriptoData(this.coin, this.volumen)
          .then(response => {
            let total = Number(response.bid)*Number(this.volumen);
            this.yourBudget = total;
          })
        },
        handlerChangeSelectCriptoSale(cripto){
          store.commit("changeCriptoSaved", cripto.target.value);
          this.wallet = store.state.criptoSaved;
        },
        sale(){
          this.errors = [];
          let dayPurchase = document.getElementById("diaVenta").value;
          if (dayPurchase == "") {
            this.errors.push("Es necesario la fecha de venta") ;
          }
          dayPurchase = {
              day: new Date(dayPurchase).getDate(),
              month: new Date(dayPurchase).getMonth(),
              year: new Date(dayPurchase).getFullYear(),
              hour: new Date(dayPurchase).getHours(),
              minute: new Date(dayPurchase).getMinutes(),
            };
          if(dayPurchase.year < new Date().getFullYear() || 
            dayPurchase.month < new Date().getMonth() ||
            (dayPurchase.day +  1) < new Date().getDate()){
            this.errors.push("La fecha no puede ser anterior al dia de hoy") ;
          }
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
  height: 30%;
  gap: 10px;
}
button{
  cursor: pointer;
  height: 40px;
  width: 120px;
  border-radius: 6px;
  background-color: rgb(212, 238, 232);
}
button:hover{
  background-color: rgb(220, 241, 235);
}
.alertConteiner{
  width: 50%;
}
.alert{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  background-color: gainsboro;
  margin: auto;
  margin-bottom: 5px;
}
.alert p{
  color: red;
  font-size: small;
  margin-top: 5px;
  margin-bottom: 5px;
}
#nueva-venta{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-bottom: 40px;
}
.conteiner{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 90%;
  height: 300px;
  margin: auto;
  margin-top: 40px;
  background-color: rgba(8, 161, 221, 0.10);
  border-radius: 6px;
}
.miniConteiner{
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: auto;
  margin: auto;
  height: 60px;
  background-color: rgb(249, 249, 249);
  border-radius: 6px;
  padding: 10px 5px;
  min-height: 45%;
 }
.body-conteiner{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 85%;
  height: 50%;
  gap: 40px;
}
 .tittle{
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: center;
  padding-top: 6px;
  padding-bottom: 6px;
  font-weight: bold;
  text-align: center;
 }
 .tittle p{
  text-align: center;
 }
 .form{
  display: flex;
  gap: 5px;
 }
 .cantidad{
  width: 60%;
  text-align: center;
 }
 .yourSale{
  width: 15%;
 }
 .yourSale p{
  color: black;
 }
 .yourWallet{
  width: 15%;
 }
 .yourWallet p{
  color: black;
 }
 .select{
  width: 50%;
  text-align: center;
 }
 .day-conteiner{
  width: 15%;
  display: flex;
  flex-direction: column;
}
.sale-tittle{
  font-weight: bold;
  font-size: 50px;
  color: black;
}
.buy-now{
  width: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
  