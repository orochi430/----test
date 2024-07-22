const exportObj = {};
exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  dsf.http.post("fn/notice/markRead", {
    pks: itemValue.id,
    moduleId: itemValue.moduleId,
    noticeId: itemValue.noticeId
  }).then(res => {
      itemValue.readStatus = 2
  })
  if (itemValue.noticeType == 7) { // 会议通知
    vueData.$router.push({
      path: `/commonForm/${itemValue.moduleId}/${itemValue.noticeId}?toFormId=220609100046nUzuCvYEOgp0gHAEOpN&method=viewMobile&listId=1808061608052gwg6wWGsNdiXr1yOCx&toNodeId=12`
    })
  } else if(itemValue.businessId) { // 节假日排班
    vueData.$router.push({
      path: `/commonForm/${itemValue.moduleId}/${itemValue.businessId}?formId=220610154224A6QZgAepSvyf25z5eIW&listId=210909145711N72320aox0yjkdcTIgu&method=notice`
    })
  } else if (itemValue.url) { // 日常排班
    vueData.$router.push({
      path: `${itemValue.url}?date=${itemValue.year}-${itemValue.month}`
    })
  } else {
    vueData.$router.push({
      path: `/commonForm/${itemValue.moduleId}/${itemValue.noticeId}?toFormId=200827194705FRBR9creSLC68ZNU7AY&method=viewMobile&listId=1808061608052gwg6wWGsNdiXr1yOCx&toNodeId=-1`
    })
  }
}
export default exportObj;
