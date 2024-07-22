<template>
<div class="meeting">
    <!-- <home-info v-if="tabNum == 1" :meeting="meeting"></home-info> -->
    <!-- <home-topic v-if="tabNum == 2" :meeting="meeting"></home-topic> -->
    <!-- <home-more v-if="tabNum == 3" :meeting="meeting"></home-more> -->
    <screen-person></screen-person>
</div>
</template>

<script>
import homeInfo from "./home_info.vue";
import homeTopic from "./home_topic.vue";
import homeMore from "./home_more.vue";
import screenPerson from "../../meetingPad/components/screenPerson.vue";
export default {
    components: {
        homeInfo,
        homeTopic,
        homeMore,
        screenPerson
    },
    data() {
        return {
            meeting: {},
            tabNum: dsf.util.loadSessionStore("meetingPadTabnum") || '1',
        };
    },
    mounted() {
        let self = this;
        self.$bus.$on("meetingPadTabnum", val => {
            dsf.util.saveToSessionStore("meetingPadTabnum", val);
            this.tabNum = val
        });

    },
    methods: {

    }
};
</script>

<style lang="scss" scoped>
.meeting {
    width: 100%;
    height: 100%;
}
</style>
