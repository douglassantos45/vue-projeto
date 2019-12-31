import Vue from 'vue'
import AppOrientador from './AppOrientador.vue'
import vuetify from './plugins/vuetify'
import router from './router'


Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(AppOrientador)
}).$mount('#app')
