<script setup>
import { useUserStore } from "../stores/user"
import { useDatabaseStore } from "../stores/database"

const userStore = useUserStore()
const databaseStore = useDatabaseStore()

databaseStore.getUrls()
</script>

<template>
  <main>
    <h1>Hola</h1>
    <p>{{ userStore.userData?.email }}</p>
    <p v-if="databaseStore.loadingDocs">Loading docs...</p>
    <ul v-else>
      <li v-for="item of databaseStore.documents" :key="item.id"> {{ item.id }} <br> {{ item.name }} <br>{{ item.short }} </li>
    </ul>
  </main>
</template>
