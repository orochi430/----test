<template>
<div class="ds-home">
    <div class="menuBox">
        <div class="sudokus">
            <!-- 九宫格 -->
            <Squmenu />
        </div>
    </div>
    <div class="agency">
        <TodoCenter />
    </div>
</div>
</template>

<script>
import Squmenu from "@/components/SquMenu/SquMenu";
import TodoCenter from "@/components/documentCenter/TodoCenter";

export default {
    name: "Home",
    components: {
        Squmenu: Squmenu,
        TodoCenter
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
            this.$deleteCache(this);
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
