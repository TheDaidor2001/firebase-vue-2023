<script setup>
import { useUserStore } from "../stores/user"
import { useDatabaseStore } from "../stores/database"
import { useRouter } from "vue-router";
import { ref } from "@vue/reactivity";

const userStore = useUserStore()
const databaseStore = useDatabaseStore()
const router = useRouter()
const url = ref('')

databaseStore.getUrls()

const handleSubmit = () => {
    if(!url){
        alert('llene los campos')
    }
    databaseStore.addUrl(url.value)
}


</script>

<template>
  <main>
    <h1>Hola</h1>
    <p>{{ userStore.userData?.email }}</p>
    <form @submit.prevent="handleSubmit">
        <input type="text" placeholder="Ingrese URL" v-model="url">
        <button type="submit">Agregar</button>
    </form>
    <p v-if="databaseStore.loadingDocs">Loading docs...</p>
    <ul v-else>
      <li v-for="item of databaseStore.documents" :key="item.id"> {{ item.id }} <br> {{ item.name }} <br>{{ item.short }} 
        <button @click="databaseStore.deleteUrl(item.id)">Eliminar</button>
        <button @click="router.push(`/editar/${item.id}`)">Editar</button>
      </li>
    </ul>
  </main>
</template>
