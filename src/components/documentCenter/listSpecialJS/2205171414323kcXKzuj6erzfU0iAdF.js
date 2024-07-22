const exportObj = {};
exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  vueData.$router.push({
    path: `/commonForm/${moduleId}/${pk}`,
    query: {
      method: 'view',
      listId: '2204081328382DrK6cmYfJouxuSQXlT',
    }
  });
}
export default exportObj;
