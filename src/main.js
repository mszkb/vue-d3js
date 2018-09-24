import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

let app = new Vue({
  el: '#app',
  components: { App },
  render: h => h(App)
})
