const exportObj = {};

exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  vueData.$router.push({
    path: `/commonTabs/JGGL`,
    query: {
      moduleId: moduleId,
      pk: pk,
      method: 'edit',
      listId: '220325190647yQ6mQJYbbIcmNQr0dv5',
      expiry: itemValue['S-ORGANIZE-0096']
    }
  });
}
exportObj.create = function (btn, vueData) {
  vueData.$router.push('/commonform/1804271601209XUy0mZV0m2aJE4XrTZ/?method=newFile&listId=220325190647yQ6mQJYbbIcmNQr0dv5')
}
export default exportObj;
