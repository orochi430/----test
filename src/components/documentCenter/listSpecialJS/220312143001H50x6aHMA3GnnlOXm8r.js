const exportObj = {};
exportObj.initHandle = function (vueData) {
  vueData.readStatusKey = 'YCGZWJ.220312105129bebpDftRySTBDQg4Zho.value'
  vueData.haveReadVal = 1
}
exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  dsf.http.post("fn/sdycGWController/updateFavorite", {
    id: pk
  }).then(res => {
      itemValue['YCGZWJ.220312105129bebpDftRySTBDQg4Zho.value'] = '1'
  })
  vueData.$router.push({
    path: `/commonForm/${moduleId}/${pk}?listId=${listid}`
  })
}
export default exportObj;
