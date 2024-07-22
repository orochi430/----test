<template>
<div class="potencyCenter" style="padding-top: 20px;">
    <!-- <div class="title">
        <div class="goback" @click="$router.go(-1)">
            <van-icon name="arrow-left" />
            <span>返回</span>
        </div>
        <span class="name">效能中心</span>
        <div class="selectorx">
            <span>2023年3月</span>
            <van-icon name="play" />
        </div>
    </div> -->
    <div class="potencyTabs">
        <span :class="{'active': active==0}" @click="active=0">单位效能</span>
        <span :class="{'active': active==1}" @click="active=1">个人效能</span>
        <span :class="{'active': active==2}" @click="active=2">部门效能</span>
    </div>
    <div class="cont">
        <org v-if="active==0"></org>
        <dept v-if="active==1"></dept>
        <per v-if="active==2"></per>
    </div>
</div>
</template>

<script>
import org from './organization.vue'
import dept from './department.vue'
import per from './person.vue'
export default {
    name: 'potencyCenter',
    components: {
        org,
        dept,
        per
    },
    data() {
        return {
            active: 0
        };
    },
    computed: {},
    watch: {},
    methods: {

    },
    created() {},
    mounted() {

    },
    destroyed() {},
}
</script>

<style lang="scss" src="./style/index.scss" scoped></style>
