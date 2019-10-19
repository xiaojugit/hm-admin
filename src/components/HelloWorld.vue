<style lang="less" scoped>
    .wrap {
        box-sizing: border-box;
    }
</style>

<template>
    <div class="wrap">
        <h1>{{hello}}</h1>
    </div>
</template>

<script>

export default {
    name: 'HelloWorld',
    props: {},
    components: {},
    data() {
        return {
            hello: 'Hello World!'
        };
    },
    computed: {},
    methods: {},
    created() {
        this.hello = `Hello ${this.$route.meta.title}!`;
    },
    watch: {
        '$route' () {
            this.hello = `Hello ${this.$route.meta.title}!`;
        }
    }
}
</script>
