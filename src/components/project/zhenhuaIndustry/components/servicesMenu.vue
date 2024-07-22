<template>
    <div class="zhzg_servicesmenus">
        <van-sticky :offset-top="isShowAppHeader ? '0.92rem' : '0'">
            <div class="flex ac search-container" :style="{paddingTop:dsf.util.getOffsetTop('0',true)}">
                <van-search v-model="content" placeholder="点击进行搜索" @search="onSearch" @cancel="onCancel" :clearable="false">
                </van-search>
                <span @click="onSearch()">搜索</span>
            </div>
        </van-sticky>
        <application-center :itemdata="itemdata"></application-center>

        <van-popup get-container="#app" v-model="showSearchMenu" :close-on-click-overlay="false" lock-scroll
            position="bottom" style="height: 100vh">
            <van-sticky>
                <van-nav-bar @click-left="showSearchMenu = !showSearchMenu" style="z-index:9">
                    <template #left>
                        <van-icon name="arrow-left" /><span>返回</span>
                    </template>
                </van-nav-bar>
            </van-sticky>
            <div class="dsf-list">
                <template v-for="(item, index) in searchMenu">
                    <application-item :rowNum="rowNum" :key="index" :data="item" v-if="item.isshow"></application-item>
                </template>
            </div>
        </van-popup>
    </div>
</template>
<script>
import { mapState } from "vuex";
import ApplicationCenter from "@/components/applicationCenter/index";
import applicationItem from "@/components/applicationCenter/applicationItem.vue"
export default {
    name: "zhzg_servicesmenus",
    components: { ApplicationCenter, applicationItem },
    data() {
        return {
            content: "",
            itemdata: {
                name: "ApplicationCenterComponents",
                params: {
                    mobileRowNumber: "4",
                    padRowNumber: "5",
                    showIcon: false,
                    outsideTitle: false
                }
            },
            showSearchMenu: false,
            searchMenu: [],
            rowNum: 4
        }
    },
    computed: {
        ...mapState({
            isShowAppFooter: (state) => state.isShowAppFooter,
            isShowAppHeader: (state) => state.isShowAppHeader,
            storeMainMenu: (state) => state.applications.menus,
        }),
    },
    watch: {
        "storeMainMenu": {
            handler(n, o) {
                if (n != o) {
                    console.log(this.storeMainMenu)
                    // this.storeMainMenu.forEach(elementMenu => {

                    // });
                }
            },
        },
    },
    mounted() {
    },
    created() {
        this.itemdata.params.positionTab = {
            alwaysShow: true,
            offsetTop: this.isShowAppHeader ? "2.12rem" : "1.2rem",
            useTheme: true
        }
    },
    methods: {
        onSearch(val) {
            let self = this;
            self.searchMenu = []
            if (self.content.length) {
                self.showSearchMenu = true
                self.storeMainMenu.forEach(elementMenu => {
                    elementMenu.child.forEach(elementChildMenu => {
                        if (elementChildMenu.name.indexOf(self.content)>-1) {
                            self.searchMenu.push(elementChildMenu)
                        }
                    });
                });
            } else {
                self.showSearchMenu = false
                self.searchMenu = []
            }
        },
        onCancel() {
            this.searchMenu = []
        }
    },
}
</script>
<style lang="scss" scoped>
.zhzg_servicesmenus {
    .search-container {
        min-height: 60px;
        background-color: var(--normal);
        padding: 0px 20px;

        .van-search {
            padding: 0;
            border-radius: 6px;
            background-color: #FFFFFF;
            flex: 1;

            .van-search__content {
                background-color: transparent;

                border-radius: 6px;
                // ::v-deep input {
                //     color: #fff;

                //     &::placeholder {
                //         color: #fff;
                //     }
                // }
            }
        }

        span {
            width: 50px;
            text-align: right;
            font-size: 16px;
            color: #fff;
        }

        // img {
        //     width: 22px;
        //     margin-left: 8px;
        // }
    }
}

.dsf-list {
    padding-top: 20px;
}
</style>
