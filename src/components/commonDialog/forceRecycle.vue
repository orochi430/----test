<template>
<div class="testDialog1">
    <van-popup v-model="show" :style="{ height: '100%' }" position="bottom" @close="close">
        <div class="warp">
            <van-nav-bar :title="toNode.actname || '节点选择'" @click-right="close">
                <template #right>
                    <van-icon name="cross" size="20" />
                </template>
            </van-nav-bar>
            <div class="radios">
                <van-radio-group v-model="value" @change="radioChange">
                    <van-radio :name="item.id" v-for="(item,index) in fromNodeList" :key="index">{{item.uname}}（{{item.actname}}）</van-radio>
                </van-radio-group>
            </div>
            <div class="buttonx">
                <van-button type="info" block @click="doSubmit">提交</van-button>
            </div>
        </div>
    </van-popup>
</div>
</template>

<script>
export default {
    name: 'forceRecycle',
    props: {
        formData: {
            type: Object,
            default: () => {
                return {};
            },
        },
        metaData: {
            type: Object,
            default: {}
        },
        formParams: {
            type: Object,
            default: {}
        }
    },
    components: {},
    data() {
        return {
            title: "回收节点",
            show: true,
            value: "",
            fromNodeList: [],
            toNode: {},
            currentData: {}
        };
    },
    computed: {},
    watch: {},
    methods: {
        close() {
            this.show = false
            this.$emit("closeCallback", this.value)
        },
        getNodeUserList() {
            let that = this
            dsf.http.post('fn/flow/getForceRecycleData', {
                pk: this.formParams.pk,
            }).then(res => {
                console.log(res)
                if (res.data.code == 200) {
                    //VueData.componentName = "forceRecycle"
                    let data = res.data.data[0]
                    console.log(data)
                    that.fromNodeList = data.fromNodeList
                    that.toNode = data.toNode
                } else {
                    dsf.layer.toast("接口请求失败！")
                }
            })
        },
        radioChange(id) {
            this.currentData = this.fromNodeList.filter(item => {
                return item.id == id
            })[0]
        },
        doSubmit() {
            if (!this.value) {
                dsf.layer.toast("请选择相关节点！")
                return
            }
            let param = {
                infoId: this.formParams.pk,
                moduleId: this.formParams.moduleId,
                type: "SR_SPECIAL",
                ignoreOpinion: 1,
                agencyType: 2,
                determineUser: this.currentData.uid,
                pnid: this.currentData.id,
                nextNodeId: this.toNode.wfnodeid,
                receiverList: JSON.stringify([{
                    type: 1,
                    userId: this.toNode.uid,
                    userName: this.toNode.uname,
                    deptId: this.toNode.deptid,
                    deptName: this.toNode.deptname
                }])
            }
            // console.log(param)
            dsf.http.post('fn/mobileFlow/getFlowNode', param).then(res => {
                console.log(res)
                if (res.data.result) {
                    dsf.layer.toast("操作成功！")
                    this.show = false
                    this.$emit("backSucces")
                } else {
                    dsf.layer.toast("接口请求失败！")
                }
            })
        }
    },
    created() {},
    mounted() {
        this.getNodeUserList()
    },
    destroyed() {},
}
</script>

<style lang="scss" scoped>
::v-deep .warp {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .van-nav-bar__title {
        font-weight: bold;
    }

    .radios {
        width: 100%;
        height: calc(100vh - 130px);
        box-sizing: border-box;
        padding: 0 20px;
        overflow-y: auto;

        .van-radio {
            width: 100%;
            height: 50px;
            border-bottom: 1PX solid #ebebeb;

            &:last-child {
                border: none;
            }

            .van-radio__label {
                font-size: var(--font_size_2);
                margin-left: 10px;
            }
        }
    }

    .buttonx {
        width: 100%;
        height: 70px;
        box-sizing: border-box;
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-top: 1PX solid #ebebeb;
    }
}
</style>
