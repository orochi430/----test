// 会议通知表单查看议题tab
const exportObj = {};
exportObj.beforeInitAsync = async function (formData, formStruct, vueData) {
    await getTopics(formData, formStruct, vueData);
    await getState(formData, formStruct, vueData);
}

// 跳转会议议题tab
async function getTopics(formData, formStruct, vueData) {
    if (dsf.config.meetingConfig && dsf.config.meetingConfig.enableTopicTab && vueData.$route.name != 'topicsTab') {
        await dsf.http
            .post(`fn/meetingApply/getSqData`, {
                pk: vueData.$route.params.pk,
                moduleId: vueData.$route.params.moduleId
            })
            .done(res => {
                //console.log(res);
                if (res.type == "success") { // 已关联会议申请，显示议题tab
                    vueData.$router.replace({
                        path: `/newMeeting/topicsTab/${vueData.$route.params.moduleId}/${vueData.$route.params.pk}?tabType=0&topicFormId=220225153727YMbf1ZcpULIzftz186J`,
                        query: vueData.$route.query
                    })
                }
            })
            .error(error => {
                // self.errored = true;
                console.log("getSqData-error", error);
                // dsf.layer.toast("数据获取失败！");
            })
    }
}

// 获取会议通知状态
async function getState(formData, formStruct, vueData) {
    await dsf.http
        .post(`fn/meetingNotice/getState`, {
            pk: vueData.$route.params.pk,
            isToDo: vueData.$route.query.todoId ? true : false
        })
        .done(res => {
            // console.log("getState", res);
            if (res.type == "success") {
                if (res.message != "未报名") {
                    formStruct.buttons.commonButtons.splice(0, formStruct.buttons.commonButtons.length);
                    formStruct.buttons.mainButtons.splice(0, formStruct.buttons.mainButtons.length, getMyBtn(res.message, vueData));
                }
            }
        })
        .error(error => {
            // self.errored = true;
            console.log("getState-error", error);
            // dsf.layer.toast("数据获取失败！");
        })
}

function getMyBtn(msg, vueData) {
    let btn = {};
    if (msg == "已报名" || msg.includes("已委托")) {
        btn = {
            action: "",
            icon: "passed",
            name: msg,
            type: "success",
            disabled: true
        }
    } else if (msg == "已请假") {
        btn = {
            action: "",
            icon: "passed",
            name: msg,
            type: "warning",
            disabled: true
        }
    } else if (msg == "无需报名" || msg == "被委托") {
        if (vueData.$route.query.todoId) {
            btn = {
                action: "send",
                icon: "",
                name: "办结"
            }
        } else {
            btn = {
                action: "",
                icon: "passed",
                name: "已报名",
                type: "success",
                disabled: true
            }
        }
    }
    return btn;
}

exportObj.initHandle = async function (formData, formStruct, vueData) {
    vueData.$nextTick(() => {
        if (!vueData.allFile.length) {
            formStruct.controls.find(item => item.controlId == "PEPgf9FgnawHUyi4").show = false
            formStruct.controls.find(item => item.controlId == "d86X4vlqMOLVPXhd").show = false
            formStruct.controls.find(item => item.controlId == "gVKd6REjMgQwMcQt").show = false
        }
    })
}

// [赣政通]会议通知，返回拟稿人节点，下发通知
exportObj.sendAfter = function (formData, formStruct, vueData) {
    if (formStruct.parameters.nodeId == "AE7dU7Wz5RQPyO5") { //返回拟稿人节点
        dsf.http
            .post("fn/meetingNotice/issueNotice", { pk: formStruct.parameters.pk, moduleId: formStruct.parameters.moduleId })
            .done(res => {
                if (res.type == "success") {
                    // dsf.layer.toast("操作成功", true, () => vueData.backSucces());
                } else {
                    dsf.layer.toast(res.message, false);
                }
            });
    }
};

export default exportObj;