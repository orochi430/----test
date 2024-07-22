// 健康上报
import dsf from "../../../common";
import util from "@/common/util";
const exportObj = {};
exportObj.handle = function (formData, formStruct) {

    //根据表单数据变化，改变其他控件值
    /* if (formData.main["c-meetingtz-002"].text == "部级会议") {
        formData.main["c-meetingtz-006"].value = formData.main["c-meetingtz-002"].text;
    } */
}
exportObj.initHandle = function (formData, formStruct, vueData) {
  formStruct.controls.forEach((item,index)=>{
    if(item.metaId=="B0056"){
      console.log(item)
      item.show=true
      item.label=" "
      if (item.defaultValue.value.indexOf("民政易")!=-1) {
        item.defaultValue.value = `<p style="font-size:26px;margin-bottom:20px;text-align:center">"民政易"使用意见反馈</p>
          <p>为做好“民政易”平台运维保障，提供更好的使用体验，诚邀各位“民政易”用户反馈平台使用问题和意见建议，我们将根据您的反馈持续完善平台功能。谢谢！</p>`;
      } else {
        item.defaultValue.value = `<p style="font-size:26px;margin-bottom:20px;text-align:center">"赣政通"使用意见反馈</p>
          <p>为做好“赣政通”平台运维保障，提供更好的使用体验，诚邀各位“赣政通”用户反馈平台使用问题和意见建议，我们将根据您的反馈持续完善平台功能。谢谢！</p>`;
      }
      vueData.$set(vueData.formData.main, "B0056", {
          value: `<p style="font-size:26px;margin-bottom:20px;text-align:center">"${item.defaultValue.value.indexOf("民政易")!=-1?'民政易':'赣政通'}"使用意见反馈</p>
            <p style="font-size:16px;">为做好“${item.defaultValue.value.indexOf("民政易")!=-1?'民政易':'赣政通'}”平台运维保障，提供更好的使用体验，诚邀各位“${item.defaultValue.value.indexOf("民政易")!=-1?'民政易':'赣政通'}”用户反馈平台使用问题和意见建议，我们将根据您的反馈持续完善平台功能。谢谢！</p>`
        });
      // item.defaultValue.value=`<p style="font-size:26px;margin-bottom:20px;text-align:center">"赣政通"使用意见反馈</p>
      // <p>为做好“赣政通”平台运维保障，提供更好的使用体验，诚邀各位“赣政通”用户反馈平台使用问题和意见建议，我们将根据您的反馈持续完善平台功能。谢谢！</p>`
    }

  })
  // vueData.$set(vueData.formData.main,"B0056",{value:`<p style="font-size:26px;margin-bottom:20px;text-align:center">"赣政通"使用意见反馈</p>
  // <p style="font-size:16px;">为做好“赣政通”平台运维保障，提供更好的使用体验，诚邀各位“赣政通”用户反馈平台使用问题和意见建议，我们将根据您的反馈持续完善平台功能。谢谢！</p>`})
  
}

//保存后事件
exportObj.saveAfter=function(vueData,formData, formStruct ){
  dsf.layer.toast("感谢您提出的宝贵意见与建议")
    vueData.$router.go(-1)
}
exportObj.saveFilter = function (formData, formStruct, vueData,action) {
  function filterTime(time){
    var str=time.replace(/-/g,"/")
    return str
  }
  return new Promise(function(resolve,reject){
    resolve()
  })
  
}
export default exportObj;