const exportObj = {};
exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  dsf.http.post("fn/mobileNotice/markRead", {
    pks: itemValue.id
  }).then(res => {
      itemValue.readStatus = 2
  })
  vueData.$router.push({
    path: `/commonForm/${itemValue.moduleId}/${itemValue.noticeId}?method=view&listId=1808061608052gwg6wWGsNdiXr1yOCx`
  })
}
export default exportObj;
