//成都一体化 
/**
 * 列表控制显示progressControl
 */
(function () {
    const exportObj = {};

exportObj.initHandle = function (vueData) {
    vueData.showProgress = true;
    vueData.StartTime = 'B0013' //进度条起始时间
    vueData.EndTime = 'C-DB-0052' //进度条结束时间
    console.log(vueData);
    let FormType = vueData.$route.query
    console.log(FormType);

}
exportObj.dataFilter = function (listData, vueData) {
    debugger
    listData.forEach(element => {
        let buttons = element.buttons.commonButton

        let dbzrr = element.dataValue['C-DB-0016.value']
        let status = element.dataValue['C-DB-0054.value']
        let sourceUserId = element.dataValue['C-DB-0095.value']
        let userId = dsf.util.loadSessionStore("user").user_id
        let masterId = element.dataValue['C-DB-0086']
        let id = element.dataValue['A0001']
        let fid = element.dataValue['A0031']
        let feedbackSystem = element.dataValue['C-DB-0078.value']
        let flag = feedbackSystem === "2";
        let SUB_COUNT = element.dataValue['SUB_COUNT']

        // 待确认无反馈情况和接收情况
        if (status == "1") {
            element.buttons.commonButton.splice(0, element.buttons.commonButton.length)
            element.buttons.mainButtons.splice(0, element.buttons.mainButtons.length)
        }
        // 办结才能评价
        if (status != "5") {
            element.buttons.commonButton = element.buttons.commonButton.filter(item => item.action != 'pingJia')
        }
        if (flag) {
            element.buttons.mainButtons = element.buttons.mainButtons.filter(item => item.action != 'feedbackchak');
        }
        if ("2" != status && "4" != status) {
            //督办项目如果不是接收阶段，
            element.buttons.mainButtons = element.buttons.mainButtons.filter(item => !(['deptFeedback', 'feedback', 'dbtzChange', 'saveDBCB'].find(action => item.action == action)))
            element.buttons.commonButton = element.buttons.commonButton.filter(item => !(['deptFeedback', 'feedback', 'dbtzChange', 'saveDBCB'].find(action => item.action == action)))
            // output.find('li[lay-event="feedback"]').remove();
            // output.find('li[lay-event="deptFeedback"]').remove();
            // output.find('li[lay-event="urge"]').remove();
            // output.find('li[lay-event="defer"]').remove();
            // output.find('li[lay-event="end"]').remove();
            // output.find('li[lay-event="change"]').remove();
            // output.find('li[lay-event="changeScheduledTask"]').remove();
            // output.find('li[lay-event="addCBBM"]').remove();
            if (SUB_COUNT <= 0) {
                element.buttons.commonButton = element.buttons.commonButton.filter(item => !(['pingJia'].find(action => item.action == action)))
                //     output.find('li[lay-event="evaluate"]').remove();
            } else {
                if (dbzrr != userId) {
                    element.buttons.commonButton = element.buttons.commonButton.filter(item => !(['pingJia'].find(action => item.action == action)))
                    //         //评价
                    //         output.find('li[lay-event="evaluate"]').remove();
                }
            }
            if (dbzrr != userId || "5" != status) {
                element.buttons.mainButtons = element.buttons.mainButtons.filter(item => item.action != 'feedbackchak');
            }
        } else {
            //如果不是接收阶段
            if (id != masterId) {
                element.buttons.commonButton = element.buttons.commonButton.filter(item => !(['banJie', 'ApplyDelay', 'increaseChengBan', 'bianGengPlan'].find(action => item.action == action)))
                // //办结
                // output.find('li[lay-event="end"]').remove();
                // //延期
                // output.find('li[lay-event="defer"]').remove();
                // //
                // output.find('li[lay-event="changeScheduledTask"]').remove();
                // output.find('li[lay-event="addCBBM"]').remove();
            } else {
                element.buttons.mainButtons = element.buttons.mainButtons.filter(item => ['feedback'].find(action => item.action == action))
                element.buttons.mainButtons = element.buttons.mainButtons.filter(item => item.action != 'feedbackchak');
                element.buttons.commonButton = element.buttons.commonButton.filter(item => ['feedback', 'dbtzChange'].find(action => item.action == action))
                // //反馈
                // output.find('li[lay-event="feedback"]').remove();
                // //部门内反馈
                // output.find('li[lay-event="deptFeedback"]').remove();
                // //变更
                // output.find('li[lay-event="change"]').remove();
            }
            if (dbzrr != userId) {
                element.buttons.commonButton = element.buttons.commonButton.filter(item => !(['ApplyDelay'].find(action => item.action == action)))
                element.buttons.mainButtons = element.buttons.mainButtons.filter(item => item.action != 'feedbackchak');
                // //延期
                // output.find('li[lay-event="defer"]').remove();
                // //反馈
                // output.find('li[lay-event="feedback"]').remove();
                // //部门内反馈
                // output.find('li[lay-event="deptFeedback"]').remove();
            }
            //如果没有下级项目则不出现催办按钮
            if (SUB_COUNT <= 0) {
                // 催办
                if (dbzrr === userId) {
                    element.buttons.mainButtons = element.buttons.mainButtons.filter(item => !['fanKuiQingKuang'].find(action => item.action == action))
                    element.buttons.commonButton = element.buttons.commonButton.filter(item => !(['saveDBCB'].find(action => item.action == action)))
                    // output.find('li[lay-event="urge"]').remove();
                }
                //评价
                element.buttons.commonButton = element.buttons.commonButton.filter(item => !(['pingJia'].find(action => item.action == action)))
                // output.find('li[lay-event="evaluate"]').remove();
            } else {
                if (dbzrr != userId) {
                    element.buttons.commonButton = element.buttons.commonButton.filter(item => !(['saveDBCB', 'pingJia'].find(action => item.action == action)))
                    //评价
                    // output.find('li[lay-event="evaluate"]').remove();
                    //催办
                    // output.find('li[lay-event="urge"]').remove();
                }
            }
            if (id) {
                if (!flag) {
                    dsf.http.post("ctrl/superviseV6/approval/curFeedbackData", { infoId: id }).then(result => {
                        if ("success" === result.data.type) {
                            if (result.data.data && result.data.data.id) {
                                // output.find('li[lay-event="feedback"]').remove();
                                element.buttons.commonButton = element.buttons.commonButton.filter(item => item.action != 'feedback');
                            } else {
                                // output.find('li[lay-event="viewfeedback"]').remove();
                                element.buttons.mainButtons = element.buttons.mainButtons.filter(item => item.action != 'feedbackchak');
                            }
                        }
                    });
                }

            }
            if (fid) {
                dsf.http.post("ctrl/superviseV6/approval/getSuperviseInfo", { k: fid }).then(result => {
                    if ("success" === result.data.type && (result.data.data.allocationScheme === 5 || result.data.data.allocationScheme === 6)
                        && taskType == result.data.data.taskType) {
                        //fid的接收方式是部门内处理（5/6）且任务类型一致则是部门内反馈
                        element.buttons.commonButton = element.buttons.commonButton.filter(item => item.action != 'feedback');
                        element.buttons.mainButtons = element.buttons.mainButtons.filter(item => item.action != 'feedbackchak');
                        // output.find('li[lay-event="feedback"]').remove();
                    } else {
                        element.buttons.commonButton = element.buttons.commonButton.filter(item => item.action != 'deptFeedback')
                        // output.find('li[lay-event="deptFeedback"]').remove();
                    }
                });
            } else {
                element.buttons.commonButton = element.buttons.commonButton.filter(item => item.action != 'deptFeedback')
                // output.find('li[lay-event="deptFeedback"]').remove();
            }
        }
    })
}

    exportObj.feedbackchak = function (itemValue,  vueData) {
    dsf.http
        .post("ctrl/superviseV6/approval/curFeedbackData", {
            infoId: itemValue.dataValue["A0001"]
        })
        .then((res) => {

            if (res.data.type === "success") {
                if(res.data.data&&res.data.data.id){
                    vueData.$router.push({
                        path: "/commonForm/210608105939mkuTUSzHdhowHPHxlY8/" + res.data.data.id,
                        query:{
                            formId:"220802103654cprTKTvRBFsmW949iSq",
                        }
                    });
                }else{
                    dsf.layer.toast("无反馈记录");
                }
                
            } else {
                dsf.layer.toast(res.data.message);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    
}
    window.spListJS = exportObj;
}) ();
