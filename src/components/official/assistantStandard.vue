<template>
  <div class="box">
    <div class="nav">
      <van-icon name="arrow-left" class="navicon" @click="$router.go(-1)" />
      <p>公务助手</p>
    </div>
    <div class="content">
      <div class="address">
        <p class="adrPeo">江西省省直机关工作人员</p>
        <p class="moneyType">赴外省及其所辖市县出差住宿费标准</p>
      </div>
    </div>
    <div class="chuchai">
      <van-cell @click="showSec('adress')">
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title >
          <span class="custom-title">出差地点</span>
          <span class="custom-content">{{addressTxt}}</span>
        </template>
        <template #right-icon>
          <!-- 年度选择icon -->
          <van-icon name="arrow" class="" />
        </template>
      </van-cell>
    </div>
    <div class="chuchai" @click="showSec('grade')">
      <van-cell >
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title >
          <span class="custom-title">出差人员职级</span>
          <span class="custom-content">{{personTxt}}</span>
        </template>
        <template #right-icon>
          <!-- 年度选择icon -->
          <van-icon name="arrow" class="" />
        </template>
      </van-cell>
    </div>
    <div class="btnBox">
      <van-button size="large" round type="info" @click="searchPrice">查询</van-button>
    </div>
    <van-popup
      :style="{ height: '40vh' }"
      v-model="showPicker"
      :close-on-click-overlay="true"
      lock-scroll
      position="bottom"
    >
      <van-picker
        title="选择"
        show-toolbar
        :columns="showColumns"
        @confirm="pickComfirm"
        @cancel="showPicker=false"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  name:"assistantStandard",
  data(){
    return {
      showPicker:false,
      showColumns:[],
      addressColumns:[],
      gradeColumns:[
        {"text":"部级","grade":0},
        {"text":"司局级","grade":1},
        {"text":"其他人员","grade":2},
      ],
      addressTxt:"请选择",
      personTxt:"请选择",
      showPickerType:"adress",
      travelData:null,
      grade:null
    }
  },
  methods:{
    pickComfirm(value,index){
      console.log(value,index)
      if(this.showPickerType=="adress"){
        console.log(this.addressColumns[index[0]].children[index[1]])
        this.travelData=this.addressColumns[index[0]].children[index[1]]
        this.addressTxt=`${value[0]}-${value[1]}`
      }else{
        this.personTxt=value.text
        this.grade=value.grade
      }
      this.showPicker=false;
    },
    showSec(type){
      this.showPicker=true;
      if(type=="adress"){
        this.showPickerType="adress"
        this.showColumns=this.addressColumns;
      }else{
        this.showPickerType="grade"
        this.showColumns=this.gradeColumns;
      }
    },
    searchPrice(){
      if(this.addressTxt=="请选择"){
        dsf.layer.toast("请选择出差城市")
        return
      }
      if(this.personTxt=="请选择"){
        dsf.layer.toast("请选择人员职级")
        return
      }
      this.$router.push({name:"assistantPrice",params:{
          travelData:this.travelData,
          grade:this.grade,
        }
      })
    },
    init(){
      dsf.http.get("static/assistantAdress.json")
      .then(({data})=>{
        console.log(data)
        this.addressColumns=data
      })
    }
  },
  created(){
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.box{
  width:100%;
  height:100%;
  .nav{
    background:#3d7fff;
    height:45px;
    line-height: 45px;
    color:white;
    text-align: center;
    display: flex;
    align-items: center;
    padding:0 10px;
    p{
      flex:1;
    }
  }
  .content{
    border-bottom:1px solid #e5e5e5;
    .address{
      font-size: var(--font_size_3);
      background: white;
      height:65px;
      display:flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      >p{
        text-align: center;
      }
      .adrPeo{
        width:180px
      }
      .moneyType{
        width:228px;
      }
    }
  }
  .chuchai{
    .custom-title{
      display:inline-block;
      width: 100px;
    }
    .custom-content{
      color:#cecece;
    }
  }
  .btnBox{
    margin-top:20px;
    padding:0 20px;
    text-align: center;
  }
}
</style>