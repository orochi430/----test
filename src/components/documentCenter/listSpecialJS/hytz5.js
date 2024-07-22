import dsf from "../../../common";

const exportObj = {};
exportObj.link = function(listid, moduleId, pk, vueData, itemValue) {
    console.log(itemValue);
    vueData.$router.push({
        path: `/commonForm/${itemValue.noticeModuleId}/${itemValue.noticeId}?listId=MeetingList&method=viewTzD&validateByList=1&bmStatus=1`,
        query: {
            moduleId: itemValue.moduleId,
            listId: 'MeetingList',
            method: 'viewTz',
            validateByList: '1',
            showNodeId: "-1",
            pk: itemValue.id
        }
    })

}
export default exportObj;