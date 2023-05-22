<template>
    <div class="nav-bg">
        <div class="contenedor nav-grid">
            <div v-if="!$store.state.userId">      
                <router-link class="logo" to="/">
                    <img src="../src/assets/image_128.gif" class="logo__img" alt="">
                    <h1 class="logo__nombre">Utn<span>Wallet</span></h1>
                </router-link>
            </div>
            <div v-if="$store.state.userId">      
                <router-link class="logo" to="/panel">
                    <img src="../src/assets/image_128.gif" class="logo__img" alt="">
                    <h1 class="logo__nombre">Utn<span>Wallet</span></h1>
                </router-link>
            </div>
            <nav v-if="$store.state.userId" class="secondary-nav">
                <router-link to="/panel" class="navegacion__enlace">Compra / Venta</router-link>
                <router-link to="/historical" class="navegacion__enlace">Movimientos</router-link>
                <router-link to="/analysis" class="navegacion__enlace">Cartera / Análisis</router-link>
            </nav>
            <nav class="primary-nav grid-location">
                <router-link to="/about" class="navegacion__enlace">Nosotros</router-link>
                <router-link to="/contact" class="navegacion__enlace">Contacto</router-link>
                <div class="welcome" v-if="$store.state.userId">
                    <i class='bx bx-user-circle'></i>
                    <button @click="signOff">Bienvenido: {{ $store.state.userId }}</button>
                </div> 
            </nav>
        </div>
    </div>

    <router-view/>
    <footer>© 2022 UtnWallet. Todos los derechos reservados.</footer>
</template>

<script>
import store from '@/store/index'
import router from './router';
    export default{
        methods:{
            signOff(){
                const flag = confirm(`¿Está seguro que desea cerrar sesión?`);
                if (flag){
                    store.commit("changeUserId", "");
                    router.push("/");
                    return;
                }
            }
        }
    }
</script>

<style>
:root{
    --principal: rgb(106, 191, 245);
    --secundario: #111c35;
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
.logo{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    gap: 5px;
}
.logo__img{
    width: 30px;
    height: 30px;
}
.nav-bg{
    background-color: var(--principal);
    padding-top: 1rem;
}
.nav-grid{
    display: grid;
    grid-template-columns: 10% 60% 30%;
}

.nav-bg a{
    color: var(--blanco);
    text-decoration: none;
}
.contenedor {
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
    padding-bottom: 3rem;
    color: var(--blanco);
    text-align: center;
}
img{
    max-width: 60%;
}

.primary-nav a:after {
    content: "";
    display: block;
    margin: auto;
    height: 2px;
    width: 0px;
    transition: all .8s;
}
.primary-nav a:hover:after {
    width: 100%;
    background: var(--blanco);
}
.primary-nav{
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-bottom: 0.5rem;
    align-items: center;
    gap: 20px;
}
@media (min-width: 480px) {
    .primary-nav{
        flex-direction: row;
    }  
}
.primary-nav a{
    font-size: 2rem;
    font-weight: 700;
    margin-left: 2rem;
}
.primary-nav a:focus{
    color: var(--secundario);
}
.secondary-nav a:after {
    content: "";
    display: block;
    margin: auto;
    height: 2px;
    width: 0px;
    transition: all .8s;
}
.secondary-nav a:hover:after {
    width: 100%;
    background: var(--blanco);
}
.secondary-nav{
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-bottom: 0.5rem;
    align-items: center;
    gap: 20px;
}
@media (min-width: 480px) {
    .secondary-nav{
        flex-direction: row;
    }  
}
.secondary-nav a{
    font-size: 2rem;
    font-weight: 700;
    margin-left: 2rem;
}
.secondary-nav a:focus{
    color: var(--secundario);
}
.grid-location{
    grid-column-start: 3;
    grid-column-end: 4;
}
.welcome{
    display: flex;
    flex-direction: row;
    align-items: center;
}
.welcome i{
    color: white;
}
.welcome button{
    margin-left: 3px;
    font-size:small;
    border-radius: 6px;
    cursor: pointer;

}
</style>
