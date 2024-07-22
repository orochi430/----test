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

exportObj.dataFilter = function(listData, vueData) {
    console.log(listData);
    listData.forEach(element => {
        // let str = element.dataValue.startDate + " ~ " + element.dataValue.endDate.substr(10)
        // if (moment(new Date(element.dataValue.startDate)).format("YYYYMMDD") != moment(new Date(element.dataValue.endDate)).format("YYYYMMDD")) {
        //     str = element.dataValue.startDate + " ~ " + element.dataValue.endDate.substr(5)
        // }
        //显示有问题  所以注释掉  2023年1月16日21:04:37 @luy
        // vueData.$set(element.dataValue, "startDate", str)
    });
}


// exportObj.openOwnNotice = function(btn, vueData) {
//     vueData.$router.push({
//         name: "commonList",
//         params: {
//             moduleId: "190121161348OthBI4s3sEhvfuDJ5FD",
//             listId: "200818195728QeQ7vIeoJ3jWto301pj"
//         },
//         query: {
//             title: "会议通知管理"
//         }
//     });
// }
export default exportObj;