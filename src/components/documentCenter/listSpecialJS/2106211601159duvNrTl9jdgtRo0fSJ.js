const exportObj = {};

exportObj.convertMeetingNotice = function(itemValue, vueData) {
    console.log(itemValue, vueData)
    dsf.http.post("fn/meetingNotice/getHytzByHyId", {
        hyId: itemValue.dataValue['A0001']
    }).done(res => {
        if (res.code == 200) {
            let url = `/commonForm/${res.data.moduleId}/${res.data.tzId}`
            if (res.data.status != 0) {
                url = `/commonForm/${res.data.moduleId}/${res.data.tzId}?listId=${res.data.listId}&method=${res.data.method}&validateByList=${res.data.validateByList}`
            }
            vueData.$router.push({
                path: url,
                query:{
                    notCheck: true
                }
            })
        }
    }).error(function(message) {
        dsf.layer.toast(message);
    })
}

// exportObj.dataFilter = function(listData, vueData) {
//     console.log(listData);
//     listData.forEach(element => {
//         let str = element.dataValue["c-meetingsq-007"] + " ~ " + element.dataValue["c-meetingsq-008"].substr(10)
//         if (moment(new Date(element.dataValue["c-meetingsq-007"])).format("YYYYMMDD") != moment(new Date(element.dataValue["c-meetingsq-008"])).format("YYYYMMDD")) {
//             str = element.dataValue["c-meetingsq-007"] + " ~ " + element.dataValue["c-meetingsq-008"].substr(5)
//         }
//         vueData.$set(element.dataValue, "c-meetingsq-007", str)
//         if (element.dataValue['A0009.value'] != 0) {
//             if (element.dataValue['c-meetingsq-114.value']) {
//                 vueData.$set(element.dataValue, "B0033", `已报名人数(${element.dataValue['c-meetingsq-114.value']})`)
//             } else {
//                 vueData.$set(element.dataValue, "B0033", `当前无报名人员`)
//             }
//         }


//     });
// }
exportObj.link = function(listid, moduleId, pk, vueData, itemValue) {
    // vueData.$router.push({
    //     path: `/newMeeting/topicsTab/${moduleId}/${pk}?tabType=1&topicFormId=220225153727YMbf1ZcpULIzftz186J`,
    //     query: {
    //         listId: '210607181937YJxUC5fve4y7q3SH5hJ',
    //         // method: 'checkInfo'
    //     }
    // })

    vueData.$router.push({
        path: `/commonForm/${moduleId}/${pk}?listId=2106211601159duvNrTl9jdgtRo0fSJ`
    })
}

export default exportObj;
