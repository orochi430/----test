<template>
  <el-container class="setForm">
    <div style="width:100%">
        <el-divider content-position="left">特殊列表配置</el-divider>
        <div>特殊列表菜单参考 http://localhost:8006/#/commonList?fileType=wtdb <span style="color:#f56c6c">(将调用特殊接口)</span></div>
        <el-row :gutter="20">
            <el-col :span="8" v-for="(item,index) in configData" :key="index" style="margin-bottom:10px;">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <i style="float: right;display:block;font-size: var(--font_size_0);" class="el-icon-error" circle  @click="del(item,index)"></i>
                    </div>
                    <el-form ref="form" label-position="left" :model="item" label-width="180px" size="medium">
                        <el-form-item label="类型">
                            <el-input v-model="item.fileType" placeholder="类型"></el-input>
                        </el-form-item>
                        <el-form-item label="接口url">
                            <el-input v-model="item.url" placeholder="请输入接口url"></el-input>
                        </el-form-item>
                        <el-form-item label="参数" style="margin-bottom:52px;">
                                <el-input v-model="item.paramsStr" type="textarea" size="medium"></el-input>
                                <div class="el-form-item__error">
                                    属性间请用半角逗号（,）隔开，属性名与值需要用半角双引号（""）包裹，最后一个属性的属性值后不可再写入半角逗号。例:{"showTotal":true,"fileType":"gw"}
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
export default {
  props:{
    mainConfig:{
      type: Object,
      default(){
        return {}
      }
    }
  },
  data(){
    return {
      configData: []
    }
  },
  computed:{
    data(){
      return this.mainConfig.listJson
    },
    getConfigData(){
      return this.configData
    }
  },
  watch:{
    getConfigData:{
      handler(newName,oldName){
        this.saveData()
      },
      deep:true
    }
  },
  created(){
    this.initParams()
  },
  methods:{
    initParams(){
      let tabs = JSON.parse(JSON.stringify(this.mainConfig.data.listJson))
      tabs.forEach((item,index) => {
        this.$set(item,"paramsStr",JSON.stringify(item.params))
        this.configData.push(item)
      })
    },
    saveData(){
      this.mainConfig.data.listJson = []
      this.configData.forEach((item,index) => {
        let template = JSON.parse(JSON.stringify(item))
        try {
          template.params = JSON.parse(template.paramsStr)
        } catch (error) {
          console.log(error)
        }
        delete template.paramsStr
        this.mainConfig.data.listJson.push(template)
      })
      console.log(this.mainConfig.data.listJson)
    },
    addDom(){
      let val = {
        "fileType": "",
        "url": "",
        "params": {},
      }
      this.configData.push(val)
    },
    del(item,index){
      this.configData.splice(index,1)
    }
  }
}
</script>
<style lang='scss' scoped>
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
