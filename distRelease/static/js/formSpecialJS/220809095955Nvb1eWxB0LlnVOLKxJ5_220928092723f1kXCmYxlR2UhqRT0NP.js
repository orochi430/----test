
/**
 * 台州市委党 签收表单功能
 * 签收功能
 */
(function () {
    const exportObj = {};
    exportObj.exchangeSign = function(formData, formStruct, vueData) {
        let documentId = {
            documentId: formData.main["A0003"].value
        }
        let Pkid = {
            documentId: formData.main["A0003"].value,
            id: vueData.formParams.pk
        }  
       dsf.http.post("ctrl/exchangeController/signDocumentById",documentId).then(({data})=>{
        if(data.type == "success"){
           // dsf.layer.toast("签收成功")  
            dsf.http.post("ctrl/exchangeController/getDocumentById",Pkid).then(({data})=>{
                if(data.type == "success"){
                    dsf.layer.toast("签收成功") 
                    let  moduleId = "190403161233waSI0ihTUuAWMCPGtWF"
                    vueData.$router.push({
                        path:`/commonForm/${moduleId}/${data.message}`
                    })
                }else{
                    vueData.$router.push({
                        path:`/commonTabs/SignFor`
                    })
                    dsf.layer.toast("获取公文失败")
                }
            })
        }else{
            dsf.layer.toast("签收失败")
        }

       })
    }

    window.spJS = exportObj;
})()