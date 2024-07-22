// 会议通知
const exportObj = {};
exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  vueData.$router.push({
    path: "/commonForm/190121161348OthBI4s3sEhvfuDJ5FD/" + itemValue["C-MEETINGTZ-TODO-001"],
    query: {
      listId: "19052516071325WpaOeoZLGcM0AoRMo",
      method: "info",
      noRela: 1,
      validateByList: 1
    }
  });
}
export default exportObj;
