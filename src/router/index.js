import Vue from 'vue'
import VueRouter from 'vue-router'
import panda from './panda'
import mobileycling from './mobileycling'
import landing from './landing'
import single from './single'
import baofeng from './baofeng'
import mycenter from './mycenter'

Vue.use(VueRouter)
const router = new VueRouter({
    base: "/panda_loan_mobile_web/",
    // mode: 'history',
    routes: [
        ...mobileycling, // 手机回收
        ...panda, // 熊猫贷款
        ...landing, // 着陆页
        ...baofeng, //暴风借到
        ...single, //单页面
        ...mycenter //个人中心单页面
    ]
})

router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.name) {
        document.title = to.name;
    }
    next();
})

export default router;