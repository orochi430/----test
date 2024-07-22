const exportObj = {}
exportObj.initHandle= function (formData, formStruct, VueData) {
    // 维修费控件和检测费控件属性联动
    VueData.$bus.on("inputRadio", function (busObj) {
        // 通过元数据编号获取检测费控件接口值
        let jcfObj = formStruct.controls.find(item => item.metaId === 'C-SMZC-WX-0016')
        if(busObj.metaData.metaId === 'C-SMZC-WX-0014') {
            if(busObj.value === '1') {
                 // 当维修费控件 value 为 1 （值为“有”） 时，检测费控件默认为“无”，且不可编辑
                 VueData.$set(VueData.formData.main, "C-SMZC-WX-0016", {
                    text: '无',
                    value: '2'
                  })
                jcfObj.privilege.editable = false
            } else if(busObj.value === '2') {
                // 当维修费控件 value 为 2 （值为“无”） 时，检测费控件可编辑
                VueData.$set(VueData.formData.main, "C-SMZC-WX-0016", {
                    text: '',
                    value: ''
                  })
                jcfObj.privilege.editable = true
            }
        }
    })
}
export default exportObj;