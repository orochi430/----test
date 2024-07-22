<template>
<div>
  <quill-editor
    v-model="content"
    ref="myQuillEditor"
    :options="editorOption"
    @focus="onEditorFocus($event)"
    @blur="onEditorBlur($event)"
    @change="onEditorChange($event)"
  ></quill-editor>
    <!--<button @click="save()">保存</button>-->
</div>
</template>

<script>
// import { quillEditor } from "vue-quill-editor"; // 调用富文本编辑器
import("quill/dist/quill.snow.css"); // 富文本编辑器外部引用样式  三种样式三选一引入即可
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.bubble.css'
// import * as Quill from "quill"; // 富文本基于quill
export default {
  components: {
    "quillEditor": () => import("vue-quill-editor").then(res => res.quillEditor),
  },
  props:["textareaTextVal","isdisabled"],
  data() {
    return {
        editorOption: {
          placeholder: '请输入编辑内容',
          modules: {
            toolbar: dsf.config.commonForm.editorToolbar || [
              ['bold', 'italic' ,'underline'],
              ['blockquote', 'code-block'],
             // [{ 'header': 1 }, { 'header': 2 }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              //[{ 'script': 'sub' }, { 'script': 'super' }],
              [{ 'indent': '-1' }, { 'indent': '+1' }],
              [{ 'direction': 'rtl' }],
              //[{ 'size': ['small', false, 'large', 'huge'] }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              //[{ 'font': [] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'align': [] }],
              ['clean'],
              //['link', 'image', 'video']
            ],
            syntax: {
              highlight: text => hljs.highlightAuto(text).value
            }
          }
        },
        content:this.textareaTextVal
    };
  },
  created(){
    this.$nextTick(function() {
      this.$refs.myQuillEditor.quill.blur();
    });
  },
  methods:{
      save(){
          console.log('content', this.content);
      },
      onEditorFocus(e){
        //禁止输入
        if(this.isdisabled){
          e.enable(false);
        }
      },
      onEditorBlur(){

      },
      onEditorChange(){
        this.$emit("textareaText",this.content)
      }
  },
};
</script>

<style>
.ql-container .ql-editor{
    height:200px;
}
.ql-toolbar.ql-snow{
    line-height: 24px;
}
</style>
