<script setup>
import { ref } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
import { useRoute } from 'vue-router';
import { useDatabaseStore } from '../stores/database';

const route = useRoute()
const url = ref('')
const databaseStore = useDatabaseStore()


onMounted(async()=> {
    url.value = await databaseStore.leerUrl(route.params.id)
})

const handleSubmit = () => {
    databaseStore.updateUrl(route.params.id, url.value)
}
</script>

<template>
    <h1>Editar id: {{ route.params.id }}</h1>
    <form @submit.prevent="handleSubmit">
        <input type="text" placeholder="Ingrese URL" v-model="url">
        <button type="submit">Agregar</button>
    </form>
</template>