<template>
    <div class="img-bg">
        <div class="conteiner">
            <a href="https://twitter.com/" target="_blank" class="boton"><i class='bx bxl-twitter'></i>Enterate de todas las novedades del ecosistema</a>
            <a href="https://www.facebook.com/" target="_blank" class="boton"><i class='bx bxl-facebook-square' ></i>Sumate a la comunidad UtnWallet</a>
            <a href="https://www.youtube.com/" target="_blank" class="boton"><i class='bx bxl-youtube' ></i>Aprendé a operar en nuestro sitio</a>
            <a href="https://play.google.com/store/apps?hl=es" target="_blank" class="boton"><i class='bx bxl-android'></i>¿Tenés Android? Bajate nuestra App</a>
        </div>
    </div>
</template>

<style scoped>
.img-bg{
    background-image: url(../assets/fondo-elegante-textura-blanca_23-2148438405.webp);
    background-repeat: no-repeat;
    background-size: cover;
    height: 60rem;
}
.boton {
    border: 1px solid var(--principal);
    padding: 10px 50px;
    background-color: rgb(106, 191, 245);
    color: #ffffff;
    text-decoration: none;
    text-transform:none;
    font-family: 'Helvetica', sans-serif;
    border-radius: 50px;
}
.bx{
    padding-right: 3rem;
}

.conteiner{
    display: flex;
    flex-direction: column;
    max-width: 620px;
    width: 90%;
    margin: 0 auto;
    padding-top: 7rem;
}
</style>