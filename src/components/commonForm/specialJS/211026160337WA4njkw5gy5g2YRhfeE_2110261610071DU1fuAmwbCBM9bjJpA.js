import dsf from "../../../common";
import B64 from "@/common/base64";
// 来访人员
const exportObj = {};
let hasSaved = false;
let hasLeft = false;
exportObj.handle = function (formData, formStruct) {
    //根据表单数据变化，改变其他控件值
    /* if (formData.main["c-meetingtz-002"].text == "部级会议") {
        formData.main["c-meetingtz-006"].value = formData.main["c-meetingtz-002"].text;
    } */
}
exportObj.initHandle = function (formData, formStruct, vueData) {
    // 来访日期只能提前2天
    formStruct.controls.find(item=>item.metaId=="C-RBS-VISITOR-005").extra.minDate = new Date();
    formStruct.controls.find(item=>item.metaId=="C-RBS-VISITOR-005").extra.maxDate = dsf.date.addDate(new Date(), 2);

    let paras = vueData.$route.query.paras;
    if(paras){
        paras = JSON.parse(B64.decode(decodeURIComponent(vueData.$route.query.paras)));
        formStruct.controls.forEach((item, index, array) => {
            // 接待单位
            if(item.metaId=='C-RBS-VISITOR-011'){
                // item.defaultValue.value = JSON.stringify({text:decodeURI(paras.deptName),value:paras.deptId,schema:`5::${paras.deptId}`});
                item.defaultValue.value = paras.deptId;
                item.defaultValue.text = decodeURI(paras.deptName);
                item.defaultValue.schema = `5::${paras.deptId}`;
            }
            // 接待人
            if(item.metaId=='C-RBS-VISITOR-012'){
                // item.defaultValue.value = JSON.stringify({text:decodeURI(paras.userName),value:paras.userId,schema:`1::${paras.userId}`});
                item.defaultValue.value = paras.userId;
                item.defaultValue.text = decodeURI(paras.userName);
                item.defaultValue.schema = `1::${paras.userId}`;
            }
            // 座机
            if(item.metaId=='C-RBS-VISITOR-013'){
                item.defaultValue.value = paras.tel;
            }
        })
    }
}
exportObj.saveFilter = function(formData, formStruct, vueData, action) {
	return new Promise(function(resolve, reject) {
		try {
			if(action=="save"||action=="send"){
                // 标题
                if(formData.main["B0001"] 
                && formData.main["C-RBS-VISITOR-006"] 
                && formData.main["C-RBS-VISITOR-001"]
                && !formData.main["B0001"].value){
                    formData.main["B0001"].value = `关于${formData.main["C-RBS-VISITOR-006"].value}${formData.main["C-RBS-VISITOR-001"].value}的来访信息`;
                }
                // 是否确认
                if(formData.main["C-RBS-VISITOR-017"] && !formData.main["C-RBS-VISITOR-017"].value){
                    formData.main["C-RBS-VISITOR-017"].value = "-1";
                    formData.main["C-RBS-VISITOR-017"].text = "未确认";
                }
                // 是否开车
                if(formData.main["C-RBS-VISITOR-009"] 
                && formData.main["C-RBS-VISITOR-009"].value == "1"
                && formData.main["C-RBS-VISITOR-010"]
                && !formData.main["C-RBS-VISITOR-010"].value){
                    reject("车牌号不能为空！");
                }else{
                    resolve();
                }
            }else{
              resolve();
            }
		} catch (error) {
			resolve();
		}
	})
}
//保存后事件
exportObj.saveAfter = function(vueData, formData, formStruct) {
    hasSaved = true;
}
exportObj.leaveHandle = function(formData, formStruct, vueData, routeObj) {
    console.log(formStruct.parameters)
    if(!hasLeft && hasSaved && formStruct.parameters.nodeId == "0"){
        hasLeft = true;
        // vueData.$router.push({
        //     name: "PeopleDailyVisitAuthCode",
        //     params:{
        //         code: formData.main.B0001.value
        //     }
        // });
        routeObj.next(`/PeopleDaily/VisitAuthCode/${formData.main.B0001.value}`)
    }
}
export default exportObj;