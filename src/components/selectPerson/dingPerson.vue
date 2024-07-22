<template>
<div class="dsf-select-person">
    <add-tree :personSelectData="personSelectData" :type="type" @select="getSelect" class="_add_tree" ref="addTree"></add-tree>
    <van-tabbar>
        <van-tabbar-item class="_btns">
            <van-button type="default" @click="cancePerson">取消</van-button>
            <van-button type="info" @click="addPerson">确定</van-button>
        </van-tabbar-item>
    </van-tabbar>
</div>
</template>

<script>
import addTree from "@/components/selectPerson/dingTree";
export default {
    name: "DsfSelectPerson",
    components: {
        addTree
    },
    props: ['type',"extra","selectPersons"], // type 0 选人； type 1 部门 
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
            selectArr:[],
            selectper:[],
            pk:""
        };
    },
    created() {
        window.GLOBAL = {};
        if(this.extra){
            this.pk=this.extra.pk
        }
        console.log(this.param,this.type)
        if(this.selectPersons.length>0){
            let person=this.selectPersons
            person.forEach(item=>{
                item.checked=false
                item.attrs={}
                item.children=[]
                item.showName=item.user_name
                item.id=item.foreign_id
            })
            this.selectPersons=person
            console.log(this.selectPersons)
            this.personSelectData=[{
                attrs:{},
                checked:false,
                children:person,
                showName:"选择人员"
            }]
        }else{
            this.getPersonList(this.param);
        }
        
        window.GLOBAL.selectType=this.type
        window.GLOBAL.personMultiple=true
    },
    mounted() {},
    methods: {
        getPersonList(param) {
            let loader = dsf.layer.loading('获取中');
            let that = this;
            let url = `fn/mobileToDo/getDingUsersByToDo?pk=${this.pk}`;
            dsf.http
                .post(url,)
                .then(function (result) {
                    that.personSelectData=result.data.data.codeList
                    if(!that.personSelectData[0].children.length){
                        that.$emit("close")
                    }
                    that.personSelectData.forEach(toy => {
                        that.addPersonDeep(toy, 1);
                    });
                    that.personSelectData.forEach(item=>{
                            item.checked=false
                        })
                    that.personSelectData[0].children.forEach(item => {
                        item.type=1;
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
        addPerson() {
            let name = "";
            let val = "";
            let sch = "";
            let temp1 = [];
            let temp2 = [];
            let temp3 = [];
            this.selectArr = [];
            this.selectList.forEach(item => {
                if(item.children && item.children.length>0 && item.children[0].children.length>0){
                    this.selectArr=[]
                }else{
                    if(item.children && item.children.length>0){
                        //this.selectArr = [];
                        item.children.forEach(child => {
                            if(child.checked){
                            this.selectArr.push(child) 
                            }else{
                                this.selectArr.forEach((inx,i) => {
                                    if(inx.showName==child.showName){
                                        this.selectArr.splice(i,1)
                                    }
                                })
                            }
                        })
                    }else{
                        if(item.checked){
                            this.selectArr.push(item) 
                            }else{
                                this.selectArr.forEach((inx,i) => {
                                    if(inx.showName==item.showName){
                                        this.selectArr.splice(i,1)
                                    }
                                })
                            }
                    }
                }
            })
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
            // this.$emit("getSelectUser", this.selectArr);
            this.cancePerson();
            console.log("最终选择=====>", this.selectArr);
            let forienArr=this.selectArr.map(item=>item.id)
            console.log(forienArr)
            this.$emit("dingding",forienArr)
        },
        cancePerson() {
            // 取消
            // this.show = false;
            // this.$emit("getSelectUser", this.selectArr);
            this.$emit('cancePerson')
        },
        getSelect(data) {
            console.log(data)
            let self = this;
            self.selectList = [];
            for (let i in data) {
                self.selectList.push(data[i]);
            }
            console.log(self.selectList)
        },
        userClick(user){
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
        height: calc(100% - 61px) !important;
        padding-bottom:60px;
        color: #333;

        div {
            white-space: nowrap;
        }

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
