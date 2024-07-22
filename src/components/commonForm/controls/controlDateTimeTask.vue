<template>
<div class="controlDateTimeBox" v-if="!readonly || (readonly && !!value.value)">
    <van-popup v-model="show" position="bottom" round get-container="#app" :style="{ height: '500px' }">
        <van-calendar :poppable="false" :type='controlData.type' :title='controlData.title' :default-date="controlData.defaultDate" :show-mark='controlData.showMark' :show-confirm="controlData.showConfirm" :color='controlData.color' :min-date='controlData.minDate' :max-date='controlData.maxDate' :confirm-text='controlData.confirmText' :confirm-disabled-text='controlData.confirmDisText' :formatter="formatter" :position='controlData.position' :max-range="controlData.maxRange" :round='controlData.round' :range-prompt='controlData.rangePrompt' :allow-same-day='controlData.allowSameDay' ref='calendarRef' @confirm="onConfirm" first-day-of-week="1">
            <template #footer>
                <slot name="footer"></slot>
            </template>
            <template #title>
                <div style="padding:0 15px;text-align:left;height:80px">
                    <div class="btnleft">
                        <van-button round size="mini" type="primary" @click="scrollDate">年月选择</van-button>
                    </div>
                    <div class="btnright">
                        <van-button round size="mini" type="primary" @click="clearDate">清空日期</van-button>
                    </div>
                </div>
            </template>
        </van-calendar>
    </van-popup>
    <!-- <van-field :readonly='true' :placeholder="controlData.placeholder" v-model="showValue"
            :input-align='controlData.inputAlign' :rules="controlData.rules" @click='inClickFn'
            :name="metaData && metaData.metaId ? metaData.metaId : ''" /> -->
    <van-popup v-model="showPicker" position="bottom" round get-container="#app">
        <van-datetime-picker v-model="currentTime" @confirm="confirmDate" @cancel="showPicker = !showPicker" type="time" title="选择时间" :min-hour="0" :max-hour="23" />
    </van-popup>
    <van-popup v-model="timePop" style="width:80%;" get-container="#app" round>
        <van-datetime-picker v-model="currentDate" @confirm="confirmTime" @cancel="cancelTime" type="year-month" title="选择年月" :min-date="minDate" :max-date="maxDate" />
    </van-popup>

</div>
</template>

<script>
import propMixin from "./mixin";

export default {
    name: 'controlDateTime',
    mixins: [propMixin],
    model: {
        prop: 'value',
        event: 'input'
    },
    props: {
        subFormIndex: {
            type: Number,
            default: null
        }
    },
    computed: {
        showValue() {
            if (this.metaData.format) {
                return this.changeFormat(this.value.value)
            }
            return this.value.value
        }
    },
    watch: {
        value(n) {
            console.log(n)
        }
    },
    data() {
        return {
            show: false,
            controlData: {
                defaultDate: new Date(),
                inputAlign: 'right',
                rules: [],
                type: 'single', //multiple,range,single 时间控件类型，单选，多选，阶段
                title: '日期选择', //控件标题
                placeholder: '时间选择',
                color: '', //控件选中颜色
                minDate: new Date(new Date().getFullYear() - 5, 0, 1), //可选择的最小日期
                maxDate: new Date(new Date().getFullYear() + 5, 11, 31), //可选择的最大日期
                confirmText: '确定', //确认按钮的文字
                confirmDisText: '请选择', //确认按钮处于禁用状态时的文字
                position: 'bottom',
                maxRange: '5', //	日期区间最多可选天数
                showMark: true, //水印背景是否显示
                showConfirm: true, //是否展示确认按钮
                round: true,
                rangePrompt: '超出可选范围', //范围选择超过最多可选天数时的提示文案
                allowSameDay: true, //范围起止同一天
                arrFormatter: [ //过滤时间数组

                ]
            },
            successValue: this.value,
            showPicker: false,
            currentTime: "",
            nowTime: "",
            allowHours: true,
            currentDate: new Date(),
            timePop: false,
            minDate: new Date(new Date().getFullYear() - 100, 0, 1),
            maxDate: new Date(new Date().getFullYear() + 10, 11, 31)
        }
    },
    mounted() {
        if (this.metaData.extra && this.metaData.extra.minDate) this.controlData.minDate = this.metaData.extra.minDate
        if (this.metaData.extra && this.metaData.extra.maxDate) this.controlData.maxDate = this.metaData.extra.maxDate
        this.controlData.type = this.metaData.DateType ? this.metaData.DateType : 'single'
        if (JSON.stringify(this.metaData.defaultValue) == '{}') {} else {
            if (!this.value.value) { //加载默认值
                let defaultValue = this.metaData.defaultValue
                let checkObj = this.value
                checkObj.value = defaultValue.value
                this.$emit("input", checkObj)
            }
        }

        if (!this.metaData.format) {
            this.allowHours = false
        } else if (this.metaData.format) {
            if (this.metaData.format.indexOf("HH") > -1) { //如何格式化带HH就是有时分的需要显示选择时分
                this.allowHours = true
            } else {
                this.allowHours = false
            }
        }

        if (this.$route.params.moduleId == "200921170218dMlK5UVnsi1jkA5F35N") { //督办的时间控件 不选择时分
            this.allowHours = false
        }
        if (this.$route.params.moduleId == "2011251622514OfwWKislZu9g54F3LS") { //外出报备 不选择时分
            this.allowHours = false
        }
        if (this.$route.params.moduleId == "201125171531HhP41e8lrLw0T7kuFXK") { //假日带班 不选择时分
            this.allowHours = false
        }
    },
    methods: {
        changeFormat(date) {
            let tempFormat = this.metaData.format.indexOf("|") > -1 ? this.metaData.format.split('|')[1] : this.metaData.format
            if (tempFormat.indexOf("mm") > -1) {
                tempFormat = tempFormat.replace("mm", "ii")
            }
            if (tempFormat.indexOf("HH") > -1) {
                tempFormat = tempFormat.replace("HH", "hh")
            }
            if (tempFormat.indexOf("MM") > -1) {
                tempFormat = tempFormat.replace("MM", "mm")
            }
            return dsf.date.format(date, tempFormat)
        },
        confirmTime() {
            console.log(this.currentDate)
            this.timePop = false
            if (this.metaData.format == "yyyy" || this.metaData.format == "yyyy-MM") {
                var obj = this.value
                obj.value = dsf.date.format(this.currentDate, 'yyyy-mm-dd')
                this.$bus.emit('selectDateTime', {
                    ...obj,
                    metaData: this.metaData,
                    subFormIndex: this.subFormIndex
                });
                this.$emit('confirm', obj)
            } else {
                if (this.currentDate < new Date()) {
                    this.controlData.minDate = new Date(this.currentDate.getFullYear() - 5, 0, 1)
                } else {
                    this.controlData.maxDate = new Date(this.currentDate.getFullYear() + 5, 0, 1)
                }
                this.$nextTick(() => {
                    this.$refs.calendarRef.scrollToDate(this.currentDate)
                })
            }
        },
        cancelTime() {
            this.timePop = false
        },
        scrollDate() {
            this.timePop = true
            // this.$refs.calender.scrollToDate(new Date("2021-02"))
        },
        clearDate() {
            this.value.value = ""
            this.timePop = false
            this.showPicker = false
            this.show = false
        },
        formatDate(date) {
            return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        },
        formatter(day, arr = this.controlData.arrFormatter) {
            const month = day.date.getMonth() + 1;
            const date = day.date.getDate();
            if (arr) {
                arr.forEach((item, index) => {
                    if (month == item.month && date == item.date) {
                        item.topInfo ? day.topInfo = item.topInfo : ''
                        item.text ? day.text = item.text : ''
                        item.bottomInfo ? day.bottomInfo = item.bottomInfo : ''
                        item.type ? day.type = item.type : ''
                    }
                })
            }
            return day;
        },
        onConfirm(date) {
            if (this.controlData.type == 'single' || this.controlData.type == '') {
                date = dsf.date.format(date, 'yyyy-mm-dd')
                console.log(date)
                if (this.allowHours) {
                    this.nowTime = date
                    this.showPicker = true
                } else {
                    this.show = !this.show
                    var obj = this.value
                    obj.value = date
                    this.$bus.emit('selectDateTime', {
                        ...obj,
                        metaData: this.metaData,
                        subFormIndex: this.subFormIndex
                    });
                    this.$emit('confirm', obj)
                }
            } else {
                date = date.map((item, index) => {
                    return dsf.date.format(date, 'yyyy-mm-dd')
                })
                obj.value = date.join()
            }
        },
        confirmDate(time) {
            var obj = this.value
            obj.value = this.nowTime += " " + time
            console.log(time)
            this.showPicker = false
            this.show = false
            this.$bus.emit('selectDateTime', {
                ...obj,
                metaData: this.metaData,
                subFormIndex: this.subFormIndex
            });
            this.$emit('confirm', obj)
        },
        resetFn() { //重置选中的日期到默认值
            this.$refs.calendarRef.reset()
        },
        closeFn() {

        },
        inClickFn() {
            if (this.value && this.value.value) {
                this.nowTime = this.value.value
                this.currentTime = moment(new Date(this.value.value)).format("HH:mm")
            }
            if (!this.metaData.privilege.editable) return
            if (this.showValue) this.controlData.defaultDate = new Date(this.showValue)
            if (this.metaData.format == "yyyy" || this.metaData.format == "yyyy-MM") {
                this.timePop = !this.timePop
            } else {
                this.show = !this.show
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.controlDateTimeBox {
    width: 100%;

}

::v-deep .btnleft {
    float: left;
}

::v-deep .btnright {
    float: right;
}
</style><style lang="scss">
.controlDateTimeBox .van-field__error-message {
    text-align: right;
}
</style>
