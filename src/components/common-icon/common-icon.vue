<style lang="less" scoped>

</style>

<template>
    <component :is="iconType" :type="iconName" :color="iconColor" :size="iconSize"/>
</template>

<script>
    import Icons from '_c/icons'
    export default {
        name: "CommonIcon",
        props: {
            type: {
                type: String,
                required: true
            },
            color: String,
            size: Number
        },
        components: {Icons},
        computed: {
            iconType () {
                return this.type.indexOf('_') === 0 ? 'Icons' : 'Icon'
            },
            iconName () {
                return this.iconType === 'Icons' ? this.getCustomIconName(this.type) : this.type
            },
            iconColor () {
                return this.color || ''
            },
            iconSize () {
                return this.size || (this.iconType === 'Icons' ? 12 : undefined)
            },
        },
        methods: {
            getCustomIconName (iconName) {
                return iconName.slice(1);
            }
        },
    }
</script>