<template>
    <application-center :itemdata="itemdata"></application-center>
</template>

<script>
import ApplicationCenter from "@/components/applicationCenter/index";

export default {
    name: "ApplicationCenterComponents",
    props: ['itemdata'],
    components: {ApplicationCenter},
    data() {
        return {
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
