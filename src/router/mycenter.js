const Axhconter = resolve => require.ensure([], () => resolve(require('../views/mycenter/ax/axhconter.vue')), 'Axhconter') //安心花
const Axaboutus = resolve => require.ensure([], () => resolve(require('../views/mycenter/ax/axAboutUs.vue')), 'Axaboutus') //安心花关于我们
const Axhelpcenter = resolve => require.ensure([], () => resolve(require('../views/mycenter/ax/axHelpCenter.vue')), 'Axhelpcenter') //安心花常见问题

const Xyconter = resolve => require.ensure([], () => resolve(require('../views/mycenter/xy/Xyconter.vue')), 'Xyconter') //小赢白卡个人中心页面
const Xyaboutus = resolve => require.ensure([], () => resolve(require('../views/mycenter/xy/XyAboutUs.vue')), 'Xyaboutus') //小赢白卡关于我们
const Xyhelpcenter = resolve => require.ensure([], () => resolve(require('../views/mycenter/xy/XyHelpCenter.vue')), 'Xyhelpcenter') //小赢白卡常见问题

const Mcconter = resolve => require.ensure([], () => resolve(require('../views/mycenter/mc/mcconter.vue')), 'Mcconter') //莫愁周转个人中心页面
const Mcaboutus = resolve => require.ensure([], () => resolve(require('../views/mycenter/mc/mcAboutUs.vue')), 'Mcaboutus') //莫愁周转关于我们
const MchelpCenter = resolve => require.ensure([], () => resolve(require('../views/mycenter/mc/mcHelpCenter.vue')), 'MchelpCenter') //莫愁周转常见问题

const Xhconter = resolve => require.ensure([], () => resolve(require('../views/mycenter/xh/xhconter.vue')), 'Xhconter') //小花白卡个人中心页面
const XhAboutUs = resolve => require.ensure([], () => resolve(require('../views/mycenter/xh/xhAboutUs.vue')), 'XhAboutUs') //小花白卡关于我们
const Xhhelpcenter = resolve => require.ensure([], () => resolve(require('../views/mycenter/xh/xhHelpCenter.vue')), 'Xhhelpcenter') //小花白卡常见问题

const Setting = resolve => require.ensure([], () => resolve(require('../views/mycenter/setting.vue')), 'Setting') //设置

export default [

    // 安心花
    {
        path: '/axhconter',
        component: Axhconter,
        name: '我的',
        hidden: true
    },
    {
        path: '/axaboutus',
        component: Axaboutus,
        name: '关于我们',
        hidden: true
    },
    {
        path: '/axhelpcenter',
        component: Axhelpcenter,
        name: '常见问题',
        hidden: true
    },

    // 小赢白卡
    {
        path: '/xyconter',
        component: Xyconter,
        name: '我的',
        hidden: true
    },
    {
        path: '/xyaboutus',
        component: Xyaboutus,
        name: '关于我们',
        hidden: true
    },
    {
        path: '/xyhelpcenter',
        component: Xyhelpcenter,
        name: '常见问题',
        hidden: true
    },

    // 莫愁周转
    {
        path: '/mcconter',
        component: Mcconter,
        name: '我的',
        hidden: true
    },
    {
        path: '/mcaboutus',
        component: Mcaboutus,
        name: '关于我们',
        hidden: true
    },
    {
        path: '/mchelpcenter',
        component: MchelpCenter,
        name: '常见问题',
        hidden: true
    },

    // 小花白卡
    {
        path: '/xhconter',
        component: Xhconter,
        name: '我的',
        hidden: true
    },
    {
        path: '/xhAboutUs',
        component: XhAboutUs,
        name: '关于我们',
        hidden: true
    },
    {
        path: '/xhhelpcenter',
        component: Xhhelpcenter,
        name: '常见问题',
        hidden: true
    },

    // 公共设置
    {
        path: '/setting',
        component: Setting,
        name: '设置',
        hidden: true
    }

]