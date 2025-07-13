import { ref } from 'vue';

export function useMovimientos(ciInicial = '') {
  const expedienteSeleccionado = ref('');
  const expedientes = ref([]);
  const movimientos = ref([]);
  const limit = 5;
  const offset = ref(0);
  const ci = ref(ciInicial);

  const fetchExpedientes = async () => {
    if (!ci.value) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/movements/expedientes?ci=${ci.value}`);
      if (!res.ok) throw new Error('Error al cargar expedientes');

      const raw = await res.json();
      expedientes.value = Array.from(new Set(raw)).filter(exp => typeof exp === 'string' && exp.trim() !== '');
    } catch (error) {
      expedientes.value = [];
      console.error('Error al cargar expedientes:', error);
    }
  };

  const fetchMovimientos = async (nuevoOffset = 0) => {
    if (!ci.value) return;

    try {
      offset.value = nuevoOffset;

      let url = `${import.meta.env.VITE_API_URL}/movements?ci=${ci.value}&limit=${limit}&offset=${nuevoOffset}`;
      if (expedienteSeleccionado.value) {
        url += `&expediente=${expedienteSeleccionado.value}`;
      }

      const res = await fetch(url);
      if (!res.ok) throw new Error('Error al obtener movimientos');

      const data = await res.json();
      movimientos.value = (data || []).filter(
        m => m && m.fecha && m.ubicacion && m.estado && m.nro_expediente
      );
    } catch (error) {
      movimientos.value = [];
      console.error('Error al obtener movimientos:', error);
    }
  };

  const siguientePagina = () => fetchMovimientos(offset.value + limit);
  const anteriorPagina = () => fetchMovimientos(offset.value - limit);

  return {
    ci,
    expedienteSeleccionado,
    expedientes,
    movimientos,
    limit,
    offset,
    fetchExpedientes,
    fetchMovimientos,
    siguientePagina,
    anteriorPagina,
  };
}