const exportObj = {}
exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  vueData.$router.push({
    path: `/commonForm/${itemValue.moduleId}/${itemValue.id}`,
    query: {
      type: "yywj",
      distribId: 0,
      fdistribId: 0,
      realDistribId: itemValue.distribId
    }
  })
}
export default exportObj;
