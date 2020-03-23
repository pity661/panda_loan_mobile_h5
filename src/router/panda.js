// 熊猫贷款不登录
const AppProductList = resolve => require.ensure([], () => resolve(require('../views/notLoginpanda/ProductList.vue')), 'AppProductList') //熊猫贷款产品页面
const NoDetailspage = resolve => require.ensure([], () => resolve(require('../views/notLoginpanda/Detailspage.vue')), 'NoDetailspage') //熊猫贷款第三方页面
const NoDetailsOfclassification = resolve => require.ensure([], () => resolve(require('../views/notLoginpanda/DetailsOfclassification.vue')), 'DetailsOfclassification') //熊猫贷款产品分类页面

// 熊猫贷款简版
const Concisedetails = resolve => require.ensure([], () => resolve(require('../views/concisePanda/Concisedetails.vue')), 'Concisedetails') //简版详情页面
const Conciselogin = resolve => require.ensure([], () => resolve(require('../views/concisePanda/Conciselogin.vue')), 'Conciselogin') //简版登录
const ConciseproductList = resolve => require.ensure([], () => resolve(require('../views/concisePanda/ConciseproductList.vue')), 'ConciseproductList') //简版列表


// 不登录版本熊猫贷款
const NologinproductList = resolve => require.ensure([], () => resolve(require('../views/nologinpanda/NologinproductList.vue')), 'NologinproductList') //不登录产品列表页面
const Nologindetails = resolve => require.ensure([], () => resolve(require('../views/nologinpanda/Nologindetails.vue')), 'Nologindetails') //不登录第三方页面

// 熊猫贷款
const yearLanding = resolve => require.ensure([], () => resolve(require('../views/panda/yearLanding.vue')), 'yearLanding') //熊猫贷款登录页面
const ProductList = resolve => require.ensure([], () => resolve(require('../views/panda/ProductList.vue')), 'ProductList') //熊猫贷款产品页面
const Detailspage = resolve => require.ensure([], () => resolve(require('../views/panda/Detailspage.vue')), 'Detailspage') //熊猫贷款第三方页面
const DetailsOfclassification = resolve => require.ensure([], () => resolve(require('../views/panda/DetailsOfclassification.vue')), 'DetailsOfclassification') //熊猫贷款产品分类页面

export default [

    // 不登录版本熊猫贷款
    {
        path: '/appProductList/:Uid',
        component: AppProductList,
        name: '首页',
        hidden: true
    },
    {
        path: '/noDetailspage',
        component: NoDetailspage,
        name: '',
        hidden: true
    },
    {
        path: '/appClassification',
        component: NoDetailsOfclassification,
        name: '',
        hidden: true
    },

    //熊猫贷款简版
    {
        path: '/Concisedetails', //详情
        component: Concisedetails,
        name: '熊猫贷款',
        hidden: true
    },
    {
        path: '/Conciselogin/:Uid', //登录
        component: Conciselogin,
        name: '熊猫贷款',
        hidden: true
    },
    {
        path: '/ConciseproductList', //产品列表
        component: ConciseproductList,
        name: '熊猫贷款',
        hidden: true
    },

    // 不登录熊猫贷款
    {
        path: '/NologinproductList/:Uid',
        component: NologinproductList,
        name: '熊猫贷款',
        hidden: true
    },
    {
        path: '/Nologindetails',
        component: Nologindetails,
        name: '熊猫贷款',
        hidden: true
    },

    // 熊猫贷款
    {
        path: '/yearLanding/:Uid',
        component: yearLanding,
        name: '',
        hidden: true
    },
    {
        path: '/ProductList',
        component: ProductList,
        name: '产品类表',
        hidden: true
    },
    {
        path: '/Detailspage',
        component: Detailspage,
        name: '',
        hidden: true
    },
    {
        path: '/DetailsOfclassification',
        component: DetailsOfclassification,
        name: '',
        hidden: true
    },
]