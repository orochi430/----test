import dsf from "../../../common";

const exportObj = {};
exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  dsf.http.post('/fn/meetingNotice/updateReader', {
    pk: itemValue.id
  }).then(res => {
    vueData.$router.push({
      path: `/newMeeting/topicsTab/${itemValue.noticeModuleId}/${itemValue.noticeId}?listId=MeetingList&method=viewTzD&validateByList=1&bmStatus=1`,
      query: {
        signUpPk: itemValue.id,
        signUpModuleId: itemValue.moduleId,
        sendStatus: itemValue.sendStatus ? 1 : -1,
        noticeType: itemValue.noticeType,
        tabType: 0,
        topicFormId: "220225153727YMbf1ZcpULIzftz186J"
      }
    })
  })
  
}
export default exportObj;
