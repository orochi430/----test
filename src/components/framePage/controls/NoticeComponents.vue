<template>
<Home-notice :type="itemdata.params.showType"/>
</template>

<script>
import HomeNotice from "@/components/HomeNotice/notice";

export default {
    name: "framePageHomeNotice",
    props: ['itemdata'],
    components: {
        HomeNotice: HomeNotice
    },
    created() {}
};
</script>

<style lang="scss" scoped>

</style>
