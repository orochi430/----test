/* 值班要求审核表单 */
const exportObj = {};

exportObj.initHandle = function (formData, formStruct, vueData) {
  console.log("formData", formData);
  let userId = dsf.util.loadSessionStore("user").user_id;
  let name = dsf.util.loadSessionStore("user").name;
  let params = { pk: formStruct.parameters.pk, type: "yq", userId: userId, userName: name }
  dsf.http.post("fn/sx/schedule/addViewLog", params).then(res => {
    if (res.data.code == "200") {
      console.log('要情表单添加访问添加成功')
      // vueData.$bus.emit("emitYq");
    }
  });
}

exportObj.yaoqingshenhe = function (formData, formStruct, vueData) {
  vueData.saveNoTip(() => {
    dsf.http.post('fn/sx/schedule/makeYqStatus', {
      pk: vueData.pk,
      status: 1
    }).then(response => {
      let res = response.data
      if (res.code == '200') {
        dsf.layer.toast("审批通过", true, () => {
          vueData.backSucces()
        })
      }
    })
  })
}
exportObj.yaoqingyulan = function (formData, formStruct, vueData) {
  vueData.saveNoTip(() => {
    vueData.$router.push({
      path: `/commonForm/220303113130omuV4PLAr9v5Th2d34D/${vueData.pk}?formId=220504183312NCH3GC9G1jWqPmlaTBf&listId=220216130055y1ZVwKmTeaAyZyW7QeU&validateByList=1&method=saveAndView`
    })
  })
}

export default exportObj;
