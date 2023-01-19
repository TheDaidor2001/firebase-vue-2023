<script setup>
import { ref } from '@vue/reactivity';
import { useUserStore } from '../stores/user';



const userStore = useUserStore() //Tienda
// const router = useRouter() //Push Router
const email = ref('daniel@daniel.com')
const password = ref('123123')


const handleSubmit = async () => {
    if (!email.value || password.value.length < 5) return alert('Llena los campos')
    await userStore.loginUser(email.value,password.value)
}

</script>
<template>
    <h1>Login</h1>

    <form @submit.prevent="handleSubmit">
        <input v-model.trim="email" type="email" placeholder="Ingrese Email">
        <input v-model.trim="password" type="password" placeholder="Ingrese contraseña">
        <button :disabled="userStore.loadingUser" type="submit">Iniciar Sesión</button>
    </form>
</template>
<style>

</style>