<template>
<div class="myRecode">
    <van-radio-group v-model="radio" direction="horizontal" @change="changeRadio">
        <van-radio name="2" checked-color="#1064CD">推进中</van-radio>
        <van-radio name="3" checked-color="#EB6A0E">有困难</van-radio>
        <van-radio name="4" checked-color="#14C154">已完成</van-radio>
    </van-radio-group>
    <div :class="['percent',radio=='2' ?'tjz':(radio=='3' ?'ykn':'ywc')]">
        <!-- <van-slider v-model="value" @change="onChange" bar-height="10px" :active-color="radio=='2'?'#1064CD':(radio == '3'?'#EB6A0E':'#14C154')" /> -->
        <el-slider v-model="value" :format-tooltip="formatTooltip" @change="onChange"></el-slider>
        <span :style="{'color':(radio=='2'?'#1064CD':(radio == '3'?'#EB6A0E':'#14C154'))}">{{value}}%</span>
    </div>
    <div :class="{'area':true,'appArea':isApp}">
        <div class="words">
            <van-field v-model="message" rows="5" autosize type="textarea" maxlength="350" placeholder="请输入说明" show-word-limit />
        </div>
        <van-button type="info" size="small" @click="submitProgress" color="#1064CD">确认更新</van-button>
    </div>

</div>
</template>

<script>
import Vue from 'vue';
// import {
//     Slider
// } from 'vant';
import {
    Slider
} from 'element-ui';

Vue.use(Slider);
export default {
    name: 'myRecode',
    components: {},
    props: {
        taskId: {
            type: String,
            default: ''
        },
        myProgress: {
            type: Object,
            default: () => {}
        },
        isApp: {
            type: Boolean,
            default: false
        },
        userProportion: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {
            value: 0, //进展百分比
            message: "", //进展说明
            radio: "2", //进展状态（1：未查看，2：推进中，3:有困难，4:已完成）
            radioText: '推进中',
            subStatus: false
        };
    },
    computed: {},
    watch: {},
    methods: {
        onChange(value) {
            console.log('当前值：' + value);
            if (value == 100) {
                this.radio = '4'; //当进度条拖动到100%时状态自动变成已完成
            } else {
                if (this.radio == '4')
                    this.radio = '2'; //当从已完成拖动到未到100%时，状态变为推进中
            }
        },
        changeRadio(name) {
            if (name == '4') {
                //已完成 进度条自动百分百
                this.value = 100;
                this.radioText = '已完成';
            } else if (name == '3') {
                this.radioText = '有困难';
            } else if (name == '2') {
                this.radioText = '推进中';
            }
        },
        submitProgress() {
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
            let that = this;
            let postdata = {
                taskId: this.taskId, //任务id
                progressState: this.radio, //推进状态（1：未查看，2：推进中，3:有困难，4:已完成）
                progressStateText: this.radioText, //推进状态文本（未查看，推进中，有困难，已完成）
                percentage: this.value, //进展百分比
                desc: this.message, //进展说明
            };
            dsf.http.post("/ctrl/taskman/collaborate/updateProgress?timer=" + new Date().getTime(), postdata).then(res => {
                this.subStatus = false
                if (res && res.data.code == 200) {
                    this.$toast.clear()
                    dsf.layer.toast('个人进展更新成功！');
                    that.message = '';
                    that.$emit('updateProgress')
                } else {
                    this.$toast.clear()
                    dsf.layer.toast('个人进展更新失败！');
                }
            })
        },
        formatTooltip(val) {
            return "推进至" + val + '%，占总任务的' + Math.round(val * this.userProportion) + '%';
        }
    },
    created() {

    },
    mounted() {
        this.value = this.myProgress['percentage'] ? this.myProgress['percentage'] : 0;
        this.radio = this.myProgress['progressState'] ? JSON.stringify(this.myProgress['progressState']) : '';
        this.radioText = this.myProgress['progressStateText'] ? this.myProgress['progressStateText'] : '';
    },
    destroyed() {},
}
</script>

<style lang="scss" scoped>
.myRecode {
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
        width: 100%;
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .van-slider {
            flex: 1;
            margin-right: 20px;
        }

        .el-slider {
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

::v-deep.myRecode .el-slider__runway {
    height: 10px;
    border-radius: 5px;

}

::v-deep.myRecode .el-slider__bar {
    height: 10px;
    border-radius: 5px;
}

::v-deep.myRecode .tjz .el-slider__bar {
    background-color: #1064CD;
}

::v-deep.myRecode .ykn .el-slider__bar {
    background-color: #EB6A0E;
}

::v-deep.myRecode .ywc .el-slider__bar {
    background-color: #14C154;
}

::v-deep.myRecode .el-slider__button-wrapper {
    top: -13px;
}

::v-deep.myRecode .el-slider__button {
    width: 18px;
    height: 18px;
}

::v-deep.myRecode .tjz .el-slider__button {
    border: 2PX solid #1064CD;
}

::v-deep.myRecode .ykn .el-slider__button {
    border: 2PX solid #EB6A0E;
}

::v-deep.myRecode .ywc .el-slider__button {
    border: 2PX solid#14C154;
}
</style>
