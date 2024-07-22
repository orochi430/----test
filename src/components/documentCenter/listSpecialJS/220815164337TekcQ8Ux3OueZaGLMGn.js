// 皖政通 考勤打卡/申请记录

const exportObj = {};
exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  vueData.$router.push({
    path: `/commonForm/${moduleId}/${pk}`,
    query: {
      method: "jump",
      listId: "220815164337TekcQ8Ux3OueZaGLMGn"
    }
  });
}
export default exportObj;
