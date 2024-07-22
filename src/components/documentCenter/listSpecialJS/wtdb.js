//委托代办的特殊JS    2021年11月22日14:52:42@ly
const exportObj = {};
exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  vueData.$router.push({
    path: `/commonForm/${itemValue.moduleId}/${itemValue.infoId}`,
    query: {
      type: 'wtdb',
      todoId: itemValue.todoId,
      agencyType: itemValue.ttype,
      agencyUserId: itemValue.tuserId,
      agencyUserName: itemValue.tuserName
    }
  })
}
export default exportObj;
