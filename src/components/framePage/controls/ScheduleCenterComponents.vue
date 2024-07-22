<template>
<ScheduleCenter tabKey="default" />
</template>

<script>
import ScheduleCenter from "@/components/schedule/common/commonSchedule.vue"//通用配置版本
//import ScheduleCenter from "@/components/schedule/ScheduleCenter";//代码写死版本

export default {
    name: "framePageScheduleCenter",
    components: {
        ScheduleCenter: ScheduleCenter
    },
    data() {
        return {}
    },
    created() {}
};
</script>

<style lang="scss" scoped>

</style>
