<template>
<div class="meetinPad-container">
    <div class="layout">
        <zhsideBar class="side-bar" v-if="dsf.config.login.defaultUrl || false"></zhsideBar>
        <side-bar class="side-bar" v-else></side-bar>
        <div class="main">
            <div v-if="$route.meta.hasMeetingTop" class="meetingTop">
                <div class="title">{{ meetingName }}</div>
                <div class="switch-meeting" @click="switchClick">
                    <i></i>
                    <span>切换会议</span>
                </div>
            </div>
            <section class="app-main">
                <router-view v-if="!$route.meta.keepAlive" :key="$route.path" />
                <keep-alive>
                    <router-view v-if="$route.meta.keepAlive" :key="$route.path">
                        <!-- 这里是会被缓存的视图组件，比如 Home！ -->
                    </router-view>
                </keep-alive>
            </section>
        </div>
    </div>
</div>
</template>

<script>
import sideBar from "./sideBar";
import zhsideBar from "../../../components/project/zhuhaipad/sideBar.vue";
import {
    mapState
} from "vuex";
export default {
    components: {
        sideBar,
        zhsideBar
    },
    data() {
        return {};
    },
    computed: {
        ...mapState({
            meetingName: state => state.meetingName
        })
    },
    created() {
        // let docFontsize = document.documentElement.style.fontSize.split('px')[0]
        // let multiple = dsf.util.loadLocalStore('multiple') || dsf.util.loadLocalStore('fontSizeMultiple') || 4
        // document.documentElement.style.fontSize = docFontsize / 4 * multiple + 'px'
    },
    methods: {
        switchClick() {
            this.$router.replace("/meetingPad/front");
        }
    }
};
</script>

<style lang="scss">
.meetinPad-container {
    font-size: 40px;

    .van-cell {
        line-height: 1.2rem !important;
        padding: 0.8rem 0.4rem !important;
        font-size: 0.8rem;
    }

    .van-field {
        line-height: 1.2rem !important;
        padding: 0.4rem !important;
        font-size: 0.8rem;
    }

    .van-cell__label {
        font-size: .8rem;
    }

    .preview-container .iconBox img {
        margin: 0.8rem !important;
        width: 1.2rem !important;
        height: 1.2rem !important;
    }
}
</style><style lang="scss" scoped>


.meetinPad-container {
    background-color: #3389e0;
    width: 100%;
    height: 100vh;

    .layout {
        padding: 32px 40px;
        height: 100%;
        display: flex;
        box-sizing: border-box;

        .main {
            flex: 1;
            overflow: hidden;
            background-color: #fff;
            display: flex;
            flex-direction: column;
            border-radius: 10px;

            .meetingTop {
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                // border-bottom: 1px solid #3389e0;
                height: 160px;
                background: #F5F8FB;

                .title {
                    width: 65%;
                    text-align: center;
                    color: #3389e0;
                    font-size: 52px;
                    font-weight: 600;
                }

                .switch-meeting {
                    position: absolute;
                    top: 50%;
                    right: 80px;
                    transform: translate(0, -50%);
                    font-size: 40px;
                    color: #333333;
                    height: 96px;
                    line-height: 96px;
                    display: flex;
                    align-items: center;

                    i {
                        display: inline-block;
                        width: 40px;
                        height: 40px;
                        background: url(../../../../static/images/meetingPad/switch.svg) no-repeat;
                        background-size: 100% 100%;
                        margin-right: 14px;
                    }
                }
            }

            .app-main {
                padding: 0 40px 20px;
                flex: 1;
                height: 100%;
                overflow: auto;
                background-color: #fff;
            }
        }
    }
}
</style>
