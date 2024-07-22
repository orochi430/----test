<template>

</template>
<script>
export default {
    name: "checkRecord",
    data() {
        return {

        }
    },
    mounted() {

    },
    created() {
        this.loadData();
    },
    computed: {
    },
    methods: {
        loadData() {
            let self = this;

            dsf.http.post("/fn/list/220509191612Y4Hkk8Bj3qblXb4uSU6/mobile/q?moduleId=220509172504FpGJRzrlSyzGzCuthj7&isFirst=1", {})
                .then(function (data) {
                    let datatemp = data.data.datas;
                    if (datatemp.length == 1) {
                        let newpk = '';
                        //请求接口获取当前操作数据的pk
                        if (self.$route.query.type == "week") {
                            dsf.http.post("/fn/resumption/toWeekForm?projectId=" + datatemp[0].dataValue["A0001"], {}).then(res => {
                                if (res.data.code == 200) {
                                    newpk = res.data.data.pk;
                                    let queryObj = {
                                        listId: "220509201313UNAlxxeSZoGWEXImCr1",
                                        method: "edit",
                                        projectName: datatemp[0].dataValue["C-PROJECT-MAINTAIN-001"],
                                        projectName007t: datatemp[0].dataValue["C-PROJECT-MAINTAIN-007.text"],
                                        projectName007v: datatemp[0].dataValue["C-PROJECT-MAINTAIN-007.value"],
                                        projectName008t: datatemp[0].dataValue["C-PROJECT-MAINTAIN-008.text"],
                                        projectName008v: datatemp[0].dataValue["C-PROJECT-MAINTAIN-008.value"]
                                    };
                                    if (res.data.data.initDataSource && res.data.data.initDataSource == 1) {
                                        queryObj.initDataSource = res.data.data.initDataSource
                                    }
                                    self.$router.replace({
                                        path: "/commonForm/220509172517m6bynFnIjv7yMk28uzq/" + newpk,
                                        query: queryObj
                                    });
                                }
                            });
                        } else {
                            dsf.http.post("/fn/resumption/toadyForm?projectId=" + datatemp[0].dataValue["A0001"], {}).then(res => {
                                if (res.data.code == 200) {
                                    newpk = res.data.data.pk;
                                    let queryObj = {
                                        projectName: datatemp[0].dataValue["C-PROJECT-MAINTAIN-001"],
                                        B0054: datatemp[0].dataValue["B0054.value"],
                                        CPROJECTMAINTAIN006: datatemp[0].dataValue["C-PROJECT-MAINTAIN-006.value"]
                                    };
                                    if (res.data.data.initDataSource && res.data.data.initDataSource == 1) {
                                        queryObj.initDataSource = res.data.data.initDataSource
                                    }
                                    self.$router.replace({
                                        path: "/commonForm/220509172517m6bynFnIjv7yMk28uzq/" + newpk,
                                        query: queryObj
                                    });
                                }
                            });
                        }
                    } else if (datatemp.length >= 1) {
                        self.$router.replace({
                            path: "/commonList/220509191612Y4Hkk8Bj3qblXb4uSU6/220509172504FpGJRzrlSyzGzCuthj7"
                        });
                    } else {

                    }
                })
        }
    }
}
</script>
<style lang="scss">
</style>