<template>
  <div class="box">
    <van-button @click="showMap()">调用地图插件</van-button>
    <div>{{result}}</div>
  </div>
</template>

<script>
import exclusiveInvoke from "gdt-jsapi/exclusiveInvoke"
export default {
  name:"baiduMap",
  data(){
    return {
      result: ''
    }
  },
  mounted(){
    
  },
  methods:{
    showMap() {
      if(window.dd) {
        exclusiveInvoke({
          api: 'location.get'
        }).then(res => {
          console.log('invoke done')
          console.log(res)
          this.result = res
        }).catch(err => {
          console.log('invoke error')
          console.log(JSON.stringify(err))
        })
      }else {
        dsf.layer.toast('未调用到钉钉定位')
      }
    }
  }
  
}
</script>

<style lang="scss" scoped>
  .box{
    width:100%;
    height:100%;
    // position: fixed;
    overflow: hidden;
  }
  #container{
    height:calc(100% - 52px);
    ::v-deep a {
      display: none;
    }
    ::v-deep .BMap_Marker {
      img {
        max-width: inherit;
      }
    }
    
  }
</style><style lang="scss">

// .BMap_cpyCtrl {
//     display: none;
// }
// .anchorBL {
//   img{
//     display: none;
//   }
    
// }
</style>