import dsf from "../../../common";

//上海地产原始房源列表JS
const exportObj = {};

exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  vueData.$router.push({
    name: "commonForm",
    params: {
      moduleId: moduleId,
      pk: pk
    },
    query:{
      listId :"220515125832w2Fh6NrmWdB466ADzQH",
      validateByList:1,
      method:vueData.params.method
    }
  });
}

export default exportObj;
