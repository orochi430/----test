(function () {
  // 监狱局发文
  const exportObj = {};
  exportObj.initHandle = function (formData, formStruct, vueData) {
    const date = new Date();
    const timer = '(' + date.getFullYear() + '年' + date.getMonth() + 1 + '月' + date.getDate() + '日网上送';
    vueData.$bus.on("selectUserBus", function (data) {
      console.log(data);
      const startIndex =
        formData.main["C-LW-0020"].value.indexOf("(") > 0
          ? formData.main["C-LW-0020"].value.indexOf("(")
          : formData.main["C-LW-0020"].value.indexOf("（");
      let str;
      if (startIndex > 0) {
        str = formData.main["C-LW-0020"].value.substring(0, startIndex);
      } else {
        str = formData.main["C-LW-0020"].value;
      }
      if (
        data.metaData.metaId == "231108191959tfZNthjlvJV7KG6Arxl" ||
        data.metaData.metaId == "231108180835dyFIiEmgMduqaOCddqm"
      ) {
        // let Arr = [formData.main["231108191959tfZNthjlvJV7KG6Arxl"].text, formData.main["231108180835dyFIiEmgMduqaOCddqm"].text, formData.main['B0026'].value]
        // let Arr1 = Arr.filter(item => item.trim() !== '');
        let result = []
        // Arr1.forEach((ele, i) => {
        //   if (i == Arr1.length - 1) {
        //     result += ele
        //   } else {
        //     result += ele + ','
        //   }
        // })
        let zbDeptIds = formData.main["231108191959tfZNthjlvJV7KG6Arxl"].value; //主办部门ID
        let xbDeptIds = formData.main["231108180835dyFIiEmgMduqaOCddqm"].value; //协办部门ID
        let cyUserIds = formData.main['2401081046481B8P4CnHlZ5ur66GiSU'].value; //传阅人ID
        let deptIds = zbDeptIds + ',' + xbDeptIds;
        // 部门去重以及按组织架构顺序反显---bug1299
        dsf.http.post(`ctrl/correctionsSw/queryOneLevelDeptByDeptIds`,  {
          deptIds: deptIds,
          cyUserIds: cyUserIds
        })
        .then((res) => {
          console.log(res.data);
          if(res.data.code == '200' && res.data.data) {
            res.data.data.forEach(el => {
              result.push(el.orgName)
            });
            if (result.length > 0) {
              vueData.$set(formData.main, 'C-LW-0020', { value: `${str + timer + result.join(',')})` })
            } else {
              vueData.$set(formData.main, 'C-LW-0020', { value: `${str}` })
            }
    
            vueData.$set(formData.main, "230613203719weEOibmjvClyYSTSovA", {
              value:
                // formData.main["231108191959tfZNthjlvJV7KG6Arxl"].value +
                // formData.main["231108180835dyFIiEmgMduqaOCddqm"].value +
                // formData.main["B0050"].value,
                deptIds + cyUserIds
            });
          }
        })
      }
    });
    vueData.$bus.on("checkVal", function (data) {
      if (data.metaData.metaId == "B0056") {
        vueData.buttonHandle["saveNoTip"](
          vueData.$route.params,
          vueData.formMeta,
          vueData.formData,
          vueData,
          () => {
            vueData.initData();
          },
          // render(),
          false
        );
        console.log(data);
        if (data.value == "2") {
          //阅件
          const startIndex =
            formData.main["C-LW-0020"].value.indexOf("(") > 0
              ? formData.main["C-LW-0020"].value.indexOf("(")
              : formData.main["C-LW-0020"].value.indexOf("（");
          let str;
          if (startIndex > 0) {
            str = formData.main["C-LW-0020"].value.substring(0, startIndex);
          } else {
            str = formData.main["C-LW-0020"].value;
          }
          console.log(str);
          if (formData.main["B0026"].value) {
            vueData.$set(formData.main, "C-LW-0020", {
              value: `${str}${timer}${formData.main["B0026"].value})`,
            });
          } else {
            vueData.$set(formData.main, "C-LW-0020", {
              value: `${str}`,
            });
          }

          vueData.$set(formData.main, "230613203719weEOibmjvClyYSTSovA", {
            value: "",
          });
          vueData.$set(formData.main, "231108191959tfZNthjlvJV7KG6Arxl", {
            schema: "",
            text: "",
            value: "",
          });
          vueData.$set(formData.main, "231108180835dyFIiEmgMduqaOCddqm", {
            schema: "",
            text: "",
            value: "",
          });
        }
        
      }
    });
    function render() {
      setTimeout(() => {
        vueData.initData();
      }, 1000);
    }
    
    isSendBack(formStruct.parameters.pk, formStruct)
  };
  // 退回到秘书科办文节点时，只有办结按钮---bug1298
  function isSendBack(pk, formStruct) {
    if (formStruct.parameters.nodeId == 'HIGR2SVDhWhmHMR') {
      dsf.http.post(`ctrl/correctionsSw/isSendBack`,  {
        pk: pk,
      })
      .then((res) => {
        if (res.data.code == '200' && res.data.data) {
          formStruct.buttons.mainButtons = formStruct.buttons.mainButtons.filter((btn) => btn.action == "xform.endNode");
          formStruct.buttons.commonButtons = formStruct.buttons.commonButtons.filter((btn) => btn.action == "xform.endNode");
        } else {
          formStruct.buttons.mainButtons = formStruct.buttons.mainButtons.filter((btn) => btn.action != "xform.endNode");
          formStruct.buttons.commonButtons = formStruct.buttons.commonButtons.filter((btn) => btn.action != "xform.endNode");
        }
      });
    }
  }

  exportObj.initDataAfter = function (formData, formStruct, VueData) {
    isSendBack(formStruct.parameters.pk, formStruct)
  }

  exportObj.SelectCyUnit = function (formData, formStruct, VueData) {
    VueData.showPerson = true;
    VueData.extra = {
      typesString: "person,department,post,group,privateGroup",
      rootObject: "5",
      multiple: true,
      tabs: [
        {
          name: "传阅单位",
          key: "self_org",
          action: `fn/jyjFw/getDeptUserForSelect`,
          urlParams: {},
        },
        {
          name: "群组",
          key: "canonical_group-public-private",
          action: `fn/user/select/data?types=person&rootObject=2&action=canonical_group-public-private&async=true`,
          urlParams: {},
        }
      ],
    };
    const startIndex = formData.main['C-LW-0020'].value.indexOf("(") > 0 ? formData.main['C-LW-0020'].value.indexOf("(") : formData.main['C-LW-0020'].value.indexOf("（");
    let str
    if (startIndex>0) {
      str = formData.main['C-LW-0020'].value.substring(0, startIndex)
    }else{
      str = formData.main['C-LW-0020'].value
    }
    const date = new Date();
    const timer = '(' + date.getFullYear() + '年' + date.getMonth() + 1 + '月' + date.getDate() + '日网上送';
    // 重写选人确认后的getSelectUser方法，调用接口
    VueData.getSelectUser = function (data) {
      console.log(data);
      let id = "";
      let name = "";
      let deptId = "";
      let deptName = "";
      data.forEach((ele, i) => {
        i == 0 ? (id += ele.id) : (id += "," + ele.id);
        i == 0 ? (name += ele.name) : (name += "," + ele.name);
      });

      dsf.http
      .post("ctrl/correctionsSw/queryReadDept", {
        userIds: id,
      })
      .then((res) => {
        console.log(res.data.data);
        if (res.data.code == "200") {
          res.data.data.forEach((item, i) => {
            if(item.is_main_unit == '1'){
              if (!deptName.includes(item.org_name)) {
                i == 0 ? (deptId += item.dept_id) : (deptId += "," + item.dept_id);
                i == 0 ? (deptName += item.org_name) : (deptName += "," + item.org_name);
              }
            }else{
              if (!deptId.includes(item.unit_id)) {
                i == 0 ? (deptId += item.unit_id) : (deptId += "," + item.unit_id);
                i == 0 ? (deptName += item.unit_name) : (deptName += "," + item.unit_name);
              }
            }
          })
          VueData.$set(formData.main, "24010816055072BL2adM6jMvvxPPegn", {
            value: name,
          });  //传阅人名称
          VueData.$set(formData.main, "2401081046481B8P4CnHlZ5ur66GiSU", {
            value: id,
          });  //传阅人ID
          VueData.$set(formData.main, "B0026", {
            value: deptName,
          });  //传阅单位名称
          VueData.$set(formData.main, "B0050", {
            value: deptId,
          });  //传阅单位ID
          // let Arr = [formData.main["231108191959tfZNthjlvJV7KG6Arxl"].text, formData.main["231108180835dyFIiEmgMduqaOCddqm"].text, deptName]
          // let Arr1 = Arr.filter(item => item.trim() !== '');
          let result = []
          // Arr1.forEach((ele, i)=>{
          //   if(i == Arr1.length - 1){
          //     result += ele
          //   }else{
          //     result += ele + ','
          //   }
          // })
          // if (result) {
          //   VueData.$set(formData.main, 'C-LW-0020', { value: `${str + timer + result})` })
          // }else{
          //   VueData.$set(formData.main, 'C-LW-0020', { value: `${str}` })
          // }

          // VueData.$set(formData.main, '230613203719weEOibmjvClyYSTSovA', { value: formData.main['231108191959tfZNthjlvJV7KG6Arxl'].value + formData.main['231108180835dyFIiEmgMduqaOCddqm'].value + formData.main['B0050'].value })
          let zbDeptIds = formData.main["231108191959tfZNthjlvJV7KG6Arxl"].value; //主办部门ID
          let xbDeptIds = formData.main["231108180835dyFIiEmgMduqaOCddqm"].value; //协办部门ID
          let cyUserIds = id; //传阅人ID
          let deptIds = zbDeptIds + ',' + xbDeptIds;
          // 部门去重以及按组织架构顺序反显---bug1299
          dsf.http.post(`ctrl/correctionsSw/queryOneLevelDeptByDeptIds`,  {
            deptIds: deptIds,
            cyUserIds: cyUserIds
          })
          .then((res) => {
            console.log(res.data);
            if(res.data.code == '200' && res.data.data) {
              res.data.data.forEach(el => {
                result.push(el.orgName)
              });
              if (result.length > 0) {
                VueData.$set(formData.main, 'C-LW-0020', { value: `${str + timer + result.join(',')})` })
              } else {
                VueData.$set(formData.main, 'C-LW-0020', { value: `${str}` })
              }
              VueData.$set(formData.main, '230613203719weEOibmjvClyYSTSovA', { value: deptIds + cyUserIds })
            }
          })
          VueData.showPerson = false;
        }
      });


    };
  }

  exportObj.Circulation = function (formData, formStruct, VueData) {
    let message
    if (formData.main["B0050"].value) {
      message = '请确认是否发送'
    }else{
      message = '您还未选择传阅单位，此操作会直接办结收文流程，请谨慎操作'
    }
    let todoData = [{
      pk: formData.main["A0001"].value,
      pnid: formStruct.parameters.pnId,
      isNeedOpinion: '-1'
    }]
    dsf.layer.confirm(
      {
        message: message,
        confirmButtonText: "确认",
      },
      () => {
        VueData.buttonHandle["save"](
          VueData.$route.params,
          VueData.formMeta,
          VueData.formData,
          VueData,
          VueData.$refs,
          shareSend
        );
      }
    );
    let shareSend = function () {
      dsf.http
        .post(`ctrl/correctionsSw/shareSend`,  {
          pk: formData.main["A0001"].value,
          todoData: JSON.stringify(todoData)
        })
        .then((res) => {
          if (res.code = '200' || res.data.code == '200') {
            dsf.layer.toast(res.data.message);
            VueData.backSucces();
          }
        });
    };
  }

  exportObj.saveFilter = function (formData, formStruct, vueData, action) {
    console.log(vueData);
    return new Promise(function (resolve, reject) {
      if (
        vueData.nowButton?.name == "送部门办理" &&
        !formData.main["231108191959tfZNthjlvJV7KG6Arxl"].value
      ) {
        reject("请填写办理部门");
      } else {
        resolve();
      }
    });
  };

  //保存后事件
  exportObj.saveAfter = function (vueData, formStruct, formData, action) {
    dsf.http
      .post("ctrl/correctionsSw/saveOp", {
        pk: vueData.formMeta.parameters.pk,
        moduleId: vueData.formMeta.parameters.moduleId,
      })
      .then({});
  };

  window.spJS = exportObj;
})();
