<template>
    <section id="nueva-compra">
      <div class="conteiner">
        <div class="buy-conteiner">
          <h1 class="buy-tittle">Compra</h1>
        </div>
        <div class="body-conteiner">
          <div class="buy-part">
            <div class="tittle">Cryptomoneda a comprar</div>
            <form class="form">
              <input id="criptoMoney" type="string" class="cantidad" placeholder="Cantidad a comprar" @change="(e) => handlerChangeCryptoCount(e)"/>
              <select class="select" @change="(e) => handlerChangeSelectCripto(e)">
                <option value="">-</option>
                <option v-for="elem in $store.state.topCryptos" :value="elem.symbol">
                  <p>{{ elem.name }}</p>
                </option>
              </select>
            </form>
          </div>
  
          <div class="sale-conteiner">
            <div class="">Tú pagas</div>
            <div class="convert">
              <p>
                {{ store.state.convertedMoney }}
              </p>
            </div>
          </div>
  
          <div class="day-purchase">
            <div class="tittle">Día de compra</div>
            <input id="diaCompra" type="date" class="pl-2" required />
          </div>
  
          <div class="buy-now">
            <button @click="($event) => handlerSubmit()">Comprar Ahora</button>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import Joi, { date } from "joi";
  import userService from "../services/user.service";
  import store from "../store";
  
  function handlerSubmit() {
    //agarramos los valores de los inputs
    let dayPurchase = document.getElementById("diaCompra").value;
    dayPurchase = {
      day: new Date(dayPurchase).getDate(),
      month: new Date(dayPurchase).getMonth(),
      year: new Date(dayPurchase).getFullYear(),
      hour: new Date(dayPurchase).getHours(),
      minute: new Date(dayPurchase).getMinutes(),
    };
    const criptoMoneyCount = store.state.criptoCount;
    const criptoMoneyType = store.state.criptoSelected;
    const criptoMoneyToPay = store.state.convertedMoney.replace("$ ", "").trim();
  
    const validObject = Joi.object({
      type: Joi.string().required(),
      amount: Joi.number().min(0).max(Number.MAX_VALUE).required(),
      date: Joi.object({
        day: Joi.number().min(0).max(31).required(),
        month: Joi.number().min(0).max(12).required(),
        year: Joi.number().min(2023).max(2023).required(),
        hour: Joi.number().min(0).max(23).required(),
        minute: Joi.number().min(0).max(59).required(),
      }),
      money: Joi.number().min(0).max(Number.MAX_VALUE).required(),
    });
    const { error, value } = validObject.validate({
      type: criptoMoneyType,
      amount: criptoMoneyCount,
      date: dayPurchase,
      money: criptoMoneyToPay,
    });
    if (error) {
      let keyError = error.message.match(/"(\\.|[^"\\])*"/g);
      const errorsToRender = {
        amount: "La cantidad de criptomonedas ingresadas no son válidas",
        date: "El dia ingresado es inválido o nulo.",
        type: "Se debe seleccionar un tipo de criptomoneda a comprar",
        money: "La cantidad de dinero a pagar es inválida",
        default: "Ah ocurrido un error, intentelo mas tarde",
      }; // Objecto-lista de todos los errores admitidos
  
      if (keyError) {
        keyError = keyError.toString().replace(/"/g, "").split(".")[0]; // Separo la key del error de todo el mensaje.
        alert(errorsToRender[keyError] || errorsToRender["default"]);
        return;
      }
      alert(errorsToRender["default"]); // error default por si todo falla
      return;
    } else if (value.amount === 0) {
      alert("La cantidad de criptomonedas ingresadas no son validas.");
      return;
    }
  
    userService
      .createPurchase({
        user_id: store.state.userId,
        action: "purchase",
        crypto_code: value.type,
        crypto_amount: value.amount,
        money: value.money,
        datetime: `${value.date.day}-${value.date.month + 1}-${value.date.year} ${
          value.date.hour
        }:${value.date.minute}`,
      })
      .then(() => {
        userService.getHistory(store.state.userId).then((history) => {
          store.commit("changeUserHistory", history);
        });
      }); //se cumple promesa
  
    alert("Compra de criptomoneda correcta");
  }
  
  function handlerChangeCryptoCount(event) {
    store.commit("changeCriptoCount", event.target.value);
  }
  
  function handlerChangeSelectCripto(event) {
    store.commit("changeCriptoSelected", event.target.value);
  }
  </script>
  
<style scoped>
.conteiner{
  display: flex;
  justify-content: end;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 50px;
  background-color: lightskyblue;
}
.buy-conteiner{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
  height: 30%;
}
.buy-tittle{
  /* select-none */
  font-weight: bold;
  font-size: 50px;
  color: black;
}
.body-conteiner{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
  height: 30%;
  gap: 40px;
}
.buy-part{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 45%;
  background-color: white;
  border-radius: 20px;
/*   box-shadow: ;
 */}
 .tittle{
  width: 100%;
  padding-left: 5px;
 }
 .form{
  /* outline-none*/
  display: flex;
  padding-left: 5px;
 }
 .cantidad{
  /* outline-none */
  width: 60%;
  text-align: center;
 }
 .select{
  width: 40%;
  text-align: center;
 }
 .sale-conteiner{
  
  display: flex;
  flex-direction: column;
  width: 20%;
  height: 45%;
  background-color: white;
  border-radius: 20px;
/*   box-shadow: ;
 */}
 .day-purchase{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20%;
  height: 45%;
  background-color: white;
  border-radius: 20px;
/*   box-shadow: ;
 */}

 .convert{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
 }
.buy-now{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  height: 45%;
  background-color: white;
  border-radius: 20px;
/*   box-shadow: ;
 */
}
</style>