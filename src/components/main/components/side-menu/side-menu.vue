<template>
    <div class="side-menu-wrapper">
        <slot></slot>
        <Menu v-show="!collapsed" :theme="'dark'" width="auto" @on-select="handleSelect" >
            <template v-for="item in menuList">
                <template v-if="item.children && item.children.length === 1">
                    <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item"></side-menu-item>
                    <MenuItem v-else :name="getNameOrHref(item, true)" :key="`menu-${item.children[0].name}`"><common-icon :type="item.children[0].icon || ''"/><span>{{ showTitle(item.children[0]) }}</span></MenuItem>
                </template>
                <template v-else>
                    <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item"></side-menu-item>
                    <MenuItem v-else :name="getNameOrHref(item)" :key="`menu-${item.name}`"><common-icon :type="item.icon || ''"/><span>{{ showTitle(item) }}</span></MenuItem>
                </template>
            </template>
        </Menu>
        <div class="menu-collapsed" v-show="collapsed" :list="menuList">

        </div>
    </div>
</template>

<script>
    import mixin from './mixin'
    import SideMenuItem from './side-menu-item.vue'
    export default {
        name: "SideMenu",
        mixins: [mixin],
        props: {
            menuList: {
                type: Array,
                default () {
                    return []
                }
            },
            collapsed: Boolean
        },
        components: {SideMenuItem},
        data() {
            return {};
        },
        computed: {},
        methods: {
            handleSelect(name) {
                this.$emit('on-select', name);
            }
        },
    }
</script>

<style lang="less">
    @import './side-menu.less';
</style>