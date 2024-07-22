<template>
<div class="ds-home">
    <van-sticky v-if="!$store.state.homeTabs">
        <div class="menuBox">
            <nav-search />
            <Home-notice />
            <div class="sudokus">
                <!-- 九宫格 -->
                <Squmenu />
            </div>
            <div class="schedule">
                <Schedule></Schedule>
            </div>
        </div>
    </van-sticky>
    <div class="menuBox" v-else>
        <nav-search />
        <Home-notice />
        <div class="sudokus">
            <!-- 九宫格 -->
            <Squmenu />
        </div>
        <div class="schedule">
            <Schedule></Schedule>
        </div>
    </div>
    <div class="agency">
        <TodoCenter />
    </div>
</div>
</template>

<script>
import Schedule from "@/components/schedule/Schedule";
import Squmenu from "@/components/SquMenu/SquMenu";
import HomeNotice from "@/components/HomeNotice/notice";
import TodoCenter from "@/components/documentCenter/TodoCenter";
import NavSearch from "@/components/navSearch/NavSearch";

export default {
    name: "Home",
    components: {
        Schedule: Schedule,
        Squmenu: Squmenu,
        HomeNotice: HomeNotice,
        TodoCenter,
        NavSearch
    },
    created() {
    },
    activated() {
      //console.log(this.$route.name);
        // if (!dsf.util.loadSessionStore("defaultcount")&&dsf.config&&dsf.config.appFooter.isShow) {
        //   dsf.util.saveToSessionStore("defaultcount",true);
        //     let checkedItem = dsf.config.appFooter.footerMenu.filter(item => item.isShow && item.checked);
        //     if (checkedItem.length > 0&&checkedItem[0].router!="/")
        //         this.$router.push(checkedItem[0].router)
        // }
    },
    methods: {},
    deactivated() {
        if (this.$route.name != "commonForm") {
            this.$destroy()
        }
    }
};
</script>

<style lang="scss" scoped>
#app {
    overflow-y: scroll;
    .menuBox{
        // background:white;
    }
}
</style>
