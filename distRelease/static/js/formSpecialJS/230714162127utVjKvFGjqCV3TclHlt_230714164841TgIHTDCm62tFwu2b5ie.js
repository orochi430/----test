/**
 * 一体化办公厅 接待日报
 */
(function(){

    const exportObj = {};

    exportObj.initHandle = function(formData,formStruct,vueData){
      if (formStruct.parameters.nodeId == 0) {
        let time = moment().format('M月D日（dddd）')
        vueData.$set(formData.main, 'B0001', {value: '接待信息日报表' + time})
      }
    }
    //导出
    window.spJS = exportObj;
})()
