/**
 * 子任务督办立项
*/

const exportObj = {};
//获取责任人电话
function getResponsibleMobile(formData,vueData,id) {
    dsf.http.post('/fn/superviseV6/approval/getResponsibleMobile',  {"userId": id}).then(res => {
        if (res.data.code == 200) {
            var responsibleMobile = res.data.data.responsibleMobile;
            vueData.$set(formData.main, "C-DB-0022", {"value": responsibleMobile});
        }
    })
}

exportObj.initHandle = function (formData, formStruct, vueData){

    // 初始化立项人电话
    if (!formData.main['C-DB-0022'].value) {
        let id = formData.main['C-DB-0016'].value
        getResponsibleMobile(formData,vueData,id);
    }
    // 初始化督办状态
    if (!formData.main['C-DB-0054'] || !formData.main['C-DB-0054'].value) {
        vueData.$set(formData.main, 'C-DB-0054', {value: '1', text: '待确认'})
    }
    vueData.$bus.$off("selectUserBus").on("selectUserBus", function(busObj){
        console.log("busObj.metaData",busObj.metaData);
        if(busObj.metaData.metaId==="C-DB-0016"){
            //加载责任人电话；
            console.log("busObj",busObj);
            getResponsibleMobile(formData,vueData,busObj.value);
        }
    });
    
}

export default exportObj;