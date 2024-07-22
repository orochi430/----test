<template>
<TabList :tabKey="itemdata.params.key" /> 
</template>

<script>
import TabList from "@/components/common/commonTabs";

export default {
    props: ["itemdata"],
    name: "framePageTabList",
    components: {
        TabList
    },
    data() {
        return {}
    },
    created() {
        console.log("framePageTabList");
    }
};
</script>

<style lang="scss" scoped>

</style>
