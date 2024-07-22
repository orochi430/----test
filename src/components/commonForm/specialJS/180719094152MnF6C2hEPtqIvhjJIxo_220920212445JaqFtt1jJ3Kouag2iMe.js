// 无锡数统 个人日程
const exportObj = {};


let flag = 1 // 判断用户是否为领导
exportObj.initHandle = function (formData, formStruct, vueData) {
  let userPrivi = dsf.util.loadSessionStore("user").privileges
  let ldjs = ["单位领导", "单位分管领导", "部门领导"]
  userPrivi.findIndex( item => ldjs.indexOf(item.name) !== -1) == -1 ? flag = 0 : flag = 1
  formStruct.controls.find( item => item.metaId == "210325124007tYi1SDQRD9rQWTOLvDs").show = flag
}

exportObj.saveFilter = function (formData, formStruct, vueData,action) {
  return new Promise(function(resolve,reject){
    if(!formData.main["C-RC-0004"].value) {
      let end = formData.main["C-RC-0003"].value.split(' ')[0] + ' 23:59'
      vueData.$set(formData.main,"C-RC-0004",{value: end})
    }
    resolve()
  }) 
}

exportObj.saveAfter = function (vueData, formStruct, formData) {
  flag ? dsf.http.post(`fn/ldrctbControler/saveLdrc?pk=${formData.main["A0001"].value}&sftbldrc=${formData.main["210325124007tYi1SDQRD9rQWTOLvDs"].value}`) : ""
  vueData.$eventBus.refreshSchedule(vueData); // 事件总线的日程刷新事件通知
  dsf.layer.toast("日程保存成功", undefined, () => vueData.backSucces());
}

exportObj.afterLogicDeleteXForm = function (formData, formStruct, vueData) {
  console.log('删除后')
  dsf.http.post('fn/schedulecenter/delScheduleRemind', {pk: formStruct.parameters.pk }).then(res => {
    if (res.data.code == 200) {
      vueData.$eventBus.refreshSchedule(vueData); // 事件总线的日程刷新事件通知
    }
  })
}
export default exportObj;