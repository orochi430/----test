
// 通知公告根据发布状态查看表单
const exportObj = {};
exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  vueData.$router.push({
    path: `/commonForm/${moduleId}/${pk}`,
    query: {
      listId: listid,
      method: itemValue['C-NOTICE-0020.value'] == 1 ? 'viewNgr' : 'edit',
    }
  });
}
export default exportObj;