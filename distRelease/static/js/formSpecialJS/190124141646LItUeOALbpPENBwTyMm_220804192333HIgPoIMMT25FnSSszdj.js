(function () {
  // 会议单位报名--jf
  const exportObj = {};
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
    console.log("单位报名");
    if (vueData.$route.query.userId) {
      let UserId = vueData.$route.query.userId.split(",");
      let deptId = vueData.$route.query.deptId.split(",");
      UserId.forEach((item, index) => {
        getUser(item, deptId[index], "200820104728nFPSM393YR9lLLDqjVy");
      });
    }

    if (vueData.formTabs) {
      let tab = vueData.formTabs.findIndex((tab) => tab.title == "流转情况");
      if (tab >= 0) {
        vueData.formTabs.splice(tab, 1);
      }
    }
    let SubTableId = ""; //修改某个子表人员时，判断是哪个子表的修改
    // 选择参会人员时 获取人员信息填入
    vueData.$bus.on("subFormTreeSelect", function (busObj) {
      // console.log(busObj);
      busObj.selectArr.forEach((item, index) => {
        getUser(item.id, item.attrs.deptId, busObj.subFormId);
      });
    });
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

    RenderList();
    async function getUser(userId, deptId, subFormId) {
      await dsf.http
        .post("fn/meetingNotice/getUserDept", {
          userId: userId,
          deptId: deptId,
        })
        .then((res) => {
          // console.log(res.data);
          if (res.data.code == "200") {
            let data = res.data.data;
            let flag = true;
            formData.multinfos[subFormId].rows.forEach((ele) => {
              if (ele["c-meetingchry-002"].value == res.data.data.userId) {
                // dsf.layer.toast("重复选择，请重新选人！");
                flag = false;
              }
            });
            if (flag &&
              vueData.$refs?.formTab[0]?.$refs[subFormId][0]) {
              vueData.$refs.formTab[0].$refs[subFormId][0].$refs.subform
                .addCard(false)
                .then((newData) => {
                  JudgeList(newData, data);
                })
                .then(() => {
                  RenderList();
                });
            }
          }
        });
    }

    function RenderList() {
      // 根据回执项'c-meetingtz-057' 隐藏不需要显示的子表列
      let SubArr = [
        "c-meetingchry-003",
        "c-meetingchry-004",
        "c-meetingchry-002",
        "c-meetingchry-0010",
      ];
      if (formData && formData.main["c-meetingtz-057"].value) {
        SubArr = formData.main["c-meetingtz-057"].value.split(",");
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
      // vueData.$set(formStruct.subform['200820104728nFPSM393YR9lLLDqjVy'].controls[0].privilege, 'editable', false); //参会子表不可删除
      for (let key in formStruct.subform) {
        if (key != "210812180520LFh4HCmmYKhau77Bubo") {
          formStruct.subform[key].controls.forEach((row) => {
            row.privilege.visible = SubArr.includes(row.metaId) ? true : false;
          });
        }
      }
    }

    function JudgeList(data, person) {
      // console.log(data);
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
