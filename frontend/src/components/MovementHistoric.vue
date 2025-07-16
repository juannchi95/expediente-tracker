<template>
  <div class="history-card">
    <div v-if="expedientes.length > 1">
      <label for="expedienteSelect">Filtrar por Lote:</label>
      <select id="expedienteSelect" v-model="expedienteSeleccionado" @change="fetchMovimientos(0)">
        <option value="">Todos</option>
        <option v-for="exp in expedientes" :key="exp" :value="exp">
          {{ exp }}
        </option>
      </select>
    </div>
    <table v-if="movimientos.length">
      <thead>
        <tr>
          <th>Lote</th>
          <th>Ubicación</th>
          <th>Fecha y hora</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(mov, index) in movimientos" :key="index">
          <td>{{ mov.nro_expediente }}</td>
          <td>{{ mov.ubicacion }}</td>
          <td>{{ mov.fecha }}</td>
        </tr>
      </tbody>
    </table>
    <p v-if="!movimientos.length && offset === 0" style="margin: 1.5rem 0; color: #777; font-style: italic;">
      No hay movimientos aún para este cliente.
    </p>
    <p v-if="!movimientos.length && offset > 0" style="margin: 1.5rem 0; color: #777; font-style: italic;">
      Fin del historial.
    </p>
    <div v-if="movimientos.length || offset > 0" class="paginacion">
      <button @click="anteriorPagina" :disabled="offset === 0">Anterior</button>
      <button @click="siguientePagina" :disabled="ultimaCantidad < limit">Siguiente</button>
    </div>
  </div>
</template>

<script setup>
import { watch, onMounted } from 'vue';
import { useMovimientos } from '@/composables/useMovementsHistoric';

const props = defineProps({
  ci: { type: String, required: true },
});

const {
  expedienteSeleccionado,
  expedientes,
  movimientos,
  offset,
  limit,
  fetchExpedientes,
  fetchMovimientos,
  siguientePagina,
  anteriorPagina,
  ci: ciRef,
  ultimaCantidad,
} = useMovimientos(props.ci);

watch(() => props.ci, (nuevoCI) => {
  ciRef.value = nuevoCI;
  expedienteSeleccionado.value = '';
  fetchExpedientes();
  fetchMovimientos(0);
});

onMounted(() => {
  fetchExpedientes();
  fetchMovimientos();
});
</script>

<style scoped>
select {
  margin: 0.5rem;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  font-size: 0.95rem;
}

th {
  background-color: #f0f0f0;
  text-align: left;
  padding: 0.75rem;
  border-bottom: 2px solid #ccc;
}

td {
  padding: 0.75rem;
  border-bottom: 1px solid #ddd;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #f1f1f1;
}

.paginacion {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
  gap: 1rem;
}

.paginacion button {
  padding: 0.5rem 1rem;
  border: none;
  background-color: #007bff;
  color: white;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
}

.paginacion button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
