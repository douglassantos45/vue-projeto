import Vue from 'vue'
import AppAluno from './AppAluno.vue'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(AppAluno)
}).$mount('#aluno')
