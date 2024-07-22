const exportObj = {};
let enumData = []

function getAddress(params) {
  enumData = []
  return dsf.http.post('/ctrl/propertyJoint/getCodeItems',{
    codeFid: params,
    queryModuleId: '2206111015248zPjoAGO8jdei91mR3B',
    triggerCondition: '2206111112144ujEhZ2mPEg5uDmhjel'
  }).then(res => {
    console.log(res.data)
    if(res.data.code == 200) {
      enumData = res.data.data
    }
  })
}
exportObj.initHandle = function (formData, formStruct, vueData) {
  // 申报说明
  vueData.$set(formStruct.controls.find(ctr => ctr.metaId == '220611182621faDGuS01WDQLHw27coR'), 'autosizeStyle', { maxHeight: '100px', minHeight: '50px', overflow: 'auto', padding: '5px !important', border: '1px solid #CFCFCF', borderRadius: '2px' })
  formData.main['220611182621faDGuS01WDQLHw27coR'].value = `企业有下列情况之一的，不得纳入工业企业“白名单”：
  1.通过弄虚作假行为达到申报标准的；
  2.近三年发生重大安全、重大质量事故或有严重环境违法行为的；
  3.近三年发生严重社会失信行为的。
  （一）省级工业企业“白名单”标准
  1.上年度营业收入10亿元(含)以上；
  2.工信部专精特新“小巨人”企业；
  3.工信部产业链供应链“白名单”企业，工信部重点防控医疗物资储备企业；
  4.“万人助万企”省领导包联企业；
  5.在上交所、深交所、北交所主板及境外公开上市的工业企业；
  6.年进出口额2亿元以上的工业企业；
  7.其他产业带动能力强、产业链条覆盖面广，需省级协调保障的链主型工业企业。
  （二）市级工业企业“白名单”标准
  1.上年度营业收入1亿元(含)以上；
  2.省专精特新中小企业；
  3.“万人助万企”市领导包联企业；
  4.在“新三板”上市的工业企业；
  5.年进出口额5000万元以上的工业企业。
  （三）县级工业企业“白名单”标准
  1.规上工业企业；
  2.专精特新中小企业培育库企业；
  3.“万人助万企”县领导包联企业；
  4.准规上工业企业清单中的企业。`
  // 市县联动
  vueData.$bus.on("checkVal", async function (busObj) {
    console.log(busObj)
    if (busObj.metaData.metaId == "2206111110457h7fqDzMJlYjSpK9GDp") {
      vueData.$set(vueData.formData.main, "2206111112144ujEhZ2mPEg5uDmhjel", {
        value: "",
        text: ""
      })
      let dataValueId = busObj.metaData.enumData.find(item => item.value == busObj.value).id
      let county = formStruct.controls.find(ctr => ctr.metaId == '2206111112144ujEhZ2mPEg5uDmhjel')
      await getAddress(dataValueId)
      county.enumData = enumData
    } else if (busObj.metaData.metaId == "2206111214403ReuhgYa9PMB0IjYKXL") {
      vueData.$set(vueData.formData.main, "220611122303fSAXDtNAnFRYwc3ZDl3", {
        value: "",
        text: ""
      })
      let dataValueId = busObj.metaData.enumData.find(item => item.value == busObj.value).id
      let county = formStruct.controls.find(ctr => ctr.metaId == '220611122303fSAXDtNAnFRYwc3ZDl3')
      await getAddress(dataValueId)
      county.enumData = enumData
    }
  })

}
export default exportObj;