<template>
  <div class="form-wrapper">
    <div class="tracker">
      <div class="form-header">
        <h1>Expediente Tracker</h1>
      </div>
      <div class="contenido">
        <div class="formulario">
          <MovementForm @clienteEncontrado="handleCliente" @movimientoGuardado="refrescarHistorial">
            <template #extra-button>
              <div class="historial-toggle" v-if="cliente && cliente.doc_num">
                <button @click="verHistorial">
                  Ver Historial
                </button>
              </div>
            </template>
          </MovementForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import MovementForm from '@/components/MovementForm.vue'
import '@/styles/ExpedienteTracker.css'

const router = useRouter()
const cliente = ref(null)

const handleCliente = (data) => {
  cliente.value = data
}

const refrescarHistorial = () => {
  console.log('Historial actualizado')
}

const verHistorial = () => {
  if (cliente.value?.doc_num) {
    router.push(`/historial/${cliente.value.doc_num}`)
  }
}
</script>