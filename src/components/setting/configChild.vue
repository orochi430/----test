<template>
<div class="child">
    <div class="configChild" v-for="(item,index) in treeData" :key="index">
        <div class="title">
            <div class="left">
                <div class="name">
                    {{item.name}}
                </div>
                <div class="values">
                    <el-input v-if="item.type=='string'" v-model="item.value" @keyup.enter.native="handleStringChange" placeholder="请输入内容"></el-input>
                    <el-switch v-if="item.type=='boolean'" v-model="item.value" @kchange="handleBooleanChange" active-text="是" inactive-text="否">
                    </el-switch>
                    <el-input-number v-if="item.type=='number'" v-model="item.value" @change="handleNumberChange"></el-input-number>
                </div>
                <div class="remark">
                    说明：{{item.remark}}
                </div>
            </div>
            <div class="right" :class="{'empty': !item.children || item.children.length==0}">
                <van-button type="primary" size="small" @click="addRemark(item,index)">说明</van-button>
                <van-button type="primary" size="small" @click="addObject(item,index)" v-if="item.children && item.children.length>0">添加</van-button>
                <van-button type="primary" size="small">删除</van-button>
            </div>
            <div class="toggle" v-if="item.children && item.children.length>0" @click="toggle(item)" :class="{'active':item.showChild}">
                <van-icon color="#FFF" size="16" name="arrow" />
            </div>
        </div>
        <div v-show="item.showChild" class="lists" v-if="item.children && item.children.length>0">
            <configChild :treeData="item.children" @change="change"></configChild>
        </div>
    </div>
    <el-dialog title="说明" :visible.sync="dialogVisible" width="50%" :append-to-body="true">
        <div class="codes">
            <el-input v-if="isRemark" type="textarea" :rows="2" placeholder="请输入说明信息" v-model.trim="remark">
            </el-input>
            <codemirror v-else v-model="code" :options="cmOptions" ref="codemirror"></codemirror>
        </div>
        <div class="buttons">
            <el-button @click="closeDialog">关 闭</el-button>
            <el-button v-if="!isRemark" type="primary" @click="haddleAddObject">确 定</el-button>
            <el-button v-if="isRemark" type="primary" @click="haddleAddRemark">确 定</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import Vue from 'vue'
import {
    Button,
    Input,
    Switch,
    InputNumber,
    Dialog,
    Icon
} from 'element-ui';
Vue.use(Button)
Vue.use(Input)
Vue.use(Switch)
Vue.use(InputNumber)
Vue.use(Dialog)
Vue.use(Icon)

import {
    codemirror
} from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
// language js
import 'codemirror/mode/javascript/javascript.js'
// theme css
import 'codemirror/theme/material-darker.css'

export default {
    props: ["treeData"],
    name: 'configChild',
    components: {
        codemirror
    },
    data() {
        return {
            dialogVisible: false,
            remark: "",
            code: '',
            cmOptions: {
                // codemirror options
                tabSize: 4,
                mode: 'text/javascript',
                theme: 'material-darker',
                lineNumbers: true,
                line: true,
            },
            isRemark: true,
            currentObj: {},
            index: 0
        };
    },
    computed: {},
    watch: {},
    methods: {
        toggle(item) {
            this.$set(item, "showChild", !item.showChild)
        },
        handleNumberChange() {

        },
        handleBooleanChange() {

        },
        handleStringChange() {
            console.log(this.treeData)
            this.$emit("change")
        },
        change() {
            this.$emit("change")
        },
        jsonToTree(data) {
            let tree = []
            if (data != null) {
                if (typeof data == "object") {
                    Object.keys(data).forEach((item, index) => {
                        let obj = {
                            name: item,
                            remark: "",
                            type: Array.isArray(data[item]) ? 'array' : typeof data[item],
                            children: this.jsonToTree(data[item]),
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
        addObject(item, index) {
            this.isRemark = false
            this.code = ""
            this.dialogVisible = true
            this.currentObj = item
            this.index = index
        },
        addRemark(item, index) {
            this.isRemark = true
            this.remark = item.remark
            this.dialogVisible = true
            this.currentObj = item
            this.index = index
        },
        haddleAddRemark() {
            if (!this.remark) {
                dsf.layer.toast('请输入说明信息')
                return
            }
            this.$set(this.treeData[this.index], "remark", this.remark)
            this.closeDialog()
        },
        haddleAddObject() {
            try {
                var js = eval("(" + this.code + ")");
                let tree = this.jsonToTree(js)
                console.log(this.treeData[this.index])
                debugger
                if (this.currentObj.type == 'array' && this.currentObj.children[0] && this.currentObj.children[0].type == 'object') {
                    this.treeData[this.index].children.push({
                        name: `${this.treeData[this.index].children.length}`,
                        remark: "",
                        type: 'object',
                        children: tree,
                        showChild: false
                    })
                } else {
                    this.$set(this.treeData[this.index], "children", this.treeData[this.index].children.concat(tree))
                }
                console.log(this.treeData[this.index].children)
                this.closeDialog()
            } catch (exception) {
                dsf.layer.toast('对象代码格式错误，请检查')
            }
        },
        closeDialog() {
            this.dialogVisible = false
            this.code = ""
            this.remark = ""
        },
    },
    created() {},
    mounted() {},
    destroyed() {},
}
</script>

<style lang="scss" scoped>
>>>.el-input-number__decrease,
>>>.el-input-number__increase {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.child {
    height: auto;
    overflow: hidden;
    box-sizing: border-box;
    margin: 30px;

}

.configChild {
    border: 1px solid #f5f5f5;
    border-radius: 10px;
    margin-bottom: 10px;
}

.title {
    width: 100%;
    min-height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    background: #ebebeb;
    box-sizing: border-box;
    padding-left: 20px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;

    .left {
        display: flex;
        align-items: center;

        .name {
            &>span:first-child {
                font-size: var(--font_size_3);
                color: #333;
                font-weight: bold;
            }

        }

        .remark {
            font-size: var(--font_size_4);
            color: #333;
        }

        &>div {
            display: flex;
            align-items: center;
            margin-right: 15px;
        }

    }

    .right {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-end;

        &.empty {
            margin-right: 84px;
        }

        .van-button {
            margin-right: 15px;
        }
    }

    .toggle {
        width: 24px;
        height: 24px;
        background: red;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        overflow: hidden;
        margin: 0 30px;
        transform: rotate(0deg);
        transition: all linear .2s;

        &.active {
            transform: rotate(90deg);
            transition: all linear .2s;
            background: #17bd0c;
        }
    }
}

>>>.codes {
    width: 100%;
    height: auto;

    .CodeMirror {
        height: 400px;
    }

    .el-input {
        width: 100%;
        height: 100%;
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
