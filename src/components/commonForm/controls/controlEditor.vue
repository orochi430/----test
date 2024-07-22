<template>
<div class='controlEditorBox'>
    <quill-editor v-model="content" ref="myQuillEditor" :options="editorOption" @ready="onEditorReady($event)" @blur="onEditorBlur($event)" @change="onEditorChange($event)" v-if="!readonly" class="ql-editor"></quill-editor>
    <!--<button @click="save()">保存</button>-->
    <div class="htmlBox" v-html="content" v-if="readonly" @click.stop="hanldeImage($event)"></div>
    <van-image-preview v-model="imgPreview" :images="previewImg" :show-index="false" closeable @onClose="closeImg"></van-image-preview>
</div>
</template>

<script>
// import {
//     quillEditor
// } from "vue-quill-editor"; // 调用富文本编辑器
import ("quill/dist/quill.snow.css"); // 富文本编辑器外部引用样式  三种样式三选一引入即可
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.bubble.css'
// import * as Quill from "quill"; // 富文本基于quill
import propMixin from "./mixin";
let Quill;
export default {
    mixins: [propMixin],
    model: {
        prop: 'value',
        event: 'input'
    },
    components: {
        "quillEditor": () => import("vue-quill-editor").then(res => res.quillEditor),
    },
    data() {
        return {
            editorOption: {
                placeholder: '请输入编辑内容',
                modules: {
                    toolbar: dsf.config.commonForm.editorToolbar || [
                        ['bold', 'italic', 'underline'],
                        ['blockquote', 'code-block'],
                        // [{ 'header': 1 }, { 'header': 2 }],
                        [{
                            'list': 'ordered'
                        }, {
                            'list': 'bullet'
                        }],
                        //[{ 'script': 'sub' }, { 'script': 'super' }],
                        [{
                            'indent': '-1'
                        }, {
                            'indent': '+1'
                        }],
                        [{
                            'direction': 'rtl'
                        }],
                        //[{ 'size': ['small', false, 'large', 'huge'] }],
                        [{
                            'header': [1, 2, 3, 4, 5, 6, false]
                        }],
                        // [{
                        //     'font': []
                        // }],
                        [{
                            'color': []
                        }, {
                            'background': []
                        }],
                        [{
                            'align': []
                        }],
                        ['clean'],
                        //['link', 'image', 'video']
                    ],
                    syntax: {
                        highlight: text => hljs.highlightAuto(text).value
                    },
                },
            },
            controlData: {
                readonly: false,
                placeholder: ""
            },
            readonly: false,
            imgPreview: false,
            previewImg: [],
        };
    },
    computed: {
        content: {
            get() {
                // console.log(this.value.value)
                return this.value.value || ""
            },
            set(val) {
                this.value.text = dsf.util.removeHTMLTags(val)
                return this.value.value = val
            }
        }
    },
    created() {
        if (this.value.value && this.value.value.length < 1) {
            this.value.value = this.metaData.defaultValue.value
        }
        this.customEditor();
    },
      methods: {
        async customEditor() {
            await import("quill").then(res => {
              Quill = res.default
            })
            // 处理编辑器自动将style转换为类名，导致PC无法识别类名不生成相应样式
            const Align = Quill.import('attributors/style/align'); // 引入这个后会把对齐类型样式写在style上
            Align.whitelist = ['right', 'center', 'justify'];
            Quill.register(Align, true);

            // 自定义字体类型
            const fonts = [false, 'SimSun', 'SimHei', 'Microsoft-YaHei', 'KaiTi', 'FangSong', 'Arial', 'Calibri', 'Times-New-Roman', 'sans-serif', '宋体', '黑体', '微软雅黑', '楷体', '隶书', '仿宋_GB2312']
            const Font = Quill.import('attributors/style/font')
            Font.whitelist = fonts
            Quill.register(Font, true)

            // 自定义字体大小
            const Size = Quill.import('attributors/style/size')
            Size.whitelist = [false, '12px', '14px', '16px', '18px', '20px', '22px', '24px', '26px', '28px', '30px', '32px']
            Quill.register(Size, true)
        },
        save() {
            console.log('content', this.content);
        },
        onEditorFocus(event) {
            if (this.readonly) {
                event.enable(false);
            }
        },
        onEditorReady(editor) {
            editor.blur()
            // 初始化失去焦点
        },
        onEditorBlur(event) {
            // this.value.value = this.value.value.replace(/ /g, "&nbsp;")
            this.value.value = this.replaceSpace(this.value.value);
            this.$nextTick(() => {
                this.$refs.myQuillEditor.quill.blur();
            })
        },
        onEditorChange(event) {
            var obj = this.value
            this.$emit("input", obj)
        },
        // 替换tab空格、空格为&nbsp;
        replaceSpace(val) {
            const spaceRex1 = /(<.*?>)(.*?)(<.*?>)/g;
            const spaceRex2 = /\s/g;

            let newVal = val.replace(/\t/g, '&nbsp;&nbsp;');
            newVal = newVal.replace(spaceRex1, (str, $1, $2, $3) => {
                return [$1, $2.replace(spaceRex2, '&nbsp;'), $3].join('');
            });
            return newVal;
        },
        //监听点击事件
        hanldeImage(event) {
            if (event.target.nodeName === 'IMG' || event.target.nodeName === 'img') {
                //获取点击的图片url,decodeURIComponent转码一下，防禁url转码
                let url = decodeURIComponent(event.target.currentSrc);
                // let url2 = url.replace(/ctrl/, 'DreamWeb/ctrl'); //本地环境查看地址替换
                this.imgPreview = true;
                this.previewImg = [url];
            }
        },
        closeImg() {
            this.previewImg = [];
        }
    },
};
</script>

<style lang="scss">
.controlEditorBox {
    // font-size: var(--font_size_2);
    // padding: 0 10px 10px;
    width: 100%;
    box-sizing: border-box;

    .htmlBox {
        width: 100%;
        white-space: pre-wrap;

        em {
            font-style: italic;
        }
    }
}
</style><style>
.quill-editor.ql-editor {
    padding: 0;
}

.ql-container .ql-editor {
    height: 200px;
}

.ql-toolbar.ql-snow {
    line-height: 24px;
}

.ql-container .ql-editor em {
    font-style: italic;
}
</style>
