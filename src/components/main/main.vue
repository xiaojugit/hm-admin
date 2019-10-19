<template>
    <Layout style="height: 100%" class="main">
        <Sider hide-trigger collapsible :width="256" :collapsed-width="64" v-model="collapsed" class="left-sider"
               :style="{overflow: 'hidden'}">
            <side-menu :menu-list="menuList" @on-select="turnToPage" :collapsed="collapsed">
                <div style="height: 64px;"></div>
            </side-menu>
        </Sider>
        <Layout>
            <Header class="header-con">
                <header-bar :collapsed="collapsed" @on-coll-change="handleCollChange"></header-bar>
            </Header>
            <Content class="main-content-con">
                <Layout class="main-layout-con">
                    <div class="tag-nav-wrapper">
                        <tags-nav :list="tagNavList"></tags-nav>
                    </div>
                    <Content class="content-wrapper">
                        <keep-alive>
                            <router-view/>
                        </keep-alive>
                    </Content>
                </Layout>
            </Content>
        </Layout>
    </Layout>
</template>
<script>
    import SideMenu from './components/side-menu/'
    import HeaderBar from './components/header-bar/'
    import TagsNav from './components/tags-nav/'
    import {routes} from '@/router/routers'
    import { mapMutations } from 'vuex'
    import './main.less'

    export default {
        name: 'Main',
        components: {SideMenu, HeaderBar, TagsNav},
        data() {
            return {
                collapsed: false,
            }
        },
        computed: {
            tagNavList () {
                return this.$store.state.app.tagNavList
            },
            menuList() {
                return this.$store.getters.menuList
            },
        },
        watch: {
            '$route' (newRoute) {
                const { name, params, query, meta } = newRoute;
                this.addTag({
                    route: { name, params, query, meta },
                    type: 'push'
                });
                this.$store.commit('setBreadCrumb', newRoute);
            }
        },
        methods: {
            ...mapMutations([
                'setTagNavList',
                'addTag'
            ]),
            turnToPage(route) {
                let {name, params, query} = {};
                if (typeof route === 'string') name = route;
                else {
                    name = route.name;
                    params = route.params;
                    query = route.query
                }

                if (name.indexOf('isTurnByHref_') > -1) {
                    return window.open(name.replace(/^isTurnByHref_/, ''));
                }

                this.$router.push({
                    name,
                    params,
                    query
                });
            },
            handleCollChange(state) {
                this.collapsed = state;
            }
        },
        mounted() {
            const { name, params, query, meta } = this.$route;
            this.setTagNavList();
            this.addTag({
                route: { name, params, query, meta }
            });
            this.$store.commit('setHomeRoute', routes);
            this.$store.commit('setBreadCrumb', this.$route);
        }
    }
</script>
