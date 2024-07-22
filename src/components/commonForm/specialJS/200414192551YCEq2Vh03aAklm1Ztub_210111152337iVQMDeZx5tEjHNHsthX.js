import dsf from "../../../common";
//归土 请假
const exportObj = {};

let sgx = 0; //上年剩余公休
let cgx = 0; //当前年剩余公休
let tx = 0; //剩余调休
let sntx = 0; //上年剩余调休
let jntx = 0; //今年剩余调休
let gy = 0; //本年度出国次数
let isBj = true;
let lasttq = ""; //上次探亲假
let jqxq = ""; //假期详情
let zbqk = 0; //值班情况
let sydw = 0; //事业单位
let nodeId = "";
let flowId = ""
let year = new Date().getFullYear();
let user = dsf.util.loadSessionStore("user")

exportObj.saveAfter = function (vueData, formStruct, formData) {

  dsf.http.post("fn/leaveChack/qjsjbc", {
      pk: formData.main["A0001"].value
    })
    .then(({
      data
    }) => {
      console.log(data);
      if (data.bool == true) {
        // 【大事务二期移动端】请假模块保存成功提示
        dsf.layer.toast("保存成功");
        vueData.$eventBus.refresh( vueData)
      }
    })
}

//隐藏输入0和空的假期分配
function hide0(formData, formStruct, vueData) {

  //主要领导审批  局长审批 隐藏别人的意见
  if (nodeId.indexOf("2gietW4MxTpnLG4") > -1 || nodeId.indexOf("GxYBikPZXiKZFIg") > -1 || nodeId.indexOf("XujpRr9H2c2UNOy") > -1) {

  }

}

/*变更请假类型*/
function changeType(formData, formStruct, vueData) {
  istq(formData, formStruct, vueData);
}
/*判断是否有探亲假*/
function istq(formData, formStruct, vueData) {
  var flog = false; //是否有探亲假
  vueData.formData.multinfos["210312194834FNFROx1B8AmrspWQKsd"].rows.forEach(item => {
    var type = item["C-QJSQJGLMX-004"].value
    if (type == 15) {
      flog = true;
    }
  })

  if (flog) {
    vueData.$set(vueData.formData.main, "B0033", {
      value: lasttq
    })
  } else {
    vueData.$set(vueData.formData.main, "B0033", {
      value: jqxq
    })
  }
}

/*变更开始时间*/
function changeStart(formData, formStruct, vueData, obj) {
  console.log(obj);
  var temp = "";
  var start;
  vueData.formData.multinfos["210312194834FNFROx1B8AmrspWQKsd"].rows.forEach(item => {
    if (item.action != "Deleted") {
      var dd = item['C-QJSQJGLMX-001'].value
      if (dd) {
        if (!temp) {
          temp = new Date(dd);
        }
        start = new Date(dd);
        if (temp > start) {
          temp = start;
        }
      }
    }
  })
  vueData.$set(vueData.formData.main, "B0013", {
    value: dsf.date.format(temp, "yyyy-mm-dd")
  })

  count(formData, formStruct, vueData, obj);
}
/*变更结束时间*/
function changeEnd(formData, formStruct, vueData, obj) {
  var temp = "";
  var start;
  vueData.formData.multinfos["210312194834FNFROx1B8AmrspWQKsd"].rows.forEach(item => {
    if (item.action != "Deleted") {
      var dd = item['C-QJSQJGLMX-002'].value
      if (dd) {
        if (!temp) {
          temp = new Date(dd);
        }
        start = new Date(dd);
        if (temp <= start) {
          temp = start;
        }
      }
    }
  })
  vueData.$set(vueData.formData.main, "B0019", {
    value: dsf.date.format(temp, "yyyy-mm-dd")
  })

  count(formData, formStruct, vueData, obj);
}

function getDaysDiff(start, end) {
  var dateSpan,
    tempDate,
    iDays;
  start = Date.parse(start);
  end = Date.parse(end);
  dateSpan = end - start;
  dateSpan = Math.abs(dateSpan);
  iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
  return iDays
}

/*计算时间差*/
function GetDateDiff(startTime, endTime, diffType) {
  //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式
  startTime = startTime.replace(/\-/g, "/");
  endTime = endTime.replace(/\-/g, "/");
  //将计算间隔类性字符转换为小写
  diffType = diffType.toLowerCase();
  var sTime = new Date(startTime); //开始时间
  var eTime = new Date(endTime); //结束时间
  //作为除数的数字
  var timeType = 1;
  //单位
  var type = "";
  switch (diffType) {
    case "second":
      timeType = 1000;
      type = "秒";
      break;
    case "minute":
      timeType = 1000 * 60;
      type = "分";
      break;
    case "hour":
      type = "小时";
      timeType = 1000 * 3600;
      break;
    case "day":
      type = "天";
      timeType = 1000 * 3600 * 24;
      break;
    default:
      break;
  }
  return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(timeType));
}
/*计算假期总天数*/
function countDays(formData, formStruct, vueData) {
  var start = formData.main["B0013"].value
  var end = formData.main["B0019"].value
  if (start && end) {
    var zts = 0;
    vueData.formData.multinfos["210312194834FNFROx1B8AmrspWQKsd"].rows.forEach(item => {
      if (item.action != "Deleted") {
        zts += parseFloat(item['C-QJSQJGLMX-020'].value)
      }
    })
    vueData.$set(vueData.formData.main, "B0014", {
      value: zts
    })
  } else {
    vueData.$set(vueData.formData.main, "B0014", {
      value: 0
    })
  }
}
/*计算当前子表假期天数*/
async function count(formData, formStruct, vueData, obj) {
  let dataRow = vueData.formData.multinfos["210312194834FNFROx1B8AmrspWQKsd"].rows[obj.subFormIndex];
  console.log(dataRow);
  if (dataRow) {
    var start = dataRow["C-QJSQJGLMX-001"].value
    var am = dataRow["C-QJSQJGLMX-014"].text
    if (am.indexOf("全天") > -1) {
      am = "全天";
    } else if (am.indexOf("上午") > -1) {
      am = "上午";
    } else if (am.indexOf("下午") > -1) {
      am = "下午";
    }
    if (!start) {
      return;
    }

    var end = dataRow["C-QJSQJGLMX-002"].value
    var pm = dataRow["C-QJSQJGLMX-015"].text
    if (pm.indexOf("全天") > -1) {
      pm = "全天";
    } else if (pm.indexOf("上午") > -1) {
      pm = "上午";
    } else if (pm.indexOf("下午") > -1) {
      pm = "下午";
    }
    if (!end) {
      return;
    }

    if (start && end) {
      if (GetDateDiff(start, end, "day") < 0) {
        dsf.layer.toast("结束日期小于开始日期，请重新填写！", false);
        vueData.$set(dataRow, "C-QJSQJGLMX-002", {
          value: ""
        })
        return;
      }

      var type = dataRow["C-QJSQJGLMX-004"].text
      if (sydw == 0) {
        if (type.indexOf("公休假") > -1 || type.indexOf("调休") > -1 || type.indexOf("事假") > -1 || type.indexOf("病假") > -1) {
          //去除法定节假日和周六日
          await dsf.http.post("fn/vacation/getdays", {
              "start": start,
              "end": end,
              type: type
            })
            .then(({
              data
            }) => {
              console.log(data);
              let result = data;
              if (result.type == "success") {
                var days = result.data.days;
                var snum = result.data.snum;
                var endnum = result.data.endnum;
                if (start == end && am == pm && am == "全天") {
                  days = 1;
                } else if (start == end && am == "上午" && pm == "下午") {
                  days = 1;
                } else if (start == end && am == pm) {
                  days = 0.5;
                } else {
                  if (snum == 0 && am == "下午") {
                    days = days - 0.5;
                  }
                  if (endnum == 0 && pm == "上午") {
                    days = days - 0.5;
                  }
                }
                if (type == '调休' && days == -1) {
                  dsf.layer.toast(start + "日期后的调休假不足当前调休天数！", false);

                  vueData.$set(dataRow, "C-QJSQJGLMX-002", {
                    value: ""
                  })
                  vueData.$set(dataRow, "C-QJSQJGLMX-020", {
                    value: 0
                  })
                  return;
                }

                vueData.$set(dataRow, "C-QJSQJGLMX-020", {
                  value: days
                })
                if (type == "公休假" || type == "调休") {
                  vueData.$set(dataRow, "C-QJSQJGLMX-019", {
                    value: days
                  })
                }
              }
            })
        } else {
          var days = GetDateDiff(start, end, "day") + 1;
          if (start == end && am == pm && am == "全天") {
            days = 1;
          } else if (start == end && am == "上午" && pm == "下午") {
            days = 1;
          } else if (start == end && am == pm) {
            days = 0.5;
          } else {
            days = getDaysDiff(start, end);
            if ((am == "上午" && pm == "下午") || (am == "上午" && pm == "全天") || (am == "全天" && pm == "下午") || (am == "全天" && pm == "全天")) days += 1;
            else if (am == pm || (am == "下午" && pm == "全天") || (am == "全天" && pm == "上午")) days += 0.5;
          }
          vueData.$set(dataRow, "C-QJSQJGLMX-020", {
            value: days
          })
        }
      } else {
        days = getDaysDiff(start, end);
        if ((am == "上午" && pm == "下午") || (am == "上午" && pm == "全天") || (am == "全天" && pm == "下午") || (am == "全天" && pm == "全天")) days += 1;
        else if (am == pm || (am == "下午" && pm == "全天") || (am == "全天" && pm == "上午")) days += 0.5;
        vueData.$set(dataRow, "C-QJSQJGLMX-020", {
          value: days
        })
      }
    } else {
      vueData.$set(dataRow, "C-QJSQJGLMX-017", {
        value: 0
      })
      vueData.$set(dataRow, "C-QJSQJGLMX-019", {
        value: 0
      })
      vueData.$set(dataRow, "C-QJSQJGLMX-020", {
        value: 0
      })
    }
    await dsf.http.post("fn/schedule/zbcx", {
        "userid": formData.main["C-LEAVE-0033"].value,
        "kssj": start,
        "jssj": end
      })
      .then(({
        data
      }) => {
        console.log(data);
        let result = data
        if (null != result && result.length > 0) {
          var html2 = "";
          for (var i = 0; i < result.length; i++) {
            if (html2 == "") {
              html2 += "您在" + result[i].zbrq;
            } else {
              html2 += "," + result[i].zbrq;
            }

          }
          html2 += "存在值班情况";
          zbqk = 1;
          dsf.layer.toast(html2, false);
        }
      })
    countDays(formData, formStruct, vueData);
  }
}
/*判断假期是否超过*/
function check(formData, formStruct, vueData, obj, t) {
  if (nodeId == 20) {
    return;
  }

  let dataRow = vueData.formData.multinfos["210312194834FNFROx1B8AmrspWQKsd"].rows[obj.subFormIndex];
  console.log(dataRow);
  if (dataRow) {

  }
  var type = dataRow["C-QJSQJGLMX-004"].text;
  var tmp = 0;
  var rows = vueData.formData.multinfos["210312194834FNFROx1B8AmrspWQKsd"].rows;
  if (type == "公休假") {
    if (t == 1) { //上一年
      for (var i = 0; i < rows.length; i++) {
        if (rows[i].action == "Deleted") {
          continue;
        }
        type = rows[i]['C-QJSQJGLMX-004'].text;
        if ('公休假' == type) {
          tmp += (rows[i]['C-QJSQJGLMX-017'].value - 0);
        }
      }
      if (tmp > sgx) {
        dsf.layer.toast("调休天数大于上一年剩余公休天数，请重新填写！", false);
        vueData.$set(dataRow, "C-QJSQJGLMX-017", {
          value: ""
        })
      }
    } else { //当前年
      for (var i = 0; i < rows.length; i++) {
        if (rows[i].action == "Deleted") {
          continue;
        }
        type = rows[i]['C-QJSQJGLMX-004'].text;
        if ('公休假' == type) {
          tmp += (rows[i]['C-QJSQJGLMX-019'].value - 0);
        }
      }
      if (tmp > cgx) {
        dsf.layer.toast("调休天数大于当前年剩余公休天数，请重新填写！", false);
        vueData.$set(dataRow, "C-QJSQJGLMX-019", {
          value: ""
        })
      }
    }
  } else if (type == "调休") {
    if (t == 1) { //上一年
      for (var i = 0; i < rows.length; i++) {
        if (rows[i].action == "Deleted") {
          continue;
        }
        type = rows[i]['C-QJSQJGLMX-004'].text;
        if ('调休' == type) {
          tmp += (rows[i]['C-QJSQJGLMX-017'].value - 0);
        }
      }
      if (tmp > sntx) {
        dsf.layer.toast("调休天数大于当上一年剩余调休天数，请重新填写！", false);
        vueData.$set(dataRow, "C-QJSQJGLMX-017", {
          value: ""
        })
      }
    } else {
      for (var i = 0; i < rows.length; i++) {
        if (rows[i].action == "Deleted") {
          continue;
        }
        type = rows[i]['C-QJSQJGLMX-004'].text;
        if ('调休' == type) {
          tmp += (rows[i]['C-QJSQJGLMX-019'].value - 0);
        }
      }
      if (tmp > jntx) {
        dsf.layer.toast("调休天数大于当前年剩余调休天数，请重新填写！", false);
        vueData.$set(dataRow, "C-QJSQJGLMX-019", {
          value: ""
        })
      }
    }
  }
}
// 计算请假天数 /* dangkw 【大事务二期移动端】请假模块 -- 按钮及功能开发 -- 20220726 */
function getDifferTime(startDate, endDate) {
  let startTime = new Date(Date.parse(startDate.replace(/-/g, "/"))).getTime();
  let endTime = new Date(Date.parse(endDate.replace(/-/g, "/"))).getTime();
  let dates = Math.abs((startTime - endTime)) / (1000 * 60 * 60 * 24);
  return dates;
}


window["C-LEAVE-0034_beforeOpenCode"] = function (formData, url) {
  var date = formData.main["C-LEAVE-0036"].value
  var type = formData.main["C-LEAVE-0035"].value
  if (!date) {
    dsf.layer.toast("请选择值班日期！", false);
    return "";
  }
  if (!type) {
    dsf.layer.toast("请选择调整类型！", false);
    return "";
  }
  if (date) {
    url += "?date=" + date + "&type=" + type;
  }
  return url;
};
exportObj.initHandle = function (formData, formStruct, vueData) {
  nodeId = vueData.formMeta.parameters.nodeId;
  flowId = vueData.formMeta.parameters.flowId

  hide0(formData, formStruct, vueData); //隐藏输入0和空的假期分配, 归还和领出


  // 子表请假类型变更
  vueData.$bus.on("checkVal", function (busObj) {
    if (busObj.metaData.metaId == "C-QJSQJGLMX-004") {
      changeType(formData, formStruct, vueData)
    }
    if (busObj.metaData.metaId == "C-QJSQJGLMX-014" || busObj.metaData.metaId == "C-QJSQJGLMX-015") {
      count(formData, formStruct, vueData, busObj);
    }
  })

  vueData.$bus.on("selectDateTime", function (busObj) {
    if (busObj.metaData.metaId == "C-QJSQJGLMX-001") {
      changeStart(formData, formStruct, vueData, busObj)
    }
    if (busObj.metaData.metaId == "C-QJSQJGLMX-002") {
      changeEnd(formData, formStruct, vueData, busObj)
    }
    // 计算请假天数  /* dangkw 【大事务二期移动端】请假模块 -- 按钮及功能开发 -- 20220726 */
    let start = vueData.formData.main['B0013']
    let end = vueData.formData.main['B0019']
    let result = getDifferTime(start.value,end.value)
    vueData.$set(vueData.formData.main,"B0014",{value:result+1})
  })

  vueData.$bus.on("inpBus", function (busObj) {
    if (busObj.metaData.metaId == "C-QJSQJGLMX-017") {
      check(formData, formStruct, vueData, busObj, 1)
    }
    if (busObj.metaData.metaId == "C-QJSQJGLMX-019") {
      check(formData, formStruct, vueData, busObj, 2)
    }
  })

  if (nodeId == 20) {
    isBj = false;
  }

  //通过AJAX初始化表单数据
  dsf.http.post("fn/vacation/cxsydw", {
      userId: formData.main["C-LEAVE-0033"].value
    })
    .then(({
      data
    }) => {
      console.log(data);
      if (data.message == 0) {
        sydw = 1;
      }
    })

  dsf.http.post("fn/vacation/getInit", {
      userid: formData.main["C-LEAVE-0033"].value
    })
    .then(({
      data
    }) => {
      console.log(data);
      let result = data;
      if ("success" == data.type) {
        if (sydw == 0) {
          sgx = result.data.sgx;
          cgx = result.data.cgx;
          tx = result.data.tx;
          sntx = result.data.GWYS;
          jntx = result.data.BREAKREST;
          gy = result.data.gy;
          lasttq = result.data.lasttq + result.data.bt;
          jqxq = result.data.bt;
          var text = "共" + (sgx + cgx) + "天，";
          if (sgx == 0) {
            text += "其中（" + (year - 1) + "年" + sgx + "天，";
          }
          text += year + "年" + cgx + "天）";
          if (sgx + cgx == 0) {
            text = "0";
          }
          var text2 = "共" + (sntx + jntx) + "天，";
          if (sntx != 0) {
            text2 += "其中（" + (year - 1) + "年" + sntx + "天，";
          }
          text2 += year + "年" + jntx + "天）";
          if (sntx + jntx == 0) {
            text2 = "0";
          }

          formData.main["C-LEAVE-0019"].value = text;
          formData.main["B0033"].value = result.data.bt;
          formData.main["C-LEAVE-0011"].value = text2;
        } else {
          //$("#H4gWhlTaLk1SrSk8").hide();
        }
      }
    })

  var type = vueData.$route.query.type
  if (type == "meeting") {
    //保存受理号
    //window.setTimeout(function(){xform.saveForm({enableTip: false}, function (result) { })},3000);
  }

  if (nodeId == 'GxYBikPZXiKZFIg' || nodeId == 'LCmV7xcqQEYX5Uy') {
    var is_tpis = formData.main["B0055"].value;
    if (is_tpis == '1') {
      dsf.layer.toast("该处室内其他处级干部已请假！");
    }
  }

  /*只有事业单位的人可以点因公、因私请假*/
  // let orgLv1 = formData.main["A0034"].value
  // if (orgLv1 !== "10384") {
  //   let temp29 = vueData.formMeta.controls.find(item => item.metaId == "B0029")
  //   if (temp29) {
  //     vueData.$set(temp29.privilege, "editable", false)
  //   }
  // }

  dsf.http.post("fn/fws/showyj", {
      pk: formData.main["A0001"].value
    })
    .then(({
      data
    }) => {
      console.log(data);
      if (data.html) {
        // $("#EieSy7rUkWX0y8EN").html('<label class="ds_label" handler="context" for="riKOjBW13hvpGP4Z">意见：</label>');
        // $('#ImuJgJRmKtLqB3eA').append('<div id="fwyj" style="padding-top: 40px;font-size: 18px;font-weight: 540;line-height: initial;">'+result.html+'</div>');
        // $("#78LKMNRkFAEK3cYF").hide();
        // $("#jaw28InkfafvSSGO").hide();
      }
    })

  dsf.http.post("fn/vacation/cxqjxj", {
      pk: formData.main["A0001"].value
    })
    .then(({
      data
    }) => {
      console.log(data);
      if (data.data == "1") {
        //$("button[op=\"custom2\"]").hide();
      }
    })


  //监控表单控件值变化，改变其他控件值
  vueData.$watch(function () {
    return formData.main["C-LEAVE-0033"];
  }, function (newValue, oldValue) {
    if (newValue.value == "1") {

    } else {

    }
  }, {
    deep: true
  })
}

exportObj.saveFilter = function (formData, formStruct, vueData) {
  return new Promise(function (resolve, reject) {
    try {
      if (flowId == '2004151356420etidaZjudnWsttL8SL') {
        var starTime = formData.main["B0013"].value;
        var endTime = formData.main["B0019"].value;
        var userID = user.user_id;
        var dept = user.deptId;
        var msg = "";
        dsf.http.post("fn/leaveChack/leaderChack", {
          "starTime": starTime,
          "endTime": endTime,
          "uid": userID,
          "deptId": dept
        }).then((result) => {
          if (result.code == 200) {
            msg = result.data.msg;
            if (msg != "无处长请假") {
              dsf.layer.confirm({
                message: msg,
                confirmButtonText: '确认'
              }, () => {
                vueData.$set(vueData.formData.main, "B0055", {
                  value: 1,
                  text: "是"
                })
                resolve()
              }, () => {
                reject()
              })
            } else {
              resolve()
            }
          }
        })
      } else if (flowId == '2005211450226HH9MYmnumAfNLK95DM') {
        if (gy > 0 && formData.main["C-LEAVE-0032"].value.indexOf("10") > -1) {
          dsf.layer.confirm({
            message: "您本年度出国" + gy + "次，是否继续提交?",
            confirmButtonText: '确认'
          }, () => {
            resolve()
          }, () => {
            reject()
          })
        } else {
          resolve()
        }
      } else {
        resolve()
      }
    } catch (error) {
      resolve()
    }
  })
}

exportObj.custom1 = function (formData, formStruct, vueData) {
  var flog = true;
  var gx = 0,
    ttx = 0;
  vueData.formData.multinfos["210312194834FNFROx1B8AmrspWQKsd"].rows.forEach(item => {
    var type = item["C-QJSQJGLMX-004"].text
    if ('公休假' == type) {
      var tmp = (item["C-QJSQJGLMX-017"].value - 0) + (item["C-QJSQJGLMX-019"].value - 0);
      var rowgx = (item["C-QJSQJGLMX-020"].value - 0);
      gx += rowgx;
      if (tmp != rowgx) {
        dsf.layer.toast("上一年公休天数加上当前年公休天数不等于总公休天数，请重新填写！");
        flog = false;
      }
    } else if ('调休' == type) {
      var rowtx = (item["C-QJSQJGLMX-020"].value - 0);
      ttx += rowtx;
    }
  })

  if (isBj) {
    if (gx > (sgx - 0 + cgx)) {
      flog = false;
      dsf.layer.toast("公休总天数大于当前剩余公休天数，请重新填写！");
      return
    }
    if ('调休' == type) {
      if (ttx > tx) {
        flog = false;
        dsf.layer.toast("调休总天数大于当前剩余调休天数，请重新填写！");
      }
    }
  }

  if (flog) {
    this.$dialog
      .confirm({
        title: "提示",
        message: "是否办结？",
      })
      .then(() => {
        dsf.http.post("fn/meeting/overJq", {
            pk: formData.main["A0001"].value
          })
          .then(({
            data
          }) => {
            console.log(data);
            if (data.data == true) {
              dsf.layer.toast("办结成功！", undefined, () => {
                vueData.backSucces();
              });
            } else {
              dsf.layer.toast("办结失败！");
            }
          })
      });
  }

}

//销假
exportObj.custom2 = function (formData, formStruct, vueData) {
  if (nodeId == "B6iSwEThhdmFE8S") { //人事处备案
    dsf.http.post("fn/vacation/qjxj", {
        pk: formData.main["A0001"].value,
        type: "1"
      })
      .then(({
        data
      }) => {
        console.log(data);
        if (data.data == true) {
          dsf.layer.toast("作废成功！", undefined, () => {
            vueData.backSucces();
          });
        } else {
          dsf.layer.toast("作废失败！");
        }
      })
  } else {
    dsf.http.post("fn/vacation/qjxj", {
        pk: formData.main["A0001"].value
      })
      .then(({
        data
      }) => {
        console.log(data);
        if (data.data == true) {
          dsf.layer.toast("销假成功！", undefined, () => {
            vueData.backSucces();
          });
        } else {
          dsf.layer.toast("销假失败！");
        }
      })
  }
}
//假期余额
// 显示假期详情按钮（action：showRestVacations）/* dangkw 【大事务二期移动端】请假模块 -- 按钮及功能开发 -- 20220726 */
// exportObj.ye = function (formData, formStruct, vueData) {
exportObj.showRestVacations = function (formData, formStruct, vueData) {
  var content = '<div style="padding: 20px"><font size="5px"> 公休剩余天数: <font color="red">' +
    formData.main["C-LEAVE-0019"].value + '</font> <br>调休剩余天数：<font color="red"> ' +
    formData.main["C-LEAVE-0011"].value + '</font></font></div>'
  vueData.$dialog.alert({
    title: '提示',
    message: content,
  }).then(() => {
    // dialogclosed = true
  });
}

//请假详情
exportObj.xq = function (formData, formStruct, vueData) {
  var end = formData.main["A0014"].value
  var dateEnd = new Date(end);
  end = dsf.date.format(dateEnd, "yyyy-mm-dd");
  dateEnd.setFullYear(dateEnd.getFullYear() - 1);
  var start = dsf.date.format(dateEnd, "yyyy-mm-dd");
  vueData.$router.push({
    path: `/commonList?fileType=JQXQ`,
    query: {
      start: start,
      end: end,
      userId: formData.main["A0010"].value,
      notLink: 1
    }
  })
}

//假期变更
exportObj.bg = function (formData, formStruct, vueData) {
  var rows = vueData.formData.multinfos["210312194834FNFROx1B8AmrspWQKsd"].rows;
  var data = {
    "pk": formData.main["A0001"].value,
    "rows": JSON.stringify(rows)
  };
  dsf.layer.confirm({
    message: '是否确认变更假期时间?',
    confirmButtonText: '确认'
  }, () => {
    dsf.http.post("fn/vacation/update", data).then((result) => {
      if (result.type == "success") {
        vueData.saveNoTip(function (result) {
          dsf.layer.toast("变更成功！");
        });
      } else {
        dsf.layer.toast("变更失败！");
      }
    })
  })

}
export default exportObj;
