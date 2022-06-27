import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import App from './App.vue'
import router from './router'
import store from './store'

import FadeLoader from 'vue-spinner/src/FadeLoader.vue'

createApp(App)
  .use(router)
  .use(store)
  .use(createHead())
  .component('FadeLoader', FadeLoader)
  .mount('#app')
