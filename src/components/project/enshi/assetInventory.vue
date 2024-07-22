<template>
<div class="container" style="height: calc(100vh - 0.92rem)">
    <div class="detail">
        <div class="state" v-if="showState">
            <div><van-icon name="warning" size="1.5rem" color="#f29b38"/></div>
            <div class="message">{{message}}</div>
        </div>
        <div v-else>
            <van-cell :value="zcData.ZCMC" center title="资产名称" />
            <van-cell :value="zcData.ZCBH" center title="资产编号" />
            <van-cell :value="zcData.SYBM" center title="使用部门" />
            <van-cell :value="zcData.SYR" center title="使用人" />
            <van-cell :value="zcData.ZCZT" center title="资产状态" />
            <van-cell :value="zcData.CFDD" center title="存放地点" />
        </div>
    </div>
    <div v-if="showBtn" class="btn-container">
        <van-button class="btn" type="info" @click="scan">继续清查</van-button>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            message: '调用摄像头扫码中',
            zcData: {},
            showState: true,
            loading: ''
        }
    },
    computed: {
        showBtn() {
            return this.$route.query.showBtn == 1
        }
    },
    created() {
        this.scan()
    },
    methods: {
        scan() {
            if(dsf.util.getClientName()=='app') {
                xsfBarcode.scan(
                    (res) => {
                        console.log(res)
                        dsf.layer.closeLoading(this.loading)
                        if(res.text) {
                            dsf.http.post('ctrl/asset/check/startCheckAsset', {
                                qcId: this.$route.query.qcId || '',
                                zcId: res.text,
                                isCheck: this.showBtn ? '1' : '0'
                            }).then(response => {
                                if(response.data.code == 200) {
                                    this.zcData = response.data.data.zcData
                                    switch (response.data.data.checkState) {
                                        case '1': 
                                            dsf.layer.toast('记录成功',true)
                                            this.showState = false
                                            break;
                                        case '2':
                                            this.message = '该资产已清查'
                                            this.showState = true
                                            break;
                                        case '3':
                                            this.message = '该二维码无效(ID没有找到对应的资产卡片)'
                                            this.showState = true
                                            break
                                        case '4':
                                            this.message = '资产清查记录失败'
                                            this.showState = true
                                            break
                                        case '5':
                                            this.message = '清查id不存在'
                                            this.showState = true
                                            break
                                        default:
                                            this.showState = false
                                            break;
                                    }
                                }
                            })
                        } else {
                            this.message = '该二维码无效'
                            this.showState = true
                        }
                    },
                    (error) => {
                        dsf.layer.closeLoading(this.loading)
                        this.message = '扫码失败'
                        this.showState = true
                        alert("扫码失败: " + error);
                    }
                );
            // } else if(dsf.util.getClientName()=='wechat') {
            //     wx.scanQRCode({
            //         needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            //         scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            //         success: function (res) {
            //             var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
            //         }
            //     });
            }else {
                this.message = '需在app中进行扫码'
                this.showState = true
            }
        }
    }
}
</script>
<style lang='scss' scoped>
.state {
    margin: 1rem 0;
    text-align: center;
    .message {
        padding: 16px 0;
    }
}
.container {
    display: flex;
    flex-direction: column;

    .detail {
        flex: 1;
    }

    .btn-container {
        background-color: #fff;
        width: 100%;
        padding: 12px;

        .btn {
            width: 100%;
        }
    }
}
.van-cell{
    font-size: var(--font_size_2);

    ::v-deep span {
        line-height: 34px;
    }
    &::after {
        border-bottom: 1px solid #ddd;
    }
}
</style>