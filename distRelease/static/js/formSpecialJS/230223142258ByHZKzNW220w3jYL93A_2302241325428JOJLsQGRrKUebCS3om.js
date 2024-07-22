/**
 * 古蔺县委党校
 * 人员转正计算分数总和
 */
(function (){
    const exportObj = {};
    exportObj.initHandle = function(formData,formStruct,vueData){
        let total = 0
        function totalNumber(){
         total = Number(formData.main["4nyR6ZMqF0qoV7TD"].value)+Number(formData.main["HYypyYGor7e9ybi4"].value)+
                 Number(formData.main["I0dqmLK3A1tMvjTF"].value)+Number(formData.main["ICgY3CdwzMdy0eIe"].value)+
                 Number(formData.main["uS2qE9DcBLNtEn0j"].value)
        }
        vueData.$bus.on("inputRadio",function (busObj){
            totalNumber()
            vueData.formData.main["B0020"].value = total
        })
    }

    window.spJS = exportObj;
})()