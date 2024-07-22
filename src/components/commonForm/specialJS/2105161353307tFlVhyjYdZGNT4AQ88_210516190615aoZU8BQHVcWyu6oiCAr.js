// 浙江党校请假表单
const exportObj = {};

function showFormCtrl(currentHolidayType, templateTypeArray, alwayShowArray, templateCtrlArray, formStruct, formData, vueData) {
  let allCtrlArray = [
    "B0001",
    "210516140234MX9BO2nntcUAkJz8lfG",
    "210516155135ngyIySp4Qq5o69vKRjR",
    "210516135726sWtlb3XK0PYw6OWI3f4",
    "210516140131P6n7d3IznSMKEIVkkXx",
    "210516155749ZBCbuP0P0B7LVQSM8WV",
    "210516140700T6SbXhe9vBLiL9hnpTv",
    "210516184850OO9slh3poyAMTxjDTs8",
    "210516155408Cxnwf3lIeQbKyeUmsa0",
    "21051614040890pNP7hOnN9E7zBWpEL",
    "210516155226bsjXao7qOnuZlE0LKfd",
    "210516155538gECNJGTmNX0GdQv5V8Y",
    "2105161600568mzXy0Fyy1Jm4ExNyLu",
    // "210516160019kZwpFdoWsZ66hR7zJCj",
    "210516155909dVMxSoRwHMqZND6SIhs",
    "220507150222vrOAMr6Y0i8c6uogtDq",
    "220507150517UFVKbhV4kgCqvXpa4fy"
  ];

  if (templateTypeArray.findIndex((item) => item == currentHolidayType) > -1) {
    //表单未显示的字段，需清空数据
    var arr = [...alwayShowArray, ...templateCtrlArray]
    let clearDataCtrlArray = allCtrlArray.filter(item => {
      return !(arr.includes(item));
    });
    //console.log("clearDataCtrlArray",clearDataCtrlArray);
    formStruct.controls.forEach((item, index) => {
      //不是一直显示的列，全部默认为不显示
      if (alwayShowArray.findIndex((ctrl) => ctrl == item.metaId) == -1) {
        //item.show = false;
      }
      //模板指定的列显示
      if (templateCtrlArray.findIndex((ctrl) => ctrl == item.metaId) > -1) {
        //item.show = true;
      }
      //表单未显示的字段，需清空数据
      if (clearDataCtrlArray.findIndex((ctrl) => ctrl == item.metaId) > -1) {
        if (item.controlType == "controlDateTime") {
          formData.main[item.metaId].value = "1900-01-01";
        } else {
          if (item.metaId == "210516155408Cxnwf3lIeQbKyeUmsa0") {
            formData.main[item.metaId].value = "0";
          } else if (item.metaId == "210516155749ZBCbuP0P0B7LVQSM8WV") {
            vueData.$set(vueData.formData.main, "210516155749ZBCbuP0P0B7LVQSM8WV", {
              value: "1",
              text: "8:30-9:00"
            });
          } else {
            formData.main[item.metaId].value = " ";
          }

        }
      }
    });
  }
  console.log("formData.main", formData.main);
}

function filterTime(time) {
  var str = time.replace(/-/g, "/")
  return Date.parse(str)
}

function countWorkDay(date1, date2) {
  let _date1 = filterTime(date1);
  let _date2 = filterTime(date2);
  let delta = (_date2 - _date1) / (1000 * 60 * 60 * 24) + 1; // 计算出总时间

  let weeks = 0;
  for (let i = 0; i < delta; i++) {
    if (new Date(_date1).getDay() == 0 || new Date(_date1).getDay() == 6) weeks++; // 若为周六或周天则加1
    _date1 = _date1.valueOf();
    _date1 += 1000 * 60 * 60 * 24;
    _date1 = new Date(_date1);
  }
  return delta - weeks;
}

function loadControl(holidayType, formData, formStruct, vueData) {
  //console.log("formData",formData);
  //标题:B0001
  //请假开始时间:210516140234MX9BO2nntcUAkJz8lfG
  //请假结束时间:210516155135ngyIySp4Qq5o69vKRjR
  //请假类别:210516135726sWtlb3XK0PYw6OWI3f4
  //特殊假期备注:210516140131P6n7d3IznSMKEIVkkXx
  //具体时间段: 210516155749ZBCbuP0P0B7LVQSM8WV
  //半天可选:210516140700T6SbXhe9vBLiL9hnpTv
  //半天可选:210516184850OO9slh3poyAMTxjDTs8
  //半天可选:2105161612465zBH96ikJD7MrjIygQP
  //半天可选:210516185015bzIh2IYiPGUwsYeAANX
  //请假天数:210516155408Cxnwf3lIeQbKyeUmsa0
  //临请开始时间:21051614040890pNP7hOnN9E7zBWpEL
  //临请结束时间:210516155226bsjXao7qOnuZlE0LKfd
  //请假时长:210516155538gECNJGTmNX0GdQv5V8Y
  //申请日期:2105161600568mzXy0Fyy1Jm4ExNyLu
  //申请人:210516160019kZwpFdoWsZ66hR7zJCj
  //请假事由:210516155909dVMxSoRwHMqZND6SIhs

  //一直显示的列
  let alwayShowArray = [
    "B0001", //标题
    "210516135726sWtlb3XK0PYw6OWI3f4", //请假类别
    "2105161600568mzXy0Fyy1Jm4ExNyLu", //申请日期
    //"210516160019kZwpFdoWsZ66hR7zJCj", //申请人
    "210516155909dVMxSoRwHMqZND6SIhs", //请假事由
    "220107160435ZiOZKoWrY5sIb9TtOnM",//累计请假天数
    "220507150222vrOAMr6Y0i8c6uogtDq",
    "220507150517UFVKbhV4kgCqvXpa4fy",
    "controlMobileFl", "controlMobileFlowInfo"
  ];

  let templateTypeArray = ["1", "2", "3", "4", "5"];
  //模板一:公出，事假，病假，调休，年假同一个表单模板
  //{
  //请假开始时间:210516140234MX9BO2nntcUAkJz8lfG
  //请假结束时间:210516155135ngyIySp4Qq5o69vKRjR
  //半天可选:210516140700T6SbXhe9vBLiL9hnpTv
  //半天可选:210516184850OO9slh3poyAMTxjDTs8
  //请假天数:210516155408Cxnwf3lIeQbKyeUmsa0
  //}
  let templateCtrlArray = [
    "210516140234MX9BO2nntcUAkJz8lfG",
    "210516155135ngyIySp4Qq5o69vKRjR",
    "210516140700T6SbXhe9vBLiL9hnpTv",
    "210516184850OO9slh3poyAMTxjDTs8",
    "210516155408Cxnwf3lIeQbKyeUmsa0"
  ];
  showFormCtrl(holidayType, templateTypeArray, alwayShowArray, templateCtrlArray, formStruct, formData, vueData);
  // 模板二:产假，婚假，探亲假，丧假, 轮休,陪产假
  templateTypeArray = ["6", "7", "8", "9", "11", "13"];
  //{
  //请假开始时间:210516140234MX9BO2nntcUAkJz8lfG
  //请假结束时间:210516155135ngyIySp4Qq5o69vKRjR
  //请假天数:210516155408Cxnwf3lIeQbKyeUmsa0
  //}
  templateCtrlArray = [
    "210516140234MX9BO2nntcUAkJz8lfG",
    "210516155135ngyIySp4Qq5o69vKRjR",
    "210516155408Cxnwf3lIeQbKyeUmsa0"
  ];
  showFormCtrl(holidayType, templateTypeArray, alwayShowArray, templateCtrlArray, formStruct, formData, vueData);

  // 模板三:哺乳假 显示：具体时间段,隐藏：请假天数
  templateTypeArray = ["12"];
  //{
  //请假开始时间:210516140234MX9BO2nntcUAkJz8lfG
  //请假结束时间:210516155135ngyIySp4Qq5o69vKRjR
  //具体时间段: 210516155749ZBCbuP0P0B7LVQSM8WV
  //}
  templateCtrlArray = [
    "210516140234MX9BO2nntcUAkJz8lfG",
    "210516155135ngyIySp4Qq5o69vKRjR",
    "210516155749ZBCbuP0P0B7LVQSM8WV"
  ];
  showFormCtrl(holidayType, templateTypeArray, alwayShowArray, templateCtrlArray, formStruct, formData, vueData);

  // 模板四:其他假期 显示：特殊假期备注
  templateTypeArray = ["14"];
  //{
  //请假开始时间:210516140234MX9BO2nntcUAkJz8lfG
  //请假结束时间:210516155135ngyIySp4Qq5o69vKRjR
  //特殊假期备注:210516140131P6n7d3IznSMKEIVkkXx
  //半天可选:210516140700T6SbXhe9vBLiL9hnpTv
  //半天可选:210516184850OO9slh3poyAMTxjDTs8
  //请假天数:210516155408Cxnwf3lIeQbKyeUmsa0
  //}
  templateCtrlArray = [
    "210516140234MX9BO2nntcUAkJz8lfG",
    "210516155135ngyIySp4Qq5o69vKRjR",
    "210516140131P6n7d3IznSMKEIVkkXx",
    "210516140700T6SbXhe9vBLiL9hnpTv",
    "210516184850OO9slh3poyAMTxjDTs8",
    "210516155408Cxnwf3lIeQbKyeUmsa0"
  ];
  showFormCtrl(holidayType, templateTypeArray, alwayShowArray, templateCtrlArray, formStruct, formData, vueData);

  // 模板五:临请 
  //显示：临请开始时间、临请结束时间、请假时长 
  templateTypeArray = ["10"];
  //{
  //临请开始时间:21051614040890pNP7hOnN9E7zBWpEL
  //临请结束时间:210516155226bsjXao7qOnuZlE0LKfd
  //请假时长:210516155538gECNJGTmNX0GdQv5V8Y
  //}
  templateCtrlArray = [
    "21051614040890pNP7hOnN9E7zBWpEL",
    "210516155226bsjXao7qOnuZlE0LKfd",
    "210516155538gECNJGTmNX0GdQv5V8Y"
  ];
  showFormCtrl(holidayType, templateTypeArray, alwayShowArray, templateCtrlArray, formStruct, formData, vueData);
}

exportObj.handle = function (newValur, oldValue, formData, formStruct, org, vueData) {
  //根据表单数据变化，改变其他控件值
  let holidayType = formData.main["210516135726sWtlb3XK0PYw6OWI3f4"].value;
}
//计算请假总天数
function getTotalQjCount(formData, formStruct, vueData) {
  let postdate = {
    sDate: formData.main["210516140234MX9BO2nntcUAkJz8lfG"].value,
    eDate: formData.main["210516155135ngyIySp4Qq5o69vKRjR"].value,
    type: "1",
    jb: formData.main["210516135726sWtlb3XK0PYw6OWI3f4"].value,
    currentYear: formData.main["2107021129251NdUhtjqzWLB6O5UhLc"].value,
    userId: formData.main["A0010"].value
  }
  dsf.http.post("fn/zjdxCommon/getTotalQjCount", postdate).then(res => {
    let result = res.data
    if (result.type == "success") {
      vueData.$set(vueData.formData.main, "220107160435ZiOZKoWrY5sIb9TtOnM", {
        value: result.message
      });
    }
  })
}

//计算请假天数
function getWorkDayCount(formData, formStruct, vueData) {
  /*
    1、当选择以下几种请假类型，在计算请假天数时需扣除双休日。（含国家法定节假日）
     事假2、调休4、年休假5、男方护理假13、夫妻育儿假15、独生子女陪护父母假16
     2、当选择以下几种请假类型，在计算请假天数时需包含双休日（含国家法定节假日）。
         病假、妇女产假、婚假、丧假、其他假期
     */
  let sdate = formData.main["210516140234MX9BO2nntcUAkJz8lfG"].value;
  let edate = formData.main["210516155135ngyIySp4Qq5o69vKRjR"].value;
  let jb = formData.main["210516135726sWtlb3XK0PYw6OWI3f4"].value;
  let sHalfDay = formData.main["210516184850OO9slh3poyAMTxjDTs8"].value;
  let eHalfDay = formData.main["210516140700T6SbXhe9vBLiL9hnpTv"].value;

  if (sdate && edate) {
    //判断同一天选择上午下午是否正确
    if (sdate == edate && sHalfDay && eHalfDay) {
      if (sHalfDay > eHalfDay) {
        dsf.layer.toast("开始时间不能大约结束时间！");
        return;
      }
    }
    let postdate = {
      sDate: sdate,
      eDate: edate,
      sHalfDay: sHalfDay,
      eHalfDay: eHalfDay
    }
    if (jb && jb == "2" || jb == "4" || jb == "5" || jb == "13" || jb == "15" || jb == "16" || jb == "9") {
      postdate.type = "1"
    } else {
      postdate.type = "2"
    }
    dsf.http.post("fn/zjdxCommon/getWorkDayCount", postdate).then(res => {
      let result = res.data
      if (result.type == "success") {
        vueData.$set(vueData.formData.main, "210516155408Cxnwf3lIeQbKyeUmsa0", {
          value: result.message
        });
      }
    })
  }
}

function getTxDays(formData, formStruct, vueData) {
  let txControl = formStruct.controls.find(item => item.metaId == "210709135321bcY3oP1kQmIxbC4ujhO")
  if (txControl) {
    //txControl.show = 1
  }
  var obj = {};
  obj.currentYear = formData.main["2107021129251NdUhtjqzWLB6O5UhLc"].value
  obj.userId = formData.main["A0010"].value
  obj.pk = vueData.formMeta.parameters.pk
  dsf.http.post("fn/zjdxOfficeInfo/getAddWorkDays", obj).then(res => {
    let result = res.data
    if (result.type == "success") {
      vueData.$set(vueData.formData.main, "210709135321bcY3oP1kQmIxbC4ujhO", {
        value: result.data.txDays.toString()
      });
    }
  })
}

function getLeaveWorkDays(formData, formStruct, vueData) {
  //105666 【请假申请】请假申请功能调整 
  var url = "fn/zjdxOfficeInfo/getLeaveWorkDays";
  var obj = {};
  obj.currentYear = formData.main["2107021129251NdUhtjqzWLB6O5UhLc"].value
  obj.userId = formData.main["A0010"].value
  obj.pk = vueData.formMeta.parameters.pk
  dsf.http.post(url, obj).then(res => {
    let result = res.data
    if (result.type == "success") {
      vueData.$set(vueData.formData.main, "220507150222vrOAMr6Y0i8c6uogtDq", {
        value: result.data.days.toString()
      });
      vueData.$set(vueData.formData.main, "220507150517UFVKbhV4kgCqvXpa4fy", {
        value: result.data.sjDays.toString()
      });
    }
  })
}

function fun_date(sdate, aa) {
  sdate = sdate.replace(/\-/g, "/");
  var date1 = new Date(sdate);
  var date2 = new Date(sdate);
  date2.setDate(date1.getDate() + aa);
  var mouth = date2.getMonth() + 1;
  if (mouth.toString().length <= 1) {
    mouth = "0" + (date2.getMonth() + 1);
  }
  var time2 = date2.getFullYear() + "-" + (mouth) + "-" + date2.getDate();
  return time2;
}

function getEndTime(formData, formStruct, vueData) {
  let sdate = formData.main["210516140234MX9BO2nntcUAkJz8lfG"].value
  let holidayType = vueData.formData.main["210516135726sWtlb3XK0PYw6OWI3f4"].value;
  //5、当请假类型选择 “妇女产假” ，选择开发时间后自动计算并显示出结束时间。可修改 start
  if (sdate != "" && holidayType == "6") {
    var djt = formData.main["22010610070883hqhFMXrNjx1piyF9S"].value
    if (djt == "1") //(7) 妇女产假：一胎158天、二胎、三胎188天。
    {
      vueData.$set(vueData.formData.main, "210516155135ngyIySp4Qq5o69vKRjR", {
        value: fun_date(sdate, 157)
      });
    } else if (djt == "2" || djt == "3") {
      vueData.$set(vueData.formData.main, "210516155135ngyIySp4Qq5o69vKRjR", {
        value: fun_date(sdate, 187)
      });
    }
  }

  if (sdate != "" && holidayType == "17") {
    if (formData.main["221219153059TiO11shpeRdblDYQYjn"].value == "1") {//阳性
      vueData.$set(vueData.formData.main, "210516155135ngyIySp4Qq5o69vKRjR", {
        value: fun_date(sdate, 6)
      });
    } else if (formData.main["221219153059TiO11shpeRdblDYQYjn"].value == "2") {//密接
      vueData.$set(vueData.formData.main, "210516155135ngyIySp4Qq5o69vKRjR", {
        value: fun_date(sdate, 4)
      });
    }
  }
}

exportObj.initHandle = function (formData, formStruct, vueData) {
  let holidayType = formData.main["210516135726sWtlb3XK0PYw6OWI3f4"].value;
  loadControl(holidayType, formData, formStruct, vueData);

  getLeaveWorkDays(formData, formStruct, vueData);

  getTotalQjCount(formData, formStruct, vueData);

  vueData.$bus.on("inputRadio", function (busObj) {
    if (busObj.metaData.metaId == "22010610070883hqhFMXrNjx1piyF9S") {
      getEndTime(formData, formStruct, vueData)
      getWorkDayCount(formData, formStruct, vueData);
    }
  })

  vueData.$bus.on("checkVal", function (busObj) {
    //阳性还是阴性
    if (busObj.metaData.metaId == "221219153059TiO11shpeRdblDYQYjn") {
      getEndTime(formData, formStruct, vueData)
      getWorkDayCount(formData, formStruct, vueData);
    }
    //请假类别
    if (busObj.metaData.metaId == "210516135726sWtlb3XK0PYw6OWI3f4") {
      let crrDate = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
      let crrDateTime = crrDate + " " + new Date().getHours() + ":" + new Date().getMinutes();

      getTotalQjCount(formData, formStruct, vueData);

      loadControl(busObj.value, formData, formStruct, vueData);

      //获取调休天数
      if (busObj.value == "4") {
        getTxDays(formData, formStruct, vueData);
      }
      if (!vueData.$route.params.pk) {
        //临请初始化日期
        if (busObj.value == "10") {
          vueData.$set(vueData.formData.main, "21051614040890pNP7hOnN9E7zBWpEL", {
            value: crrDateTime
          });
          vueData.$set(vueData.formData.main, "210516155226bsjXao7qOnuZlE0LKfd", {
            value: crrDateTime
          });
        }
        //非临请初始化日期
        if (["1", "2", "3", "4", "5", "6", "7", "8", "9", "11", "12", "13", "14"].findIndex((item) => item == busObj.value) > -1) {
          vueData.$set(vueData.formData.main, "210516140234MX9BO2nntcUAkJz8lfG", {
            value: crrDate
          });
          vueData.$set(vueData.formData.main, "210516155135ngyIySp4Qq5o69vKRjR", {
            value: crrDate
          });
        }
      }

      getEndTime(formData, formStruct, vueData)
    }

    //开始日期的半天可选  //结束日期的半天可选
    if (busObj.metaData.metaId == "210516184850OO9slh3poyAMTxjDTs8" ||
      busObj.metaData.metaId == "210516140700T6SbXhe9vBLiL9hnpTv") {
      let daysNoWeeks = countWorkDay(vueData.formData.main["210516140234MX9BO2nntcUAkJz8lfG"].value, vueData.formData.main["210516155135ngyIySp4Qq5o69vKRjR"].value);
      let days = 0.0;
      let beginHalf = vueData.formData.main["210516184850OO9slh3poyAMTxjDTs8"].text;
      let endHalf = vueData.formData.main["210516140700T6SbXhe9vBLiL9hnpTv"].text;
      let addBeginRange = 0.0;
      let addEndRange = 0.0;
      if (beginHalf == "下午") {
        addBeginRange = -0.5;
      }
      if (endHalf == "上午") {
        addEndRange = -0.5;
      }
      days = daysNoWeeks + addBeginRange + addEndRange;
      // vueData.$set(vueData.formData.main, "210516155408Cxnwf3lIeQbKyeUmsa0", {
      //   value: days
      // });
      getWorkDayCount(formData, formStruct, vueData);
    }
    console.log("busObj", busObj)
  });

  vueData.$bus.on("selectDateTime", function (busObj) {
    console.log("busObj", busObj)
    if (busObj.metaData.metaId == "210516140234MX9BO2nntcUAkJz8lfG" || busObj.metaData.metaId == "210516155135ngyIySp4Qq5o69vKRjR") {
      let holidayType = vueData.formData.main["210516135726sWtlb3XK0PYw6OWI3f4"].value;
      if (["1", "2", "3", "4", "5", "6", "7", "8", "9", "11", "12", "13", "14"].findIndex((item) => item == holidayType) > -1) {
        //let holidays=parseFloat(vueData.formData.main["210516155408Cxnwf3lIeQbKyeUmsa0"].value);
        let start = filterTime(vueData.formData.main["210516140234MX9BO2nntcUAkJz8lfG"].value);
        let end = filterTime(vueData.formData.main["210516155135ngyIySp4Qq5o69vKRjR"].value);
        if (end < start) {
          dsf.layer.toast("请假结束时间必须晚于请假开始时间")
          vueData.$set(vueData.formData.main, "210516155408Cxnwf3lIeQbKyeUmsa0", {
            value: 0
          });
        } else {
          let daysNoWeeks = countWorkDay(vueData.formData.main["210516140234MX9BO2nntcUAkJz8lfG"].value, vueData.formData.main["210516155135ngyIySp4Qq5o69vKRjR"].value);
          let days = 0.0;
          //模板一，存在半天可选
          if (["1", "2", "3", "4", "5"].findIndex((item) => item == holidayType) > -1) {
            let beginHalf = vueData.formData.main["210516184850OO9slh3poyAMTxjDTs8"].text;
            let endHalf = vueData.formData.main["210516140700T6SbXhe9vBLiL9hnpTv"].text;
            let addBeginRange = 0.0;
            let addEndRange = 0.0;
            if (beginHalf == "下午") {
              addBeginRange = -0.5;
            }
            if (endHalf == "上午") {
              addEndRange = -0.5;
            }
            days = daysNoWeeks + addBeginRange + addEndRange;
          } else {
            days = daysNoWeeks;
          }
          // vueData.$set(vueData.formData.main, "210516155408Cxnwf3lIeQbKyeUmsa0", {
          //   value: days
          // });
        }
      } else if (holidayType == "10") {
        //临请开始时间:21051614040890pNP7hOnN9E7zBWpEL
        //临请结束时间:210516155226bsjXao7qOnuZlE0LKfd
        //请假时长:210516155538gECNJGTmNX0GdQv5V8Y
        let start = filterTime(vueData.formData.main["21051614040890pNP7hOnN9E7zBWpEL"].value);
        let end = filterTime(vueData.formData.main["210516155226bsjXao7qOnuZlE0LKfd"].value);
        let hours = parseFloat(vueData.formData.main["210516155538gECNJGTmNX0GdQv5V8Y"].value);
        let utc = end - start;
        let modRemainMin = utc % (60 * 60 * 1000);
        let remainMin = parseFloat((Math.floor(modRemainMin / (6 * 60 * 1000)) * 0.1).toFixed(1));

        let dayTimes = Math.floor(utc / (60 * 60 * 1000)) + remainMin;

        if (end < start) {
          dsf.layer.toast("临请结束时间必须晚于临请开始时间")
          vueData.$set(vueData.formData.main, "210516155538gECNJGTmNX0GdQv5V8Y", {
            value: 0
          });
        } else {
          //if(newValur["210516155538gECNJGTmNX0GdQv5V8Y"].value!=oldValue["210516155538gECNJGTmNX0GdQv5V8Y"].value){
          vueData.$set(vueData.formData.main, "210516155538gECNJGTmNX0GdQv5V8Y", {
            value: dayTimes
          });
          //}
        }
      }
      if (busObj.metaData.metaId != "210516155135ngyIySp4Qq5o69vKRjR") {
        getEndTime(formData, formStruct, vueData)
      }
      getWorkDayCount(formData, formStruct, vueData);
    }
  })
}


exportObj.saveFilter = function (formData, formStruct, vueData, action) {
  return new Promise(function (resolve, reject) {
    let holidayType = formData.main["210516135726sWtlb3XK0PYw6OWI3f4"].value;

    /*    5、当选择以下几个类型，在表单保存时需做天数验证提醒，超出对应的天数则无法保存发送。（其中妇女产假需根据用户选择的“生育胎次”对应不同的天数）
    (1) 夫妻育儿假：10天。请假类型：15
    (2) 男方护理假：15天。请假类型：13
    (3) 独生子女陪护父母假：5天。请假类型：16
    (4) 婚假：3天。请假类型：7
    (5) 丧假：3天（备注：职工直系亲属(父母、配偶和子女)及岳父母或公婆去世时可申请）。请假类型：9
    (6) 年休假：15天。请假类型：5
    (7) 妇女产假：一胎158天、二胎、三胎188天。请假类型：6*/
    var qjts = formData.main["210516155408Cxnwf3lIeQbKyeUmsa0"].value
    if (holidayType == "15" && qjts > 10) {
      reject("夫妻育儿假不能超过10天");
    } else if (holidayType == "13" && qjts > 15) {
      reject("男方护理假不能超过15天");
    } else if (holidayType == "16" && qjts > 5) {
      reject("独生子女陪护父母假假不能超过5天");
    } else if (holidayType == "7" && qjts > 3) {
      reject("婚假不能超过3天");
    } else if (holidayType == "9" && qjts > 3) {
      reject("丧假不能超过3天");
    } else if (holidayType == "5" && qjts > 15) {
      reject("年休假不能超过15天");
    } else if (holidayType == "6") {
      var djt = formData.main["22010610070883hqhFMXrNjx1piyF9S"].value
      if (djt && djt == "1" && qjts > 158) // 第一胎
      {
        reject("妇女产假-第一胎 不能超过158天");
      } else if (djt && (djt == "2" || djt == "3") && qjts > 188) // 第2 3 胎 188天
      {
        reject("妇女产假-第二、三胎 不能超过188天");
      }
    }


    //模板一:公出，事假，病假，调休，年假同一个表单模板
    //["1","2","3","4","5"]
    // 模板二:产假，婚假，探亲假，丧假, 轮休,陪产假
    //["6","7","8","9","11","13"]
    // 模板三:哺乳假 显示：具体时间段,隐藏：请假天数
    //templateTypeArray=["12"];
    // 模板四:其他假期 显示：特殊假期备注
    //templateTypeArray=["14"];
    // 模板五:临请 
    //显示：临请开始时间、临请结束时间、请假时长 
    //templateTypeArray=["10"];
    if (["1", "2", "3", "4", "5", "6", "7", "8", "9", "11", "12", "13", "14"].findIndex((item) => item == holidayType) > -1) {
      //请假开始时间:210516140234MX9BO2nntcUAkJz8lfG
      //请假结束时间:210516155135ngyIySp4Qq5o69vKRjR
      //请假天数:210516155408Cxnwf3lIeQbKyeUmsa0
      let holidays = parseFloat(formData.main["210516155408Cxnwf3lIeQbKyeUmsa0"].value);
      let start = filterTime(formData.main["210516140234MX9BO2nntcUAkJz8lfG"].value);
      let end = filterTime(formData.main["210516155135ngyIySp4Qq5o69vKRjR"].value);

      if (end < start) {
        reject("请假结束时间必须晚于请假开始时间");
      }
      if (holidayType != "12") {
        if (holidays <= 0) {
          reject("请输入请假天数");
        }
      }
      if (holidayType == "12") {
        let detailTimeRange = formData.main["210516155749ZBCbuP0P0B7LVQSM8WV"].value.replace(/^\s*|\s*$/g, "");
        if (detailTimeRange == "") {
          reject("请输入具体时间段");
        }
      }
      if (holidayType == "14") {
        //特殊假期备注:210516140131P6n7d3IznSMKEIVkkXx
        let remark = formData.main["210516140131P6n7d3IznSMKEIVkkXx"].value.replace(/^\s*|\s*$/g, "");
        if (remark.length <= 0) {
          reject("请输入特殊假期备注");
        }
      }
    } else if (holidayType == "10") {
      //临请开始时间:21051614040890pNP7hOnN9E7zBWpEL
      //临请结束时间:210516155226bsjXao7qOnuZlE0LKfd
      //请假时长:210516155538gECNJGTmNX0GdQv5V8Y
      let start = filterTime(formData.main["21051614040890pNP7hOnN9E7zBWpEL"].value);
      let end = filterTime(formData.main["210516155226bsjXao7qOnuZlE0LKfd"].value);
      let hours = parseFloat(formData.main["210516155538gECNJGTmNX0GdQv5V8Y"].value);

      if (end < start) {
        reject("临请结束时间必须晚于临请开始时间");
      }

      if (hours <= 0) {
        reject("请输入请假时长");
      }
    }

    let selValue = formData.main["210516135726sWtlb3XK0PYw6OWI3f4"].value
    //3、妇女产假、男方护理假、夫妻育儿假、独生子女陪护父母假、病假类型需上传附件，且做必填项。2022年1月8日 12:30:44
    console.log(selValue,vueData.pk);
    if (selValue == "3" || selValue == "6" || selValue == "13" || selValue == "15" || selValue == "16") {
      if (vueData.pk) {
        let params = {
          info_id: formStruct.parameters.pk, // 文件id
          infoId: formStruct.parameters.pk, // 文件id
          moduleId: formStruct.parameters.moduleId, // 模块id
          nodeId: formStruct.parameters.nodeId, // 流程节点id
          start: 0, // 开始页码
          limit: 10, // 每页条数
          flowId: formStruct.parameters.flowId,
        };
        dsf.http.post("fn/mobileAttachment/getFormAttachment", params).then(res => {
          let attachcount = 0;
          res.data.rows.forEach(element => {
            if (element.document && element.document.length > 0) {
              attachcount++
            }
          });
          console.log(attachcount);
          if (attachcount > 0) {
            resolve()
          } else {
            reject("请上传附件")
          }
        }).error(err => {
          console.log(err)
          reject("获取附件异常")
        })
      } else {
        console.log(vueData.allFile);
        if (vueData.allFile[0].file.length) {
          resolve();
        } else {
          reject("请上传附件")
        }
      }
    } else {
      resolve();
    }
  })
}
export default exportObj;
