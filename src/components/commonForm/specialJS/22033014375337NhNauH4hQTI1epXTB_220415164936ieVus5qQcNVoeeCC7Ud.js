import { Field } from "vant";

const exportObj = {};

exportObj.initHandle = function (formData, formStruct, vueData) {
  
 
//意见显示居中
var opinionText = document.querySelectorAll("div.opinionText")
//   console.log(opinionText[0].style.textAlign)
for(let i=0;i<opinionText.length;i++){
    opinionText[i].style.textAlign = "center"
}

//离临，外出地点，因公显示居中
var vanfiled = document.querySelectorAll("span.van-field__control")
for(let i=3;i<vanfiled.length;i++){
    vanfiled[i].style.textAlign = "center"
}


//外出事由显示居中
var tavanfiled = document.querySelectorAll("textarea.van-field__control")
console.log(tavanfiled)
    tavanfiled[0].style.setProperty('text-align', 'center', 'important')
    tavanfiled[1].style.setProperty('text-align', 'center', 'important')

};
export default exportObj;
