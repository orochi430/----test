<template>
  <div class="box">
    <div class="itemSheet">
      <p>{{metaData.title}}</p>
      <div class="disfr ac" style="padding:10px 0;">
        <div class="peopleSec disfr ac flex1" @click="showPicker=!showPicker">
            <span v-if="nowSeclect">{{nowSeclect.text}}</span>
        </div>
        <van-button @click="showPicker=!showPicker" style="margin-left:10px;" size="small" type="default">选择</van-button>
      </div>
    </div>
    <van-popup get-container="#app" v-model="showPicker" position="bottom" round>
      <van-picker
        :title="metaData.title"
        show-toolbar
        :columns="selectColumns"
        @confirm="changeFn"
        @cancel="showPicker = false"
      />
      <!-- <van-radio-group v-model="radio">
        <van-radio :name="item.value" v-for="(item,index) in selectColumns" :key="index" @click="changeFn(item)" style="margin-bottom: 0.3rem">{{item.text}}</van-radio>
      </van-radio-group> -->
    </van-popup>
  </div>
</template>

<script>
export default {
  props:["metaData"],
  data(){
    return{
      radio: '',
      showPicker:false,
      nowSeclect: null,
      selectColumns: [],
    }
  },
  watch:{
    "metaData.selectData": {
      handler(newVal){
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
            if (item.value == val) {
              this.metaData.text=item.text
              item.checked = true
              this.nowSeclect = item
            }
          })
        }else {
          this.nowSeclect = null
        }
      },
      immediate: true
    }
  },
  created(){
    // this.init()
  },

  methods:{
    closeSeclect(data){
      this.selectColumns.forEach(item=>{
        item.value==data.value?item.checked=false:""
      })
      this.metaData.value=this.selectColumns.filter(item=>item.checked).map(item=>item.value).join(",")
    },
    changeFn(data){
      console.log(data)
      //检索的单选按钮选中后抛出事件
      this.$bus.emit("searchRadioSelectBus", {
        ...data,
        metaData: this.metaData
      })

      this.metaData.text=data.text
      this.metaData.value=data.value
      this.nowSeclect = data
      this.showPicker = false
    },
  },
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










