<script setup>
import { useUserStore } from "../stores/user"

const userStore = useUserStore()

</script>

<template>
  <main>
    <h1>Hola</h1>
    <p>{{ userStore.userData?.email }}</p>
  </main>
</template>
