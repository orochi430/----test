<template>
<div>
  <van-sticky :offset-top="dsf.util.getOffsetTop('0')">
    <van-nav-bar
      :title="title"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />

    <div class="amount">
      <div class="hj">合计(元)</div>
      <div class="gz">{{salary.gz}}</div>
    </div>
  </van-sticky>
  <div class="detail" v-for="(value, key) in salary" :key="key">
    <div class="label">{{key}}</div>
    <div class="val">{{value}}</div>
  </div>

</div>
</template>

<script>
export default {
  name: 'salaryDetail',
  props:{
    salary:{
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {

    }
  },
  computed:{
    title(){
      return `${this.salary.year}${this.salary.month}月份工资`
    }
  },
  updated(){

  },
  methods:{
    onClickLeft(){
      this.$emit('close')
    }
  }
}
</script>
<style lang='scss' scoped>
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";
.amount{
  padding: 30px 0;
  text-align: center;
  color: #fff;
  .hj{
    font-weight: lighter;
  }
  @include background-theme('normal');
  .gz{
    font-size: 28px;
  }
}
.detail{
  display: flex;
  justify-content: space-between;
  margin: 10px 20px;
  padding: 10px 0;
  border-bottom: 1px solid #dddddd;
}
</style>
