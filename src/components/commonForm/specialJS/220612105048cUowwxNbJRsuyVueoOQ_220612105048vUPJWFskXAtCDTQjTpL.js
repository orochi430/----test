const exportObj = {};
let enumData = []

function getAddress(params, triggerCondition = '2206111112144ujEhZ2mPEg5uDmhjel') {
  enumData = []
  return dsf.http.post('/ctrl/propertyJoint/getCodeItems',{
    codeFid: params,
    queryModuleId: '2206111015248zPjoAGO8jdei91mR3B',
    triggerCondition: triggerCondition
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
  // 隐藏所属领域子领域
  let subCtr_1 = formStruct.controls.find(ctr => ctr.metaId == '220611181058haWHcgtwdnu9r4G2A7G')
  let subCtr_2 = formStruct.controls.find(ctr => ctr.metaId == '220611181509P1I11FJSkEwjdggb941')
  let subCtr_3 = formStruct.controls.find(ctr => ctr.metaId == '2206111907081Hr09vP5R7EqdIbRaEP')
  if (!formData.main['220611181058haWHcgtwdnu9r4G2A7G'].value) subCtr_1.propertyShow = 0
  if (!formData.main['220611181509P1I11FJSkEwjdggb941'].value) subCtr_2.propertyShow = 0
  if (!formData.main['2206111907081Hr09vP5R7EqdIbRaEP'].value) subCtr_3.propertyShow = 0
  // 申报说明
  vueData.$set(formStruct.controls.find(ctr => ctr.metaId == '220611182621faDGuS01WDQLHw27coR'), 'autosizeStyle', { maxHeight: '100px', minHeight: '50px', overflow: 'auto', padding: '5px !important', border: '1px solid #CFCFCF', borderRadius: '2px' })
  formData.main['220611182621faDGuS01WDQLHw27coR'].value = `按照产业链完整、投资规模较大、符合疫情防控要求、具备防疫条件等标准，从省、市、县重点项目库中遴选一定数量的在建项目和新开工项目，分别列入本级“四保”项目白名单(覆盖本级重点项目年度计划投资70%以上)，主要包括省、市、县三级领导分包推进项目、“三个一批”项目中具有引领带动作用的项目、灾后恢复重建重点建设项目等。考虑到“打捆项目”施工分散，管控难度较大，原则上不列入白名单。具体申报条件：
  (一)符合安全生产要求。
  能够落实安全生产法律法规和标准规范，具备安全施工条件，无重大生产安全事故隐患。
  (二)符合施工环境保护要求。
  能够落实施工环境保护制度，能够达到扬尘污染防控、环保调控等有关标准。
  (三)符合疫情防控要求。
  状项目具备封闭式管理条件，有固定的餐饮、住宿场所，对施工人员和机械、车辆能够做到实时管控，在应急状态下能够实现闭环管理；高速公路、铁路等线性项目，能够做到工作场所和住所的“点对点”接送，减少中途接触环节，确保防疫安全。
  (四)符合诚信履约要求。
  项目建设单位信用良好，在“信用中国”无不良信用记录。`
  vueData.$bus.on("checkVal", async function (busObj) {
    console.log(busObj)
    if (busObj.metaData.metaId == "2206111110457h7fqDzMJlYjSpK9GDp") { // 市县联动
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
    }else if (busObj.metaData.metaId == "220611163308Mvzsh6ftqzFXYOOZbil") { // 所属领域级联
      vueData.$set(vueData.formData.main, "220611181058haWHcgtwdnu9r4G2A7G", { value: "", text: "" })
      vueData.$set(vueData.formData.main, "220611181509P1I11FJSkEwjdggb941", { value: "", text: "" })
      vueData.$set(vueData.formData.main, "2206111907081Hr09vP5R7EqdIbRaEP", { value: "", text: "" })
      subCtr_1.propertyShow = 0 
      subCtr_2.propertyShow = 0 
      subCtr_3.propertyShow = 0 
      let dataValueId = busObj.metaData.enumData.find(item => item.value == busObj.value).id
      await getAddress(dataValueId, '220611181058haWHcgtwdnu9r4G2A7G')
      if(enumData.length > 0) {
        subCtr_1.propertyShow = 1
        subCtr_1.enumData = enumData
      }
    }else if (busObj.metaData.metaId == "220611181058haWHcgtwdnu9r4G2A7G") { // 所属领域子1级联
      vueData.$set(vueData.formData.main, "220611181509P1I11FJSkEwjdggb941", { value: "", text: "" })
      vueData.$set(vueData.formData.main, "2206111907081Hr09vP5R7EqdIbRaEP", { value: "", text: "" })
      subCtr_2.propertyShow = 0 
      subCtr_3.propertyShow = 0 
      let dataValueId = busObj.metaData.enumData.find(item => item.value == busObj.value).id
      await getAddress(dataValueId, '220611181509P1I11FJSkEwjdggb941')
      if(enumData.length > 0) {
        subCtr_2.propertyShow = 1
        subCtr_2.enumData = enumData
      }
    }else if (busObj.metaData.metaId == "220611181509P1I11FJSkEwjdggb941") { // 所属领域子2级联
      vueData.$set(vueData.formData.main, "2206111907081Hr09vP5R7EqdIbRaEP", { value: "", text: "" })
      subCtr_3.propertyShow = 0 
      let dataValueId = busObj.metaData.enumData.find(item => item.value == busObj.value).id
      await getAddress(dataValueId, '2206111907081Hr09vP5R7EqdIbRaEP')
      if(enumData.length > 0) {
        subCtr_3.propertyShow = 1
        subCtr_3.enumData = enumData
      }
    }
  })

}
export default exportObj;