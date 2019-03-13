import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Axios from 'axios'

Vue.prototype.$http = Axios;
Vue.config.productionTip = false

// Vue.prototype.$hostname = 'http://switchart.tk'
Vue.prototype.$hostname = 'http://localhost:8000'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
