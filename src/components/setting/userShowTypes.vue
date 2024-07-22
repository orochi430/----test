<template>
  <el-container class="setForm">
    <div style="width:100%">
        <el-divider content-position="left">个人信息展示配置<span style="color:#f56c6c">(展示顺序按照填写顺序展示)</span></el-divider>


        <el-row :gutter="20">
            <el-col :span="8" v-for="(item,index) in data.mailList.mailDetailShow" :key="index" style="margin-bottom:10px;">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <i style="float: right;display:block;font-size: var(--font_size_0);" class="el-icon-error" circle  @click="del(item)"></i>
                    </div>
                    <el-form ref="form" label-position="left" :model="item" label-width="180px" size="medium">
                        <el-form-item label="名称">
                            <el-input v-model="item.text" placeholder="请输入展示名称"></el-input>
                        </el-form-item>
                        <el-form-item label="对应属性">
                            <el-input v-model="item.prop" placeholder="请输入对应属性"></el-input>
                        </el-form-item>
                        <el-form-item label="是否展示">
                             <el-select v-model="item.ifShow" @change="changeSelect(item.checked,index)" placeholder="是否默认选中">
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
          console.log(this.mainConfig.data)
          return this.mainConfig.data
      }
  },
  methods:{
    addDom() {
        const value={
          "ifShow": true,
          "prop": "",
          "text": ""
        }
        this.mainConfig.data.mailList.mailDetailShow.push(value);
    },
    del(item){
        var index = this.mainConfig.data.mailList.mailDetailShow.findIndex(inx=>inx.prop==item.prop)
        if (index !== -1) {
            this.mainConfig.data.mailList.mailDetailShow.splice(index, 1)
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
        height: 100%;
        text-align: center;
        i{
            font-size: 70px;
            line-height: 116px;
        }
    }
}
</style>
