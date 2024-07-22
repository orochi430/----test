// 发件箱
const exportObj = {};
exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  
  // vueData.$eventBus.refreshBadge(vueData)
  vueData.$router.push({
    path: `/commonForm/${moduleId}/${pk}`,
    query: {
      method: 'send',
      listId: listid
    }
  });
}

/*
淮安清江浦区发件箱增加查看详情按钮 2022年6月20日18:30:22 @ly
*/
exportObj.getReadDetail = function (itemValue, vueData) {
  console.log(itemValue, vueData);
  vueData.$router.push({
    path: `/commonTabs/workNotice`,
    query:{
      sourceId:itemValue.dataValue["A0001"],
      notLink:1
    }
  });
}
export default exportObj;
