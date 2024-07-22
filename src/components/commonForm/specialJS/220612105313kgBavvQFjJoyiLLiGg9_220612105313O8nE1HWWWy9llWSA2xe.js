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
  formData.main['220611182621faDGuS01WDQLHw27coR'].value = `商贸流通白名单企业需符合以下基本条件：
  1.在河南省注册的企业，诚实守信、合法经营、依法纳税、信用良好；
  2.符合安全生产、环保和常态化疫情防控要求；
  3.满足《河南省“四保”企业(项目)疫情防控工作指南》刚性措施和本工作方案应急状态下疫情防控措施要求；
  4.具备疫情应急处置条件和能力；
  5.具有社会责任担当，能够主动承担保供任务。
  （一）农批农贸市场白名单标准
  1.省级白名单标准。
  每个省辖市交易量最大的农批农贸市场纳入省级白名单，确保每个省辖市至少1家。具体到各地：
  (1)省会城市郑州，综合考虑交易规模和区位布局，在年交易量超过百万吨的大型农批农贸市场中选择4家纳入。
  (2)其他省辖市、济源示范区选择当地交易量最大的1家市场纳入。副中心城市和人口大市可适当增加大型农批农贸市场纳
  2.市县级白名单标准。
  结合当地人口数量、区域密集度、市场配送覆盖面等因素，面向服务主城区居民，本着能将省级白名单农批农贸市场输入本地的生活必需品快速集散分拨的原则，选择交易量较大的若干农批、农贸市场、菜市场，纳入市级白名单企业(纳入省级白名单的不再纳入市级，下同)。
  县级参照上述原则，优选确定白名单企业(纳入省市两级白名单的不再纳入县级，下同)。
  （二）商超企业白名单标准
  1.省级白名单标准。
  在全省布局的大型商超连锁企业(含省内超市、便利店、配送中心等)；当地发展好的大型商超企业；上年度在省内营业额1亿元以上的商超企业。
  2.市县级白名单标准。
  根据居民生活必需品保供需要，选择经营面积较大、服务人口较多的若干大型商超和连锁便利店，作为市、县级白名单企业。
  （三）电商平台企业白名单标准
  1.省级白名单标准。
  应为全国性、全省性大型电商平台。
  (1)上年度在河南省实现网络零售额50亿元及以上的全国性平台企业；
  (2)上年度在河南省实现营业收入10亿元及以上全国性B2B平台；
  (3)上年度在河南省实现网络零售额3亿元及以上的本土电商平台；
  (4)上年度跨境零售进出口1亿元及以上的跨境电商企业。
  2.市县级白名单标准。
  参照省级分类，市县对本区域内排名靠前的电商企业优选确定。`
  // 申报白名单层级只显示县
  formStruct.controls.find(ctr => ctr.metaId == '220611105022hjmWcJLf10GRT6LV4Wq').enumData.splice(0, 2)
  vueData.$set(formData.main, '220611105022hjmWcJLf10GRT6LV4Wq', {value: 3, text: '县'})
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