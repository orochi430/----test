<template>
<div class="container">
    <commonempty v-if="dataColumns.length == 0" description="暂无数据" />
    <van-cell-group v-for="(item, idx) in dataColumns" v-else :key="idx">
        <van-cell :title="item.salary_name" :value="item.salary_str" />
    </van-cell-group>
</div>
</template>

<script>
export default {
    name: 'salaryDetailCQCZ',
    data() {
        return {
            id: this.$route.params.id,
            dataColumns: []
        }
    },
    computed: {
        // title() {
        //     return `${this.salary.year}${this.salary.month}月份工资`
        // }
    },
    created() {
        let self = this;
        self.getSalaryDetail();
    },
    methods: {
        getSalaryDetail() {
            let self = this;
            dsf.http.get(`fn/importSalary/querySalary?pk=${self.id}`).done(result => {
                    console.log(result);
                    if (result.code == 200 && result.data) {
                        self.dataColumns = result.data;
                    }
                })
                .error(error => {
                    console.log("error", error);
                    // dsf.layer.toast("数据获取失败！", false);
                })
                .always(() => {
                    // dsf.layer.closeLoading(self.loading);
                });
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";

.van-cell {
    padding: 16px 16px;
}
</style>
