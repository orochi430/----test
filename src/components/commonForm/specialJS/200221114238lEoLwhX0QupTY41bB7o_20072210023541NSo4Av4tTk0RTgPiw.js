/**
 * 资产信息[江西发改委]
 */
import dsf from "../../../common";
const exportObj = {};

// 部门查询
let getDeptByUser = (userId, vueData) => {
  dsf.http.post(`fn/assets/getDeptByUser`, {
    userId: userId
  })
    .done(res => {
      if (res.type == "success") {
        vueData.$set(vueData.formData.main, "B0051", {
          value: res.data.deptId,
          text: res.data.deptName,
          schema: res.data.schema
        })
      } else {
        // dsf.layer.toast(res.message);
        console.log("getDeptByUser-error", res.message)
      }
    })
}

// 办公地点
let getLocation = (params, formData) => {
  dsf.http.post(`fn/assets/getLocation`, params)
    .done(res => {
      if (res.type == "success") {
        formData.main["B0045"].value = res.data;
      } else {
        // dsf.layer.toast(res.message);
        console.log("getLocation-error", res.message)
      }
    })
}

exportObj.initHandle = function (formData, formStruct, vueData) {
  // 扫码登记时从url获取资产编号
  let code = vueData.$route.query.code;
  if (code) {
    vueData.$set(formData.main, "C-ERP-OFFICE-REPAIR-0001", { value: code });
    // 从缓存里获取上一次保存的资产数据
    let assetInfoTemp = dsf.util.loadSessionStore("assetInfoTemp");
    if (assetInfoTemp) {
      for (let key of Object.keys(assetInfoTemp)) {
        vueData.$set(formData.main, key, assetInfoTemp[key])
      }
    }
  }

  // 资产管理员的相关处理
  setRole(formStruct);

  // 监控表单控件值变化，改变其他控件值
  // 选人
  vueData.$watch(function () {
    return formData.main["C-ERP-OFFICE-REPAIR-0016"];
  }, function (newValue, oldValue) {
    console.log("C-ERP-OFFICE-REPAIR-0016", formData.main["C-ERP-OFFICE-REPAIR-0016"])
    getDeptByUser(newValue.value, vueData);
    getLocation({ userId: newValue.value }, formData);
  }, {
    deep: true
  })
  // 选部门
  vueData.$watch(function () {
    return formData.main["B0051"];
  }, function (newValue, oldValue) {
    console.log("B0051", formData.main["B0051"])
    if (!(formData.main["C-ERP-OFFICE-REPAIR-0016"] && formData.main["C-ERP-OFFICE-REPAIR-0016"].value)) {
      getLocation({ deptId: newValue.value }, formData);
    }
  }, {
    deep: true
  })
}

exportObj.saveFilter = function (formData, formStruct, vueData) {
  return new Promise(function (resolve, reject) {
    try {
      // let today = dsf.date.format(new Date(), "yyyy-mm-dd")
      resolve()
    } catch (error) {
      resolve()
    }
  })
}

// 保存并下一个
exportObj.saveToNext = function (formData, formStruct, vueData) {
  // 保存资产数据缓存
  let assetInfoTemp = {
    "C-ERP-OFFICE-REPAIR-0011": formData.main["C-ERP-OFFICE-REPAIR-0011"],
    "C-ERP-OFFICE-REPAIR-0016": formData.main["C-ERP-OFFICE-REPAIR-0016"],
    "B0051": formData.main["B0051"],
    "B0045": formData.main["B0045"]
  };
  dsf.util.saveToSessionStore("assetInfoTemp", assetInfoTemp);
  // 保存表单
  vueData.buttonHandle["save"](
    vueData.$route.params,
    vueData.formMeta,
    vueData.formData,
    vueData,
    vueData.$refs,
    undefined
  );
  // 调用扫码
  scan(vueData);
}

// 扫码
let scan = (vueData) => {
  if (dsf.util.getClientName() == 'app') {
    xsfBarcode.scan(
      (res) => {
        console.log("scan", res)
        if (!res.cancelled) {
          warehouse(res.text, vueData);
        }
      },
      (error) => {
        alert("扫码失败: " + error);
      }
    )
  } else if (dsf.dd) {
    dsf.dd.scan(
      function (res) {
        //--调用成功;
        console.log("scan", res)
        warehouse(res.text, vueData);
      },
      function (err) {
        console.log("scan", err);
      }
    );
  }
}

// 入库
let warehouse = function (barcode, vueData) {
  if (barcode) {
    // 入库校验
    dsf.http.post(`fn/assets/checkCode`, {
      code: barcode
    })
      .done(result => {
        if (result.type == "success") {
          if (result.data == 0) { // 未入库
            vueData.$router.replace({
              path: `/commonForm/${vueData.$route.params.moduleId}`,
              query: {
                code: barcode,
                listId: "220419142256re4o43jBcG0Kukg3w4E",
                method: "ydedit"
              }
            });
          } else { //已入库
            dsf.layer.alert({
              // title: '温馨提示',
              message: `该条码已完成入库登记`
            })
          }
        } else {
          // dsf.layer.toast(`${result.message}`);
          dsf.layer.alert({
            // title: '温馨提示',
            message: `${result.message}`
          })
        }
      })
      .error(error => {
        console.log('checkCode-error =', error);
        // dsf.layer.toast("登录失败！");
        dsf.layer.alert({
          // title: '温馨提示',
          message: `${error}`
        })
      })
      .always(() => {
        // self.loading = false;
      });
  } else {
    dsf.layer.alert({
      // title: '温馨提示',
      message: `无效的条形码`
    })
  }
}

let setRole = function (formStruct) {
  dsf.http.get(`fn/getUser/getRole`)
    .done(result => {
      if (result.type == "success") { // 单位资产管理员的【使用人】、【使用部门】选择范围修改为本机构
        let userCtl = formStruct.controls.find(item => item.metaId == "C-ERP-OFFICE-REPAIR-0016");
        if (userCtl) {
          userCtl.extra.tabs[0] = {
            action: `fn/user/select/data?types=person&rootObject=5&action=self_org&async=true&moduleId=${formStruct.parameters.moduleId}`,
            name: "本机构",
            subTabKey: "department"
          }
        }
        let deptCtl = formStruct.controls.find(item => item.metaId == "B0051");
        if (deptCtl) {
          deptCtl.extra.tabs[0] = {
            action: `fn/user/select/data?types=department&rootObject=5&action=self_org&async=true&moduleId=${formStruct.parameters.moduleId}`,
            name: "本机构",
            subTabKey: "department"
          }
        }
        console.log("formStruct", formStruct);
      }
    })
    .error(error => {
      console.log('getRole-error =', error);
      // dsf.layer.toast("登录失败！");
    })
    .always(() => {
      // self.loading = false;
    });
}

export default exportObj;