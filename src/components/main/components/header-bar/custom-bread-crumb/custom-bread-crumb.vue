<style lang="less" scoped>

</style>

<template>
    <div class="custom-bread-crumb">
        <Breadcrumb :style="{fontSize: `${fontSize}px`}">
            <BreadcrumbItem v-for="item in list" :to="item.to" :key="`bread-crumb-${item.name}`">
                <common-icon :type="item.icon||''"></common-icon>
                {{showTitle(item)}}
            </BreadcrumbItem>
        </Breadcrumb>
    </div>
</template>

<script>
    import { showTitle } from '@/libs/util'
    import CommonIcon from '_c/common-icon'
    import './custom-bread-crumb.less'
    export default {
        name: "customBreadCrumb",
        props: {
            list: {
                type: Array,
                default: () => []
            },
            fontSize: {
                type: Number,
                default: 14
            },
            showIcon: {
                type: Boolean,
                default: false
            }
        },
        components: {CommonIcon},
        methods: {
            showTitle (item) {
                return showTitle(item, this)
            }
        },
    }
</script>