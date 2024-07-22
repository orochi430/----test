<template>
<div class="staging">
    <padHeader class="head"></padHeader>
    <div class="contain">
        <div class="leftTab">
            <div class="tabItem" v-for="(item, index) in tabList" :key="index" :class="{ active: tabIndex == index }" @click="changeTab(item, index)">
                <template>
                    <img class="icon" v-show="tabIndex != index" :src="item.icon" alt="" />
                    <img class="icon" v-show="tabIndex == index" :src="item.icon_active" alt="" />
                    <span>{{ item.name }}</span>
                </template>
            </div>
        </div>
        <div class="rightContent">
            <daiban v-if="tabIndex == 0" ref="daiban"></daiban>
            <zhiban v-if="tabIndex == 1" ref="zhiban"></zhiban>
            <qianbao v-if="tabIndex == 2" ref="qianbao"></qianbao>
            <yinyong v-if="tabIndex == 3"></yinyong>
        </div>
    </div>
</div>
</template>

<script>
import padHeader from "./padHeader.vue";
import daiban from "./daiban.vue";
import zhiban from "./zhiban.vue";
import qianbao from "./qianbao.vue";
import yinyong from "./yinyong.vue";
let fromName = "";
export default {
    name: "staging",
    components: {
        padHeader,
        daiban,
        zhiban,
        qianbao,
        yinyong,
    },
    data() {
        return {
            tabIndex: 0,
            tabList: [{
                    name: "待办事项",
                    icon: "static/images/project/fgwPad/db.svg",
                    icon_active: "static/images/project/fgwPad/db_active.svg",
                    ref: 'daiban'
                },
                {
                    name: "值班管理",
                    icon: "static/images/project/fgwPad/zb.svg",
                    icon_active: "static/images/project/fgwPad/zb_active.svg",
                    ref: 'zhiban'
                },
                {
                    name: "签报管理",
                    icon: "static/images/project/fgwPad/qb.svg",
                    icon_active: "static/images/project/fgwPad/qb_active.svg",
                    ref: 'qianbao'
                },
                {
                    name: "应用中心",
                    icon: "static/images/project/fgwPad/yy.svg",
                    icon_active: "static/images/project/fgwPad/yy_active.svg",
                    ref: 'yinyong'
                },
            ],
        };
    },
    computed: {},
    watch: {},
    methods: {
        changeTab(item, index) {
            this.tabIndex = index;
        },
    },
    created() {},
    mounted() {

    },
    destroyed() {},
    beforeRouteEnter(to, from, next) {
        fromName = from.name;
        next();
    },
    activated() {
        window.addEventListener("resize", () => {
            let doc = window.document
            let docEl = doc.documentElement
            let rem = docEl.clientWidth / 128 * 5
            docEl.style.fontSize = rem + 'px'
        })
        if (fromName == "dsfIframe") {
            this.$refs[this.tabList[this.tabIndex].ref].doRefresh()
        }
    },
};
</script>

<style lang="scss" scoped>
.staging {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: url("../../../../static/images/project/fgwPad/bg.png") no-repeat;
    background-size: 100% 100%;
    overflow: hidden;

    .head {
        flex-shrink: 0;
    }

    .rightContent {
        flex: 1;
        margin-left: 30px;
        height: 100%;
        width: calc(100% - 145px);
    }

    .leftTab {
        width: 115px;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .tabItem {
            width: 115px;
            height: 115px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin: 20px 0;

            img {
                width: 50px;
                height: 50px;
            }

            span {
                font-size: 18px;
                color: #ffffff;
                opacity: 0.5;
            }

            &.active {
                span {
                    opacity: 1;
                }
            }
        }
    }

    .contain {
        width: 100%;
        height: calc(100vh - 75px);
        box-sizing: border-box;
        padding: 42px 50px 42px 30px;
        overflow: hidden;
        display: flex;
        justify-content: space-between;
    }
}
</style>
