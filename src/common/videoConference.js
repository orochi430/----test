let toast = {};

// 会议获取用户id
function startWithConf(id) {
    dsf.http.post('fn/mobileToDo/getMeetingUsersByMeeting', {
        meetingtzId: id
    }).then((res) => {
        if (res.data.type === 'success' && res.data.data) {
            if (res.data.data.length > 0) {
                toast = {
                    msg: '发起成功',
                    type: true
                }
                start(res.data.data);
                return;
            }
            dsf.layer.toast('没有用户，无法开始视频会议', false);
        }
    }).catch((response) => {
        toast = {
            msg: '请求异常',
            type: false
        }
    }).finally((res) => {
        if (toast.msg) {
            dsf.layer.toast(toast.msg, toast.type)
        }
    })
}


// 公文 督办等获取id
function startWithForm(id) {
    dsf.http.post('fn/mobileToDo/getMeetingUsersByInfo', {
        infoId: id
    }).then((res) => {
        if (res.data.type === 'success' && res.data.data) {
            if (res.data.data.length > 0) {
                toast = {
                    msg: '发起成功',
                    type: true
                }
                start(res.data.data);
                return;
            }
            dsf.layer.toast('没有用户，无法开始视频会议', false);
        }
    }).catch((response) => {
        toast = {
            msg: '请求异常',
            type: false
        }
    }).finally((res) => {
        if (toast.msg) {
            dsf.layer.toast(toast.msg, toast.type)
        }
    })
}

// 会议2.0钉钉会议获取人员
// @param item: {pk: '', moduleId: ''}
function startWithConfNew(item) {
    dsf.http.post('/fn/meeting/getMeetingUserData', item).then((res) => {
        console.log(res);
        let str = []
        if (res.data.code === '200' && res.data.data) {
            if (res.data.data.length > 0) {
                toast = {
                    msg: '发起成功',
                    type: true
                }
                res.data.data.forEach((ele, index) => {
                    // if (index == 0) str += ele.foreignAccountId
                    // else str += ',' + ele.foreignAccountId
                    str.push(ele.foreignAccountId)
                });

                start(str);
                return;
            }
            dsf.layer.toast('没有用户，无法开始视频会议', false);
        }
    }).catch((response) => {
        toast = {
            msg: '请求异常',
            type: false
        }
    }).finally((res) => {
        if (toast.msg) {
            dsf.layer.toast(toast.msg, toast.type)
        }
    })
}

function start(ids) {
    dsf.dd.video({
        title: "视频会议",
        calleeCorpId: dsf.config.ddSetting.ddCoprId,
        calleeStaffIds: ids,
        // calleeStaffIds: ["100700055737858496", "015940255125013219"],
        onSuccess: function(res) {},
        onFail: function(e) {
            dsf.layer.toast('发起会议失败，存在未激活用户。', false);
        },
        success: function() {
            toast = {
                msg: '开始视频',
                type: false
            }
        }
    });
}

export default {
    startWithForm,
    startWithConf,
    startWithConfNew,
    start
}