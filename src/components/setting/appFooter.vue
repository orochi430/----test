<template>
<el-container class="setForm">
    <div style="width:100%">
        <el-divider content-position="left">页面footer配置</el-divider>
        <el-card class="box-card">
            <el-form ref="form" label-position="left" label-width="180px" size="medium">
                <el-form-item label="是否显示底部菜单栏">
                    <el-select v-model="data.appFooter.isShow" placeholder="是否默认选中">
                        <el-option label="true" :value="true"></el-option>
                        <el-option label="false" :value="false"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="底部菜单选中颜色">
                    <el-color-picker v-model="data.appFooter.checkedColor"></el-color-picker>
                </el-form-item>
            </el-form>
        </el-card>
        <el-divider content-position="left">底部menu</el-divider>
        <el-row :gutter="20">
            <el-col :span="8" v-for="(item,index) in data.appFooter.footerMenu" :key="index" style="margin-bottom:10px;">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <i style="float: right;display:block;font-size: var(--font_size_0);" class="el-icon-error" circle @click="del(item)"></i>
                    </div>
                    <el-form ref="form" label-position="left" :model="item" label-width="180px" size="medium">
                        <el-form-item label="标题">
                            <el-input v-model="item.title" placeholder="请输入标题"></el-input>
                        </el-form-item>
                        <el-form-item label="icon">
                            <el-input v-model="item.icon" placeholder="请输入icon地址"></el-input>
                        </el-form-item>
                        <el-form-item label="默认颜色">
                            <el-color-picker v-model="item.color"></el-color-picker>
                        </el-form-item>
                        <el-form-item label="跳转路由">
                            <el-input v-model="item.router" placeholder="请输入跳转路由"></el-input>
                        </el-form-item>
                        <el-form-item label="路由名称">
                            <el-input v-model="item.name" placeholder="请输入路由名称"></el-input>
                        </el-form-item>
                        <el-form-item label="参数" style="margin-bottom:52px;">
                            <el-input type="textarea" v-model="appFooter.footerMenu[index].params" @blur="changeParams(item,$event)" size="medium"></el-input>
                            <div class="el-form-item__error">
                                属性间请用半角逗号（,）隔开，属性名与值需要用半角双引号（""）包裹，最后一个属性的属性值后不可再写入半角逗号。例:{"showTotal":true,"fileType":"gw"}
                            </div>
                        </el-form-item>
                        <el-form-item label="是否显示">
                            <el-select v-model="item.isShow" placeholder="是否默认选中">
                                <el-option label="true" :value="true"></el-option>
                                <el-option label="false" :value="false"></el-option>
                            </el-select>
                            <div class="el-form-item__error">
                                默认选中所有tab中仅有一条
                            </div>
                        </el-form-item>
                        <el-form-item label="默认选中状态">
                            <el-select v-model="item.checked" placeholder="是否默认选中">
                                <el-option label="true" :value="true"></el-option>
                                <el-option label="false" :value="false"></el-option>
                            </el-select>
                            <div class="el-form-item__error">
                                默认选中所有tab中仅有一条
                            </div>
                        </el-form-item>
                        <el-form-item label="角标地址">
                            <el-input v-model="item.badgeUrl" placeholder="角标地址"></el-input>
                            <div class="el-form-item__error">
                                如果填写接口地址，当接口返回值大于0时菜单上面则会显示红点，表示有新文件产生
                            </div>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card class="box-card card_add">
                    <i class="el-icon-plus" @click="addDom()"></i>
                </el-card>
            </el-col>
        </el-row>
    </div>

</el-container>
</template>

<script>
import dsf from '../../common';
export default {
    props: {
        mainConfig: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            appFooter: []
        }
    },
    computed: {
        data() {
            return this.mainConfig.data
        }
    },
    created() {
        this.initParams();
    },
    methods: {
        initParams() {
            this.appFooter = JSON.parse(JSON.stringify(this.mainConfig.data.appFooter))
            this.appFooter.footerMenu.forEach((item, index) => {
                if (item.params) {
                    item.params = JSON.stringify(item.params)
                } else {
                    item.params = "{}";
                }
            })
        },
        changeParams(item, e) {
            try {
                console.log(item);
                //this.mainConfig.data.appFooter.footerMenu.find(fitem => fitem.name == item.name).params = JSON.parse(e.target.value)
                item.params = JSON.parse(e.target.value)
            } catch (error) {
                console.log(error)
                dsf.layer.toast('输入数据有误');
            }
        },
        addDom() {
            const value = {
                "title": "",
                "icon": "",
                "color": "",
                "router": "",
                "params": {},
                "isShow": true,
                "checked": false,
                "badgeUrl": ""
            }
            this.mainConfig.data.appFooter.footerMenu.push(value);
            this.initParams();
        },
        del(item) {
            var index = this.mainConfig.data.appFooter.footerMenu.findIndex(inx => inx.name == item.name)
            if (index !== -1) {
                this.mainConfig.data.appFooter.footerMenu.splice(index, 1)
                this.initParams();
            }
        },
        changeRoute(e, index) {
            console.log(this.$route)
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
            line-height: 210px;
        }
    }
}
</style>
