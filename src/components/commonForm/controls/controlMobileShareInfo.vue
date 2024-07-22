<template>
<div id="controlMobileShareInfo">
    <van-tabs v-model="activeIndex">
        <van-tab :title="tab.name" :badge="tab.badge" v-for="(tab,index) in this.metaData.extra.tabs" :key="index">
            <div v-if="tab.action=='yyqk'">
                <div class="useritem" v-for="(useritem,userindex) in tab.data" :key="userindex">
                    <div :class="useritem.shareContent=='已阅'?'opinionText':'opinionTextBold'" v-html="useritem.shareContent==''?'已阅':useritem.shareContent">
                    </div>
                    <div class="tr">
                        <i>{{ useritem.uname }}&nbsp;</i>
                        {{ useritem.lastUpdataDateShow }}
                    </div>
                </div>
            </div>
            <div v-else>
                <span v-for="(useritem,userindex) in tab.data" :key="userindex">{{useritem.uname}}
                    <i v-if="userindex<tab.data.length-1">，</i></span>
            </div>
        </van-tab>
    </van-tabs>
</div>
</template>

<script>
import propMixin from "./mixin";
export default {
    name: 'controlMobileShareInfo',
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
            activeIndex: 0
        }
    },
    created() {},
    mounted() {},
    methods: {
        showOpinion(item) {}
    },
};
</script>

<style lang="scss" scoped>
.opinionText {
    margin-top: 5px;
    min-height: 30px;

}

.opinionTextBold {
    margin-top: 5px;
    min-height: 30px;
    font-weight: bold;
}

.tr {
    text-align: right;
}

.useritem {
    margin-bottom: 4px;
    margin-top: 8px;
}

.usercount {
    font-size: var(--font_size_2);
    margin-bottom: 10px;

    .sp {
        color: crimson;
    }
}

.username {
    color: #1989fa;
    margin-left: 5px;
}

.content {
    padding: 50px 20px 20px;
    overflow: auto;
}

.van-collapse-item {
    ::v-deep &__title {
        font-size: var(--font_size_2);
        padding: 0.2rem 0;
    }

    ::v-deep &__content {
        font-size: var(--font_size_2);
        padding: 0;
    }
}
</style>
