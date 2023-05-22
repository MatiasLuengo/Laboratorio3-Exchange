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
          <div class="tittle">Cryptomoneda a comprar</div>
          <form class="form" @submit.prevent="obtenerCotizacion">
            <input id="volumen" v-model.number="volumen" type="string" class="cantidad" placeholder="Cantidad a comprar"/>
            <select class="select" id="coin" v-model="coin">
              <option selected disabled >Criptos..</option>
              <option value="btc">BTC</option>
              <option value="eth">ETH</option>
              <option value="usdt">USDT</option>
            </select>
            <button>Optener Cotizacion</button>
          </form>
        </div>
        <div class="sale-conteiner miniConteiner">
          <div class="tittle">Tú pagas</div>
            <div class="convert" v-if="yourBudget">
              <p>$ {{  yourBudget }} </p>
            </div>
        </div>
        <div class="day-purchase miniConteiner">
          <div class="tittle">Día de compra</div>
          <input  id="diaCompra" type="date" required />
        </div>
        <div class="buy-now miniConteiner">
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
        criptoYaInstance.getCriptoData(this.coin, this.volumen)
        .then(response => {
          //let total = Number(response.ask)*Number(this.volumen);
          let total = Number((Number(response.ask)*Number(this.volumen)).toFixed(2));

          this.yourBudget = total;
        })

      }, 
      buy(){
        this.errors = [];
        let dayPurchase = document.getElementById("diaCompra").value;
        if (dayPurchase == "") {
          this.errors.push("Es necesario la fecha de compra") ;
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
          this.errors.push("Es necesario la cantidad a comprar") ;
        }if (this.coin == "") {
          this.errors.push("Es necesario la cripto a comprar")  ;
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
#nueva-compra{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
  background-color: rgba(8, 161, 221, 0.10); /*para dar el sombreado*/
  border-radius: 6px;
}
.buy-conteiner{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 70%;
  height: 30%;
  gap: 10px;
}
i{
  font-size: 40px;
  color: rgb(54, 255, 47);
}
.buy-tittle{
  font-weight: bold;
  font-size: 50px;
  color: black;
}
.body-conteiner{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 85%;
  height: 50%;
  gap: 40px;
}
.miniConteiner{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 55px;
  background-color: rgb(249, 249, 249);
  border-radius: 6px;
  padding: 10px 5px;
  min-height: 45%;
 }
 .tittle{
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: center;
  padding-top: 6px;
  padding-bottom: 6px;
  font-weight: bold;
 }
 .form{
  display: flex;
  gap: 5px;
 }
 .cantidad{
  width: 60%;
  text-align: center;
 }
 .select{
  width: 50%;
  text-align: center;
 }
 .sale-conteiner{
  width: 20%;
}
 .day-purchase{

  width: 20%;
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
.buy-now{
  width: 20%;
}
</style>