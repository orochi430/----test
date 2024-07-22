// 工资查询
const exportObj = {};
exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  vueData.$router.push({
    path: "/commonForm/210416161638UX0aXdXGy5dp1zxWd6M/" + itemValue["SALARY.A0001"],
    query: {
      listId: "210826094428UDZVD5rzJpgJ8RnDrM2",
      method: "showSalaryDetailFromMobile",
      validateByList: 1,
      title: '个人工资'
    }
  });
}
export default exportObj;
