import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mitt from 'mitt'
import store from './store'

// Vue.prototype.$bus = new Vue();
const emitter = mitt();
let app = createApp(App)

app.use(store).use(router).mount('#app')
 // 全局发布
 app.config.globalProperties.emitter = emitter
