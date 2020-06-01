<template>
    <New :title="title" />
</template>

<script>
import New from './components/New.vue'

export default {
    name: 'App',
    components: {
        New,
    },
    data() {
        return {
            title: 'Webpack template',
        }
    },
}
</script>
<style lang="scss">
html {
    border: 5px solid gray;
}
</style>
