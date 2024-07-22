// 【山东烟草会务系统】我的消息
import dsf from "../../../common";

const exportObj = {};
exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  dsf.http.post('/fn/sdycMeeting/messageRead', {
    msgId: pk
  }).done(res => {
    if (res.type == "success") {
      let fid = vueData.$route.query.secQuery ? JSON.parse(vueData.$route.query.secQuery).fid : vueData.$route.query.fid;
      vueData.$router.push({
        path: `/commonForm/${moduleId}/${pk}`,
        query: {
          listId: listid,
          fid: fid
        }
      });
    } else {
      dsf.layer.toast("操作失败！");
    }
  }).error(error => {
    console.log("messageRead-error", error)
    dsf.layer.toast("操作失败！");
  }).always(() => { })
}
export default exportObj;
