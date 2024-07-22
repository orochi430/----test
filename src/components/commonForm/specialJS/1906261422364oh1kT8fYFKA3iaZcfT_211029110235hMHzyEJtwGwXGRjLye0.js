/**
 * 远程发送按钮事件
 * formid:211029110235hMHzyEJtwGwXGRjLye0
 */
 import dsf from "../../../common";
 import util from "@/common/util";
 const exportObj = {};
 exportObj.initHandle = function (formData, formStruct, vueData) {
 }

  //等价于saveFilter <=> saveBefore
  exportObj.saveFilter = function (formData, formStruct, vueData) {
    return new Promise(function (resolve, reject) {
        resolve();
        //reject();;
    });
  }
  exportObj.remoteSendInfo=function(formData, metaData,  VueData) {
      //alert('调试中');
      let dataValue = {
        info_id: formData.main.A0001.value,
        // pnid: buttonParams.pnid,
        // wfId: buttonParams.wfId,
      }
      VueData.showPerson = true;
      VueData.dataValue = dataValue;
      //VueData.isTransfer = true;
      VueData.extra = {
        multiple: true,
        tabs: [{
          //action: `fn/user/select/data?types=department,org&rootObject=1&action=orgs&async=true&moduleId=${metaData.parameters.moduleId}`,
          action: `fn/oldDocumentExchangeController/getRemoteUserView?type=6&moduleId=${metaData.parameters.moduleId}`,
          name: "组织架构",
          subTabKey: "department"
      }]
      }
  }
  export default exportObj;