<template>
  <div class="box" v-if="initReady" >
    <enclosure :fileData="{
    info_id:pk||(formData.main?formData.main['A0001'].value:''),
    moduleId:moduleId,
    nodeId:formMeta.parameters?formMeta.parameters.nodeId:'',
    flowId:formMeta.parameters?formMeta.parameters.flowId:'',
    pId:formMeta.parameters?formMeta.parameters.pId:'',
    pnId:formMeta.parameters?formMeta.parameters.pnId:'',
    uploadAttach:formMeta.parameters?formMeta.parameters.uploadAttach:'',
    }"></enclosure>
  </div>
</template>

<script>
import enclosure from "@/components/commonForm/controls/enclosure"
export default {
  components:{
    enclosure
  },
  data(){
    return {
      pk:this.$route.params.pk,
      moduleId:this.$route.params.moduleId,
      formData:null,
      formMeta:null,
      initReady:false
    }
  },
  created(){
    this.init()
  },
  methods:{
    init(){
      let form={
        pk:this.pk,
        moduleId:this.moduleId
      }
      let that=this;
      dsf.http.get("fn/xform/getInfo", form).then(function ({data}) {
        console.log(data)
        that.formMeta = data.struct;
        that.formData = data.data;
        that.initReady=true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.box{
  width:100%;
  height:100%;
  .ds-enclosure-pre{
    margin-top:0;
  }
}
</style>