<template>
<el-container class="setForm">
    <div style="width:100%">
        <el-divider el-divider content-position="left">首页menu</el-divider>
        <el-row :gutter="20">
            <el-col :span="8" v-for="(item,index) in data.homePage.squMenu" :key="index" style="margin-bottom:10px;">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <i style="float: right;display:block;font-size: var(--font_size_0);" class="el-icon-error" circle @click="del(item,data.homePage.squMenu,index)"></i>
                    </div>
                    <el-form ref="form" label-position="left" :model="item" label-width="180px" size="medium">
                        <el-form-item label="标题">
                            <el-input v-model="item.menuText" placeholder="请输入标题"></el-input>
                        </el-form-item>
                        <el-form-item label="对应路由">
                            <el-input v-model="item.routeUrl" placeholder="请输入路由"></el-input>
                        </el-form-item>
                        <el-form-item label="对应图片">
                            <el-input v-model="item.imgUrl" placeholder="请输入图片"></el-input>
                        </el-form-item>
                        <el-form-item label="自定义id">
                            <el-input v-model="item.menuID" placeholder="请输入id"></el-input>
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
        <el-divider el-divider content-position="left">待办tab</el-divider>
        <el-row :gutter="20">
            <el-col :span="8" v-for="(item,index) in data.homePage.todoCenter" :key="index" style="margin-bottom:10px;">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <i style="float: right;display:block;font-size: var(--font_size_0);" class="el-icon-error" circle @click="del(item,data.homePage.todoCenter,index)"></i>
                    </div>
                    <el-form ref="form" label-position="left" :model="item" label-width="180px" size="medium">
                        <el-form-item label="标题">
                            <el-input v-model="item.title" placeholder="请输入标题"></el-input>
                        </el-form-item>
                        <el-form-item label="对应接口">
                            <el-input v-model="item.url" placeholder="请输入对应接口"></el-input>
                        </el-form-item>
                        <el-form-item label="对应类型">
                            <el-input v-model="item.name" placeholder="对应类型"></el-input>
                        </el-form-item>
                        <el-form-item label="对应参数" v-if="item.params" style="margin-bottom:52px;">
                            <el-input v-model="todoCenter[index].params" @blur="changeParams('todoCenter',$event,index)" placeholder="请输入对应参数" type="textarea"></el-input>
                            <div class="el-form-item__error">
                                属性间请用半角逗号（,）隔开，属性名与值需要用半角双引号（""）包裹，最后一个属性的属性值后不可再写入半角逗号。例:{"showTotal":true,"fileType":"gw"}
                            </div>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card class="box-card card_add card_add_db" style="line-height:116px;">
                    <i class="el-icon-plus" @click="addDom('dbtab')"></i>
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
            default: {}
        }
    },
    computed: {
        data() {
            console.log(this.mainConfig.data)
            return this.mainConfig.data
        }
    },
    data() {
        return {
            todoCenter: null,
        }
    },
    created() {
        this.initParams()
    },
    methods: {
        changeParams(type, e, index, inx) {
            console.log(e)
            console.log(index, inx)
            if (type == 'schedule') {

            } else {
                try {
                    this.mainConfig.data.homePage.todoCenter[index].params = JSON.parse(e.target.value)
                    console.log(this.mainConfig.data.homePage.todoCenter)
                } catch (error) {
                    console.log(error)
                }
            }

        },
        initParams() {
            this.todoCenter = JSON.parse(JSON.stringify(this.mainConfig.data.homePage.todoCenter))
            this.todoCenter.forEach((item, index) => {
                if (item.params) {
                    item.params = JSON.stringify(item.params)
                }
            })
        },
        addDom(type) {
            if (type == "dbtab") {
                const value = {
                    "title": "",
                    "name": "",
                    "count": "",
                    "url": "",
                    "countParams": {
                        "start": 1,
                        "limit": 15
                    },
                    "params": {}
                }
                this.mainConfig.data.homePage.todoCenter.push(value);
                this.initParams()
                return
            }
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
        del(item, list, index) {
            list.splice(index, 1)
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

    .card_add_db {
        i {
            font-size: 70px;
            line-height: 116px;
        }
    }
}
</style>
