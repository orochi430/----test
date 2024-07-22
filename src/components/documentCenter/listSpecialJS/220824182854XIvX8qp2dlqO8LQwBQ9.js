// import { JSONStringify } from "lib/tool";

//平台会务管理备忘录
const exportObj = {};
function add() {
    let meeting = dsf.util.loadSessionStore("meeting");
    return new Promise((resolve, reject) => {
        dsf.http.post("fn/conferenceMemorandum/addMemorandum", {
            meetingId: meeting.id
        }).done(res => {
            if (res.code != 200) {
                dsf.layer.toast(res.message);
            } else {
                resolve(res.data)
            }
        }).error(function (message) {
            dsf.layer.toast(message);
        })
    }) 
}
// 新增手写
exportObj.createRow = function(btn, vueData) {
    add().then(data => {
        vueData.$router.push({
            path: '/conference/memo',
            query: {
                fileId: data.id,
                isAdd: 1,
                type: 1
            }
        })
    })
}
// 新增文字
exportObj.createMemorandumText = function (btn, vueData) {
    add().then(data => {
        vueData.$router.push({
            path: '/conference/memo',
            query: {
                fileId: data.id,
                isAdd: 1,
                type: 2
            }
        })
    })
}
exportObj.link = function(listid, moduleId, pk, vueData, itemValue) {
    vueData.$router.push({
        path: '/conference/memo',
        query: {
            fileId: itemValue["A0001"],
            type: itemValue["C-HWXT-MEETING-MEMORANDUM-0002"] || '1'
        }
    })
}
export default exportObj;