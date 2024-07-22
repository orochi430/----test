// 民政部已发公文表单
(function () {
  const exportObj = {};

  exportObj.goSignList = function (formData, formStruct, vueData) {
    let moduleId="190316150842gGFeRKU0VtkcDlBltcJ"
    let pk=formData.main["A0001"].value
    let listId="210616104247fcvqNedc4sdDShWqcGz"
    vueData.$router.push({
      path:`/commonList/${listId}/${moduleId}`,
      query:{secQuery:JSON.stringify({fid:pk}),notLink:1}
  })
  }

  window.spJS = exportObj;
})();
