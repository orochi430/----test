
const exportObj = {};
exportObj.moduleRuleConvert = function (itemValue,vueData ) {
  dsf.http.post('/fn/convert/moduleRuleConvert', {
    convertId: '210913170803kFMbfrKxQLpIiMHaUM9',
    srcInfo: itemValue.dataValue['A0001']
  }).then(res => {
    if(res.data.code == 200) {
      vueData.$router.push(`/commonForm/${res.data.data.moduleId}/${res.data.data.pk}`)
    }
  })
}
export default exportObj;