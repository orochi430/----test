<template>
<div v-if="errored" class="init-div">{{ errorMsg }}</div>
<div v-else>
    <van-cell :value="docInfo.docCode" center title="文件编号" />
    <van-cell :value="docInfo.deliDate" center title="派发日期" />
    <!-- <div class="info">
        <p>文件编号：{{ docInfo.docCode }}</p>
        <p>派发日期：{{ docInfo.deliDate }}</p>
    </div> -->
    <div class="card">
        <van-cell-group :border="false" inset>
            <van-cell center title="接收部门" value="文件状态" />
            <van-cell v-for="(item,idx) in docInfo.docState" :key="idx" :title="item.receiveDeptName" center>
                <template #default>
                    <van-tag :type="vtype(item)" size="large">{{ item.fileStatusText }}</van-tag>
                </template>
            </van-cell>
        </van-cell-group>
    </div>
</div>
</template>

<script>
// import store from "@/common/util";
export default {
    data() {
        return {
            errored: false,
            errorMsg: "获取数据失败！",
            loading: null,
            docId: this.$route.params.id,
            docInfo: null
        };
    },
    computed: {
        vtype() {
            return (item) => {
                let val = "";
                switch (item.fileStatus) {
                    case -1:
                        val = "danger";
                        break;
                    case 0:
                        val = "warning";
                        break;
                    case 1:
                        val = "success";
                        break;
                    default:
                        val = "danger";
                }
                return val;
            }
        }
    },
    created() {
        let self = this;
        self.loading = dsf.layer.loading();
        self.getDocStatus();
    },
    mounted() {},
    methods: {
        getDocStatus() {
            let self = this;
            dsf.http
                .get(`fn/getFileDetailInfo?fileId=${self.docId}`)
                .done(result => {
                    // result = result.data;
                    if (result.code == 200) {
                        self.docInfo = {
                            docCode: result.data.wh,
                            deliDate: dsf.date.format(new Date(result.data.pfDate), "yyyy-mm-dd"),
                            docState: result.data.datas
                        };
                    }
                })
                .error(error => {})
                .always(() => {
                    dsf.layer.closeLoading(self.loading);
                });
        }
    },
};
</script>

<style lang="scss" scoped>
.init-div {
    position: absolute;
    width: 100%;
    height: 20px;
    line-height: 20px;
    margin-top: -20px;
    top: 50%;
    left: 0;
    font-size: var(--font_size_2);
    color: #7f7a7a;
    text-align: center;
}

.card {
    background-color: #fff;
    overflow: hidden;

    .van-cell-group {
        margin: 16px;
        border-radius: 10px;
        border: 1px solid #e5e5e5;
        overflow: hidden;
    }
}

.van-cell {
    font-size: var(--font_size_2);

    ::v-deep span {
        line-height: 34px;
    }

    &:not(:first-of-type)::before {
        position: absolute;
        box-sizing: border-box;
        content: ' ';
        pointer-events: none;
        right: 16px;
        top: 0;
        left: 16px;
        border-bottom: 1px solid #cfcfcf;
        -webkit-transform: scaleY(.5);
        transform: scaleY(.5);
    }
}
</style>
