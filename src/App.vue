<style lang="less">
    .size{
        width: 100%;
        height: 100%;
    }
    html,body{
        .size;
        overflow: hidden;
        margin: 0;
        padding: 0;
    }
    #app {
        .size;
    }
</style>

<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'App',
        props: {},
        components: {},
        data() {
            return {};
        },
        computed: {},
        methods: {},
    }
</script>