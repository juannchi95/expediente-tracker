<template>
  <div class="form-wrapper">
    <div :class="['tracker', { 'expandido': mostrarHistorial }]">
      <div class="form-header">
        <h1>Expediente Tracker</h1>
      </div>

      <div class="contenido">
        <div class="formulario">
          <MovementForm @clienteEncontrado="handleCliente" @movimientoGuardado="refrescarHistorial">
            <template #extra-button>
              <div class="historial-toggle" v-if="cliente && cliente.doc_num">
                <button @click="mostrarHistorial = !mostrarHistorial">
                  {{ mostrarHistorial ? 'Ocultar' : 'Ver' }} Historial
                </button>
              </div>
            </template>
          </MovementForm>
        </div>

        <div class="historial-contenedor historial" v-if="mostrarHistorial">
          <MovementHistoric :ci="cliente.doc_num" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import MovementForm from '@/components/MovementForm.vue';
import MovementHistoric from '@/components/MovementHistoric.vue';
import '@/styles/ExpedienteTracker.css';

const cliente = ref(null);
const expediente = ref('');
const mostrarHistorial = ref(false);

watch(cliente, (nuevoCliente) => {
  if (!nuevoCliente || !nuevoCliente.doc_num) {
    mostrarHistorial.value = false  
  }
})

// Recibís cliente desde el componente de formulario
const handleCliente = (data) => {
  cliente.value = data;
};

const handleExpediente = (exp) => {
  expediente.value = exp;
};

const refrescarHistorial = () => {
  console.log('Historial actualizado');
};
</script>