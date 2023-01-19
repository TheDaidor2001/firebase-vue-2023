<script setup>
import { RouterView, RouterLink } from 'vue-router'
import { useUserStore } from './stores/user';

const userStore = useUserStore()
</script>


<template>
  <div>
    <h1>App base</h1>
    <nav v-if="!userStore.loadingSesion">
      <Router-link to="/" v-if="userStore.userData">Inicio</Router-link> |
      <Router-link to="/login" v-if="!userStore.userData">Iniciar Sesión</Router-link> |
      <Router-link to="/register" v-if="!userStore.userData">Registro</Router-link> |
      <button @click="userStore.logoutUser" v-if="userStore.userData">Logout</button>
    </nav>
    <div v-else>Loading user...</div>
    <RouterView />
  </div>
</template>

