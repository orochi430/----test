// 负责任务
const exportObj = {};
exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  vueData.$router.push({
    path: `/taskDetail/${pk}`
  });
}
exportObj.createRow = function (btn, vueData) {
  vueData.$router.push({
    path: `/addTask/null`
  });
}
export default exportObj;
