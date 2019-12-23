import Vue from 'vue'
import AppNucleo from './AppNucleo.vue'
import vuetify from './plugins/vuetify';

import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(AppNucleo)
}).$mount('#nucleo')
