//值班要情审核列表JS

const exportObj = {};
exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  let params={pk:itemValue["A0001"],type:"yq"}
  dsf.http.post("fn/sx/schedule/makeRead", params).then(res => {
      if (res.data.code == "200"){
        
      }
  });
  vueData.$router.push({
    path: `/commonForm/220303113130omuV4PLAr9v5Th2d34D/${itemValue["A0001"]}`,
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
