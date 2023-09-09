<template>
  <main>
        <div class="servicios contenedor">
            <section class="servicio">
                <img src="../assets/converti.webp" alt="Conversion">
                <h3>Convertí</h3>
                <p>Pasar de pesos o dólares a criptos <br> nunca fue tan facil</p>
            </section>

            <section class="servicio">
                <img src="../assets/inverti.webp" alt="Inversion">
                <h3>Invertí</h3>
                <p>Generá ganancias pasivas <br> en tus criptos en un solo click</p>
            </section>

            <section class="servicio">
                <img src="../assets/deposita.webp" alt="Deposito">
                <h3>Depositá y Enviá</h3>
                <p>Mové tus fondos <br> cuando quieras y al instante</p>
            </section>
        </div>
    </main>
</template>

<script>
export default {
  name: 'services',
  props: {
    
  }
}
</script>

<style scoped>
.servicios{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin: 30px auto;
}
.servicio{
    text-align: center;
    color: var(--blanco);
    
}
.servicio img{
    max-width: 200px;
}
.servicio h3{
    margin-top: 5px;
    margin-bottom: 0;
}
</style>