<template>
<relation-list :relationList="fileList" :parameters="topformMeta ? topformMeta.parameters : formMeta.parameters" :isControl="true" :metaData="metaData"></relation-list>
</template>

<script>
import relationList from '@/components/commonForm/tabComponents/relationList'
export default {
  components: { relationList },
  props:["relationList","formMeta","metaData","topformMeta"],
  data() {
    return {
      // fileList: []
    }
  },
  computed: {
    fileList: {
      get() {
        return this.relationList.filter(
          it => this.metaData.extra.fileRelaId ? it.fileRelaId == this.metaData.extra.fileRelaId : true // this.metaData.extra.fileRelaId存在时找对应类型，否则返回全部
        )
      }
    }
  },
  created() {
    //console.log(this.dataList)
    // this.fileList = this.relationList.filter(
    //   it => this.metaData.extra.fileRelaId ? it.fileRelaId == this.metaData.extra.fileRelaId : true // this.metaData.extra.fileRelaId存在时找对应类型，否则返回全部
    // );
  }
}
</script>
<style lang='scss' scoped>
</style>