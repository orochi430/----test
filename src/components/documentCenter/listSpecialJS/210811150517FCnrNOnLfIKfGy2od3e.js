const exportObj = {};

exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  vueData.$router.push({
    path: `/commonForm/${moduleId}/${pk}`,
    query: {
      listId: '210607181937YJxUC5fve4y7q3SH5hJ',
    //   formId: '220328101018ZuEOQk2kpXe4K01AaFk',
      method: 'checkInfo',
      validateByList: '1',
    }
  });
  // listId=220325190647yQ6mQJYbbIcmNQr0dv5&formId=220328101018ZuEOQk2kpXe4K01AaFk&method=edit&nodeId=11&mId=1804271601209XUy0mZV0m2aJE4XrTZ
}

export default exportObj;
