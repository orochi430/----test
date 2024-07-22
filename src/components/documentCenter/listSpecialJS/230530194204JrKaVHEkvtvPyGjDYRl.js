// 单点议题查看列表
const exportObj = {};
exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  vueData.$router.push({
    path: `/commonForm/${moduleId}/${pk}`,
    query: {
      listId: '210607181937YJxUC5fve4y7q3SH5hJ',
      method: 'checkInfo',
      validateByList: '1',
    }
  });
}
export default exportObj;
