//西藏会议通知特殊列表开发 2022年6月24日 @ly
import { joinMeetBefore } from "@/components/project/xizangOffice/joinMeetBefore.js"
const exportObj = {};

exportObj.joinMeeting = function (itemValue, VueData) {
    console.log(itemValue)
    if (itemValue.dataValue["hytz.220613110549pDrUr42ZRZKnbEjEiUv"].length) {
        VueData.$refs["meetingDialog"].show({ number: itemValue.dataValue["hytz.220613110549pDrUr42ZRZKnbEjEiUv"], pd: itemValue.dataValue["hytz.2206131108027l3bKEiL5QBDwg1xWnZ"], bt: itemValue.dataValue["hytz.c-meetingtz-005"]}).then((data) => {
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
    } else {
        dsf.layer.toast("当前会议暂时无法加入", false)
    }
}

export default exportObj;
