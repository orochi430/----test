<template>
<div class="globalConfig">
    <div class="title">
        <el-button type="primary" @click="addObjects">添加对象</el-button>
        <el-button type="primary" @click="viewCurrentJson">JSON预览</el-button>
        <el-button type="primary" @click="viewStandard">标准版JSON</el-button>
        <el-button type="primary" @click="saveCurrentJson">保存</el-button>
    </div>
    <div class="comtain">
        <configChild @change="change" :treeData="treeData"></configChild>
    </div>
    <el-dialog :title="isAdd?'请添加完整对象格式，以 { 开始， 以 } 结束，内容参照正常js对象格式':'JSON文件预览'" :visible.sync="dialogVisible" :fullscreen="true" :append-to-body="true">
        <div class="codes">
            <codemirror v-model="code" :options="cmOptions" ref="codemirror"></codemirror>
        </div>
        <div class="buttons">
            <el-button @click="closeDialog">关 闭</el-button>
            <el-button v-if="isAdd" type="primary" @click="addObject">确 定</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
/** 
 *  会议配置的大体逻辑
 */
import Vue from 'vue'
import configChild from './configChild'
import {
    codemirror
} from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/theme/material-darker.css'
import 'codemirror/addon/scroll/annotatescrollbar.js'
import 'codemirror/addon/search/matchesonscrollbar.js'
import 'codemirror/addon/search/match-highlighter.js'
import 'codemirror/addon/search/jump-to-line.js'
import 'codemirror/addon/dialog/dialog.js'
import 'codemirror/addon/dialog/dialog.css'
import 'codemirror/addon/search/searchcursor.js'
import 'codemirror/addon/search/search.js'

import {
    Button,
    Input,
    Switch,
    Dialog,
    Icon
} from 'element-ui';
Vue.use(Button)
Vue.use(Input)
Vue.use(Switch)
Vue.use(Dialog)
Vue.use(Icon)

export default {
    name: 'globalConfig',
    components: {
        configChild,
        codemirror
    },
    data() {
        return {
            menuList: {},
            treeData: [],
            showTree: false,
            dialogVisible: false,
            code: '',
            cmOptions: {
                // codemirror options
                tabSize: 4,
                mode: 'text/javascript',
                theme: 'material-darker',
                lineNumbers: true,
                line: true,
                readOnly: true
            },
            title: "",
            isAdd: true
        };
    },
    computed: {},
    watch: {},
    methods: {
        jsonToTree(data, id) {
            let tree = []
            if (data != null) {
                if (typeof data == "object") {
                    Object.keys(data).forEach((item, index) => {
                        let newId = id ? id + "_" + item : item
                        let obj = {
                            id: newId,
                            fid: id,
                            name: item,
                            remark: "",
                            type: Array.isArray(data[item]) ? 'array' : typeof data[item],
                            children: this.jsonToTree(data[item], newId),
                            showChild: false
                        }
                        if (typeof data[item] != 'object') {
                            obj.value = data[item]
                        }
                        tree.push(obj)
                    });
                }
            }

            return tree
        },
        getConfigJson() {
            dsf.http.get("static/config.json", ).then(data => {
                if (data && data.status == 200) {
                    this.menuList = data.data
                    let tree = this.jsonToTree(this.menuList, '')
                    console.log(tree)
                    this.treeData = tree

                    this.showTree = true
                }
            })
        },
        change() {
            console.log(this.treeData)
        },
        addObject() {
            console.log(this.code)
            try {
                var js = eval("(" + this.code + ")");
                let tree = this.jsonToTree(js)
                this.treeData = this.treeData.concat(tree)
                this.menuList = Object.assign(this.menuList, js)
            } catch (exception) {
                dsf.layer.toast('对象代码格式错误，请检查')
            }
        },
        viewStandard() {
            this.title = "JSON数据预览"
            this.dialogVisible = true
            this.$nextTick(() => {
                this.code = JSON.stringify(this.menuList, null, 2)
            })
        },
        closeDialog() {
            this.dialogVisible = false
            this.code = ""
        },
        restoreJsonData(dataArray) {
            let that = this
            let obj = {}
            if (dataArray && dataArray.length > 0) {
                dataArray.forEach(item => {
                    if (item.type == "object") {
                        obj[item.name] = {}
                        if (item.children && item.children.length > 0) {
                            obj[item.name] = that.restoreJsonData(item.children)
                        }
                    } else if (item.type == "array") {
                        obj[item.name] = []
                        if (item.children && item.children.length > 0) {
                            let data = that.restoreJsonData(item.children)
                            if (item.name == "tabItems") {
                                console.log(data)
                            }
                            Object.keys(data).forEach(child => {
                                obj[item.name].push(data[child])
                            })

                        }
                    } else {
                        obj[item.name] = item.value
                    }
                });
            }

            return obj
        },
        viewCurrentJson() {
            this.title = "JSON数据预览"
            this.isAdd = false
            let obj = this.restoreJsonData(this.treeData)
            this.dialogVisible = true
            this.menuList = obj
            this.$nextTick(() => {
                this.code = JSON.stringify(this.menuList, null, 2)
            })
        },
        addObjects() {
            this.title = "请添加完整对象格式，以 { 开始， 以 } 结束，内容参照正常js对象格式"
            this.isAdd = true
            this.code = ""
            this.dialogVisible = true
        },
        saveCurrentJson() {

        }
    },
    created() {},
    mounted() {
        this.getConfigJson()
    },
    destroyed() {},
}
</script>

<style lang="scss" scoped>
.globalConfig {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: #FFF;
    z-index: 2;
    box-sizing: border-box;

    .title {
        width: 100%;
        height: 80px;
        border-bottom: 1px solid #ebebeb;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        box-sizing: border-box;
        padding: 0 20px;

        .el-button {
            margin-left: 20px;
        }
    }

    .comtain {
        width: 100%;
        height: calc(100vh - 80px);
        overflow-y: auto;
    }
}

>>>.codes {
    width: 100%;
    height: 700px;
    box-sizing: border-box;
    border: 1px solid #ebebeb;

    .CodeMirror {
        height: 700px;
    }
}

>>>.buttons {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 20px;
}
</style>
