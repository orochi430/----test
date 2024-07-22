/**
 * 业务模块-地产集团-项目-项目信息
 * 操作记录模块（模块ID：220518105358gKONpNnVhEnL8SEgmIz）的列表（列表ID：220518140457O2Yb4RJrnHSkzIweQQc）
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
      formId: "220518105832EIpEuEiTaV2U01Uvrb2",
      fid:vueData.params.fid,
      listId :"220518140457O2Yb4RJrnHSkzIweQQc",
      validateByList:1
    }

  });
}
 exportObj.createRow = function (btn, vueData) {
    vueData.$router.push({
      name: "commonForm",
      params: {
        moduleId: "220518105358gKONpNnVhEnL8SEgmIz"
      },
      query: {
        formId: "220518105832EIpEuEiTaV2U01Uvrb2",
        fid:vueData.params.params.fid
      }
    })
  }
  export default exportObj;