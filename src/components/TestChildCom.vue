<template>
  <div>
    <div>childCom</div>
    <div>{{ myTitle }}</div>
    <div v-if="isPublished">已发布</div>
    <div v-else>未发布</div>
    <div>{{ myAuthor.age }}{{ myAuthor.name }}</div>
    <van-button @click="$emit(`save-form`)">保存</van-button>
    <van-button @click="updateNoteTitle">修改</van-button>
    {{ noteTitle }}
    <div>
      <slot name="header">头部内容</slot>
      <slot name="footer">底部内容</slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    myTitle: String,
    isPublished: Boolean,
    author: Object
  },
  methods: {
    updateNoteTitle() {
      this.noteTitle = "小说2"
      this.$emit("update:noteTitle", this.noteTitle)
    }
  },
  data() {
    return {
      myAuthor: this.author,
      noteTitle: "小说1"
    }
  },
  mounted() {
    console.log("tag", this.author)
    this.myAuthor.age = 111
    this.isPublished = false
  }
}
</script>

<style>
</style>