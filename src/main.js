import Vue from 'vue'
import AppSupervisor from './AppSupervisor.vue'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(AppSupervisor)
}).$mount('#app')
