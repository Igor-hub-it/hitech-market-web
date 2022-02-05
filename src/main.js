import { createApp } from 'vue'
import App from './App.vue'
import router from './plugins/router'
import store from './plugins/store'
import axios from './plugins/axios'
import VueLoading from 'vue-loading-overlay'
import '@/assets/styles/_vars.scss'
import '@/assets/styles/fonts.scss'
import '@/assets/styles/transition.scss'
import '@/assets/styles/loading.scss'
import '@/assets/styles/null.scss'

const app = createApp(App)

app.config.globalProperties.$axios = axios

app
  .use(store)
  .use(router)
  .use(VueLoading)
  .mount('#app')
