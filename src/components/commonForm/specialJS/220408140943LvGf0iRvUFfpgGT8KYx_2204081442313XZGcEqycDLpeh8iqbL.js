import dsf from "../../../common";
import { ImagePreview } from 'vant';
const exportObj = {};
 
exportObj.initHandle = function (formData, formStruct, vueData) {
  if (!vueData.pk) {
    vueData.$set(vueData.formData.main, "C-VISITOR-RGT-0010", {
      value: vueData.$route.query.fid
    })
  }
  if (vueData.$route.query.examineState == 0) {
    vueData.$set(vueData.formData.main, "C-VISITOR-RGT-0011", {
      value: vueData.$route.query.examineState,
      text: '待审核'
    })
    formStruct.buttons.mainButtons.find(item => item.name == '保存').name = '提交'
  }
  vueData.$bus.on("blurBus", function (vueObj) {
    console.log(vueObj)
    if (vueObj.metaData.metaId == "C-VISITOR-RGT-0005") {
      if (formData.main["C-VISITOR-RGT-0004"].value == 1) {
        let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
        if (!reg.test(vueObj.value)) {
          dsf.layer.toast('身份证号码不正确，请重新输入')
          vueData.$set(vueData.formData.main, "C-VISITOR-RGT-0005", {value: ''})
        }
      }
    }
  })
}
exportObj.saveFilter = function (formData, formStruct, vueData,action) {
  return new Promise(function(resolve,reject){
    if(action=="save"||action=="send"){
      if (formData.main["C-VISITOR-RGT-0004"].value == 1) {
        let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
        if (!reg.test(formData.main["C-VISITOR-RGT-0005"].value)) {
          reject("身份证号码不正确，请重新输入")
        }else{
          resolve()
        }
      }else {
        resolve()
      }
    }else{
      resolve()
    }
  })
}
exportObj.saveAfter = function (vueData, formStruct, formData) {
  if (vueData.$route.query.examineState == 0) {
    dsf.layer.toast('提交成功')
  } else {
    dsf.layer.toast('保存成功')
    vueData.backSucces()
  }
}
exportObj.generateCode = function (formData, formStruct, vueData) {
  console.log(vueData)
  dsf.http.post('ctrl/register/visitorCode',{
    fid: formData.main['C-VISITOR-RGT-0010'].value,
    checkItems: formData.main['A0001'].value,
  }).then(res => {
    if (res.data.data.length > 0) {
      dsf.http.Axios.get(dsf.url.getWebPath(res.data.data[0].path), {
        responseType: 'blob',
        headers: {
          'x-auth-token': dsf.util.loadSessionStore("loginToken")
        }
      }).then(response => {
        let blob = new Blob([response.data], {type: "image/jpeg"})
        let url = window.URL.createObjectURL(blob)
        ImagePreview([url]);
      })
    }
  })
}
export default exportObj;
