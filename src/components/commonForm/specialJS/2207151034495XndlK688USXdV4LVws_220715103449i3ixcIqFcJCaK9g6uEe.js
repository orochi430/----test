/**
 * 房地产项目编辑表单
 */
 const exportObj = {};
 function dealChildData(formData, vueData, callback, temp_pk="") {
  let rentId = "220808111208NhgD3QUHH1iFNuneVLx";
  let rowsRentItem = formData.multinfos[rentId].rows
  let sourceId = "220808111155RmS3n2AKo4lh38HrDyG";
  let rowsSourceItem = formData.multinfos[sourceId].rows
  dsf.http.post("fn/commonTool/getIdByTableName", { dbName: "MySQLConnection", tableName: "im_project_linkman"}).then(({ data }) => {
      let maxid = data.data.id
      if (temp_pk) {
        let rowIndex = 0
        rowsRentItem.forEach(element => {
            if (element.action == "Added") {
                vueData.$set(element[rentId], 'value', parseInt(maxid) + rowIndex)
                rowIndex++
            }
        });
      } else {
          let rowIndex = 0
          rowsRentItem.forEach(element => {
              if (element.action == "Added") {
                  vueData.$set(element[rentId], 'value', parseInt(maxid) + rowIndex)
                  rowIndex++
              }
          });
      }
      return dsf.http.post("fn/commonTool/getIdByTableName", { dbName: "MySQLConnection", tableName: "IM_PROJECT_VRLINKMAN"})
  }).then(({data})=>{
      let maxid = data.data.id
      if (temp_pk) {
        let rowIndex = 0
        rowsSourceItem.forEach(element => {
            if (element.action == "Added" && element[sourceId].value.length >= 10) {
                vueData.$set(element[sourceId], 'value', parseInt(maxid) + rowIndex)
                rowIndex++
            }
        });
      } else {
          let rowIndex = 0
          rowsSourceItem.forEach(element => {
              if (element.action == "Added" && element[sourceId].value.length >= 10) {
                  vueData.$set(element[sourceId], 'value', parseInt(maxid) + rowIndex)
                  rowIndex++
              }
          });
      }
      callback()
  })
}

exportObj.initHandle = function (formData, formStruct, vueData) {
    vueData.$bus.on("checkVal", function(busObj) {
        if(busObj.metaData.metaId === "C-IM-PROJECT-VRLINKMAN-002") {
            console.log(busObj);
            let phone = busObj.metaData.enumData.find(item => item.value == busObj.value).phoneNo
            formData.multinfos["220808111155RmS3n2AKo4lh38HrDyG"].rows[busObj.subFormIndex]["C-IM-PROJECT-VRLINKMAN-003"].value = phone
        }
    })
}

exportObj.saveFilter = function (formData, formStruct, vueData) {
  return new Promise(function (resolve, reject) {
      //主表
      if (!vueData.pk) {
          dsf.http.post("fn/commonTool/getIdByTableName", { dbName: "MySQLConnection", tableName: "im_project" }).then(({ data }) => {
              let temp_pk = data.data.id
              vueData.pk = temp_pk
              vueData.formParams.pk = temp_pk
              vueData.$set(formStruct.parameters, 'pk', temp_pk)
              vueData.$set(formData.main, 'A0001', { value: temp_pk })
              dealChildData(formData, vueData, () => resolve(), temp_pk);
          })
      } else {
          dealChildData(formData, vueData, () => resolve());
      }

  })
}
export default exportObj;