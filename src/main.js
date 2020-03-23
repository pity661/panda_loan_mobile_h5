import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
//import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import router from './router/index'
import resources from './resources'
import axios from 'axios'
import md5 from 'js-md5'
import MintUi from 'mint-ui'
Vue.use(MintUi)
import 'font-awesome/css/font-awesome.min.css'

//FIX rem 适配 配合postcss  将来提到工具方法里
(function(win, doc) {
    var UA = navigator.userAgent,
        isAndroid = /android|adr/gi.test(UA),
        isIos = /iphone|ipod|ipad/gi.test(UA) && !isAndroid; //据说某些国产机的UA会同时包含android iphone 字符
    var docEl = doc.documentElement;
    var refreshRem = function() {
            var w = docEl.getBoundingClientRect().width || 375;
            var fs = w / 375 * 20;
            fs = fs > 46.875 ? 46.875 : fs; // 限制最大宽度 750
            docEl.style.fontSize = fs + 'px';
        },
        refreshRemId;
    win.addEventListener('resize', function() {
        clearTimeout(refreshRemId);
        refreshRemId = setTimeout(refreshRem, 100);
    }, false);
    win.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(refreshRemId);
            refreshRemId = setTimeout(refreshRem, 100);
        }
    }, false);
    refreshRem();
})(window, document);

// 按需引入mintUI 组件可优化
import { InfiniteScroll, Toast, Picker } from 'mint-ui'
Vue.use(InfiniteScroll)

Vue.component(Picker.name, Picker);

//Vue.use(ElementUI)
Vue.prototype.$ajax = axios;
Vue.prototype.$toast = Toast

new Vue({
    el: '#app',
    router,
    render: h => h(App)
}).$mount('#app')