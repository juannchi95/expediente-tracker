<template>
  <div>
    <label>Ubicación</label>
    <select v-model="ubicacionProxy" @change="$emit('ubicacion-cambiada')">
      <option disabled value="">Seleccione una ubicación</option>
      <option v-for="u in ubicaciones" :key="u.id" :value="u.id">
        {{ u.ubicacion }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { useLocationSelect } from '@/composables/useLocationSelect.js';

const props = defineProps({
  modelValue: [String, Number]
});
const emit = defineEmits(['update:modelValue', 'ubicacion-cambiada']);

const { ubicacionProxy, ubicaciones } = useLocationSelect(props, emit);
</script>

<style scoped src="@/styles/LocationSelect.css"></style>