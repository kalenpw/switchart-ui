import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

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
            path: '/games',
            name: 'games',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/Games.vue')
        },
        {
            path: '/user/:id',
            name: 'user',
            component: () => import('./views/User.vue')
        },
        {
            path: '/game/:id',
            name: 'game',
            component: () => import('./views/Game.vue')
        }
    ]
})
