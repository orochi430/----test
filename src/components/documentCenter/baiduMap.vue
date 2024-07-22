<template>
  <div class="box">
    <van-search v-model="value" show-action placeholder="请输入搜索关键词" @search="onSearch">
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>
    <!--局部注册的 BaiduMap 组件必须声明 ak 属性-->
    <baidu-map class="map" ak="3gqRCzNgHHe1uMHGkrYzfv0o" :center="point" :zoom="15" :scroll-wheel-zoom="true">
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
      <bm-marker :position="point" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
      </bm-marker>
      <bm-local-search :keyword="keyword" :auto-viewport="true" :select-first-result="true" :location="point"
        @infohtmlset="infohtmlset"></bm-local-search>
    </baidu-map>
  </div>
</template>

<script>
//所有的独立组件均存放在 vue-baidu-map/components 文件夹下，按需引用即可
import { BaiduMap, BmNavigation, BmGeolocation, BmMarker, BmLocalSearch } from 'vue-baidu-map'
export default {
  name: "Map",
  components: {
    BaiduMap,
    BmNavigation,
    BmGeolocation,
    BmMarker,
    BmLocalSearch
  },
  data() {
    return {
      value: '',
      address: '',
      lat: '',
      lng: '',
      keyword: '',
      point: {
        lat: "31.235929",
        lng: " 121.48054"
      }
    }
  },
  mounted() {
    // addControl.addEventListener("locationSuccess", function(e){ 
    //   that.getAddrByPoint(e) 
    // });
    //单击获取点击的经纬度
    // map.addEventListener("click",function(e){
    //     console.log(e)
    //     // $("#s-point").text(e.point.lng+","+e.point.lat);
    //     var marker = new BMap.Marker(e.point);
    //     map.addOverlay(marker);
    // });
  },
  methods: {
    infohtmlset(LocalResultPoi) {
      this.address = LocalResultPoi.address
      this.lat = LocalResultPoi.point.lat
      this.lng = LocalResultPoi.point.lng
    },
    onSearch() {
      this.keyword = this.value
    },
    getAddrByPoint(point) {
      this.$bus.emit('mapAddress', point);
      let iframeDom = document.getElementsByTagName("iframe")
      for (var i = 0; i < iframeDom.length; i++) {
        if (iframeDom[i] && iframeDom[i].src.indexOf("api.map.baidu.com") > -1) {
          iframeDom[i].remove()
          i--
        }
      }
    },
    getAddress() {
      return {
        address: this.address,
        lat: this.lat,
        lng: this.lng
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  // position: fixed;
  overflow: hidden;
}

.map {
  height: calc(100% - 52px);

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