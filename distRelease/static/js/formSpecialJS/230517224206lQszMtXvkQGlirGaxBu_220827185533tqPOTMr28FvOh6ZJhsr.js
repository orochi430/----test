// 会议通知

(function () {
  const exportObj = {};
  exportObj.initHandle = function (formData, formStruct, vueData) {
    console.log("远程报名通知单");
  };

  exportObj.viewMeetingSign = function (formData, formStruct, vueData) {
    vueData.$router.push({
      path: `/commonForm/${vueData.$route.query.signUpModuleId}/${vueData.$route.query.signUpPk}?listId=MeetingList&method=customNode&validateByList=1&tzlx=${vueData.$route.query.hyTzlx}&remoteStatus=1&showNodeId=18`,
    });
  };

  window.spJS = exportObj;
})();
