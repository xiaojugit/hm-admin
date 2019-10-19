import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import mutations from './mutations'
import actions from './actions'

import app from './modules/app'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {},
    getters,
    mutations,
    actions,
    modules: {
        app,
        user
    }
})

/* if (module.hot) {
    module.hot.accept([
        './getters',
        './actions',
        './mutations'
    ], () => {
        store.hotUpdate({
            getters: require('./getters'),
            actions: require('./actions'),
            mutations: require('./mutations')
        })
    })
} */

export default store