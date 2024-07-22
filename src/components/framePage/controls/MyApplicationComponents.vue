<template>
  <application-center :itemdata="myItemData"></application-center>
</template>

<script>
import ApplicationCenter from "@/components/applicationCenter/index";

export default {
    name: "MyApplicationComponents",
    props: ['itemdata'],
    components: {ApplicationCenter},
    data() {
      return {
        myItemData: this.itemdata
      }
    },
  created() {
      this.myItemData.params.justShowMyMenus = true
    }
};
</script>

<style lang="scss" scoped>

</style>
