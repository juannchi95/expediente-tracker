import { ref, computed, onMounted } from 'vue';

export function useColorSelect(props, emit) {
  const colores = ref([]);

  const colorProxy = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
  });

  const cargarColores = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/colors`);
      colores.value = await res.json();
    } catch (err) {
      console.error('Error al cargar colores:', err);
    }
  };

  onMounted(() => {
    cargarColores();
  });

  return {
    colorProxy,
    colores
  };
}