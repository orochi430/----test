<template>
  <div class="box dxqListBox">
    <div class="dxqItem" style="" v-if="dataList&&dataList.length" v-for="(dxqitm,dxqinx) in dataList" :key="dxqinx">
      <span>{{dxqitm.orgName}}</span>
      <van-button class="dxqbtn" type="info" size="mini" @click="Ding(dxqitm)">催报</van-button>
    </div>
    <footer style="">
      <van-button type="info" style="" @click="showPerson=true">催报</van-button>
    </footer>
    <commonempty v-if="!dataList.length" />
    <van-popup :close-on-click-overlay="false" v-model="showPerson" get-container="#app" :style="{ height: '100%' }" position="bottom">
        <selectPerson v-if="showPerson"  @close="close" :selectPersons="selectPersons"  @getSelectUser="getSelectUser" @cancePerson="cancePerson" @dingding="dingding"></selectPerson>
    </van-popup>
  </div>
</template>

<script>
import selectPerson from "@/components/selectPerson/dingPerson";
export default {
  name:"dxqLit",
  props:["dataList","holiday","year"],
  components: {
    selectPerson
  },
  data(){
    return {
      selectPersons:[],
      showPerson:false
    }
  },
  created(){
    this.dataList.forEach((item,index)=>{
      let obj={
        user_name:item.orgName,
        foreign_id:item.foreignId,
        id:item.foreignId,
      }
      this.selectPersons.push(obj)
    })
  },
  methods:{
    Ding(dxqitm){
      console.log(dxqitm)
      if(dxqitm.foreignId){
        dsf.dd.Ding({
          users: [dxqitm.foreignId],
          type: 2, // 附件类型 1：image  2：link
          alertType: 2, // 钉发送方式 0:电话, 1:短信, 2:应用内
          text:dxqitm.dingContent,
        })
      }else{
        dsf.layer.toast("请联系管理员维护值班室主任人员")
      }
    },
    close(){
      this.showPerson=false,
      dsf.layer.toast("暂无可钉人员")
    },
    getSelectUser(){

    },
    cancePerson(){
      this.showPerson=false
    },
    dingding(forienArr){
      const users = forienArr;
      console.log(users)
      if(!forienArr.length){
        dsf.layer.toast("暂无可钉人员")
        return
      }
      dsf.dd.Ding({
        users: users,
        type: 2, // 附件类型 1：image  2：link
        alertType: 2, // 钉发送方式 0:电话, 1:短信, 2:应用内
        text:`请尽快上报${this.year}${this.holiday}值班带班表`,
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.box{
  width:100%;
  height:100%;
  padding:0 10px;
  padding-bottom:74px;
  .dxqItem{
    padding:10px;
    background:white;
    border-radius:8px;
    margin:10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .dxqbtn{
    flex-shrink: 0
  }
  footer{
    height:74px;
    z-index:999;
    position:fixed;bottom:0;left:0;width:100%;padding:15px;background:white;display:flex;
  }
}
</style><style lang="scss">
.dxqListBox{
  footer{
    .van-button{
      flex:1;
    }
  }
}
</style>