<template>
  <div class="itemSheet">
    <p>{{metaData.title}}</p>
    <van-field v-model="searchValue" placeholder="请输入关键字" />
  </div>
</template>

<script>
export default {
  props:["metaData"],
  watch: {
    searchValue(){
      this.metaData.value=this.searchValue
    },
    metaData:{
      handler(val){
        if(val.value==""){
          this.searchValue=""
        } else {
          this.searchValue=val.value
        }
      },
      deep:true,
      immediate: true
    }
  },
  data(){
    return{
      searchValue:"",
    }
  },
  created(){
    if(this.metaData.defaultValue){
      this.searchValue=this.metaData.defaultValue
    }
  }
}
</script>

<style lang="scss" scoped>
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
      background: #e5e5e5;
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
    background-color: rgb(235, 239, 245);
    border-radius: 5px;
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
</style>
<style lang="scss">

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
</style>
