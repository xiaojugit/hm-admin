import Vue from 'vue'
import router from './router'
import store from './store'
import App from './app.vue'
import iView from 'iview'
import i18n from './locale'
import './index.less';
import '@/assets/icons/iconfont.css'

Vue.use(iView, {
    i18n: (key, value) => i18n.t(key, value)
});

/*eslint-disable no-new*/
new Vue({
    el: '#app',
    router,
    i18n,
    store,
    render: h => h(App)
});