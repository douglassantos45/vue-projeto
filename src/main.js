import Vue from 'vue'
import AppAluno from './AppAluno.vue'
import vuetify from './plugins/vuetify';

import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(AppAluno)
}).$mount('#aluno')
