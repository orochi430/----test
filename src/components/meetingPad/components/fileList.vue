<template>
<div class="file-container">
  <div v-for="(file,index) in files" :key="index">
      <file-item :file="file" @sendFileData="sendFileData"></file-item>
      <van-divider v-if="index < files.length-1" />
  </div>
</div>
</template>

<script>
import fileItem from './fileItem'
export default {
  components: {
    fileItem
  },
  props: {
    files: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      
    }
  },
  methods:{
    sendFileData(file, id){
      this.$emit('sendFileData',file, id)
    }
  }
}
</script>
<style lang='scss' scoped>
</style>