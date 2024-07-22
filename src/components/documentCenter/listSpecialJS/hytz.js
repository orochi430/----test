import dsf from "../../../common";

const exportObj = {};
exportObj.link = function(listid, moduleId, pk, vueData, itemValue) {
    dsf.http.post('/fn/meetingNotice/updateReader', {
        pk: itemValue.id
    }).then(res => {
        itemValue.readStatus = true
        vueData.$router.push({
            path: `/commonForm/${itemValue.noticeModuleId}/${itemValue.noticeId}?listId=MeetingList&method=viewTzD&validateByList=1&bmStatus=1`,
            query: {
                signUpPk: itemValue.id,
                signUpModuleId: itemValue.moduleId,
                sendStatus: itemValue.sendStatus ? 1 : -1,
                noticeType: itemValue.noticeType
            }
        })
    })

}
export default exportObj;