/**
 * 督办立项
*/
import dsf from "../../../common";
import util from "@/common/util";
const exportObj = {};
exportObj.handle = function (newValur, oldValue, formData, formStruct, org, vueData) {
}

/***
 * 增加指定控件的必填项控制
 */
function addControlRequire(formStruct,requireMetaArray){
    formStruct.controls.forEach(n=>{
        if(requireMetaArray.findIndex((item)=>n.metaId==item)>-1){
            n.validator.required={};
        }
    });
 }
/***
 * 清除指定控件的必填项控制
 */
 function clearControlRequire(formStruct,metaId){
    formStruct.controls.forEach(n=>{
        if(n.metaId===metaId){
            let {required,...newObj} = n.validator;
            n.validator=newObj;
        }
    });

    console.log("formStruct.controls",formStruct.controls);
 }

exportObj.initHandle=function (formData, formStruct, vueData){
    //责任人 C-DB-0016
    console.log("init");
    //加载默认责任人电话；
    // formStruct.controls.forEach(n=>{
    //     if(n.metaId=="C-DB-0016"){
    //        let deftUserId=JSON.parse(n.defaultValue.value).value;
    //        getResponsibleMobile(formData,vueData,deftUserId);
    //         return;
    //     }
    // });
    reloadScheduledTask(formData,vueData,formStruct)
    vueData.$bus.on("inputRadio", function (busObj) {
        console.log("busObj.metaData",busObj.metaData);
        if(busObj.metaData.metaId==="C-DB-0081"){
            //当选“接收确认时”，则无须填写移交人；清除移交人的必填项
            clearControlRequire(formStruct,"2110081639190xTg4aaDTjavdhFWh0w");
            if(formData.main["C-DB-0081"].value=="5"){
                addControlRequire(formStruct,["2110081639190xTg4aaDTjavdhFWh0w"]);
            }else if(formData.main["C-DB-0081"].value=="1"){
                //其他选项，移交人就给一个默认追
                vueData.$set(vueData.formData.main,"2110081639190xTg4aaDTjavdhFWh0w",{value:"0"})
            }
            
        }
    });
    // vueData.$bus.on("selectUserBus", function(busObj){
    //     console.log("busObj.metaData",busObj.metaData);
    //     if(busObj.metaData.metaId==="C-DB-0016"){
    //         console.log("busObj",busObj);
    //         getResponsibleMobile(formData,vueData,busObj.value);
    //     }
    // });
}
exportObj.saveFilter = function (formData, formStruct, vueData, action) {
    return new Promise(function (resolve, reject) {
        resolve();
    });
}

//获取责任人电话
// function getResponsibleMobile(formData,vueData,id) {
//     dsf.http.post('/fn/superviseV6/approval/getResponsibleMobile',  {"userId": id}).then(res => {
//         if (res.data.code == 200) {
//             var responsibleMobile = res.data.data.responsibleMobile;
//             vueData.$set(formData.main, "C-DB-0022", {"value": responsibleMobile});
//         }
//     })
// }

//获取计划任务的labelText
function reloadScheduledTask(formData,vueData,formStruct) {
    //"fn/superviseV6/approvalTask/hasTasks"
    dsf.http.post("fn/superviseV6/approvalTask/getTaskByLeafRelationId", {"infoId": formStruct.parameters.pk}).then(res=> {
        let taskTitle="查看/新建任务计划";
        if (res.data.code == 200&&res.data.data&&res.data.data.taskTitle) {
            taskTitle=res.data.data.taskTitle;
            formStruct.parameters.taskId=res.data.data.taskId;
        }
        vueData.$set(formData.main, "fptpMjBzCrQswAYp", {"value": taskTitle});
    });
}

export default exportObj;

