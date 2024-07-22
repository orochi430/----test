<template>
<div>
    <workerHeader :itemdata="itemdata"></workerHeader>
</div>
</template>

<script>

import workerHeader from "@/components/project/zhenhuaIndustry/components/workerHeader.vue";

export default {
    props:['itemdata'],
    components: {
        workerHeader:workerHeader
    },
    created() {}
};
</script>

<style lang="scss" scoped>

</style>
