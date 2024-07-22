<template>
    <div>
        <ZhzgNews :itemdata="itemdata"></ZhzgNews>
    </div>
</template>
  
<script>
  import ZhzgNews from "@/components/project/zhenhuaIndustry/components/newsComponent.vue"
export default {
    name: "ZhzgWorkerNewsComponents",
    components: {},
    props: ['itemdata'],
    components: {
        ZhzgNews
    },
    mounted() {
        console.log('this.itemdata: ', this.itemdata);
    }

}
</script>
  
<style lamg="scss" scoped></style>