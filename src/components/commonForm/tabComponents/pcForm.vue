<template>
<div id="pc-form">
  <div class="content" ref="content">
			<iframe id="pcIframe" :src="temUrl" frameborder="0" ref="iframe" scrolling="yes" :key="temUrl"></iframe>
		</div>
</div>
</template>

<script>
export default {
  name:'PcForm',
  props:["formData","formMeta"],
  data() {
    return {
      url:'',
      iframeIndex: 0,
      temUrl:''
    }
  },
  created(){
    this.initUrl()
  },
  mounted(){
  },
  methods:{
    initUrl(){
      this.url = dsf.config.formTab.filter(item => item.name=='pcForm')[0].pcFormUrl || ''
      let params = {
        moduleId: this.$route.params.moduleId,
        flowId: this.formMeta.parameters.flowId,
        nodeId: this.formMeta.parameters.nodeId,
        userId: dsf.util.loadLocalStore("user").user_id,
        pk: this.$route.params.pk
      }
      if(this.url){
        Object.keys(params).forEach(key => {
          if(this.url.search(/\?/) == -1){
            this.url += `?${key}=${params[key]}`
          }else{
            this.url += `&${key}=${params[key]}`
          }
        })
      }
      this.temUrl = this.url
      console.log(this.url)
    },
    refreshIframe(){
      if(this.url.search(/\?/) == -1){
        this.temUrl = `${this.url}?number=${Math.random()}`
      }else{
        this.temUrl = `${this.url}&number=${Math.random()}`
      }
    }
  }
}
</script>
<style lang='scss' scoped>
  #pc-form {
		height: 100%;
		width: 100%;
		overflow: auto;
		position: relative;
		display: flex;
		flex-direction: column;
	}

	.content {
		flex: 1;

		iframe {
			width: 100% !important;
			height: 100% !important;
		}
	}
</style>