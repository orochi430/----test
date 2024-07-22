(function () {
  // 会议议题征询单--jf

  // 会议议题征询单
  const exportObj = {};
  exportObj.handle = function (formData, formStruct) { };
  exportObj.initHandle = function (formData, formStruct, vueData) {
    console.log(vueData);
    vueData.$bus.on("checkVal", function (busObj) {
      console.log(busObj);
      if (busObj.metaData.metaId == "C-MEETINGAGENDA-0012") {
        vueData.$set(
          formData.main["B0001"],
          "value",
          `关于${busObj.text}的议题征询单`
        );
      }
    });

    vueData.$bus.on("selectUserBus", function (busObj) {
      console.log(busObj);
      if (busObj.metaData.metaId == "C-MEETINGAGENDA-004") {
        vueData.$set(
          formData.main["C-MEETINGAGENDA-008"],
          "value",
          busObj.selectArr.length
        );
      }
      if (busObj.metaData.metaId == "C-MEETINGAGENDA-0013") {
        vueData.$set(
          formData.main["C-MEETINGAGENDA-0014"],
          "value",
          busObj.selectArr.length
        );
      }
    });

    vueData.$watch(
      function () {
        return vueData.formData.main["C-MEETINGAGENDA-0014"].value;
      },
      function (n, o) {
        vueData.$set(
          formData.main["C-MEETINGAGENDA-0015"],
          "value",
          Number(formData.main["C-MEETINGAGENDA-008"].value || 0) +
          Number(formData.main["C-MEETINGAGENDA-0014"].value || 0)
        );
      },
      {
        deep: true,
        immediate: true,
      }
    );

    vueData.$watch(
      function () {
        return vueData.formData.main["C-MEETINGAGENDA-008"].value;
      },
      function (n, o) {
        vueData.$set(
          formData.main["C-MEETINGAGENDA-0015"],
          "value",
          Number(formData.main["C-MEETINGAGENDA-008"].value || 0) +
          Number(formData.main["C-MEETINGAGENDA-0014"].value || 0)
        );
      },
      {
        deep: true,
        immediate: true,
      }
    );

    vueData.$bus.$off("userClickBus").on("userClickBus", function (busObj) {
      return
      console.log(busObj)
      if (busObj.metaId == "C-MEETINGAGENDA-004" || busObj.metaId == "C-MEETINGAGENDA-0013") {
        if (busObj.user.attrs.noselect) {
          let ids
          busObj.user.children.forEach((element, i) => {
            element.checked = false
            if (i == 0) ids += element.attrs.idValue
            else ids += ',' + element.attrs.idValue
          });
          checkDeptUser(ids).catch(() => {
            busObj.callback2(busObj.user, true)
          })
        } else {
          if (busObj.user.checked) {
            checkDeptUser(busObj.user.attrs.idValue).catch(() => {
              busObj.user.checked = false
              busObj.callback(busObj.user)
            })
          }
        }

      }
    })

    vueData.$bus.$off("usercheckAllBus").on("usercheckAllBus", function (busObj) {
      return
      console.log(busObj)
      if ((busObj.metaId == "C-MEETINGAGENDA-004" || busObj.metaId == "C-MEETINGAGENDA-0013") && busObj.user.children && busObj.user.children.length > 0) {
        let ids
        busObj.user.children.forEach((element, i) => {
          element.checked = false
          if (i == 0) ids += element.attrs.idValue
          else ids += ',' + element.attrs.idValue
        });
        checkDeptUser(ids).catch(() => {
          busObj.callback(busObj.user, true)
        })

      }
    })

    //判断部门是否有接收人
    function checkDeptUser(deptIds) {
      let loading = dsf.layer.loading('操作中')
      return new Promise((resolve, reject) => {
        dsf.http.post('ctrl/meetingRole/validDeptRoleUserNum', {
          deptIds: deptIds,
          moduleId: vueData.moduleId
        }).then(res => {
          dsf.layer.closeLoading(loading)
          if (res.data?.data?.valid == '1') {
            dsf.layer.toast(res.data.data.msg)
            reject()
          } else {
            resolve()
          }
        })
      })
    }

    vueData.refreshListKey = Math.random(); // 刷新列表组件
    vueData.commonPopParam = {
      listId: "210731153816nI4Ajx2pjB2mnhXB76o",
      moduleId: "210607181937YJxUC5fve4y7q3SH5hJ",
      params: {},
    };
  };

  exportObj.ytzxDepartSend = function (formData, formStruct, vueData) {
    vueData.buttonHandle["save"](
      vueData.$route.params,
      vueData.formMeta,
      vueData.formData,
      vueData,
      vueData.$refs,
      vueData.backSucces()
    );
  }



  window.spJS = exportObj;
})();
