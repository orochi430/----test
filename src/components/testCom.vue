<template>
  <div>
    mytest
    <TestChildCom v-on:save-form="saveForm" :author="childData.author" :my-title="`myTitle123`" :is-published="childData.isPublished">123</TestChildCom>
  </div>
</template>

<script>
import TodoCenter from "@/components/documentCenter/TodoCenter";
import TestChildCom from '@/components/TestChildCom';
export default {
    components:{
        TestChildCom,
        TodoCenter
    },
    methods:{
      saveForm(){
        alert(`save`)
      }
    },
    data(){
      return{
        childData:{
          isPublished:true,
          title:"childTitle",
          author:{
            age:14,
            name:"张三"
          }
        }
      }
    }
}
</script>

<style>

</style>