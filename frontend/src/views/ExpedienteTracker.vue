<template>
  <div :class="['tracker', { 'expandido': mostrarHistorial }]">
    <div class="form-header">
      <h1>Expediente Tracker</h1>
    </div>

    <div class="contenido">
      <div class="formulario">
        <MovementForm @clienteEncontrado="handleCliente" @movimientoGuardado="refrescarHistorial" />

        <div class="historial-toggle">
          <button v-if="cliente && cliente.doc_num" @click="mostrarHistorial = !mostrarHistorial">
            {{ mostrarHistorial ? 'Ocultar' : 'Ver' }} Historial
          </button>
        </div>
      </div>

      <div class="historial-contenedor historial" v-if="mostrarHistorial">
        <MovementHistoric :ci="cliente.doc_num" />
      </div>
    </div>
  </div>
</template>



<script setup>
import { ref } from 'vue';
import MovementForm from '@/components/MovementForm.vue';
import MovementHistoric from '@/components/MovementHistoric.vue';

const cliente = ref(null);
const expediente = ref('');
const mostrarHistorial = ref(false);

// Recibís cliente desde el componente de formulario
const handleCliente = (data) => {
  cliente.value = data;
};

const handleExpediente = (exp) => {
  expediente.value = exp;
};

const refrescarHistorial = () => {
  // Si querés refrescar la vista cuando se guarda un nuevo movimiento,
  // podés emitir un evento al hijo o forzar un reinicio de key
  // Ejemplo opcional: cambiar una key con Date.now()
};
</script>

<style scoped>
.tracker {
  display: flex;
  flex-direction: column;
  transition: max-width 0.2s ease;
  width: 100%;
  margin: auto;
  max-width: 400px;
}

.tracker.expandido {
  max-width: 800px;
}

.contenido {
  max-width: 1000px;

  display: flex;
  gap: 1rem;
  padding: 1rem;
}

@media (max-width: 768px) {
  .contenido {
    flex-direction: column;
  }
}

@media (min-width: 768px) {
  .contenido {
    flex-direction: row;
    gap: 1rem;
  }

  .formulario {
    flex: 1;
    max-width: 400px;
  }

  .historial-contenedor {
    flex: 1;
    background: #ffffff;
    border-radius: 8px;
    padding: 0.5rem;
    overflow-x: auto;
    max-height: 525px;
  }
}

.historial-toggle {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
}

.historial-toggle button {
  padding: 0.5rem 1.2rem;
  background-color: #007bff;
  border: none;
  color: white;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.historial-toggle button:hover {
  background-color: #0056b3;
}

.historial {
  width: 350px;
  margin-top: 0;
  padding: 0.5rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Para pantallas menores a 600px */
@media (max-width: 768px) {

  .form-card,
  .historial {
    max-width: 300px;
  }
}
</style>
