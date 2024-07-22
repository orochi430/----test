// import { JSONStringify } from "lib/tool";

//公司OA项目需求评审新建按钮
const exportObj = {};
exportObj.createRow = function(btn, vueData) {
    let meeting = dsf.util.loadSessionStore("meeting");
    // console.log('meeting', meeting);return;
    // console.log(dsf.url.getWebPath(`static/signatureMobile/mindex.html?fileId=fe7cf00e736a24786486226d83829ca9`))
    // location.href = dsf.url.getWebPath(`static/signatureMobile/mindex.html?fileId=fe7cf00e736a24786486226d83829ca9`);return;
    dsf.http.post("fn/newMobileMeetingPad/addMemo", {
        meetingId: meeting.id
    }).done(res => {
        if (res.code != 200) {
            dsf.layer.toast(res.message);
        } else {
            let url = `static/signatureMobile/mindex.html?fileId=${res.data.id}`;
            location.href = dsf.url.getWebPath(url);
        }
    }).error(function(message) {
        dsf.layer.toast(message);
    })
}
exportObj.link = function(listid, moduleId, pk, vueData, itemValue) {
    let url = `static/signatureMobile/mindex.html?fileId=${itemValue["A0001"]}`;
    location.href = dsf.url.getWebPath(url);
}
export default exportObj;