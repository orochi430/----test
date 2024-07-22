//西藏 用车申请  用车人电话自动获取用车人员的电话
(function () {
    const exportObj = {};
    let now = dsf.date.format(new Date(), "yyyy-mm-dd hh:ii");
    exportObj.initHandle = function (formData, formStruct, vueData) {
          vueData.$bus.on('selectUserBus',function(busObj){
            dsf.http.post(`/fn/useCarApplyController/getUserMobile?userIds=${busObj.value}`).then(({data}) => {
                let tel=data.data
                formData.main["C-CARAPPLY-0012"].value = String(tel)
            console.log(tel);
                })
          })   
    }
    window.spJS = exportObj;
})();