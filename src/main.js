import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mitt from 'mitt'
import store from './store'
import Toaster from "@meforma/vue-toaster"
// import VueLazyLoad from 'vue-lazyload'   不兼容Vue3

// Vue.prototype.$bus = new Vue();    不兼容Vue3
const emitter = mitt();
let app = createApp(App)

app.use(router).use(store).use(Toaster).mount('#app')
 // 全局发布
 app.config.globalProperties.emitter = emitter;