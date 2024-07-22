<template>
  <van-popup v-model="show" position="bottom" style="height: 70%" :border="false">
    <div class="box">
      <van-nav-bar left-text="取消" right-text="保存" @click-left="onClickLeft" @click-right="onClickRight"/>
      <div class="top" v-if="evaluate[0].cyrbm">
          <span class="span1">{{evaluate[0].bxlcjdName ? evaluate[0].bxlcjdName : "撰搞人起草"}}</span>
          <span class="span2">【{{evaluate[0].cyrbm ? evaluate[0].cyrbm : ''}}】</span>
      </div>
      <div class="center" v-if="evaluate[0].cyrbm">
        <!-- <dl v-for="(item, index) in rateData" :key="index">
          <dt><h4>{{item.title}}</h4></dt>
          <dd v-for="(ele,index) in item.arr" :key="index">
            <span>{{ele.text}}</span><van-rate v-model=ele.value gutter="7px" :size="20" color=rgb(184,155,121) void-icon="star-o" void-color="#eee" allow-half icon="star" :touchable="false"/>
          </dd>
          <dd><span class="last">备注：</span><textarea v-model=item.textarea cols="30" rows="2"></textarea></dd>
        </dl> -->
        <dl>
          <dt>{{evaluate[0].dispname ? evaluate[0].dispname : ""}}</dt>
          <dd v-for="(item,index) in evaluate" :key="index">
            <span>{{item.pjx}}：</span><van-rate v-model=item.xj gutter="7px" :size="20" color=rgb(184,155,121) void-icon="star-o" void-color="#eee" allow-half icon="star" :touchable="false"/>
          </dd>
          <dd><span class="last">备注：</span><textarea v-model=evaluate[0].bz cols="30" rows="2"></textarea></dd>
        </dl>
      </div>
    </div>
  </van-popup>
</template>

<script>
export default {
  name: "wuxiAppraise",
  props:{
   metaData: {
    type: Object,
      default: () => {
       return {}
   }}
  },
  data() {
    return {
      show: false,
      addEvaluate: [],
      evaluate: [{bxlcjdName: "", cyrbm: "", bz: ""}]
    }
  },
  watch: {
    show(newVal, oldVal){
      if(newVal == true) {
        this.getEvaluate()
      }
    }
  },
  methods: {
    onClickLeft(){
      this.show = false
    },
    onClickRight(){
      this.addEvaluate = []
      this.evaluate.forEach(item => {
        item.bz = this.evaluate[0].bz
        let obj = {
            flowId: this.metaData.flowId,
            pk: this.metaData.pk,
            from_id: this.metaData.fromId,
            pnidd: this.metaData.pId,
            pffs: String(item.xj * 2),
            pfxj: String(item.xj),
            zbid: item.id,
            zxid: item.zxid,
            pnid: this.metaData.pnId,
            nodeId: this.metaData.nodeId,
        }
        this.addEvaluate.push(obj)
      })
      this.addEvaluate.push({
            flowId: this.metaData.flowId,
            pk: this.metaData.pk,
            from_id: this.metaData.fromId,
            pnidd: this.metaData.pId,
            zbid: this.evaluate[0].id,
            zxid: this.evaluate[0].id,
            pnid: this.metaData.pnId,
            nodeId: this.metaData.nodeId,
            bzxx: this.evaluate[0].bz,
        })
      dsf.http.post(`fn/rcbgpjcontroller/addMobileEvaluate`,{ data: this.addEvaluate },
        { headers: {
          "Content-Type" : "application/json"
        }}
      ).then( res => {
        console.log(JSON.stringify(this.addEvaluate))
        dsf.layer.toast(res.data.message)
      })
    },
    getEvaluate(){
      let loading = dsf.layer.loading()
      let obj = {
        pnid : this.metaData.pnId,
        moduleId : this.metaData.moduleId,
        infoid : this.metaData.pk,
        nodeId: this.metaData.nodeId
      }
      dsf.http.post("fn/rcbgpjcontroller/getEvaluate",obj).then(({data})=>{
        data.data.array.forEach(item => item.xj = Number(item.xj))
        this.evaluate = data.data.array
        dsf.layer.closeLoading(loading)
      })
    }
  }
}
</script>
<style lang='scss' scoped>
	@import "@/assets/styles/themes.scss";
	@import "@/assets/styles/mixin.scss";
  .box {
    padding: 0 5px;
  }
  .top{
    border-bottom: 1px #eee solid;
    padding: 10px 0;
    .span1 {
      font-size: 18px;
      font-weight: 600;
      padding: 0 10px;
    }
    .span2 {
      font-size: 15px;
      font-weight: 600;
    }
  }
  .top:before{
    border-left: 5px red solid;
    content: "";
  } 
  .center {
    padding: 10px 0 0 15px;
    dt {
      letter-spacing: 2px;
      font-size: var(--font_size_2);
      font-weight: 550;
    }
    dd {
      letter-spacing: 1px;
      font-size: 15px;
      margin: 4px 0 4px 8px;
      .last {
        position: relative;
        top: -25px;
      }
    }
    textarea {
      margin-top: 10px;
      border: 1px black solid;
      border-radius: 2px;
      resize: none;
    }
  }
  ::v-deep .van-nav-bar {
    border-radius: 5px;
    height: 38px;
    border-bottom-color: #eee;
  }
</style>
