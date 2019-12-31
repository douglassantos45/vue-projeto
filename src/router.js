import Vue from 'vue'
import Router from 'vue-router'

import CadPlanoEstagio from './components/orientador/template/ComponentDataTablePlano'
import ViewPlano from './components/orientador/template/ComponentViewPlano'


Vue.use(Router)

export default new Router({
    node: 'history',
    routes: [
        //Configurando Rotas
        { path: '/', component: CadPlanoEstagio },
        { path: '/cadastrar', component: CadPlanoEstagio },
        { path: '/visualizar', component: ViewPlano }
       
    ]
})