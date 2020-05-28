Vue.use(VueRouter)
import { Message } from 'element-ui'
// import index from '@/components/index/index.vue'
// 解决两次访问相同路由地址报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

var router = new VueRouter({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'index',
        meta: {
            title: "首页",
        },
        component: () =>
            import('@/components/index/index.vue')
    },
    {
        path: '/test',
        name: 'test',
        meta: {
            title: "发布",
            loginAuth: true,
        },
        component: () =>
            import('@/components/test/index.vue')
    },
    {
        path: '/suggest',
        name: 'suggest',
        meta: {
            title: "发布",
            loginAuth: true,
        },
        component: () =>
            import('@/components/suggest/index.vue')
    },
    {
        path: '/music',
        name: 'music',
        meta: {
            title: "音乐",
        },
        component: () =>
            import('@/components/music/index.vue')
    },
    {
        path: '/myHome',
        name: 'myHome',
        meta: {
            title: "个人中心",
        },
        component: () =>
            import('@/components/myHome/index.vue')
    },
    {
        path: '/detail/:id',
        name: 'detail',
        meta: {
            title: "技术详情",
        },
        component: () =>
            import('@/components/detail/index.vue')
    },
    ]
})
router.beforeEach((to, from, next) => {
    if (to.meta.loginAuth) { // 判断跳转的路由是否需要登录
        let token = localStorage.getItem('token')
        let youke = localStorage.getItem('youke')
        if (token && youke == 'false') { // vuex.state判断token是否存在
            next() // 已登录
        } else {
            Message({
                message: '您未登录，请登录',
                type: 'error',
                duration: 3 * 1000
            })
            next({
                path: '/myHome',
                title: "个人中心",
                query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    } else {
        next()
    }
})
export default router