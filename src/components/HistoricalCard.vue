<template>
    <section id="movimientos">
        <div class="scroll-container">
            <div class="conteiner">
                <div class="dataTable">
                    <div class="titulos">
                        <h2 class="tituloCentrado">Fecha alta</h2>
                        <h2 class="tituloCentrado">Monto $ARS</h2>
                        <h2 class="tituloCentrado">Compra/Venta</h2>
                        <h2 class="tituloCentrado">Cantidad monedas</h2>
                        <h2 class="tituloCentrado">Tipo criptomoneda</h2>
                        <h2 class="tituloCentrado">Modificar</h2>
                    </div>
                </div>
                <div class="dataTable" v-if="store.state.userHistory" >
                    <div class="data" v-for="elem in store.state.userHistory">
                        <p class="tituloCentrado"> {{ elem.datetime }} </p>
                        <p class="tituloCentrado"> $ {{ elem.money.toLocaleString() }} </p>
                        <p class="tituloCentrado"> {{ elem.action == "purchase" ? "Compra" : "Venta" }} </p>
                        <p class="tituloCentrado"> {{ elem.crypto_amount.toLocaleString() }} </p>
                        <p class="tituloCentrado"> {{ elem.crypto_code.toUpperCase() }} </p>
                        <div class="tituloCentrado buttons">
                            <button class="buttonEdit" @click="handlerChangeEditID(elem._id)">
                                <p class="" >Editar</p>
                            </button>
                            <button class="buttonDelete" @click="handlerDelete(elem._id)">
                                <p class="">Eliminar</p>
                            </button>
                        </div>
                    </div>
                    <div v-if="store.state.editID" class="editConteiner">
                        <p class="flexCenter black"> Usted está editando el registro: {{ store.state.editID }}</p>
                        <div class="alertConteiner" v-if="errors">
                            <div class="alert" v-for="error in errors">
                                <p class="">{{error}}</p>
                            </div>
                        </div>
                        <div class="flexCenter">
                            <form @submit.prevent="handlerEdit">
                                <div class="dataEdit">
                                    <input type="text" id="mount" v-model.number="volumen" placeholder="Cantidad de Criptomonedas" class=""/>
                                    <input type="text" id="money" v-model.number="volumenArs" placeholder="Cantidad de $ARS" class=""/>
                                    <select id="type" v-model="coin" class="">
                                        <option selected disabled >Criptos..</option>
                                        <option value="btc">BTC</option>
                                        <option value="eth">ETH</option>
                                        <option value="usdt">USDT</option>
                                    </select>
                                </div>
                                <div class="flexCenter cancelConfirm">
                                    <button type="submit" class="buttonConfirm">Editar</button>
                                    <button class="flexCenter buttonCancel" @click="Cancel">Cancelar</button>
                                </div>
                            </form>
                        </div>
                </div>
                </div> 
            </div>
        </div>
    </section>
</template>

<script setup>
    import store from "../store/index";
    import userService from "../services/user.service";
</script>

<script>
    export default{
        data(){
            return{
            coin: null,
            volumen: null,
            volumenArs: null,
            errors: [],
            }
        },
        methods:{
            handlerDelete(id){
            const flag = confirm(
                `¿Esta seguro que quiere eliminar el registro id: ${id}?`
            );
            if (flag) {
                userService.deleteHistory(id).then(() => {
                    userService.getHistory(store.state.userId).then((history) => {
                        store.commit("changeUserHistory", history);
                    });
                });
                alert(`¡Registro id: ${id} borrado correctamente!`);
            }
            },
            handlerChangeEditID(id){
            const flag = confirm(`¿Esta seguro que quiere editar el pedido id: ${id}?`);
            if (flag) store.commit("changeEditID", id);
            },
            Cancel(){
            const flag = confirm("Cancelar la edición?");
            if (flag) {
                store.commit("changeEditID", null);
            }
            },
            handlerEdit(){
                this.errors = [];            
                if(this.volumen == null){
                    this.errors.push("Es necesario la cantidad de criptos a editar") ;
                }if (this.coin == null) {
                    this.errors.push("Es necesario la cripto a editar")  ;
                }
                if (this.volumenArs == null) {
                    this.errors.push("Es necesario la cantidad de $ARS a editar")  ;
                }
                if(!this.errors.length > 0){
                    const id = store.state.editID;
                    userService.editHistory(id, {
                        crypto_amount: this.volumen != null ? this.volumen : undefined,
                        crypto_code: this.coin != null ? this.coin : undefined,
                        money: this.volumenArs != null ? this.volumenArs : undefined,
                    })
                    .then(() => {
                        store.commit("changeEditID", "");
                        userService.getHistory(store.state.userId).then((history) => {
                            store.commit("changeUserHistory", history);
                            alert("Editado correcto!");
                        });
                    })
                    .then(() => {
                        this.coin= null;
                        this.volumen= null;
                        this.volumenArs= null;
                    });
                }
            } 
        },
        computed:{
        }
    }
</script>

<style scoped>
#movimientos{
    display: flex;
    flex-direction: column;
    min-height: 600px;
    padding-top: 40px;
    background-image: linear-gradient(to top, rgb(106, 191, 245) 0%, #ffffff 100%);
    margin: 0;
    box-sizing: border-box;
    font-family: 'Inter Tight', sans-serif;
    overflow: hidden;
}
.scroll-container {
    overflow-x: auto;
    white-space: nowrap;
}
.conteiner{
    margin-left: 40px;
    margin-right: 40px;
    min-width: 1280px;
}
.cancelConfirm{
    display: flex;
    gap: 10px;
}
.cancelConfirm button{
    width: 70px;
    height: 25px;
}
.dataEdit{
    display: flex;
    flex-direction: row;
    gap: 10px;
    padding-bottom: 10px;
}
.editConteiner{
    background-color: #ffdf8e;
    border-radius: 6px;
    padding-bottom: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 60px;
    margin-right: 60px;
}
.black{
    color: black;
}
form{
    gap: 10px;
}
.alertConteiner{
    width: 50%;
    margin: auto;
    margin-bottom: 15px;
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
.flexCenter{
    display: flex;
    justify-content: center;
    align-items: center;
}
.buttons{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
}
.buttonEdit{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(211, 254, 145);
    width: 80px;
    height: 30px;
    border-radius: 6px;
    cursor: pointer;
}
.buttonEdit:hover{
    background-color: rgb(163, 249, 35);
}
.buttonDelete{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(255, 192, 192);
    width: 80px;
    height: 30px;
    border-radius: 6px;
    cursor: pointer;
}
.buttonDelete:hover{
    background-color: rgb(255, 87, 87);
}
.buttonConfirm{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(211, 254, 145);
    border-radius: 6px;
    cursor: pointer;

}
.buttonConfirm:hover{
    background-color: rgb(163, 249, 35);
}
.buttonCancel{
    background-color: rgb(255, 192, 192);
    border-radius: 6px;
    cursor: pointer;

}
.buttonCancel:hover{
    background-color: rgb(255, 87, 87);
}
.titulos{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    gap: 5px;
}
.titulos h2{
    background-color: rgb(106, 191, 245);
    padding: 10px;
    border-radius: 6px;
    color: black;
    text-align: center;
    box-shadow: inset 0px 0px 2px 2px rgb(79, 164, 221);
    -webkit-box-shadow: inset 0px 0px 4px 4px rgb(79, 164, 221);
    -moz-box-shadow: inset 0px 0px 2px 2px rgb(79, 164, 221);
}
.tituloCentrado{
    display: flex;
    justify-content: center;
    font-size: medium;
}
.dataTable{
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    margin-right: 10px;
    gap: 15px;
}
.data{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    gap: 5px;
}
.data p{
    text-align: center;
    align-items: center;
    color: black;
}
</style>