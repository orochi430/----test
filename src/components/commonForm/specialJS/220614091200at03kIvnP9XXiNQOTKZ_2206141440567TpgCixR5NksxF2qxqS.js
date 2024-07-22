// 【中共徐州市委党校迁建工程智慧校园平台软件】工作台-租户缴费模块

const exportObj = {}
// 点击保存或者发送时，标题字段需实时获取对应值并保存
exportObj.saveFilter = async function (formData, formStruct, vueData, action) {
  // 租户
    let dw = formData.main['C-ZHJF-0001'].value
    // 时间
    let time = formData.main['B0013'].value
    // 标题
    vueData.$set(vueData.formData.main, 'B0001', {value: dw + time})
    return new Promise(function(resolve,reject){
      resolve()
    })
  }

export default exportObj