// 【中共徐州市委党校迁建工程智慧校园平台软件】工作台-每日食材 模块

const exportObj = {};

exportObj.initHandle = async function (formData, formStruct, vueData) {
  function setTotal() {
    let total = 0
    vueData.formData.multinfos['220523104359VBUfaJfbR0YqKkeNRhu'].rows.forEach(item => {
      total += Number(item["C-QT-CUSTOM-0004"].value) * Number(item["C-QT-CUSTOM-0001"].value)
    })
    vueData.$set(vueData.formData.main["C-MHQBZ-001"], "value", String(total))
  }
  vueData.$bus.on("blurBus", function(busObj) {
    console.log(busObj)
    if (busObj.subFormId == '220523104359VBUfaJfbR0YqKkeNRhu') {
      if (busObj.metaData.metaId == "C-QT-CUSTOM-0004" || busObj.metaData.metaId == "C-QT-CUSTOM-0001") { // 标准间总价
        setTotal()
      } 
    }
	})
  vueData.$bus.on("subFormDelete", function (busObj) {
    setTotal()
  })
}
// 点击保存或者发送时，标题字段需实时获取对应值并保存
exportObj.saveFilter = async function (formData, formStruct, vueData, action) {
  // 拟稿人
  let dw = formData.main['C-MHQBZ-002'].value
  // 时间
  let time = formData.main['B0013'].value
  // 标题
  vueData.$set(vueData.formData.main, 'B0001', {value: dw + time})
  return new Promise(function(resolve,reject){
    resolve()
  })
}
export default exportObj;
