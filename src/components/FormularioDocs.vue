<script setup>
import { ref } from 'vue';
import { useDatabaseStore } from '../stores/database';

const url = ref('')
const databaseStore = useDatabaseStore()

const handleSubmit = () => {
    if(!url){
        alert('llene los campos')
    }
    databaseStore.addUrl(url.value)
}

</script>
<template>
    <form @submit.prevent="handleSubmit">
        <input type="text" placeholder="Ingrese URL" v-model="url">
        <button type="submit">Agregar</button>
    </form>
</template>
<style>

</style>