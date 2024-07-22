/**
 * 上海地产跟进记录表单
 */
const exportObj = {};

function changeClear(itemname, formData, busObj, vueData) {
  if (itemname == "project") {
    //当选择项目时，应清空子表的所有字段；
    //清除房源名称
    formData.multinfos["2205201458207jgRwGliGFXqgs3kFAG"].rows.forEach(n => {
      vueData.$set(n, "220519112844EVzjXP7jUJlVKmc5kFh", { value: "", text: "" })
      vueData.$set(n, "220513201635mvLQr5jrPrTngcmMXhU", { value: "", text: "" })
      vueData.$set(n, "220513201809v9TGFYMGOirhYbOfNJP", { value: "", text: "" })
      vueData.$set(n, "220513201908F1JxdmM6Vc1gAhxOvAa", { value: "", text: "" })
      //清除面积字段；
      vueData.$set(n["c-res-space-009"], "value", "")
    })

  } else if (itemname == "building") {
    vueData.$set(formData.multinfos["2205201458207jgRwGliGFXqgs3kFAG"].rows[busObj.subFormIndex], "220513201809v9TGFYMGOirhYbOfNJP", { value: "", text: "" })
    vueData.$set(formData.multinfos["2205201458207jgRwGliGFXqgs3kFAG"].rows[busObj.subFormIndex], "220513201908F1JxdmM6Vc1gAhxOvAa", { value: "", text: "" })
    //清除面积字段；
    vueData.$set(formData.multinfos["2205201458207jgRwGliGFXqgs3kFAG"].rows[busObj.subFormIndex]["c-res-space-009"], "value", "")
  } else if (itemname == "floor") {
    vueData.$set(formData.multinfos["2205201458207jgRwGliGFXqgs3kFAG"].rows[busObj.subFormIndex], "220513201908F1JxdmM6Vc1gAhxOvAa", { value: "", text: "" })
    //清除面积字段；
    vueData.$set(formData.multinfos["2205201458207jgRwGliGFXqgs3kFAG"].rows[busObj.subFormIndex]["c-res-space-009"], "value", "")
  }
}

exportObj.initHandle = function (formData, formStruct, vueData) {
  if (!vueData.pk) {
    vueData.$set(vueData.formData.main, "B0035", {
      value: vueData.$route.query.fid
    })
    //初始化表单数据
    dsf.http.post("fn/customerLeadInfoController/selectCustomerLeadInformationById", { pk: vueData.$route.query.fid }).then((res) => {
      if (res.data.type === 'success') {
        let result = res.data.data;
        vueData.$set(vueData.formData.main, "C-RQ-SPACE-REQUIREMENT-PROCESS-023", { value: result['C-RQ-SPACE-REQUIREMENT-PROCESS-023_value'] });
        vueData.$set(vueData.formData.main, "C-RQ-SPACE-REQUIREMENT-PROCESS-022", { value: result['C-RQ-SPACE-REQUIREMENT-PROCESS-022_value'] });
        vueData.$set(vueData.formData.main, "C-RQ-SPACE-REQUIREMENT-PROCESS-024", { value: result['C-RQ-SPACE-REQUIREMENT-PROCESS-024_value'] });
        vueData.$set(vueData.formData.main, "C-RQ-SPACE-REQUIREMENT-PROCESS-007", { value: result['C-RQ-SPACE-REQUIREMENT-PROCESS-007_value'] });
        vueData.$set(vueData.formData.main, "C-RQ-SPACE-REQUIREMENT-PROCESS-016", { value: result['C-RQ-SPACE-REQUIREMENT-PROCESS-016_value'] });
        vueData.$set(vueData.formData.main, "C-RQ-SPACE-REQUIREMENT-PROCESS-008", { value: result['C-RQ-SPACE-REQUIREMENT-PROCESS-008_value'] });
        vueData.$set(vueData.formData.main, "C-RQ-SPACE-REQUIREMENT-PROCESS-017", {
          value: result["C-RQ-SPACE-REQUIREMENT-PROCESS-017_value"],
          text: result["C-RQ-SPACE-REQUIREMENT-PROCESS-017_text"]
        });
        vueData.$set(vueData.formData.main, "C-RQ-SPACE-REQUIREMENT-PROCESS-021", {
          value: result["C-RQ-SPACE-REQUIREMENT-PROCESS-021_value"],
          text: result["C-RQ-SPACE-REQUIREMENT-PROCESS-021_text"]
        });
        vueData.$set(vueData.formData.main, "C-RQ-SPACE-REQUIREMENT-PROCESS-025", {
          value: result["C-RQ-SPACE-REQUIREMENT-PROCESS-025_value"],
          text: result["C-RQ-SPACE-REQUIREMENT-PROCESS-025_text"]
        });
        vueData.$set(vueData.formData.main, "C-RQ-SPACE-REQUIREMENT-PROCESS-009", {
          value: result["C-RQ-SPACE-REQUIREMENT-PROCESS-009_value"],
          text: result["C-RQ-SPACE-REQUIREMENT-PROCESS-009_text"]
        });
        vueData.$set(vueData.formData.main, "C-RQ-SPACE-REQUIREMENT-PROCESS-002", {
          value: result["C-RQ-SPACE-REQUIREMENT-PROCESS-002_value"],
          text: result["C-RQ-SPACE-REQUIREMENT-PROCESS-002_text"]
        });
        //子表赋值
        let rows1 = formData.multinfos["2205201458207jgRwGliGFXqgs3kFAG"].rows
        let rows2 = formData.multinfos["220522125031I4f6W9rRsZ2SoRrLM1t"].rows
        let rows3 = formData.multinfos["220522125021TE1DVHzgnvmI5BigFn0"].rows
        let rows4 = formData.multinfos["220501153547qw43AZvDPsYnhAQVz1p"].rows

        let rows1Result = result.childInfo["2205201458207jgRwGliGFXqgs3kFAG"]
        let rows2Result = result.childInfo["220522125031I4f6W9rRsZ2SoRrLM1t"]
        let rows3Result = result.childInfo["220522125021TE1DVHzgnvmI5BigFn0"]
        let rows4Result = result.childInfo["220501153547qw43AZvDPsYnhAQVz1p"]

        rows1.forEach((element, index) => {
          //vueData.$set(element["2205201458207jgRwGliGFXqgs3kFAG"], 'value', parseInt(maxid) + index);
          //招商房源名称
          //space_name: 招商房源名称
          vueData.$set(element, "220519112844EVzjXP7jUJlVKmc5kFh", { value: rows1Result[index]["space_name"], text: rows1Result[index]["space_name_text"] });
          //max_area：面积
          vueData.$set(element["c-res-space-009"], 'value', rows1Result[index]["max_area"]);
          // build_name: 楼宇
          vueData.$set(element, "220513201635mvLQr5jrPrTngcmMXhU", { value: rows1Result[index]["build_name"], text: rows1Result[index]["build_name_text"] });
          // floor_name: 楼层
          vueData.$set(element, "220513201809v9TGFYMGOirhYbOfNJP", { value: rows1Result[index]["floor_name"], text: rows1Result[index]["floor_name_text"] });
          // res_space_name ： 房号
          vueData.$set(element, "220513201908F1JxdmM6Vc1gAhxOvAa", { value: rows1Result[index]["spares_space_namece_name"], text: rows1Result[index]["spares_space_namece_name_text"] });
        });
        //渠道信息
        rows2.forEach((element, index) => {
          //vueData.$set(element["220522125031I4f6W9rRsZ2SoRrLM1t"], 'value', parseInt(maxid) + index);
          //jyta_catagory: 渠道类型
          vueData.$set(element, "C-JYTA-0009", { value: rows2Result[index]["jyta_catagory"], text: rows2Result[index]["jyta_catagory_text"] });
          //gksx：渠道公司
          vueData.$set(element, "C-JYTA-0061", { value: rows2Result[index]["gksx_value"], text: rows2Result[index]["gksx_text"] });
          // gknr：渠道人
          vueData.$set(element, "C-JYTA-0062", { value: rows2Result[index]["gknr_value"], text: rows2Result[index]["gknr_text"] });
          // jssj: 报备日期
          vueData.$set(element, "C-JYTA-0023", { value: rows2Result[index]["jssj"] });

        });
        //联系人信息子表
        rows3.forEach((element, index) => {
          //vueData.$set(element["220522125021TE1DVHzgnvmI5BigFn0"], 'value', parseInt(maxid) + index);
          //main_handle_unit：联系人名字
          vueData.$set(element["B0051"], 'value', rows3Result[index]["main_handle_unit"]);
          //tel: 联系人电话
          vueData.$set(element["C-CONTACT-0008"], 'value', rows3Result[index]["tel"]);
        });
        rows4.forEach((element, index) => {
          //vueData.$set(element["220501153547qw43AZvDPsYnhAQVz1p"], 'value', parseInt(maxid) + index);
          // require_type: 需求业态
          vueData.$set(element, "C-RQ-SPACE-REQUIREMENT-ITEM-024", { value: rows4Result[index]["require_type"], text: rows4Result[index]["require_type_text"] });
          // rent_require_area_min ：需求面积最小
          vueData.$set(element["C-RQ-SPACE-REQUIREMENT-ITEM-003"], 'value', rows4Result[index]["rent_require_area_min"]);
          // rent_require_area_max：需求面积最大
          vueData.$set(element["C-RQ-SPACE-REQUIREMENT-ITEM-004"], 'value', rows4Result[index]["rent_require_area_min"]);
          // rent_require_budget_min：预算最小
          vueData.$set(element["C-RQ-SPACE-REQUIREMENT-ITEM-005"], 'value', rows4Result[index]["rent_require_budget_min"]);
          // rent_require_budget_max：预算最大
          vueData.$set(element["C-RQ-SPACE-REQUIREMENT-ITEM-006"], 'value', rows4Result[index]["rent_require_budget_max"]);
          // rent_require_start_date ：起租日期
          vueData.$set(element["C-RQ-SPACE-REQUIREMENT-ITEM-008"], 'value', rows4Result[index]["rent_require_start_date"]);
          // intention_time ：首次看房时间
          vueData.$set(element["C-RQ-SPACE-REQUIREMENT-ITEM-025"], 'value', rows4Result[index]["intention_time"]);
          // decoration_require_level ：装修标准
          vueData.$set(element["C-RQ-SPACE-REQUIREMENT-ITEM-017"], 'value', rows4Result[index]["decoration_require_level"]);
          // visitior_from ：客户来源
          vueData.$set(element["C-RQ-SPACE-REQUIREMENT-ITEM-016"], 'value', rows4Result[index]["visitior_from"]);
          // inquiry_type ：闻讯方式
          vueData.$set(element["C-RQ-SPACE-REQUIREMENT-ITEM-023"], 'value', rows4Result[index]["inquiry_type"]);
          // district_txt ：意向区域
          vueData.$set(element["C-RQ-SPACE-REQUIREMENT-ITEM-022"], 'value', rows4Result[index]["district_txt"]);
          // intention_level ：意向等级
          vueData.$set(element["C-RQ-SPACE-REQUIREMENT-ITEM-019"], 'value', rows4Result[index]["intention_level"]);
          // start_visit_date ：首次来访日期
          vueData.$set(element["C-RQ-SPACE-REQUIREMENT-ITEM-026"], 'value', rows4Result[index]["start_visit_date"]);
          // expect_signing_date ：预计签约日期
          vueData.$set(element["C-RQ-SPACE-REQUIREMENT-ITEM-027"], 'value', rows4Result[index]["expect_signing_date"]);
        });
      }
    });
  }

  // window["C-RQ-SPACE-REQUIREMENT-PROCESS-030_beforeOpenCode"] = function (formData, url) {
  //   let tempurl = url.split('?')[0] + "?fid=" + vueData.$route.query.fid
  //   return tempurl;
  // }

  let fyControl = formStruct.controls.find(item => item.metaId == "2205201458207jgRwGliGFXqgs3kFAG")
  if (formData.main["C-RQ-SPACE-REQUIREMENT-PROCESS-021"].value != "1") {
    fyControl.show = 0
  }
  let qdControl = formStruct.controls.find(item => item.controlId == "lyxPU4ZDrZgxy8AZ")
  qdControl.show = 0
  let qdzbControl = formStruct.controls.find(item => item.controlId == "0FDb8Vba1Pj0TZ9d")
  qdzbControl.show = 0

  let qdRows = formData.multinfos["220501153547qw43AZvDPsYnhAQVz1p"].rows
  if (qdRows.length && qdRows[0]["C-RQ-SPACE-REQUIREMENT-ITEM-016"].value == "1") {
    qdControl.show = 1
    qdzbControl.show = 1
  }

  // 初始化上传附件是否显示
  let RQ_002 =  formData.main["C-RQ-SPACE-REQUIREMENT-PROCESS-002"].text
  let subRQ_016 = formData.multinfos["220501153547qw43AZvDPsYnhAQVz1p"].rows[0]["C-RQ-SPACE-REQUIREMENT-ITEM-016"].text
  let attach_18 = formStruct.controls.find(item => item.metaId == "attach-18")
  let attach_19 = formStruct.controls.find(item => item.metaId == "attach-19")
  RQ_002 == "核心商务书" ? attach_18.show = 1 : attach_18.show = 0
  subRQ_016 == "渠道介绍" ? attach_19.show = 1 : attach_19.show = 0


  vueData.$bus.on("inputRadio", function (busObj) {
    if (busObj.metaData.metaId == "C-RQ-SPACE-REQUIREMENT-PROCESS-021") {
      if (busObj.value == "1") {
        fyControl.show = 1
      } else {
        fyControl.show = 0
      }
    }
  })

  vueData.$bus.on("checkVal", function (busObj) {
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

      vueData.$set(formData.multinfos["220501153547qw43AZvDPsYnhAQVz1p"].rows[busObj.subFormIndex]["C-RQ-SPACE-REQUIREMENT-ITEM-020"], "value", percent.replace("%", ""))
    }

    if(busObj.metaData.metaId == "C-RQ-SPACE-REQUIREMENT-PROCESS-002") {
      busObj.text == "核心商务书" ? attach_18.show = 1 : attach_18.show = 0
    }
    if(busObj.metaData.metaId == "C-RQ-SPACE-REQUIREMENT-ITEM-016") {
      busObj.text == "渠道介绍" ? attach_19.show = 1 : attach_19.show = 0
    }
  })

  vueData.$bus.on("selectUserBus", function (busObj) {
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

    //当房源选择有时，选择项目后，需要修改下面的控件点击事件，传入项目Id;
    if (busObj.metaData.metaId == "C-RQ-SPACE-REQUIREMENT-PROCESS-025") {
      if (busObj.value) {
        //2205201458207jgRwGliGFXqgs3kFAG
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
            vueData.$set(formData.multinfos["2205201458207jgRwGliGFXqgs3kFAG"].rows[busObj.subFormIndex]["c-res-space-009"], "value", data.data.area)
          }
        });
      }
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
    let qudao_subform = formData.multinfos["220522125031I4f6W9rRsZ2SoRrLM1t"].rows
    let ysfy_subform = formData.multinfos["2205201458207jgRwGliGFXqgs3kFAG"].rows
    // 渠道信息子表的公司元数据（C-JYTA-0061）必须相同
    if(qudao_subform.length > 0) {
      let temp = qudao_subform[0]["C-JYTA-0061"].text
      qudao_subform.forEach((item, index) => {
        index == 0 ? "" : item["C-JYTA-0061"].text != temp ? reject("当前客户渠道信息存在多家公司，无法保存") : ""
      })
    }
    // 原始房源的房源的相同数据信息只能存在一条
    let ysfy_subform_arr = []
    ysfy_subform.forEach( item => item.action != "Deleted" ? ysfy_subform_arr.push(item["220513201908F1JxdmM6Vc1gAhxOvAa"].value) : "" )
    isRepeat(ysfy_subform_arr) ? reject("当前客户房源信息存在重复") : ""
    
    try {
      let rows1 = formData.multinfos["220501153547qw43AZvDPsYnhAQVz1p"].rows
      if (formData.main["C-RQ-SPACE-REQUIREMENT-PROCESS-021"].value == 1) {
        let fyzbRows = formData.multinfos["2205201458207jgRwGliGFXqgs3kFAG"].rows.filter(item => item.action != "Deleted");
        if (fyzbRows.length == 0) {
          reject("意向房源子表必填,至少存在一条数据!")
          return
        }
      }

      dsf.http.post("fn/commonTool/getIdByTableName", { "tableName": "rq_space_requirement_item", "dbName": "ImBzServiceConnection" }).then(({ data }) => {
        let maxid = data.data.id
        if (!vueData.pk) {
          rows1.forEach((element, index) => {
            vueData.$set(element["220501153547qw43AZvDPsYnhAQVz1p"], 'value', parseInt(maxid) + index)
          });
        } else {
          let rowIndex1 = 0
          rows1.forEach((element, index) => {
            if (element.action == "Added") {
              vueData.$set(element["220501153547qw43AZvDPsYnhAQVz1p"], 'value', parseInt(maxid) + rowIndex1)
              rowIndex1++
            }
          });
        }

        if (!vueData.pk) {
          dsf.http.post("fn/commonTool/getIdByTableName", { "tableName": "rq_space_requirement_process", "dbName": "ImBzServiceConnection" }).then(({ data }) => {
            //fn/UpdateGNRInfoController/updateInfo
            dsf.http.post("fn/UpdateGNRInfoController/updateInfo", { moduleId: vueData.moduleId, oldId: vueData.formParams.pk, newId: data.data.id }).then(({ data }) => {
              console.log("fn/UpdateGNRInfoController/updateInfo", data)
            });

            let temp_pk = data.data.id
            vueData.pk = temp_pk
            vueData.formParams.pk = temp_pk
            vueData.$set(formStruct.parameters, 'pk', temp_pk)
            vueData.$set(formData.main, 'A0001', { value: temp_pk })
            resolve()
          })
        } else {
          resolve();
        }
      })
    } catch (error) {
      resolve()
    }
  })
}

export default exportObj;
