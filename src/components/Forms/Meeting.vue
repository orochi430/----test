<template>
<div class="receipt">
    <form-frame title="会议">
        <template slot="default">

            <van-form @submit="onSubmit">
                <van-field input-align="right" type="textarea" rows="2" v-model="text" label="*会议标题" placeholder="请输入会议标题">
                    <template #label>
                        <span><label class="mast-input">*</label>会议标题：</span>
                    </template>
                </van-field>
                <van-popup v-model="showPicker" position="bottom" round>
                    <van-datetime-picker type="datetime" @confirm="onConfirm" @cancel="showPicker = false" />
                </van-popup>

                <van-field input-align="right" readonly clickable name="calendar" :value="value" placeholder="点击选择开始时间" @click="showPicker = true">
                    <template #label>
                        <span><label class="mast-input">*</label>开始时间：</span>
                    </template>
                </van-field>
                <van-field input-align="right" readonly clickable name="calendar" :value="value" label="结束时间：" placeholder="点击选择结束时间" @click="showPicker = true">
                    <template #label>
                        <span><label class="mast-input">*</label>结束时间：</span>
                    </template>
                </van-field>
                <van-field input-align="right" name="radio">
                    <template #label>
                        <span><label class="mast-input">*</label>会议地点：</span>
                    </template>
                </van-field>
                <van-field input-align="right" name="radio">
                    <template #label>
                        <span><label class="mast-input">*</label>会议类型：</span>
                    </template>
                    <template #input>
                        <van-radio-group v-model="radio" direction="horizontal">
                            <van-radio name="1">普通会议</van-radio>
                            <van-radio name="2">常务会议</van-radio>
                            <van-radio name="3">党组会议</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>

                <van-field @click="selectUser(0)" readonly input-align="right" v-model="meeting_host" label="会议主持：" placeholder="请选择会议主持：" />
                <van-field @click="selectUser(1)" readonly input-align="right" v-model="meeting_leader" label="参会领导：" placeholder="请选择参会领导：" />
                <van-field @click="selectUser(2)" readonly input-align="right" v-model="meeting_dept" label="参会部门：" placeholder="请选择参会部门：" />
                <van-field @click="selectUser(3)" readonly input-align="right" v-model="meeting_users" label="参会人员：" placeholder="请选择参会人员：" />
                <van-field input-align="right" type="textarea" rows="2" v-model="text" label="备注" placeholder="请输入备注"></van-field>
                <van-field input-align="right" v-model="text" label="联系人：" placeholder="请输入联系人" />
                <van-field input-align="right" name="uploader" label="会议材料：">
                    <template #input>
                        <van-uploader>
                            上传会议材料
                        </van-uploader>
                    </template>
                </van-field>
            </van-form>
        </template>
    </form-frame>
    <div class="select-user" v-if="showDialog">
        <van-nav-bar title="人员选择" @click-right="closeDialog">
            <template #right>
                <van-icon name="cross" />
            </template>
        </van-nav-bar>
        <selectPerson @getSelectUser="getSelectUser" @cancePerson="cancePerson" :type="type"></selectPerson>
    </div>
</div>
</template>

<script>
import FormFrame from './FormFrame'
import selectPerson from '@/components/selectPerson/DsfSelectPerson'
export default {
    name: 'Meeting',
    components: {
        FormFrame,
        selectPerson
    },
    data() {
        return {
            showDialog: true,
            showCalendar: false,
            text: "",
            value: '',
            radio: "",
            showPicker: false,
            cur_index: 0, //0 主持 1 领导 2 部门 ， 3 人员
            type: 0, // 0选人 1选部门
            users: {
                zc: [],
                ld: [],
                bm: [],
                ry: []
            },
            meeting_host: "",
            meeting_leader: "",
            meeting_dept: "",
            meeting_users: ""
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
        onConfirm(time) {
            this.value = time;
            this.showPicker = false;
        },
        closeDialog() {
            this.showDialog = !this.showDialog
        },
        getUserNames(data) {
            var str = ""
            data.forEach((obj, index) => {
                if (str == "") {
                    str = obj.name
                } else {
                    str += "," + obj.name
                }
            })
            return str
        },
        getSelectUser(data) {
            console.log("我的", data)
            if (data.length > 0) {
                if (this.cur_index == 0) {
                    this.meeting_host = this.getUserNames(data)
                } else if (this.cur_index == 1) {
                    this.meeting_leader = this.getUserNames(data)
                } else if (this.cur_index == 2) {
                    this.meeting_dept = this.getUserNames(data)
                } else if (this.cur_index == 3) {
                    this.meeting_users = this.getUserNames(data)
                }
            }
        },
        cancePerson(){
        	this.showDialog = false;
        },
        selectUser(index) {
            this.showDialog = true
            this.cur_index = index
        }
    },
    created() {},
    mounted() {},
    destroyed() {},
}
</script>
