import dsf from "../../../common";

const exportObj = {};

exportObj.init = function (vueData) {
  vueData.paramsData = {
    'query_S-API-LOG-0001': `${dsf.date.format(new Date(), 'yyyy-mm-dd')} - ${dsf.date.format(new Date(), 'yyyy-mm-dd')}`
  }
}
exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  let secQuery = {
    operateId: itemValue['S-BASE-0003'],
    'query_S-API-LOG-0001': vueData.paramsData['query_S-API-LOG-0001']
  }
  vueData.$router.push({
    path: '/commonList/2203201536267aWr3w6S080rMhWfuZP/220318112117wJNhpmh1Q3QEyNdHat5',
    query: {
      secQuery: JSON.stringify(secQuery)
    }
  })
}
export default exportObj;
