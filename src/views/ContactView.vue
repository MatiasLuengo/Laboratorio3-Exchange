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
    /*padding-bottom: 25rem;*/
    height: 60rem;
}
.boton {
border: 1px solid var(--principal); /*anchura, estilo y color borde*/
padding: 10px 50px; /*espacio alrededor texto*/
background-color: var(--principal); /*color botón*/
color: #ffffff; /*color texto*/
text-decoration: none; /*decoración texto*/
text-transform:none; /*capitalización texto*/
font-family: 'Helvetica', sans-serif; /*tipografía texto*/
border-radius: 50px; /*bordes redondos*/
}
.bx{
    padding-right: 3rem;
}

.conteiner{
    display: flex;
    flex-direction: column;
    max-width: 120rem;
    width: 50%;
    margin: 0 auto;
    padding-top: 7rem;
}
</style>