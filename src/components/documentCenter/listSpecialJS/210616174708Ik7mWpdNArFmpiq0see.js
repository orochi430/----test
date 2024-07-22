const exportObj = {};
// <!-- 议题征询列表--jf -->

exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  console.log(itemValue);
  vueData.$router.push({
    path: `/commonForm/2008281406518GJRlHQpZXhLVj7G0Go/${itemValue["A0001"]}`,
    query: {
      listId: "MeetingList",
      method: "customNode",
      validateByList: "1",
      showNodeId: `${itemValue["A0009.value"] == 0 ? "-2" : "-1"}`,
    },
  });
};

export default exportObj;
