const exportObj = {};
exportObj.initHandle = function (formData, formStruct, vueData) {
  if(formStruct.parameters.nodeId == '9W5hNN5LfYN1EKe') {
      //主办处室
      let zbcs = formData.main['C-LW-0002'].text
      //会办处室
      let hbcs = formData.main['C-LW-0003'].text
      //审阅领导
      let syld = formData.main['C-LW-0031'].text
      let text = "";
      zbcs = zbcs.replace(/,/g,"、");
      hbcs = hbcs.replace(/,/g,"、");
      let names = ""
      if ("" != syld) {
          let sylds = syld.split(',');
          for (let i = 0; i < sylds.length; i++) {
              let name = sylds[i];
              let shortName = name.substr(name.length - 2, name.length);
              names += shortName + "、";
          }
          names = names.substr(0, names.length - 1);
      }
      function officeOpinion(zbcs,hbcs,syld,names,text) {
        //主办处室
        if ("" != zbcs){
            text = "拟请" + zbcs + "办理;";
        }
        //会办处室
        if ("" != hbcs){
            text = "拟请" + hbcs + "办理;";
        }
        //审阅领导
        if ("" != syld){
            text = "请" + names + "同志阅示。";
        }
        //主办处室和会办处室
        if ("" != zbcs && "" != hbcs){
            text = "拟请" + zbcs + "会 " + hbcs + "办理;";
        }
        //主办处室和审阅领导
        if ("" != zbcs && "" != syld){
            text = "拟请" + zbcs  + "办理。请" + names + "同志阅示。";
        }
        //会办处室和审阅领导
        if ("" != hbcs && "" != syld){
            text = "拟请" + hbcs  + "办理。请" + names + "同志阅示。";
        }
        //主办、会办、审阅
        if ("" != zbcs && "" != hbcs && "" != syld){
            text = "拟请" + zbcs + " 会" + hbcs + "办理。请" + names + "同志阅示。";
        }
        return text;
    }
    let opinionCtrl = formStruct.controls.find(item => item.metaId == 'opinionFiles')
    opinionCtrl.extra.opinionContent = officeOpinion(zbcs,hbcs,syld,names,text);
  }
}
exportObj.fenYue = function (formData, formStruct, vueData) {
  let shareRead = async function () {
    let defaultSelectArray = []
    await dsf.http.post('/ctrl/waitReadController/getSelectLeadPerson', {infoId: formStruct.parameters.pk}).then(res => {
      if(res.data.code == 200) {
        let idArray = res.data.data.ids.split(',')
        let nameArray = res.data.data.text.split(',')
        for(let i = 0; i < idArray.length; i++) {
          if(idArray[i]) {
            defaultSelectArray.push({
              name: nameArray[i].split('-')[1],
              showName: nameArray[i].split('-')[1],
              id: idArray[i].split('-')[1],
              pid: idArray[i].split('-')[0],
              type: '1',
              checked: true,
              attrs: {
                orgNameLV2Text: nameArray[i].split('-')[0],
                deptId: idArray[i].split('-')[0],
              }
            })
          }
        }
      }
    })
    vueData.showSeparate = true
    let data = {
      info_id: formData.main.A0001.value
    }
    vueData.$nextTick(() => {
      vueData.$refs.readPop.show(data, defaultSelectArray)
        .then(() => {
          vueData.$toast.clear()
          dsf.layer.confirm({
            message: '是否发送文件',
            confirmButtonText: '确认'
          }, () => {
            vueData.buttonHandle['send'](
              vueData.$route.params,
              vueData.formMeta,
              vueData.formData,
              vueData,
              vueData.$refs
            )
          })
        }, msg => {
        })
    })
  }
  vueData.buttonHandle['save'](
    vueData.$route.params,
    vueData.formMeta,
    vueData.formData,
    vueData,
    vueData.$refs,
    shareRead
  )
}
export default exportObj;