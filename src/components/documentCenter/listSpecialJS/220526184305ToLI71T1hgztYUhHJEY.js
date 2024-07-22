//值班要情审核列表JS

const exportObj = {};
exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  vueData.$router.push({
    path: `/commonForm/220303113130omuV4PLAr9v5Th2d34D/${itemValue["XZBYQ_0016.A0001"]}`,
    query: {
      formId: "220503152120YgXPzWyiK3LK1WN8WLo",
      listId: "220216130055y1ZVwKmTeaAyZyW7QeU",
      validateByList: 1,
      method:"edit",
      title:"要情审核"
    }
  })
}
export default exportObj;
