// 暴风借到
const Baofenglogin = resolve => require.ensure([], () => resolve(require('../views/baofengjiedao/Baofenglogin.vue')), 'Baofenglogin') //暴风借到登录页
const BaofengproductList = resolve => require.ensure([], () => resolve(require('../views/baofengjiedao/BaofengproductList.vue')), 'BaofengproductList') //暴风借到产品列表页
const Baofengdetails = resolve => require.ensure([], () => resolve(require('../views/baofengjiedao/Baofengdetails.vue')), 'Baofengdetails') //暴风借到产品详情页

export default [

    // 暴风借到
    {
        path: '/baofenglogin/:Uid',
        component: Baofenglogin,
        name: '暴风借到',
        hidden: true
    },
    {
        path: '/baofengproductList',
        component: BaofengproductList,
        name: '暴风借到',
        hidden: true
    },
    {
        path: '/baofengdetails',
        component: Baofengdetails,
        name: '暴风借到',
        hidden: true
    }
]