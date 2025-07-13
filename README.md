# Expediente Tracker

Sistema moderno para el registro y seguimiento de movimientos de expedientes judiciales o administrativos.

✨ Interfaz amigable en Vue.js  
🔐 Backend seguro con Node.js (Express) y autenticación JWT  
🗃️ Base de datos PostgreSQL  
📦 Arquitectura Dockerizada lista para desarrollo local y despliegue  
🧱 Estructura organizada en rutas, controladores y middlewares

---

## 🚀 Cómo levantar el proyecto

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/expediente-tracker.git
cd expediente-tracker

# Levantar todo con Docker
docker-compose up --build -d
```

---

## 🔒 Seguridad

El backend protege rutas con `authMiddleware` usando JWT. Para acceder a rutas como `/clients`, `/movements`, etc., es necesario enviar el token en el encabezado HTTP:

```http
Authorization: Bearer <token>
```

---

## 🧱 Arquitectura del Proyecto

Este proyecto sigue una arquitectura **Cliente-Servidor en Capas**, con el frontend desarrollado en Vue 3 como una SPA (Single Page Application) y el backend en Node.js con PostgreSQL como base de datos.

### 📐 Diagrama de Capas

```
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