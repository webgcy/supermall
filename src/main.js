import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mitt from 'mitt'
import store from './store'
import Toaster from "@meforma/vue-toaster"

// Vue.prototype.$bus = new Vue();
const emitter = mitt();
let app = createApp(App)

app.use(router).use(store).use(Toaster).mount('#app')
 // 全局发布
 app.config.globalProperties.emitter = emitter
