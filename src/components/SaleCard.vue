<template>
    <section>
      <div class="conteiner">
        <h2 class="sale-tittle">Venta</h2>
        <div class="body-conteiner">
          <div class="sale-part">
            <div class="tittle">Cryptomoneda a vender</div>
            <form class="form">
              <input id="criptoMoneySale" type="number" class="cantidad" placeholder="Cantidad a vender" @change="(e) => handlerChangeCryptoCountSale(e)"/>
              <select class="select" @change="(e) => handlerChangeSelectCriptoSale(e)">
                <option value="">-</option>
                <option v-for="elem in store.state.topCryptos" :value="elem.symbol">
                  <p>{{ elem.name }}</p>
                </option>
              </select>
            </form>
          </div>
  
          <div
            class="flex flex-col justify-center items-center w-[20%] h-[45%] bg-white rounded-lg shadow-sm shadow-gray-500"
          >
            <div class="w-full text-sm pl-2">En la billetera tienes</div>
            <p>{{ store.state.criptoSaved }}</p>
          </div>
  
          <div class="sale-conteiner">
            <div class="">Tú vendes</div>
            <div class="convert">
              <p>
                {{ store.state.convertedMoneySale }}
              </p>
            </div>
          </div>
  
          <div class="sale-conteiner">
            <div class="tittle">Día de venta</div>
            <input id="diaVenta" type="date" class="pl-2" required />
          </div>
  
          <div class="buy-now">
            <button @click="($event) => handlerSubmitSale()">Vender Ahora</button>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import Joi from "joi";
  import userService from "../services/user.service";
  import store from "../store";
  
  function handlerSubmitSale() {
    let daySale = document.getElementById("diaVenta").value;
    daySale = {
      day: new Date(daySale).getDate(),
      month: new Date(daySale).getMonth(),
      year: new Date(daySale).getFullYear(),
      hour: new Date(daySale).getHours(),
      minute: new Date(daySale).getMinutes(),
    };
    const criptoMoneyCount = store.state.criptoCountSale;
    const criptoMoneyType = store.state.criptoSelectedSale;
    const criptoMoneyToPay = store.state.convertedMoneySale
      .replace("$ ", "")
      .trim();
  
    const validObject = Joi.object({
      type: Joi.string().required(),
      amount: Joi.number().min(0).max(Number.MAX_VALUE).required(), //cantidad de monedas que hay de esa cripto en la billetera
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
      date: daySale,
      money: criptoMoneyToPay,
    });
  
    if (error) {
      let keyError = error.message.match(/"(\\.|[^"\\])*"/g);
      const errorsToRender = {
        amount: "La cantidad de criptomonedas ingresadas no son válidas",
        date: "El dia ingresado es inválido o nulo.",
        type: "Se debe seleccionar un tipo de criptomoneda a vender",
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
    } else if (value.amount > store.state.criptoSaved) {
      alert("No se puede vender mas de lo que hay en la billetera");
      return;
    } else if (value.amount === 0) {
      alert("La cantidad de criptomonedas ingresadas no son validas.");
      return;
    }
  
    userService
      .createSale({
        user_id: store.state.userId,
        action: "sale",
        crypto_code: criptoMoneyType,
        crypto_amount: criptoMoneyCount,
        money: criptoMoneyToPay,
        datetime: `${daySale.day}-${daySale.month + 1}-${daySale.year} ${
          daySale.hour
        }:${daySale.minute}`,
      })
      .then(() => {
        userService.getHistory(store.state.userId).then((history) => {
          store.commit("changeUserHistory", history);
        });
        alert("Venta de criptomoneda correcta");
      });
  }
  
  function handlerChangeCryptoCountSale(event) {
    store.commit("changeCriptoCountSale", event.target.value);
  }
  
  function handlerChangeSelectCriptoSale(event) {
    store.commit("changeCriptoSelectedSale", event.target.value);
    store.commit("changeCriptoSaved", event.target.value);
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
.sale-tittle{
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
.sale-part{
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
  