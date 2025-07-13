import { createApp } from 'vue'
import App from './App.vue'
import Toast, { useToast } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
const app = createApp(App)
app.use(Toast, {
  timeout: 3000
})

createApp(App).mount('#app')
