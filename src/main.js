import { createApp } from 'vue'
import App from './App.vue'

import 'materialize-css/dist/css/materialize.min.css'

const app = createApp(App)
app.config.globalProperties.API_BASE_URL = 'https://heart-ml.herokuapp.com/api'
app.mount('#app')
