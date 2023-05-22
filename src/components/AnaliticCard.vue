<template>
    <section id="analitics" class="flexColumn">
        <div class="analitics">
            <div class="analitic-conteiner">
                <h2 class="titulo">Análisis de inversiones</h2>
                <i class='bx bxs-bar-chart-alt-2'></i>
            </div>
            <div class="gridTwo">
                <h2 class="flexCenter encabezado">Criptomoneda</h2>
                <h2 class="flexCenter encabezado">Resultados $ARS</h2>
            </div>
            <div class="flexColumn" v-if="store.state.analiticsState">
                <div class="gridTwo " v-for="elem in store.state.analiticsState">
                    <p class="flexCenter data">{{ elem.name.toUpperCase() }}</p>
                    <p class="flexCenter data">{{elem.value }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
    import store from "../store/index";
</script>

<style scoped>
.analitic-conteiner{
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
  color: rgb(223, 231, 82);
}
#analitics{
    display: flex;
    flex-direction: column;
    min-height: 280px;
    padding-top: 40px;
    padding-bottom: 40px;
    margin-left: 80px;
    margin-right: 80px;
}
.analitics{
    background-color: rgba(8, 161, 221, 0.10); /*para dar el sombreado*/
    border-radius: 6px;
}
.flexCenter{
    display: flex;
    justify-content: center;
    align-items: center;
}
.flexColumn{
    display: flex;
    flex-direction: column;
}
.gridTwo{
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
}
.gridTwo h2{
    box-shadow: inset 0px 0px 2px 2px rgb(79, 164, 221);
    -webkit-box-shadow: inset 0px 0px 4px 4px rgb(79, 164, 221);
    -moz-box-shadow: inset 0px 0px 2px 2px rgb(79, 164, 221);
}
.encabezado{
    background-color: rgb(106, 191, 245);
    padding: 10px;
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 6px;
    color: black;
    font-size: medium;
}
.data{
    color: white;
}
.titulo{
    color: black;
    text-align: center;
    font-size: xx-large;
    text-decoration:underline;
}
</style>