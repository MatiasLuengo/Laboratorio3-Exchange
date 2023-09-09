<template>
    <div id="analysis">
        <ActualState/>
        <AnaliticCard/>
    </div>
</template>

<script setup>
import ActualState from "../components/ActualState.vue";
import AnaliticCard from "../components/AnaliticCard.vue";
</script>

<style>
#analysis{
    background-image: linear-gradient(to top, rgb(106, 191, 245) 0%, #ffffff 100%); /*DEGRADADO*/
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter Tight', sans-serif;
    padding: 40px 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    row-gap: 30px;
    min-height: 600px;
}
</style>