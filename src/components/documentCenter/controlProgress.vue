<template>
<div class="progressContainer">
    <div class="progressItemLeft">
        <van-progress :percentage="controlData.percent" :stroke-width="controlData.strokeWidth" :show-pivot="controlData.showPivot" :pivot-text="controlData.pivotText" />
    </div>
    <div class="progressItemRight">
        剩余{{ controlData.surplus }}天
    </div>
</div>
</template>

<script>
export default {
    name: "controlProgress",
    props: {
        StartTime: {
            type: String,
            default: ''
        }, EndTime: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            controlData: {
                strokeWidth: "10",
                percent: 0,
                color: "#1989fa",
                showPivot: false,
                pivotText: "80",
                surplus: 0
            }
        }
    },
    watch: {},
    created() {
        this.RenderTimer()
    },
    methods: {
        RenderTimer() {
            let today = moment().format('YYYY-MM-DD')
            let num = Number(((new Date(this.EndTime) - new Date(this.StartTime) + 1) / (1000 * 60 * 60 * 24))).toFixed(0) //总天数
            let done = Number(((new Date(today) - new Date(this.StartTime) + 1) / (1000 * 60 * 60 * 24))).toFixed(0) // 已经过天数
            done = done > 0 ? done : 0
            this.controlData.surplus = Number(((new Date(this.EndTime) - new Date(today)) / (1000 * 60 * 60 * 24))).toFixed(0) // 剩余天数
            this.controlData.surplus = this.controlData.surplus > 0 ? this.controlData.surplus : 0
            if (this.controlData.surplus > 0) {
                this.controlData.percent = Number(done / num).toFixed(2) * 100
            } else {
                this.controlData.percent = 100
            }
            // console.log('已经过天数'+ done + ',总天数:'+ num +',剩余天数'+ this.controlData.surplus +',百分比：'+ this.controlData.percent);

        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";

.progressContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    .progressItemLeft {
        height: 20px;
        padding-top: 0.1rem;
        display: inline-block;
        width: 76%;
    }

    .progressItemRight {
        height: 20px;
        display: inline-block;
        width: 20%;
        font-size: var(--font_size_3);
    }

    ::v-deep .van-progress__portion {
        @include background-theme('normal');
    }
}
</style>
