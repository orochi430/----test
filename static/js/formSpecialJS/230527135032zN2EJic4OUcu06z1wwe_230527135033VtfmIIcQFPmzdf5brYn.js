// 政务微信 cz处理 表单必须保留一条子表  发送按钮时候必须有相关子表
(function (){
    const exportObj = {};
    exportObj.initHandle = function (formData, formStruct, vueData) {
       if(formStruct.parameters.nodeId == 0){
         vueData.$set(formData.main,"230527102336trrdA6tPhUuteE8qdo6",{value:vueData.$route.query.didian})
         vueData.$set(formData.main,"OA-DY-SURVEY-0005",{value:vueData.$route.query.oa0005})
         vueData.$set(formData.main,"B0001",{value:vueData.$route.query.b001})
         vueData.$set(formData.main, "OA-DY-SURVEY-0002", {value: vueData.$route.query.value,schema:vueData.$route.query.schema,text:vueData.$route.query.oa0002})
       }
      
       vueData.$bus.on("selectUserBus", function (busObj) {
        if(busObj.metaData.metaId == "OA-DY-SURVEY-0003"){
           let str = formStruct.controls.find(item => item.metaId == '230527140321mkhofXBsuHhwOH9NArR')
           if(str){
            //str.extra.tabs[0].action += `&customRoot=${busObj.value}`
            str.extra.tabs[0].action  = `fn/user/select/data?types=person&rootObject=3&action=self_dept&async=true&moduleId=230527135032zN2EJic4OUcu06z1wwe&customRoot=${busObj.value}`
           }
        }
       })
    }
   
    window.spJS = exportObj;
})()