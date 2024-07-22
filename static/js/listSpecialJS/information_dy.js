//山东东营 数据链接动态列表
(function (){
    const exportObj ={};
    exportObj.link = function (listid, moduleId, pk, vueData, itemValue){
        console.log(itemValue,'itemValue');
        if(itemValue.fileId){
            vueData.$router.push({
            path:`/iframe`,
                query:{
                    url:dsf.url.getServerUrl(`fn/office/openMobileOffice?fileId=${itemValue.fileId}&moduleId=${itemValue.moduleId}&x-auth-token=${dsf.util.loadSessionStore("loginToken")}`),
                    title: itemValue.bt
                }
            })
        }else{
            // 提示
            dsf.layer.toast("暂无附件!")
        }
    }

    exportObj.create = function(btn,vueData){
        vueData.$router.push({
            path:`/blogroll`
        })
    }

    window.spListJS = exportObj;
})()