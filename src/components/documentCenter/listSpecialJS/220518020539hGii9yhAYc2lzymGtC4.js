const exportObj = {};

exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  vueData.$router.push({
    path: `/commonForm/${moduleId}/${pk}`,
    query: {
      method: 'edit',
      listId: '220516215358qflS2YIo7ZgUbhqIBJM',
    }
  });
}

export default exportObj;