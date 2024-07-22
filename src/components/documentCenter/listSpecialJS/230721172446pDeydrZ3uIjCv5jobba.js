// 单点已报名会议通知 --会议交换
const exportObj = {};

exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  vueData.$router.push({
    path: `/commonForm/${itemValue["A0004.value"]}/${itemValue["A0001.value"]}?listId=RemoteMeetingList&mId=${itemValue["A0004.value"]}&method=openRemoteNoticeView&validateByList=1&pk=${itemValue["A0001.value"]}`,
  });
};

export default exportObj;
