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
                <div class="border-icon">
                    <i class='bx bxl-instagram-alt'></i>                        
                </div>
                <div class="border-icon">
                    <i class='bx bxl-google'></i>
                </div>
                <div class="border-icon">
                    <i class='bx bxl-facebook-circle' ></i>
                </div>

            </div>
            <p class="free-account">Crea una cuenta gratis</p>
            <input type="text" placeholder="Nombre">
            <input type="email" placeholder="Email">
            <input type="password" placeholder="Contraseña">
            <input type="button" value="Registrarse">
        </form>
    </div>

    <div class="container-form sign-in">
        <form class="form">
            <h2 class="create-account">Iniciar Sesión</h2>
            <div class="icons">
                <div class="border-icon">
                    <i class='bx bxl-instagram-alt'></i>                        
                </div>
                <div class="border-icon">
                    <i class='bx bxl-google'></i>
                </div>
                <div class="border-icon">
                    <i class='bx bxl-facebook-circle' ></i>
                </div>

            </div>
            <p class="free-account">Ingresa aquí</p>
            <input type="email" placeholder="Email">
            <input type="password" placeholder="Contraseña">
            <input type="button" value="Iniciar Sesión">
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
export default {
    el: '#app',
  name: 'login',
  props: {
    
  }, methods:{
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
    }
  }
}

</script>

<style scoped>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: var(--primaryFont);
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

.form {
    width: 400px;
    padding: 1rem;
    margin: 2rem;
    background-color: rgb(51, 51, 51, 0.602);
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

.primary-nav a {
    display: block;
    text-align: center;
    position: relative;
    text-decoration: none;
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
</style>