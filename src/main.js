import { createApp } from 'vue'
import App from './App.vue'
import router from './plugins/router'
import store from './plugins/store'
import axios from './plugins/axios'
import './assets/styles/null.scss'

const app = createApp(App)

app.config.globalProperties.$axios = axios

app
  .use(store)
  .use(router)
  .mount('#app')
