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
  // 存入企业用户id
  if(!vueData.$route.params.pk) {
    vueData.$set(formData.main, '220611172205xsTK3z1uLWem4PbwQo2', {value: vueData.$route.query.enterpriseUserId})
  }
  // 申报说明
  vueData.$set(formStruct.controls.find(ctr => ctr.metaId == '220611182621faDGuS01WDQLHw27coR'), 'autosizeStyle', { maxHeight: '100px', minHeight: '50px', overflow: 'auto', padding: '5px !important', border: '1px solid #CFCFCF', borderRadius: '2px' })
  formData.main['220611182621faDGuS01WDQLHw27coR'].value = `申请河南省文化旅游""白名单企业""的应满足以下遴选标准，且生产经营状态正常，符合疫情防控要求。
  （一）省级文化旅游白名单企业遴选标准
  1.5A 级旅游景区、5星级旅游饭店。
  2.“万人助万企”省领导包联A级旅游景区。
  3.在全国有一定影响且在本行业处于领先地位的新业态(演艺、精品民宿等)。
  （二）市级文化旅游白名单企业遴选标准
  1.促进当地消费增长的非开放式 4A 级旅游景区、4星级旅游饭店。
  2.“万人助万企”市领导包联A 级旅游景区。
  3.在全省有一定影响的精品民宿。`
  // 申报白名单层级只显示省市
  formStruct.controls.find(ctr => ctr.metaId == '220611105022hjmWcJLf10GRT6LV4Wq').enumData.pop()
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