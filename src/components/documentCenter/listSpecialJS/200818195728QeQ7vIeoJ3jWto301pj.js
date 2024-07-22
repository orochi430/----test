const exportObj = {};
// 会议管理通知进查看节点
// exportObj.link = function(listid, moduleId, pk, vueData, itemValue) {
//     vueData.$router.push({
//         path: `/commonForm/${itemValue['A0004']}/${itemValue['A0001']}?listId=MeetingList&method=viewTz&validateByList=1`,
//     })
// }

exportObj.logicDeleteXForm = function(formData, VueData) { //删除---------------YY
    const logicDeleteXFormFn = params => dsf.http.post("fn/recycle/logic", params); //删除
    //获取当前formData的下标
    let index = VueData.data.findIndex(item => {
        return item.dataValue["A0001"] == formData.dataValue["A0001"]
    })
    var array = new Array();
    var param = {
        "pk": formData.dataValue["A0001"],
        "moduleId": VueData.moduleId
    };
    array.push(param);
    var data = {
        "data": JSON.stringify(array),
        "moduleId": VueData.moduleId
    };
    dsf.layer.confirm({
        message: '是否确认删除',
        confirmButtonText: '确认'
    }, () => {
        logicDeleteXFormFn(data).then((res) => {
            console.log(res)
            dsf.layer.toast(res.data.message);
            if (res.data.code == 200) {
                VueData.data.splice(index, 1)
            }
        })
    })
}


// exportObj.dataFilter = function(listData, vueData) {
//     console.log(listData);
//     listData.forEach(element => {
//         let str = element.dataValue["c-meetingtz-019"] + " ~ " + element.dataValue["c-meetingtz-020"].substr(10)
//         if (moment(new Date(element.dataValue["c-meetingtz-019"])).format("YYYYMMDD") != moment(new Date(element.dataValue["c-meetingtz-020"])).format("YYYYMMDD")) {
//             str = element.dataValue["c-meetingtz-019"] + " ~ " + element.dataValue["c-meetingtz-020"].substr(5)
//         }
//         vueData.$set(element.dataValue, "c-meetingtz-019", str)
//         if (element.dataValue['c-meetingtz-016.value'] == '1' && element.dataValue['C-MEETINGTZ-044.value'] != 0) {
//             if (element.dataValue['c-meetingtz-068.value']) {
//                 vueData.$set(element.dataValue, "c-meetingtz-010", `${element.dataValue['c-meetingtz-010']}\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0已报名人数(${element.dataValue['c-meetingtz-068.value']})`)
//             } else {
//                 vueData.$set(element.dataValue, "c-meetingtz-010", `${element.dataValue['c-meetingtz-010']}\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0当前无报名人员`)
//             }
//         }

//     });
// }

export default exportObj;
