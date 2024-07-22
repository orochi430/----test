<template>
  <div>
    <dataViewPanel :itemdata="itemdata"></dataViewPanel>
  </div>
</template>

<script>
import dataViewPanel from "@/components/project/zhenhuaIndustry/components/dataViewPanel.vue"
export default {
  name: "ZhzgMobileDataViewPanelComponents",
  props:['itemdata'],
  components: {
    dataViewPanel
  },
  mounted(){
    console.log("看板数据父组件",this.itemdata)
  }

}
</script>

<style lamg="scss" scoped></style>