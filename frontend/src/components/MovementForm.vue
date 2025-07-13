<template>
  <div class="form-card">

    <FormularioInputs v-model:ci="ci" v-model:nombre="nombre" v-model:nroExpediente="nroExpediente"
      @buscar-cliente="buscarCliente" />

    <SelectUbicacion v-model="ubicacionId" @ubicacion-cambiada="cargarEstados" />

    <SelectEstado :ubicacion-id="ubicacionId" v-model="estadoId" />

    <CommentarioForm v-model:comentario="comentario" />

    <button :disabled="!puedeGuardar || isSubmitting" @click="guardarMovimiento">
      <i class="fa fa-save"></i>
      Guardar
    </button>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import FormularioInputs from "./InputsForm.vue";
import CommentarioForm from "./CommentForm.vue";
import SelectUbicacion from "./LocationSelect.vue";
import SelectEstado from "./StatusSelect.vue";
import { useToast } from 'vue-toastification'

const ci = ref("");
const nombre = ref("");
const clienteId = ref(null);
const nroExpediente = ref("");
const ubicacionId = ref("");
const estadoId = ref("");
const comentario = ref("");

const toast = useToast();
const isSubmitting = ref(false);
const emit = defineEmits(['clienteEncontrado', 'movimientoGuardado']);

const puedeGuardar = computed(() => {
  return !!clienteId.value && ci.value.trim() !== "";
});

async function buscarCliente() {
  if (!ci.value) return;

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/clients/ci/${ci.value}`);

    if (!res.ok) throw new Error("Cliente no encontrado");

    const data = await res.json();
    nombre.value = data.full_name;
    clienteId.value = data.id;

    // Emitimos el cliente encontrado
    emit('clienteEncontrado', {
      id: clienteId.value,
      doc_num: ci.value,
      nombre: nombre.value
    });

  } catch (err) {
    toast.info(err.message);
    nombre.value = "";
    clienteId.value = null;
  }
}

function cargarEstados() {
  estadoId.value = "";
}

function resetForm() {
  ci.value = "";
  nombre.value = "";
  clienteId.value = null;
  nroExpediente.value = "";
  ubicacionId.value = "";
  estadoId.value = "";
  comentario.value = "";
}

watch(ci, (nuevoValor) => {
  if (nuevoValor.trim() === "") {
    resetForm();
  }
});

async function guardarMovimiento() {
  if (isSubmitting.value) return;

  if (
    !clienteId.value ||
    !nroExpediente.value.trim() ||
    !ubicacionId.value ||
    !estadoId.value
  ) {
    toast.warning("Faltan campos obligatorios");
    return;
  }

  isSubmitting.value = true;

  try {
    const payload = {
      cliente_id: clienteId.value,
      nro_expediente: nroExpediente.value,
      id_ubicacion: ubicacionId.value,
      id_estado: estadoId.value,
      comentario: comentario.value,
    };

    const res = await fetch(`${import.meta.env.VITE_API_URL}/movements`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      toast.success("Movimiento registrado con éxito");
      resetForm();

      //Emitimos el evento para actualizar el historial
      emit('movimientoGuardado');
    } else {
      toast.error("Error inesperado al guardar");
      console.error(err);
    }

  } catch (err) {
    toast.error("Error inesperado al guardar");
    console.error(err);
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<style scoped>
.form-card {
  max-width: 700px;
  margin: auto;
  background: white;
  padding: 20px;
  border-radius: 10px;
}

button {
  width: 100%;
  padding: 12px 0;
  margin-top: 16px;
  background-color: #34495e;
  color: white;
  font-weight: bold;
  font-size: large;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.1s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

button:hover:not(:disabled) {
  background-color: #007bff;
}

.form-card {
  width: 350px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  flex: 1;
}
</style>
