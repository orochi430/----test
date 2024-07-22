const exportObj = {};
exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  dsf.http.post("fn/mobileNotice/markRead", {
    pks: itemValue.id
  }).then(res => {
      itemValue.status = 2
  })
  vueData.$router.push({
    path: `/commonForm/${itemValue.moduleId}/${itemValue.info_id}?method=${itemValue.method}&listId=${itemValue.listId}`
  })
}
export default exportObj;
