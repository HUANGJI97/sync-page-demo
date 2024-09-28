import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
    history: createWebHashHistory('/'),
    routes: [
        {
            path: '/',
            component: () => import('../views/home.vue')
        },
        {
            path: '/sync',
            component: () => import('../views/syncPage.vue')
        },
        {
            path: '/linkedList',
            component: () => import('../views/DoubledLinked.vue')
        }
    ]
})
export default router