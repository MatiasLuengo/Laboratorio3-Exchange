<template>
    <section id="analitics" class="flexColumn">
        <div class="analitic-conteiner">
            <h2 class="titulo">Análisis de inversiones</h2>
            <i class='bx bxs-bar-chart-alt-2'></i>
        </div>
        <div class="gridTwo">
            <h2 class="encabezado">Criptomoneda</h2>
            <h2 class="encabezado">Resultados $ARS</h2>
        </div>
        <div class="flexColumn" v-if="store.state.analiticsState">
            <div class="gridTwo " v-for="elem in store.state.analiticsState">
                <p class="data">{{ elem.name.toUpperCase() }}</p>
                <p class="data">{{elem.value.toLocaleString() }}</p>
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
    height: auto;
    gap: 10px;
}
i{
    font-size: 40px;
    color: rgb(223, 231, 82);
}
#analitics{
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
.gridTwo h2,
.gridTwo p{
    text-align: center;
}
.encabezado{
    background-color: rgb(106, 191, 245);
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 6px;
    color: black;
    font-size: medium;
    padding: 10px;
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