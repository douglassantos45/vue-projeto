import Vue from 'vue'
import Router from 'vue-router'

import Home from './components/assistente_nucleo/templates/Home'
import Empresa from './components/assistente_nucleo/empresas/EmpresasPage'
import Supervisor from './components/assistente_nucleo/supervisor/SupervisorPage'
import Estagio from './components/assistente_nucleo/estagio/EstagiosPage'
import Orientador from './components/assistente_nucleo/orientador/OrientadorPage'
import Aluno from './components/assistente_nucleo/aluno/AlunosPage'

Vue.use(Router)

export default new Router({
    node: 'history',
    routes: [
        //Configurando Rotas
        { path: '/', component: Home },
        { path: '/empresa', component: Empresa },
        { path: '/supervisor', component: Supervisor },
        { path: '/estagio', component: Estagio },
        { path: '/orientador', component: Orientador },
        { path: '/aluno', component: Aluno}
    ]
})