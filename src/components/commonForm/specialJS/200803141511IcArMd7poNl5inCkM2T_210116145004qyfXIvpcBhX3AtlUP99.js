// 外出报备
import dsf from "../../../common";
import util from "@/common/util";
import date from "@/common/date";
const exportObj = {};

let count = 0
exportObj.handle = function (formData, formStruct) {

}

exportObj.formHandle = {
  get(target, key, receiver) {
    console.log('get', key)
    if (typeof target[key] === 'object' && target[key] !== null) {
      return new Proxy(target[key], handler)
    }
    return Reflect.get(target, key, receiver)
  },
  set(target, key, value, receiver) {
    console.log('set', key, value)
    return Reflect.set(target, key, value, receiver)
  }
}
exportObj.initHandle = async function (formData, formStruct, vueData) {
  let enumData = new Map()
  // 初始化时判断是否为研发人员，非研发人员不显示项目模块
  await dsf.http.get('fn/inspectiontime/userType/get').then(response => {
    let res = response.data
    console.log(formStruct)
    if (res.code == '200' && res.data != '1') {
      console.log('1')
      formStruct.subform['2101141737471Goq5SfARFYBEtRtcSU'].controls.filter(item => item.metaId == 'C-GS-013')[0].privilege.visible = false
      console.log(formStruct)
    }
  })
  // 初始化时间为空时赋值当前时间
  if (!formData.main["C-GSZB-001"].value) {
    console.log(date.format(new Date(), 'yyyy-m-d'))
    formData.main["C-GSZB-001"].value = date.format(new Date(), 'yyyy-m-d')
  }
  // 初始化时获取对应项目模块
  formData.multinfos['2101141737471Goq5SfARFYBEtRtcSU'].rows.forEach((item, index) => {
    if (item['C-GS-011'].value) {
      getEnumData(item['C-GS-011'].value, formData.main["C-GSZB-001"].value, index, enumData)
    }
  })
  vueData.$bus.on("inpBus", function (busObj) {
    if (busObj.metaData.metaId == "C-GS-008") {
      let subFormKey
      for (let [k, v] of Object.entries(formStruct.subform)) {
        v.controls.forEach((item, index) => {
          if (item.controlId == busObj.metaData.controlId) {
            subFormKey = k
          }
        })
      }
      let temp = 0;
      vueData.formData.multinfos[subFormKey].rows.forEach(item => {
        temp += Number(item["C-GS-008"].value)
      })
      count = temp
      vueData.$set(vueData.formData.main["C-GSZB-003"], "value", count)
    }
  })
  // 项目名称与项目模块进行联动
  vueData.$bus.on("selectUserBus", function (busObj) {
    if (busObj.metaData.metaId == "C-GS-011") {
      console.log('--------------', busObj, formData, formStruct, vueData)
      let subFormKey, controlModule
      for (let [k, v] of Object.entries(formStruct.subform)) {
        v.controls.forEach((item, index) => {
          if (item.controlId == busObj.metaData.controlId) {
            subFormKey = k
          }
          if (item.metaId == 'C-GS-013') {
            controlModule = item
          }
        })
      }
      // 名称变化时模块置空
      formData.multinfos[subFormKey].rows[busObj.subFormIndex]['C-GS-013'] = {
        value: ''
      }

      getEnumData(busObj.value, formData.main["C-GSZB-001"].value, busObj.subFormIndex, enumData)
    }

  })
  // 改变项目模块的列表选项
  vueData.$bus.on("showCheckBox", function (vueObj) {
    console.log(vueObj)
    vueObj.controlData.columnsValue.columns = enumData.get(vueObj.subFormIndex);
    vueObj.currentColumns = enumData.get(vueObj.subFormIndex);
  })

}

function getEnumData(xmid, date, index, enumData) {
  dsf.http.post('fn/inspectiontime/project/moduleList', { // 获取项目模块
    xmid: xmid, // 项目名称编号
    date: date
  }).then(response => {
    let res = response.data
    if (res.code == '200') {
      enumData.set(index, JSON.parse(JSON.stringify(res.data).replace(/yfModuleName/g, "text").replace(/id/g, "value")))
    }
  })
}


exportObj.saveFilter = function (formData, formStruct, vueData, action) {
  return new Promise(function (resolve, reject) {
    dsf.http.post('fn/time/checkFillGs', {
      begin: formData.main["C-GSZB-001"].value,
      end: formData.main["C-GSZB-002"].value
    }).then(response => {
      let res = response.data
      if (res.code == '200') {
        if (count > 24) {
          dsf.layer.toast("当天合计工时不能超过24小时");
          reject()
        } else
          resolve()
      }else{
        dsf.layer.toast(res.message);
        reject()
      }
    })

  })

}

export default exportObj;
