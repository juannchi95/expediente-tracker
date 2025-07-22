<template>
  <div class="login-container">
    <img src="@/assets/logo_leonix.png" alt="Logo" class="login-logo" />
    <h2>Organización Leonix</h2>
    <form class="login-form" @submit.prevent="handleLogin">
      <div class="input-group">
        <i class="fa fa-user"></i>
        <input v-model="email" type="text" placeholder="Correo o Usuario" required />
      </div>

      <div class="input-group">
        <i class="fa fa-lock"></i>
        <input v-model="password" type="password" placeholder="Contraseña" required />
      </div>

      <button type="submit">Ingresar</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { auth } from '@/services/auth'
import '@/styles/Login.css'

const router = useRouter()
const toast = useToast()
const email = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value }),
    })

    if (!res.ok) throw new Error('Credenciales inválidas')

    const data = await res.json()

    auth.saveToken(data.token)

    // Guardar usuario en localStorage
    localStorage.setItem('usuario', JSON.stringify(data.user))
    
    router.push('/')
  } catch (err) {
    toast.error('Credenciales inválidas')
    email.value = ''
    password.value = ''
  }
}
</script>