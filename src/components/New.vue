<template>
    <div class="header">
        <h1>
            {{ title }}
        </h1>
        <hr />
        <div class="logo"></div>
    </div>
</template>

<script>
export default {
    name: 'New',
    props: {
        title: String,
    },
}
</script>

<style>
.center {
    text-align: center;
}
</style>
