<template>
<CustomTabs :Note="'Note'" />
</template>

<script>
import CustomTabs from "@/components/common/customTabs.vue";

export default {
    name: "framePageCustomTabs",
    components: {
        CustomTabs: CustomTabs
    },
    data() {
        return {
        }
    },
    created() {}
};
</script>

<style lang="scss" scoped>

</style>
