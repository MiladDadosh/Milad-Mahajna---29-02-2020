import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './custom.scss'

import bulma from 'bulma'
import bulmaSwitch from 'bulma-switch'
import Toasted from 'vue-toasted';

Vue.use(bulma)
Vue.use(Toasted, {
	position: 'bottom-right',
	duration: 4000,
	keepOnHover: true
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
