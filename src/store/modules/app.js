import {
    getBreadCrumbList,
    getMenuByRouter,
    getHomeRoute,
    getTagNavListFromLocalStorage,
    getTagNavListInLocalStorage,
    getRouteTitleHandled,
    routeHasExist
} from '@/libs/util'
import {routes} from '@/router/routers'
import config from '@/config/'

const { homeName } = config;

export default {
    // namespaced: true,
    state: {
        tagNavList: [],
        breadCrumbList: [],
        homeRoute: {}
    },
    getters: {
        menuList: (state, getters, rootState) => getMenuByRouter(routes, rootState.user.access)
    },
    mutations: {
        setBreadCrumb (state, route) {
            state.breadCrumbList = getBreadCrumbList(route, state.homeRoute)
        },
        setHomeRoute (state, routes) {
            state.homeRoute = getHomeRoute(routes, homeName)
        },
        setTagNavList (state, list) {
            let tagList = [];
            if (list) {
                tagList = [...tagList]
            } else {
                tagList = getTagNavListFromLocalStorage() || []
            }

            if (tagList[0] && tagList[0].name !== homeName) tagList.shift();

            let homeTagIndex = tagList.findIndex(item => item.name === homeName);
            if (homeTagIndex > 0) {
                let homeTag = tagList.splice(homeTagIndex, 1)[0];
                tagList.unshift(homeTag)
            }
            state.tagNavList = tagList;
            getTagNavListInLocalStorage(tagList);
        },

        closeTag (state, route) {
            let tag = state.tagNavList.filter(item => routeEqual(item, route));
            route = tag[0] ? tag[0] : null;
            if (!route) return false;
            closePage(state, route)
        },

        addTag (state, { route, type = 'unshift'}) {
            let router = getRouteTitleHandled(route);
            if (!routeHasExist(state.tagNavList, router)) {
                if (type === 'push') {
                    state.tagNavList.push(router);
                } else {
                    if (router.name === homeName) {
                        state.tagNavList.unshift(router)
                    } else {
                        state.tagNavList.splice(1, 0, router)
                    }
                }
                getTagNavListInLocalStorage([...state.tagNavList])
            }
        }

    },
    actions: {}
}