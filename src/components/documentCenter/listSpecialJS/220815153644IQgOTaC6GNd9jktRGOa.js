/**
 * 业务模块-地产集团-项目-项目编辑
 * 操作记录模块
 * 
 */
 const exportObj = {};

 exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  vueData.$router.push({
    name: "commonForm",
    params: {
      moduleId: moduleId,
      pk: pk
    },
    query:{
      formId: "220815153643l3OazHL9qgEwrzLoVDH",
      fid:vueData.params.fid,
      listId :"220815153644IQgOTaC6GNd9jktRGOa",
      validateByList:1
    }

  });
}
 exportObj.createRow = function (btn, vueData) {
    vueData.$router.push({
      name: "commonForm",
      params: {
        moduleId: "220815153643et5dnNi9Dfqeh9UitKI"
      },
      query: {
        formId: "220815153643l3OazHL9qgEwrzLoVDH",
        fid:vueData.params.params.fid
      }
    })
  }
  export default exportObj;