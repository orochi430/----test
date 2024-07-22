//政务微信  调研活动选中牵头领导人 带出职位
(function (){
    const exportObj = {};
    exportObj.initHandle = function (formData, formStruct, vueData) {
        if(formStruct.parameters.nodeId == 0){
            vueData.$bus.on("selectUserBus", function (busObj) {
                if(busObj.metaData.metaId == "OA-DY-SURVEY-0002"){
                    let params ={
                        userId:busObj.value
                    }
                    dsf.http.post("ctrl/OaDySurvey/getUserInfo",params).then(({data})=>{
                        vueData.$set(formData.main,"B0036",{value:data.data.unitRankText})
                    })
                }
            })
        }
        
    }

    window.spJS = exportObj;
})()