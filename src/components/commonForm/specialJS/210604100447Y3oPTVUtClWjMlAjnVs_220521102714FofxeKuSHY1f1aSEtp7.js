//sund测试表单
const exportObj = {};

exportObj.initHandle = async function (formData, formStruct, vueData) {

  vueData.$bus.on("inputRadio", function (vueObj) {
    if (vueObj.metaData.metaId == "B0006") {
      if (vueObj.text == "普通") {
        formStruct.subform["220228140428i4UAUjqQFmJ1pQxNx16"].controls.find(item => item.metaId == "B0007").privilege.editable = false
      } else {
        formStruct.subform["220228140428i4UAUjqQFmJ1pQxNx16"].controls.find(item => item.metaId == "B0007").privilege.editable = true
      }
    }
  })
  
  vueData.$nextTick(()=>{
    if (!vueData.allFile.length) {
      formStruct.controls.find(item=>item.controlId=="yEs77mcJsFcJ5UqT").show=false
      formStruct.controls.find(item=>item.controlId=="EMundz5kuosjhcUS").show=false
      formStruct.controls.find(item=>item.controlId=="ax6N80WYZFLJcbs7").show=false
    }
  })
}

export default exportObj;
