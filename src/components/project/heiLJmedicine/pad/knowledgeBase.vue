<template>
    <div class="knowledgeBase">
        <div class="left">
            <div>
                <van-sticky :offset-top="isShowAppHeader ? '0.92rem' : '0'">
                    <van-dropdown-menu active-color="#1a66b9">
                        <van-dropdown-item v-model="knowledgeTypeItem" @change="changeType" :options="knowledgeType" />
                    </van-dropdown-menu>
                </van-sticky>
            </div>
            <div v-for="(item,index) in knowledgeChildType" :key="index" @click="changeChildType(item)">
                <div class="typeItem" :class="{'typeItem-actived':item.actived}">
                    <span>{{item.wtlx}}</span>
                </div>
            </div>
        </div>
        <div class="right">
            <van-search v-model="searchV" placeholder="请输入搜索关键词" @search="onSearch" input-align="center"
                maxlength="10" />
            <div class="list">
                <div class="list-item" v-for="(item,index) in list" :key="index">

                    <div class="list-title">
                        <div class="list-title-left">{{'问：'+item.wtms}}</div>
                        <div class="list-title-right">{{'地区：'+item.sscs}}</div>
                    </div>
                    <div class="list-content"><span>{{'答：'+item.wtjd}}</span></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    mapState
} from 'vuex'
export default {
    name: 'knowledgeBase',
    data() {
        return {
            knowledgeTypeItem: "",
            knowledgeType: [
            ],
            list: [],
            loading: false,
            finished: false,
            knowledgeChildType: [],
            searchV: "",
            loadingIndex: null
        }
    },
    computed: {
        ...mapState({
            isShowAppHeader: state => state.isShowAppHeader
        }),
    },
    created() {
        this.loadingIndex = dsf.layer.loading()
        this.loadData()
    },
    methods: {
        onSearch(value) {
            this.loadingIndex = dsf.layer.loading()
            let self = this
            let city = self.knowledgeType.find(item => item.value == self.knowledgeTypeItem)
            dsf.http.post("fn/mobile/queryWt", { cityName: city.text, wtms: value }).then((data) => {
                dsf.layer.closeLoading(self.loadingIndex)
                if (data.data.code == 200) {
                    self.list = data.data.data
                }
            })
        },
        changeChildType(item, showLoading = true) {
            let self = this
            self.searchV = ""
            if (showLoading) {
                this.loadingIndex = dsf.layer.loading()
            }
            self.knowledgeChildType.forEach(element => {
                self.$set(element, "actived", false)
            });
            item.actived = true
            let city = self.knowledgeType.find(item => item.value == self.knowledgeTypeItem)
            dsf.http.post("fn/mobile/typeToWt", { cityName: city.text, type: item.wtlx }).then((data) => {
                dsf.layer.closeLoading(self.loadingIndex)
                if (data.data.code == 200) {
                    self.list = data.data.data
                }
            })
        },
        changeType(showLoading = true) {
            let self = this
            if (showLoading) {
                this.loadingIndex = dsf.layer.loading()
            }
            let city = self.knowledgeType.find(item => item.value == self.knowledgeTypeItem)
            dsf.http.post("fn/mobile/queryAllType", { cityName: city.text }).then((data) => {
                if (data.data.code == 200) {
                    self.knowledgeChildType = data.data.data
                    if (self.knowledgeChildType.length) {
                        self.knowledgeChildType[0].actived = true
                        self.changeChildType(self.knowledgeChildType[0], false)
                    }
                }
            })
        },
        loadData() {
            let self = this
            dsf.http.post("fn/mobile/getAllCity").then((data) => {
                if (data.data.code == 200) {
                    data.data.data.forEach(element => {
                        self.knowledgeType.push({ "text": element.code_name, "value": element.code_value })
                    });
                    if (self.knowledgeType.length) {
                        self.knowledgeTypeItem = self.knowledgeType[0].value
                        self.changeType(false)
                    }
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../../../assets/styles/themes.scss';
@import '../../../../assets/styles/mixin.scss';

::v-deep .van-sticky--fixed {
    width: 30% !important;
}

::v-deep .van-dropdown-item {
    width: 30% !important;
}




.knowledgeBase {
    height: calc(100vh - 0.92rem);
    overflow: hidden;

    .left {
        width: 30%;
        float: left;
        height: 100%;
        overflow: auto;
    }

    .right {
        width: 69%;
        float: right;
        height: 100%;
        overflow: auto;

        .list {
            background-color: #fff;
            padding: 10px 16px;
            position: relative;
            display: flex;
            flex-direction: column;

            .list-item {
                margin-bottom: 10px;
                border-radius: 10px;


                .list-title {
                    font-size: var(--font_size_3);
                    font-weight: bold;

                    &::after {
                        clear: both;
                        content: "";
                        display: block;
                        height: 0;
                    }

                    .list-title-left {
                        width: 69%;
                        float: left;
                        height: 100%;
                        overflow: auto;
                    }

                    .list-title-right {
                        width: 30%;
                        float: right;
                        height: 100%;
                        overflow: auto;
                    }
                }

                .list-content {
                    color: #969799;
                    padding: 5px 0px;
                }
            }
        }


    }

    .typeItem {
        position: relative;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        height: 0.96rem;
        background-color: #fff;
        align-items: center;
        -webkit-justify-content: center;
        justify-content: center;

        span {
            position: relative;
            box-sizing: border-box;
            max-width: 100%;
            padding: 0 0.16rem;
            color: #323233;
            font-size: var(--font_size_3);
            line-height: 0.44rem;
        }

    }

    .typeItem-actived {
        //box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.2);
        border: 1px solid #f5f5f5;

        // @include background-theme('normal');
        // @include font-theme('normal');
        span {
            color: #1a66b9 !important;
        }

    }
}
</style>
