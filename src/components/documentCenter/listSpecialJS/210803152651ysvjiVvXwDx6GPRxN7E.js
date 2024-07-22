const exportObj = {};
// <!-- 征询单中议题填报不可编辑--jf -->
exportObj.dataFilter = function(listData, vueData) {
  console.log(listData);
};
exportObj.link = function(listid, moduleId, pk, vueData, itemValue) {
  vueData.$router.push({
    path: `/commonForm/${moduleId}/${pk}`,
    query: {
      listId: "210607181937YJxUC5fve4y7q3SH5hJ",
      method: "checkInfo",
      validateByList: 1
    }
  });
};

export default exportObj;
