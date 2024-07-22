
const exportObj = {};
exportObj.initHandle = function (formData, formStruct, vueData) {
  formStruct.controls.find(item => item.metaId == 'C-IM-PROJECT-017').controlType = 'controlMap'

  // 地图选择带入地址、经纬度
  vueData.$bus.on("setAddress", function (vueObj) {
    if (vueObj.metaData.metaId == "C-IM-PROJECT-017") {
      vueData.$set(vueData.formData.main, "C-IM-PROJECT-017", { value: vueObj.address })
      vueData.$set(vueData.formData.main, "C-IM-PROJECT-018", { value: vueObj.lng })
      vueData.$set(vueData.formData.main, "C-IM-PROJECT-019", { value: vueObj.lat })
    }
  })
}

exportObj.saveFilter = function (formData, formStruct, vueData, action) {

  return new Promise(function (resolve, reject) {
    let rows1 = formData.multinfos["220422150137uK6Gmft6rSu9wIdGadL"].rows//项目联系人
    let rows2 = formData.multinfos["2204221452494767VJ2CyWIDkyjAwvo"].rows//VR联系人
    dsf.http.post("fn/projectManage/getSubFormId").then(({ data }) => {
      //projectLinkMaxId代表项目联系人子表的id
      //vrLinkMaxId代表vr联系人子表的id
      let projectLinkMaxId = data.data.projectLinkMaxId
      let vrLinkMaxId = data.data.vrLinkMaxId
      if (!vueData.pk) {
        rows1.forEach((element, index) => {
          vueData.$set(element["220422150137uK6Gmft6rSu9wIdGadL"], 'value', parseInt(projectLinkMaxId) + index)
        });
        rows2.forEach((element, index) => {
          vueData.$set(element["2204221452494767VJ2CyWIDkyjAwvo"], 'value', parseInt(vrLinkMaxId) + index)
        });
      } else {
        let rowIndex1 = 0, rowIndex2 = 0
        rows1.forEach((element, index) => {
          if (element.action == "Added") {
            vueData.$set(element["220422150137uK6Gmft6rSu9wIdGadL"], 'value', parseInt(projectLinkMaxId) + rowIndex1)
            rowIndex1++
          }
        });
        rows2.forEach((element, index) => {
          if (element.action == "Added") {
            vueData.$set(element["2204221452494767VJ2CyWIDkyjAwvo"], 'value', parseInt(vrLinkMaxId) + rowIndex2)
            rowIndex2++
          }
        });
      }
      resolve()
    })
  })
}
export default exportObj;
