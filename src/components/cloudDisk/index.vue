<template>
<div class="cloudDisk">
    <van-nav-bar title="钉盘" :left-text="showBack ? '返回' : ''" :left-arrow="showBack" @click-left="onClickLeft">
        <template #right>
            <van-popover v-model="showPopover" trigger="click" :offset="[-70,8]">
                <div class="menus">
                    <p class="iconText" @click="gofileTrends">
                        <img src="../../assets/imgs/cloudDisk/icon-trends.png" />
                        <span>文件动态</span>
                    </p>
                    <!-- <p class="iconText" @click="goOutsideLink">
                        <img src="../../assets/imgs/cloudDisk/icon-link.png" />
                        <span>外链管理</span>
                    </p> -->
                    <p class="iconText" @click="goRecycle">
                        <img src="../../assets/imgs/cloudDisk/icon-recyle.png" />
                        <span>回收站</span>
                    </p>
                    <!-- <p class="iconText">
                        <van-image :src="fankui"></van-image>
                        <span>我要反馈</span>
                    </p>
                    <p class="iconText">
                        <img src="../../assets/imgs/cloudDisk/icon-help.png" />
                        <span>帮助</span>
                    </p> -->
                </div>
                <template #reference>
                    <van-image width="24" height="24" :src="more" style="margin-left: 5px;" />
                </template>
            </van-popover>

        </template>
    </van-nav-bar>
    <common-head></common-head>
    <div class="content">

        <recentlyFile v-if="active == 100"></recentlyFile>
        <myCollect v-else-if="active == 101"></myCollect>
        <myShare v-else-if="active == 0"></myShare>
        <myFile v-else-if="active == 4"></myFile>
        <teamFile v-else></teamFile>
        <!-- v-if="[1,2,11,8,10].includes(active)" -->
    </div>
    <van-popup v-model="showSearch" position="right" :style="{ height: '100%', width:'100%' }">
        <searchList v-if="showSearch" :active="active"></searchList>
    </van-popup>

</div>
</template>

<script>
import recentlyFile from './recentlyFile.vue';
import myCollect from './myCollect.vue';
import teamFile from './teamFile.vue';
import myShare from './myShare.vue';
import searchList from './searchList.vue'
import CommonHead from './commonHead.vue'
import commonFileList from './commonFileList.vue'
import myFile from './myFile.vue'
import {
    mapState
} from "vuex";
export default {
    name: 'cloudDisk',
    components: {
        recentlyFile,
        myCollect,
        teamFile,
        myShare,
        searchList,
        CommonHead,
        commonFileList,
        myFile
    },
    data() {
        return {
            diskSvg: require('../../assets/imgs/cloudDisk/disk.svg'),
            more: require('../../assets/imgs/cloudDisk/more.svg'),
            fankui: require('../../assets/imgs/cloudDisk/fankui.svg'),
            showSearch: false,
            showPopover: false,
            showBack: dsf.config.appTopMenu && dsf.config.appTopMenu.value
        };
    },
    computed: {
        ...mapState({
            active: (state) => {
                console.log(state.diskMenuType)
                return state.diskMenuType
            }
        }),
    },
    watch: {

    },
    methods: {
        onClickLeft() {
            this.$router.go(-1)
        },
        showSearchBox() {
            this.showSearch = true
        },
        closeSearchBox() {
            this.showSearch = false
        },
        goUpload() {
            this.$router.push({
                name: "uploadList"
            })
        },
        gofileTrends() {
            this.showPopover = false
            setTimeout(() => {
                this.$router.push({
                    name: "fileTrends"
                })
            }, 50);
        },
        goOutsideLink() {
            this.showPopover = false
            setTimeout(() => {
                this.$router.push({
                    name: "outsideLink"
                })
            }, 50);
        },
        goRecycle() {
            this.showPopover = false
            setTimeout(() => {
                this.$router.push({
                    name: "recycle"
                })
            }, 50);
        },
        changeType(type) {
            this.active = type
        }
    },
    created() {
        //注册全局事件总线，用于监听修改窗口的变化
        this.$bus.on("showSearchBox", () => {
            this.showSearchBox()
        });
        this.$bus.on("closeSearchBox", () => {
            this.closeSearchBox()
        });

    },
    mounted() {

    },
    destroyed() {},
}
</script>

<style lang="scss" scoped>
/deep/ .van-nav-bar__title {
    font-weight: bold;
    font-size: var(--font_size_2);
}

.cloudDisk {
    width: 100%;
    height: 100vh;

    .content {
        width: 100%;
        height: calc(100vh - 140px);
        position: relative;
        overflow: hidden;
        background: #FFF;
    }

}

.menus {
    width: 172px;
    height: 86px;
    background: #FEFFFE;
    box-shadow: -2px 4px 20px 0px rgba(0, 0, 0, 0.15);
    border-radius: 5px;
    box-sizing: border-box;
    padding: 5px 14px;
    display: flex;
    flex-direction: column;

    .iconText {
        height: 24px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        margin: 6px 0;

        /deep/ img {
            width: 14px;
            height: 14px;
        }

        span {
            font-size: var(--font_size_3);
            color: #171A1D;
            margin-left: 10px;
        }
    }

    .text {
        width: 100%;
        height: 32px;
        // border-bottom: 1PX solid rgba(224, 226, 228, 1);
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 0 10px;
        background: #F2F2F5;
        border-radius: 4px;
        font-size: var(--font_size_4);
        color: #171A1D;
        flex-shrink: 0;
        margin-top: 6px;
    }

    .line {
        width: 100%;
        border-bottom: 1PX solid rgba(224, 226, 228, 1);
        margin: 8px 0;
    }
}

/deep/ .van-popover__arrow {
    display: none;
}
</style>
