<template>
  <div class="worpbox">
    <div class="box">
      <span :class="actv == 1 ? 'active':'' " @click="task">督察任务列表</span>
      <span :class="actv == 0 ? 'active':'' " @click="inform">督察通知列表</span>
    </div>
    <!-- 督察任务列表 -->
    <div class="boxlist" v-show="show">
      <div class="biaoto">
        <div class="divbiaoto">单位</div>
        <div>总数</div>
        <div>已完成</div>
        <div>未完成</div>
        <div>已量灯</div>
      </div>
      <ul class="ultask">
        <li v-for="(item,index) in taskValue" :key="index" class="lisask">
          <span class="divlist">{{ item.superviseUnitname }}</span>
          <div>{{ item.dbct }}</div>
          <div class="diver">{{ item.wfkcount }}</div>
          <div class="yellow">{{ item.yfkcount	}}</div>
          <div class="rightborder">{{ item.yfkcount	}}</div>
        </li>
      </ul>
    </div>

    <div class="informbox" v-show="shows">
      <div class="informdiv">
        <div class="danwei">单位</div>
        <div>总数</div>
        <div>已完成</div>
        <div>未完成</div>
        <div>已亮灯</div>
        <div>反馈率</div>
      </div>
      <ul class="informul">
        <li v-for="(item,index) in informValue" :key="index" class="liinform">
          <span class="divlist">{{ item.superviseUnitname }}</span>
          <div>{{ item.dbct }}</div>
          <div class="diver">{{ item.wfkcount }}</div>
          <div class="yellow">{{ item.yfkcount }}</div>
          <div class="redcolor">{{ item.yldcount }}</div>
          <div class="rightborder">{{ item.fkl }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name:"tasklist",
  data(){
    return{
      actv:1,
      show:true,
      shows:false,
      taskValue:[],
      informValue:[],
    }
  },
  created(){
  },
  mounted(){
    this.getTack()
    this.getInform()
  },
  methods:{
    getTack(){
      let self = this 
      dsf.http.post("fn/workspace/listUnitMobileWorkTaskSituationListData").then(({data})=>{
        if(data.type == "success"){
          self.taskValue = data.data
        }
      })
    },
    getInform(){
      dsf.http.post("fn/workspace/listUnitMobileWorkSituationListData").then(({data})=>{
        if(data.type == "success"){
          this.informValue = data.data
        }
      })
    },
    task(){
      this.actv = 1
      this.show =  true
      this.shows = false
    },
    inform(){
      this.actv = 0
      this.show = false
      this.shows = true
    }
  }
}
</script>

<style lang="scss" scoped>
  .active{
    color: #3296fa;
    font-size: var(--font_size_2);
    font-weight: 700;
  }
  .box{
    width: 100%;
    background: white;
    height: 35px;
    line-height: 35px;
    padding: 2px 0 2px 10px;
  }
  .boxlist{
    width: 100%;
    background: white;
    margin-top: 12px;
    padding: 10px;
    height: 550px;
    .biaoto{
      display: flex;
      justify-content: center;
      .divbiaoto{
        border-right: 1px solid #fff;
        width: 120px;
        height: 35px;
        text-align: center;
        line-height: 35px;
        background: #3296fa;
        color: #fff;
      }
      div{
        border-right: 1px solid #fff;
        width: 60px;
        height: 35px;
        text-align: center;
        line-height: 35px;
        background: #3296fa;
        color: #fff;
      }
      
    }
    .ultask{
      width: 100%;
      height: 500px;
      overflow: scroll;
      .lisask{
        display: flex;
        .diver{
          color: #56BDBD;
        }
        .yellow{
          color: #FDBD00;
        }
        .divlist{
          width:119px;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: space-evenly;
          border-left:1px solid  rgb(230, 229, 229);
          border-bottom: 1px solid  rgb(230, 229, 229);
        }
        div{
          width:  60px;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding: 10px 0 10px 0;
          border-left:1px solid rgb(230, 229, 229);
          border-bottom:1px solid rgb(230, 229, 229);
        }
        .rightborder{
          border-right:1px solid rgb(230, 229, 229);
          color: red;
        }
      }
    }
  }
  .informbox{
    width: 100%;
    background: white;
    margin-top: 12px;
    padding: 10px;
    height: 550px;
    .informdiv{
      display: flex;
      justify-content: center;
      .danwei{
        border-right: 1px solid #fff;
        width: 120px;
        height: 35px;
        text-align: center;
        line-height: 35px;
        background: #3296fa;
        color: #fff;
      }
      div{
        border-right: 1px solid #fff;
        width: 60px;
        height: 35px;
        text-align: center;
        line-height: 35px;
        background: #3296fa;
        color: #fff;
      }
    }
    .informul{
      width: 100%;
      height: 500px;
      overflow: scroll;
      .liinform{
        display: flex;
        .diver{
          color: #56BDBD;
        }
        .yellow{
          color: #FDBD00;
        }
        .divlist{
          width:116.38px;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: space-evenly;
          border-left:1px solid  rgb(230, 229, 229);
          border-bottom: 1px solid  rgb(230, 229, 229);
        }
        div{
          width:  59px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding: 10px 0 10px 0;
          border-left:1px solid rgb(230, 229, 229);
          border-bottom:1px solid rgb(230, 229, 229);
        }
        .redcolor{
          color: red;
        }
        .rightborder{
          border-right:1px solid rgb(230, 229, 229);
        }
      }
    }
  }

</style>