// 平台我的会议列表（会中切换）
const exportObj = {};
exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  vueData.$router.replace({
    path: '/conferenceIndex',
    query: {
      id: itemValue.id
    }
  })
}
export default exportObj;