<template>
    <div>
        <ZhzgWorkTodo :itemdata="itemdata"></ZhzgWorkTodo>
    </div>
</template>
  
<script>
  import ZhzgWorkTodo from "@/components/project/zhenhuaIndustry/components/workTodoCenterComponent.vue"
export default {
    name: "ZhzgWorkerTodoCenterComponents",
    components: {},
    props: ['itemdata'],
    components: {
        ZhzgWorkTodo
    },
    mounted() {
        console.log('this.itemdata: ', this.itemdata);
    }

}
</script>
  
<style lamg="scss" scoped></style>