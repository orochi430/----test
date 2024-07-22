<template>
<div class="applyrRecord">
    <div class="search-box">
        <van-search v-model="keyword" placeholder="搜索" left-icon="" @search="search" :clearable="false">
            <template #left-icon>
                <i class="iconfont iconsousuo i1" style="color: #999;" @click="search"></i>
            </template>
        </van-search>
    </div>
    <van-tabs v-model="active">
        <van-tab :title="`申请中 (${applyNum.ing})`">
            <common-card ref="commonCard1" :keyword="keyword" type="applying" :cardHeight="cardHeight"></common-card>
        </van-tab>
        <van-tab :title="`已通过 (${applyNum.pass})`">
            <common-card ref="commonCard2" :keyword="keyword" type="applyPass" :cardHeight="cardHeight"></common-card>
        </van-tab>
        <van-tab :title="`已拒绝 (${applyNum.reject})`">
            <common-card ref="commonCard3" :keyword="keyword" type="applyReject" :cardHeight="cardHeight"></common-card>
        </van-tab>
    </van-tabs>
</div>
</template>

<script>
import CommonCard from './commonCard.vue'
export default {
    name: 'applyrRecord',
    components: {
        CommonCard
    },
    props: {},
    data() {
        return {
            keyword: '',
            cardHeight: `calc(100vh - ${dsf.util.getOffsetTop()} - ${this.$store.state.isShowAppFooter ? '1.2rem' : '0px'} - 119px)`,
            active: 0,
            applyNum: {
                ing: 0,
                pass: 0,
                reject: 0
            }
        }
    },
    computed: {},
    watch: {},
    created() {

    },
    mounted() {
        this.getApplyNum();
    },
    methods: {
        search(value) {
            this.keyword = value;
            switch (this.active) {
                case 0:
                    this.$refs.commonCard1.cardType = 'applying';
                    this.$refs.commonCard1.initUrl();
                    this.$refs.commonCard1.onRefresh();
                    break;
                case 1:
                    this.$refs.commonCard1.cardType = 'applyPass';
                    this.$refs.commonCard2.initUrl();
                    this.$refs.commonCard2.onRefresh();
                    break;
                case 2:
                    this.$refs.commonCard1.cardType = 'applyReject';
                    this.$refs.commonCard3.initUrl();
                    this.$refs.commonCard3.onRefresh();
                    break;
                default:
                    break;
            }
        },
        getApplyNum() {
            let that = this;
            dsf.http.get("fn/application/store/apply/nums", {
                    "zdfw": '1', //终端范围-移动端
                })
                .then(res => {
                    if (res && res.data && res.data.code == 200 && res.data.data) {
                        that.applyNum = {
                            ing: res.data.data[1],
                            pass: res.data.data[9],
                            reject: res.data.data[2]
                        };
                    }
                })
                .catch(res => {})
                .finally(() => {});
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

    .van-tab__pane {
        padding: 10px;
    }

}
</style>
