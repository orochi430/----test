<template>
  <el-container class="setForm">
    <div style="width:100%">
        <el-divider content-position="left">通讯录tab配置</el-divider>
        <el-row :gutter="20">
            <el-col :span="8" v-for="(item,index) in configData" :key="index" style="margin-bottom:10px;">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <i style="float: right;display:block;font-size: var(--font_size_0);" class="el-icon-error" circle  @click="del(item,index)"></i>
                    </div>
                    <el-form ref="form" label-position="left" :model="item" label-width="180px" size="medium">
                        <el-form-item label="名称">
                            <el-input v-model="item.tabName" placeholder="请输入展示名称"></el-input>
                        </el-form-item>
                        <el-form-item label="对应类型">
                            <el-input v-model="item.type" placeholder="请输入对应属性"></el-input>
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
                        <el-form-item label="是否显示部门下人数">
                            <el-select v-model="item.isShowCount" placeholder="是否默认选中">
                                <el-option label="true" :value="true"></el-option>
                                <el-option label="false" :value="false"></el-option>
                            </el-select>
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
      return this.mainConfig.addressList
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
      let tabs = JSON.parse(JSON.stringify(this.mainConfig.data.addressList.tabs))
      console.log(tabs)
      tabs.forEach((item,index) => {
        this.$set(item,"paramsStr",JSON.stringify(item.params))
        this.configData.push(item)
      })
    },
    saveData(){
      this.mainConfig.data.addressList.tabs = []
      this.configData.forEach((item,index) => {
        let template = JSON.parse(JSON.stringify(item))
        try {
          template.params = JSON.parse(template.paramsStr)
        } catch (error) {
          console.log(error)
        }
        delete template.paramsStr
        this.mainConfig.data.addressList.tabs.push(template)
      })
      console.log(this.mainConfig.data.addressList)
    },
    addDom(){
      let val = {
        "tabName": "",
        "type": "",
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
