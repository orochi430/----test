import dsf from "../../../common";

const exportObj = {};
exportObj.handle = function (formData, formStruct) {
    
}
exportObj.initHandle = function (formData, formStruct, vueData) {
 
  // 选择姓名时 填入部门
  vueData.$bus.on("selectUserBus", function(busObj) {
    if(busObj.metaData.metaId=="B0052"){ 
      console.log('--------------',busObj,formData, formStruct, vueData)
      // 单位内子表的编号
      let subFormKey = '210910024548j7u4JgX0TADg4E8skWX'
      // 填入部门
      formData.multinfos[subFormKey].rows[busObj.subFormIndex]['B0051'] = {
        schema: `5::${busObj.selectArr[0].attrs.deptId}`,
        value: busObj.selectArr[0].attrs.deptId, 
        text: busObj.selectArr[0].attrs.orgNameLV2Text || busObj.selectArr[0].attrs.orgNameLV1Text
      } // 部门
      
    }
    
  })
  
}
exportObj.saveFilter = function (formData, formStruct, vueData) {
  return new Promise(function(resolve,reject){
    try {
      resolve()
    } catch (error) {
      resolve()
    }
  })
}
export default exportObj;