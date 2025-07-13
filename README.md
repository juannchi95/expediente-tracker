# 🧱 Arquitectura del Proyecto

Este proyecto sigue una arquitectura **Cliente-Servidor en Capas**, con el frontend desarrollado en Vue 3 como una SPA (Single Page Application) y el backend en Node.js con PostgreSQL como base de datos.

## 📐 Diagrama de Capas

```text
[ Usuario ]
     │
     ▼
┌──────────────────────────────┐
│   Capa de Presentación       │  ← (Frontend - SPA en Vue)
│   ────────────────────────  │
│   - Vue 3 (Componentes)      │
│   - MovementForm.vue         │
│   - MovementHistoric.vue     │
│   - ExpedienteTracker.vue    │
│   - Composables (useMovimientos) │
└──────────────────────────────┘
     │  HTTP (fetch/axios)
     ▼
┌──────────────────────────────┐
│   Capa de Controlador (API)  │  ← (Backend - Node.js/Express)
│   ────────────────────────  │
│   - Rutas Express (movements.js, clients.js) │
│   - Validación de datos       │
└──────────────────────────────┘
     │
     ▼
┌──────────────────────────────┐
│   Capa de Lógica de Negocio  │
│   ────────────────────────  │
│   - Inserción de movimientos │
│   - Consultas filtradas      │
└──────────────────────────────┘
     │
     ▼
┌──────────────────────────────┐
│   Capa de Persistencia       │  ← (Base de datos)
│   ────────────────────────  │
│   - PostgreSQL               │
│   - Tablas: movements, clients, estados, ubicaciones │
└──────────────────────────────┘
