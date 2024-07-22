//西藏会议通知特殊列表开发 2022年6月24日 @ly
import { joinMeetBefore } from "@/components/project/xizangOffice/joinMeetBefore.js"
const exportObj = {};

exportObj.link = function (listid, moduleId, pk, VueData, itemValue) {
    console.log(itemValue)
    if (itemValue["meetingId"] == "未开始" || itemValue["meetingId"] == "进行中") {
        VueData.$parent.$parent.$parent.$refs["meetingDialog"].show({ number: itemValue["meetingroom"], pd: itemValue["password"], bt: itemValue["bt"] }).then((data) => {
            console.log(data)
            let param = {
                meetingNum: data.number,
                password: data.pd,
                micMute: data.checked,
                videoMute: data.checked1,
                title: data.bt
            }
            console.log(param)
            joinMeetBefore(param)
        });
    } else if (itemValue["meetingId"] == "已结束") {
        // dsf.layer.toast("当前会议已结束，暂时无法加入", false)    
        let postData = {
            meetingNumber: itemValue["meetingroom"],
            hykssjValue: itemValue["hykssjValue"],
            hyjssjValue: itemValue["hyjssjValue"]
        }
        dsf.http.post("fn/vedioMeeting/judgeVdeoList", postData).then((data) => {
            console.log(data)
            if (data.data.code != "200") {
                dsf.layer.toast("当前会议暂无可播放的视频", false)
            } else {
                VueData.$router.push({
                    path: '/commonList?fileType=hysp',
                    query: postData
                })
            }
        })
    }
    else {
        dsf.layer.toast("当前会议暂时无法加入", false)
    }
}

export default exportObj;
