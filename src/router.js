import Vue from 'vue'
import Router from 'vue-router'
// import Login from '../src/pages/Login'
// import Dashboard from '@/pages/Dashboard'

Vue.use(Router)

export default new Router ({
    mode: "history",

    routes: [
        { path: '/', redirect: { name: 'login' }},
        {
            path: "/login",
            name: "login",
            meta: { layout: "no-header" },
            component: () => import("@/pages/Login.vue")
            // component: require("@/pages/Login.vue").default
        },
        {
            path: "/dashboard",
            name: "dashboard",
            // component: Dashboard
            component: () => import("@/pages/Dashboard.vue")
        }
    ]
})
