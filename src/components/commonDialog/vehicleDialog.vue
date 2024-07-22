<template>
  <div class="vehicleDialog">
    <!-- 凉山州车牌号弹窗组件 -->
    <van-popup  v-model="shows"  round  position="bottom"  @close="close">
    
     <van-nav-bar   
      left-text="取消"
      right-text="完成"
      @click-left="closes"
      @click-right="finish"
      >
     </van-nav-bar>
     
     <Key-box v-model="NebValue" :form-data="formData"></Key-box>
    </van-popup>
  </div>
</template>

<script>
import dsf from '../../common';
import KeyBox from '../project/LianShan/KeyBox.vue';
export default {
  name: "vehicleDialog",
  // :form-data="formData"
  props:['formData'],
  components : {
    "Key-box": KeyBox
  },
  data() {
    return {
      shows: true,
      NebValue:'川',
      newValue:'',
      Nems:this.formData  ,
      oldValue:''
    }
  },
  created() {},
  mounted() {
   
  },
  computed: {},
  watch: {
    NebValue(newName){
        this.newValue = newName;
    },
  },
  methods: {
    // 关闭
    close() {
      if(this.newValue.length > 6) {
        this.$emit("closeCallback",this.Nems.main.B0001.value);
      }else{
        this.$emit("closeCallback","")
      }
    },
    closes(){
      this.shows = false
    },
    // 发送
    finish(){
      let re = /[\u4E00-\u9FA5]/g;  //判断第一位是否为汉字
      let res = /^[A-Z]+$/          //判断第二位受否位大写字母
      let str = this.newValue.charAt(0);
      let strs = this.newValue.charAt(1);

      if(re.test(str) && res.test(strs) && this.newValue.length > 6){
        this.shows = false
        this.$emit("closeCallback",String(this.newValue));
      }else{
        this.shows = true;
        dsf.layer.toast('请输入正确车牌')
      }
      
    },
  },
};
</script>

<style lang='scss' scoped>
</style>