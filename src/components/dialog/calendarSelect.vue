<template>
    <div>
        <van-cell title="选择单个日期" :value="date" @click="show = true" v-show="false"/>
        <van-calendar v-model="show" @confirm="onConfirm" :default-date="defaultDate1" />
    </div>
</template>
<script>
export default {
  name: 'calendarSelect',
  data() {
    return {
      date: '',
      show: false,
      defaultDate:new Date(),
      confirmCallBack: () => { }
    };
  },

  computed:{
    defaultDate1(){
        this.defaultDate.setTime(this.defaultDate.getTime()+14*24*60*60*1000)
        let s1 =  this.defaultDate.getFullYear()+"/" + (this.defaultDate.getMonth()+1) + "/" + this.defaultDate.getDate();
        return new Date(s1)
    }
  },


  methods: {
    formatDate(date) {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
    onConfirm(date) {
      this.show = false;
      this.date = this.formatDate(date);
      this.confirmCallBack(this.date)
    },
  },
};

</script>
<style lang="scss" scoped>

</style>