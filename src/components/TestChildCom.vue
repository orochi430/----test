<template>
  <div>
    <div>childCom</div>
    <div>{{myTitle}}</div>
    <div v-if="isPublished">已发布</div>
    <div v-else>未发布</div>
  <div>{{myAuthor.age}}{{myAuthor.name}}  </div>
  <van-button @click="$emit(`save-form`)">保存</van-button>
    <slot></slot>
  </div>
</template>

<script>
export default {
    props:{
        myTitle:String,
        isPublished:Boolean,
        author:Object,
    },
    data(){
      return{
        myAuthor:this.author
      }
    },
    mounted(){
      console.log('tag', this.author);
      this.myAuthor.age=111;
      this.isPublished=false;
    }
}
</script>

<style>

</style>