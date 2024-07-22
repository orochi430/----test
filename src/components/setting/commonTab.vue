<template>
<el-container class="setForm">
    <div style="width:100%">
        <el-divider content-position="left">通用tab框架页配置</el-divider>
        <el-card v-for="(tabItem,indx) in configdata" :key="indx">
            <div slot="header" class="clearfix">
                <i style="float: left;display:block;font-size: var(--font_size_0);">节点配置</i>
                <i style="float: right;display:block;font-size: var(--font_size_0);" class="el-icon-error" circle @click="del(tabItem)"></i>
            </div>
            <el-row>
                <el-form ref="form" label-position="left" label-width="200px" size="medium">
                    <el-form-item label="节点名称"><span>该名称用于菜单配置时传递的参数</span>
                        <div class="el el-col-4">
                            <el-input v-model="tabItem.key" size="medium"></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item label="是否展示搜索框">
                        <div class="el el-col-4">
                            <el-select v-model="tabItem.value.showSearchBox">
                                <el-option :value="true" label="是"></el-option>
                                <el-option :value="false" label="否"></el-option>
                            </el-select>
                        </div>
                    </el-form-item>
                    <el-form-item label="备注说明">
                        <div class="el el-col-4">
                            <el-input v-model="tabItem.value.remark" size="medium"></el-input>
                        </div>
                    </el-form-item>
                </el-form>
            </el-row>

            <div class="clearfix">
                <i style="float: left;display:block;font-size: var(--font_size_0);">tab页配置</i>
            </div>
            <el-row :gutter="20">
                <el-col v-for="(item,index) in tabItem.value.tabslist" :span="12" :key="index">
                    <el-card>
                        <div slot="header" class="clearfix">
                            <i style="float: right;display:block;font-size: var(--font_size_0);" class="el-icon-error" circle @click="del(item,'tabItem',indx,index)"></i>
                        </div>
                        <el-form ref="form" label-position="left" label-width="200px" size="medium">
                            <el-form-item label="名称">
                                <el-input v-model="item.name" size="medium"></el-input>
                            </el-form-item>
                            <el-form-item label="路由名称">
                                <el-input v-model="item.goRoute" size="medium"></el-input>
                            </el-form-item>
                            <el-form-item label="接口地址">
                                <el-input v-model="item.url" size="medium"></el-input>
                            </el-form-item>
                            <el-form-item label="moduleId">
                                <el-input v-model="item.moduleId" size="medium"></el-input>
                            </el-form-item>
                            <el-form-item label="listId">
                                <el-input v-model="item.listId" size="medium"></el-input>
                            </el-form-item>
                            <el-form-item label="参数" style="margin-bottom:52px;">
                                <el-input v-model="item.paramsStr" type="textarea" size="medium"></el-input>
                                <div class="el-form-item__error">
                                    属性间请用半角逗号（,）隔开，属性名与值需要用半角双引号（""）包裹，最后一个属性的属性值后不可再写入半角逗号。例:{"showTotal":true,"fileType":"gw"}
                                </div>
                            </el-form-item>
                            <el-form-item label="tab页的角标地址">
                                <el-input v-model="item.badgeUrl" size="medium"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <el-card class="box-card card_add">
                        <i class="el-icon-plus" style="" @click="addTabItem(tabItem)"></i>
                    </el-card>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="box-card card_add">
            <i class="el-icon-plus" style="" @click="addTabSetting()"></i>
        </el-card>
        <!-- <div class="clearfix">
            <el-button type="primary" @click="saveData">保存当前配置</el-button>
        </div> -->
        <br />
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
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            configdata: [],
            isWatch: false
        }
    },
    computed: {
        data() {
            return this.mainConfig.data
        },
        getConfigdata() {
            return this.configdata
        }
    },
    watch: {
        // getConfigdata() {
        //     if (this.isWatch) {
        //         console.log(this.configdata.length);
        //         // this.configdata.forEach((element, index) => {
        //         //     console.log(index);
        //         //     this.mainConfig.data.commonTabs[element.key] = element.value;
        //         // });
        //         // console.log(this.mainConfig.data);
        //         this.saveData();
        //     }
        // }
        getConfigdata: {
            handler(newName, oldName) {
                this.saveData();
            },
            deep: true
        }
    },
    created() {
        let tabs = Object.entries(this.mainConfig.data.commonTabs);
        tabs.forEach(element => {
            element[1].tabslist.forEach(element => {
                this.$set(element,"paramsStr",JSON.stringify(element.params))
                // element.paramsStr = JSON.stringify(element.params);
            });
            let tabItem = {
                key: element[0],
                value: element[1]
            };
            this.configdata.push(tabItem);
        });
        console.log(this.configdata);
        this.isWatch = true;
    },
    mounted() {},
    methods: {
        saveData() {
            this.mainConfig.data.commonTabs = {};
            this.configdata.forEach((element, index) => {
                console.log(index);
                let tempdata = JSON.parse(JSON.stringify(element.value));
                tempdata.tabslist.forEach(element => {
                    try {
                        element.params = JSON.parse(element.paramsStr);
                    } catch (error) {
                        console.log(error)
                    }
                    delete element.paramsStr;
                });
                this.mainConfig.data.commonTabs[element.key] = tempdata;
            });
            console.log(this.mainConfig.data);
        },
        addTabSetting() {
            let tabItem = {
                key: "",
                value: {
                    "remark": "",
                    "showSearchBox": true,
                    "tabslist": []
                }
            };
            this.configdata.push(tabItem);
        },
        addTabItem(tabItem) {
            const value = {
                "name": "",
                "icon": "",
                "goRoute": "",
                "url": "",
                "params": {},
                "paramsStr": "{}",
                "moduleId": "",
                "listId": "",
                "badgeUrl": "",
                "count": ""
            }
            tabItem.value.tabslist.push(value);
            // this.mainConfig.data.commonTabs.sqzx.tabslist.push(value);
        },
        del(item,type,indx,index) {
            if(type == 'tabItem'){
                this.configdata[indx].value.tabslist.splice(index,1)
            } else {
                this.configdata.splice(item, 1);
            }
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
        text-align: center;
        box-sizing: border-box;

        i {
            font-size: 70px;
            line-height: 116px;
        }
    }
}
</style>
