// 西藏自治区人民政府移动办公项目】公文回收
const exportObj = {};
exportObj.dataFilter = function (datas, vueData) {
  datas.forEach((item) => (item.dataValue = item.data));
}
exportObj.link = function (listId, moduleId, pk, vueData, item) {
  vueData.$router.push({
    path: `/commonForm/${moduleId}/${item.infoId}`,
    query: {
      listId: "22081515451835n4mwqlg8vp9D0nfpg",
      method: "recycleView",
      status: item.status,
      fid: item.fid,
      infoId: item.infoId,
      flowId: item.wfId,
      pId: item.pid,
      pnId: item.pnid,
    }
  })
}
export default exportObj;
