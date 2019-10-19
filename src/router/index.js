import Vue from 'vue'
import Router from 'vue-router'
import iView from 'iview'

import {routes} from './routers'

Vue.use(Router);
const router = new Router({
    routes,
    // mode: 'history'
});

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    if (!to.query.token) return next();
    next();
});

router.afterEach(to => {
    iView.LoadingBar.finish()
});

export default router