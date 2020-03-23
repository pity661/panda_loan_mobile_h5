   // 其他 h5页面
   const HomePage = resolve => require.ensure([], () => resolve(require('../views/HomePage.vue')), 'HomePage')
   const HelpCenterPage = resolve => require.ensure([], () => resolve(require('../views/HelpCenterPage.vue')), 'HelpCenterPage')
   const About = resolve => require.ensure([], () => resolve(require('../views/About.vue')), 'About')
   const AboutUs = resolve => require.ensure([], () => resolve(require('../views/AboutUs.vue')), 'AboutUs')
   const NotFound = resolve => require.ensure([], () => resolve(require('../views/404.vue')), '404')
   const Identity = resolve => require.ensure([], () => resolve(require('../views/Identity.vue')), 'Identity')
   const Agreement = resolve => require.ensure([], () => resolve(require('../views/Agreement.vue')), 'Agreement')
   const Landing = resolve => require.ensure([], () => resolve(require('../views/Landing.vue')), 'Landing')
   const WeidaiAgreement = resolve => require.ensure([], () => resolve(require('../views/WeidaiAgreement.vue')), 'WeidaiAgreement')
   const LoanRate = resolve => require.ensure([], () => resolve(require('../views/LoanRate.vue')), 'LoanRate')
   const NewYearLanding = resolve => require.ensure([], () => resolve(require('../views/NewYearLanding.vue')), 'NewYearLanding')
   const Product = resolve => require.ensure([], () => resolve(require('../views/Product.vue')), 'Product')
   const Coupon = resolve => require.ensure([], () => resolve(require('../views/Coupon.vue')), 'Coupon')
   const WkqbAbouts = resolve => require.ensure([], () => resolve(require('../views/wkqbAbouts.vue')), 'WkqbAbouts')



   export default [{
           path: '/',
           component: Product,
           hidden: true
       },
       {
           path: '/homepage',
           component: HomePage,
           hidden: true
       },
       {
           path: '/helpCenterPage',
           component: HelpCenterPage,
           hidden: true
       },
       {
           path: '/aboutUs',
           component: AboutUs,
           name: '关于我们',
           hidden: true
       },
       {
           path: '/notFound',
           component: NotFound,
           name: '404',
           hidden: true
       },

       {
           path: '/coupon',
           component: Coupon,
           name: '我的优惠券',
           hidden: true
       },
       {
           path: '/about',
           component: About,
           name: '关于'
       },
       {
           path: '/nyLanding/:Uid',
           component: NewYearLanding,
           name: ''
       },
       {
           path: '/homepage',
           component: HomePage,
           hidden: true
       },
       {
           path: '/identity',
           component: Identity,
           hidden: true
       },
       {
           path: '/agreement',
           component: Agreement,
           hidden: true,
           name: '注册协议'
       },
       {
           path: '/weidaiAgreement',
           component: WeidaiAgreement,
           hidden: true
       },
       {
           path: '/loanRate',
           component: LoanRate,
           name: '2018年贷款利率',
           hidden: true
       },
       {
           path: '/wkqbAbouts',
           component: WkqbAbouts,
           name: '关于我们',
           hidden: true
       },

   ]