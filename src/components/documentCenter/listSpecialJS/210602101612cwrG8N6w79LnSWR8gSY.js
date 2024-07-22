
// 督办立项
const exportObj = {};
exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  let formId = ''
  // itemValue['A0008']可能返回pc的formId，需要替换为移动的formId
  if (itemValue['A0008']=='210603150328F0MZfmD9XRPUpOizTBE') formId = '210811160010bnCI2CV4zrvjD56VJCe'
  if (itemValue['A0008']=='210618140056OnLd4wKQO1SsOrvalVh') formId = '220728163210x4gM7QlAmfnYYMWK55M'
  if (itemValue['A0008']=='210807171451JlBvcNeaVsqMIyHKAkj') formId = '220804173346Gc6TBu49r2FTwnibsrW'
  let query={}
  if (formId){
    query.formId = formId;
  }
  vueData.$router.push({
    path: `/commonForm/${moduleId}/${pk}`,
    query
  });
}
// 督办立项按钮
exportObj.createDB = function (btn, vueData) {
  vueData.$router.push({
    path: '/commonForm/2106021016102xjgjpCc6tqdMZkrX20',
    query: {
      formId: '210811160010bnCI2CV4zrvjD56VJCe'
    }
  })
}
// 子任务督办立项按钮
exportObj.createSubDB = function (btn, vueData) {
  vueData.$router.push({
    path: '/commonForm/2106021016102xjgjpCc6tqdMZkrX20',
    query: {
      formId: '220728163210x4gM7QlAmfnYYMWK55M'
    }
  })
}
export default exportObj