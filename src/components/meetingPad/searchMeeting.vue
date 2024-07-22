<template>
<div class="container">
    <div class="container-searchBar">
        <div class="icon">
            <van-cell icon="arrow-left" center @click="$router.back()"></van-cell>
        </div>
        <div class="container-searchBar-searchLine">
            <van-search v-model="searchContent" show-action placeholder="历史会议" background="#F5F6F9" clearable clear-trigger="always" @search="onSearch">
                <template #action>
                    <div @click="onSearch">搜索</div>
                </template>
            </van-search>
        </div>
    </div>
    <div class="searchHistory" v-show="isSearching">
        <van-list>
            <van-cell v-for="(item, index) in filterHistory" :key="index" :title="item" @click="selectHistory(item)" />
        </van-list>
    </div>
    <div class="result" v-if="!isSearching">
        <meetingList :list="meetingLists" :active-id="meetingInfo.id" @updateAcitve="updateAcitve" card-bottom="0.5rem" card-padding-top="0.5rem" />
    </div>
</div>
</template>

<script>
import meetingList from "./components/meetingList";

export default {
    name: "searchMeeting",
    components: {
        meetingList,
    },
    data() {
        return {
            searchContent: "", //搜索框的内容
            history: [], //历史
            filterHistory: [], //过滤历史
            isSearching: true, //是否在搜索状态，历史记录和结果展示的切换
            meetingLists: [], //搜索的结果
            meetingInfo: {} //当前搜素结果中选中对象
        };
    },
    watch: {
        //监听输入框，更改历史记录
        searchContent(newValue, oldValue) {
            this.isSearching = true
            let arr = [];
            for (let i = 0; i < this.history.length; i++) {
                if (this.history[i] !== null && this.history[i].split(newValue).length > 1) {
                    arr.push(this.history[i]);
                }
            }
            this.filterHistory = arr;
        },
    },
    mounted() {
        this.init()
    },
    methods: {
        //读取localStorage中的历史
        init() {
            this.history = dsf.util.loadLocalStore("searchHistory").split(',');
            this.filterHistory = this.history
        },
        //发送搜索请求
        onSearch() {
            dsf.http
                .post("fn/conferenceMobile/meetingList", {
                    _content: this.searchContent,
                }).then((res) => {
                    if (res.statusText === "OK") {
                        this.meetingLists = [];
                        for (const i of res.data.datas) {
                            this.meetingLists.push(i.dataValue)
                        }
                        this.meetingInfo = this.meetingLists
                        this.isSearching = false;
                    } else {
                        dsf.layer.toast(res.message);
                    }
                }).catch(err => {
                    console.log(err)
                });
            let hasOwn = false
            for (const str of this.history) {
                if (str === this.searchContent) {
                    hasOwn = true
                }
            }
            console.log(hasOwn)
            if (this.searchContent !== '' && !hasOwn) {
                this.history.unshift(this.searchContent)
                dsf.util.saveToLocalStore("searchHistory", this.history)
            }
        },

        //点击历史记录   更改搜索内容
        selectHistory(value) {
            this.searchContent = value;
            this.onSearch()
        },

        //点击搜索结果的一项
        updateAcitve(item) {

            this.meetingInfo = item
            if (!dsf.config.login.defaultUrl) {
                this.$router.push({
                    name: "meetingPadAppcenter",
                    query: {
                        meetingId: this.meetingInfo.id
                    }
                })
            } else {
                this.$router.push({
                    name: `${dsf.config.login.defaultUrl}`,
                    query: {
                        meetingId: this.meetingInfo.id
                    }
                })
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.container {
    height: 100%;
    background-color: white;

    &-searchBar {
        padding-top: 1.18rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        border-bottom: 0.02rem solid #3389e0;
        padding-bottom: 0.96rem;
        margin: 0 3.4rem;

        .icon {
            ::v-deep .van-cell__left-icon {
                height: 0.8rem;
                font-size: 0.8rem;
                line-height: 0.8rem;
                margin-right: 0.6rem;
            }
        }

        &-searchLine {
            width: 41.82rem;
            font-size: 0.8rem;
            color: #a6a6a6;
            display: flex;
            align-items: center;
            height: 100%;

            ::v-deep .van-search {
                width: 100%;
                height: 2.4rem;

                .van-field__body {
                    height: 0.74rem;
                    padding-right: 0.448rem;
                    border-right: 0.02rem solid #979797;
                    width: 100%;
                }

                input {
                    font-size: 0.8rem;
                    background-color: #f5f6f9;
                }
            }

            ::v-deep .van-search__action {
                font-size: 0.8rem;
                color: #3389e0;
                line-height: 1.12rem;
                padding-left: 0.52rem;
                padding-right: 0.86rem;
            }

            ::v-deep .van-icon {
                font-size: 0.76rem;
                margin-right: 0.448rem;
                width: 0.76rem;
                height: 100%;
                color: #a6a6a6;
            }

            ::v-deep .van-cell__value {
                display: flex;
                align-items: center;
            }

            ::v-deep .van-field__clear {
                width: 0.76rem;
                height: 0.76rem;
                color: white;
                margin-top: 0;
                margin-right: 0.16rem;
            }

            ::v-deep .van-field__left-icon {
                line-height: 0.8rem;
            }
        }
    }

    .searchHistory {
        margin-left: 6.56rem;
        height: 27rem;

        ::v-deep .van-cell {
            font-size: 0.8rem;
            color: #999999;
        }
    }

    .result {
        margin-left: 4.56rem;
        height: 27rem;
        padding-right: 2rem;
    }
}
</style>
