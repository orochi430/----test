import dsf from "../../../common";

//上海地产我的待办  精准找房
const exportObj = {};

exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  vueData.$router.push({
    name: "commonForm",
    params: {
      moduleId: moduleId,
      pk: pk
    },
    query:{
      listId :"220329194530343oJaFkGdYXrF72WF1",
      validateByList:1,
      method:vueData.params.method
    }
  });
}

export default exportObj;
