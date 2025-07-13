<template>
  <div>
    <label>Comentario</label>
    <textarea 
      v-model="comentarioProxy" 
      rows="5"/>
  </div>
</template>

<script setup>
import { useInputsForm } from '@/composables/useInputsForm.js';

const props = defineProps({
  comentario: String,
});

const emit = defineEmits([
  'update:comentario'
]);

const {
  comentarioProxy,
} = useInputsForm(props, emit);
</script>

<style scoped src="@/styles/InputsForm.css"></style>