<template>
<div>
  <menu-setting @done="getMenu" :menus="mainMenu" :rowNum="rowNum"></menu-setting>
</div>
</template>

<script>
import menuSetting from "@/components/documentCenter/menuSetting";
export default {
  components: {menuSetting},
  data() {
    return {
      mainMenu: [],
      rowNum: 4
    }
  },
  created() {
    debugger
    this.mainMenu = JSON.parse(this.$route.query.menus)
  },
  methods: {
    getMenu() {
      this.$router.back()
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
