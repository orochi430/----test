<template>
<div class="shareRead-container">
    <div class="useritem" v-for="(item,index) in metaData.extra.list" :key="index">
        在{{item.createTime}}
        <br />
        <span :class="[item.opinion.length ? 'click-username' : 'username']" @click="item.opinion.length ? showOpinion(item) : ''">
            {{item.createName}}
            ({{item.createDetpName}})
            <i class="iconfont iconcomment-processing-outline" v-if="item.opinion.length"></i>
        </span>
        分发给=><span v-for="(share,shareindex) in item.shareList" :key="shareindex"><i v-if="shareindex>0">,</i>{{share.uName}}</span>
    </div>
    <van-popup v-model="isShow" closeable style=" height: 50%;width: 80%; overflow: hidden " round @close="isShow=false" get-container="#app">
        <div class="content">
            {{currentData.opinion}}
        </div>
    </van-popup>
</div>
</template>

<script>
import propMixin from "./mixin";
export default {
    name: 'controlShareRead',
    mixins: [propMixin],
    props: {
        formMeta: {
            type: Object,
            default: () => {
                return {};
            },
        }
    },
    data() {
        return {
            controlData: {

            },
            currentData: {},
            isShow: false
        }
    },
    created() {},
    mounted() {},
    methods: {
        showOpinion(item) {
            this.currentData = item;
            this.isShow = true;
        }
    },
};
</script>

<style lang="scss" scoped>
@import "src/assets/styles/themes.scss";
@import "src/assets/styles/mixin.scss";
.shareRead-container {
    max-height: 250px;
    overflow: auto;
}
.useritem {
    color: #999 !important;
    font-size: var(--font_size_2);
    &:not(:last-of-type) {
        border-bottom: 1px solid #ddd;
        padding-bottom: 6px;
    }
    &:not(:first-of-type) {
        margin-top: 6px;
    }
}

.click-username {
    @include font-theme('normal');
}
.username {
    color: #000;
}
.content{
    margin: 50px 20px 20px;
    overflow: auto;
    height: 80%;
}
</style>
