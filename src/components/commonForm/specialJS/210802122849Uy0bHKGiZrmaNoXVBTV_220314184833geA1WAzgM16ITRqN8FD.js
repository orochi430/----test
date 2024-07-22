// 【西藏自治区人民政府移动办公项目】加班登记 自动计算每日加班时长和金额
const exportObj = {};
/*
加班时间和金额规则
1.允许加班时间：工作日：13:00-15:30 18:30-9:30
全天：周末、节假日
2.加班最少三小时，三小时以上计算加班费，三小时内无加班费
3.三小时加班45元，每增加1小时加15元
4.自动计算每日加班时长和金额
5.每日加班费最高100元
*/
exportObj.initHandle = function (formData, formStruct, vueData) {
    let Subtables = formData.multinfos["220713122026zoYt9qX5mEL6535GpYT"].rows
    function filterTime(time){
      var str=time.replace(/-/g,"/")
      return Date.parse(str)
    }
    // 计算时长和总钱数函数
  function computeSum (){
    let sum = 0
    let times = 0
    Subtables.forEach((item)=>{
      if(!item["220717150242SJhkF7vabCgyZ5XHzsU"].value || !item["220717150718jRxiKW36CfgfPka4ZUk"].value){
        return
      }
      let start=filterTime(item["220717150242SJhkF7vabCgyZ5XHzsU"].value)
      let end=filterTime(item["220717150718jRxiKW36CfgfPka4ZUk"].value)
      let utc=end-start;
      let time=Math.round(utc/(60*60*1000)*10) / 10 //四舍五入保留一位小数
      if(time <= 0) {
        dsf.layer.toast("结束时间必须晚于开始时间")
        item["220717150718jRxiKW36CfgfPka4ZUk"].value = ''
        item["220717150242SJhkF7vabCgyZ5XHzsU"].value = ''
      } else{
        times += time
      }
    })
    sum = parseInt(times) * 15
    sum >= 45 ? (sum > 100 ? sum = 100 : sum) : sum = 0
    formData.main["B0014"].value = sum
    formData.main["B0025"].value = times
  }
  let flag = false; // 是否是节假日
  let flag1 = false; // 判断工作日是上午
  let flag2 = false; // 判断工作日是下午
  vueData.$bus.on("selectDateTime", function (busObj) {
    console.log(busObj);
    // 开始时间控件校验  new Date().getTime("2022-07-16 00:00")
    if (busObj.metaData.metaId === "220717150242SJhkF7vabCgyZ5XHzsU") {
      if(busObj.subFormIndex == "0") {
        formData.main["B0013"] = Subtables[0]["220717150242SJhkF7vabCgyZ5XHzsU"]
      }
      dsf.http.post(`fn/workOtRegister/judgeDateIsWeekOrholiday?date=${busObj.value.slice(0,10)}`).then(
          (res) => { 
            flag = res.data.code == '200' ? true : false 
              // 不是节假日
            if(!flag){
            let timeStr = busObj.value.slice(11).split(":").join("") // 选择的时间（h，m）
            flag1 = timeStr>='1300' && timeStr<='1530' ? true : false //上午加班开始时间
            flag2 = (timeStr>='1830' && timeStr<='2359') || (timeStr>='0000' && timeStr<='0930') ? true : false //下午加班开始时间
            if(!flag1 && !flag2){ 
              dsf.layer.toast("不是工作日加班时间段")
              Subtables[busObj.subFormIndex]["220717150718jRxiKW36CfgfPka4ZUk"].value = ''
              Subtables[busObj.subFormIndex]["220717150242SJhkF7vabCgyZ5XHzsU"].value = ''
          }
           }
        });
    } else if(busObj.metaData.metaId === "220717150718jRxiKW36CfgfPka4ZUk") {
      let startTime = Subtables[busObj.subFormIndex]["220717150242SJhkF7vabCgyZ5XHzsU"].value // 开始时间
      let endTime = busObj.value // 结束时间
      function compareDate (Date1,Date2,nums){
        return Date.parse(Date1) > Date.parse(Date2) + nums
      }
        if(startTime === ""){
          dsf.layer.toast("请先选择开始时间")
          Subtables[busObj.subFormIndex]["220717150718jRxiKW36CfgfPka4ZUk"].value = ''
        } else {
          let startDate = new Date(startTime.slice(0, 10)) // 开始日期
          let days = new Date(endTime).getDate() - startDate.getDate() // 跨几天加班
          let flag3 = (Date.parse(startTime) >= Date.parse(startDate)+1000*60*60*10.5) && days != 0 ? true : false // 跨天加班
          console.log(flag3);
          if(flag1 && compareDate(endTime,startDate,1000*60*60*7.5)){
            dsf.layer.toast('超出工作日上午加班时间（13:00-15:30）')
            Subtables[busObj.subFormIndex]["220717150718jRxiKW36CfgfPka4ZUk"].value = ''
          } else if (flag2 && !flag3){
            if(Date.parse(startTime) < Date.parse(startDate)+1000*60*60*1.5 && compareDate (endTime,startDate,1000*60*60*1.5)){
              dsf.layer.toast('超出工作日下午加班时间（18:30-09:30(+1)）')
              Subtables[busObj.subFormIndex]["220717150718jRxiKW36CfgfPka4ZUk"].value = ''
            } else if( days > 1){
              dsf.layer.toast('超出工作日下午加班时间（18:30-09:30(+1)）')
              Subtables[busObj.subFormIndex]["220717150718jRxiKW36CfgfPka4ZUk"].value = ''
            }
          } else if (flag2 && flag3 && compareDate (endTime,startDate,1000*60*60*25.5)){
              dsf.layer.toast('超出工作日下午加班时间（18:30-09:30(+1)）')
              Subtables[busObj.subFormIndex]["220717150718jRxiKW36CfgfPka4ZUk"].value = ''
          }
          computeSum()
        }
    }
  });
  vueData.$bus.on("subFormDelete", function (busObj) {
    computeSum()
    if(busObj.subFormId == "220713122026zoYt9qX5mEL6535GpYT"){
      formData.main["B0013"] = Subtables.length == 0 ? "" : Subtables[0]["220717150242SJhkF7vabCgyZ5XHzsU"]
    }
  });
};
export default exportObj;
