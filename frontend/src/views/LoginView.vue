<template>
  <div class="login-container">
    <div class="login-header">
      <i class="fa fa-user-circle"></i>
      <h2>Iniciar sesión</h2>
    </div>
    <form @submit.prevent="handleLogin" class="login-form">
      <input v-model="email" type="text" placeholder="Correo o Usuario" required />
      <input v-model="password" type="password" placeholder="Contraseña" required />
      <button type="submit">Ingresar</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '@/services/auth'
import '@/styles/Login.css'
import { useToast } from 'vue-toastification'

const toast = useToast()
const router = useRouter()
const email = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    })

    if (!response.ok) {
      throw new Error('Credenciales inválidas')
    }

    const data = await response.json()
    auth.saveToken(data.token)
    router.push('/')
  } catch (err) {
    toast.error(err.message)
    email.value = ''
    password.value = ''
  }
}
</script>
