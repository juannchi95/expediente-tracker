import { ref, computed, watch } from 'vue';

export function useStatusSelect(props, emit) {
  const estados = ref([]);

  const estadoProxy = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
  });

  watch(
    () => props.ubicacionId,
    async (id) => {
      if (!id) {
        estados.value = [];
        return;
      }
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/status?id_ubicacion=${id}`);
        estados.value = await res.json();
      } catch (err) {
        console.error('❌ Error al cargar estados:', err);
      }
    },
    { immediate: true }
  );

  return {
    estadoProxy,
    estados
  };
}