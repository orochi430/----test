<template>
<div v-if="!readonly">
    <div class="sugg-tab">
        <van-button v-for="tab in suggTabs" :key="tab.name" size="small" type="info" @click="tabClick(tab)">{{tab.name}}</van-button>
    </div>
    <div class="sugg-fillin" @click.self="focusLast">
        <template v-for="(tag, index) in opinionContentTags">
            <span ref="tag" :key="`${tag.id}_${index}`" v-if="tag.type == -1" class="space" contenteditable="true" @keydown.delete="delTagName(index, $event)" @blur="blurTag(index, $event)" v-html="tag.tagName"></span>
            <van-tag ref="tag" :key="`${tag.id}_${index}`" v-else closeable size="large" color="#969799" @close="delTag(tag, index)">{{tag.tagName}}</van-tag>
        </template>
    </div>
    <van-field style="display:none;" v-model="opinionObj.opinionContent" :rows="1" :error-message='controlData.errorMessage' :rules="controlData.rules" type='textarea' :name="metaData&&metaData.metaId?metaData.metaId:''">
        <template #button>
            <slot name="button"></slot>
        </template>
    </van-field>
    <div style="text-align: right;">
        <van-button size="small" type="info" @click="saveModule()">保存为意见模板</van-button>
    </div>
    <!-- 常用 -->
    <van-popup v-model="oftenOpinion.show" position="top" :style="{ height: '50%' }" get-container="#app">
        <van-tabs v-model="oftenOpinion.active" sticky>
            <van-tab title="常用">
                <div class="sub-title">最近使用</div>
                <div class="tags">
                    <van-tag class="sugg-tag" v-for="item in oftenOpinion.often" :key="item.id" size="large" type="primary" @click="addTag([item])">{{item.tagName}}</van-tag>
                </div>
            </van-tab>
            <van-tab title="意见模板">
                <div class="module" v-for="(module, index) in oftenOpinion.module" :key="module.id" @click="addTag(module.content)">
                    <div class="content">
                        {{module.content.map(item => item.tagName).join('')}}
                    </div>
                    <span class="btn" @click.stop="addTag(module.content)">使用</span>
                    <span class="btn" @click.stop="delModule(module, index)">删除</span>
                </div>
            </van-tab>
        </van-tabs>
    </van-popup>
    <!-- 行为 -->
    <van-popup v-model="behaviour.show" position="top" :style="{ height: '50%' }" get-container="#app">
        <van-tabs v-model="behaviour.active" sticky>
            <van-tab title="常用模式">
                <div class="sub-title">最近使用</div>
                <div class="tags">
                    <van-tag class="sugg-tag" v-for="item in behaviour.often" :key="item.id" size="large" type="primary" @click="addTag([item])">{{item.tagName}}</van-tag>
                </div>
                <template v-if="behaviour.other">
                    <div class="sub-title">其他</div>
                        <div class="tags">
                            <van-tag class="sugg-tag" v-for="item in behaviour.other" :key="item.id" size="large" type="primary" @click="addTag([item])">{{item.tagName}}</van-tag>
                        </div>
                </template>
            </van-tab>
            <van-tab title="导航模式">
                <template v-for="(value,key) in behaviour.lineTags">
                    <div :key="key">
                        <div class="sub-title">{{key}}</div>
                        <div class="tags">
                            <van-tag class="sugg-tag" v-for="item in value" :key="item.id" size="large" type="primary" @click="addTag([item])">{{item.tagName}}</van-tag>
                        </div>
                    </div>
                </template>
            </van-tab>
        </van-tabs>
    </van-popup>
    <!-- 所有 -->
    <van-popup v-model="allOpinion.show" position="top" :style="{ height: '50%' }" get-container="#app">
        <van-tabs v-model="allOpinion.active" sticky>
            <van-tab v-for="(value,key) in allOpinion.tabs" :title="key" :key="key">
                <div class="allOpinion" v-for="opinion in value" :key="opinion.id" @click="replaceOpinionContent(opinion)">
                    <div>
                        <span>{{opinion.userName}}{{opinion.eDate}}</span>
                        <span>{{opinion.nodeName}}</span>
                    </div>
                    <div>意见内容：{{opinion.content}}</div>
                </div>
            </van-tab>
        </van-tabs>
    </van-popup>
    <!-- 用户或部门 -->
    <van-popup :get-container="getContainer" v-model="deptuser.show" position="bottom" :style="{ height: '100%' }">
        <div v-if="deptuser.show">
            <control-user-by-data @closeUser="closeUser" @getSelectUser="getSelectUser(arguments)" :pageTitle="deptuser.title" :controlData="deptuser"></control-user-by-data>
        </div>
    </van-popup>
</div>
<div v-else>
    <span class="van-field__control" v-text="opinionObj.opinionContent"></span>
</div>
</template>

<script>
import controlUserByData from "@/components/commonForm/controls/controlUserByData";
import propMixin from "./mixin";
export default {
    mixins: [propMixin],
    props: ['parameters'],
    components: {
        controlUserByData
    },
    data() {
        return {
            controlData: {
                rules: []
            },
            suggTabs: [],
            pk: this.$route.params.pk,
            opinionContentTags: [],
            oftenOpinion: { // 常用
                load: false,
                show: false,
                active: 0,
                often: [], // 最近使用
                module: [] // 意见模板
            },
            behaviour: { // 办理行为
                load: false,
                show: false,
                active: 0,
                often: [], // 常用模式
                other: [], // 其他
                lineTags: {} // 导航模式
            },
            allOpinion: { // 所有意见
                load: false,
                show: false,
                active: 0,
                tabs: {
                    '历史意见': [], // 历史意见
                    '流程意见': [] // 流程意见
                }
            },
            deptuser: {
                show: false,
                title: "",
                active: 0,
                url: "",
                tabs: [],
                nextNodeSendModeList: this.metaData.extra.nextNodeSendModeList || []
            },
            currentTagIndex: 0, // 当前的标签位置
            currentCursorIndex: 0, // 当前光标所在位置
            flowKey: '',
            flowinfo: null,
            opinionObj: {}
        }
    },
    watch: {
        opinionContentTags: {
            deep: true,
            // immediate: true,
            handler(newValue, oldValue) {
                this.opinionObj.opinionContentTag = JSON.stringify(newValue)
                this.opinionObj.opinionContent = newValue.map(item => item.tagName).join('')
                this.opinionChange()
            }
        }
    },
    created() {
        this.suggTabs = this.metaData.extra.tabs
        if (this.metaData.extra.opinionContentTag) {
            JSON.parse(this.metaData.extra.opinionContentTag).forEach(item => {
                this.opinionContentTags.push(item)
            })
        } else {
            this.opinionContentTags.push({
                "id": "",
                "tagName": "",
                "type": -1
            })
        }
        let user = dsf.util.loadSessionStore("user")
        if (this.pk && this.parameters.nodeId != "0" && this.parameters.nodeId != "-2") {
            this.flowKey = `flow-${this.parameters.pk}-${this.parameters.pId || '0'}-${this.parameters.pnId || this.parameters.pk}`
            // this.flowinfo = {
            //     [this.flowKey]: {
                this.opinionObj = {
                    "id": this.parameters.pnId,
                    "fid": this.parameters.pnId,
                    "infoId": this.parameters.pk,
                    "pid": this.parameters.pId,
                    "pnid": this.parameters.pnId,
                    "nodeId": this.parameters.nodeId,
                    "wfId": this.parameters.flowId,
                    "opinionContentTag": this.metaData.extra.opinionContentTag,
                    "opinionContent": this.metaData.extra.opinionContentTag ? JSON.parse(this.metaData.extra.opinionContentTag).map(item => item.tagName).join('') : '',
                    "nodeName": this.parameters.nodeName,
                    "isSign": "0",
                    "signName": "",
                    "signTime": "",
                    "duserId": user.user_id,
                    "duserName": user.name,
                    "userId": user.user_id,
                    "userName": user.name,
                    "opinionFiles": []
                }
            // }
        } else {
            this.flowKey = `flow-${this.parameters.pk}-0-${this.parameters.pk}`
            // this.flowinfo = {
                // [this.flowKey]: {
                this.opinionObj = {
                    "id": this.parameters.pk,
                    "fid": 0,
                    "infoId": this.parameters.pk,
                    "pid": 0,
                    "pnid": this.parameters.pk,
                    "nodeId": this.parameters.nodeId,
                    "wfId": this.parameters.flowId,
                    "opinionContentTag": this.metaData.extra.opinionContentTag,
                    "opinionContent": this.metaData.extra.opinionContentTag ? JSON.parse(this.metaData.extra.opinionContentTag).map(item => item.tagName).join('') : '',
                    "nodeName": this.parameters.nodeName,
                    "isSign": "0",
                    "signName": "",
                    "signTime": "",
                    "duserId": user.user_id,
                    "duserName": user.name,
                    "userId": user.user_id,
                    "userName": user.name,
                    "opinionFiles": []
                }
            // }
        }
        // console.log(this.flowinfo)
    },
    methods: {
        getContainer() {
            return document.body;
        },
        closeUser(isShow) {
            this.deptuser.show = isShow
        },
        convertUser(orgUser, deep) {
            let children = [];
            orgUser.forEach((element, index) => {
                children.push({
                    id: element.userId,
                    itemIndex: index,
                    name: element.userName,
                    isopen: null,
                    pid: element.orgId,
                    showName: element.userName,
                    type: element.type,
                    checked: false,
                    deep: deep,
                    childrenCount: 0
                })
            });

            return children
        },
        convertDept(orgDept, deep) {
            let children = [];
            orgDept.forEach((element, index) => {
                let deptItem = {
                    id: element.orgId,
                    itemIndex: index,
                    name: element.orgName,
                    isopen: null,
                    pid: element.fid,
                    showName: element.orgName,
                    type: 3,
                    deep: deep,
                    children: element.orgUsers.length ? this.convertUser(element.orgUsers, deep++) : []
                };

                if (element.opinionTagTreeEntityUserEntities.length) {
                    deptItem.children = [...deptItem.children, ...this.convertDept(element.opinionTagTreeEntityUserEntities)]
                }
                deptItem.childrenCount = deptItem.children.length
                children.push(deptItem)
            });
            return children
        },
        convertDept2(orgDept, deep) {
            let children = [];
            orgDept.forEach((element, index) => {
                let deptItem = {
                    id: element.orgId,
                    itemIndex: index,
                    name: element.orgName,
                    isopen: null,
                    pid: element.fid,
                    showName: element.orgName,
                    type: 3,
                    deep: deep,
                    children: element.leafList.length ? this.convertDept2(element.leafList, deep++) : []
                };
                deptItem.childrenCount = deptItem.children.length
                children.push(deptItem)
            });
            return children
        },
        getSelectUser(val) {
            let selectArr = val[0]
            let sendMode = val[1]
            let data = [];
            for (let cell of selectArr) {
                let temp = {
                    id: cell.id,
                    tagName: cell.name,
                    type: cell.type
                }
                if (cell.type == 4) {
                    temp.serial = sendMode;
                }
                data.push(temp);
            }
            this.addTag(data);
        },
        tabClick(tab) {
            switch (tab.name) {
                case '常用':
                    this.oftenOpinion.show = true
                    if (!this.oftenOpinion.load) { // 未加载过才调用接口
                        dsf.http.get(tab.action).then(res => {
                            if (res.data.code == 200) {
                                this.oftenOpinion.often = res.data.data.data.often
                            }
                        })
                        dsf.http.get('fn/editopinion/more/data').then(res => {
                            if (res.data.code == 0) {
                                this.oftenOpinion.module = res.data.data
                                this.oftenOpinion.module.forEach(item => {
                                    item.content = this.contentJson(item.content)
                                })
                            }
                        })
                        this.oftenOpinion.load = true
                    }
                    break;
                case '部门':
                    if (this.deptuser.title == "部门选择") {
                        this.deptuser.show = true
                    } else {
                        this.deptuser.tabs = [];
                        dsf.http.get(tab.action).then(res => {
                            if (res.data.code == 200) {
                                let deep = 1;
                                let data = res.data.data;
                                if (data.often && data.often.length) {
                                    this.deptuser.tabs.push({
                                        name: "最近使用",
                                        children: this.convertDept2(data.often, deep),
                                        action: tab.action
                                    });
                                }
                                deep = 1;
                                let rootChildren = this.convertDept2(data.leafList, deep);
                                this.deptuser.tabs.push({
                                    name: data.orgName,
                                    children: rootChildren,
                                    action: tab.action
                                });

                                this.deptuser.show = true
                                this.deptuser.title = "部门选择";
                            }
                            console.log(this.deptuser);
                        })
                    }
                    break;
                case '人员':
                    if (this.deptuser.title == "人员选择") {
                        this.deptuser.show = true
                    } else {
                        this.deptuser.tabs = [];
                        dsf.http.get(tab.action).then(res => {
                            if (res.data.code == 200) {
                                let deep = 1;
                                let data = res.data.data;
                                if (data.often && data.often.length) {
                                    this.deptuser.tabs.push({
                                        name: "最近使用",
                                        children: this.convertUser(data.often, deep),
                                        action: tab.action
                                    });
                                }
                                if (data.userCurrent) {
                                    deep = 1;
                                    let children = this.convertUser(data.userCurrent.orgUsers, deep);
                                    if (data.userCurrent.opinionTagTreeEntityUserEntities.length) {
                                        children = [...children, ...this.convertDept(data.userCurrent.opinionTagTreeEntityUserEntities, deep)]
                                    }
                                    this.deptuser.tabs.push({
                                        name: data.userCurrent.orgName,
                                        children: children,
                                        action: tab.action
                                    });
                                }

                                deep = 1;
                                let rootChildren = this.convertUser(data.orgUsers, deep);
                                if (data.opinionTagTreeEntityUserEntities.length) {
                                    rootChildren = [...rootChildren, ...this.convertDept(data.opinionTagTreeEntityUserEntities, deep)]
                                }
                                this.deptuser.tabs.push({
                                    name: data.orgName,
                                    children: rootChildren,
                                    action: tab.action
                                });

                                this.deptuser.show = true
                                this.deptuser.title = "人员选择";
                            }
                            console.log(this.deptuser);
                        })
                    }
                    break;
                case '办理行为':
                    this.behaviour.show = true
                    if (!this.behaviour.load) { // 未加载过才调用接口
                        dsf.http.get(tab.action).then(res => {
                            if (res.data.code == 200) {
                                this.behaviour.often = res.data.data.data.often
                                this.behaviour.other = res.data.data.data.other
                                this.behaviour.lineTags = res.data.data.lineTags
                            }
                        })
                        this.behaviour.load = true
                    }
                    break;
                case '所有意见':
                    this.allOpinion.show = true
                    if (!this.allOpinion.load) { // 未加载过才调用接口
                        dsf.http.get(tab.action).then(res => {
                            if (res.data.code == 200) {
                                this.allOpinion.tabs['历史意见'] = res.data.data.myOpinion
                                this.allOpinion.tabs['流程意见'] = res.data.data.flowOpinion
                            }
                        })
                        this.allOpinion.load = true
                    }
                    break;
            }
        },
        addTag(items) {
            let tags = items
            // 拆分插入的输入tag
            let preTag = {
                id: '',
                tagName: this.opinionContentTags[this.currentTagIndex].tagName.substring(0, this.currentCursorIndex),
                type: -1
            }
            let nextTag = {
                id: '',
                tagName: this.opinionContentTags[this.currentTagIndex].tagName.substring(this.currentCursorIndex),
                type: -1
            }
            // 插入人员标签
            if (items.every(item => item.type == 4)) {
                tags = []
                items.forEach((item, index) => { // 先将人用'、'标签分隔
                    tags.push(item)
                    if (index < items.length - 1) tags.push({
                        id: '',
                        tagName: '、',
                        type: -1
                    })
                })
                if (this.opinionContentTags[this.currentTagIndex].tagName.indexOf('同志') > -1) { // 如果当前输入标签含‘同志’，直接替换为‘同志’
                    preTag = {
                        id: '',
                        tagName: '',
                        type: -1
                    }
                    nextTag = {
                        id: '',
                        tagName: '同志',
                        type: -1
                    }
                } else {
                    nextTag = {
                        id: '',
                        tagName: '同志',
                        type: -1
                    }
                }
                if (this.opinionContentTags[this.currentTagIndex + 1] && this.opinionContentTags[this.currentTagIndex + 1].type == 4) { // 如果下一个标签为人，加‘、’标签
                    nextTag = {
                        id: '',
                        tagName: '、',
                        type: -1
                    }
                }
                if (this.currentTagIndex != 0 && this.opinionContentTags[this.currentTagIndex - 1].type == 4) { // 如果上一个标签为人，加‘、’标签
                    preTag = {
                        id: '',
                        tagName: '、',
                        type: -1
                    }
                }
            } else if (items.every(item => item.type == 3)) { // 插入部门标签
                tags = []
                items.forEach((item, index) => { // 先将部门用'、'标签分隔
                    tags.push(item)
                    if (index < items.length - 1) tags.push({
                        id: '',
                        tagName: '、',
                        type: -1
                    })
                })
            }
            this.opinionContentTags.splice(this.currentTagIndex, 1, preTag, ...tags, nextTag) // 替换插入
            // 重新定位插入位置
            this.currentTagIndex += tags.length + 1
            if (this.opinionContentTags[this.currentTagIndex].tagName == '同志') {
                this.currentCursorIndex = 2
            } else {
                this.currentCursorIndex = 0
            }
        },
        delTag(tag, index) {
            // 删除人标签时，如果前为、置空
            if ((this.opinionContentTags[index].type == 4 || this.opinionContentTags[index].type == 3) && this.opinionContentTags[index - 1].type == -1 && this.opinionContentTags[index - 1].tagName == '、') {
                this.opinionContentTags[index - 1].tagName = ''
            }
            if (index > 0 && this.opinionContentTags[index - 1].type == -1 && this.opinionContentTags[index + 1].type == -1) { // 前后都是输入 合并
                this.opinionContentTags[index - 1].tagName += this.opinionContentTags[index + 1].tagName
                this.opinionContentTags.splice(index, 2)
            } else {
                this.opinionContentTags.splice(index, 1)
            }
            // 最后一个标签删除时重新定位光标位置到最后
            if (!this.opinionContentTags[index]) {
                setTimeout(this.focusLast, 500)
            }
        },
        blurTag(index, event) { // 失焦时标签和光标位置
            let element = event.target
            let doc = element.ownerDocument || element.document;
            let win = doc.defaultView || doc.parentWindow;
            let caretOffset = 0
            let sel = win.getSelection()
            if (sel.rangeCount > 0) { //选中的区域
                let range = win.getSelection().getRangeAt(0);
                let preCaretRange = range.cloneRange(); //克隆一个选中区域
                preCaretRange.selectNodeContents(element); //设置选中区域的节点内容为当前节点
                preCaretRange.setEnd(range.endContainer, range.endOffset); //重置选中区域的结束位置
                caretOffset = preCaretRange.toString().length;
            }
            this.currentTagIndex = index
            // 失去焦点时，赋值输入标签内容类似双向绑定，使其能被监听
            // 处理转义后的空格
            let str = event.target.innerHTML
            str = event.target.innerHTML.replace(/ /g,"&nbsp;")
            let length = str.split("&nbsp;").length - 1
            this.currentCursorIndex = length * 6 + caretOffset
            if (index <= this.opinionContentTags.length) this.opinionContentTags[index].tagName = str
        },
        delTagName(index, event) {
            let element = event.target
            let doc = element.ownerDocument || element.document;
            let win = doc.defaultView || doc.parentWindow;
            let caretOffset = 0
            let sel = win.getSelection()
            if (sel.rangeCount > 0) { //选中的区域
                let range = win.getSelection().getRangeAt(0);
                let preCaretRange = range.cloneRange(); //克隆一个选中区域
                preCaretRange.selectNodeContents(element); //设置选中区域的节点内容为当前节点
                preCaretRange.setEnd(range.endContainer, range.endOffset); //重置选中区域的结束位置
                caretOffset = preCaretRange.toString().length;
            }
            let preCursor = event.target.innerHTML.substring(0, caretOffset) // 删除后光标前的内容
            if (!preCursor) { // 光标前为空则删除前一个标签
                this.opinionContentTags[index].tagName = event.target.innerHTML.substring(caretOffset)
                this.delTag(this.opinionContentTags[index - 1], index - 1)
            }
        },
        focusLast() { // 点击意见框光标聚焦到最后一个输入标签
            this.$nextTick(() => {
                console.log(this.$refs['tag'])
                let tagLen = this.$refs['tag'].length
                let lastTag = this.$refs['tag'][tagLen - 1]
                lastTag.focus()
                let range = window.getSelection(); //创建range
                range.selectAllChildren(lastTag); //range 选择obj下所有子内容
                range.collapseToEnd(); //光标移至最后
            })
        },
        contentJson(value) { // 意见模板json删除TAG:后转对象
            if (!value) return []
            if (value.indexOf('TAG:') == -1) return [{
                id: "",
                tagName: value,
                type: 1
            }]
            return JSON.parse(value.slice(4))
        },
        replaceOpinionContent(opinion) { // 点击所有意见中内容直接替换意见
            this.opinionContentTags = JSON.parse(opinion.contentTag)
            this.allOpinion.show = false
        },
        saveModule() { // 保存模板
            if (this.opinionContentTags.length == 1 && this.opinionContentTags[0].type == -1 && this.opinionContentTags[0].tagName == '') {
                dsf.layer.toast('保存意见模板不能为空')
            }
            let opinion = `TAG:${JSON.stringify(this.opinionContentTags)}`
            dsf.http.post('fn/editopinion/more/mobileAddrows', {
                opinionTempVal: opinion
            }).then(res => {
                if (res.data.code == 200) {
                    dsf.layer.toast('意见模板保存成功')
                    dsf.http.get('fn/editopinion/more/data').then(response => {
                        if (response.data.code == 0) {
                            this.oftenOpinion.module = response.data.data
                            this.oftenOpinion.module.forEach(item => {
                                item.content = this.contentJson(item.content)
                            })
                        }
                    })
                } else {
                    dsf.layer.toast('意见模板保存失败')
                }
            })
        },
        delModule(item, index) { // 删除意见模板
            dsf.layer.confirm({
                message: '是否确认删除该意见模板',
                confirmButtonText: '确认'
            }, () => {
                dsf.http.post('fn/editopinion/more/mobileDelrows', {
                    ids: item.id
                }).then(res => {
                    if (res.data.code == 200) {
                        dsf.layer.toast('意见模板删除成功')
                        this.oftenOpinion.module.splice(index, 1)
                    }
                })
            })
        },
        opinionChange() {
            this.opinionObj.opinionContentTag = JSON.stringify(this.opinionContentTags)
            this.opinionObj.opinionContent = this.opinionContentTags.map(item => item.tagName).join('')
            this.$emit("controlEditOpinion", {key: this.flowKey, value: this.opinionObj})
        }
    },
}
</script>

<style lang="scss" scoped>
@import "src/assets/styles/themes.scss";
@import "src/assets/styles/mixin.scss";

.sugg-tab {
    display: flex;

    .van-button {
        flex: 1 0 auto;
        font-size: 14px;

        &:not(:last-child) {
            margin-right: 5px;
        }
    }
}

.sugg-fillin {
    min-height: 100px;
    border: 1px solid #cfcfcf;
    margin: 10px 0;
    padding: 5px;
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;

    .space {
        min-width: 5px;
        outline: none;
    }

    .van-tag {
        margin: 0 2px;
    }
}

.sub-title {
    padding: 10px;
    font-size: 16px;
}

.tags {
    padding: 0 10px;
}

.sugg-tag {
    padding: 10px;
    font-size: 14px;
    margin: 0 10px 10px 0;
}

.allOpinion {
    margin: 10px;
    padding: 8px;
    @include opacity-background-theme('normal');

    div:first-child {
        display: flex;
        justify-content: space-between;
    }
}

.module {
    margin: 10px;
    padding: 8px;
    @include opacity-background-theme('normal');
    display: flex;
    align-items: center;

    .content {
        flex: 1;
    }

    .btn {
        margin: 0 5px;
        @include font-theme('normal');
    }
}
</style>
