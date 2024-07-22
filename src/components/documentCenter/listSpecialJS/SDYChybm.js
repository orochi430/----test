const exportObj = {};
exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  vueData.$router.push({
    path: `/commonForm/2103161044139ndn6tPM0bdSbwIdwMO/${pk}`,
    query: {
      formId: '220418151942nKCXHWhi1zKFnwKKiM0',
      listId: '210511165554balbxw4TwoCHhq2E4VE',
      method: 'viewList',
      ismobile: 1
    }
  });
}
export default exportObj;
