<template>
  <el-container class="setForm">
    <div style="width:100%">
        <el-divider content-position="left">表单中tab页的配置项</el-divider>
        <el-row :gutter="20">
            <el-col :span="8" v-for="(item,index) in data.formTab" :key="index" style="margin-bottom:10px;">
                <el-card class="box-card">
                    <div slot="header" class="clearfix" @click="del(item)">
                        <i style="float: right;display:block;font-size: var(--font_size_0);" class="el-icon-error" circle></i>
                    </div>
                    <el-form ref="form" label-position="left" :model="item" label-width="180px" size="medium">
                        <el-form-item label="标题">
                            <el-input v-model="item.title" placeholder="请输入标题"></el-input>
                        </el-form-item>
                        <el-form-item label="tab组件名称">
                            <el-input v-model="item.name" placeholder="请输入tab组件名称"></el-input>
                        </el-form-item>
                        <el-form-item label="默认选中状态">
                             <el-select v-model="item.enable" @change="changeSelect(item.enable,index)" placeholder="是否默认选中">
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
          type:Object,
          default:{}
      }
  },
  computed:{
      data(){
          return this.mainConfig.data
      }
  },
  methods:{
    addDom() {
        const value={
            "name": "",
            "title": "",
            "enable": false
        }
        this.mainConfig.data.formTab.push(value);
    },
    del(item){
        var index = this.mainConfig.data.formTab.findIndex(inx=>inx.title==item.title)
        if (index !== -1) {
            this.mainConfig.data.formTab.splice(index, 1)
        }
    },
    changeSelect(val,index){

    }
  }
}
</script>

<style lang="scss" scoped>
.setForm{
    ::v-deep.el-col{
        margin-bottom: 10px;
    }
    .card_add{
        text-align: center;
        box-sizing:border-box;
        i{
            font-size: 70px;
            line-height: 116px;
        }
    }
}
</style>
