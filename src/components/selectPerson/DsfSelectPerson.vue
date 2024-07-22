<template>
<div class="dsf-select-person">
    <div class="_add_tree">
        <add-tree :personSelectData="personSelectData" :type="type" @select="getSelect" ref="addTree"></add-tree>
    </div>
    <van-tabbar placeholder>
        <van-tabbar-item class="_btns">
            <debounce-click>
                <van-button type="default" @click="cancePerson">取消</van-button>
            </debounce-click>
            <debounce-click>
                <van-button type="info" @click="addPerson">确定</van-button>
            </debounce-click>
        </van-tabbar-item>
    </van-tabbar>
</div>
</template>

<script>
import addTree from "@/components/selectPerson/addTree";
import DebounceClick from '@/components/common/debounceClick.jsx'
export default {
    name: "DsfSelectPerson",
    components: {
        addTree,
        DebounceClick
    },
    props: ['type', "extra"], // type 0 选人； type 1 部门 
    data() {
        return {
            show: true,
            selectList: [],
            personSelectData: "",
            oldV: [],
            param: {
                allowEdit: false,
                containUnit: "-1",
                data: "",
                displayFullPath: "-1",
                fullOrganize: false,
                key: "C-RC-0008",
                multiple: true,
                roles: "",
                rootObject: "2",
                schema: "",
                separator: ",",
                tabs: [{
                    key: "self_org",
                    list: [{
                        key: "department",
                        name: "本机构"
                    }],
                    name: "本单位"
                }],
                title: "选择参与人员",
                type: "userselect",
                types: ["person", "department", "post"],
                typesString: "person,department,post",
                value: ""
            },
            selectArr: [],
            selectper: []
        };
    },
    created() {
        window.GLOBAL = {};
        if (this.extra && JSON.stringify(this.extra) != "{}") {
            console.log(this.extra)
            let data = this.extra;
            this.param.tabs[0].key = data.tabs[0].key;
            data.typesString ? this.param.typesString = data.typesString : "";
            data.rootObject ? this.param.rootObject = data.rootObject : "";
            this.param.multiple = data.multiple;
        }
        console.log(this.param, this.type)
        this.getPersonList(this.param);
        window.GLOBAL.selectType = this.type

    },
    mounted() {},
    methods: {
        getPersonList(param) {
            let loader = dsf.layer.loading('获取中');
            window.GLOBAL.personMultiple = param.multiple;
            let that = this;
            let url = "fn/user/select/data";
            let action = that.extra.customAction || "self_org";
            let postData = {
                action: action, //param.tabs[0].key,//不应该写死，后期改造成表单选人一致
                types: param.typesString,
                rootObject: param.rootObject,
                async: false
            }
            if (this.extra && this.extra.customRoot) {
                postData.customRoot = this.extra.customRoot
            }
            if (this.type == 1) {
                postData = {
                    action: action, //param.tabs[0].key,
                    types: "department", //"org",
                    rootObject: param.rootObject,
                    async: false
                }
            } else if (this.type == 3) {
                postData = {
                    action: "self_org",
                    types: "org,department",
                    rootObject: 1,
                    async: false
                }
            }
            dsf.http
                .post(url, postData)
                .then(function (result) {
                    result.data.data.departmentList.forEach(toy => {
                        that.addPersonDeep(toy, 1);
                    });
                    that.personSelectData = result.data.data.departmentList;
                    that.personSelectData[0].children.forEach(item => {
                        item.checked = false
                    })
                    console.log("人员选择控件", that.personSelectData);
                }).finally(() => {
                    that.$nextTick(() => {
                        dsf.layer.closeLoading(loader);
                    })
                })
        },
        addPersonDeep(data, start) {
            let self = this;
            this.$set(data, "deep", start);
            this.$set(data, "isopen", start <= 1 ? true : false);
            if (data.children && data.children.length > 0) {
                data.children.forEach(item => {
                    self.addPersonDeep(item, start + 1);
                });
            }
        },
        filterSelect(list, selectArr) {
            // 递归遍历选中节点，获取所有层级下的人员
            list.forEach(item => {
                if (item.children && item.children.length > 0) {
                    this.filterSelect(item.children, selectArr)
                } else {
                    if (item.checked) {
                        selectArr.push(item)
                    } else {
                        selectArr.forEach((inx, i) => {
                            if (inx.showName == item.showName) {
                                selectArr.splice(i, 1)
                            }
                        })
                    }
                }
            })
        },
        addPerson() {
            let name = "";
            let val = "";
            let sch = "";
            let temp1 = [];
            let temp2 = [];
            let temp3 = [];
            this.selectArr = [];
            // this.selectList.forEach(item => {
            //     if(item.children && item.children.length>0 && item.children[0].children.length>0){
            //         this.selectArr=[...this.selectArr]
            //     }else{
            //         if(item.children && item.children.length>0){
            //             //this.selectArr = [];
            //             item.children.forEach(child => {
            //                 if(child.checked){
            //                 this.selectArr.push(child) 
            //                 }else{
            //                     this.selectArr.forEach((inx,i) => {
            //                         if(inx.showName==child.showName){
            //                             this.selectArr.splice(i,1)
            //                         }
            //                     })
            //                 }
            //             })
            //         }else{
            //             if(item.checked){
            //                 this.selectArr.push(item) 
            //                 }else{
            //                     this.selectArr.forEach((inx,i) => {
            //                         if(inx.showName==item.showName){
            //                             this.selectArr.splice(i,1)
            //                         }
            //                     })
            //                 }
            //         }
            //     }
            // })
            this.filterSelect(this.selectList, this.selectArr)
            let hash = {};
            this.selectArr = this.selectArr.reduce((preVal, curVal) => {
                hash[curVal.id] ? "" : (hash[curVal.id] = true && preVal.push(curVal));
                return preVal;
            }, []);
            for (let cell of this.selectArr) {
                temp1.push(cell.showName);
                temp2.push(cell.attrs.idValue);
                temp3.push(cell.type + "::" + cell.attrs.idValue);
            }
            name = temp1.join(",");
            val = temp2.join(",");
            sch = temp3.join(",");
            this.person = name;
            this.show = false;
            this.oldV = this.selectList;
            this.$emit("getSelectUser", this.selectArr);
            this.cancePerson();
            console.log("最终选择=====>", this.selectArr);
        },
        cancePerson() {
            // 取消
            // this.show = false;
            // this.$emit("getSelectUser", this.selectArr);
            this.$emit('cancePerson')
        },
        getSelect(data) {
            let self = this;
            self.selectList = [];
            for (let i in data) {
                self.selectList.push(data[i]);
            }
            console.log(self.selectList)
            // self.selectList.forEach(item => {
            //     if(item.children && item.children.length>0){
            //         //this.selectArr = [];
            //         item.children.forEach(child => {
            //             if(child.checked){
            //                self.selectper.push(child) 
            //             }
            //         })
            //     }else{
            //         if(item.checked){
            //             self.selectper.push(item) 
            //         }
            //     }
            // })
            // let hash = {};
            // self.selectper = self.selectper.reduce((preVal, curVal) => {
            //     hash[curVal.id] ? "" : (hash[curVal.id] = true && preVal.push(curVal));
            //     return preVal;
            // }, []);
            // console.log("选择人", self.selectper);
            // self.selectper.forEach((item,index) => {
            //     if(item.checked){
            //         self.selectArr.push(item)
            //     }else{
            //         self.selectArr.forEach((inx,i) => {
            //             if(inx.showName==item.showName){
            //                 self.selectArr.splice(i,1)
            //             }
            //         })
            //     }
            // })
        },
        userClick(user) {
            this.$refs.addTree.userClick(user)
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";

::v-deep.dsf-select-person {
    @include font_4(true);

    .van-tabbar-item__text {
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    ._add_tree {
        flex: 1;
        color: #333;

        // div {
        //     white-space: nowrap;
        // }

        .checkbox {
            position: relative;
            top: -2px;
        }
    }

    .selec_b {
        position: relative;
        bottom: 50px;

        .select_box {
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
        }
    }

    button {
        height: 0.8rem;
        padding: 0;
        flex: 1;
        margin: 0 10px;
    }

    ._btns {
        padding: 0 10px;
    }

    .van-tabbar--fixed {
        height: 1.2rem;
    }
}
</style>
