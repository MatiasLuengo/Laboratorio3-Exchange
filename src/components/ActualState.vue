<template>
    <section id="actualState" >
        <div class="actualState">
            <div class="wallet">
                <i class='bx bx-wallet'></i>
                <h2 class="titulo">Cartera</h2>
            </div>
            <div class="titulos">
                <h2 class="tituloCentrado">Criptomoneda</h2>
                <h2 class="tituloCentrado">Cantidad</h2>
                <h2 class="tituloCentrado">$ARS</h2>
            </div>
            <div class="dataTable">
                <div class="titulos" v-for="elem in store.state.actualState">
                    <p class="tituloCentrado"> {{ elem.name.toUpperCase() }} </p>
                    <p class="tituloCentrado"> {{ elem.amount }} </p>
                    <!-- <p class="tituloCentrado"> $ {{ getTotalCash(elem.name, elem.amount) }} </p> -->
                    <!-- <p class="tituloCentrado" @click="getTotalCash(elem.name, elem.amount)"> $ {{ cadaTotal }} </p> -->
                    <p class="tituloCentrado"> $ {{ getCash(elem.name, elem.amount) }} </p>
                </div>
<!--                 <div >
                    <div class="titulos" >
                        <p class="tituloCentrado"> TOTAL: </p>
                        <p class="tituloCentrado"></p>
                        <p class="tituloCentrado"> $ {{ sumaTotal }} </p>
                    </div>
                </div> -->
            </div>
        </div>
    </section>
</template>

<script setup>
    import store from "./../store/index";
    import criptoYaInstance from '../services/criptoYa.connection.service';
/*     async function getTotalCash(coin, volumen){
        let total = "";
        await criptoYaInstance.getCriptoData(coin, 1)
        .then(response =>{
            total = Number(response.bid) * Number(volumen);
            console.log(total);
            return total;
        })
    }  */
</script>

<script>
    export default{
        data(){
            return{
                sumaTotal: null, 
            }
            },
            methods:{
                /* getTotalCash(coin, volumen){
                    this.total = null;
                    criptoYaInstance.getCriptoData(coin, 1)
                    .then(response =>{
                        let suma = Number(response.bid) * Number(volumen);
                        console.log(suma);
                        this.cadaTotal = suma;
                        this.total = this.total + suma;
                        return suma;
                    })
                }, */
                getCash(coin, volumen){
                    for(let index = 0; index < store.state.topCriptos.length; index++){
                        if(coin == store.state.topCriptos[index].name){
                            let cadaTotal = volumen * store.state.topCriptos[index].salePrice;
                            this.sumaTotal += cadaTotal;
                            return cadaTotal;
                        }
                    } 
                }
            },
            computed:{
/*                 totalCripto(){
                    console.log(store.state.actualState);
                    let total = 0;
                    for(let index = 0; index < store.state.actualState.length; index++){
                        const coin = store.state.actualState[index].name;
                        const volumen = store.state.actualState[index].amount;
                        const cadaTotal = this.nuevaFuncion(coin, volumen);
                        total += cadaTotal;
                        console.log("Chau");
                    }
                    this.sumaTotal = total;
                    return total;
                } */
            } 
    }
</script>
    
<style scoped>
.wallet{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30%;
  gap: 10px;
}
i{
  font-size: 40px;
  color: rgb(125, 72, 28);
}
#actualState{
    display: flex;
    flex-direction: column;
    min-height: 280px;
    padding-top: 40px;
    margin-left: 80px;
    margin-right: 80px;
}
.actualState{
    background-color: rgba(8, 161, 221, 0.10); /*para dar el sombreado*/
    border-radius: 6px;
}
.titulos{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 5px;
}
.titulos h2{
    background-color: rgb(106, 191, 245);
    padding: 10px;
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 6px;
    color: black;
    box-shadow: inset 0px 0px 2px 2px rgb(79, 164, 221);
    -webkit-box-shadow: inset 0px 0px 4px 4px rgb(79, 164, 221);
    -moz-box-shadow: inset 0px 0px 2px 2px rgb(79, 164, 221);
}
.tituloCentrado{
    display: flex;
    justify-content: center;
    font-size: medium;
    color: black;
}
.dataTable{
    display: flex;
    flex-direction: column;
}
.titulo{
    text-align: center;
    font-size: xx-large;
    color: black;
    text-decoration:underline;
}
</style>