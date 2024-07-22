// 【中共徐州市委党校迁建工程智慧校园平台软件】移动端——外培班报销
const exportObj = {};

exportObj.initHandle = function (formData, formStruct, vueData) {
  // 数字转中文大写
  vueData.$bus.on("blurBus", function (busObj) {
    if (busObj.metaData.metaId == "OA-BXAPPLY-0029" && !isNaN(Number(busObj.value))) {
      vueData.$set(formData.main, 'OA-BXAPPLY-0022', {value: dsf.util.amountWords(Number(busObj.value))})
    }
    if (busObj.metaData.metaId == "OA-BXAPPLY-0030" && !isNaN(Number(busObj.value))) {
      vueData.$set(formData.main, 'OA-BXAPPLY-0020', {value: dsf.util.amountWords(Number(busObj.value))})
    }
  });
  // 餐费附件与住宿附件可以根据表单内的是否有住宿费、是否有餐费显示或隐藏
  // @fangpang 2022-07-18
  function changeShow (busObj,name){
      vueData.allFile.forEach((item)=>{
        if(item.name ===  name){
          busObj.value == "1" ? item.canShow = "1" : item.canShow = "-1"
        }
      })
  }
  vueData.$bus.on("inputRadio",function (busObj){
    console.log(busObj);
    if(busObj.metaData.metaId === "B0057"){
      changeShow(busObj,"餐费附件")
    }
    if(busObj.metaData.metaId === "B0055"){
      changeShow(busObj,"住宿附件")
    }
  })
}
export default exportObj;