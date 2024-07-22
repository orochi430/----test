// 陕西一体化 蓝信待办
(function () {
  const exportObj = {};
  exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
    dsf.http.post("fn/lxOperData/getInfoByAgencyNo", { agencyNo: itemValue.agencyNo }).then(({ data }) => {
      vueData.$router.push({
        path: `/commonForm/${data.data.moduleId}/${data.data.pk}`
      })
    })
  }
  window.spListJS = exportObj;
})()
