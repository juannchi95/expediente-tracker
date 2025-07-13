<template>
  <main>
    <div class="form-wrapper">
      <ExpedienteTracker />
    </div>
  </main>
</template>

<script setup>
import ExpedienteTracker from './views/ExpedienteTracker.vue';
</script>

<style>
body {
  margin: 0;
  background: #f4f5f7;
  font-family: Arial, sans-serif;
}

main {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.form-wrapper {
  border-radius: 10px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;


  max-width: 100%;
  display: flex;
  justify-content: center;
}

.form-header {
  background-color: #34495e;
  padding: 5px;
  color: white;
  text-align: center;
}
</style>