// 【中共徐州市委党校迁建工程智慧校园平台软件】工作台-服务通知单模块
const exportObj = {}

exportObj.saveFilter = async function (formData, formStruct, vueData, action) {
    // 部门
    let dw = formData.main['B0011'].value
    // 拟搞时间
    let time = formData.main['B0013'].value
    // 标题
    vueData.$set(vueData.formData.main, 'B0001', {value: dw + time})
    return new Promise(function(resolve,reject){
      resolve()
    })
  }

export default exportObj