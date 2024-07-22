/**
 * 一体化办公厅 接待日报
 */
 (function(){
    const exportObj = {};
    exportObj.initHandle = function(formData,formStruct,vueData){
        $(".form-title").css("textAlign","center")
        $("input[name='B0013']").css("textAlign","right")
    }
    //导出
    window.spJS = exportObj;
})()
