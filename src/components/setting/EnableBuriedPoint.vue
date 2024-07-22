<template>
    <el-container class="setForm">
        <div style="width:100%">
            <el-divider content-position="left">app应用信息采集<span style="color:#f56c6c">(该配置作用：浙政钉是是否启用应用信息采集功能)</span></el-divider>
            <el-card class="box-card">
                <el-row>
                    <el-form ref="form" label-position="left" label-width="200px" size="medium">
                        <el-form-item label="是否启用">
                            <div class="el el-col-4">
                                <el-select v-model="data.EnableBuriedPoint.value">
                                    <el-option :value="true" label="是"></el-option>
                                    <el-option :value="false" label="否"></el-option>
                                </el-select>
                            </div>
                        </el-form-item>
                        <div class="clearfix">
                            <i style="float: left;display:block;font-size: var(--font_size_0);">节点配置</i>
                        </div>
                        <el-row :gutter="20">
                            <el-col v-for="(item,index) in data.EnableBuriedPoint.itemSetting" :span="12" :key="index">
                                <el-card>
                                    <div slot="header" class="clearfix">
                                        <i style="float: right;display:block;font-size: var(--font_size_0);" class="el-icon-error" circle @click="del(item,index)"></i>
                                    </div>
                                    <el-form ref="form" label-position="left" label-width="200px" size="medium">
                                        <el-form-item label="路由名称">
                                            <el-input v-model="item.appRouter" size="medium"></el-input>
                                        </el-form-item>
                                        <el-form-item label="sappId">
                                            <el-input v-model="item.sappId" size="medium"></el-input>
                                        </el-form-item>
                                        <el-form-item label="sappName">
                                            <el-input v-model="item.sappName" size="medium"></el-input>
                                        </el-form-item>
                                        <el-divider content-position="left">稳定性监控配置</el-divider>
                                        <el-form-item label="bid">
                                            <el-input v-model="item.config.bid" size="medium"></el-input>
                                        </el-form-item>
                                        <el-form-item label="签名">
                                            <el-input v-model="item.config.signkey" size="medium"></el-input>
                                        </el-form-item>
                                        <el-form-item label="微服务网关">
                                            <el-input v-model="item.config.gateway" size="medium"></el-input>
                                        </el-form-item>
                                    </el-form>
                                </el-card>
                            </el-col>
                            <el-col :span="12" style="margin-bottom:10px;">
                                <el-card class="box-card card_add">
                                    <i class="el-icon-plus" style="" @click="addTab()"></i>
                                </el-card>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-row>
            </el-card>
        </div>
    </el-container>
</template>

<script>
export default {
    name:"EnableBuriedPoint",
    props:{
    mainConfig: {
        type: Object,
        default(){
            return {}
        }
    }
    },
    computed:{
    data(){
        return this.mainConfig.data
    }
    },
    created(){
        this.initConfig()
    },
    methods:{
        initConfig(){},
        del(item,index){
            this.mainConfig.data.EnableBuriedPoint.itemSetting.splice(index, 1)
        },
        addTab(){
            let val ={
                "appRouter": "",
                "sappId": "",
                "sappName": "",
                "config": {
                    "bid": "",
                    "signkey": "",
                    "gateway": ""
                }
            }
            this.mainConfig.data.EnableBuriedPoint.itemSetting.push(val)
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
        text-align: center;
        box-sizing: border-box;

        i {
            font-size: 70px;
            line-height: 116px;
        }
    }
}
</style>
