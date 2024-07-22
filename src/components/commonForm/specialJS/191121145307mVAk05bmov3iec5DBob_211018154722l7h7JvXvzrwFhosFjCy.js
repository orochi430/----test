// 短信发送
import dsf from "../../../common";
import util from "@/common/util";
const exportObj = {};
exportObj.saveFilter = function (formData, formStruct, vueData, action) {
  return new Promise(function (resolve, reject) {
    resolve();
  })
}
exportObj.saveAfter = function (vueData, formData, formStruct) {
  dsf.layer.toast("发送成功！", true, function(){
    vueData.$router.go(-1);
  });
}

export default exportObj;