<template>
    <main class="contenedor padding-top">
        <h2><span>UtnWallet</span>, servicios financieros basados</h2>
        <h2> tecnología y enfocados en las personas</h2>

        <div class="flex-contein">
            <p>Queremos que ingreses al mundo de las criptomonedas y las finanzas descentralizadas con la tranquilidad de que 
            operás con un equipo de personas que se esfuerza día a día para que puedas mejorar tus rendimientos.
            Crecemos de la mano de ustedes, nuestros usuarios, quienes nos recomiendan, nos escriben y ayudan a mejorar 
            constantemente. Contamos con una cartera cripto de más de 20 activos digitales, incluyendo Bitcoin, Ether, Cardano, 
            DAI, USDT, entre otros, para que puedas hacer más y mejores negocios.</p>
            
            <img src="../assets/vertical-handcrypto-FINAL-min.webp" alt="">
        </div>
    </main>
</template>

<style scoped>
.contenedor {
    max-width: 120rem;
    width: 90%;
    margin: 0 auto;
}
.contenedor h2{
    color: #111c35;
}
.flex-contein {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
.flex-contein img{
    width: 90%;
    max-width: 500px;
}

.padding-top {
    padding-top: 6rem;
}

h2 span {
    font-size: 4.5rem;
    color: rgb(106, 191, 245);
    font-weight: bold;
}
</style>