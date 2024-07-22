const exportObj = {};
exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  vueData.$router.push({
    path: `/iframe`,
    query: {
      url:  dsf.url.getServerUrl(`fn/office/openMobileOffice?fileId=${itemValue.fileId}&moduleId=${itemValue.moduleId}&x-auth-token=${dsf.util.loadSessionStore("loginToken")}`),
      title: itemValue.bt
    }
  })
}
export default exportObj;
