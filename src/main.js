import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Toast from "vue-toastification";

createApp(App)
    .use(store)
    .use(router)
    .use(Toast)
    .mount('#app')
