<template>
    <section id="actualState" >
        <div class="wallet">
            <i class='bx bx-wallet'></i>
            <h2 class="titulo">Cartera</h2>
        </div>
        <div class="titulos">
            <h2 class="tituloCentrado">Cripto</h2>
            <h2 class="tituloCentrado">Cantidad</h2>
            <h2 class="tituloCentrado">$ARS</h2>
        </div>
        <div class="dataTable">
            <div class="titulos" v-for="elem in store.state.actualState">
                <p class="tituloCentrado"> {{ elem.name.toUpperCase() }} </p>
                <p class="tituloCentrado"> {{ elem.amount.toLocaleString() }} </p>
                <p class="tituloCentrado"> $ {{ getCash(elem.name, elem.amount).toLocaleString() }} </p>
            </div>
            <div >
                <div class="titulos" >
                    <p class="tituloCentrado"> TOTAL: </p>
                    <p class="tituloCentrado"></p>
                    <p class="tituloCentrado"> $ {{ sumaTotal.toLocaleString() }} </p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import store from "./../store/index";
import { computed } from 'vue';

const getCash = (coin, volumen) => {
    for (let index = 0; index < store.state.topCriptos.length; index++) {
        if (coin == store.state.topCriptos[index].name) {
        return volumen * store.state.topCriptos[index].salePrice;
        }
    }
    return 0;
    };

const sumaTotal = computed(() => {
    let total = 0;
    Object.keys(store.state.actualState).forEach(key => {
        const elem = store.state.actualState[key];
        const cash = getCash(elem.name, elem.amount);
        total += cash;
        });
    return total;
    });
</script>
    
<style scoped>
.wallet{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  gap: 10px;
}
i{
  font-size: 40px;
  color: rgb(125, 72, 28);
}
#actualState{
    display: flex;
    flex-direction: column;
    min-height: 380px;
    height: max-content;
    margin: 0 auto;
    background-color: rgba(8, 161, 221, 0.10);
    border-radius: 6px;
    width: 95%;
    max-width: 500px;
}
.titulos{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 8px;
    padding: 0 8px;
}
.titulos h2{
    background-color: rgb(106, 191, 245);
    padding: 10px;
    border-radius: 6px;
    color: black;
    box-shadow: inset 0px 0px 2px 2px rgb(79, 164, 221);
    -webkit-box-shadow: inset 0px 0px 4px 4px rgb(79, 164, 221);
    -moz-box-shadow: inset 0px 0px 2px 2px rgb(79, 164, 221);
}
.titulos p{
    align-items: center;
}
.tituloCentrado{
    text-align: center;
    font-size: medium;
    color: black;
}
@media (max-width: 380px) {
    .tituloCentrado{
    text-align: start;
}
}
.dataTable{
    display: flex;
    flex-direction: column;
    padding: 0 8px;
}
.titulo{
    text-align: center;
    font-size: xx-large;
    color: black;
    text-decoration:underline;
}
</style>