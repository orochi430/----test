// 【山东烟草会务系统】消息发布
import dsf from "../../../common";

const exportObj = {};
exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  // dsf.http.post('/fn/sdycMeeting/messageRead', {
  //   msgId: pk
  // }).done(res => {
  //   if (res.type == "success") {
      let fid = vueData.$route.query.secQuery ? JSON.parse(vueData.$route.query.secQuery).fid : vueData.$route.query.fid;
      vueData.$router.push({
        path: `/commonForm/${moduleId}/${pk}`,
        query: {
          listId: listid,
          fid: fid
        }
      });
  //   } else {
  //     dsf.layer.toast("操作失败！");
  //   }
  // }).error(error => {
  //   console.log("messageRead-error", error)
  //   dsf.layer.toast("操作失败！");
  // }).always(() => { })
}
exportObj.createRow = function(btn, vueData) {
  let fid = vueData.$route.query.secQuery ? JSON.parse(vueData.$route.query.secQuery).fid : vueData.$route.query.fid;
  let moduleId = vueData.$route.params.moduleId || vueData.params.moduleId;
  vueData.$router.push({
    path: `/commonForm/${moduleId}`,
    query: {
      fid: fid
    }
  });
}
export default exportObj;
