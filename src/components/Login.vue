<template>
<div class="header__texto img-bg login-conteiner">
    <div id="signUpPart" class="container-form sign-up">
        <div class="welcome-back">
            <div class="message">
                <h2>Bienvenido a UtnWallet</h2>
                <p>Si ya tienes una cuenta por favor inicia sesión aquí</p>
                <button @click="signUpBtn" class="sign-up-btn">Iniciar Sesión</button>
            </div>
        </div>
        <form class="form">
            <h2 class="create-account">Crear una cuenta</h2>
            <div class="icons">
                <a href="https://www.instagram.com/" target="_blank" class="border-icon">
                    <i class='bx bxl-instagram-alt'></i>                        
                </a>
                <a href="https://www.google.com/" target="_blank" class="border-icon">
                    <i class='bx bxl-google'></i>
                </a>
                <a href="https://www.facebook.com/" target="_blank" class="border-icon">
                    <i class='bx bxl-facebook-circle' ></i>
                </a>
            </div>
            <p class="free-account">Crea una cuenta gratis</p>
            <input type="text" placeholder="Nombre">
            <input type="email" placeholder="Email">
            <input type="password" placeholder="Contraseña">
            <input type="button" value="Registrarse">
        </form>
    </div>
    <div class="container-form sign-in">
        <form class="form" @submit.prevent="onSubmit">
            <h2 class="create-account">Iniciar Sesión</h2>
            <div class="icons">
                <a href="https://www.instagram.com/" target="_blank" class="border-icon">
                    <i class='bx bxl-instagram-alt'></i>                        
                </a>
                <a href="https://www.google.com/" target="_blank" class="border-icon">
                    <i class='bx bxl-google'></i>
                </a>
                <a href="https://www.facebook.com/" target="_blank" class="border-icon">
                    <i class='bx bxl-facebook-circle' ></i>
                </a>
            </div>
            <p class="free-account">Ingresa aquí</p>
            <input type="text" placeholder="Email" id="id">
            <div class="alertConteiner" v-if="errors">
                <div class="alert" v-for="error in errors">
                <p class="">{{error}}</p>
                </div>
            </div>
            <input type="password" placeholder="Contraseña">
            <button type="submit" id="getInto">Iniciar Sesión</button>
        </form>
        <div class="welcome-back">
            <div class="message">
                <h2>Empieza a operar ahora</h2>
                <p>Si aún no tiene una cuenta por favor regístrese aquí</p>
                <button @click="signInBtn" class="sign-in-btn">Registrarse</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import router from '@/router';
import store from "../store/index";
import UserService from "../services/user.service";

export default {
    el: '#app',
    name: 'login',
    props: {
    },
    data(){
        return {
            errors: []
        }
    },
    methods:{
        signUpBtn: function(){
            const $btnSignIn = document.querySelector('.sign-in-btn'),
                $btnSignUp = document.querySelector('.sign-up-btn'),
                $signUp = document.querySelector('.sign-up'),
                $signIn = document.querySelector('.sign-in');
            document.addEventListener('click', e => {
                if(e.target === $btnSignIn || e.target === $btnSignUp){
                    $signIn.classList.toggle('active');
                    $signUp.classList.toggle('active')
                }
            }
            )
        },
        onSubmit(){
            this.errors = [];
            const userId = document.getElementById("id").value;
            let letras="abcdefghyjklmnñopqrstuvwxyz";
            let letras_mayusculas="ABCDEFGHYJKLMNÑOPQRSTUVWXYZ";
            let numeros="0123456789";
            let min = 6;
            let max = 12;
            if(userId == ""){
                this.errors.push("Debe ingresar su ID");
            }else{
                if(userId.length < min){
                this.errors.push("El Id debe contener al menos 6 caracteres alfanumericos");
                }
                if(userId.length > max){
                    this.errors.push("El Id no debe superar los 12 caracteres alfanumericos");
                }
                let flagMin = false;
                for(let i=0; i<userId.length; i++){
                    if (letras.indexOf(userId.charAt(i),0)!=-1){
                        flagMin = true;
                    }
                }
                if(!flagMin){
                    this.errors.push("El ID debe contener al menos una letra minúscula");
                }
                let flagMay = false;
                for(let i=0; i<userId.length; i++){
                    let flag = false;
                    if (letras_mayusculas.indexOf(userId.charAt(i),0)!=-1){
                        flagMay = true;
                    }
                }
                if(!flagMay){
                    this.errors.push("El ID debe contener al menos una letra mayúscula");
                }
                let flagNum = false;
                for(let i=0; i<userId.length; i++){
                    let flag = false;
                    if (numeros.indexOf(userId.charAt(i),0)!=-1){
                        flagNum = true;
                    }
                }
                if(!flagNum){
                    this.errors.push("El ID debe contener al menos un número");
                }
            }
            if(this.errors.length == 0){
                store.commit("changeUserId", userId);
                store.commit("changeErrorAlert", false);
                const history = UserService.getHistory(store.state.userId);
                store.commit("changeUserHistory", history);
                router.push("/panel");
                return;
            }else{
                store.commit("changeErrorAlert", true);
            }
        }
    },
}
</script>

<style scoped>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: var(--primaryFont);
}

.alert{
display: flex;
justify-content: center;
align-items: center;
width: 90%;
height: auto;
background-color: gainsboro;
margin: auto;
margin-bottom: 15px;
}
.alert p{
    color: red;
    font-size: small;
    margin-top: 5px;
    margin-bottom: 5px;
}
.container-form {
    width: 90%;
    height: 90vh;
    display: flex;
    justify-content: space-around;
    transition: all .5s ease-out;
}

.welcome-back {
    display: flex;
    align-items: center;
    text-align: center;
}

.message {
    padding: 1rem;
}

.message h2 {
    font-size: 4rem;
    padding: 1rem 0;
    color: #111c35;
}
.message p {
    color: #111c35;
}

.message button {
    padding: 1rem;
    font-weight: 400;
    background-color: #4a4aee;
    border-radius: 2rem;
    border: none;
    outline: none;
    cursor: pointer;
    font-size: 1.5rem;
    margin-top: 2rem;
    transition: all .3s ease-in;
    color: #fff;
}

.message button:hover {
    background-color: #6464f8;
}
#getInto {
    padding: 1rem;
    font-weight: 400;
    background-color: #4a4aee;
    border-radius: 2rem;
    border: none;
    outline: none;
    cursor: pointer;
    font-size: 1.5rem;
    margin-top: 2rem;
    transition: all .3s ease-in;
    color: #fff;
}

#getInto:hover {
    background-color: #6464f8;
}

.form {
    width: 400px;
    padding: 1rem;
    margin: 2rem;
    background-color: rgb(106, 191, 245);
    text-align: center;
}

.create-account {
    padding: 2.7rem 0;
    font-size: 1.9rem;
}

.icons {
    width: 200px;
    display: flex;
    justify-content: space-around;
    margin: auto;
}

.border-icon {
    height: 20px;
    width: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    border: solid thin white;
    border-radius: 50%;
    font-size: 1.5rem;
    transition: all .3s ease-in;
    text-decoration: none;
}

.border-icon:hover {
    background-color: #4a4aee;
    cursor: pointer;
}

.free-account {
    padding: 2rem 0;
}

.form input {
    width: 70%;
    display: block;
    margin: auto;
    margin-bottom: 2rem;
    background-color: transparent;
    border: none;
    border-bottom: white thin solid;
    text-align: center;
    outline: none;
    padding: .2rem 0;
    font-size: 1.5rem;
    color: var(--blanco);
}

.form input[type="button"] {
    width: 60%;
    margin: auto;
    border: solid thin white;
    padding: .7rem;
    border-radius: 2rem;
    background-color: white;
    font-weight: 600;
    margin-top: 3rem;
    font-size: 1.5rem;
    cursor: pointer;
    color: #222;
}

.sign-in {
    position: absolute;
    opacity: 0;
    visibility: hidden;
}

.sign-in.active {
    opacity: 1;
    visibility: visible;
}

.sign-up.active {
    opacity: 0;
    visibility: hidden;
}

.login-conteiner {
/*     position: relative;
 */
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-position: center;
}


</style>