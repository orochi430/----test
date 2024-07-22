<template>
  <div class="box middleRouter">
    <van-loading vertical type="spinner" color="#1989fa" />
  </div>
</template>

<script>
export default {
  created(){
    this.init()
  },
  methods:{
    init(){
      console.log(this.$route.query)
      if(this.$route.query.routeName=="healthStatistics"){
         dsf.http.get(`fn/epidemic/isClockIn`)
         .then(({data})=>{
           if(data.type=="success"){
             this.$router.replace(`/commonForm/210202144200a6hFT4QWrGbmmP4dSy1`)
           }else{
             this.$router.replace(`/commonForm/210202144200a6hFT4QWrGbmmP4dSy1/${data.data}`)
           }
           console.log(data)
         })
      }else{
        dsf.http.post(`fn/feedback/getFormid`)
        .then(({data:{data:{pk,moduleId}}})=>{
          console.log(pk,moduleId)
          this.$router.replace(`/commonForm/${moduleId}/${pk}`)
        })
      }
      return
      
    }
  }
}
</script>

<style lang="scss" scoped>
  .middleRouter{
    width:100%;
    height:100%;
    display:flex;
    align-items: center;
    justify-content:center;
  }
</style>>
