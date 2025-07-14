<template>
  <div>
    <label>CI o RUC</label>
    <div class="input-con-lupa">
      <input
        v-model="ciProxy"
        @keydown.enter="emitirBusqueda"
        placeholder="Ingresar CI"
      />
      <i class="fa fa-search" @click="emitirBusqueda"></i>
    </div>

    <label>Nombre Completo</label>
    <input :value="nombre" readonly />

    <label>Numero de Lote</label>
    <input v-model="nroExpedienteProxy" />
  </div>
</template>

<script setup>
import { useInputsForm } from '@/composables/useInputsForm.js';

const props = defineProps({
  ci: {
    type: String,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  nroExpediente: {
    type: String,
    required: true
  },
  comentario: {
    type: String,
    required: false
  }
});

const emit = defineEmits([
  'update:ci',
  'update:nroExpediente',
  'update:comentario',
  'buscar-cliente',
]);

const {
  ciProxy,
  nroExpedienteProxy,
  emitirBusqueda,
} = useInputsForm(props, emit);
</script>

<style scoped src="@/styles/InputsForm.css"></style>