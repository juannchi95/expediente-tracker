<template>
  <div>
    <label>Estado</label>
    <select v-model="estadoProxy">
      <option disabled value="">Seleccione un estado</option>
      <option v-for="e in estados" :key="e.id" :value="e.id">
        {{ e.estado }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { useStatusSelect } from '@/composables/useStatusSelect.js';

const props = defineProps({
  modelValue: [String, Number],
  ubicacionId: [String, Number]
});

const emit = defineEmits(['update:modelValue']);

const { estadoProxy, estados } = useStatusSelect(props, emit);
</script>

<style scoped src="@/styles/StatusSelect.css"></style>
