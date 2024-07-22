<template>
<el-container class="setForm">
    <div style="width:100%">
        <el-divider content-position="left">登录</el-divider>
        <el-card>
            <el-form ref="form" label-position="left" :model="data.login" label-width="200px" size="medium" v-if="data">
                <el-form-item label="是否使用vpn">
                    <div class="el-row">
                        <div class="el el-col-4">
                            <el-select v-model="data.login.openVpnLogin" style="width:100%;">
                                <el-option label="true" :value="true"></el-option>
                                <el-option label="false" :value="false"></el-option>
                            </el-select>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="标题">
                    <div class="el-row">
                        <div class="el el-col-4">
                            <el-input el-input v-model="data.login.title" size="medium"></el-input>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="是否存储UUID">
                    <div class="el-row">
                        <div class="el el-col-4">
                            <el-select v-model="data.login.loginSaveUUID" style="width:100%;">
                                <el-option label="true" :value="true"></el-option>
                                <el-option label="false" :value="false"></el-option>
                            </el-select>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="默认跳转菜单">
                    <div class="el-row">
                        <div class="el el-col-4">
                            <el-input el-input v-model="data.login.defaultUrl" size="medium"></el-input>
                        </div>
                        <span style="color:#f56c6c">(仅在无页面footer时有效)</span>
                    </div>
                </el-form-item>
                <el-form-item label="是否自动登录">
                    <div class="el-row">
                        <div class="el el-col-4">
                            <el-select v-model="data.autoLogin" style="width:100%;">
                                <el-option label="true" :value="true"></el-option>
                                <el-option label="false" :value="false"></el-option>
                            </el-select>
                        </div>
                        <span style="color:#f56c6c">(必须在登录页勾选记住密码时有效)</span>
                    </div>
                </el-form-item>
                <el-form-item label="是否显示logo">
                    <div class="el-row">
                        <div class="el el-col-4">
                            <el-select v-model="data.login.isShowIcon" style="width:100%;">
                                <el-option label="true" :value="true"></el-option>
                                <el-option label="false" :value="false"></el-option>
                            </el-select>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="默认登录方式">
                    <div class="el-row">
                        <div class="el el-col-4">
                            <el-select v-model="data.login.defaultLoginType" style="width:100%;">
                                <el-option label="账号密码登录" value="user"></el-option>
                                <el-option label="短信验证码登录" value="sms"></el-option>
                            </el-select>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="是否显示短信验证码按钮">
                    <div class="el-row">
                        <div class="el el-col-4">
                            <el-select v-model="data.login.isShowSmsLogin" style="width:100%;">
                                <el-option label="true" :value="true"></el-option>
                                <el-option label="false" :value="false"></el-option>
                            </el-select>
                        </div>
                    </div>
                </el-form-item>
            </el-form>
        </el-card>
        
        <el-divider content-position="left">日程</el-divider>
        <el-card>
            <el-form ref="form" label-position="left" :model="data.scheduleCenter" label-width="200px" size="medium" v-if="data">
                <el-form-item label="日程是否使用通用模式">
                    <el-select v-model="data.scheduleCenter.isCommonList">
                        <el-option label="true" :value="true"></el-option>
                        <el-option label="false" :value="false"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="	通用模式的moduleId">
                    <div class="el-row">
                        <div class="el el-col-6">
                            <el-input el-input v-model="data.scheduleCenter.commonListModuleId" size="medium"></el-input>
                        </div>
                    </div>
                </el-form-item>
            </el-form>
        </el-card>

        <el-divider content-position="left">特殊列表跳转预览页列表id</el-divider>
        <el-card>
            <el-form ref="form" label-position="left" :model="data.scheduleCenter" label-width="200px" size="medium" v-if="data">
                <el-row>
                    <el-row v-if="data.specialList.previewPage.length">
                        <el-tag style="margin:0 5px;" :key="tag" v-for="(tag,index) in data.specialList.previewPage" closable :disable-transitions="false" @close="handleClose(data.specialList.previewPage,index)">
                            {{tag}}
                        </el-tag>
                    </el-row>
                    <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="previewPageTagInput" size="small" @keyup.enter.native="handleInputConfirm('previewPage')" @blur="handleInputConfirm('previewPage')">
                    </el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput('previewPage')">+ 新增</el-button>
                </el-row>
            </el-form>
        </el-card>

        <el-divider content-position="left">通用表单页配置</el-divider>
        <el-card>
            <el-form ref="form" label-position="left" :model="data.commonForm" label-width="200px" size="medium" v-if="data">
                <el-form-item label="表单布局方向">
                    <el-select v-model="data.commonForm.layout">
                        <el-option label="纵向" value="col"></el-option>
                        <el-option label="横向" value="row"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="标题后文本对齐">
                    <el-select v-model="data.commonForm.textlayout">
                        <el-option label="左对齐" value="left"></el-option>
                        <el-option label="右对齐" value="right"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否可编辑附件">
                    <el-select v-model="data.commonForm.canEditFile">
                        <el-option label="true" :value="true"></el-option>
                        <el-option label="false" :value="false"></el-option>
                    </el-select>
                </el-form-item>
                <el-row>
                    <el-form-item label="隐藏流程的模块ID">
                        <el-row v-if="data.commonForm.hideMoveStatus.length">
                            <el-tag style="margin:0 5px 0 0;" :key="tag" v-for="(tag,index) in data.commonForm.hideMoveStatus" closable :disable-transitions="false" @close="handleClose(data.commonForm.hideMoveStatus,index)">
                                {{tag}}
                            </el-tag>
                        </el-row>
                        <div class="el-row" v-if="inputVisible">
                            <div class="el-col el-col-6">
                                <el-input class="input-new-tag" v-model="inputValue" ref="hideMoveStatusTagInput" size="small" @keyup.enter.native="handleInputConfirm('hideMoveStatus')" @blur="handleInputConfirm('hideMoveStatus')">
                                </el-input>
                            </div>
                        </div>

                        <el-button v-else class="button-new-tag" size="small" @click="showInput('hideMoveStatus')">+ 新增</el-button>
                    </el-form-item>
                </el-row>
                <el-form-item label="表单项标题字号">
                    <el-input-number v-model="data.commonForm.fontLevel" controls-position="right" :min="1" :max="5"></el-input-number>
                </el-form-item>
                <el-form-item label="是否使用‘王’特殊样式">
                    <el-select v-model="data.commonForm.WangStyle">
                        <el-option label="true" :value="true"></el-option>
                        <el-option label="false" :value="false"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="底部按钮是否平铺">
                    <el-select v-model="data.commonForm.bottomBtnsTiled">
                        <el-option label="true" :value="true"></el-option>
                        <el-option label="false" :value="false"></el-option>
                    </el-select>
                </el-form-item>
                <el-divider content-position="left">审批意见按钮</el-divider>
                <el-form-item label="是否显示审批意见按钮">
                    <el-select v-model="data.commonForm.WriteOpinion.isShowBtn">
                        <el-option label="true" :value="true"></el-option>
                        <el-option label="false" :value="false"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="按钮名称">
                    <div class="el-row">
                        <div class="el el-col-4">
                            <el-input el-input v-model="data.commonForm.WriteOpinion.btnName" size="medium"></el-input>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="按钮图标">
                    <div class="el-row">
                        <div class="el el-col-4">
                            <el-input el-input v-model="data.commonForm.WriteOpinion.icon" size="medium"></el-input>
                        </div>
                    </div>
                </el-form-item>

                <el-divider content-position="left">手写签批按钮</el-divider>
                <el-form-item label="是否显示手写签批按钮">
                    <el-select v-model="data.commonForm.YoZoHandWrite.isShowBtn">
                        <el-option label="true" :value="true"></el-option>
                        <el-option label="false" :value="false"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="按钮名称">
                    <div class="el-row">
                        <div class="el el-col-4">
                            <el-input el-input v-model="data.commonForm.YoZoHandWrite.btnName" size="medium"></el-input>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="按钮图标">
                    <div class="el-row">
                        <div class="el el-col-4">
                            <el-input el-input v-model="data.commonForm.YoZoHandWrite.icon" size="medium"></el-input>
                        </div>
                    </div>
                </el-form-item>
            </el-form>
        </el-card>

        <el-divider content-position="left">钉钉相关</el-divider>
        <el-card>
            <el-form ref="form" label-position="left" label-width="200px" size="medium" v-if="data">
                <el-form-item label="金格码">
                    <div class="el-row">
                        <div class="el-col el-col-10">
                            <el-input type="textarea" rows="5" v-model="data.ddSetting.Kingecode" placeholder=""></el-input>
                        </div>
                    </div>
                </el-form-item>
            </el-form>
        </el-card>
        
        <el-divider content-position="left">手写签批意见配置</el-divider>
        <el-card>
            <el-form ref="form" label-position="left" label-width="200px" size="medium" v-if="data">
                <el-form-item label="是否启用手写签批意见">
                    <div class="el-row">
                        <div class="el el-col-4">
                            <el-select v-model="mainConfig.data.commonFlow.needHandWrite" style="width:100%;">
                                <el-option label="true" :value="true"></el-option>
                                <el-option label="false" :value="false"></el-option>
                            </el-select>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="点击代办列表是否跳转永中签批页面(不跳转表单)">
                    <div class="el-row">
                        <div class="el el-col-4">
                            <el-select v-model="mainConfig.data.commonFlow.yozoHandWrite" style="width:100%;">
                                <el-option label="true" :value="true"></el-option>
                                <el-option label="false" :value="false"></el-option>
                            </el-select>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="当前节点未签名时发送弹层上是否显示签名按钮">
                    <div class="el-row">
                        <div class="el el-col-4">
                            <el-select v-model="mainConfig.data.commonFlow.nodeNeedSignBtn" style="width:100%;">
                                <el-option label="true" :value="true"></el-option>
                                <el-option label="false" :value="false"></el-option>
                            </el-select>
                        </div>
                    </div>
                </el-form-item>
            </el-form>
        </el-card>

        <el-divider content-position="left">应用中心定制</el-divider>
        <el-card>
            <el-form ref="form" label-position="left" label-width="200px" size="medium" v-if="data">
                <el-form-item label="是否启用我的菜单定制功能">
                    <div class="el-row">
                        <div class="el el-col-4">
                            <el-select v-model="mainConfig.data.appSelect.isShowMyMenus" style="width:100%;">
                                <el-option label="true" :value="true"></el-option>
                                <el-option label="false" :value="false"></el-option>
                            </el-select>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="仅一个一级菜单时是否隐藏一级标题">
                    <div class="el-row">
                        <div class="el el-col-4">
                            <el-select v-model="mainConfig.data.appSelect.isHideTitle" style="width:100%;">
                                <el-option label="隐藏" :value="true"></el-option>
                                <el-option label="显示" :value="false"></el-option>
                            </el-select>
                        </div>
                    </div>
                </el-form-item>
            </el-form>
        </el-card>

        <el-divider content-position="left">应用中心顶部轮播图</el-divider>
        <el-card>
            <el-form ref="form" label-position="left" label-width="200px" size="medium" v-if="data">
                <el-form-item label="是否显示">
                    <div class="el-row">
                        <div class="el el-col-4">
                            <el-select v-model="mainConfig.data.appSwiper.isShow" style="width:100%;">
                                <el-option label="true" :value="true"></el-option>
                                <el-option label="false" :value="false"></el-option>
                            </el-select>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="轮播图高度">
                    <div class="el-row">
                        <div class="el el-col-6">
                            <el-radio v-model="mainConfig.data.appSwiper.isPercent" :label="true">使用屏高百分比</el-radio>
                            <el-radio v-model="mainConfig.data.appSwiper.isPercent" :label="false">使用固定高度</el-radio>
                            <el-input el-input v-model="mainConfig.data.appSwiper.height" type="number" size="medium">
                                <template slot="append">
                                    <span v-if="mainConfig.data.appSwiper.isPercent">vh</span>
                                    <span v-else>px</span>
                                </template>
                            </el-input>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="自动轮播间隔">
                    <div class="el-row">
                        <div class="el el-col-6">
                            <el-input el-input v-model="mainConfig.data.appSwiper.autoplay" type="number" size="medium">
                                <template slot="append">ms</template>
                            </el-input>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="轮播图路径">
                    <el-row v-if="mainConfig.data.appSwiper.imgUrls.length">
                        <el-tag style="margin:0 5px 0 0;" :key="tag" v-for="(tag,index) in mainConfig.data.appSwiper.imgUrls" closable :disable-transitions="false" @close="handleClose(mainConfig.data.appSwiper.imgUrls,index)">
                            {{tag}}
                        </el-tag>
                    </el-row>
                    <div class="el-row" v-if="inputVisible">
                        <div class="el-col el-col-6">
                            <el-input class="input-new-tag" v-model="inputValue" ref="appSwiperTagInput" size="small" @keyup.enter.native="handleInputConfirm('appSwiper')" @blur="handleInputConfirm('appSwiper')">
                            </el-input>
                        </div>
                    </div>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput('appSwiper')">+ 新增</el-button>
                </el-form-item>
                <el-form-item label="获取轮播图接口url">
                    <div class="el-row">
                        <div class="el el-col-6">
                            <el-input el-input v-model="mainConfig.data.appSwiper.url" size="medium"></el-input>
                        </div>
                    </div>
                </el-form-item>
            </el-form>
        </el-card>

        <el-divider content-position="left">移动端聊天相关配置</el-divider>
        <el-card>
            <el-form ref="form" label-position="left" label-width="200px" size="medium" v-if="data">
                <el-form-item label="scoket地址">
                    <div class="el-row">
                        <div class="el el-col-6">
                            <el-input el-input v-model="data.IMSetting.scoketServe" size="medium"></el-input>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="IM聊天后台接口地址">
                    <div class="el-row">
                        <div class="el el-col-6">
                            <el-input el-input v-model="data.IMSetting.IMserverUrl" size="medium"></el-input>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="IM获取OA数据接口地址">
                    <div class="el-row">
                        <div class="el el-col-6">
                            <el-input el-input v-model="data.IMSetting.IMoaServer" size="medium"></el-input>
                        </div>
                    </div>
                </el-form-item>
            </el-form>
        </el-card>
        
        <el-divider content-position="left">移动端二级页面头部返回栏<span style="color:#f56c6c">（必须配合appFooter底部菜单配置功能一起使用）</span></el-divider>
        <el-card>
            <el-form ref="form" label-position="left" label-width="200px" size="medium" v-if="data">
                <el-form-item label="是否显示">
                    <div class="el-row">
                        <div class="el el-col-4">
                            <el-select v-model="mainConfig.data.appTopMenu.value" style="width:100%;">
                                <el-option label="true" :value="true"></el-option>
                                <el-option label="false" :value="false"></el-option>
                            </el-select>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="不显示头部返回栏的二级页面">
                    <el-row v-if="data.appTopMenu.filterRouter.length">
                        <el-tag style="margin:0 5px 0 0;" :key="tag" v-for="(tag,index) in data.appTopMenu.filterRouter" closable :disable-transitions="false" @close="handleClose(data.appTopMenu.filterRouter,index)">
                            {{tag}}
                        </el-tag>
                    </el-row>
                    <div class="el-row" v-if="inputVisible">
                        <div class="el-col el-col-6">
                            <el-input class="input-new-tag" v-model="inputValue" ref="appTopMenuTagInput" size="small" @keyup.enter.native="handleInputConfirm('appTopMenu')" @blur="handleInputConfirm('appTopMenu')">
                            </el-input>
                        </div>
                    </div>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput('appTopMenu')">+ 新增</el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <el-divider content-position="left">预览设置</el-divider>
        <el-card>
            <el-form ref="form" label-position="left" label-width="200px" size="medium" v-if="data">
                <el-form-item label="预览位置">
                    <div class="el-row">
                        <div class="el el-col-6">
                            <el-input el-input v-model="data.previewSetting.previewLocation" size="medium"></el-input>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="预览类型">
                    <div class="el-row">
                        <div class="el el-col-6">
                            <el-input el-input v-model="data.previewSetting.previewType" size="medium"></el-input>
                        </div>
                    </div>
                </el-form-item>
            </el-form>
        </el-card>

        <el-divider content-position="left">表单聊天设置</el-divider>
        <el-card>
            <el-form ref="form" label-position="left" label-width="200px" size="medium" v-if="data">
                <el-form-item label="聊天地址">
                    <el-input el-input v-model="data.formChat.chatLocation" size="medium"></el-input>
                </el-form-item>
            </el-form>
        </el-card>

        <el-divider content-position="left">浦东会议设置</el-divider>
        <el-card>
            <el-form ref="form" label-position="left" label-width="200px" size="medium" v-if="data">
                <el-form-item label="数据接口">
                    <div class="el-row">
                        <div class="el el-col-6">
                            <el-input el-input v-model="data.pudongMeetingSetting.oaServer" size="medium"></el-input>
                        </div>
                    </div>
                </el-form-item>
            </el-form>
        </el-card>

        <el-divider content-position="left">江苏政务服务网设置</el-divider>
        <el-card>
            <el-form ref="form" label-position="left" label-width="200px" size="medium" v-if="data">
                <el-form-item label="数据接口"> 
                    <div class="el-row">
                        <div class="el el-col-6">
                            <el-input el-input v-model="data.JSZWFW_Setting.oaServer" size="medium"></el-input>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="大汉用户信息接口">
                    <div class="el-row">
                        <div class="el el-col-6">
                            <el-input el-input v-model="data.JSZWFW_Setting.dahanServer" size="medium"></el-input>
                        </div>
                    </div>
                </el-form-item>
            </el-form>
        </el-card>

        <br />
        <br />
    </div>

</el-container>
</template>

<script>
export default {
    props: {
        mainConfig: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            inputVisible: false,
            inputValue: "",
        }
    },
    computed: {
        data() {
            return this.mainConfig.data
        }
    },
    created() {
        this.initData()
    },
    methods: {
        initData() {

        },
        paramsChange(e, index) {

        },
        paramsToString(data) {
            return JSON.stringify(data)
        },
        handleClose(list, index){
            list.splice(index, 1)
        },
        handleInputConfirm(type) {
            console.log(type)
            let inputValue = this.inputValue;
            if (inputValue) {
                switch(type){
                    case 'hideMoveStatus':
                        this.data.commonForm.hideMoveStatus.push(inputValue);
                        break
                    case 'previewPage':
                        this.data.specialList.previewPage.push(inputValue);
                        break
                    case 'appTopMenu': 
                        this.data.appTopMenu.filterRouter.push(inputValue);
                        break
                    case 'appSwiper': 
                        this.data.appSwiper.imgUrls.push(inputValue);
                        break
                    default: 
                        break
                }
            }
            this.inputVisible = false;
            this.inputValue = '';
        },
        showInput(type) {
            this.inputVisible = true;
            this.$nextTick(_ => {
                this.$refs[`${type}TagInput`].$refs.input.focus();
            });
        },
        changeSelect(val, index) {

        }
    }
}
</script>

<style lang="scss" scoped>
.setForm {
    ::v-deep.el-col {
        margin-bottom: 10px;
    }

    .card_add {
        height: 100%;
        text-align: center;

        i {
            font-size: 70px;
            line-height: 145px;
        }
    }
}
</style>
