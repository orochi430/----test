/**
 * 上海地产客户管理表单
 */
const exportObj = {};

// exportObj.saveAfter = function (vueData, params, formData) {
//   if (vueData.$route.params.pk || vueData._pk) {
//     dsf.layer.toast("表单保存成功")
//     vueData.$eventBus.refresh(vueData);
//   } else {
//     vueData.$eventBus.refresh(vueData);
//     let pk = formData.main["A0001"].value
//     let moduleId = formData.main["A0004"].value
//     dsf.layer.toast("表单保存成功", undefined, () => {
//       vueData.$router.replace({
//         path: `/commonForm/${moduleId}/${pk}`,
//         query: {
//           formId: vueData.$route.query.formId
//         }
//       });
//     });
//   }
// }

function changeClear(itemname, formData, busObj, vueData) {
  if (itemname == "project") {
    //当选择项目时，应清空子表的所有字段；
    //清除房源名称
    formData.multinfos["22052014314165eniovTE43nrDYdcSm"].rows.forEach(n => {
      vueData.$set(n, "220519112844EVzjXP7jUJlVKmc5kFh", { value: "", text: "" })
      vueData.$set(n, "220513201635mvLQr5jrPrTngcmMXhU", { value: "", text: "" })
      vueData.$set(n, "220513201809v9TGFYMGOirhYbOfNJP", { value: "", text: "" })
      vueData.$set(n, "220513201908F1JxdmM6Vc1gAhxOvAa", { value: "", text: "" })
      //清除面积字段；
      vueData.$set(n["c-res-space-009"], "value", "")
    })

  } else if (itemname == "building") {
    vueData.$set(formData.multinfos["22052014314165eniovTE43nrDYdcSm"].rows[busObj.subFormIndex], "220513201809v9TGFYMGOirhYbOfNJP", { value: "", text: "" })
    vueData.$set(formData.multinfos["22052014314165eniovTE43nrDYdcSm"].rows[busObj.subFormIndex], "220513201908F1JxdmM6Vc1gAhxOvAa", { value: "", text: "" })
    //清除面积字段；
    vueData.$set(formData.multinfos["22052014314165eniovTE43nrDYdcSm"].rows[busObj.subFormIndex]["c-res-space-009"], "value", "")
  } else if (itemname == "floor") {
    vueData.$set(formData.multinfos["22052014314165eniovTE43nrDYdcSm"].rows[busObj.subFormIndex], "220513201908F1JxdmM6Vc1gAhxOvAa", { value: "", text: "" })
    //清除面积字段；
    vueData.$set(formData.multinfos["22052014314165eniovTE43nrDYdcSm"].rows[busObj.subFormIndex]["c-res-space-009"], "value", "")
  }
}

exportObj.initHandle = function (formData, formStruct, vueData) {
  let fyControl = formStruct.controls.find(item => item.metaId == "22052014314165eniovTE43nrDYdcSm")
  if (formData.main["C-RQ-SPACE-REQUIREMENT-015"].value != "1") {
    fyControl.show = 0
  }
  let qdControl = formStruct.controls.find(item => item.controlId == "95F7kT88b9dUG0aO")
  qdControl.show = 0
  let qdzbControl = formStruct.controls.find(item => item.controlId == "kolfE5aGmedIKqWI")
  qdzbControl.show = 0

  let qdRows = formData.multinfos["220518142254070nC4NzYGHcRoY6vZX"].rows
  if (qdRows.length && qdRows[0]["C-RQ-SPACE-REQUIREMENT-ITEM-016"].value == "1") {
    qdControl.show = 1
    qdzbControl.show = 1
  }
  function changeSubForm() {
    let temp = 0
    formData.multinfos["22052014314165eniovTE43nrDYdcSm"].rows.forEach(element => {
      temp += parseFloat("0" + element["c-res-space-009"].value)
    });
    vueData.$set(formData.main["C-RQ-SPACE-REQUIREMENT-017"], "value", temp)

    vueData.$set(formData.main["C-RQ-SPACE-REQUIREMENT-016"], "value", formData.multinfos["22052014314165eniovTE43nrDYdcSm"].rows.length)
  }
  changeSubForm()
  vueData.$bus.on("subFormAdd", function (busObj) {
    changeSubForm()
  })

  vueData.$bus.on("subFormDelete", function (busObj) {
    changeSubForm()
  })

  vueData.$bus.on("blurBus", function (busObj) {
    if (busObj.metaData.metaId == "c-res-space-009") {
      changeSubForm()
    }
  })

  vueData.$bus.on("inputRadio", function (busObj) {
    if (busObj.metaData.metaId == "C-RQ-SPACE-REQUIREMENT-015") {
      if (busObj.value == "1") {
        fyControl.show = 1
      } else {
        fyControl.show = 0
      }
    }
  })

  function changeProject(projectId) {
    window["C-RQ-SPACE-REQUIREMENT-008_beforeOpenCode"] = function (formData, url) {
      let tempurl = url.split('?')[0] + "?projectId=" + projectId
      let partUrl = [];
      if (url.split('?')[1]) {
        let array = url.split('?')[1].split('&')
        array.forEach(n => {
          if (n.split('=')[0] != "projectId") {
            partUrl.push(n);
          }
        })
        tempurl = tempurl + "&" + partUrl.join('&');
      }
      return tempurl;
    }


    window["C-RQ-SPACE-REQUIREMENT-011_beforeOpenCode"] = function (formData, url) {
      let tempurl = url.split('?')[0] + "?projectId=" + projectId
      let partUrl = [];
      if (url.split('?')[1]) {
        let array = url.split('?')[1].split('&')
        array.forEach(n => {
          if (n.split('=')[0] != "projectId") {
            partUrl.push(n);
          }
        })
        tempurl = tempurl + "&" + partUrl.join('&');
      }
      return tempurl;
    }
  }
  if (formData.main["C-RQ-SPACE-REQUIREMENT-069"].value.length) {
    changeProject(formData.main["C-RQ-SPACE-REQUIREMENT-069"].value)
  }


  vueData.$bus.on("selectUserBus", function (busObj) {

    if (busObj.metaData.metaId == "C-RQ-SPACE-REQUIREMENT-008") {//选择跟进人带出跟进人电话
      if (busObj.value) {
        dsf.http.post("fn/customerLeadInfoController/getPhoneByUId", { uid: busObj.value }).then((res) => {
          vueData.$set(formData.main["C-RQ-SPACE-REQUIREMENT-029"], "value", res.data.data.phone)
        })
      }
    }

    if (busObj.metaData.metaId == "C-JYTA-0061") {
      if (busObj.value) {
        window["C-JYTA-0062_beforeOpenCode"] = function (formData, url) {
          //formData.multinfos["220522124533ZkeCXW7AM6iuXizGEyf"].rows[busObj.subFormIndex]["C-JYTA-0061"].value
          let tempurl = url.split('?')[0] + "?companyId=" + busObj.value
          if (url.split('?')[1]) {
            tempurl = tempurl + "&" + url.split('?')[1]
          }
          return tempurl;
        }
      }
    }
    //选择来访项目
    if (busObj.metaData.metaId == "C-RQ-SPACE-REQUIREMENT-069") {
      if (busObj.value) {
        changeProject(busObj.value)
      }
    }
    //当房源选择有时，选择项目后，需要修改下面的控件点击事件，传入项目Id;
    if (busObj.metaData.metaId == "C-RQ-SPACE-REQUIREMENT-083") {
      if (busObj.value) {
        //22052014314165eniovTE43nrDYdcSm
        //点击房源名称时，传入projectId
        changeClear("project", formData, busObj, vueData)
        window["220519112844EVzjXP7jUJlVKmc5kFh_beforeOpenCode"] = function (formData, url) {
          let tempurl = url.split('?')[0] + "?projectId=" + busObj.value
          let partUrl = [];
          if (url.split('?')[1]) {
            let array = url.split('?')[1].split('&')
            array.forEach(n => {
              if (n.split('=')[0] != "projectId") {
                partUrl.push(n);
              }
            })
            tempurl = tempurl + "&" + partUrl.join('&');
          }
          return tempurl;
        }
        //使点击楼宇时，需要传入projectId
        window["220513201635mvLQr5jrPrTngcmMXhU_beforeOpenCode"] = function (formData, url) {
          let tempurl = url.split('?')[0] + "?projectId=" + busObj.value
          let partUrl = [];
          if (url.split('?')[1]) {
            let array = url.split('?')[1].split('&')
            array.forEach(n => {
              if (n.split('=')[0] != "projectId") {
                partUrl.push(n);
              }
            })
            tempurl = tempurl + "&" + partUrl.join('&');
          }
          return tempurl;
        }
      }
    }

    //当点击楼宇时，需修改获取楼层的接口，带入参数楼宇iD
    if (busObj.metaData.metaId == "220513201635mvLQr5jrPrTngcmMXhU") {
      if (busObj.value) {
        //使点击楼层时，需要传入buildingId
        changeClear("building", formData, busObj, vueData)
        window["220513201809v9TGFYMGOirhYbOfNJP_beforeOpenCode"] = function (formData, url) {
          let tempurl = url.split('?')[0] + "?buildingId=" + busObj.value
          let partUrl = [];
          if (url.split('?')[1]) {
            let array = url.split('?')[1].split('&')
            array.forEach(n => {
              if (n.split('=')[0] != "buildingId") {
                partUrl.push(n);
              }
            })
            tempurl = tempurl + "&" + partUrl.join('&');
          }
          return tempurl;
        }
      }
    }

    //当点击楼层时，需修改获取房号的接口，带入参数楼层iD
    if (busObj.metaData.metaId == "220513201809v9TGFYMGOirhYbOfNJP") {
      if (busObj.value) {
        //使点击房号时，需要传入floorId
        changeClear("floor", formData, busObj, vueData)
        window["220513201908F1JxdmM6Vc1gAhxOvAa_beforeOpenCode"] = function (formData, url) {
          let tempurl = url.split('?')[0] + "?floorId=" + busObj.value
          let partUrl = [];
          if (url.split('?')[1]) {
            let array = url.split('?')[1].split('&')
            array.forEach(n => {
              if (n.split('=')[0] != "floorId") {
                partUrl.push(n);
              }
            })
            tempurl = tempurl + "&" + partUrl.join('&');
          }
          return tempurl;
        }
      }
    }
    //当点击房号时，需根据房号获取房号的面积
    if (busObj.metaData.metaId == "220513201908F1JxdmM6Vc1gAhxOvAa") {
      if (busObj.value) {
        dsf.http.post("fn/customerLeadInfoController/getArea", { "spaceId": busObj.value }).then(({ data }) => {
          if (data.type == "success") {
            vueData.$set(formData.multinfos["22052014314165eniovTE43nrDYdcSm"].rows[busObj.subFormIndex]["c-res-space-009"], "value", data.data.area)
            changeSubForm()
          }
        });
      }
    }
  });
  vueData.$bus.on("checkVal", function (busObj) {
    if (busObj.metaData.metaId == "C-JYTA-0009") {
      window["C-JYTA-0061_beforeOpenCode"] = function (formData, url) {
        let tempurl = url.split('?')[0] + "?qdlx=" + busObj.value
        let partUrl = [];
        if (url.split('?')[1]) {
          let array = url.split('?')[1].split('&')
          array.forEach(n => {
            if (n.split('=')[0] != "projectId") {
              partUrl.push(n);
            }
          })
          tempurl = tempurl + "&" + partUrl.join('&');
        }
        return tempurl;
      }
    }

    if (busObj.metaData.metaId == "C-RQ-SPACE-REQUIREMENT-ITEM-016") {
      if (busObj.value == "1") {
        qdControl.show = 1
        qdzbControl.show = 1
      } else {
        qdControl.show = 0
        qdzbControl.show = 0
      }
    }
    if (busObj.metaData.metaId == "C-RQ-SPACE-REQUIREMENT-ITEM-019") {
      let percent = "0%"
      switch (busObj.value) {
        case "1":
          percent = "10%"
          break;
        case "2":
          percent = "30%"
          break;
        case "3":
          percent = "50%"
          break;
        case "4":
          percent = "70%"
          break;
        case "5":
          percent = "90%"
          break;
        case "6":
          percent = "100%"
          break;
      }

      vueData.$set(formData.multinfos["220518142254070nC4NzYGHcRoY6vZX"].rows[busObj.subFormIndex]["C-RQ-SPACE-REQUIREMENT-ITEM-020"], "value", percent.replace("%", ""))
    }
  })
}
// 判断数组是否有重复项
function isRepeat(arr) {
  let hash = {};
  for (let i in arr) {
    if (hash[arr[i]]) return true;
    hash[arr[i]] = true;
  }
  return false;
}
exportObj.saveFilter = function (formData, formStruct, vueData) {
  return new Promise(async function (resolve, reject) {
    let contactMetaId = "220518152535S1RNGWZeTCZdp3rh4uk";
    let requirement_itemMetaId = "220518142254070nC4NzYGHcRoY6vZX";
    let mdm_channelMetaId = "2205181457426DFQrEvVL8XYUPA0pAn";
    let qudao_subform = formData.multinfos["220522124533ZkeCXW7AM6iuXizGEyf"].rows
    let ysfy_subform = formData.multinfos["22052014314165eniovTE43nrDYdcSm"].rows
    let rowsRequirementItem = formData.multinfos[requirement_itemMetaId].rows

    // 渠道信息子表的公司元数据（C-JYTA-0061）必须相同
    if(qudao_subform.length > 0) {
      let temp = qudao_subform[0]["C-JYTA-0061"].text
      qudao_subform.forEach((item, index) => {
        index == 0 ? "" : item["C-JYTA-0061"].text != temp ? reject("当前客户渠道信息存在多家公司，无法保存") : ""
      })
    }

    // 来访项目和项目元数据字段内容必须形同

    if(formData.main["C-RQ-SPACE-REQUIREMENT-015"].value == 1 && formData.main["C-RQ-SPACE-REQUIREMENT-069"].value != formData.main["C-RQ-SPACE-REQUIREMENT-083"].value) {
      reject("来访项目和项目字段不同，无法保存")
    }

    // 原始房源的房源的相同数据信息只能存在一条
    let ysfy_subform_arr = []
    ysfy_subform.forEach( item => item.action != "Deleted" ? ysfy_subform_arr.push(item["220513201908F1JxdmM6Vc1gAhxOvAa"].value) : "" )
    console.log(ysfy_subform_arr);
    isRepeat(ysfy_subform_arr) ? reject("当前客户房源信息存在重复") : ""

    let isGo = true
    if (formData.main["C-RQ-SPACE-REQUIREMENT-015"].value == 1) {
      let fyzbRows = formData.multinfos["22052014314165eniovTE43nrDYdcSm"].rows.filter(item => item.action != "Deleted");;
      if (fyzbRows.length == 0) {
        reject("意向房源子表必填,至少存在一条数据!")
        return
      }
      let fyId = ""
      fyzbRows.forEach(n => {
        if (fyId.length) {
          fyId += ","
        }
        fyId += n["220513201908F1JxdmM6Vc1gAhxOvAa"].value
      })
      await dsf.http.post("fn/customerLeads/selectFYInfo", { fyId: fyId }).then(({ data }) => {
        console.log(data)
        if (data.code == "200") {

        } else {
          dsf.layer.toast(data.message)
          isGo = false
        }
      })
      if (!isGo) {
        reject()
        return
      }
    }

    dsf.http.post("fn/commonTool/getIdByTableName", { "tableName": "g_contact", "dbName": "ImBzServiceConnection" }).then(({ data }) => {
      // let maxid = data.data.id
      // if (!vueData.pk) {
      //   rows1.forEach((element, index) => {
      //     vueData.$set(element[contactMetaId], 'value', parseInt(maxid) + index)
      //   });
      // } else {
      //   let rowIndex1 = 0
      //   rows1.forEach((element, index) => {
      //     if (element.action == "Added") {
      //       vueData.$set(element[contactMetaId], 'value', parseInt(maxid) + rowIndex1)
      //       rowIndex1++
      //     }
      //   });
      // }
      return dsf.http.post("fn/commonTool/getIdByTableName", { "tableName": "rq_space_requirement_item", "dbName": "ImBzServiceConnection" })
    }).then(({ data }) => {
      let maxid = data.data.id
      if (!vueData.pk) {
        rowsRequirementItem.forEach((element, index) => {
          vueData.$set(element[requirement_itemMetaId], 'value', parseInt(maxid) + index)
        });
      } else {
        let rowIndex1 = 0
        rowsRequirementItem.forEach((element, index) => {
          if (element.action == "Added") {
            vueData.$set(element[requirement_itemMetaId], 'value', parseInt(maxid) + rowIndex1)
            rowIndex1++
          }
        });
      }
      return dsf.http.post("fn/commonTool/getIdByTableName", { "tableName": "mdm_channel", "dbName": "ImBzServiceConnection" })
    }).then(({ data }) => {
      // let maxid = data.data.id
      // if (!vueData.pk) {
      //   rowsMdmChannel.forEach((element, index) => {
      //     vueData.$set(element[mdm_channelMetaId], 'value', parseInt(maxid) + index)
      //   });
      // } else {
      //   let rowIndex1 = 0
      //   rowsMdmChannel.forEach((element, index) => {
      //     if (element.action == "Added") {
      //       vueData.$set(element[mdm_channelMetaId], 'value', parseInt(maxid) + rowIndex1)
      //       rowIndex1++
      //     }
      //   });
      // }

      if (!vueData.pk) {
        dsf.http.post("fn/commonTool/getIdByTableName", { "tableName": "rq_space_requirement", "dbName": "ImBzServiceConnection" }).then(({ data }) => {
          //fn/UpdateGNRInfoController/updateInfo
          dsf.http.post("fn/UpdateGNRInfoController/updateInfo", { moduleId: vueData.moduleId, oldId: vueData.formParams.pk, newId: data.data.id }).then(({ data }) => {
            console.log("fn/UpdateGNRInfoController/updateInfo", data)
          });
          let temp_pk = data.data.id
          vueData.pk = temp_pk
          vueData.formParams.pk = temp_pk
          vueData.$set(formStruct.parameters, 'pk', temp_pk)
          vueData.$set(formData.main, 'A0001', { value: temp_pk })
          //3个子表需要对A0031赋值
          // rows1.forEach((element, index) => {
          //   vueData.$set(element,"A0031", { value: temp_pk })
          // });
          // rowsRequirementItem.forEach((element, index) => {
          //   vueData.$set(element,"A0031", { value: temp_pk })
          // });
          // rowsMdmChannel.forEach((element, index) => {
          //   vueData.$set(element,"A0031", { value: temp_pk })
          // });
          resolve()
        })
      } else {
        resolve()
      }
    })
    //resolve()

  })
}
//测试保存
// exportObj.formOperation = function (formData, formStruct, vueData) {
//   let gjrid = formData.main['C-RQ-SPACE-REQUIREMENT-008'].value
//   let gjrname = formData.main['C-RQ-SPACE-REQUIREMENT-008'].text
//   let xzrid = formData.main['C-RQ-SPACE-REQUIREMENT-011'].value
//   let xzrname = formData.main['C-RQ-SPACE-REQUIREMENT-011'].text
//   let lfxmid = formData.main['C-RQ-SPACE-REQUIREMENT-069'].value
//   let lfxmname = formData.main['C-RQ-SPACE-REQUIREMENT-069'].text
//   let pk = vueData.formParams.pk
//   dsf.http.post("fn/customerLeads/updateInfo",{pk:pk,gjr:gjrid,gjrName:gjrname,xzr:xzrid,xzrName:xzrname,lfxm:lfxmid,lfxmName:lfxmname}).then(res=>{
//     console.log(res.data.code);
//     if (res.data.code == 1) {
//       dsf.layer.toast("保存成功")
//      }else{
//       dsf.layer.toast("保存失败")
//      }
//   })
// }

export default exportObj;
