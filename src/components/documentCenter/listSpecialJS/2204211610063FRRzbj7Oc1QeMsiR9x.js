import dsf from "../../../common";

const exportObj = {};
exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  vueData.$router.push({
    path: `/commonForm/${itemValue.A0004}/${itemValue.A0001}`,
    query: {
      formId: itemValue['220506114852Kkay88FqqdjjbhKWp0U'],
    }
  })
}
export default exportObj;
