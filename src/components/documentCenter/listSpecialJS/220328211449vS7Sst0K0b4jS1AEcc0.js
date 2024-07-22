const exportObj = {};

exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  vueData.$router.push({
    path: `/commonForm/${moduleId}/${pk}`,
    query: {
      listId: '220325191056XEVJw5dwdulIvoK4EL2',
      formId: '220328101018ZuEOQk2kpXe4K01AaFk',
      method: 'edit',
      expiry: vueData.$route.query.expiry,
      title: '用户信息'
    }
  });
  // listId=220325190647yQ6mQJYbbIcmNQr0dv5&formId=220328101018ZuEOQk2kpXe4K01AaFk&method=edit&nodeId=11&mId=1804271601209XUy0mZV0m2aJE4XrTZ
}
exportObj.create = function (btn, vueData) {
  vueData.$router.push({
    path: '/commonform/180427160129OpjvceEWZTBZ3ftTG4C?method=newFile&listId=220325191056XEVJw5dwdulIvoK4EL2',
    query: {
      expiry: vueData.$route.query.expiry,
      specialSaveObj: JSON.stringify({unit_id: vueData.$route.query.pk}),
      title: '用户信息'
    }
  })
}
export default exportObj;
