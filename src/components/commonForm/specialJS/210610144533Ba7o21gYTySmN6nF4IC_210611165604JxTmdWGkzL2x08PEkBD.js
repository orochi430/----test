import dsf from "../../../common";

// 加班申请
const exportObj = {};

async function calculationTime(sDate1, sDate2) {//sDate1和sDate2是字符串 yyyy-MM-dd格式 
  var days = 0;
  var sc = 0;
  var daysOff = 0;
  var nextDate = "";
  var result = {};
  //两个时间相减看相差几天
  var time = new Date(sDate1.substring(0, 10)).getTime() - new Date(sDate2.substring(0, 10)).getTime();
  //因为需要循环i从1开始，会少一天所以需增加一天
  var differDay = parseInt(time / 1000 / 60 / 60 / 24) + 1;
  //增加跨天时间循环
  if (sDate2.substring(0, 10) != sDate1.substring(0, 10)) {
    for (var i = 1; i <= differDay; i++) {
      if (!nextDate) {
        //判断结束日期是否在8点半之前
        await dateDiff(sDate2.substring(0, 10) + " 23:59", sDate2).then(async res => {
          var diffDays = res
          //判断是否节假日
          if (diffDays.IsHoliday) {
            sc = (diffDays.SC).toFixed(1);
            days = diffDays.Hours;
            daysOff = diffDays.Hours;
          } else {
            await beginDate(sDate2, 1).then(res => {
              var begin = res
              sc = parseFloat(begin.SC) + parseFloat(sc);
              days = begin.Days + days;
            });
          }
        });
      } else {
        //如果是节假日需要查询后台最新一条数据，进行累加天数(已审核通过的单子)
        if (nextDate.substring(0, 10) == sDate1.substring(0, 10)) {
          await dateDiff(sDate1, sDate1.substring(0, 10) + " 00:00").then(async res => {
            var diffDays = res
            if (diffDays.IsHoliday) {
              sc = parseFloat(sc) + parseFloat((diffDays.SC).toFixed(1));
              days = days + diffDays.Hours;
              daysOff = daysOff + diffDays.Hours;
            } else {
              await endDate(sDate1, 1).then(res => {
                var end = res
                sc = parseFloat(sc) + parseFloat(end.SC);
                days = days + end.Days;
              });
            }
          });
          break
        } else {
          await dateDiff(nextDate.substring(0, 10) + " 23:59", nextDate.substring(0, 10) + " 00:00").then(res => {
            var diffDays = res
            if (diffDays.IsHoliday) {
              sc = parseFloat(sc) + parseFloat((diffDays.SC).toFixed(1));
              days = days + diffDays.Hours;
              daysOff = daysOff + diffDays.Hours;
            } else {
              sc = parseFloat(sc) + 15.5;
              days = days + 0.5;
            }
          });
        }
      }
      //对当期时间增加一天
      nextDate = new Date(sDate2).getTime() + 24 * 60 * 60 * 1000 * i;
      nextDate = dsf.date.format(new Date(nextDate), "yyyy/mm/dd hh:ii")
    }
  } else {
    //没有跨天需要按照之前逻辑计算
    await dateDiff(sDate1, sDate2).then(async res => {
      var diffDays = res
      if (diffDays.IsHoliday) {
        daysOff = daysOff + diffDays.Hours;
        sc = (diffDays.SC).toFixed(1);
        days = diffDays.Hours;
      } else {
        var d1 = sDate2.substring(0, 10) + " 08:30";
        var d2 = sDate2.substring(0, 10) + " 17:00";
        if ((sDate1 >= d2 && sDate2 >= d2) || (sDate1 <= d1 && sDate2 <= d1)) {
          sc = (diffDays.SC).toFixed(1);
          days = diffDays.Hours;
        }else  if((sDate1<= d2 && sDate2 <=d1)){
          await dateDiff(d1,sDate2).then(res=>{
            diffDays =res
            sc = (diffDays.SC).toFixed(1);
            days = diffDays.Hours;
          });
      } else {
          await beginDate(sDate2, 0).then(async res => {
            var begin = res
            await endDate(sDate1, 0).then(res => {
              var end = res
              sc = parseFloat(begin.SC) + parseFloat(end.SC);
              if (sc < 0 || (sc > 0 && sc < 4))
                days = 0;
              else if (sc >= 4)
                days = 0.5;
            });
          });
        }
      }
    });
  }
  result.Days = days;
  result.SC = sc;
  result.DaysOff = daysOff;
  return result;
}
async function beginDate(sDate2, num) {
  var begin = {};
  var sc = 0;
  var days = 0;
  var d1 = sDate2.substring(0, 10) + " 08:30";
  var d2 = sDate2.substring(0, 10) + " 17:00";
  if (sDate2 <= d1) {
    //如果开始时间小于8点半，则需要加上晚上的时间
    await dateDiff(d1, sDate2).then(res => {
      var diffDays = res
      sc = (diffDays.SC).toFixed(1);
      days = diffDays.Hours;
    });
    if (num == 1) {
      await dateDiff(sDate2.substring(0, 10) + " 23:59", d2).then(res => {
        var diffDays = res
        sc = parseFloat(sc) + parseFloat((diffDays.SC).toFixed(1));
        days = days + diffDays.Hours;
        if (days > 0.5) {
          days = 0.5;
        }
      });
    }
  } else if (sDate2 >= d2) {
    //如果选择的是17点之后需要加上8:30之前的数据
    await dateDiff(sDate2.substring(0, 10) + " 23:59", sDate2).then(res => {
      var diffDays = res;
      sc = (diffDays.SC).toFixed(1);
      days = diffDays.Hours;
    });

  } else {
    //如果选择的开始时间是在工作时间，则需要加后面的时间
    if (num == 1) {
      await dateDiff(sDate2.substring(0, 10) + " 23:59", d2).then(res => {
        var diffDays = res;
        sc = (diffDays.SC).toFixed(1);
        days = diffDays.Hours;
      });
    }
  }
  begin.SC = sc;
  begin.Days = days;
  return begin;
}
async function endDate(sDate1, num) {
  var end = {};
  var sc = 0;
  var days = 0;
  var d1 = sDate1.substring(0, 10) + " 08:30";
  var d2 = sDate1.substring(0, 10) + " 17:00";
  //判断结束日期是否在8点半之前
  if (sDate1 <= d1) {
    await dateDiff(sDate1, sDate1.substring(0, 10) + " 00:00").then(res => {
      var diffDays = res;
      sc = (diffDays.SC).toFixed(1);
      days = diffDays.Hours;
    });
  } else if (sDate1 >= d2) {
    //如果选择的是17点之后需要加上8:30之前的数据
    await dateDiff(sDate1, d2).then(res => {
      var diffDays = res;
      sc = (diffDays.SC).toFixed(1)
      if (num == 1) {
        sc = sc + 8.5;
      }
      days = diffDays.Hours;
    });
  } else {
    //如果选择的开始时间是在工作时间，则需要加后面的时间
    await dateDiff(d1, sDate1.substring(0, 10) + " 00:00").then(res => {
      var diffDays = res
      sc = (diffDays.SC).toFixed(1);
      days = diffDays.Hours;
    });
  }
  end.SC = sc;
  end.Days = days;
  return end;
}

async function dateDiff(sDate1, sDate2) { //sDate1和sDate2是字符串 yyyy-MM-dd格式 
  var oDate1, oDate2;
  oDate1 = new Date(sDate1).getTime();//转换为MM-dd-yyyy格式 
  oDate2 = new Date(sDate2).getTime();
  var timeSpan = {};
  var TotalMilliseconds = oDate1 - oDate2;//相差的毫秒数
  if (isNaN(TotalMilliseconds) || TotalMilliseconds < 0) {
    return null;
  }
  timeSpan.Days = parseInt(TotalMilliseconds / 1000 / 60 / 60 / 24);
  timeSpan.TotalHours = parseFloat(TotalMilliseconds / 1000 / 60 / 60) + '';
  timeSpan.Hours = timeSpan.TotalHours % 24;
  timeSpan.SC = timeSpan.TotalHours % 24;// 时常
  timeSpan.TotalMinutes = parseInt(TotalMilliseconds / 1000 / 60);
  timeSpan.Minutes = timeSpan.TotalMinutes % 60 + '';
  timeSpan.TotalSeconds = parseInt(TotalMilliseconds / 1000);
  timeSpan.Seconds = timeSpan.TotalSeconds % 60;
  timeSpan.TotalMilliseconds = TotalMilliseconds;
  timeSpan.Milliseconds = TotalMilliseconds % 1000;

  // 调整 1  当选择开始、结束时间为 工作日 时加班时长大于等于4小时的都算0.5天。
  // 2、休息日（含国家法定节假日）加班满4小时不到8小时计为0.5天，大于等于8小时的计为1天。
  // 请求后台是否为节假日（需要维护节假日） 2022年1月7日 17:54:12
  var isHoliday = false;
  await dsf.http.post("fn/zjdxCommon/checkIsHoliday", { date: sDate1.replace(/\//g, "-") }).then(res => {
    let result = res.data
    if (result.type == "success") {
      isHoliday = result.data.isHodiday;
    }
  })

  timeSpan.IsHoliday = isHoliday;
  // 是假期的时候
  if (isHoliday && isHoliday == true) {
    if (timeSpan.Hours < 0 || (timeSpan.Hours > 0 && timeSpan.Hours < 4))
      timeSpan.Hours = 0;
    else if (timeSpan.Hours >= 4 && timeSpan.Hours < 8)
      timeSpan.Hours = 0.5;
    else if (timeSpan.Hours >= 8)
      timeSpan.Hours = 1;
  }
  else {// 不是假期 工作日的时候 >=4h算0.5
    //alert(timeSpan.Hours);
    if (timeSpan.Hours < 0 || (timeSpan.Hours > 0 && timeSpan.Hours < 4))
      timeSpan.Hours = 0;
    else if (timeSpan.Hours >= 4)
      timeSpan.Hours = 0.5;
  }
  return timeSpan;
}
async function getHtxts(formData, formStruct, vueData) {
  var ktxts = 0;
  // 累计共工作日加班天数
  var url = "fn/applicationOvertime/getJbsqByUserId";
  var obj = {};
  obj.userId = formData.main["A0010"].value;//创建人ID
  obj.pk = vueData.formMeta.parameters.pk;
  await dsf.http.post(url, obj).then(res => {
    let result = res.data
    if (result.type == "success") {
      if (result.data.ktxts) {
        ktxts = result.data.ktxts;
      }
    }
  })
  return ktxts;
}
function filterTime(time) {
  var str = time.replace(/-/g, "/")
  return Date.parse(str)
}
exportObj.handle = function (formData, formStruct) { }
exportObj.initHandle = function (formData, formStruct, vueData) {
  console.log("加班申请")

  if (formStruct.controls.find(itemC=>itemC.metaId=="B0009")) {
    formStruct.controls.find(itemC=>itemC.metaId=="B0009").show=0
  }
  if (formStruct.controls.find(itemC=>itemC.metaId=="B0010")) {
    formStruct.controls.find(itemC=>itemC.metaId=="B0010").show=0
  }


  // 累计加班天数
  let obj = {};
  obj.currentYear = formData.main["210619153641sZ5bdxgxgzkTKNvMyFl"].value
  obj.userId = formData.main["A0010"].value
  obj.pk = vueData.formMeta.parameters.pk
  dsf.http.post(`fn/zjdxOfficeInfo/getAddWorkDays`, obj).then(res => {
    console.log(res.data)
    if (res.data.code == '200') {
      let days = res.data.data.days
      vueData.$set(vueData.formData.main, "21061116293141xxcrAJQlqLnfzFtEo", {
        value: days
      })
    }
  })
  vueData.$bus.on("selectDateTime", function (busObj) {
    if (busObj.metaData.metaId == "2106111626475BOgJckrMLEPn1e7u13" || busObj.metaData.metaId == "210611162556mFz52xDvgDhxbTwHWbL") {
      if (vueData.formData.main["2106111626475BOgJckrMLEPn1e7u13"].value && vueData.formData.main["210611162556mFz52xDvgDhxbTwHWbL"].value) {
        // let start = filterTime(formData.main["210611162556mFz52xDvgDhxbTwHWbL"].value)
        // let end = filterTime(formData.main["2106111626475BOgJckrMLEPn1e7u13"].value)
        let startDay = formData.main['210611162556mFz52xDvgDhxbTwHWbL'].value.replace(/-/g, "/")//.split(' ')[0]
        let endDay = formData.main['2106111626475BOgJckrMLEPn1e7u13'].value.replace(/-/g, "/")//.split(' ')[0]
        calculationTime(endDay, startDay).then(diff => {
          let diffDays = diff
          getHtxts(formData, formStruct, vueData).then(res => {
            let ktxts = res
            // 可调休加班天数
            ktxts = ktxts + diffDays.DaysOff;
            vueData.$set(vueData.formData.main, "220422155820SZUcgdSzbqHnHRXrAyj", {
              value: ktxts
            })
          });
          vueData.$set(vueData.formData.main, "220424155322BbJScH4uKJMdhgFUhuz", {
            value: diffDays.DaysOff
          })
          vueData.$set(vueData.formData.main, "210611162727RHhoUgYy9OTmz37J3Tn", {
            value: diffDays.Days
          })
          // 加班时长
          vueData.$set(vueData.formData.main, "220107162859MHh50kHBG02TES3AD9Y", {
            value: diffDays.SC
          })

          let title = vueData.formData.main['A0011'].value + vueData.formData.main['210611162556mFz52xDvgDhxbTwHWbL'].value.split(' ')[0] + '的加班申请'
          vueData.$set(vueData.formData.main, "B0001", {
            value: title
          })
        });
      } else {
        vueData.$set(vueData.formData.main, "210611162727RHhoUgYy9OTmz37J3Tn", {
          value: "0"
        })
      }
    }
  })
}
exportObj.saveFilter = function (formData, formStruct, vueData, action) {
  return new Promise(function (resolve, reject) {
    if (action == "save" || action == "send") {
      let endTime = filterTime(formData.main["2106111626475BOgJckrMLEPn1e7u13"].value) // 结束时间
      let startTime = filterTime(formData.main["210611162556mFz52xDvgDhxbTwHWbL"].value) // 开始时间
      if (startTime > endTime) {
        reject("开始时间必须早于结束时间")
      } else if (formData.main['210611162727RHhoUgYy9OTmz37J3Tn'].value < 0.5) {
        reject("加班时长不满4小时（半天），无需申报")
      } else {
        resolve()
      }
    } else {
      resolve()
    }
  })
}
export default exportObj;
