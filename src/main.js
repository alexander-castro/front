import { createApp } from 'vue'
import App from './App.vue'

import 'materialize-css/dist/css/materialize.min.css'

const app = createApp(App)
app.config.globalProperties.API_BASE_URL = 'http://127.0.0.1:5000/api'
app.mount('#app')
