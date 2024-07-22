 const exportObj = {};
 //表决统计
exportObj.initHandle = function (formData, formStruct, vueData) {
  if (formStruct.parameters.nodeId == 15) {
    formStruct.parameters.isShowCurPerson = true
  }
}
exportObj.BiaoJTJ = function (formData, formStruct, vueData) {
  let meetingId = vueData.$route.query.meetingId;
  let showNodeId = vueData.$route.query.showNodeId;
  vueData.$router.push({
      path: `/meetingcast`,
      query: {
          meetingId:meetingId,
          topicId:formStruct.parameters.pk,
          showNodeId:showNodeId
        }
  })
}
//查看下一个议题
exportObj.nextTopicInfo = function (formData, formStruct, vueData) {
  console.log(formData, formStruct, vueData)
  let meetingId = vueData.$route.query.meetingId;
  let params = {
    meetingId:meetingId,
    topicId: formStruct.parameters.pk,
    checkRole: vueData.$route.query.checkRole || '0'
  }
  dsf.http.post("/fn/meetingVote/getNextTopicId", params).done(res => {
    if (res.code == 200&&res.message) {
      vueData.$router.push({
        path: `/commonForm/210607181937YJxUC5fve4y7q3SH5hJ/${res.message}?listId=MeetingList&method=viewYt&showNodeId=15&validateByList=1&meetingId=${meetingId}&pk=${res.message}`,
      })
    } else {
      dsf.layer.toast('未查到下一个议题');
    }
  })
}
// 审议意见
exportObj.topicOpinion = function (formData, formStruct, vueData) {
  vueData.$router.push({
    path: `/commonForm/2211231105231cI0G8yA6Hd6gRsJVoN`,
    query: {
      fid: formStruct.parameters.pk,
      specialSaveObj: JSON.stringify({ fid: formStruct.parameters.pk })
    }
  })
}
// 投票后刷新表单
exportObj.closeDialogCallback = function (data, actionName, formData, formMeta, vueData) {
    vueData.initData()
}
export default exportObj