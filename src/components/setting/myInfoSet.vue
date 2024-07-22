<template>
  <el-container class="setForm">
    <div style="width:100%">
        <el-divider content-position="left">是否显示按钮</el-divider>
        <el-card class="box-card">
            <el-form ref="form" label-position="left" label-width="180px" size="medium">
                <el-form-item label="按钮名称">
                    <div class="el-row">
                        <div class="el el-col-6">
                            <el-input v-model="data.myInfo.exitButton.buttonName" placeholder="请输入标题"></el-input>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="是否显示" style="margin: 0;">
                    <el-select v-model="data.myInfo.exitButton.isShow" placeholder="是否默认选中">
                        <el-option label="true" :value="true"></el-option>
                        <el-option label="false" :value="false"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-card>
        <el-divider content-position="left">myInfo</el-divider>
        <el-row :gutter="20">
            <el-col :span="24" v-for="(item,index) in data.myInfo.menus" :key="index" style="margin-bottom:10px;">
                <el-card class="box-card">
                    <div slot="header" class="clearfix" >
                        <i style="float: right;display:block;font-size: var(--font_size_0);" class="el-icon-error" circle @click="del(index)"></i>
                    </div>
                    <el-col :span="8" style="margin-bottom:10px;" v-for="(itm,inx) in item" :key="inx">
                      <el-card class="box-card" >
                          <div slot="header" class="clearfix" >
                              <i style="float: right;display:block;font-size: var(--font_size_0);" class="el-icon-error" circle @click="del(index,inx)"></i>
                          </div>
                          <el-form ref="form" label-position="left" :model="itm" label-width="180px" size="medium">
                              <el-form-item label="标题">
                                  <el-input v-model="itm.menuText" placeholder="请输入标题"></el-input>
                              </el-form-item>
                              <el-form-item label="跳转路由" >
                                  <el-input v-model="itm.routeUrl" placeholder="请输入跳转路由"></el-input>
                              </el-form-item>
                              <el-form-item label="menuID">
                                  <el-input v-model="itm.menuID"  placeholder="请输入menuID"></el-input>
                              </el-form-item>
                          </el-form>
                      </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card class="box-card card_add">
                            <i class="el-icon-plus" @click="addDom(index)"></i>
                        </el-card>
                    </el-col>
                </el-card>
            </el-col>
            <el-col :span="24">
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
    addDom(index) {
      console.log(index===undefined)
      const value={
          "menuID": "",
          "menuText": "",
          "routeUrl": "",
          "type": "route",
          "params": null,
          "imgUrl": ""
        }
      if(index==undefined){
        this.mainConfig.data.myInfo.menus.push([value]);
      }else{
        this.mainConfig.data.myInfo.menus[index].push(value)
      }

    },
    del(index,inx){
      if(inx===undefined){
        this.mainConfig.data.myInfo.menus.splice(index, 1)
      }else{
        this.mainConfig.data.myInfo.menus[index].splice(inx, 1)
      }
    },
    changeSelect(val,index){
        console.log(val,index)
        if(val==true){
            this.mainConfig.data.appFooter.footerMenu.forEach(item=>{
                item.checked=false
            })
            this.mainConfig.data.appFooter.footerMenu[index].checked=true
        }
    },
    changeRoute(e,index){
        console.log(e,index)
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
            line-height: 116.5px;
        }
    }
}
</style>
