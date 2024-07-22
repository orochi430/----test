import { finish } from '../../assets/styles/wf.scss';
<template>
  <div class="ds-moving-situation-simple">
    <div class="_header">
      <div class="_huanjie _finish">
        <i></i>
        <span>完成环节</span>
      </div>
      <div class="_huanjie _current">
        <i></i>
        <span>当前环节</span>
      </div>
      <div class="_huanjie _not_faqi">
        <i></i>
        <span>未发起环节</span>
      </div>
    </div>
    <div class="_content">
      <!-- :class="active==index ? '_active' : active>index ? '_finish' : '_not_faqi'" -->
      <div
        class="_item"
        v-for="(item, index) in flowList"
        :key="index"
        :class="{'_active':item.status==2,'_finish':item.status==1,'_not_faqi':item.status==0}"
      >
        <div class="_title ds_font6">{{index+1}}</div>
        <div class="_con">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "movingSituationSimple",
  props: {
    flowInfo: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      list: [],
      active: 3,
      flowStatus: [], // 走过的环节 第一个是当前环节
      flowList:[]
    };
  },
  created() {},
  mounted() {},
  methods: {
    judgeStatus(status) {
      if(status=="yes")return 1;
      if(status=="now") return 2;
      if(status =="no") return 0;
    }
  },
  watch: {
    flowInfo: {
      handler(nv, ov) {
        var self = this;
        let arr = [];
        if(nv.passedNodes) {
          nv.passedNodes.forEach((flow)=>{
            self.flowStatus.push(flow.nodeName)
          })
        }
        
        /* for(let i=0;i<nv.allNodes.length;i++){
          self.list.push({
            name:nv.allNodes[i]['nodeName'],
            status:self.judgeStatus(nv.allNodes[i]['nodeName'])
          })
        }
        for(let i=0;i<nv.passedNodes.length;i++){
          //console.log(nv.allNodes[i]['nodeName'])
          self.flowList.push({
            name:nv.passedNodes[i]['nodeName'],
            status:self.judgeStatus(nv.passedNodes[i]['nodeName'])
          })
        } */
        if(nv.stageList) {
          nv.stageList.forEach(item=>{
            self.flowList.push({
              name:item.nodeName,
              status:this.judgeStatus(item.selected)
            });
          });
        }
        //console.log(self.flowList)
        //console.log(self.list)
      }, 
      deep: true,
      immediate: true
    }
  }
};
</script>
