// 收件箱
const exportObj = {};
exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  dsf.http.post("fn/notepaper/markRead", {
    notePaperId: itemValue.A0001,
    userName: itemValue['C-BJ-0021'],
    moduleId: itemValue.A0004
  }).then(res => {
      itemValue['C-BJ-0004'] = 2
  })
  vueData.$eventBus.refreshBadge(vueData)
  vueData.$router.push({
    path: `/commonForm/${moduleId}/${pk}`,
    query: {
      method: 'inbox',
      listId: listid
    }
  });
}
export default exportObj;
