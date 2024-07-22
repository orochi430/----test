
/**
 * 督办反馈
*/
const exportObj = {};
// 根据反馈类型隐藏对应附件类型
function hideAttach(val, attachs){
  attachs[0].show = 0
  attachs[1].show = 0
  attachs[2].show = 0
  console.log(val !== undefined || val !== '')
  if (val !== undefined && val !== '') attachs[val - 1].show = 1

}
//获取关联文件
function getRelationFile(vueData) {
  let fileRela={
    relaMode:1,//1为单向关联，2为双向关联
    relacountLimit:1,//限制条数
    relaName:"文件关联",//名称
    relaValue:2, //关联文件类型值
    fileTotal:0//文件总数
  }
  return new Promise(function(resolve, reject) {
    dsf.http.post('ctrl/filerelation/select/checkedJson',  {
      pks: vueData.$route.query.relationId,
      infoId: vueData.pk,
      relaType: fileRela.relaValue,
      relaName: fileRela.relaName
    }).then(res => {
      if (res.data.code == 200) {
        resolve(res.data.data)
      } else {
        reject()
      }
    })
  })
}
exportObj.initHandle = function (formData, formStruct, vueData){
  // 关联立项单
  if (!vueData.relationList[0] || !vueData.relationList[0].document.length) {
    getRelationFile(vueData).then(data => {
      dsf.http.post('fn/mobileRelationFile/save',{
        relaMode: data[0].relaMode,
        relaIds: data[0].relaId,
        pk: vueData.pk,
        moduleId: vueData.moduleId,
        fileRelaId: vueData.relationList[0].fileRelaId
      }).then(res => {
        if (res.data.code == 200) {
          dsf.http.get("fn/mobileRelationFile/getFormRelationFiles", {
            pk: vueData.pk,
            moduleId: vueData.moduleId,
            nodeId: formStruct.parameters.nodeId,
            flowId: formStruct.parameters.flowId
          })
          .then((response) => {
            vueData.$set(vueData, 'relationList', response.data.rows)
          });
        }
      })
    })
  }
  // 根据反馈类型隐藏对应附件类型
  let attachs = formStruct.controls.filter(item => item.metaId.indexOf('attach') > -1)
  let feedType = formData.main['C-DB-FK-0024'].value
  hideAttach(feedType, attachs)
  vueData.$bus.on('inputRadio', function (busObj) {
    if (busObj.metaData.metaId == "C-DB-FK-0024") {
      hideAttach(busObj.value, attachs)
    }
  })
}
exportObj.saveAfter = function (vueData, formData, formStruct) {
  dsf.http.post('fn/superviseV6/approval/syncFeedbackPeriodsId', { id: vueData.pk }).then(res => {
    if (res.data.code == 200) {
      // dsf.layer.toast('保存成功')
    } else {
      dsf.layer.toast(res.data.message)
    }
  })
}
export default exportObj;
