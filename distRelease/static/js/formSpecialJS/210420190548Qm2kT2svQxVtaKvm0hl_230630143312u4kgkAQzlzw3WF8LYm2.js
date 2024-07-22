;(function () {
  const exportObj = {}
  exportObj.initHandle = function (formData, formStruct, vueData) {
    let bt= formData.main["B0001"].value;//获取标题
    let lwdw = formData.main["C-LW-0001"].value;//来文单位
    if(lwdw !=null && lwdw !="" && lwdw !=undefined){
        if(lwdw.match("国务院") || lwdw.match("中央") || lwdw.match("省")){
            vueData.$set(formData.main, "C-LW-0032",{"value":1,"text":"中央及其他省市阅件"});
        }
        if(lwdw.match("上海市")){
            vueData.$set(formData.main, "C-LW-0032",{"value":2,"text":"本市各部门阅件"});
        }
        if(lwdw.match("市发展改革委") || lwdw.match("市委") || lwdw.match("中共上海市委办公厅")){
            if(bt.match("任职") ||bt.match( "任免")|| bt.match("免职")){
                vueData.$set(formData.main, "C-LW-0032",{"value":3,"text":"市委阅件-人事任免"});
            }else{
                vueData.$set(formData.main, "C-LW-0032",{"value":4,"text":"市委阅件 - 其他文件"});
            }
        }
    }
    let fsdw = formStruct.controls.find(ctr => ctr.metaId == 'C-LW-0031')
    if ((!formData.main['C-LW-0031'] || !formData.main['C-LW-0031'].value) && (fsdw && !fsdw.privilege.editable)) {
      fsdw.show = false
    }
  }
  window.spJS = exportObj
})()
