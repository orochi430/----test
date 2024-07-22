<template>
<!-- 民主测评列表 -->
<div class="democracy_list">
    <!-- 导航栏 -->
    <van-nav-bar title="民主测评" left-text="返回" left-arrow @click-left="$router.back()" />

    <!-- 搜索 -->
    <van-search v-model="keyword" show-action placeholder="请输入搜索关键词" @search="onSearch">
        <template #action>
            <div @click="onSearch">搜索</div>
        </template>
    </van-search>

    <!-- 列表 -->
    <van-cell-group v-if="list && list.length">
        <van-cell :title="items.ndText" :label="items.pcStart + ' 至 ' + items.pcEnd" v-for="items in list" :key="items.id" v-show="items.show" :to="{ name: 'democracyAssess', params: { scoringId: items.id, title: items.ndText, start: items.pcStart, end: items.pcEnd }}" />
    </van-cell-group>
    <commonempty v-else />
</div>
</template>

<script>
export default {
    name: "democracy_list",
    data() {
        return {
            keyword: "", //搜索关键字
            list: "", //列表数据
        };
    },
    watch: {
        keyword(newV, oldV) {
            if (!newV && this.list) {
                this.list.forEach((ele) => {
                    ele.show = true;
                });
                Object.assign([], this.list);
            }
        },
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            //加载数据
            let userid = dsf.util.loadLocalStore("user").user_id;
            dsf.http
                .post("fn/DepartmentType/DemocraticEvaluation", {
                    userId: userid,
                })
                .then((res) => {
                    // console.log(res);
                    this.list = res.data;

                    this.list.forEach((ele) => {
                        ele.pcEnd = ele.pcEnd.split(" ")[0];
                        ele.pcStart = ele.pcStart.split(" ")[0];
                        ele.show = true; //当前项是否显示
                    });
                    // console.log(this.list);
                });
        },
        onSearch() {
            //搜索事件
            console.log("搜索了");
            this.list.forEach((ele) => {
                ele.ndText.includes(this.keyword) ?
                    (ele.show = true) :
                    (ele.show = false);
            });
            this.list = Object.assign([], this.list);
        },
    },
};
</script>

<style lang="scss" scoped>
.van-cell-group {
    margin-top: 10px;
    background-color: #f5f5f5;
}

>>>.van-cell__label {
    margin-top: 8px;
}

.van-cell-group .van-cell {
    margin-bottom: 8px;
}
</style>
