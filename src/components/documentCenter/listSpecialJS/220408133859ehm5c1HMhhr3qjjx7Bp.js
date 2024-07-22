const exportObj = {};

exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  vueData.$router.push({
    path: `/commonForm/${moduleId}/${pk}`,
    query: {
      formId: '220408133543J7AX47AehSXK2Gn1mSS',
      listId: '220408133859ehm5c1HMhhr3qjjx7Bp',
      method: 'edit',
      validateByList: 1
    }
  });
  // listId=220325190647yQ6mQJYbbIcmNQr0dv5&formId=220328101018ZuEOQk2kpXe4K01AaFk&method=edit&nodeId=11&mId=1804271601209XUy0mZV0m2aJE4XrTZ
}
exportObj.create = function (btn, vueData) {
  vueData.$router.push({
    path: '/commonform/180427160129OpjvceEWZTBZ3ftTG4C?method=newFile&listId=220408133859ehm5c1HMhhr3qjjx7Bp',
    query: {
      formId: '220408133543J7AX47AehSXK2Gn1mSS',
      title: '用户信息'
    }
  })
}
export default exportObj;
