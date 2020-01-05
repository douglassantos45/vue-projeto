import Vue from 'vue'
import Router from 'vue-router'

import Campus from './components/adm/campus/CampusPage'
import AssistenteNucleo from './components/adm/assistenteNucleo/AssistenteNucleoPage'

Vue.use(Router)

export default new Router({
    node: 'history',
    routes: [
        //Configurando Rotas
        { path: '/', component: Campus },
        { path: '/campus', component: Campus },
        { path: '/nucleo', component: AssistenteNucleo },
    ]
})