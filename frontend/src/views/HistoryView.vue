<template>
  <div class="history-wrapper">
    <h1>Historial de Movimientos</h1>
    <MovementHistoric :ci="ci" />

    <button class="volver-btn" @click="volver">
      ← Volver
    </button>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import MovementHistoric from '@/components/MovementHistoric.vue'
import '@/styles/ExpedienteTracker.css' // si querés, podés separar estilo en uno propio

const route = useRoute()
const router = useRouter()

const ci = route.params.ci

const volver = () => {
  router.push('/')
}
</script>

<style scoped>
.history-wrapper {
  padding: 1rem;
  max-width: 800px;
  margin: auto;
}

.volver-btn {
  margin-top: 1rem;
  padding: 10px;
  background-color: #ccc;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}
</style>