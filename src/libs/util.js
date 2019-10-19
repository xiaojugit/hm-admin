import {forEach, objEqual} from './tools'

export const hasChild = (item) => item.children && item.children.length !== 0;

export const getMenuByRouter = (list) => {
    let res = [];

    forEach(list, item => {
        if (!item.meta || (item.meta && !item.meta.hideInMenu)) {
            let obj = {
                icon: (item.meta && item.meta.icon) || '',
                name: item.name,
                meta: item.meta
            };
            if (hasChild(item) || (item.meta && item.meta.showAlways)) {
                obj.children = getMenuByRouter(item.children)
            }
            if (item.meta && item.meta.href) obj.href = item.meta.href;
            res.push(obj)
        }
    });

    return res
};

export const getBreadCrumbList = (route, homeRoute) => {
    let homeItem = {...homeRoute, icon: homeRoute.meta.icon};
    let routeMatched = route.matched;
    if (routeMatched.some(item => item.name === homeRoute.name)) return [homeItem];
    let res = routeMatched.filter(item => {
        return item.meta === undefined || !item.meta.hideInBread
    }).map(item => {
        let meta = {...item.meta};
        if (item.title && typeof item.title === 'function') {
            meta.__titleInFuntion__ = true;
            meta.title = meta.title(route)
        }
        return {
            icon: (item.meta && item.meta.icon) || '',
            name: item.name,
            meta: meta
        }
    });

    res.filter(item => !item.meta.hideInMenu);

    return [{...homeItem, to: homeRoute.path}, ...res]
};

export const getRouteTitleHandled = route => {
    let router = {...route};
    let meta = {...route.meta};
    let title = '';
    if (meta.title) {
        if (typeof meta.title === 'function') {
            meta.__titleIsFuntion__ = true;
            title = meta.title(router)
        } else {
            title = meta.title
        }
    }
    meta.title = title;
    router.meta = meta;
    return router
};

export const showTitle = (item, vm) => {
    let {title, __titleIsFunction__} = item.meta;
    if (!title) return;
    if (__titleIsFunction__) {
        title = vm.$t(title)
    }
    return title
};

export const getHomeRoute = (routes, homeName = 'home') => {
    let i = -1;
    let len = routes.length;
    let homeRoute = {};
    while (++i < len) {
        let item = routes[i];
        if (item.children && item.children.length) {
            let res = getHomeRoute(item.children, homeName);
            if (res.name) return res;
        } else {
            if (item.name === homeName) homeRoute = item
        }
    }
    return homeRoute
};

export const getTagNavListInLocalStorage = list => {
    localStorage.setItem('tagNaveList', JSON.stringify(list))
};

export const getTagNavListFromLocalStorage = () => {
    let list = localStorage.getItem('tagNaveList')
    return list ? JSON.parse(list) : []
};

export const routeEqual = (route1, route2) => {
    const params1 = route1.params || {};
    const params2 = route2.params || {};
    const query1 = route1.query || {};
    const query2 = route2.query || {};
    return route1.name === route2.name && objEqual(params1, params2) && objEqual(query1, query2);
};

export const doCustomTimes = (times, callback) => {
    let i = -1;
    while (++i < times) {
        callback(i)
    }
};

export const routeHasExist = (tagNavList, routeItem) => {
    let len = tagNavList.length;
    let res = false;
    doCustomTimes(len, i => {
        if (routeEqual(tagNavList[i], routeItem)) {
            res = true;
        }
    });
    return res;
};
