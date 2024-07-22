<template>
<div class="updateStatus">
    <van-radio-group v-model="radio" direction="horizontal" @change="changeRadio">
        <van-radio name="1" checked-color="#1064CD">进行中</van-radio>
        <van-radio name="2" checked-color="#1064CD">中止任务</van-radio>
        <van-radio name="3" checked-color="#1064CD">整体完成</van-radio>
    </van-radio-group>
    <div :class="{'area':true,'appArea':isApp}">
        <div class="words">
            <van-field v-model="message" rows="5" autosize type="textarea" maxlength="350" placeholder="请输入情况说明" show-word-limit />
        </div>
        <van-button type="info" size="small" @click="submitUpdate" color="#1064CD">确认更新</van-button>
    </div>
</div>
</template>

<script>
import Vue from 'vue';
import {
    Slider
} from 'vant';

Vue.use(Slider);
export default {
    name: 'updateStatus',
    components: {},
    props: {
        taskId: {
            type: String,
            default: ''
        },
        isApp: {
            type: Boolean,
            default: false
        },
        taskStatus: {
            type: String,
            default: '1'
        }
    },
    data() {
        return {
            message: "", //情况说明
            radioText: '进行中',
            radio: "1",
            subStatus: false
        };
    },
    computed: {

    },
    watch: {

    },
    methods: {
        changeRadio(name) {
            if (name == '3') {
                this.radioText = '已完成';
            } else if (name == '2') {
                this.radioText = '已中止';
            } else if (name == '1') {
                this.radioText = '进行中';
            }
        },
        submitUpdate() {
            let that = this;
            let postdata = {
                taskId: this.taskId, //任务id
                taskStatus: this.radio, //任务状态(1:进行中，2:已中止, 3:已完成)
                taskStatusText: this.radioText, //任务状态文本(进行中，已中止, 已完成)
                taskDesc: this.message, //进展说明
            };
            if (this.radio == '2' && !this.message) {
                dsf.layer.toast('请输入情况说明！');
            } else {
                if (this.subStatus) {
                    return
                }
                this.subStatus = true
                this.$toast.loading({
                    message: "提交中...",
                    forbidClick: true,
                    duration: 0,
                    overlay: true,
                });
                dsf.http.post("/ctrl/taskman/task/updateStatus?timer=" + new Date().getTime(), postdata).then(res => {
                    this.subStatus = false
                    if (res && res.data.code == 200) {
                        this.$toast.clear()
                        dsf.layer.toast('更新状态成功！');
                        that.$emit('updateStatus')
                    } else {
                        dsf.layer.toast('更新状态失败！');
                    }
                    that.message = '';
                    that.radio = "1";
                    that.radioText = '进行中';
                })
            }
        }
    },
    created() {

    },
    mounted() {
        console.log(this.taskStatus)

        this.radio = this.taskStatus
        this.changeRadio(this.radio)

    },
    destroyed() {},
}
</script>

<style lang="scss" scoped>
.updateStatus {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    padding: 20px;
    // margin-top: 60px;

    .van-radio-group {
        display: flex;
        justify-content: space-between;
    }

    .percent {
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .van-slider {
            flex: 1;
            margin-right: 20px;
        }

        &>span {
            font-size: var(--font_size_3);
            color: #0091FF;
        }
    }

    .area {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-end;

        .words {
            border: 1PX solid #ebebeb;
            border-radius: 10px;
            width: 100%;
            height: auto;
            overflow: hidden;
        }

        .van-field {}

        .van-button {
            margin-top: 20px;
        }
    }

    .appArea {
        align-items: normal;
    }
}
</style>
