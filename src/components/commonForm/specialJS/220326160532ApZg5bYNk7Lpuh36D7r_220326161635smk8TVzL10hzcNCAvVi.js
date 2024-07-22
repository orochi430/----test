import dsf from "../../../common";

/**
 * 核心商务书表单
 * 房源情况的经营主体变更时，调用后端接口获取二级成员企业
 */
const exportObj = {};
exportObj.initHandle = function (formData, formStruct, vueData) {
  //根据渠道公司名称为空，则隐藏下面的控件
  let companyName = formData.main["C-ZS-BUSINESS-CONFIRMATION-CORE-027"].value;
  let hidCtrlArray = ["C-ZS-BUSINESS-CONFIRMATION-CORE-027", "C-ZS-BUSINESS-CONFIRMATION-CORE-028", "C-ZS-BUSINESS-CONFIRMATION-CORE-029", "C-ZS-BUSINESS-CONFIRMATION-CORE-030"
    , "C-ZS-BUSINESS-CONFIRMATION-CORE-031", "C-ZS-BUSINESS-CONFIRMATION-CORE-032", "C-ZS-BUSINESS-CONFIRMATION-CORE-033", "C-ZS-BUSINESS-CONFIRMATION-CORE-034"]
    
  formStruct.controls.forEach(element => {
    if (!companyName || companyName == "") {
      if (hidCtrlArray.findIndex(n => n == element.metaId) > -1) {
        vueData.notVaildateMetas.push(element.metaId)
        element.show = 0;
      }
    } else {
      if (hidCtrlArray.findIndex(n => n == element.metaId) > -1) {
        element.show = 1;
      }
    }
  });

  let cityChange = () => {
    //城市
    window["C-ZS-BUSINESS-CONFIRMATION-CORE-008_beforeOpenCode"] = function (formData, url,vueData) {
      if (formData.main["C-ZS-BUSINESS-CONFIRMATION-CORE-007"].value.length) {
        let tempurl = url.split('?')[0] + "?provinceId=" + formData.main["C-ZS-BUSINESS-CONFIRMATION-CORE-007"].value
        if (url.split('?')[1]) {
          tempurl = tempurl + "&" + url.split('?')[1]
        }
        return tempurl;
      } else {
        dsf.layer.toast("请选择省份！");
        return ""
      }
    }
    //行政区
    window["C-ZS-BUSINESS-CONFIRMATION-CORE-009_beforeOpenCode"] = function (formData, url) {
      if (formData.main["C-ZS-BUSINESS-CONFIRMATION-CORE-008"].value.length) {
        let tempurl = url.split('?')[0] + "?cityId=" + formData.main["C-ZS-BUSINESS-CONFIRMATION-CORE-008"].value
        if (url.split('?')[1]) {
          tempurl = tempurl + "&" + url.split('?')[1]
        }
        return tempurl;
      } else {
        dsf.layer.toast("请选择城市！");
        return ""
      }
    }
  }
  cityChange();


  window["relationFile-2_beforeOpenCode"] = function (fileRelaId, parameters, metaData, vueDataComp) {
    vueData.saveNoTip((result) => {
      if (fileRelaId == "2206012142016maxXSIRHzAd7cVdfdW") {
        vueData.$router.push({
          path: `/commonForm/220528195846HDnSpbcDZr1L2fZ42QU?formid=220528200102UV2XbtnVBfKKgcZp7OP`,
          query: {
            fid: parameters.pk,
            
          }
        });
      } else if (fileRelaId == "2206012142396KwXtJaGeILz3cw6Xe6") {
        vueData.$router.push({
          path: `/commonForm/220601192152cn9h0jVIqKOD3vaaxsR?formid=220601192152XVnNFHW00VGCWMBv9r6`,
          query: {
            fid: parameters.pk
          }
        });
      }
    })
  }
  vueData.$bus.on("selectUserBus", function (busObj) {
    //经营主体发生变更二级成员内容
    if (busObj.metaData.metaId == "C-ZS-BUSINESS-CONFIRMATION-CORE-005") {
      if (busObj.value) {
        dsf.http.post("fn/coreBusinessContract/getSecCode", { companyId: busObj.value }).then((res) => {
          vueData.$set(formData.main, "C-ZS-BUSINESS-CONFIRMATION-CORE-006", { value: res.data.data.companyId, text: res.data.data.companyName })
        })
      }
    }

    //省份变更
    if (busObj.metaData.metaId == "C-ZS-BUSINESS-CONFIRMATION-CORE-007") {
      vueData.$set(formData.main, 'C-ZS-BUSINESS-CONFIRMATION-CORE-008', { value: "", text: "" })
      vueData.$set(formData.main, 'C-ZS-BUSINESS-CONFIRMATION-CORE-009', { value: "", text: "" })
      if (busObj.value) {
        cityChange();
      }
    }
    //城市变更
    if (busObj.metaData.metaId == "C-ZS-BUSINESS-CONFIRMATION-CORE-008") {
      vueData.$set(formData.main, 'C-ZS-BUSINESS-CONFIRMATION-CORE-009', { value: "", text: "" })
      if (busObj.value) {
        cityChange();
      }
    }

  })
  vueData.$bus.on("selectDateTime", function (busObj) {
    function monthDayDiff(startDate, endDate) {
      let flag = [1, 3, 5, 7, 8, 10, 12, 4, 6, 9, 11, 2];
      let start = new Date(startDate);
      let end = new Date(endDate);
      let year = end.getFullYear() - start.getFullYear();
      let month = end.getMonth() - start.getMonth();
      let day = end.getDate() - start.getDate();

      let indexEnd = flag.findIndex((temp) => {
        return temp === end.getMonth() + 1
      });
      let monthLengthEnd;
      if (indexEnd <= 6) {
        monthLengthEnd = 31;
      } else if (indexEnd > 6 && indexEnd <= 10) {
        monthLengthEnd = 30;
      } else {
        let endFullYear = end.getFullYear();
        if (yearType(endFullYear)) {
          monthLengthEnd = 29;
        } else {
          monthLengthEnd = 28;
        }
      }

      let indexStart = flag.findIndex((temp) => {
        return temp === start.getMonth() + 1
      });
      let monthLengthStart;
      if (indexStart <= 6) {
        monthLengthStart = 31;
      } else if (indexStart > 6 && indexStart <= 10) {
        monthLengthStart = 30;
      } else {
        let startFullYear = start.getFullYear();
        if (yearType(startFullYear)) {
          monthLengthStart = 29;
        } else {
          monthLengthStart = 28;
        }
      }

      if (day == 0) {
        day = 1;
      } else if (day == -1) {
        day = 0;
      } else if (day < -1) {
        month--;
        day = day + monthLengthStart + 1;
      } else if (day > 0) {
        day = end.getDate() - start.getDate() + 1;

        if (day == monthLengthEnd) {
          month++;
          day = 0;
        }
      }
      if (month < 0) {
        year--;
        month = 12 + month;
        
      }
      if (month == 12) {
        year++;
        month = 0;
      }
      // let result;
      // if (year != 0 && month != 0 && day != 0) {
      //   result = year + '年' + month + '月又' + day + '天';
      // } else if (year == 0 && month != 0 && day != 0) {
      //   result = month + '月又' + day + '天';
      // } else if (year != 0 && month == 0 && day == 0) {
      //   result = year + '年';
      // } else if (year == 0 && month != 0 && day == 0) {
      //   result = month + '月';
      // } else if (year == 0 && month == 0 && day != 0) {
      //   result = day + '天';
      // } else if (year != 0 && month == 0 && day != 0) {
      //   result = year + '年又' + day + '天';
      // } else if (year != 0 && month != 0 && day == 0) {
      //   result = year + '年' + month + '月';
      // }
      // console.log(result);
      return {year, month, day}
    }
    function yearType(year){
      if(year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)) {
        return true
      }
      return false
    }
    if (busObj.metaData.metaId == "C-ZS-BUSINESS-CONFIRMATION-CORE-017" || busObj.metaData.metaId == "C-ZS-BUSINESS-CONFIRMATION-CORE-054") {
      let ksDate = formData.main["C-ZS-BUSINESS-CONFIRMATION-CORE-017"].value;
      let jsDate = formData.main["C-ZS-BUSINESS-CONFIRMATION-CORE-054"].value;
      if(ksDate && jsDate) {
        let {year, month, day} = monthDayDiff(ksDate, jsDate)
        dsf.http.post("fn/coreBusinessContract/countDate",{day,ksDate,jsDate}).then(({data}) => {
          console.log('countDate:'+data);
          let years = year + data
          let months = year >= 1 ? year*12 + month : month
          vueData.$set(formData.main, 'C-ZS-BUSINESS-CONFIRMATION-CORE-020', { value: String(years) })
          vueData.$set(formData.main, 'C-ZS-BUSINESS-CONFIRMATION-CORE-018', { value: String(months) })
          vueData.$set(formData.main, 'C-ZS-BUSINESS-CONFIRMATION-CORE-019', { value: String(day) })
        })
      } else {
        vueData.$set(formData.main, 'C-ZS-BUSINESS-CONFIRMATION-CORE-020', { value: '' })
        vueData.$set(formData.main, 'C-ZS-BUSINESS-CONFIRMATION-CORE-018', { value: '' })
        vueData.$set(formData.main, 'C-ZS-BUSINESS-CONFIRMATION-CORE-019', { value: '' })
      }
    }
  })
  //破红线内容同时选择无和其他内容时提示
  vueData.$bus.on("checkVal",function (busObj) {   
    if (busObj.metaData.metaId=="C-ZS-BUSINESS-CONFIRMATION-CORE-057") {
      if (busObj.value.length>1&&busObj.value.indexOf('0')!=-1) {
        dsf.layer.toast("重点核心商务书条款”不能同时选择无和其他条款，请重新确认！")
        vueData.$set(formData.main, 'C-ZS-BUSINESS-CONFIRMATION-CORE-057', {text:"", value: "" })
      }
    }
  })

}
function dealChildData(formData, vueData, callback, temp_pk="") {
  let sourceId = "220528193219Af81uiCJAp2rcc1PIZ8";
  let rowsSourceItem = formData.multinfos[sourceId].rows
  //子表
  dsf.http.post("fn/commonTool/getIdByTableName", { dbName: "ImBzServiceConnection", tableName: "zs_business_confirmation_core_listings" }).then(({ data }) => {
      let maxid = data.data.id
      if (temp_pk) {
        let rowIndex = 0
        rowsSourceItem.forEach(element => {
            if (element.action == "Added"  && element[sourceId].value.length >= 10) {
                vueData.$set(element[sourceId], 'value', parseInt(maxid) + rowIndex)
                rowIndex++
            }
        });
      } else {
          let rowIndex = 0
          rowsSourceItem.forEach(element => {
              if (element.action == "Added"  && element[sourceId].value.length >= 10) {
                  vueData.$set(element[sourceId], 'value', parseInt(maxid) + rowIndex)
                  rowIndex++
              }
          });
      }
      callback();
  })
}
exportObj.saveFilter = function (formData, formStruct, vueData) {
  return new Promise(function (resolve, reject) {
    let rentMonth = Number(formData.main["C-ZS-BUSINESS-CONFIRMATION-CORE-018"].value)
    let rentDay = Number(formData.main["C-ZS-BUSINESS-CONFIRMATION-CORE-019"].value)
    let fitmentMonth = Number(formData.main["C-ZS-BUSINESS-CONFIRMATION-CORE-021"].value)
    let fitmentDay = Number(formData.main["C-ZS-BUSINESS-CONFIRMATION-CORE-022"].value)
    if(rentMonth < fitmentMonth){
      reject("数据校验未通过，请检查填写的数据！")
    } else if(rentMonth == fitmentMonth) {
      rentDay > fitmentDay ? "" : reject("数据校验未通过，请检查填写的数据！")
    }

    if (formData.main["C-ZS-BUSINESS-CONFIRMATION-CORE-015"].value.length>300) {
      reject("企业经营简介/经营品牌长度必须在300字符内，请注意！")
    }

    if (!vueData.pk) {
      dsf.http.post("fn/commonTool/getIdByTableName", { dbName: "ImBzServiceConnection", tableName: "zs_business_confirmation_core" }).then(({ data }) => {
        let temp_pk = data.data.id
        vueData.pk = temp_pk
        vueData.formParams.pk = temp_pk
        vueData.$set(formStruct.parameters, 'pk', temp_pk)
        vueData.$set(formData.main, 'A0001', { value: temp_pk })
        dealChildData(formData, vueData, () => resolve(), temp_pk);
      });
    } else {
      dealChildData(formData, vueData, () => resolve());
    }
  })
}
exportObj.saveAfter = function (vueData, formData, formStruct) {
  vueData.$router.push({
    path: "/commonTabs/hxsws?title=核心商务书",
  });
}
exportObj.zuofei = function (formData, formStruct, vueData) {
  let diglogData = {
    title: "原因",
    placeholder: "请输入作废原因",
    buttonText: "保存",
    api: "fn/coreBusinessContract/invalid"
  }
  let pk = formData.main["A0001"].value
  dsf.http.post("fn/coreBusinessContract/isSubmitInvalid",{pk: pk}).then(({data})=>{
    if(data.code == "1"){
      vueData.$refs.rejectDialog.showDialog = true
      vueData.$refs.rejectDialog.title = diglogData.title
      vueData.$refs.rejectDialog.placeholder = diglogData.placeholder
      vueData.$refs.rejectDialog.subTitle = diglogData.subTitle
      vueData.$refs.rejectDialog.buttonText = diglogData.buttonText
      vueData.$refs.rejectDialog.confirmCallBack = function(reason){
        dsf.http.post(diglogData.api,{pk: pk, nr: reason}).then(({data}) => {
          dsf.layer.toast(data.message)
        })
      }
    } else {
      dsf.layer.toast(data.message)
    }
  })
}
export default exportObj;