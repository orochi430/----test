(function () {
  //陕西省委组织部 移动端工资管理列表点击事件 跳转方式控制
    const exportObj = {};
    exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
      dsf.http.post("ctrl/salaryImport/returnMobileFormData",{pk:pk}).then(res => {
        vueData.$router.push({
          path: `/commonForm/${moduleId}/${pk}`,
          query: {
            formId:res.data.data.formId,
            listId: listid
          }
        });
      }) 
    }
    //此处window下面的对象spListJS要和表单spJS的区分，不然列表加载以后再打开表单会被冲掉。
    window.spListJS = exportObj;
  })();