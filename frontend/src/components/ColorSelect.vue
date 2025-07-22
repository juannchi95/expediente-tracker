<template>
  <div class="color-select-container">
    <label>Color de cinta</label>
    <div class="color-grid">
      <div
        v-for="color in colores"
        :key="color.id"
        class="color-option"
        :class="{ selected: color.id === colorProxy }"
        :style="{ backgroundColor: colorMap[color.color] || 'gray' }"
        @click="colorProxy = color.id"
        :title="color.description"
      >
        <span class="tooltip">{{ color.description }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useColorSelect } from '@/composables/useColorSelect.js'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const { colorProxy, colores } = useColorSelect(props, emit)

const colorMap = {
  NEGRO: '#000000',
  ROJO: '#e74c3c',
  AMARILLO: '#f1c40f',
  AZUL: '#3498db',
  GRIS: '#95a5a6',
}
</script>

<style scoped>
label {
  font-weight: bold;
}

.color-select-container {
  margin-bottom: 10px;
}

.color-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 5px;
}

.color-option {
  width: 40px;
  height: 40px;
  border-radius: 6px;
  cursor: pointer;
  border: 2px solid transparent;
  position: relative;
  transition: transform 0.2s ease;
}

.color-option.selected {
  border-color: #2c3e50;
  transform: scale(1.1);
}

.color-option:hover .tooltip {
  opacity: 1;
  visibility: visible;
}

.tooltip {
  position: absolute;
  bottom: -22px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s;
  z-index: 10;
}
</style>