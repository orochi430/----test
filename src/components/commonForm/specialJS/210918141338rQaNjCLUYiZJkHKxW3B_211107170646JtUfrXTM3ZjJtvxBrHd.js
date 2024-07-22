// 国家林业草原局 餐品预约
import dsf from "../../../common";
const exportObj = {};

var yysj = null;
var yylb = null;
var dateList = null;
var nodeId = null;
var brysxx = null;
var pk = null;

exportObj.handle = function (formData, formStruct) {
  console.log('tag', '1');
}

/**
 * 获取日期列表
 */
async function setDateList(formData, formStruct, vueData) {
  var newFileFlag = vueData.$route.params.pk;
  if (newFileFlag == undefined) {
    await dsf.http.post('fn/ZfspyyController/getDateList').then(res => {
      if (res.data.code == 200) {
        if (res.data.data.length == 0) {
          dsf.layer.toast("暂未维护下一日的主副食品，不能预约！");
          setTimeout(() => {
            vueData.$router.go(-1)
          }, 1500);
          return
        }
        let dateObj = formStruct.controls.find(item => item.metaId == "210918143304Ur4WFqyPCBzASErd5UO")
        res.data.data.forEach((element, index) => {
          if (index === 0) {
            vueData.$set(formData.main, "210918143304Ur4WFqyPCBzASErd5UO", {
              value: element.id,
              text: element.mc
            })
            dateObj.enumData.push({
              remark: "",
              id: element.id,
              text: element.mc,
              varClass: "layui-col-md3",
              value: element.id
            });
            dateObj.defaultValue = {
              text: element.mc,
              value: element.id
            }

            yysj = element.id;
            vueData.$set(formData.main, "152U15oDBeWh2VCr", {
              value: element.abstract_text
            })
          } else {
            dateObj.enumData.push({
              remark: "",
              id: element.id,
              text: element.mc,
              varClass: "layui-col-md3",
              value: element.id
            });
          }
        });
        dateList = res.data.data;
      }
    })
  }
}

exportObj.initHandle = async function (formData, formStruct, vueData) {
  // 自动生成标题，规则是*年*月*日+部门+人名的主副食预约
  let title = `${dsf.date.format(dsf.date.toDay(),'yyyy年mm月dd日')}${dsf.util.loadSessionStore("user").deptName}${dsf.util.loadSessionStore("user").name}的主副食预约`;
  vueData.$set(formData.main, "B0001", {
    value: title
  });
  let enumData = new Map();
  pk = formStruct.parameters.pk;

  await setDateList(formData, formStruct, vueData)

  //获取本人本日预约信息
  await dsf.http.post('fn/ZfspyyController/getYydList', {
    "yysj": yysj,
    "pk": pk
  }).then(res => {
    if (res.data.code == 200) {
      brysxx = res.data.data;
    }
  })

  formStruct.subform["210918144856AK8npd6cSBGlxZBsWo3"].controls.find(item => item.metaId == "210918144532ZYr4MmuflQ7bAbs9yGL").privilege.editable = false
  formStruct.subform["210918144856AK8npd6cSBGlxZBsWo3"].controls.find(item => item.metaId == "210918144604owaYQTRjdblks2NkiL9").privilege.editable = false

  // 菜品名称下拉显示时触发赋值
  vueData.$bus.on("showCheckBox", function (vueObj) {
    console.log(vueObj)
    if (vueObj.metaData.metaId == "2109181444100wbYA6OxtbegC5bXHQA") {
      vueObj.controlData.columnsValue.columns = enumData[vueObj.subFormIndex];
      vueObj.currentColumns = enumData[vueObj.subFormIndex];
    }
  })

  vueData.$bus.on("checkVal", function (busObj) {
    //监听选择日期---监听日期暂时无下拉
    if (busObj.metaData.metaId == "210918143304Ur4WFqyPCBzASErd5UO") {
      yysj = busObj.value;
    }
    //主副食品类型监听
    if (busObj.metaData.metaId == "210918144254z3sIRzPlEowxeZrKLve") {
      enumData = [];
      yylb = busObj.value
      dsf.http.post('fn/ZfspyyController/getSpList', {
        yysj: yysj,
        yylb: yylb
      }).then(res => {
        if (res.data.code == 200) {
          //类型变化  清空后面的字段
          vueData.$set(formData.multinfos["210918144856AK8npd6cSBGlxZBsWo3"].rows[busObj.subFormIndex], "2109181444100wbYA6OxtbegC5bXHQA", { //名称
            value: ""
          })
          vueData.$set(formData.multinfos["210918144856AK8npd6cSBGlxZBsWo3"].rows[busObj.subFormIndex], "210918144532ZYr4MmuflQ7bAbs9yGL", { //单价
            value: ""
          })
          vueData.$set(formData.multinfos["210918144856AK8npd6cSBGlxZBsWo3"].rows[busObj.subFormIndex], "210918144604owaYQTRjdblks2NkiL9", { //剩余数量
            value: ""
          })
          vueData.$set(formData.multinfos["210918144856AK8npd6cSBGlxZBsWo3"].rows[busObj.subFormIndex], "2109181446341qorEBv5r2iHv2L9tnf", { //订购数量
            value: ""
          })
          let dataArr = []
          res.data.data.forEach((element, index) => {
            dataArr.push({
              remark: "",
              id: element.id,
              text: element.spmc,
              varClass: "layui-col-md3",
              value: element.id
            });
          });
          enumData[busObj.subFormIndex] = dataArr
        }
      })
    }

    if (busObj.metaData.metaId == "2109181444100wbYA6OxtbegC5bXHQA") {
      var spid = busObj.value;
      let go = true
      vueData.formData.multinfos["210918144856AK8npd6cSBGlxZBsWo3"].rows.forEach((item, index) => {
        if (index != busObj.subFormIndex && item["2109181444100wbYA6OxtbegC5bXHQA"].value == spid) {
          go = false
        }
      })
      if (!go) {
        vueData.$set(formData.multinfos["210918144856AK8npd6cSBGlxZBsWo3"].rows[busObj.subFormIndex], "2109181444100wbYA6OxtbegC5bXHQA", { //名称
          value: ""
        })
        vueData.$set(formData.multinfos["210918144856AK8npd6cSBGlxZBsWo3"].rows[busObj.subFormIndex], "210918144532ZYr4MmuflQ7bAbs9yGL", { //单价
          value: ""
        })
        vueData.$set(formData.multinfos["210918144856AK8npd6cSBGlxZBsWo3"].rows[busObj.subFormIndex], "210918144604owaYQTRjdblks2NkiL9", { //剩余数量
          value: ""
        })
        vueData.$set(formData.multinfos["210918144856AK8npd6cSBGlxZBsWo3"].rows[busObj.subFormIndex], "2109181446341qorEBv5r2iHv2L9tnf", { //订购数量
          value: ""
        })
        dsf.layer.toast("您已经录入了该食品名称，不允许再次录入！");
        return
      }
      dsf.http.post('fn/ZfspyyController/getSpDetail', {
        yysj: yysj,
        yylb: yylb,
        spid: spid,
        pk: pk
      }).then(res => {
        if (res.data.code == 200) {
          vueData.$set(formData.multinfos["210918144856AK8npd6cSBGlxZBsWo3"].rows[busObj.subFormIndex], "210918144532ZYr4MmuflQ7bAbs9yGL", { //单价
            value: res.data.data[0].dj
          })
          vueData.$set(formData.multinfos["210918144856AK8npd6cSBGlxZBsWo3"].rows[busObj.subFormIndex], "210918144604owaYQTRjdblks2NkiL9", { //剩余数量
            value: res.data.data[0].sl
          })
        }
      })
    }

  })

  vueData.$bus.on("inpBus", function (vueObj) {
    console.log(vueObj)
    //数量变化时计算价格
    if (vueObj.metaData.metaId == "2109181446341qorEBv5r2iHv2L9tnf") {
      if (!valider(formData, formStruct, vueData, vueObj)) {
        vueData.$set(formData.multinfos["210918144856AK8npd6cSBGlxZBsWo3"].rows[vueObj.subFormIndex], "2109181446341qorEBv5r2iHv2L9tnf", { //订购数量
          value: ""
        })
        return
      }

      let temp = 0;
      vueData.formData.multinfos["210918144856AK8npd6cSBGlxZBsWo3"].rows.forEach(item => {
        if (item["210918144254z3sIRzPlEowxeZrKLve"].value == "1") {
          temp += (Number(item["2109181446341qorEBv5r2iHv2L9tnf"].value) * Number(item["210918144532ZYr4MmuflQ7bAbs9yGL"].value))
        }
      })
      vueData.$set(vueData.formData.main["210918144811bYtevpMmlhrwvdBcklY"], "value", temp)
    }
  })

}

function getBrspyysl(lx, spmc) {
  var yysl = 0;
  for (var i = 0; i < brysxx.length; i++) {
    if (brysxx[i].lx == lx && brysxx[i].mc == spmc) {
      return parseInt(brysxx[i].sl);
    }
  };
  return yysl;
}
/**
 * 校验
 * @returns {boolean}
 */
function valider(formData, formStruct, vueData, vueObj) {
  var flag = true;
  var yylb = vueData.formData.multinfos["210918144856AK8npd6cSBGlxZBsWo3"].rows[vueObj.subFormIndex]["210918144254z3sIRzPlEowxeZrKLve"].value
  var name = vueData.formData.multinfos["210918144856AK8npd6cSBGlxZBsWo3"].rows[vueObj.subFormIndex]["2109181444100wbYA6OxtbegC5bXHQA"].value
  var sl = vueData.formData.multinfos["210918144856AK8npd6cSBGlxZBsWo3"].rows[vueObj.subFormIndex]["2109181446341qorEBv5r2iHv2L9tnf"].value
  var sysl = vueData.formData.multinfos["210918144856AK8npd6cSBGlxZBsWo3"].rows[vueObj.subFormIndex]["210918144604owaYQTRjdblks2NkiL9"].value

  if (yylb == "") {
    dsf.layer.toast("请选择食品类型！");
    flag = false;
  } else if (name == "") {
    dsf.layer.toast("请选择食品名称！");
    flag = false;
  }
  if (!flag) return flag;

  var ljsl = parseInt(sl);

  ljsl += getBrspyysl(yylb, name);

  sysl = parseInt(sysl.replace(/[^0-9]/g, "")); //仅取数字部分
  //主食每种限购6个
  if (ljsl > 6 && yylb == "1") {
    dsf.layer.toast("对不起，您已超出限购数量！");
    flag = false;
  } else if (sl > sysl) {
    //数量大于剩余数量
    dsf.layer.toast("购买数量不能大于剩余数量！");
    flag = false;
  }
  return flag;
}

exportObj.saveFilter = function (formData, formStruct, vueData, action) {
  return new Promise(function (resolve, reject) {
    var newFileFlag = vueData.$route.params.pk;
    if (newFileFlag == undefined) {
      dsf.http.post('fn/ZfspyyController/getDBDateTime').then(res => {
        let result = res.data
        if (result.type === "success") {
          var curDateTime = result.data.curDateTime;
          console.log(curDateTime);
          var mydate = new Date(curDateTime);
          var curHours = mydate.getHours();
         // resolve()
          if (!((curHours >= 8 && curHours < 11) || (curHours >= 14 && curHours < 15))) {
            dsf.layer.toast("对不起，当前不在预定时间内!");
            reject()
          } else {
            resolve()
          }
        }
      })
    }

  })

}
export default exportObj;
