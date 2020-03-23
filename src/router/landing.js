// 神马与奥丁和 Hackhome安卓下载
const Shenmalanding = resolve => require.ensure([], () => resolve(require('@/views/landing/Shenmalanding.vue')), 'Shenmalanding')
const Aodinglanding = resolve => require.ensure([], () => resolve(require('@/views/landing/Aodinglanding.vue')), 'Aodinglanding')
const Hackhomelanding = resolve => require.ensure([], () => resolve(require('@/views/landing/Hackhomelanding.vue')), 'Hackhomelanding')
const Jucailanding = resolve => require.ensure([], () => resolve(require('@/views/landing/Jucailanding.vue')), 'Jucailanding')
const Qianjiazilanding = resolve => require.ensure([], () => resolve(require('@/views/landing/Qianjiazilanding.vue')), 'Qianjiazilanding')
const Ruipenglanding = resolve => require.ensure([], () => resolve(require('@/views/landing/Ruipenglanding.vue')), 'Ruipenglanding')
const Landing = resolve => require.ensure([], () => resolve(require('../views/Landing.vue')), 'Landing')
//随便花关于页面
export default [
    {
        path: '/shenmalanding/:Uid',
        component: Shenmalanding,
        name: '熊猫贷款'
    },
    {
        path: '/aodinglanding/:Uid',
        component: Aodinglanding,
        name: '熊猫贷款'
    },
    {
        path: '/hackhomelanding/:Uid',
        component: Hackhomelanding,
        name: '熊猫贷款'
    },
    {
        path: '/jucailanding/:Uid',
        component: Jucailanding,
        name: '熊猫贷款'
    },
    {
        path: '/qianjiazilanding/:Uid',
        component: Qianjiazilanding,
        name: '熊猫贷款'
    },
    {
        path: '/landing/:Uid',
        component: Landing,
        name: '熊猫贷款'
    },
    {
        path: '/ruipenglanding/:Uid',
        component: Ruipenglanding,
        name: '熊猫贷款'
    },

]