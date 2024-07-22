// 贵州党校OA议题填报
import dsf from "../../../common";
import util from "@/common/util";
const exportObj = {};
exportObj.handle = function (formData, formStruct) {

}
exportObj.saveAfter = function (vueData, formData, formStruct) {
  //vueData.$router.go(-1)
}


const user = dsf.util.loadSessionStore("user");
/**
 * 备忘录赋值
 */
function setMemorandumByUserId(formData, formStruct, vueData) {
  var bwlJSON = {};
  var bwlAll = formData.main["B0045"].value;
  if (bwlAll != "" && bwlAll != null) {
    bwlJSON = JSON.parse(decodeURI(bwlAll));

    vueData.$set(formData.main, "B0060", {
      value: bwlJSON[user.user_id]
    })
  }
}
exportObj.initHandle = function (formData, formStruct, vueData) {
  setMemorandumByUserId(formData, formStruct, vueData)
}

/**
 * 汇总备忘录
 */
function collectMemorandum(formData, formStruct, vueData) {
  var bwlJSON = {};
  //formData.main["c-meetingtz-002"].text
  var bwlAll = formData.main["B0045"].value;
  if (bwlAll != "" && bwlAll != null) {
    bwlJSON = JSON.parse(decodeURI(bwlAll));
  }

  var bwl = formData.main["B0060"].value;
  if (bwl != "" && bwl != null) {
    bwlJSON[user.user_id] = bwl;
  }
  vueData.$set(formData.main, "B0045", {
    value: encodeURI(JSON.stringify(bwlJSON))
  })
}

exportObj.saveFilter = function (formData, formStruct, vueData, action) {
  return new Promise(function (resolve, reject) {
    collectMemorandum(formData, formStruct, vueData)
    resolve()
  })

}
export default exportObj;
