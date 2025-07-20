import { ref, computed, onMounted } from 'vue';

export function useLocationSelect(props, emit) {
  const ubicaciones = ref([]);

  const ubicacionProxy = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
  });

  const cargarUbicaciones = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/locations`);
      ubicaciones.value = await res.json();
    } catch (err) {
      console.error('Error al cargar ubicaciones:', err);
    }
  };

  onMounted(() => {
    cargarUbicaciones();
  });

  return {
    ubicacionProxy,
    ubicaciones
  };
}