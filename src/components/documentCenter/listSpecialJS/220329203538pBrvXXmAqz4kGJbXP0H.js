import dsf from "../../../common";

//上海地产我的待办  预约看房
const exportObj = {};

exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  vueData.$router.push({
    name: "commonForm",
    params: {
      moduleId: moduleId,
      pk: pk
    },
    query:{
      listId :"220329203538pBrvXXmAqz4kGJbXP0H",
      validateByList:1,
      method:vueData.params.method
    }
  });
}

export default exportObj;
