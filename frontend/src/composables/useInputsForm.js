import { computed } from 'vue';

export function useInputsForm(props, emit) {
  const ciProxy = computed({
    get: () => props.ci,
    set: (val) => emit('update:ci', val)
  });

  const nroExpedienteProxy = computed({
    get: () => props.nroExpediente,
    set: (val) => emit('update:nroExpediente', val)
  });

  const comentarioProxy = computed({
    get: () => props.comentario,
    set: (val) => emit('update:comentario', val)
  });

  function emitirBusqueda() {
    emit('buscar-cliente');
  }

  return {
    ciProxy,
    nroExpedienteProxy,
    comentarioProxy,
    emitirBusqueda
  };
}