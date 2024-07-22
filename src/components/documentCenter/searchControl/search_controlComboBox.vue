<template>
  <div class="box">
    <div class="itemSheet">
      <p>{{metaData.title}}</p>
      <div class="disfr ac" style="padding:10px 0;">
        <div class="peopleSec disfr ac flex1" @click="showPicker=!showPicker">
          <van-tag
            closeable
            size="large"
            type="primary"
            @close="closeSeclect(item,index)"
            v-for="(item,index) in nowSeclect"
            :key="index"
          >
            {{item.text}}
          </van-tag>
          &nbsp;&nbsp;
        </div>
        <van-button @click="showPicker=!showPicker" style="margin-left:10px;" size="small" type="default">选择</van-button>
      </div>
    </div>
    <!-- <van-action-sheet :get-container="getContainer" v-model="showPicker" title="选项" class="selectSearch" style="height:500px;">
      <van-checkbox v-model="item.checked" v-for="(item,index) in selectColumns" :key="index" @click="changeFn(item)">{{item.text}}</van-checkbox>
    </van-action-sheet> -->
    <van-popup get-container="#app" v-model="showPicker" position="bottom" round style="height:50%;" class="selectSearch">
      <van-nav-bar :title="metaData.title" left-text="取消" right-text="确认" @click-left="showPicker = !showPicker" @click-right="showPicker = !showPicker" placeholder />
      <div class="checkbox">
        <van-checkbox v-model="item.checked" v-for="(item,index) in selectColumns" :key="index" @click="changeFn(item)">{{item.text}}</van-checkbox>
      </div>
      <!-- <div class="tags">
        <van-col span="6" v-for="(item,index) in selectColumns" :key="index">
          <van-tag size="large" type="primary" @click="changeFn(item)" :color="!item.checked ? '#f5f5f5' : ''">{{item.text}}</van-tag>
        </van-col>
      </div> -->
    </van-popup>
  </div>
</template>

<script>
export default {
  props:["metaData"],
  data(){
    return{
      showPicker:false,
      selectColumns: [
      ],
    }
  },
  // created(){
  //   this.init()
  // },
  watch: {
    "metaData.selectData":{
      handler(newVal) {
        let data = newVal
        data.forEach((item)=>{
          item.checked=false
        })
        this.selectColumns=JSON.parse(JSON.stringify(data))
      },
      immediate: true
    },
    'metaData.value':{
      handler(val){
        if(val != ''){
          this.selectColumns.forEach(item => {
            if (val.split(",").includes(item.value)) {
              item.checked = true
            }
          })
        }
      },
      immediate: true
    }
  },
  methods:{
    closeSeclect(data){
      this.selectColumns.forEach(item=>{
        item.value==data.value?item.checked=false:""
      })
      this.metaData.value=this.selectColumns.filter(item=>item.checked).map(item=>item.value).join(",")
      this.$bus.emit("checkSearchVal", this.metaData);
    },
    changeFn(data){
      this.metaData.value=this.selectColumns.filter(item=>item.checked).map(item=>item.value).join(",")
      console.log(this.metaData.value)
      this.$bus.emit("checkSearchVal", this.metaData);
    },
  },
  computed:{
    nowSeclect(){
      return this.selectColumns.filter(item=>item.checked)
    }
  }
}
</script>

<style lang="scss" scoped>
.box{
  font-size: var(--font_size_2);
  .itemSheet{
    font-size: var(--font_size_2);
  }
  .disfr {
    display: flex;
  }
  .fc {
    display: flex;
    flex-direction: column;
  }
  .ac {
    align-items: center;
  }
  .jsb {
    justify-content: space-between;
  }
  .jc {
    justify-content: center;
  }
  .flex1{
    flex:1;
  }
  .sheetBox {
    padding: 15px;
    font-size: var(--font_size_2);
    .van-cell__value {
      height: 24px;
      // background: #e5e5e5;
    }

    .dateRange {
      .line {
        width: 20px;
        height: 1px;
        background: #cecece;
        margin: 0 15px;
      }
    }
  }
  .btnBox {
    padding:15px;
  }
  .peopleSec{
    height:36px;
    padding-left:10px;
    // background-color: rgb(235, 239, 245);
    border: 1px solid #ebedf0;
    border-radius: 2px;
    overflow-x:scroll;
    overflow-y: hidden;
    .secItem{
      padding:4px 10px;
      margin:0 4px;
      white-space:nowrap;
      background:white;
      border-radius:18px;
    }
  }

}
.selectSearch{
    display:flex;
    flex-direction: column;
    .checkbox{
      flex: 1;
      overflow: auto;
      .van-checkbox{
        margin: 10px 16px;
        font-size: var(--font_size_2);
      }
    }
  }
</style>
<style lang="scss">
.box {
  // font-size: var(--font_size_0);
  // .van-overlay,.van-popup--top{
  //   top:60px;
  // }
  .searchSheet{
    height:500px;
    .van-action-sheet__content{
      height:100%;
    }
  }
  .sheetBox {
    overflow-y:auto;
    .van-cell {
      padding: 10px 0;
    }

    .van-field__body {
      border-radius: 2px;
      overflow: hidden;
    }
    .van-field__control {
      height: 36px;
      border: 1px solid #ebedf0;
      border-radius: 2px;
      padding-left: 10px;
    }
    .peopleSec{
      span{
        margin:0 5px;
        white-space:nowrap;
      }
    }
    .peopleSec + .van-button{
        height:36px;
    }

  }
  .btnBox{
    .van-button--normal {
      padding: 0 40px;
    }
  }


}
</style>










