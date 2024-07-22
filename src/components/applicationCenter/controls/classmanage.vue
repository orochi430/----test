<template>
    <div>
        <div class="tabClass" v-if="classinfo.classname">
            <label class="classname">{{classinfo.classname}}</label>
            <van-button type="info" class="btn" @click="showClassPicker">切换</van-button>
        </div>
        <div class="dsf-list" :style="{ marginTop: isHideTitle ? '0.3rem' : 0 }" v-if="alwaysShowChildren.length>pageSize">
            <van-swipe :loop="false">
                <van-swipe-item v-for="(group, index) in menuList" :key="index">
                    <application-item :key="subIndex" v-for="(subItem, subIndex) in group" :data="subItem"></application-item>
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="dsf-list" :style="{ marginTop: isHideTitle ? '0.3rem' : 0 }" v-else>
            <application-item :key="subIndex" v-for="(subItem, subIndex) in alwaysShowChildren" :data="subItem"
                v-if="subItem.isshow"></application-item>
        </div>
        <!-- 切换班次弹窗 -->
        <van-popup class="class-popup"  v-model="classinfo.showPicker" position="bottom"  round  :style="{ height: '100%' }">
            <div class="tit-box">
                <h5>选择班次</h5>
                <div class="btns">
                    <span class="sure-btn" @click="confirmClass" v-if="classinfo.classlist.length>0">确认</span>
                    <span class="cancle-btn" @click="cancleClass">取消</span>
                </div>
            </div>
            <div class="bcist-con">
                <!-- <van-sidebar class="bcist-tabs" v-model="classinfo.bclistIndex">
                    <van-sidebar-item title="所有班次" />
                </van-sidebar> -->
                <ul class="sidebar-content" v-if="classinfo.classlist.length>0">
                    <template v-for="(item,index) in classinfo.classlist">
                        <li :class="[classinfo.selid == item.bcid ? 'active' : '']"  :key="index" @click="selClass(item)">{{item.bcmc}}</li>
                    </template>
                </ul>
                <div class="sidebar-content nodata"  v-else>
                    <commonempty></commonempty>
                </div>
            </div>
        </van-popup>
        <iframe :src="jwloginsso" class="hideiframe" v-if="jwloginsso"></iframe>
    </div>
</template>
  
<script>
import applicationItem from "../applicationItem"
import Vue from 'vue';
import { Sidebar, SidebarItem } from 'vant';
Vue.use(Sidebar);
Vue.use(SidebarItem);
export default {
    components: {
        applicationItem,
    },
    props: {
        menu: {
            type: Object,
            default: () => {
                return {
                    badge: "",
                    child: [],
                    img: "",
                    name: "",
                    props: "",
                    router: "",
                    showClickTip: "",
                    imgStyle: "{}",
                    style: "{}",
                    type: ""
                }
            }
        },
        showIcon: {
            type: Boolean,
            default: true
        },
        isHideTitle: {
            type: Boolean,
            default: false
        },
        maxRows: {
            type: Number,
        },
        rowNum: {
            type: Number,
            default: 4
        }
    },
    data() {
        return {
            showMoreMenu: false,
            isMaxRowsMenu: false,
            //教务单点
            jwloginsso: dsf.config.login.jwloginsso || "", //"http://localhost:8006/#/zydx/test",
            //班次信息
            classinfo:{
                classname:"",
                classid: "",
                selname: "",
                selid:"",
                classlist: [],
                showPicker: false,
                bclistIndex: 0,
                defaultIndex:0
            },
            menunumlist:[],//角标列表
        }
    },
    computed: {
        isShowCard() {
            return this.menu.child.some(item => item.isshow)
        },
        alwaysShowChildren() {
            let length = this.maxRows ? this.maxRows * this.rowNum : this.menu.child.length
            return this.menu.child.filter(item => item.isshow).slice(0, length)
        },
        collapseChildren() {
            let length = this.maxRows ? this.maxRows * this.rowNum : this.menu.child.length
            return this.menu.child.filter(item => item.isshow).slice(length)
        },
        // 一页几个
        pageSize() {
            return (this.maxRows || 2) * this.rowNum;
        },
        // 页数
        pages() {
            let pages = Math.ceil(this.alwaysShowChildren.length / this.pageSize);
            return pages;
        },
        menuList() {
            let arr = this.alwaysShowChildren;
            let res = [];
            let pageSize = this.pageSize;
            for (let i = 0; i < this.pages; i++) {
                res.push(arr.slice(i * pageSize, i * pageSize + pageSize));
            }
            return res
        }
    },
    created() {
        if (this.maxRows) {
            let showMaxRowsMenu = this.menu.child.filter(subItem => {
                return subItem.isshow
            })
            if (showMaxRowsMenu.length > this.rowNum * this.maxRows) {
                this.showMoreMenu = true
                this.isMaxRowsMenu = true
            }
        }
        this.getJwMessage();
    },
    mounted() {
    },
    methods: {
        // 折叠
        collapse() {
            this.showMoreMenu = !this.showMoreMenu
        },
        //接收教务传回的数据
        getJwMessage(){
            let self = this;
            window.addEventListener('message',function(event){
                if(event.data && event.data.type){
                    let data = event.data;
                    if(data.type == "getNum"){//获取角标
                        let menunumlist = data.list;
                        self.menunumlist = menunumlist;
                        self.setMenuNum();
                    }
                    if(data.type == "getClass"){//获取班次列表
                        self.classinfo.classlist = [];
                        let classlist = data.list;
                        classlist.forEach((item,index)=>{
                            if(item.checked==true){
                                self.classinfo.classname = item.bcmc;
                                self.classinfo.classid = item.bcid;
                                self.classinfo.defaultIndex = index;
                            }
                            self.classinfo.classlist.push({
                                bcmc:item.bcmc,
                                bcid:item.bcid,
                            });
                        })
                    }
                    if(data.type == "turnBcSuccess"){//切换班次成功
                        dsf.layer.closeLoading(self.loadingIndx);
                        self.classinfo.classname = self.classinfo.selname;
                        self.classinfo.classid = self.classinfo.selid;
                        self.classinfo.showPicker = false;
                    }
                    if(data.type == "turnBcFailed"){//切换班次失败
                        dsf.layer.closeLoading(self.loadingIndx);
                        dsf.layer.toast("班次切换失败", false);
                    }
                }
            })
        },
        //显示选择班次
        showClassPicker(){
            this.classinfo.selname = this.classinfo.classname;
            this.classinfo.selid = this.classinfo.classid;
            this.classinfo.showPicker = true;
        },
        // 班次选择
        selClass(item){
            this.classinfo.selname = item.bcmc;
            this.classinfo.selid = item.bcid;
        },
        // 确认班次
        confirmClass(){
            // let self = this;
            // let obj = {
            //     apiUrl: dsf.config.login.jwapiOrgin+"web/jwgl/bgcl/organizerSwitchClass",  
            //     classid: self.classinfo.selid,
            //     postType: "post"
            // }
            // dsf.http.get("/ctrl/forward", obj)
            // .then(res => {
            //     if(res && res.data.type=="success"){
            //         self.classinfo.classname = self.classinfo.selname;
            //         self.classinfo.classid = self.classinfo.selid;
            //         localStorage.setItem("now_bcid", self.classinfo.selid);
            //         localStorage.setItem("now_bcname", self.classinfo.selname);
            //         self.classinfo.showPicker = false;
            //     }else{
            //         self.dsf.layer.toast(res.data.message, false);
            //     }
            // })
            // .catch(err => {
            //     reject(err.data);
            // })
            //$(".hideiframe")[0].contentWindow.vueobj && $(".hideiframe")[0].contentWindow.vueobj.tabClass && $(".hideiframe")[0].contentWindow.vueobj.tabClass(obj);

            this.loadingIndx = dsf.layer.loading("切换中...")
            let wn = $(".hideiframe")[0].contentWindow;
            let obj = {
                type: "turnbc",
                id: this.classinfo.selid
            }
            wn.postMessage(obj, '*');
        },
        // 取消班次
        cancleClass(){
            this.classinfo.showPicker = false;
        },
        //角标赋值
        setMenuNum(){
            let self = this;
            let menunumlist = self.menunumlist;
            if(self.alwaysShowChildren.length > self.pageSize){
                let mainMenu = self.menuList;
                menunumlist.forEach(item=>{
                    let appsubscript = item.appsubscript;
                    mainMenu.forEach(menu=>{
                        menu.forEach(sub=>{
                            if(sub.name == appsubscript){
                                this.$set(sub,"badgeNum",item.number);
                            }
                        });
                    });
                });
            }else{
                let mainMenu = self.alwaysShowChildren;
                menunumlist.forEach(item=>{
                    let appsubscript = item.appsubscript;
                    mainMenu.forEach(menu=>{
                        if(menu.name == appsubscript){
                            this.$set(menu,"badgeNum",item.number);
                        }
                    });
                });
            }
        },
    }
}
</script>
<style lang="scss" scoped>
@import "../application.scss";
.hideiframe {
    display: none;
}
.tabClass {
    display: flex;
    padding: 0 0.4rem;
    .classname {
        width: calc(100% - 1.4rem);
        @include font_4;
        line-height: 0.5rem;
        // text-overflow: -o-ellipsis-lastline;
        // overflow: hidden;
        // text-overflow: ellipsis;
        // display: -webkit-box;
        // -webkit-line-clamp: 2;
        // line-clamp: 2;
        // -webkit-box-orient: vertical;
    }
    .btn {
        width: 1.2rem;
        height: 0.5rem;
        margin-left: 0.2rem;
        padding: 0;
        line-height: 0.5rem;
        text-align: center;
        border-radius: 4px;
    }
    ::v-deep .van-button__text {
        line-height: 100%;
    }
}
.class-popup{
    max-height: 100%;
    display: flex;
    flex-direction: column;
    .tit-box{
      position: relative;
      h5{
        height: 0.8rem;
        line-height: 0.8rem;
        color: #333;
        padding: 0 0.3rem;
        font-weight: normal;
      }
      .btns {
        position: absolute;
        right: 0.3rem;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        span {
            margin-left: 0.3rem
        }
        .sure-btn{
            @include font-theme("normal");
        }
      }
    }
    .bcist-con{
      flex: 1;
      display: flex;
      height: calc(100% - 0.8rem);
      .van-sidebar-item--select::before{
        @include background-theme("normal");
      }
      .sidebar-content{
        flex: 1;
        padding: 0.2rem;
        overflow-y: auto;
        li{
          color: #333;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
          margin-bottom: 0.2rem;
          line-height: 0.40rem;
          font-size: .28rem;
          &.active{
            @include font-theme("normal");
          }
        }
      }
    }
}
::v-deep .van-popup--bottom.van-popup--round {
    border-radius: 0;
}
::v-deep .van-swipe {
    padding-bottom: 0.24rem;
    padding-top: 0.3rem;
}
::v-deep .van-swipe__indicator {
    width: 0.06rem;
    height: 0.06rem;
    //background-color: #aaa;
    @include background-theme("normal", "true");
    opacity: 1;
    border-radius: 0.1rem;
    transition: all .3s linear;
}
::v-deep .van-swipe__indicator--active {
    width: 0.2rem;
}
</style>
  