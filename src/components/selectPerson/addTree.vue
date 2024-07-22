<template>
<!-- 自己封装出来一个配合postMessage的组件 2019-12-30 =。=   -->
<div style="width:100%;" class="dsf-tree">
    <div v-for="(item,index) in personSelectData" :key="'index1'+index" style='overflow: hidden;'>
        <div class="flex-box tree_line">
            <!-- 父级是否可选 -->
            <!--<div  @click="userClick(item)" :style="{'width':'16px','height':'16px','margin-right':'10px'}" :class="{'open-status':item.isopen,'close-status':!item.isopen}"></div>-->
            <van-checkbox icon-size="18px" v-if="!item.attrs.noselect" v-model="item.checked" ref="check" @click="userClick(item)"></van-checkbox>
            <div class="tree_tit" @click="checkAll(item)">
                <span :class="{tit_width:!item.children.length>0}">{{item.showName}}</span>
                <!-- <span v-if="item.children.length>0">({{item.children.length}})</span> -->
            </div>
            <div class="isShowChiled" @click="checkAll(item)" v-if="item.children.length>0">
                <van-icon v-if="item.isopen" name="arrow-up"/>
                <van-icon v-else name="arrow-down"/>
                <span class="r_span">{{item.isopen ? '收起' : '展开'}}</span>
                <!-- <span class="r_line"></span> -->
            </div>
        </div>
        <div v-for="(cell,inx) in item.children" :key="'index2'+inx" :style="{'display':item.isopen?'block':'none'}">
            <div v-if="cell.type==1" :style="{'padding-left':'30px'}" class="person" @click="userClick(cell)">
                <div class="flex-box person_child">
                    <van-checkbox icon-size="16px" class="child_check" v-model="cell.checked"></van-checkbox>
                    <div class="user-logo">
                        <i class="icon iconfont iconyonghu"></i>
                    </div>
                    <div class="username">{{cell.showName}}</div>
                </div>
            </div>
            <div v-if="cell.type!=1" :style="getStyle(item.deep)">
                <add-tree :personSelectData="[cell]" @select="selectAll"></add-tree>
            </div>
        </div>
        <!-- <div v-for="(cell,inx) in item.children" :key="'index3'+inx" class="" :style="{'display':item.isopen?'block':'none'}">
            <div v-if="cell.type!=1" :style="getStyle(item.deep)">
                <add-tree :personSelectData="[cell]" @select="selectAll"></add-tree>
            </div>
        </div> -->
    </div>
</div>
</template>

<script>
export default {
    name: "addTree",
    props: ["personSelectData","type"],
    data: function () {
        return {
            isHidden: false
        };
    },
    created() {
        this.isHidden = undefined
        window.GLOBAL.ParentNode = []
        window.GLOBAL.personAddList = [];
    },
    mounted() {},
    watch: {},
    methods: {
        recursionChecked(item,checked){
            // 递归将所有层级下子节点选中
            item.children.forEach(child => {
                child.checked = checked
                // if(child.checked){
                //     window.GLOBAL.personAddList.push(child);
                // }else{
                //     window.GLOBAL.personAddList.forEach((del, inx) => {
                //     if (del.showName == child.showName) {
                //         window.GLOBAL.personAddList.splice(inx, 1);
                //     }
                //     });
                // }
                if(child.children && child.children.length>0){
                    this.recursionChecked(child,checked)
                }
            })

        },
        checkAll (item) {
            if(item.children && item.children.length>0){
                this.$set(item, "isopen", !item.isopen);
                if(item.isopen){
                    window.GLOBAL.ParentNode.push(item)
                    if(item.checked){
                        item.children.forEach(item => {
                            item.checked=true
                        })
                    }else{
                        item.children.forEach(item => {
                            item.checked=false
                        })
                    }
                }else{
                    window.GLOBAL.ParentNode.forEach((del, inx) => {
                        if (del.showName == item.showName) {
                            window.GLOBAL.ParentNode.splice(inx, 1);
                        }
                    });
                }
            }else{
                if(item.checked){
                    this.$delete(item,'checked')
                    this.$set(item,"checked",false)
                }else{
                    this.$delete(item,'checked')
                    this.$set(item,"checked",true)
                }
                this.userClick(item)
            }
        },
        //获取选择的人
        selectAll(data) {
            this.$emit('select', data);
        },
        getStyle(deep) {
            return {
                "padding-left": 30 + "px",
                "box-sizing": "border-box"
            };
        },
        itemClick(item) {
            this.$set(item, "checked", !item.checked);
            console.log(item)
        },
        userClick(user) {
            const self = this;
            if(window.GLOBAL.selectType=='0'){
                if(user.children && !user.children.length > 0){
                    self.$set(user, "checked", !user.checked);
                }
            }

            console.log(user)
            if (window.GLOBAL.personMultiple) {
                if (user.checked) {
                    if (user.children && user.children.length > 0) { //选中父级
                        window.GLOBAL.ParentNode.push(user)
                        this.recursionChecked(user, true)
                        // user.children.forEach(item => {
                        //     item.checked=true
                        // })
                    }
                    window.GLOBAL.personAddList.push(user);
                } else {
                    if (user.children && user.children.length > 0) { //取消选中父级
                        window.GLOBAL.ParentNode.forEach((del, inx) => {
                            if (del.showName == user.showName) {
                                window.GLOBAL.ParentNode.splice(inx, 1);
                            }
                        });
                        this.recursionChecked(user, false)

                        //  user.children.forEach(item => {
                        //     item.checked=false
                        // })
                    }
                    window.GLOBAL.personAddList.forEach((del, inx) => {
                        if (del.showName == user.showName) {
                            window.GLOBAL.personAddList.splice(inx, 1);
                        }
                    });
                }
            } else {
                if (user.checked) {
                    window.GLOBAL.personAddList.forEach(toy => {
                        self.$set(toy, "checked", false);
                    });
                    window.GLOBAL.personAddList = [];
                    window.GLOBAL.personAddList.push(user);
                } else {
                    window.GLOBAL.personAddList.forEach((toy, inx) => {
                        self.$set(toy, "checked", false);
                        if (toy.showName == user.showName) {
                            window.GLOBAL.personAddList.splice(inx, 1);
                        }
                    });
                }

            }
            var childArr = []
            //去重
            let dataArr = window.GLOBAL.personAddList;
            let hash = {};
            const data2 = dataArr.reduce((preVal, curVal) => {
                hash[curVal.id] ? "" : (hash[curVal.id] = true && preVal.push(curVal));
                return preVal;
            }, []);
            data2.forEach(idx => {
                if(idx.id.split("_").length>1 && idx.id.split("_")[1]){
                    idx.id=idx.id.split("_")[1]
                    idx.pid=idx.pid.split("_")[1]
                    if(idx.children && idx.children.length>0){
                        idx.children.forEach(inx => {
                            inx.id= inx.id.split("_").length>1 ? inx.id.split("_")[1] : inx.id.split("_")[0]
                            inx.pid=inx.pid.split("_").length>1 ? inx.pid.split("_")[1] : inx.pid.split("_")[1]
                        })
                    }
                }
            })
            window.GLOBAL.personAddList = data2;
            console.log("选中的父节点",window.GLOBAL.ParentNode)
            //如果父节点下的所有子元素都未选中，就取消父节点的选中状态
            window.GLOBAL.ParentNode.forEach(par => {
                let isParentNodeCheckedFalse=par.children.find(child => child.checked==true)
                let isParentNodeCheckedTrue=par.children.find(child => child.checked==false)
                if(isParentNodeCheckedFalse==undefined){
                    this.$delete(par,'checked')
                    this.$set(par,"checked",false)
                }
                if(isParentNodeCheckedTrue==undefined){
                    this.$delete(par,'checked')
                    this.$set(par,"checked",true)
                }
            })
            this.$emit('select', data2);
            this.$forceUpdate()
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";

.dsf-tree {
    @include font_4(true);
}
.tree_line .van-icon,.person .van-icon{
    line-height: unset !important;
}
.r_line{
    width: 1px;
    background: #dddddd;
    display: inline-block;
    height: 22px;
    margin-top: 10px;

}
.flex-box .van-icon{
    line-height: unset;
}
.isShowChiled{
    // width:70px;
    flex-shrink: 0;
    // height:100%;
    text-align: right;
    overflow: hidden;
    position: relative;
    &:before {
        position: absolute;
        left: 0;
        content: " ";
        @include background-theme("normal");
        display: inline-block;
        width: 1px;
        height: 100%;
    }
}
.isShowChiled .r_span{
    @include font-theme("normal");
    float: right;
    margin: 0px 6px 0px 15px;
}
.isShowChiled i{
    float: right;
    @include font-theme("normal");
    &:before{
        vertical-align: middle;
    }
}
.child_check{
    margin-right: 10px;
}
.tree_tit{
    // display:flex;
    margin-left: 5px;
    font-size: var(--font_size_2);
    color: #000;
    font-family: PingFangSC-Regular;
    flex:1;
}
.tree_tit :first-child{
    height:100%;
    display:inline-block;
    // max-width:144px;
    overflow: hidden;
    color: #000;
    // text-overflow:ellipsis;
    // white-space: nowrap;
}
.tree_tit .tit_width{
    max-width: 244px;
}
.tree_tit span{
    font-family: PingFangSC-Regular;
    font-size: var(--font_size_2);
    color: #A2A2A2;
    margin-left: 10px;
}
.tree_line{
    border-bottom: 1px solid #DDDDDD;
}
// .tit_right{
//     border-right: 1px solid;
//     @include border-right-theme("normal");
// }
.flex-box {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    min-height: 44px;
    line-height: 44px;
}
.person {
    height: 38px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ddd;
}
.person_child{
    width: 100%;
    height: 38px;
}
.person_child .username{
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 80%;
}
.user-logo {
    width: 22px;
    height: 22px;
    margin-right: 8px;
     line-height: 24px;
}
.user-logo i{
    @include font-theme("normal");
    font-size: var(--font_size_0);
}
.dept-icon {
    width: 22px;
    height: 22px;
    background-image: url("../../assets/imgs/workflow/icon_institution_level_one.png");
    background-size: cover;
    margin-right: 5px;
}

._c {
    @include font-theme('normal');
    @include font_3();
}
</style>
