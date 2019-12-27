import Vue from 'vue'
import Router from 'vue-router'

import Situacao from './components/aluno/template/ComponentSituacao'
import DataTable from './components/aluno/template/ComponentDataTable'


Vue.use(Router)

export default new Router({
    node: 'history',
    routes: [
        //Configurando Rotas
        { path: '/', component: DataTable},
        { path: '/situacao', component: Situacao },
        { path: '/horario', component: DataTable}
       
    ]
})