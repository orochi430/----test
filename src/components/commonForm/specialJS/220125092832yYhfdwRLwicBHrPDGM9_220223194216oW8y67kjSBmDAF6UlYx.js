const exportObj = {};

exportObj.initHandle = async function (formData, formStruct, vueData) {
  
  vueData.$bus.on("selectDateTime", function (busObj) {
    console.log(busObj)
    if (busObj.metaData.metaId == "C-QJSQHJYSQD-003") {
      let time = dsf.date.format(new Date(dsf.date.parse(busObj.value).getTime() + 90*24*60*60*1000), 'yyyy-mm-dd')
      vueData.$set(vueData.formData.main, "C-QJSQHJYSQD-004", { value: time })
    }
  })

}

export default exportObj;
