// 【山东烟草会务系统】现场消息
const exportObj = {};

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
