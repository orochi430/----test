<template>
<div class="container" :style="{minHeight: `calc(100vh - ${dsf.util.getOffsetTop()})`}">
    <div class="chart-container">
    <div class="_btn  _controlBtn">
      <span @click="handClickBtn(0)" :class="isActive=='0' ? '_active' : ''">昨日</span>
      <span @click="handClickBtn(1)" :class="isActive=='1' ? '_active' : ''">今日</span>
      <span @click="handClickBtn(2)" :class="isActive=='2' ? '_active' : ''">总计</span>
    </div>

    <div class="totals">
        <div  @click="toList(tableData.newIncreased,'newIncreased')">
            <span>新增录入</span>
            <span style="color: #0073CA;">{{tableData.newIncreased || 0}}</span>
        </div>
        <div @click="toList(tableData.diseaseIssue,'diseaseIssue')">
            <span>疾控下发</span>
            <span style="color: #F66C6C;">{{tableData.diseaseIssue || 0}}</span>
        </div>
        <div @click="toList(tableData.addressConfirm,'addressConfirm')">
            <span>属地确认</span>
            <span style="color: #FA6400;">{{tableData.addressConfirm || 0}}</span>
        </div>
        <div @click="toList(tableData.transportFail,'transportFail')">
            <span>转运未成功</span>
            <span style="color: #F7B500;">{{tableData.transportFail || 0}}</span>
        </div>
        <div style="border-bottom: none;" @click="toList(tableData.transportSuccess,'transportSuccess')" >
            <span>转运成功</span>
            <span style="color: #E02020;">{{tableData.transportSuccess || 0}}</span>
        </div>
        <div style="border-bottom: none;" @click="toList(tableData.addressBack,'addressBack')">
            <span>属地退回</span>
            <span style="color: #FA6400;">{{tableData.addressBack || 0}}</span>
        </div>
    </div>

    <div style="text-align: center;font-size: var(--font_size_2)">属地统计</div>
    <div id="mainAddress" :style="{width: '100%', height: '100%'}"></div>
    <div style="text-align: center;font-size: var(--font_size_2)">转送医院统计</div>
    <div id="mainHispital" :style="{width: '100%', height: '100%'}"></div>
    <div style="text-align: center;font-size: var(--font_size_2)">时效统计（平均）</div>
    <div id="mainAvg" :style="{width: '100%', height: '100%'}"></div>
  </div>
</div>
</template>
<script>
import echarts from 'echarts'
export default {
    name:"total120",
    data(){
        return {
            isActive:1,
            tableData:{addressConfirm:0,newIncreased:0,addressBack:0,transportFail:0,transportSuccess:0,diseaseIssue:0}
        }
    },
    mounted(){
        this.$nextTick(function() {
            this.tableData={addressConfirm:0,newIncreased:0,addressBack:0,transportFail:0,transportSuccess:0,diseaseIssue:0};
            this.loadData(this.isActive);
        })
    },
    methods:{
        handClickBtn(actidex){
             this.isActive=actidex;
             this.$nextTick(function() {
                this.tableData={addressConfirm:0,newIncreased:0,addressBack:0,transportFail:0,transportSuccess:0,diseaseIssue:0};
                this.loadData(actidex);
            })
        },
        toList(num,action){
            if(num) {
                let tempPath="";
                let queryP={type:(this.isActive+1),street:2};
                //新增录入 fn/list/2203262056424BtKR74wzH53InraLL5/mobile/q?moduleId=2203231557166xI8tOHDMKIjT1QRrnD&
                //属地确认统计 fn/list/220326214539fTuoACgjzNVy8tVawHW/mobile/q?moduleId=2203231557166xI8tOHDMKIjT1QRrnD&
                //疾控下发统计 fn/list/220326214605g6rwc3bmWvHxkxco6Xl/mobile/q?moduleId=2203231557166xI8tOHDMKIjT1QRrnD&
                //转运未成功统计 fn/list/220326214622nq3xgYXKJupNmIk4xvX/mobile/q?moduleId=2203231557166xI8tOHDMKIjT1QRrnD&
                //转运成功统计 fn/list/220326214634fPoRpwxj2m6pJAGfnwF/mobile/q?moduleId=2203231557166xI8tOHDMKIjT1QRrnD&
                //属地退回统计 fn/list/220326214651CHO7vRo3X5hqgXDtK6W/mobile/q?moduleId=2203231557166xI8tOHDMKIjT1QRrnD&
                switch(action){
                    case "newIncreased":
                        tempPath=`commonlist/2203262056424BtKR74wzH53InraLL5/2203231557166xI8tOHDMKIjT1QRrnD`
                        break;
                    case "addressConfirm":
                        tempPath=`commonlist/220326214539fTuoACgjzNVy8tVawHW/2203231557166xI8tOHDMKIjT1QRrnD`
                        break;
                    case "diseaseIssue":
                        tempPath=`commonlist/220326214605g6rwc3bmWvHxkxco6Xl/2203231557166xI8tOHDMKIjT1QRrnD`
                        break;
                    case "transportFail":
                        tempPath=`commonlist/220326214622nq3xgYXKJupNmIk4xvX/2203231557166xI8tOHDMKIjT1QRrnD`
                        break;
                    case "transportSuccess":
                        tempPath=`commonlist/220326214634fPoRpwxj2m6pJAGfnwF/2203231557166xI8tOHDMKIjT1QRrnD`
                        break;
                    case "addressBack":
                        tempPath=`commonlist/220326214651CHO7vRo3X5hqgXDtK6W/2203231557166xI8tOHDMKIjT1QRrnD`
                        break;
                }
                this.$router.push({
                    path:tempPath,
                    query: {
                        secQuery: JSON.stringify(queryP)
                    }
                })
            }



            // if(action=="newIncreased"){
            //     this.$f7router.navigate(`/templatelist/totalInputList120?type=${(this.activeIndex+1)}&street=2`, {
            //         props: {},
            //     });
            // }else if(action=="addressConfirm"){
            //     this.$f7router.navigate(`/templatelist/totalAddressList120?type=${(this.activeIndex+1)}&street=2`, {
            //         props: {},
            //     });
            // }else if(action=="diseaseIssue"){
            //     this.$f7router.navigate(`/templatelist/totalDiseaseIssueList120?type=${(this.activeIndex+1)}&street=2`, {
            //         props: {},
            //     });
            // }else if(action=="transportFail"){
            //     this.$f7router.navigate(`/templatelist/totalTransportFailList120?type=${(this.activeIndex+1)}&street=2`, {
            //         props: {},
            //     });
            // }else if(action=="transportSuccess"){
            //     this.$f7router.navigate(`/templatelist/totalTransportSuccessList120?type=${(this.activeIndex+1)}&street=2`, {
            //         props: {},
            //     });
            // }else if(action=="addressBack"){
            //     this.$f7router.navigate(`/templatelist/totalAddressBackList120?type=${(this.activeIndex+1)}&street=2`, {
            //         props: {},
            //     });
            // }
        },
        loadData(actidex){
            let self=this;

            dsf.http.post("fn/transport/statistical?street=2&type="+(actidex+1),{}).then((res)=>{
                if(res.data.type=="success"){
                    let datatemp=res.data.data;
                    self.tableData.addressConfirm= datatemp.addressConfirm;
                    self.tableData.newIncreased= datatemp.newIncreased;
                    self.tableData.addressBack= datatemp.addressBack;
                    self.tableData.transportFail= datatemp.transportFail;
                    self.tableData.transportSuccess= datatemp.transportSuccess;
                    self.tableData.diseaseIssue= datatemp.diseaseIssue;

                    let hospitalObj={};
                    hospitalObj.dataX=[];
                    hospitalObj.data=[];
                    datatemp.transportHospital.forEach(element => {
                        hospitalObj.dataX.push(element.NAME);
                        hospitalObj.data.push(element.VALUE);
                    });
                    let addressObj={};
                    addressObj.dataX=[];
                    addressObj.data=[];
                    let noConfirmData=[];
                    let confirmData=[];
                    let tableData=[];
                    datatemp.addressTransport.forEach(element => {
                        addressObj.dataX.push(element.NAME);
                        noConfirmData.push(element.VALUE2);
                        confirmData.push(element.VALUE3);
                        tableData.push(element.VALUE);
                    });

                    addressObj.data.push({
                            name:"待确认",
                            type: 'bar',
                            stack: 'block',
                            label: {
                                show: true
                            },
                            emphasis: {
                                focus: 'series'
                            },
                            data: noConfirmData
                        });
                    addressObj.data.push({
                            name:"已确认",
                            type: 'bar',
                            stack: 'block',
                            label: {
                                show: true
                            },
                            emphasis: {
                                focus: 'series'
                            },
                            data: confirmData
                        });
                    // addressObj.data.push({
                    //         name:"总数",
                    //         type: 'bar',
                    //         stack: 'block',
                    //         label: {
                    //             show: true
                    //         },
                    //         emphasis: {
                    //             focus: 'series'
                    //         },
                    //         data: tableData
                    //     });

                    console.log("addressObj",addressObj);

                    let timeStatisticalObj={};
                    timeStatisticalObj.dataX=[];
                    timeStatisticalObj.data=[];
                    datatemp.timeStatistical.forEach(element => {
                        timeStatisticalObj.dataX.push(element.NAME);
                        timeStatisticalObj.data.push(element.VALUE);
                    });
                    self.drawChart('mainHispital',hospitalObj)
                    self.drawBarChart('mainAddress',addressObj)
                    self.drawTimeChart('mainAvg',timeStatisticalObj)
                }
            })
        },
        drawBarChart(div,dataObj){
            var myChart = echarts.init(document.getElementById(div));
            let option = {
                tooltip: {
                    show:true,
                    trigger: 'axis',
                    axisPointer: {
                    // Use axis to trigger tooltip
                    type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
                    },
                    //formatter: '{b0}: {c0}<br />{b1}: {c1}'
                    formatter:function(params){
                        //console.log(JSON.stringify(params));
                        let p=params[0];
                        let tempStr= p.name+"<br/>";
                        let total=0;
                        params.forEach(ele=>{
                            total+=ele.value;
                            tempStr+=ele.marker+ele.seriesName+"<span style=\"display:inline-block;width:60px;text-align:right;\">"+ele.value+"</span>"+"<br/>";
                        })
                        tempStr+="<span style=\"display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:#d5d5d5;\"></span>"+"总数"+"<span style=\"display:inline-block;width:60px;text-align:right;float:right;\">"+total+"</span>"+"<br/>";
                        return tempStr
                    }
                },
                legend: {},
                color: ['#ee6666','#4096E9','#fac858'],
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value'
                },
                yAxis: {
                    type: 'category',
                    data:dataObj.dataX, //,
                    inverse: true//倒叙
                },
                series: dataObj.data
            };
            // 使用刚指定的配置项和数据显示图表。
            //option.series.reverse()
            myChart.setOption(option);
        },
        drawTimeChart(div,dataObj){
            var myChart = echarts.init(document.getElementById(div));
            let option = {
                // title: {
                //     text: 'World Population'
                // },
                color: ['#4096E9'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                    formatter:function(params){
                        let hours=parseInt( params[0].value/60);
                        let minutes=params[0].value%60;
                        if(hours==0&&minutes==0)return 0;
                        if(hours==0&&minutes>0) return `${minutes}分钟`;
                        return `${hours}小时${minutes}分钟`;
                    }
                    //formatter: '{a0}: {b0}:{c0}'
                },
                legend: {show:false},
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },
                yAxis: {
                    type: 'category',
                    data: dataObj.dataX,
                    inverse: true//倒叙
                },
                series: [
                    {
                    name:(new Date().getMonth()+1)+"-"+new Date().getDate(),
                    type: 'bar',
                    label: {
                        show: true,
                        position: 'right',formatter:function(params){
                            let hours=parseInt( params.value/60);
                            let minutes=params.value%60;
                            if(hours==0&&minutes==0)return 0;
                            if(hours==0&&minutes>0) return `${minutes}分钟`;
                            return `${hours}小时${minutes}分钟`;
                        }

                    },
                    data: dataObj.data
                    }
                ]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        },
        drawChart(div,dataObj){
            var myChart = echarts.init(document.getElementById(div));
            let option = {
                // title: {
                //     text: 'World Population'
                // },
                color: ['#4096E9'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                //legend: {},
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },
                yAxis: {
                    type: 'category',
                    data: dataObj.dataX,
                    inverse: true//倒叙
                },
                series: [
                    {
                    name:(new Date().getMonth()+1)+"-"+new Date().getDate(),
                    type: 'bar',
                    label: {
                        show: true,
                        position: 'right'
                    },
                    data: dataObj.data
                    }
                ]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        }
    }
}
</script>
<style lang="scss" src="@/assets/styles/dlist.scss"></style>
<style lang='scss' scoped>
.container {
    background-color: #fff;
    .chart-container{
    width: 100%;
    height: 100vw;
    position: relative;
    // margin: 0 10px;
    .echarts {
      width: 100%;
      height: 100%;
    }
    ._btn {
      padding: 11px 14px 11px 0;
      display: flex;
      justify-content: flex-end;
      position: fixed;
      top:43px;
      right: 0;
      // background: #fff;
      z-index: 9;
      width: 100%;

      span {
        border: 1px solid #e2e4e5;
        // @include font_6(true);
        padding: 3px 9px;
        &:first-child {
          border-radius: 30px 0 0 30px;
        }
        &:last-child {
          border-radius: 0 30px 30px 0;
        }
      }

      ._active {
        // @include background-theme("normal");
        // @include border-color-theme("normal");
        background-color: #235ABD ;
        border-color: #235ABD;
        color: #fff;
      }
    }
  }
}
</style>
