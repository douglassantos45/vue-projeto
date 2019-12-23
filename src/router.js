import Vue from 'vue'
import Router from 'vue-router'

import Home from './components/assistente_nucleo/templates/Home'
import Empresa from './components/assistente_nucleo/empresas/EmpresasPage'

Vue.use(Router)

export default new Router({
    node: 'history',
    routes: [
        //Configurando Rotas
        { path: '/', component: Home},
        { path: '/empresa', component: Empresa}
    ]
})