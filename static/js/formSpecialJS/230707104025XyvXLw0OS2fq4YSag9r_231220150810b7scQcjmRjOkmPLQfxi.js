// 单位领导日程 新版
(function (){
  const exportObj = {};
  let last_C_LDRC_0001 = ''
  let timeConfig = [];
    function showConfig(){
      dsf.http.post("fn/leader/getTemplateConfig", {}).then(res => {
          if (res.data.code === "200" && res.data.data){
            timeConfig = res.data.data
          }
      });
    }
    exportObj.initHandle = function (formData, formStruct, vueData) {
      showConfig()
      vueData.$bus.on("checkVal", function (busObj) {
        if (busObj.metaData.metaId == "C-LDRC-0003") {
          let config = timeConfig.find(item => item.name == busObj.text)
          if (config) {
            vueData.$set(formData.multinfos['230707112047UreAxpVnigxfURKHkZi'].rows[busObj.subFormIndex], 'C-LDRC-0002', {value: `${config.currentDay}${config.startTime}`})
            vueData.$set(formData.multinfos['230707112047UreAxpVnigxfURKHkZi'].rows[busObj.subFormIndex], 'C-LDRC-0008', {value: `${config.currentDay}${config.endTime}`})
          }
        } else if (busObj.metaData.metaId == "C-LDRC-0001" && busObj.metaData.enumData.find(item => item.value == 'all')) {
          if (last_C_LDRC_0001.split(',').length !== busObj.metaData.enumData.length && busObj.value.split(',').pop() == 'all') {
            let obj = {
              value: busObj.metaData.enumData.map(item => item.value).reverse().join(','),
              text: busObj.metaData.enumData.map(item => item.text).reverse().join(',')
            }
            vueData.$set(formData.multinfos['230707112047UreAxpVnigxfURKHkZi'].rows[busObj.subFormIndex], 'C-LDRC-0001', obj)
          } else if (busObj.value.split(',').length < busObj.metaData.enumData.length && busObj.value.includes('all')) {
            let obj = {
              value: busObj.value.split(',').filter(item => item !='all').join(','),
              text: busObj.text.split(',').filter(item => item !='全选').join(',')
            }
            vueData.$set(formData.multinfos['230707112047UreAxpVnigxfURKHkZi'].rows[busObj.subFormIndex], 'C-LDRC-0001', obj)
          } else if (last_C_LDRC_0001.split(',').length == busObj.metaData.enumData.length && !busObj.value.includes('all')) {
            let obj = {
              value: '',
              text: ''
            }
            vueData.$set(formData.multinfos['230707112047UreAxpVnigxfURKHkZi'].rows[busObj.subFormIndex], 'C-LDRC-0001', obj)
          }
          last_C_LDRC_0001 = busObj.value
        }
      });
    }
    exportObj.saveFilter = function (formData, formStruct, vueData) {
      return new Promise(function (resolve, reject) {
        formData.multinfos['230707112047UreAxpVnigxfURKHkZi'].rows.forEach(row => {
          if (row['C-LDRC-0001'].value.includes('all')) {
            row['C-LDRC-0001'].text = row['C-LDRC-0001'].text.split(',').filter(item => item !='全选').join(',')
          }
        })
        resolve()
      })
    }
    /**
     * 发布
     */
    exportObj.publish = function (formData, formStruct, vueData) {
      function func() {
        dsf.http.post('/fn/leader/publish', { 'pk': vueData.formMeta.parameters.pk }).then(res => {
          if (res.data.code === "200"){
            dsf.layer.toast('发布成功')
            vueData.backSucces()
          }else {
            dsf.layer.toast('发布失败')
          }
        })
      }
      dsf.layer.confirm({
        message: "确定进行日程发布",
        confirmButtonText: "确认",
        },
        () => {
          vueData.buttonHandle["save"](
            vueData.$route.params,
            vueData.formMeta,
            vueData.formData,
            vueData,
            vueData.$refs,
            func
          );
        })
    }
    /**
     * 取消活动
     */
    exportObj.cancel = function (formData, formStruct, vueData) {
      function func() {
        dsf.http.post('/fn/leader/cancel', { 'pk': vueData.pk }).then(res => {
          if (res.data.code === "200"){
            dsf.layer.toast('取消活动成功')
            vueData.backSucces()
          }else {
            dsf.layer.toast('取消活动失败')
          }
        })
      }
      dsf.layer.confirm({
          message: "确定要取消活动",
          confirmButtonText: "确认",
          },
        () => {
          vueData.buttonHandle["save"](
            vueData.$route.params,
            vueData.formMeta,
            vueData.formData,
            vueData,
            vueData.$refs,
            func
          );
        })
    }
    /**
     * 变更
     */
    exportObj.change = function (formData, formStruct, vueData) {
      function func() {
        dsf.http.post('/fn/leader/change', { 'pk': vueData.pk }).then(res => {
          if (res.data.code === "200"){
            dsf.layer.toast('变更活动成功')
            vueData.backSucces()
          }else {
            dsf.layer.toast('变更活动失败')
          }
        })
      }
      dsf.layer.confirm({
          message: "请确认是否变更活动？",
          confirmButtonText: "确认",
        },
        () => {
          vueData.buttonHandle["save"](
            vueData.$route.params,
            vueData.formMeta,
            vueData.formData,
            vueData,
            vueData.$refs,
            func
          );
        })
    }
    window.spJS = exportObj;
})()
