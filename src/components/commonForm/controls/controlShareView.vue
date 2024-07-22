<template>
<div id="controlShareView">
    <div class="usercount">共 <span class="sp">{{totalCount}}</span> 人已阅</div>
    <van-collapse v-model="activeNames">
        <van-collapse-item :title="item.name" :name="index" v-for="(item,index) in deptList" :key="index">
            <div class="useritem" v-for="(useritem,userindex) in item.userlist" :key="userindex">
                <span>{{useritem.uname}}</span>
                <span v-if="useritem.shareContent">："{{useritem.shareContent}}"</span>
            </div>
        </van-collapse-item>
    </van-collapse>
</div>
</template>

<script>
import LockPageVue from "../../common/LockPage.vue";

import propMixin from "./mixin";
export default {
    name: 'controlShareView',
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
            totalCount: 0,
            deptList: [],
            activeNames: []
        }
    },
    created() {
        for (let [k, v] of Object.entries(this.metaData.extra.deptList)) {
            this.deptList.push({
                name: k,
                userlist: v
            })
            v.forEach(element => {
                this.totalCount++;
            });
        }
    },
    mounted() {},
    methods: {
        showOpinion(item) {}
    },
};
</script>

<style lang="scss" scoped>
.useritem {
    margin-bottom: 4px;
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
