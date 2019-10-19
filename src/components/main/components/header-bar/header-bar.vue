<style lang="less" scoped>

</style>

<template>
    <div class="header-bar">
        <sider-trigger :collapsed="collapsed" icon="md-menu" @on-change="handleCollapsedChange"></sider-trigger>
        <custom-bread-crumb show-icon :list="breadCrumbList"></custom-bread-crumb>
    </div>
</template>

<script>
    import SiderTrigger from './sider-trigger/'
    import CustomBreadCrumb from './custom-bread-crumb/'
    import './header-bar.less'
    export default {
        name: "HeaderBar",
        props: {
            collapsed: Boolean
        },
        components: {
            SiderTrigger,
            CustomBreadCrumb
        },
        data() {
            return {};
        },
        computed: {
            breadCrumbList () {
                return this.$store.state.app.breadCrumbList
            }
        },
        methods: {
            handleCollapsedChange(state) {
                this.$emit('on-coll-change', state);
            }
        },
    }
</script>