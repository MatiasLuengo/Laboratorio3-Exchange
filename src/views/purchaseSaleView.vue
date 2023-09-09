<template onload="upload()">
    <div id="compra-venta" >
        <BuyCard />
        <SaleCard />
    </div>
</template>

<script setup>
    import SaleCard from "../components/SaleCard.vue";
    import BuyCard from "../components/BuyCard.vue";
    import CryptoService from "../services/criptoServices";

    CryptoService.getCrypto();
    CryptoService.upload();

</script>

<style scoped>
#compra-venta{
    Font-size: 16px;
    background-image: linear-gradient(to top, rgb(106, 191, 245) 0%, #ffffff 100%); /*DEGRADADO*/
    margin: 0;
    box-sizing: border-box;
    font-family: 'Inter Tight', sans-serif;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    row-gap: 20px;
    padding: 40px 0;
}
</style>