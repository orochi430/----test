<template>
<div class="receipt">
    <form-frame title="通知">
        <template slot="default">
            <van-form @submit="onSubmit">
                <van-field input-align="right" type="textarea" rows="2" v-model="text" placeholder="请输入通知标题">
                    <template #label>
                        <span><label class="mast-input">*</label>通知标题：</span>
                    </template>
                </van-field>
                <van-field input-align="right" name="radio">
                    <template #label>
                        <span><label class="mast-input">*</label>通知类型：</span>
                    </template>
                    <template #input>
                        <van-radio-group v-model="radio" direction="horizontal">
                            <van-radio name="1">通知</van-radio>
                            <van-radio name="2">公告</van-radio>
                            <van-radio name="3">其他</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <van-field input-align="right" v-model="text" placeholder="请选择通知范围">
                    <template #label>
                        <span><label class="mast-input">*</label>通知范围：</span>
                    </template>
                </van-field>
                <van-field input-align="right" readonly clickable name="calendar" :value="value" placeholder="点击选择开始日期" @click="showCalendar = true">
                    <template #label>
                        <span><label class="mast-input">*</label>开始日期：</span>
                    </template>
                </van-field>
                 <van-field input-align="right" readonly clickable name="calendar" :value="value" placeholder="点击选择结束日期" @click="showCalendar = true">
                    <template #label>
                        <span><label class="mast-input">*</label>结束日期：</span>
                    </template>
                </van-field>
                <van-calendar v-model="showCalendar" @confirm="onConfirm" first-day-of-week="1"/>
                 <van-field input-align="right" type="textarea" rows="3" v-model="text" placeholder="请输入通知内容">
                    <template #label>
                        <span><label class="mast-input">*</label>通知内容：</span>
                    </template>
                </van-field>
                <van-field input-align="right" name="uploader" label="附件：">
                    <template #input>
                        <van-uploader>
                            上传附件
                        </van-uploader>
                    </template>
                </van-field>
            </van-form>
        </template>
    </form-frame>
</div>
</template>

<script>
import FormFrame from './FormFrame'
export default {
    name: 'Notice',
    components: {
        FormFrame
    },
    data() {
        return {
            showCalendar: false,
            text: "",
            value: '',
            radio: "",
            showPicker: false,
            checkboxGroup: [],
            stepper: 1,
        };
    },
    computed: {},
    watch: {},
    methods: {
        onClickLeft() {
            this.$router.go(-1)
        },
        onSubmit() {

        },
        onConfirm(date) {
            this.value = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            this.showCalendar = false;
        },
        onConfirmJJCD(value) { //紧急程度
            this.jjcd = value;
            this.showPicker = false;
        }
    },
    created() {},
    mounted() {},
    destroyed() {},
}
</script>
