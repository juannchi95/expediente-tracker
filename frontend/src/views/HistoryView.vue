<template>
  <div class="history-wrapper">
    <div class="history-header">
      <h1>Movimientos</h1>
    </div>
    <div class="contenido">
      <MovementHistoric :ci="ci" />
    </div>
    <button class="volver-btn" @click="volver">
      <i class="fa fa-arrow-left"></i>
      Volver
    </button>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import MovementHistoric from '@/components/MovementHistoric.vue'
import '@/styles/ExpedienteTracker.css'

const route = useRoute()
const router = useRouter()

const ci = route.params.ci

const volver = () => {
  router.push('/')
}
</script>

<style scoped>
.volver-btn {
  margin-top: 1rem;
  padding: 10px;
  background-color: #34495e;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  gap: 10px;
  display: flex;
  align-items: center;
  margin: 0 0 1rem 1rem;
}

/* Para pantallas menores a 750px */
@media (max-width: 750px) {
  .volver-btn {
    margin: 0 0 0.5rem 0.5rem;
  }
}
</style>