import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast, { type PluginOptions } from 'vue-toastification'
import App from './App.vue'
import router from './router'
import './style.scss'
import 'vue-toastification/dist/index.css'

// Configurações do Toast
const toastOptions: PluginOptions = {
  position: 'top-right',
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false
}

// Inicializa a aplicação
const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(Toast, toastOptions)
app.mount('#app')