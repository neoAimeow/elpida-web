import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Quotation from './views/Quotation.vue'
import Reflection from './views/Reflection.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/quotation',
            name: 'quotation',
            component: Quotation
        },
        {
            path: '/reflection',
            name: 'reflection',
            component: Reflection
        }
    ]
})
