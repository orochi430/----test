//委托代办的特殊JS    2021年11月22日14:52:42@ly
const exportObj = {};
exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  vueData.$router.push({
    path: `/commonForm/${itemValue.moduleId}/${itemValue.id}`,
    query: {
      type: 'yjcx',
      distribId: 0,
      fdistribId: 0,
      realDistribId: itemValue.distribId
    }
  })
}
export default exportObj;
