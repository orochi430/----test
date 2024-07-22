<template>
  <div class="box commonListWrap" ref="commonListWrap">
    <van-sticky :offset-top="dsf.util.getOffsetTop()">
      <div class="sticky" ref="sticky">
        <div class="controlBox showQicheng" v-if="configJson.showQicheng">
          <div span="24">
            <van-cell :border="false">启程时间:</van-cell>
            <van-field
              class="qichengTime"
              :readonly='true'
              placeholder="启程时间"
              v-model="timeVal"
              @click='inClickFn'
            />
          </div>
        </div>

        <div class="showDateSec controlBox" v-if="configJson.showDateSec">
          <div style="display:flex;align-items:center;padding:10px;border-bottom:10px solid #f2f3f5;">
            <span style="width:60px;font-size:15px;">日期:</span>
            <van-field
                class="qichengTime"
                :readonly='true'
                placeholder="请选择日期"
                v-model="timeVal"
                @click='inClickFn'
              />
          </div>

        </div>
        <!--  年度选择点击事件-->
        <div class="yearSec" v-if="configJson.yearSec" >
          <van-cell @click="showPicker('year')">
            <!-- 使用 title 插槽来自定义标题 -->
            <template #title >
              <span class="custom-title">年度：&nbsp;&nbsp;&nbsp;&nbsp;{{configJson.showData.year}}</span>
            </template>
            <template #right-icon>
              <!-- 年度选择icon -->
              <van-icon name="more-o" class="" />
            </template>
          </van-cell>
        </div>
        <!--  节假日选择点击事件-->
        <div class="holidaySec" v-if="configJson.holidaySec" >
          <van-cell @click="showPicker('holiday')">
            <!-- 使用 title 插槽来自定义标题 -->
            <template #title>
              <span class="custom-title">节假日：{{configJson.showData.holidayName}}</span>
            </template>
            <template #right-icon>
              <!-- 节假日选择icon -->
              <van-icon name="more-o" class="" />
            </template>
          </van-cell>
        </div>

        <div class="infoBox" v-if="configJson.infoBox">
          <div class="info">
            <div class="bjzf ">
              本级政府：<span class="_grey">{{configJson.showData.dlqyText}}</span>
            </div>
            <div class="sbInfo" v-if="configJson.showData.bszt>=3">
              已上报：<span class="_grey">{{configJson.showData.bssj}}</span>
            </div>
            <div class="sbInfo" v-else>
              未上报
            </div>
          </div>
          <div class="infobtn" v-if="configJson.showData.bszt<3" @click="goWrite">
            <van-button size="mini" type="info">去填报</van-button>
          </div>
        </div>
      </div>

    </van-sticky>
    <!-- xingchengtongji_huizong -->
    <van-tabs v-if="configJson.huizongTab" :sticky="true" :offset-top="dsf.util.getOffsetTop(firstOffsetHeight)"  ref="tabs" v-model="activeName" @change="huizongTab" :border="false" >
      <van-tab v-for="(item,index) in configJson.tabs"  :key="index" :badge="item.count?item.count:''" >
        <template #title>
          <div ref="firstTitle">
            {{item.title}}
          </div>
        </template>
        <common-list v-if="showList" @changeData="tabChangeData" :oppsetTop="listOffsetHeight" :params="item.params" :filterData="item.filterData"></common-list>
      </van-tab>
    </van-tabs>
    <!-- daibantongji -->
    <van-tabs v-if="configJson.daibanTab" :sticky="true" :offset-top="dsf.util.getOffsetTop(firstOffsetHeight)"  ref="tabs" v-model="activeName" @change="changedaibanTab" :border="false" >
      <van-tab v-for="(item,index) in configJson.tabs"  :key="index" :badge="item.count?item.count:''"  :title-class="{ superTab:configJson.hasSubTab }">
        <template #title>
          <div ref="firstTitle">
            {{item.title}}
          </div>
        </template>
        <van-tabs class="subTransFormLine" ref="subTab" :sticky="true" :offset-top="dsf.util.getOffsetTop(subOffsetHeight)" v-model="item.subTabIndex" v-if="item.subTabs" @change="subChange">
          <van-tab v-for="(itm,inx) in item.subTabs" :key="inx"  :name="itm.value" :badge="itm.count?itm.count:''" >
            <template #title>
              <div ref="subTitle">
                {{itm.tabType}}
              </div>
            </template>
            <common-list v-if="itm.isCommonList&&showList" @changeData="tabChangeData" :oppsetTop="listOffsetHeight" :filterData="itm.params.filterData"  :params="itm.params" ></common-list>
            <dxq-list v-if="(!itm.isCommonList)&&showList" :dataList="itm.wtjArray" :holiday="configJson.showData.holidayName" :year="configJson.showData.year" ></dxq-list>
          </van-tab>
        </van-tabs>
      </van-tab>
    </van-tabs>
    <!-- xingchengtongji_shanbao -->
    <van-tabs v-if="configJson.shangbaoTab" :sticky="true" :offset-top="dsf.util.getOffsetTop(firstOffsetHeight)"  ref="tabs" v-model="activeName" @change="changeTab" :border="false" >
      <van-tab v-for="(item,index) in configJson.tabs" :title="item.title" :key="index" :badge="item.count?item.count:''"  :title-class="{ superTab:configJson.hasSubTab }">
        <template #title>
          <div ref="firstTitle">
            {{item.title}}
          </div>
        </template>
        <div class="listBox" v-if="configJson.shangbaoTab">
          <common-list v-if="showList" @changeData="tabChangeData" :oppsetTop="listOffsetHeight" :params="configJson.params" :filterData="item.filterData"></common-list>
        </div>
      </van-tab>
    </van-tabs>
    <common-list v-if="showList&&configJson.pingan" @changeData="tabChangeData" :oppsetTop="0" :params="configJson.params" :filterData="configJson.filterData"></common-list>
    <div class="btnWrap" v-if="configJson.footerBtn&&configJson.footerBtn.show">
      <van-button type="info" @click="Ding('Ding')" >点名</van-button>
      <van-button type="info" @click="Ding('Video')" >语音会议</van-button>
    </div>
    <van-popup v-model="showCalendar" position="bottom" round get-container="#app" :style="{ height: '500px' }">
      <van-calendar
        :poppable="false"
        :first-day-of-week="controlData.firstDayOfWeek"
        :type='controlData.type'
        :title='controlData.title'
        :show-mark='controlData.showMark'
        :show-confirm="controlData.showConfirm"
        :color='controlData.color'
        :min-date='controlData.minDate'
        :max-date='controlData.maxDate'
        ref='calendarRef'
        @confirm="onConfirm"
      >
      </van-calendar>
    </van-popup>
    <van-popup
      :style="{ height: '40vh' }"
      v-model="showYearPicker"
      :close-on-click-overlay="true"
      lock-scroll
      position="bottom"
      round
    >
      <van-picker
        title="选择"
        show-toolbar
        :columns="showColumns"
        @confirm="yearComfirm"
        @cancel="showYearPicker=false"
      />
    </van-popup>

    <van-popup :close-on-click-overlay="false" v-model="showPerson" get-container="#app" :style="{ height: '100%' }" position="bottom">
      <selectPerson v-if="showPerson" :selectPersons="selectPersons"  @cancePerson="cancePerson" @dingding="dingding"></selectPerson>
    </van-popup>
  </div>
</template>

<script>
import {
		mapState
	} from 'vuex'
import selectPerson from "@/components/selectPerson/dingPerson";
import commonList from "./DefaultList"
import dxqList from "./dxqList"
export default {
  name:"commonListWrap",
  components:{
    commonList,
    dxqList,
    selectPerson
  },
  data(){
    return {
      activeName:"",
      subActive:"",
      filterData:{},
      params:{},
      configJson:{},
      timeVal:"",
      showCalendar:false,
      controlData:{
				inputAlign:'right',
				type:'range',//multiple,range,single 时间控件类型，单选，多选，阶段
				title:'启程时间',//控件标题
				placeholder:'时间选择',
				color:'#3296FA',//控件选中颜色
				minDate:new Date(new Date().getFullYear() - 40, 0, 1),//可选择的最小日期
				maxDate:new Date(new Date().getFullYear() + 10, 11, 31),//可选择的最大日期
				confirmText:'确定',//确认按钮的文字
				confirmDisText:'请选择',//确认按钮处于禁用状态时的文字
				position:'bottom',
				maxRange:'5',//	日期区间最多可选天数
				showMark:true,//水印背景是否显示
				showConfirm:true,//是否展示确认按钮
				round:true,
				rangePrompt:'超出可选范围',//范围选择超过最多可选天数时的提示文案
        allowSameDay:true,//范围起止同一天
        firstDayOfWeek:"1",
      },
      showList:false,
      firstOffsetHeight:"",
      subOffsetHeight:"",
      listOffsetHeight:"",
      ifSb:true,
      hasSubTab:false,
      showYearPicker:false,
      yearColumns: ['2021', '2020',"2019"],
      showColumns:[],
      holidayColumns:["元旦","清明","劳动节","中秋节","端午节"],
      pickType:"",
      showPerson:false,
      dingType:"Ding",
      selectPersons:[],
      allList:[],
      nowDay:""
    }
  },
  computed: {
    ...mapState({
      isShowAppFooter: state => state.isShowAppFooter,
      isShowAppHeader: state => state.isShowAppHeader
    })
  },
  created(){
    this.init()

  },
  methods:{
    Ding(dingType){
      this.dingType=dingType
      if(this.selectPersons.length<1){
        dsf.layer.toast("暂无可操作人员")
        return
      }
      this.showPerson=true
    },
    cancePerson(){
      this.showPerson=false
    },
    dingding(forienArr){
      const users = forienArr;
      console.log(users)
      if(!forienArr.length){
        dsf.layer.toast("暂无可发人员")
        return
      }
      if(this.dingType=="Ding"){

        dsf.dd.serverDing(users)
      }else{
        let videoArr=users.map((item,index)=>{
          let data=this.allList.find(itm=>itm.dataValue["A0001.value"]==item)
          console.log(data)
          if(data){
            return data.dataValue["B0009.value"]
          }else{
            return ""
          }
        })
        console.log(videoArr)
        dsf.dd.video({
          title: "值班人员平安会议",
          calleeCorpId: dsf.config.ddSetting.ddCoprId,
          calleeStaffIds: videoArr,
          onSuccess: function (res) {
          },
          onFail: function (e) {
            dsf.layer.toast('发起会议失败，存在未激活用户。', false);
          },
          success:function(){
            toast = {
              msg: '开始视频',
              type: false
            }
          }
        });
      }

    },
    goWrite(){
      this.$router.push(`/commonForm/201125171531HhP41e8lrLw0T7kuFXK/${this.configJson.tbid}`)
    },
    tabChangeData(data){
      if(this.$route.params.moduleType=="xingchengtongji_huizong"){
        this.$set(this.configJson.tabs[data.params.orgType.index],"count",data.total)
      }
      if(this.$route.params.moduleType=="daibantongji"){
        console.log(data)
        console.log(this.configJson.tabs[data.params.orgType.index])
        this.$set(this.configJson.tabs[data.params.orgType.index].subTabs[0],"count",data.total)
      }
      if(this.$route.params.moduleType=="xingchengtongji_shanbao"){
        console.log(data)
        console.log(this.configJson.tabs[this.activeName])
        this.$set(this.configJson.tabs[this.activeName],"count",data.total)

      }
      if(this.$route.params.moduleType=="zhibantongji"){
        console.log(data)
        let firstType=this.activeName
        let subType=this.configJson.tabs[this.activeName].subTabIndex
        console.log(firstType,subType)
        this.$set(this.configJson.tabs[firstType].subTabs[subType],"count",data.total)

      }
    },
    showPicker(pickType){
      console.log(pickType)
      this.pickType=pickType
      if(pickType=="year"){
        this.showColumns=this.yearColumns
      }else{
        this.showColumns=this.holidayColumns
      }
      this.showYearPicker=true
    },
    yearComfirm(value,index){
      let params={}
      if(this.pickType=="year"){
        this.configJson.showData.year=value
        params.year=value
      }else{
        this.$set(this.configJson.tabs[0].subTabs[0].params.filterData,"holidayId",value.id)
        this.$set(this.configJson.tabs[1].subTabs[0].params.filterData,"holidayId",value.id)
        params.holidayId=value.id
      }
      this.initData(params)
      this.showYearPicker=false
    },
    initData(params){
      if(params&&params.year){
        dsf.http.get(this.configJson.pickUrl,{year:params.year})
        .then(res=>{
          let holidayArr=res.data.data
          holidayArr.forEach((item,index)=>{
            item.text=item.holidayName
          })
          this.configJson.showData.holidayName=""
          this.holidayColumns=holidayArr
          if(this.holidayColumns.length){
            this.showPicker("holiday")
          }else{
            dsf.layer.toast("该年暂无节假日数据,现跳转至本年")
            this.init()
          }
        })
        return
      }
      dsf.http.get(this.configJson.configUrl,params).then(({data})=>{
        // this.configJson.showData.year=data.data.year
        this.configJson.showData.holidayName=data.data.holidayName
        this.configJson.showData.dlqyText=data.data.dlqyText
        this.configJson.showData.bszt=data.data.bszt
        this.configJson.showData.bssj=data.data.bssj
        this.configJson.showData.holidayId=data.data.holidayId
        this.configJson.tabs[0].subTabs[0].params.filterData.holidayId=data.data.holidayId
        this.configJson.tabs[1].subTabs[0].params.filterData.holidayId=data.data.holidayId
        this.configJson.tbid=data.data.tbid

        this.configJson.tabs[0].subTabs[0].count=data.data.count[0].tj
        this.configJson.tabs[0].subTabs[1].count=data.data.count[0].wtj
        this.configJson.tabs[0].subTabs[1].wtjArray=data.data.count[0].wtjArray
        this.configJson.tabs[1].subTabs[0].count=data.data.count[1].tj
        this.configJson.tabs[1].subTabs[1].count=data.data.count[1].wtj
        this.configJson.tabs[1].subTabs[1].wtjArray=data.data.count[1].wtjArray



      })
    },
    formatDate(date,type) {
      if(type==1){
        return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
      }else{
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      }
		},
    changeTab(index,val){
      if(this.configJson._type=="xingchengtongji_shanbao"){
        this.configJson.tabFilterKey.forEach((item,inx)=>{
          if(this.configJson.tabs[index][item]){
            console.log(item)
            this.$set(this.filterData,item,this.configJson.tabs[index][item])
          }
        })
      }
    },
    huizongTab(index,val){
      let tab=this.configJson.tabs[index]
      tab.tabFilterKey.forEach((item)=>{
        this.$set(this.configJson.tabs[index].filterData,item,tab[item])
      })

    },
    changedaibanTab(index,val){
      console.log(index,val)
    },
    subChange(index,val){
      console.log(index,val)
    },
    inClickFn(){
      this.showCalendar=true
    },
    onConfirm(date){
      console.log(date)
      if(this.controlData.type=="single"){
        this.timeVal=this.formatDate(date)
        this.configJson.tabs.forEach((item,index)=>{
          this.$set(this.configJson.tabs[index].subTabs[0].params.filterData,"query_B0013",`${this.timeVal} - ${this.timeVal}`)
          this.$set(this.configJson.tabs[index].subTabs[1].params.filterData,"query_B0013",`${this.timeVal} - ${this.timeVal}`)
        })
        let now=dsf.date.format(new Date(), "yyyy-mm-dd")
        this.configJson.footerBtn.show=this.timeVal==now?true:false
        this.initTabCount({date:`${this.timeVal}`})
      }else{
        let dateValue=date.map((item,index)=>{
          return this.formatDate(item)
        })
        date=date.map((item,index)=>{
          return this.formatDate(item,1)
        })
        console.log(date)
        this.timeVal=`${date[0]}-${date[1]}`
        this.configJson.tabs.forEach((item,index)=>{
          this.$set(this.configJson.tabs[index].filterData,"startTime",dateValue[0])
          this.$set(this.configJson.tabs[index].filterData,"end",dateValue[1])
        })
        this.initTabCount({
          startTime:dateValue[0],
          end:dateValue[1],
        })
      }
      this.showCalendar=false

    },
    initTabCount(params){
      let self=this
      dsf.http.get(self.configJson.configUrl,params).then(({data})=>{
        if(this.configJson._type=="zhibantongji"){
          this.configJson.tabs[0].subTabs[0].count=data.data[0].fk
          this.configJson.tabs[0].subTabs[1].count=data.data[0].wfk
          this.configJson.tabs[1].subTabs[0].count=data.data[1].fk
          this.configJson.tabs[1].subTabs[1].count=data.data[1].wfk
          return
        }
        data.data.array.forEach((itm,index)=>{
          self.$set(self.configJson.tabs[index],"count",Number(itm.count))
        })
        console.log(this.configJson.tabs)
      })
    },
    init(){
      console.log(this.$route.params)
      dsf.http.get("static/commonListWrap.json").then(({data})=>{
        let configData=data[this.$route.params.moduleType]
        this.configJson=configData
        this.params=configData.params
        if(this.configJson.showDateSec){
          this.controlData.type="single"
        }
        if(this.$route.params.moduleType=="pinganfankui"){
          console.log(dsf.util.loadSessionStore("pingan_fid"))
          this.configJson.filterData.fid=this.$route.params.fid||dsf.util.loadSessionStore("pingan_fid")
          dsf.util.saveToSessionStore("pingan_fid",this.configJson.filterData.fid );
        }
        if(configData.showQicheng){
          var myDate = new Date();
          let week=dsf.date.getMonthWeekDate(myDate.getFullYear(),myDate.getMonth(),myDate.getDate()).list
          this.timeVal=`${this.formatDate(week[0].date,1)}-${this.formatDate(week[6].date,1)}`
          this.$set(this.filterData,"startTime",this.formatDate(week[0].date))
          this.$set(this.filterData,"endTime",this.formatDate(week[6].date))
        }
        if(configData._type=="zhibantongji"){
          configData.configParams.date=dsf.date.format(new Date(), "yyyy-mm-dd")
          this.configJson.tabs.forEach((item,index)=>{
            this.$set(this.configJson.tabs[index].subTabs[0].params.filterData,"query_B0013",`${configData.configParams.date} - ${configData.configParams.date}`)
            this.$set(this.configJson.tabs[index].subTabs[1].params.filterData,"query_B0013",`${configData.configParams.date} - ${configData.configParams.date}`)
            configData.footerBtn.btns[0].config.configParams.query_B0013=`${configData.configParams.date} - ${configData.configParams.date}`
          })
          dsf.http.get(configData.footerBtn.btns[0].config.url,configData.footerBtn.btns[0].config.configParams||{})//
          .then(({data})=>{
            console.log(data)
            this.allList=data.datas
            data.datas.forEach((item)=>{
              let obj={
                user_name:item.dataValue["B0051"],
                foreign_id:item.dataValue["A0001.value"],
                foreignId:item.dataValue["A0001.value"],
                id:item.dataValue["A0001.value"],
              }
              this.selectPersons.push(obj)
            })
            console.log(this.selectPersons)
          })
        }
        dsf.http.get(configData.configUrl,configData.configParams||{}).then(({data})=>{
          let struct=data
          if(configData._type=="xingchengtongji_shanbao"){
            data.data.array.forEach((item,index)=>{
              let tab=JSON.parse(JSON.stringify(this.configJson.tabs[index]))

              tab.count=Number(item.count)
              tab.startTime=item.start
              tab.title=item.title
              tab.end=item.end
              tab.filterData={
                startTime:item.start,
                end:item.end,
                fbcc:data.data.fbcc
              }
              this.$set(this.configJson.tabs,index,tab)
            })
            console.log(this.configJson.tabs)
            this.changeTab(0)
          }
          if(configData._type=="xingchengtongji_huizong"){
            data.data.array.forEach((item,index)=>{
              let tab=JSON.parse(JSON.stringify(this.configJson.tabs[index]))

              tab.count=Number(item.count)
              tab.title=item.title
              tab.filterData={
                startTime:data.data.start,
                end:data.data.end
              }
              if(item.dlqy){
                tab.dlqy=item.dlqy
                tab.unitId=data.data.unitId
              }
              this.$set(this.configJson.tabs,index,tab)
            })
            console.log(this.configJson.tabs)
            this.huizongTab(0)
          }
          if(configData._type=="daibantongji"){
            console.log(this.configJson)
            this.configJson.showData.year=data.data.year
            this.configJson.showData.holidayName=data.data.holidayName
            this.configJson.showData.dlqyText=data.data.dlqyText
            this.configJson.showData.bszt=data.data.bszt
            this.configJson.showData.bssj=data.data.bssj
            this.configJson.showData.holidayId=data.data.holidayId
            this.configJson.tabs[0].subTabs[0].params.filterData.holidayId=data.data.holidayId
            this.configJson.tabs[1].subTabs[0].params.filterData.holidayId=data.data.holidayId
            this.configJson.tabs[0].subTabs[0].params.params.unitId =data.data.unitId
            this.configJson.tabs[1].subTabs[0].params.params.unitId =data.data.unitId
            this.configJson.tbid=data.data.tbid

            this.configJson.tabs[0].subTabs[0].count=data.data.count[0].tj
            this.configJson.tabs[0].subTabs[1].count=data.data.count[0].wtj
            this.configJson.tabs[0].subTabs[1].wtjArray=data.data.count[0].wtjArray
            this.configJson.tabs[1].subTabs[0].count=data.data.count[1].tj
            this.configJson.tabs[1].subTabs[1].count=data.data.count[1].wtj
            this.configJson.tabs[1].subTabs[1].wtjArray=data.data.count[1].wtjArray
            console.log(this.configJson)
            dsf.http.get(configData.pickUrl,{year:data.data.year})
            .then(res=>{
              let holidayArr=res.data.data
              holidayArr.forEach((item,index)=>{
                item.text=item.holidayName
              })
              this.holidayColumns=holidayArr
            })
            this.hasSubTab=true
          }
          if(configData._type=="zhibantongji"){
            this.timeVal=this.nowDay=dsf.date.format(new Date(), "yyyy-mm-dd")
            this.configJson.tabs[0].subTabs[0].count=data.data[0].fk
            this.configJson.tabs[0].subTabs[1].count=data.data[0].wfk
            this.configJson.tabs[1].subTabs[0].count=data.data[1].fk
            this.configJson.tabs[1].subTabs[1].count=data.data[1].wfk

          }
          this.$nextTick(()=>{
            // 计算各部分高度，如果不存在则取 0 (需将固定高度进行rem适配转换)
            let docFontsize = document.documentElement.style.fontSize.split('px')[0]
            let stickyHeight = this.$refs.sticky ? this.$refs.sticky.offsetHeight : 0
            let firstTitleHeight = this.$refs.firstTitle ? 44 / 50 * docFontsize : 0
            let subOffsetHeight = this.$refs.subTitle ? 44 / 50 * docFontsize : 0
            let headerHeight = 46 / 50 * docFontsize

            // 所有情况下，一级tab的粘性布局高度都为firstOffsetHeight，二级tab的为subOffsetHeight，列表的为listOffsetHeight
            this.firstOffsetHeight = this.isShowAppHeader ? stickyHeight + headerHeight : stickyHeight
            this.subOffsetHeight = this.isShowAppHeader ? stickyHeight + firstTitleHeight + headerHeight : stickyHeight + firstTitleHeight
            this.listOffsetHeight = this.isShowAppHeader ? stickyHeight + firstTitleHeight + subOffsetHeight + headerHeight : stickyHeight + firstTitleHeight + subOffsetHeight

            if(this.$refs.tabs){
              this.$refs.tabs.resize();
            }
            this.showList=true
          })
        })
      })
    }
  }
}

</script>

<style lang="scss" scoped>
.commonListWrap{
  width:100%;
  height:100%;
  .btnWrap{
    display:flex;
    position: fixed;
    width:100%;
    background:white;
    bottom:0;
    padding:10px 0;
  }
  .sticky{
    background:white;
  }
  .controlBox{
    width:100%;
    // height:200px;

  }
  .holidaySec{
    border-bottom:10px solid #f5f5f5;
  }
  .infoBox{
    padding:10px 15px;
    background:white;
    display:flex;
    .info{
      flex:1;
      >div{
        line-height: 24px;
        ._grey{
          color:#cecece;
        }
      }


    }
  }
}

</style>
<style lang="scss">
.commonListWrap{
  .van-info {
    padding: 2px 5px;
    background-color: #f65959;
    display: inline-block;
    transform: translate(20px, 2px);
  }
  .showQicheng{
    padding-top: 10px;
    .van-cell__value{
      font-size: var(--font_size_2);
    }
  }
  .btnWrap{
    .van-button{
      flex:1;
      margin:0 15px;
    }
  }
  .showDateSec{
    .van-cell__title{
      width:20px;
    }
  }
  .controlBox{
    .qichengTime{
      .van-field__body{
        input{
          color:#cecece;
        }
      }
    }
    .van-cell{
      padding-top:0px;
      padding-bottom:0px;
    }
  }
  .subTransFormLine{
    .van-tabs__line{
      display:none;
    }
  }
}

.superTab{
  max-width: 80px;
  // line-height: ;
}
</style>
