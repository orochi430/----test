import dsf from "../../../common";
// 【民政部信创项目】应急处置移动端开发---拟稿自动带出值班员和带班领导人员信息
const exportObj = {};
exportObj.initHandle = function (formData, formStruct, vueData) {
    let nodeId = formStruct.parameters.nodeId;
    if(nodeId == "0"){
        let url = "ctrl/nwYjsj/getNowZbry";
       dsf.http.post(url, null).then(function (result) {
            if ("success" == result.data.type) {
                let data = result.data.data;
                let flag = data.flag;
                if(flag){
                    //带班领导
                    // DSF.setElementValueByKey("C-LEAVE-0025",{value:data.dbldText});
                    vueData.$set(formData.main,'C-LEAVE-0025',{
                        value:data.dbldText
                    })
                    //值班人
                    // DSF.setElementValueByKey("C-LEAVE-0027",{value:data.zbrText});
                    vueData.$set(formData.main,'C-LEAVE-0027',{
                        value:data.zbrText
                    })
                }
            }
        });
    }
}
export default exportObj