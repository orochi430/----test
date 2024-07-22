(function () {
  const exportObj = {};
  // 会议个人报名--jf
  exportObj.beforeInitAsync = function (formData, formStruct, vueData) {
    if (formStruct.parameters.todoId) {
      vueData.isShowForm = false;
      // 代办跳转报名单
      dsf.http
        .post("/fn/meetingNotice/getNoticeDataByInbox", {
          pk: formData.main["A0001"].value,
          pnId: formStruct.parameters.pId,
        })
        .then((res) => {
          if (
            res &&
            res.data &&
            res.data.code == "200" &&
            res.data.data &&
            res.data.data.noticeModuleId == "190121161348OthBI4s3sEhvfuDJ5FD" &&
            formStruct.parameters.todoId
          ) {
            console.log("跳转到通知单");
            vueData.$router.replace({
              path: `/commonForm/${res.data.data.noticeModuleId}/${res.data.data.noticeId}?listId=MeetingList&method=viewTzD&validateByList=1&bmStatus=1`,
              query: {
                signUpPk: res.data.data.id,
                signUpModuleId: res.data.data.moduleId,
                sendStatus: res.data.data.sendStatus ? 1 : -1,
                noticeType: res.data.data.noticeType,
                hyTzlx: res.data.data.noticeType,
                hytzStatus: res.data.data.hytzStatus,
              },
            });
            vueData.isShowForm = true;
          } else {
            console.log("不用跳转");
          }
        });
    }
  };
  exportObj.initHandle = function (formData, formStruct, vueData) {
    // vueData.$set(formData.main['A0005'], 'value', '报名回执单');
    console.log("个人报名");
    vueData.$bus.on("getUser", function (data) {
      if (data.metaData.metaId == "c-meetingtz-071") {
        vueData.$bus.emit(
          "codeSelect",
          `&excludeIds=${dsf.util.loadSessionStore("user").user_id}`
        );
      }
    });

    if (vueData.formTabs) {
      let tab = vueData.formTabs.findIndex((tab) => tab.title == "流转情况");
      if (tab >= 0) {
        vueData.formTabs.splice(tab, 1);
      }
    }

    let SubTableId = ""; //修改某个子表人员时，判断是哪个子表的修改
    if (vueData && vueData.$route.query) {
      if (vueData.$route.query.type == 1) {
        vueData.$set(formData.main["c-meetingtz-070"], "value", 1);
        vueData.$set(formData.main["c-meetingtz-070"], "text", "参会");
        RenderForm(1);
      } else if (vueData.$route.query.type == 2) {
        vueData.$set(formData.main["c-meetingtz-070"], "value", 2);
        vueData.$set(formData.main["c-meetingtz-070"], "text", "请假");
        RenderForm(2);
      } else if (vueData.$route.query.type == 3) {
        vueData.$set(formData.main["c-meetingtz-070"], "value", 3);
        vueData.$set(formData.main["c-meetingtz-070"], "text", "委托他人");
        RenderForm(3);
      }
    }
    if (formData.main["C-MEETINGTZ-044"].value == "-2") {
      vueData.$set(formData.main["c-meetingtz-070"], "text", "参会");
    }
    RenderList();



    // 子表选择姓名时 获取人员信息填入
    vueData.$bus.on("selectUserBus", function (busObj) {
      if (busObj.metaData.metaId == "c-meetingchry-002") {
        let userId = busObj.value;
        dsf.http
          .post("fn/meetingNotice/getUserDept", {
            userId: userId,
          })
          .then((res) => {
            for (let key in formData.multinfos) {
              formData.multinfos[key].rows.forEach((ele, i) => {
                if (key != SubTableId && ele["c-meetingchry-002"].value == res.data.data.userId) {
                  dsf.layer.toast("重复选择，请重新选择！");
                  formData.multinfos[SubTableId].rows.splice(busObj.subFormIndex, 1);
                } else if (key == SubTableId&&busObj.subFormIndex !=i && ele["c-meetingchry-002"].value == res.data.data.userId) {
                  dsf.layer.toast("重复选择，请重新选择！");
                  formData.multinfos[SubTableId].rows.splice(busObj.subFormIndex, 1);
                }
              });
            }
          });
      }
    });

    // 新增人员填充
    vueData.$bus.on("subFormTreeSelect", function (busObj) {
      let haveArr = []
      let seleArr = []
      for (let key in formData.multinfos) {  // 表单上已有的子表数据
        formData.multinfos[key].rows.forEach((ele) => {
          haveArr.push(ele["c-meetingchry-002"].value)
        });
      }
      busObj.selectArr.forEach(ele=>{    // 去重
        if (!haveArr.includes(ele.id)) {
          seleArr.push(ele)
        }
      })
      const requests = seleArr.map(item => {
        return getUser(item.id, item.attrs.deptId)
      });
      Promise.all(requests)
        .then(results => {
          if (vueData.$refs?.formTab[0]?.$refs[busObj.subFormId][0]) {
            vueData.$refs.formTab[0].$refs[busObj.subFormId][0].$refs.subform
              .addMultipleCard(requests.length)
              .then((newDataArr) => {
                console.log(newDataArr);
                results.forEach((user, index) => {
                  JudgeList(newDataArr[index], user);
                })
              })
              .then(() => {
                RenderList();
              });
          }
        })

      function getUser(userId, deptId) {
        return dsf.http.post("fn/meetingNotice/getUserDept", {
          userId: userId,
          deptId: deptId,
        })
          .then((res) => res.data.data);
      }
    });

    vueData.$bus.on("getSelectUser", function (busObj) {
      debugger;
    });

    vueData.$bus.on("selectUserBus", function (busObj, data) {
      console.log('SelectUserBus', data);
      if (busObj.metaData.metaId == "c-meetingtz-071") {
        let PersonId = dsf.util.loadLocalStore("user").user_id;
        formStruct.controls.forEach((ele) => {
          if (ele.metaId == "200820104728nFPSM393YR9lLLDqjVy")
            vueData.$set(ele, "show", 1);
        });
        dsf.http
          .post("fn/meetingNotice/getUserDept", {
            userId: busObj.selectArr[0].id,
            deptId: busObj.selectArr[0].attrs.deptId,
          })
          .then((res) => {
            if (res.data.code == "200") {
              JudgeList(
                formData.multinfos["200820104728nFPSM393YR9lLLDqjVy"].rows[0],
                res.data.data
              );
            }
          });
      }
    });

    function RenderList() {
      // 隐藏不需要显示的子表列
      let SubArr = [
        "c-meetingchry-003",
        "c-meetingchry-004",
        "c-meetingchry-002",
        "c-meetingchry-0010",
      ];
      if (formData && formData.main["c-meetingtz-057"].value) {
        SubArr = formData.main["c-meetingtz-057"].value.split(",");
      }
      vueData.$set(
        formStruct.subform["200820104728nFPSM393YR9lLLDqjVy"].controls[0]
          .privilege,
        "editable",
        false
      ); //参会子表不可删除
      for (let key in formStruct.subform) {
        if (key != "210812180520LFh4HCmmYKhau77Bubo") {
          formStruct.subform[key].controls.forEach((row) => {
            row.privilege.visible = SubArr.includes(row.metaId) ? true : false;
          });
        }
      }
      // 查看节点参会人、随行人子表动态显隐bug
      for (let key in formStruct.subform) {
        if (vueData.formData.multinfos[key]) {
          vueData.$watch(
            function () {
              return vueData.formData.multinfos[key].rows;
            },
            function (n, o) {
              SubTableId = key;
              if (key != "210812180520LFh4HCmmYKhau77Bubo") {
                formData.multinfos[key].rows.forEach((row) => {
                  row.structControl.forEach((ele) => {
                    ele.show = SubArr.includes(ele.metaId) ? 1 : 0;
                  });
                });
              }
            },
            {
              deep: true,
              immediate: true,
            }
          );
        }
      }
      if (vueData.formMeta.parameters.nodeId == "15") {
        vueData.$set(
          formStruct.subform["22072016505548iml1jHscuhcmr562k"].controls[0]
            .privilege,
          "editable",
          false
        ); //随行人员子表查看节点不可编辑
      }
    }

    function JudgeList(data, person) {
      vueData.$set(data, "c-meetingchry-002", {
        value: person.userId,
        text: person.userName,
        schema: "1::" + person.deptId,
      }); //姓名
      vueData.$set(data, "c-meetingchry-004", {
        value: person.deptId,
        text: person.deptName,
        schema: "5::" + person.deptId,
      }); //部门
      vueData.$set(data, "c-meetingchry-003", {
        value: person.unitId,
        text: person.unitName,
        schema: "5::" + person.unitId,
      }); //单位
      vueData.$set(data, "c-meetingchry-0010", {
        value: person.userMobile,
      }); //联系方式

      vueData.$set(data, "c-meetingchry-0011", {
        value: person.deptUserOrder,
      }); //部门内排序
      vueData.$set(data, "c-meetingchry-0017", {
        value: person.deptGlobalShoworder,
      }); //部门全局顺序
      vueData.$set(data, "B0001", {
        value: person.zw || "",
      }); //职务
      if (person.orgIdLV1) {
        vueData.$set(data, "c-meetingchry-0012", {
          value: person.orgIdLV1,
          text: person.orgNameLV1,
          schema: "5::" + person.orgIdLV1,
        }); //一级部门
      }

      if (person.orgIdLV2) {
        vueData.$set(data, "c-meetingchry-0013", {
          value: person.orgIdLV2,
          text: person.orgNameLV2,
          schema: "5::" + person.orgIdLV2,
        }); //二级部门
      }
      if (person.orgIdLV3) {
        vueData.$set(data, "c-meetingchry-0014", {
          value: person.orgIdLV3,
          text: person.orgNameLV3,
          schema: "5::" + person.orgIdLV3,
        }); //三级部门
      }
      if (person.orgIdLV4) {
        vueData.$set(data, "c-meetingchry-0015", {
          value: person.orgIdLV4,
          text: person.orgNameLV4,
          schema: "5::" + person.orgIdLV4,
        }); //四级部门
      }
      if (person.orgIdLV5) {
        vueData.$set(data, "c-meetingchry-0016", {
          value: person.orgIdLV5,
          text: person.orgNameLV5,
          schema: "5::" + person.orgIdLV5,
        }); //五级部门
      }
    }

    function RenderForm(type) {
      if (type == 1) {
        formStruct.controls.forEach((ele) => {
          if (ele.metaId == "c-meetingtz-029")
            vueData.$set(ele, "label", "说明");
          if (ele.metaId == "c-meetingtz-071")
            vueData.$set(ele, "label", "参会人");
          if (ele.label == "委托人") vueData.$set(ele, "label", "参会人");
          if (ele.metaId == "c-meetingtz-018") vueData.$set(ele, "show", 1);
          if (ele.metaId == "attach-3") vueData.$set(ele, "show", 1);
          if (ele.metaId == "c-meetingtz-015") vueData.$set(ele, "show", 1);
          if (ele.metaId == "c-meetingtz-070") vueData.$set(ele, "show", 0);
          if (ele.metaId == "c-meetingtz-071") vueData.$set(ele, "show", 0);
          if (ele.metaId == "200820104728nFPSM393YR9lLLDqjVy")
            vueData.$set(ele, "show", 1);
          if (ele.metaId == "controlMobileFl") vueData.$set(ele, "show", 1);
          if (ele.metaId == "22072016505548iml1jHscuhcmr562k")
            vueData.$set(ele, "show", 1);
          if (ele.metaId == "c-meetingtz-015") vueData.$set(ele, "show", 1);
          if (ele.metaId == "210812180520LFh4HCmmYKhau77Bubo")
            vueData.$set(ele, "show", 1);
        });
      } else if (type == 2) {
        formStruct.controls.forEach((ele) => {
          if (ele.metaId == "c-meetingtz-029")
            vueData.$set(ele, "label", "请假理由");
          if (ele.metaId == "c-meetingtz-018") vueData.$set(ele, "show", 0);
          if (ele.metaId == "attach-3") vueData.$set(ele, "show", 0);
          if (ele.metaId == "c-meetingtz-015") vueData.$set(ele, "show", 0);
          if (ele.metaId == "c-meetingtz-070") vueData.$set(ele, "show", 0);
          if (ele.metaId == "c-meetingtz-071") vueData.$set(ele, "show", 0);
          if (ele.metaId == "200820104728nFPSM393YR9lLLDqjVy")
            vueData.$set(ele, "show", 0);
          if (ele.metaId == "controlMobileFl") vueData.$set(ele, "show", 0);
          if (ele.metaId == "22072016505548iml1jHscuhcmr562k")
            vueData.$set(ele, "show", 0);
          if (ele.metaId == "c-meetingtz-015") vueData.$set(ele, "show", 0);
          if (ele.metaId == "210812180520LFh4HCmmYKhau77Bubo")
            vueData.$set(ele, "show", 0);
        });
      } else {
        formStruct.controls.forEach((ele) => {
          if (ele.metaId == "c-meetingtz-029")
            vueData.$set(ele, "label", "委托原因");
          if (ele.metaId == "c-meetingtz-071")
            vueData.$set(ele, "label", "委托人");
          if (ele.metaId == "c-meetingtz-018") vueData.$set(ele, "show", 0);
          if (ele.metaId == "attach-3") vueData.$set(ele, "show", 1);
          if (ele.metaId == "c-meetingtz-015") vueData.$set(ele, "show", 0);
          if (ele.metaId == "c-meetingtz-070") vueData.$set(ele, "show", 0);
          if (ele.metaId == "c-meetingtz-071") vueData.$set(ele, "show", 1);
          if (ele.metaId == "200820104728nFPSM393YR9lLLDqjVy")
            vueData.$set(ele, "show", 0);
          if (ele.metaId == "controlMobileFl") vueData.$set(ele, "show", 1);
          if (ele.label == "参会人") vueData.$set(ele, "label", "委托人");
          if (ele.metaId == "22072016505548iml1jHscuhcmr562k")
            vueData.$set(ele, "show", 1);
          if (ele.metaId == "c-meetingtz-015") vueData.$set(ele, "show", 1);
          if (ele.metaId == "210812180520LFh4HCmmYKhau77Bubo")
            vueData.$set(ele, "show", 1);
        });
      }
    }
  };
  exportObj.saveFilter = function (formData, formStruct, vueData) {
    if (
      formData.multinfos["200820104728nFPSM393YR9lLLDqjVy"].rows.length == 0
    ) {
      dsf.layer.toast("请选择参会人员！");
      return;
    }
    return new Promise(function (resolve, reject) {
      try {
        resolve();
      } catch (error) {
        resolve();
      }
    });
  };

  window.spJS = exportObj;
})();
