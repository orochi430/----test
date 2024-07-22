<template>
<el-container class="setForm">
    <div style="width:100%">
        <el-divider el-divider content-position="left">通用日程配置</el-divider>
        <el-row :gutter="20">
            <el-col :span="24">
                <div>
                    <span>通用日程菜单参考：http://localhost:8006/#/commonSchedule/leader</span>
                </div>
            </el-col>
            <!-- <el-col :span="8" v-for="(item,index) in data.homePage.schedule.default.tabItems" :key="index" style="margin-bottom:10px;">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <i style="float: right;display:block;font-size: var(--font_size_0);" class="el-icon-error" circle @click="del(item,'schedule',index)"></i>
                    </div>
                    <el-form ref="form" label-position="left" :model="item" label-width="180px" size="medium">
                        <el-form-item label="标题">
                            <el-input v-model="item.tabname" placeholder="请输入标题"></el-input>
                        </el-form-item>
                        <el-form-item label="对应接口">
                            <el-input v-model="item.url" placeholder="请输入对应接口"></el-input>
                        </el-form-item>
                        <el-form-item label="是否展示添加icon">
                            <el-select v-model="item.isShowAddIcon">
                                <el-option label="是" :value="true"></el-option>
                                <el-option label="否" :value="false"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="对应参数" v-if="item.params" style="margin-bottom:52px;">
                            <el-input v-model="schedule.default.tabItems[index].params" @blur="changeParams('schedule',$event,index)" placeholder="请输入对应参数" type="textarea"></el-input>
                            <div class="el-form-item__error">
                                属性间请用半角逗号（,）隔开，属性名与值需要用半角双引号（""）包裹，最后一个属性的属性值后不可再写入半角逗号。例:{"showTotal":true,"fileType":"gw"}
                            </div>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
            <el-col :span="16" v-for="(item,index) in data.homePage.schedule.customs.tabItems" :key="index" style="margin-bottom:10px;">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <i style="float: right;display:block;font-size: var(--font_size_0);" class="el-icon-error" circle @click="del(item,'schedule',index)"></i>
                    </div>
                    <el-form ref="form" label-position="left" :model="item" label-width="180px" size="medium">
                        <el-form-item label="标题">
                            <el-input v-model="item.tabname" placeholder="请输入标题"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-col :span="12" v-for="(itm,inx) in item.tabItems" :key="inx" style="margin-bottom:10px;">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <i style="float: right;display:block;font-size: var(--font_size_0);" class="el-icon-error" circle @click="del(itm,'schedule',index,inx)"></i>
                            </div>
                            <el-form ref="form" label-position="left" :model="itm" label-width="180px" size="medium">
                                <el-form-item label="标题">
                                    <el-input v-model="itm.tabname" placeholder="请输入标题"></el-input>
                                </el-form-item>
                                <el-form-item label="接口">
                                    <el-input v-model="itm.url" placeholder="请输入接口"></el-input>
                                </el-form-item>
                                <el-form-item label="类型">
                                    <el-input v-model="itm.type" placeholder="请输入类型"></el-input>
                                </el-form-item>
                                <el-form-item label="对应参数" v-if="itm.params" style="margin-bottom:52px;">
                                    <el-input v-model="schedule.default.tabItems[index].tabItems[inx].params" @blur="changeParams('schedule',$event,index,inx)" placeholder="请输入对应参数" type="textarea"></el-input>
                                    <div class="el-form-item__error">
                                        属性间请用半角逗号（,）隔开，属性名与值需要用半角双引号（""）包裹，最后一个属性的属性值后不可再写入半角逗号。例:{"showTotal":true,"fileType":"gw"}
                                    </div>
                                </el-form-item>
                            </el-form>
                        </el-card>
                    </el-col>
                </el-card>
            </el-col> -->
            <el-col :span="24" style="margin-bottom:10px;">
                <el-card class="box-card">
                    <el-form ref="form" label-position="left" label-width="180px" size="medium">
                        <el-form-item label="首页日程数据菜单">
                            <div class="el-row">
                                <div class="el el-col-6">
                                    <el-input v-model="scheduleParams.scheduleDetailUrl" placeholder="请输入"></el-input>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item label="scheduleList">
                            <div class="el-row">
                                <div class="el el-col-6">
                                    <el-input v-model="scheduleParams.scheduleList" placeholder="请输入"></el-input>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item label="scheduleListpd">
                            <div class="el-row">
                                <div class="el el-col-6">
                                    <el-input v-model="scheduleParams.scheduleListpd" placeholder="请输入"></el-input>
                                </div>
                            </div>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
            <el-col v-for="(item,index) in scheduleList" :span="24" :key="index" style="margin-bottom:10px;">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <div style="float: left;display:block;font-size: var(--font_size_0);">
                            <el-form ref="formkey" label-position="left" label-width="100px" size="medium">
                                <el-form-item label="节点名称">
                                    <div class="el el-col-8">
                                        <el-input v-model="item.key" placeholder="节点名称"></el-input>
                                    </div><span>该名称用于菜单配置时传递的参数</span>
                                </el-form-item>
                            </el-form>
                        </div>
                        <i style="float: right;display:block;font-size: var(--font_size_0);" class="el-icon-error" circle @click="del(scheduleList,index)"></i>
                    </div>
                    <el-col v-for="(tabItem,tabindex) in item.value.tabItems" :span="24" :key="tabindex" style="margin-bottom:10px;">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <i style="float: right;display:block;font-size: var(--font_size_0);" class="el-icon-error" circle @click="del(item.value.tabItems,tabindex)"></i>
                            </div>
                            <el-form label-position="left" label-width="120px" size="medium">
                                <el-form-item label="tab标题">
                                    <div class="el el-col-4">
                                        <el-input v-model="tabItem.tabname" placeholder="请输入标题"></el-input>
                                    </div>
                                </el-form-item>
                                <el-form-item label="启用二级tab页">
                                    <el-select v-model="tabItem.hasChild" placeholder="启用二级tab页">
                                        <el-option :value="true" label="是"></el-option>
                                        <el-option :value="false" label="否"></el-option>
                                    </el-select>
                                    <!-- <el-button v-if="tabItem.hasChild"  type="primary" @click="addSecondTab()">新增二级tab页</el-button> -->
                                </el-form-item>
                                <div v-if="tabItem.hasChild">
                                    <el-col v-for="(itm,inx) in tabItem.tabItems" :span="12" :key="inx" style="margin-bottom:10px;">
                                        <el-card class="box-card">
                                            <div slot="header" class="clearfix">
                                                <i style="float: right;display:block;font-size: var(--font_size_0);" class="el-icon-error" circle @click="del(tabItem.tabItems,inx)"></i>
                                            </div>
                                            <el-form :model="itm" label-position="left" label-width="180px" size="medium">
                                                <el-form-item label="标题">
                                                    <el-input v-model="itm.tabname" placeholder="请输入标题"></el-input>
                                                </el-form-item>
                                                <el-form-item label="接口">
                                                    <el-input v-model="itm.url" placeholder="请输入接口"></el-input>
                                                </el-form-item>
                                                <el-form-item label="类型">
                                                    <el-input v-model="itm.type" placeholder="请输入类型"></el-input>
                                                </el-form-item>
                                                <el-form-item label="对应参数" style="margin-bottom:52px;">
                                                    <el-input v-model="itm.paramsStr" placeholder="请输入对应参数" type="textarea"></el-input>
                                                    <div class="el-form-item__error">
                                                        属性间请用半角逗号（,）隔开，属性名与值需要用半角双引号（""）包裹，最后一个属性的属性值后不可再写入半角逗号。例:{"showTotal":true,"fileType":"gw"}
                                                    </div>
                                                </el-form-item>
                                            </el-form>
                                        </el-card>
                                    </el-col>
                                    <el-col :span="12" style="margin-bottom:10px;">
                                        <el-card class="box-card card_add">
                                            <i class="el-icon-plus" style="" @click="addSecondTab(tabItem)"></i>
                                        </el-card>
                                    </el-col>
                                </div>
                                <div v-else>
                                    <el-form label-position="left" label-width="120px" size="medium">
                                        <el-form-item label="获取数据范围">
                                            <el-select v-model="tabItem.getDataType">
                                                <el-option label="当天" value="day"></el-option>
                                                <el-option label="本周" value="week"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="日程显示类型">
                                            <el-select v-model="tabItem.type">
                                                <el-option label="按日期显示" value="date"></el-option>
                                                <el-option label="按领导显示" value="leader"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="对应接口">
                                            <el-input v-model="tabItem.url" placeholder="请输入对应接口"></el-input>
                                        </el-form-item>
                                        <el-form-item label="是否显示按钮">
                                            <el-select v-model="tabItem.isShowAddIcon">
                                                <el-option :value="true" label="是"></el-option>
                                                <el-option :value="false" label="否"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="对应参数" style="margin-bottom:52px;">
                                            <el-input v-model="tabItem.paramsStr" placeholder="请输入对应参数" type="textarea"></el-input>
                                            <div class="el-form-item__error">
                                                属性间请用半角逗号（,）隔开，属性名与值需要用半角双引号（""）包裹，最后一个属性的属性值后不可再写入半角逗号。例:{"showTotal":true,"fileType":"gw"}
                                            </div>
                                        </el-form-item>
                                    </el-form>
                                </div>
                            </el-form>
                        </el-card>
                    </el-col>
                    <el-col :span="24" style="margin-bottom:10px;">
                        <el-card class="box-card card_add">
                            <i class="el-icon-plus" style="" @click="addTab(item)"></i>
                        </el-card>
                    </el-col>
                </el-card>
            </el-col>
            <el-col :span="24">
                <el-card class="box-card card_add">
                    <i class="el-icon-plus" style="" @click="addSchedule()"></i>
                </el-card>
            </el-col>
        </el-row>
    </div>

</el-container>
</template>

<script>
export default {
    props: {
        mainConfig: {
            type: Object,
            default(){
                return {}
            }
        }
    },
    data() {
        return {
            noSchedulenames: ["scheduleDetailUrl","scheduleList","scheduleListpd"], //不用配置的属性
            scheduleList: [],
            scheduleParams:{}, //不用配置变量名的参数
            schedule: {}
        }
    },
    computed: {
        data() {
            console.log(this.mainConfig.data)
            return this.mainConfig.data
        },
        getConfigdata() {
            return this.scheduleList
        },
        getNoConfigdata() {
            return this.scheduleParams
        }
    },
    watch: {
        getConfigdata: {
            handler(newName, oldName) {
                this.saveData();
            },
            deep: true
        },
        getNoConfigdata: {
            handler(newName, oldName) {
                this.saveData();
            },
            deep: true
        }
    },
    created() {
        console.log(this.mainConfig)
        this.initParams()
    },
    methods: {
        saveData() {
            this.mainConfig.data.homePage.schedule = {}
            this.scheduleList.forEach(element => {
                let tempdata = JSON.parse(JSON.stringify(element.value));
                console.log(tempdata)
                tempdata.tabItems.forEach(item => {
                    if(item.hasChild && item.tabItems){
                        item.tabItems.forEach(itm => {
                            try {
                                itm.params = JSON.parse(itm.paramsStr)
                            } catch (error) {
                                console.log(error)
                            }
                            delete itm.paramsStr
                        })
                    }else {
                        try {
                            item.params = JSON.parse(item.paramsStr)
                        } catch (error) {
                            console.log(error)
                        }
                        delete item.tabItems
                    }
                    delete item.hasChild
                    delete item.paramsStr
                });
                this.mainConfig.data.homePage.schedule[element.key] = tempdata;
            })
            Object.assign(this.mainConfig.data.homePage.schedule, this.scheduleParams)
            console.log(this.mainConfig)
        },
        changeParams(type, e, index, inx) {
            console.log(e)
            console.log(index, inx)
            if (type == 'schedule') {
                // if (inx) {
                //     try {
                //         this.mainConfig.data.homePage.schedule.default.tabItems[index].tabItems[inx].params = JSON.parse(e.target.value)
                //     } catch (error) {
                //         console.log(error)
                //         this.$notify({
                //             title: '提示',
                //             message: '输入数据有误',
                //             type: "error"
                //         });
                //     }

                // } else {
                //     try {
                //         this.mainConfig.data.homePage.schedule.default.tabItems[index].params = JSON.parse(e.target.value)
                //     } catch (error) {
                //         console.log(error)
                //         this.$notify({
                //             title: '提示',
                //             message: '输入数据有误',
                //             type: "error"
                //         });
                //     }
                // }
            }

        },
        initParams() {
            let self = this;
            // this.schedule = JSON.parse(JSON.stringify(this.mainConfig.data.homePage.schedule));
            console.log(this.mainConfig.data.homePage.schedule)
            let schedules = Object.entries(this.mainConfig.data.homePage.schedule);
            console.log(schedules)
            schedules.forEach(schedule => {
                console.log(schedule)
                if (this.noSchedulenames.indexOf(schedule[0]) < 0) {
                    schedule[1].tabItems.forEach((item, index) => {
                        this.$set(item, "hasChild", false)
                        this.$set(item,"paramsStr",JSON.stringify(item.params || {}))
                        if (item.tabItems) {
                            this.$set(item, "hasChild", true)
                            item.tabItems.forEach((itm, inx) => {
                                this.$set(itm,"paramsStr",JSON.stringify(itm.params || {}))
                            })
                        }
                    })
                    this.scheduleList.push({
                        key: schedule[0],
                        value: schedule[1]
                    });
                } else {
                    this.$set(this.scheduleParams,schedule[0],schedule[1])
                    // this.scheduleParams[schedule[0]] = schedule[1]
                    console.log(this.scheduleParams)
                }
            });
            console.log(this.scheduleList)

        },
        addDom(type) {
            const value = {
                "menuID": "",
                "menuText": "",
                "routeUrl": "",
                "type": "",
                "params": null,
                "imgUrl": ""
            }
            this.mainConfig.data.homePage.squMenu.push(value);
            this.initParams()
        },
        del(pItem, index) {
            pItem.splice(index, 1)
        },
        changeSelect(val, index) {

        },
        addSchedule() {
            let schedule = {
                key: "",
                value: {
                    "tabItems": []
                }
            };
            this.scheduleList.push(schedule);
        },
        addTab(item){
            let tabItem = {
                "tabname": "",
                "hasChild": false,
                "type": "date",
                "getDataType": "day",
                "url": "",
                "params": null,
                // "isShowAddIcon": true
            }
            item.value.tabItems.push(tabItem)
        },
        addSecondTab(tabItem){
            let val = {
                "tabname": "",
                "type": "",
                "url": "",
                "params": null
            }
            if(!tabItem.tabItems){
                this.$set(tabItem, 'tabItems', [])
            }
            tabItem.tabItems.push(val)
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

    .card_add_db {
        i {
            font-size: 70px;
            line-height: 116px;
        }
    }
}
</style>
