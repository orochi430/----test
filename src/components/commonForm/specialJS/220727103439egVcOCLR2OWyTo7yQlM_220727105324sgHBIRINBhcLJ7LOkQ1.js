// 课题登记[江西党校]
import dsf from "../../../common";
const exportObj = {};
exportObj.initHandle = function (formData, formStruct, vueData) {
  // 默认拟稿人 填充部门
  if (formData.main["C-QT-CUSTOM-0041"] && formData.main["C-QT-CUSTOM-0041"].value) {
    setUserName(formData.main["C-QT-CUSTOM-0041"], "C-QT-CUSTOM-0041", vueData);
  }

  // 选择姓名时 填充部门
  vueData.$bus.on("selectUserBus", function (busObj) {
    if (busObj.metaData.metaId == "C-QT-CUSTOM-0040") {
      console.log('selectUserBus', busObj, formData, formStruct, vueData)
      setUserName(busObj, "C-QT-CUSTOM-0040", vueData);
    } else if (busObj.metaData.metaId == "C-QT-CUSTOM-0041") {
      console.log('selectUserBus', busObj, formData, formStruct, vueData)
      setUserName(busObj, "C-QT-CUSTOM-0041", vueData);
    }
  })
}
// exportObj.saveFilter = function (formData, formStruct, vueData) {
//   return new Promise(function (resolve, reject) {
//     try {
//       resolve()
//     } catch (error) {
//       resolve()
//     }
//   })
// }

// 姓名填充部门，格式：部门名称-姓名
function setUserName(dataObj, metaId, vueData) {
  let ctrl = vueData.formMeta.controls.find(item => item.metaId == metaId);
  if (ctrl && ctrl.privilege.editable || false) {
    let newVal = JSON.parse(JSON.stringify(dataObj));
    dsf.http.post(`/fn/common/queryInfo`, {
      uid: dataObj.value
    })
      .done(res => {
        if (res.type == "success") {
          let users = res.data, cUser;
          newVal.text = dataObj.value.split(',').map((val, idx) => {
            cUser = users.find(u => u.userid == val);
            if (cUser) {
              return `${cUser.deptname}-${cUser.uname}`;
            } else {
              return dataObj.text.split(',')[idx];
            }
          }).join(',');
          vueData.$set(vueData.formData.main, metaId, newVal)
        }
      })
      .error(error => {
        console.log('queryInfo-error =', error);
      })
  }
}
export default exportObj;