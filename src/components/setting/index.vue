<template>
<div class="box">
    <el-container class="setting">
      <el-aside width="200px">
        <h5 style="line-height:40px;">配置导出</h5>
        <el-menu
            default-active="0"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            @select="handleSelect">
            <el-submenu v-for="(item,index) in configList" :key="index" index="1">
                <template slot="title">
                    <span>{{ item.title }}</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item v-for="(itm) in item.children" :index="itm.id" :disabled="itm.id=='-1'" :key="itm.type">{{ itm.title }}</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            
        </el-menu>
        
      </el-aside>
      <el-container>
        <el-header>
            <el-row>
                <el-col :span="20" :push="1">
                    {{ mainConfig.title }}
                </el-col>
                <el-col :span="4" >
                    <el-button type="primary" @click="previewVisible = true">预览</el-button>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <meeting-config v-if="mainConfig.type=='meetingConfig'" :main-config="mainConfig"></meeting-config>
            <app-footer v-if="mainConfig.type=='appFooter'" :main-config="mainConfig"></app-footer>
            <common-form-tab v-if="mainConfig.type=='commonFormTab'" :main-config="mainConfig"></common-form-tab>
            <userShowTypes v-if="mainConfig.type=='userShowTypes'" :main-config="mainConfig"></userShowTypes>
            <specialCommon v-if="mainConfig.type=='specialCommon'" :main-config="mainConfig"></specialCommon>
            <homePage v-if="mainConfig.type=='homePage'" :main-config="mainConfig"></homePage>
            <myInfoSet v-if="mainConfig.type=='myInfoSet'" :main-config="mainConfig"></myInfoSet>
            <commonTab v-if="mainConfig.type=='commonTab'" :main-config="mainConfig"></commonTab>
            <commonSchedule v-if="mainConfig.type=='commonSchedule'" :main-config="mainConfig"></commonSchedule>
            <enableBuriedPoint v-if="mainConfig.type=='EnableBuriedPoint'" :main-config="mainConfig"></enableBuriedPoint>
            <addressList v-if="mainConfig.type=='addressList'" :main-config="mainConfig"></addressList>
            <specialList v-if="mainConfig.type=='specialList'" :main-config="mainConfig"></specialList>
            
        </el-main>
        <el-footer>
            <el-row type="flex" >
                
            </el-row>
        </el-footer>
      </el-container>
      <el-popover
        :visible-arrow="true"
        v-model="showResult"
        placement="top"
        width="700"
        title="请将以下配置内容复制到config.json文件中，路径：dist/static/config.json"
        popper-class="dcResult"
        trigger="click">
        <i class="el-icon-error closePro" @click="showResult=!showResult"></i>
            <el-input
            :autosize="{ minRows: 5 , maxRows:25 }"
            v-model="setContent"
            type="textarea"
            placeholder="配置内容" />
        </el-popover>
    </el-container>

    <el-dialog :visible.sync="previewVisible" width="70%" top="6vh" :lock-scroll="false">
        <pre style="height:65vh;overflow:auto">
            {{setContent}}
        </pre>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleClick();previewVisible=false">配置导出</el-button>
        </span>
    </el-dialog>
</div>
    
</template>
<script>
import meetingConfig from "./meetingConfig"
import appFooter from "./appFooter"
import commonFormTab from './commonFormTab.vue'
import userShowTypes from './userShowTypes.vue'
import specialCommon from './specialCommon.vue'
import myInfoSet from './myInfoSet.vue'
import homePage from './homePage.vue'
import commonTab from './commonTab.vue'
import commonSchedule from './commonSchedule.vue'
import enableBuriedPoint from './EnableBuriedPoint.vue'
import addressList from './addressList.vue'
import specialList from './specialList.vue'
import Vue from "vue";
import {
    InputNumber,
    Radio,
    Dialog,
	Container,
	Aside,
	Menu,
	Submenu,
	MenuItem,
	MenuItemGroup,
	Header,
	Row as Row_El,
	Col as Col_El,
	Main,
	Footer,
	Popover as Popover_El,
	Input,
	Divider,
	Card,
	Form as Form_El,
	FormItem,
	ColorPicker,
	Select,
	Option,
	Tag as Tag_El,
	Button as Button_El
} from 'element-ui';
Vue.use(Container)
.use(InputNumber)
.use(Radio)
.use(Dialog)
.use(Aside)
.use(Menu)
.use(Submenu)
.use(MenuItem)
.use(MenuItemGroup)
.use(Header)
.use(Row_El)
.use(Col_El)
.use(Main)
.use(Footer)
.use(Popover_El)
.use(Input)
.use(Divider)
.use(Card)
.use(Form_El)
.use(FormItem)
.use(ColorPicker)
.use(Select)
.use(Option)
.use(Tag_El)
.use(Button_El)
import 'element-ui/lib/theme-chalk/index.css';
export default {
    name:"setting",
    components:{
        meetingConfig,
        appFooter,
        commonFormTab,
        userShowTypes,
        specialCommon,
        homePage,
        myInfoSet,
        commonTab,
        commonSchedule,
        enableBuriedPoint,
        addressList,
        specialList
    },
    data(){
        return {
            configList:[],
            mainConfig:{},
            title: '移动配置',
            setContent:{},
            showResult:false,
            logConfig:{},
            showlog:false,
            previewVisible:false
        }
    },
    computed:{
        
    },
    watch:{
        configList:{
            handler(newval,oldval){
                this.getChange(newval)
            },
            deep:true
        }
    },
    created (){
        this.getConfig()
    },
    methods:{
        handleOpen(){

        },
        handleClose(){

        },
        handleLog(){
            req.getConfig("static/log.json",res=>{
                this.logConfig=res.data
                this.showlog=true
            })
        },
        handleClick(){
            // this.showResult=!this.showResult
            dsf.http.post("fn/mobileConfigJSON/save",{data:this.setContent})
            .then(res=>{
                if(res.data.type=="error"){
                    this.$notify({
                        title: '提示',
                        message: res.data.message,
                        type:"error"
                    });
                }else{
                    this.$notify({
                        title: '提示',
                        message: res.data.message,
                        type:"success"
                    });
                }
            })
            // console.log(this.setContent)
        },
        getSetConfig(){
            
        },
        getConfig(){
          dsf.http.get("static/config.json")
          .then(res=>{
            console.log(res)
            let data=res.data;
            let meetingConfig=data.meetingConfig
            let config=[{
                        id:"0",
                        title:"移动配置",
                        children:[
                            {
                                id:"-1",
                                title:"全局配置",
                                type:"globalConfig",
                                icon:"",
                                data:data
                            },
                            {
                                id:"0",
                                title:"会议接口地址配置",
                                type:"meetingConfig",
                                icon:"el-icon-menu",
                                data:{
                                    meetingConfig:meetingConfig
                                }
                            },
                            {
                                id:"1",
                                title:"页面footer配置",
                                type:"appFooter",
                                icon:"el-icon-menu",
                                data:{
                                    appFooter:data.appFooter
                                }
                            },
                            {
                                id:"2",
                                title:"表单tab页配置",
                                type:"commonFormTab",
                                icon:"el-icon-menu",
                                data:{
                                    formTab:data.formTab
                                }
                            },
                            {
                                id:"3",
                                title:"个人信息展示配置",
                                type:"userShowTypes",
                                icon:"el-icon-menu",
                                data:{
                                    mailList:data.mailList
                                }
                            },
                            {
                                id:"4",
                                title:"特殊通用配置",
                                type:"specialCommon",
                                icon:"el-icon-menu",
                                data:{
                                    appSwiper: data.appSwiper,
                                    JSZWFW_Setting:data.JSZWFW_Setting,
                                    pudongMeetingSetting:data.pudongMeetingSetting,
                                    formChat:data.formChat,
                                    previewSetting:data.previewSetting,
                                    appTopMenu:data.appTopMenu,
                                    IMSetting:data.IMSetting,
                                    appSelect:data.appSelect,
                                    scheduleCenter:data.scheduleCenter,
                                    ddSetting:data.ddSetting,
                                    specialList:data.specialList,
                                    commonForm:data.commonForm,
                                    autoLogin:data.autoLogin,
                                    commonFlow:data.commonFlow,
                                    commonTabs:data.commonTabs,
                                    login:data.login
                                }
                            },
                            {
                                id:"5",
                                title:"首页配置",
                                type:"homePage",
                                icon:"el-icon-menu",
                                data:{
                                    homePage:data.homePage
                                }
                            },
                            {
                                id:"6",
                                title:"我的页面",
                                type:"myInfoSet",
                                icon:"el-icon-menu",
                                data:{
                                    myInfo:data.myInfo
                                }
                            },
                            {
                                id:"7",
                                title:"通用tab功能配置",
                                type:"commonTab",
                                icon:"el-icon-menu",
                                data:{
                                    commonTabs:data.commonTabs
                                }
                            },
                            {
                                id:"8",
                                title:"通用日程功能配置",
                                type:"commonSchedule",
                                icon:"el-icon-menu",
                                data:{
                                    homePage:data.homePage
                                }
                            },
                            {
                                id:"9",
                                title:"app应用信息采集配置",
                                type:"EnableBuriedPoint",
                                icon:"el-icon-menu",
                                data:{
                                    EnableBuriedPoint:data.EnableBuriedPoint
                                }
                            },
                            {
                                id:"10",
                                title:"通讯录tab页配置",
                                type:"addressList",
                                icon:"el-icon-menu",
                                data:{
                                    addressList:data.addressList
                                }
                            },
                            {
                                id:"11",
                                title:"特殊列表配置",
                                type:"specialList",
                                icon:"el-icon-menu",
                                data:{
                                    listJson:data.listJson
                                }
                            }
                        ]
                    }]
            this.mainConfig=config[0].children[1]
            console.log(this.mainConfig)
            this.setContent=res.data
            this.configList=config
          })
        },
        handleSelect(index){
            let inx=Number(index)+1
            const list=this.configList[0].children
            this.mainConfig=list[inx]
        },
        getChange(newval){
            this.setContent={}
            let list=newval[0].children
            list.forEach(item=>{
                const child=item.data
                Object.assign(this.setContent,child)
                // console.log(this.setContent)
            })
            this.setContent=JSON.stringify(this.setContent,null,1000)
        },
    }
}
</script>
<style lang="scss" scoped>
.box{
    height:100%;
}
.setting{
    height:100%;
   .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        height:60px;
        line-height: 1.2rem;
    }
    .el-aside {
        height:100%;
        background-color: #858e98;
        color: #333;
        text-align: center;
    }
    
    .el-footer{
        position: fixed;
        bottom: 0;
        width: 100%;
    }
    ::v-deep .dcResult{
        top: 10px;
        left: 50%;
        margin-left: -350px;
    }
    .closePro{
        float: right;
        font-size: var(--font_size_4);
        color: #409EFF;
    }
    .el-main{
         overflow-y: scroll;
    }
}
    


</style>