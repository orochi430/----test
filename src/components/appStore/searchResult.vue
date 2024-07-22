<template>
<div class="applyrRecord">
    <div class="search-box">
        <van-search v-model="keyword" placeholder="搜索" left-icon="" @search="search" :clearable="false">
            <template #left-icon>
                <i class="iconfont iconsousuo i1" style="color: #999;" @click="search(keyword)"></i>
            </template>
        </van-search>
    </div>
    <div class="result-box">
        <common-card ref="commonCard" title='应用列表' :keyword="keyword" :cardHeight="`calc(100vh - ${dsf.util.getOffsetTop()} - ${$store.state.isShowAppFooter ? '1.2rem' : '0px'} - 75px)`" type='all'></common-card>
    </div>
</div>
</template>

<script>
import CommonCard from './commonCard.vue'
export default {
    name: 'searchResult',
    components: {
        CommonCard
    },
    props: {},
    data() {
        return {
            keyword: this.$route.query.key || '',
        }
    },
    computed: {},
    watch: {},
    created() {

    },
    mounted() {

    },
    methods: {
        search(value) {
            this.keyword = value;
            this.$refs.commonCard.initUrl();
            this.$refs.commonCard.onRefresh();
        }
    }
}
</script>

<style lang="scss" scoped>
.applyrRecord {
    .search-box {
        width: 100%;
        height: 55px;
        padding: 10px 15px;
        box-sizing: border-box;
        background: #fff;
        border-bottom: 1px solid #f5f5f5;

        .van-search {
            height: 34px;
            padding: 0;
            border-radius: 6px;
            background: #ECEDEE;

            .van-search__content {
                background-color: transparent;
                height: 100%;
                padding: 0 0 0 10px;

                ::v-deep .van-cell,
                ::v-deep .van-cell__value,
                ::v-deep .van-field__body {
                    height: 100%;
                }

                ::v-deep input {
                    color: #333;

                    &::placeholder {
                        color: #AAAAAA;
                    }
                }
            }
        }
    }

    .result-box {
        padding: 10px;
    }

}
</style>
