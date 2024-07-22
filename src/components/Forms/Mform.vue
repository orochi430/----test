<template>
  <div class="receipt">
    <div class="form-frame">
      <div class="form-contain">
        <van-form @submit="onSubmit">
          <van-field label="会议" input-align="right" type="textarea" rows="2" v-model="text" placeholder="请输入会议标题">
            <template #left-icon>
              <i class="iconfont iconshijian"></i>
            </template>
          </van-field>
          <van-cell class="borderBm" title="全天" icon="clock-o">
            <template #right-icon>
              <van-switch v-model="checked" size="24" @change="switchChange" />
            </template>
          </van-cell>
          <div class="date">
            <div class="start-date" @click="showCalendar = true">
              <div v-if="sdate1">
                <span>{{sdate1}}</span>
                <span>{{sdate2}}</span>
              </div>
              <div v-else>
                <span>开始日期</span>
              </div>
            </div>
            <div class="end-date" @click="showCalendar1 = true">
              <div v-if="edate1">
                <span>{{edate1}}</span>
                <span>{{edate2}}</span>
              </div>
              <div v-else>
                <span>结束日期</span>
              </div>
            </div>
          </div>
          <van-field input-align="right" left-icon="location-o" v-model="text" placeholder="请输入地址信息" label="地址：">
          </van-field>
          <van-field input-align="right" clearable left-icon="location-o" v-model="text" placeholder="请输入会议室信息"
            label="会议室："></van-field>
          <van-calendar v-model="showCalendar" @confirm="onConfirm" first-day-of-week="1"/>
          <van-calendar v-model="showCalendar1" @confirm="onConfirm1" first-day-of-week="1"/>
          <van-cell title="选人" icon="shop-o" @click="choosePeople">
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
            <template #right-icon>
              <van-icon name="arrow" style="line-height: inherit;" />
            </template>
            <template #icon>
              <i class="iconfont iconfasongren" style="margin-right: 5px;"></i>
            </template>
          </van-cell>
          <van-cell title="15分钟前,应用内提醒" icon="shop-o" @click="tipsSetting">
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
            <template #right-icon>
              <van-icon name="arrow" style="line-height: inherit;" />
            </template>
            <template #icon>
              <i class="iconfont icontongzhi" style="margin-right: 5px;"></i>
            </template>
          </van-cell>
          <div class="submit">
            <van-button square block type="info" native-type="submit">提交</van-button>
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Mform',
    data() {
      return {
        showCalendar: false,
        showCalendar1: false,
        text: "",
        value: '',
        sdate1: '', //开始时间
        sdate2: '', //开始时间
        edate1: '', //结束时间
        edate2: '', //结束时间
        radio: "",
        showPicker: false,
        checked: true
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
      formatDate(date, type) {
        let month = date.getMonth() + 1;
        month = month < 10 ? '0' + month : month;
        let day = date.getDate();
        day = day < 10 ? '0' + day : day;
        let hour = date.getHours();
        hour = hour < 10 ? '0' + hour : hour;
        let minute = date.getMinutes();
        minute = minute < 10 ? '0' + minute : minute;
        let week = date.getDay();
        let weeks = ["日", "一", "二", "三", "四", "五", "六"];
        let getWeek = "周" + weeks[week];
        if (type == 0) {
          return `${month}-${day}   ${getWeek}`;
        } else {
          return `${hour}:${minute}`;
        }
      },
      onConfirm(date) {
        this.showCalendar = false;
        this.sdate1 = this.formatDate(date, 0);
        this.sdate2 = this.formatDate(date, 1);
      },
      onConfirm1(date) {
        this.showCalendar1 = false;
        this.edate1 = this.formatDate(date, 0);
        this.edate2 = this.formatDate(date, 1);
      },
      choosePeople() {
        console.log("选人控件")
      },
      tipsSetting() {
        console.log("提醒设置")
      },
      switchChange(value) {
        console.log(value)
      }
    },
    created() {},
    mounted() {},
    destroyed() {},
  }

</script>

<style scoped>
  .borderBm {
    border-bottom: 1px solid #f2f2f2;
  }

  .date {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    width: 100%;
    min-height: 1.2rem;
    padding: 10px 16px;
    overflow: hidden;
    color: #323233;
    font-size: var(--font_size_3);
    line-height: 24px;
    background-color: #fff;
  }

  .date span {
    display: block;
    line-height: 24px;
  }

  .submit {
    position: fixed;
    bottom: 10px;
    width: 100%;
    height: 65px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .van-button {
    width: 90%;
    border-radius: 3px;
    font-size: var(--font_size_1);
  }

</style>
