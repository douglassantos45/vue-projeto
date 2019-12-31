import Vue from 'vue'
import AppOrientador from './AppOrientador.vue'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(AppOrientador)
}).$mount('#app')
