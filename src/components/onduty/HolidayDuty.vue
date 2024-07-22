<template>
  <div>
      <van-nav-bar
        :title="navBarTitle"
        left-text="前一年"
        right-text="后一年"
        @click-left="onClickLeft"
        @click-right="onClickRight"
        />
        <div v-for="(item,index) in holidayArray" :key="index">
          <van-row class="holidaytitle">
            <van-col span="22" offset="2"> {{item.Name}}（值班时间：{{item.startTime}}至{{item.endTime}}）</van-col>
          </van-row>
          <van-row>
            <van-col span="24">
                <van-collapse v-model="item.activeNames">
                  <van-collapse-item :name="idx" class="collItem" v-for="(dept,idx) in item.dutyDept" :key=idx>
                    <template #title>
                      <div class="itemtitle">{{dept.deptName}}</div>
                    </template>
                    <div v-for="(user,uidx) in dept.dutyUser" :key="uidx">
                      <van-row class="myrow" type="flex" justify="space-between"  gutter="20">
                        <van-col span="11"><van-icon name="user-o" /> {{user.Name}}</van-col>
                        <van-col span="11"><van-icon name="calendar-o" /> {{user.Time}}</van-col>
                      </van-row>
                      <van-row class="myrow" type="flex" justify="space-between"  gutter="20">
                        <van-col span="11"><van-icon name="phone-circle-o" /> {{user.mobile}}</van-col>
                        <van-col span="11"><van-icon name="phone-o" /> {{user.tel}}</van-col>
                      </van-row>
                    </div>
                  </van-collapse-item>
              </van-collapse>
            </van-col>
          </van-row>
        </div>
  </div>
</template>

<script>
export default {
    name:"HolidayDuty",
    components:{},
    data() {
      return {
        currentYear:new Date().getFullYear(),
        navBarTitle:"",
        holidayArray:[]
      }
    },
    mounted() {},
    created() {
      this.init();
    },
    methods:{
      init(){
        this.navBarTitle=this.currentYear+'年';
        this.dsf.http.get(`/ctrl/mobileholiday/ondutyPersonDept?year=${this.currentYear}`,{}).then(res=>{
            if(res.data.code=="200"){
              let resData=res.data.data.holidayList;
              for (let i = 0; i <resData.length ; i++) {
                 resData[i].activeNames=['0'];
              }
              this.holidayArray=resData;
            }
        });
     
      },
      onClickLeft(){
        this.currentYear--;
        this.navBarTitle=this.currentYear+'年';
        this.init();
      },
      onClickRight(){
        this.currentYear++;
        this.navBarTitle=this.currentYear+'年';
        this.init();
      }
    }
}
</script>

<style>
.holidaytitle{
  background-color: #eeeeee !important;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
}
.myrow{
  height: 0.5rem;
}
.itemtitle{
  text-align:center;
  font-weight: bold;
}
</style>