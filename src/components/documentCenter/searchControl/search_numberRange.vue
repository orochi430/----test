<template>
  <div class="itemSheet">
          <p>{{metaData.title}}</p>
          <div class="dateRange disfr ac">
            <van-field type="number" v-model="startNum"  placeholder="起始" />
            <div class="line"></div>
            <van-field type="number" v-model="endNum" placeholder="结束" />
          </div>
        </div>
</template>

<script>
export default {
  props:["metaData"],
  data(){
    return{
      startNum:"",
      endNum:"",
    }
  },
  watch: {
    startNum(){
      this.metaData.value=`${this.startNum}-${this.endNum}`
    },
    endNum(){
      this.metaData.value=`${this.startNum}-${this.endNum}`
    }
  },
  created(){
    this.metaData.startNum=""
    this.metaData.endNum=""
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
    font-size: var(--font_size_3);
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
</style><style lang="scss">

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

  .selectSearch{
    display:flex;
    flex-direction: column;
    .van-action-sheet__content{
      flex:1;
      overflow-y:auto;
      padding:0 15px;
      .van-checkbox{
        margin:15px 0;
      }
    }
  }
</style>

