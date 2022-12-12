<!-- <template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/>
</template> -->

<template>
  <div class="nav-bg">

    <div class="contenedor nav-grid">
      <div>      
        <router-link class="logo" to="/"><h1 class="logo__nombre">Utn<span>Wallet</span></h1></router-link>
      </div>

      <nav class="navegacion-principal primary-nav">
        <!-- <a href="aboutUs.html" class="navegacion__enlace">Nosotros</a> -->
        <router-link to="/about" class="navegacion__enlace">Nosotros</router-link>
        <!-- <a href="investments.html" class="navegacion__enlace">Inversiones</a> -->  
        <router-link to="/contact" class="navegacion__enlace">Contacto</router-link>      
      </nav>

    </div>
  </div>

  <router-view/>
  <footer>© 2022 UtnWallet. Todos los derechos reservados.</footer>
</template>

<script>

</script>
<!-- <style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style> -->

<style>
:root{
    --principal: #111c35;
    --secundario: #ffec27;
    --blanco: #ffffff;

    --primaryFont: 'Inter Tight', sans-serif;
}

h1, h2, p, a, footer{
    font-family: var(--primaryFont);
    color: var(--blanco);
}
h2 {
    font-weight: bold;
    font-size: 4rem;
}

h3 {
    font-size: 2.8rem;
}

p {
    font-size: 2.5rem;
    font-weight: bold;
}

section p {
    font-size: 1.7rem;
}

html{
    Font-size: 62.5%;
}
 
Body{
    Font-size: 16px;
    background-image: linear-gradient(to top, var(--principal) 0%, var(--blanco) 100%); /*DEGRADADO*/
    
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: var(--primaryFont);

}

.nav-bg{
    background-color: var(--principal);
    padding-top: 1rem;
}
.nav-grid{
    display: grid;
    grid-template-columns: 15% 85%;
}

.nav-bg a{
    color: var(--blanco);
    text-decoration: none;
}
.navegacion-principal{
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-bottom: 0.5rem;
    align-items: center;
}
@media (min-width: 480px) {
    .navegacion-principal{
        flex-direction: row;
    }  
}
.navegacion-principal a{
    font-size: 2rem;
    font-weight: 700;
    margin-left: 2rem;
}
/* .navegacion-principal a:hover {
color: var(--secundario);
} */
.contenedor {
    max-width: 120rem;
    width: 90%;
    margin: 0 auto;
}

.img-bg{
    background-image: url(../src/assets/444.png);
    background-repeat: no-repeat;
    background-size: cover;
    /*padding-bottom: 25rem;*/
    height: 40rem;
}

.header__texto{
    color: var(--blanco);
    padding-top: 0.5rem;
}

.bottom{
    padding-top: 15rem;
}


.boton {
    background-color: var(--principal);
    display: block;
    text-align: center;
    color: var(--secundario);
    text-decoration-line: none;
    font-weight: 700; /*grosor*/
    font-size: 2rem; /*tamañ0*/
    padding: 1rem 2rem;
    margin-top: 0.7rem;
    text-transform: uppercase;
    border-radius: .7rem;
    /*width: 80%;*/
    border: none;
}
@media (min-width: 768px) {
    .boton {
        width: auto; /*para que vuelva al tamaño "original"*/
        display:inline-block;
        /*padding: 1.2rem 2rem;*/
    }    
}

.boton:hover{
    background-color: var(--blanco);
    transition: background-color 1s ease-in;
}

@media (min-width: 768px) {
    .servicios{
        padding-top: 3rem;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }
    
}

.servicio{
    text-align: center;
    color: var(--blanco);
}

footer{
    padding-top: 3rem;
    color: var(--blanco);
    text-align: center;
}

img{
    max-width: 60%;
}



</style>
