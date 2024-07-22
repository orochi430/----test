//上海地产  客户详情列表
const exportObj = {};

exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  vueData.$router.push({
    path: `/commonTabs/khxq`,
    query: {
      moduleId: moduleId,
      method:vueData.params.method,
      listId:vueData.params.listId,
      pk: pk,
      validateByList:1
    }
  });
}

exportObj.createRow = function (btn, vueData) {
  vueData.$router.push({
    name: "commonForm",
    params: {
      moduleId: "220318135143AMb3ecYycO76Kftaac7"
    },
    query: {
      formId: "220318145710iN7hQBV4fRguktdo5OU"
    }
  })
}

export default exportObj;
