//公司OA项目启动新建按钮
const exportObj = {};

// 登记并签收
exportObj.signAndRegister = function (itemValue, vueData) {
  dsf.http.post('/ctrl/langChaoExchange/sign', {
    pk: itemValue.dataValue['A0001'],
    moduleId: vueData.moduleId,
    type: "signAndRegister"
  }).then(res => {
    if (res.data.code == 200) {
      // vueData.$router.push(`/commonForm/${vueData.moduleId}/${itemValue.dataValue['A0001']}?initDataSource=1&title=远程来文单`)
      let targetModuleId = "2104151345405ZeTzAKtGjhETATcbFX";
      dsf.http.post("ctrl/langChaoExchange/getCllx", {
        pk: itemValue.dataValue['A0001'],
        moduleId: vueData.moduleId
      }).then(res => {
        if (res.data.type == "success") {
          targetModuleId = res.data.data.targetModuleId;
        }
        moduleConvertEx(targetModuleId, vueData.moduleId, itemValue.dataValue['A0001'], null, null, null, vueData)
      })
      // vueData.$router.push(`/commonForm/2104151345405ZeTzAKtGjhETATcbFX/2107031558381ZeW7JWkFc2ye23GMeO?initDataSource=1`)
    } else {
      dsf.layer.toast(res.data.message);
    }
  })
}
// 签收
exportObj.sign = function (itemValue, vueData) {
  // window.location.reload()
  dsf.http.post('/fn/langChaoExchange/sign', {
    pk: itemValue.dataValue['A0001'],
    moduleId: vueData.moduleId,
    type: "sign"
  }).then(res => {
    if (res.data.code == 200) {
      dsf.layer.toast(res.data.message);
      itemValue.dataValue['220628192036TRcNEHIoX492IklySWp'] = "已签收"
      itemValue.dataValue['220628192036TRcNEHIoX492IklySWp.text'] = "已签收"
      itemValue.dataValue['220628192036TRcNEHIoX492IklySWp.value'] = "1"

      itemValue.buttons.mainButtons.forEach(item => {
        if (item.action === 'signAndRegister') {
          item.condition = 'false'
        } else if (item.action === 'sign') {
          item.condition = 'false'
        }
      })
      window.location.reload()
    } else {
      dsf.layer.toast(res.data.message);
    }
  })
}
// 登记
exportObj.register = function (itemValue, vueData) {
  dsf.http.post('/fn/langChaoExchange/register', {
    pk: itemValue.dataValue['A0001']
  }).then(res => {
    if (res.data.code == 200) {
      let targetModuleId = "2104151345405ZeTzAKtGjhETATcbFX";
      dsf.http.post("ctrl/langChaoExchange/getCllx", {
        pk: itemValue.dataValue['A0001'],
        moduleId: vueData.moduleId
      }).then(res => {
        if (res.data.type == "success") {
          targetModuleId = res.data.data.targetModuleId;
        }
        moduleConvertEx(targetModuleId, vueData.moduleId, itemValue.dataValue['A0001'], null, null, null, vueData)
      })

    } else {
      dsf.layer.toast(res.data.message)
    }

  })
}

function moduleConvertEx(targetModule, srcModule, sourcePk, callback, errorCallback, opts, vueData) {
  opts = opts || {};
  let initData = opts.initData;
  let postData = {
    sourceModule: srcModule,
    targetModule: targetModule,
    srcInfo: sourcePk,
  };
  opts.convertParams = postData;

  function dataConvertEx() {
    if (targetModule && srcModule) {
      let result = dsf.http.post("ctrl/convert/moduleConvert", postData).then(result => {
        let exeAfterModuleConvertEx = false;
        let callbackResult;
        if (callbackResult === undefined || callbackResult === false) {
          if ("success" == result.data.type) {
            if (result.data.data["jump"] == "0") {} else if (result.data.data["jump"] == "-1") { //转换至拟稿节点
            } else {
              let openFlowNode = result.data.data["openFlowNode"] || "";
              let queryValue = {
                reloadParentFormOnSave: true,
                srcModule: srcModule,
              }
              let paramsValue = {
                pk: result.data.data.pk,
                moduleId: targetModule
              }
              if (openFlowNode) {
                queryValue.listId = 'customConvertOpenBean';
                queryValue.method = 'viewList';
                queryValue.openFlowNode = openFlowNode;
              }
              vueData.$router.push({
                name: "commonForm",
                params: {
                  ...paramsValue
                },
                query: {
                  ...queryValue
                }
              });
            }

            //是否刷新当前表单
            if (result.data.data && result.data.data["reloadForm"] == 1) {
              window.location.href = window.location.href;
            }
          } else {
            dsf.layer.toast(result.data.messagee);
          }
        }
      })
    }
  }


  //需要文件限制
  dsf.http.post("ctrl/convert/fileConvertCount",
    postData
  ).then(result => {
    if ("success" == result.data.type) { //取值
      let canCount = parseInt(result.data["data"]);
      if (canCount == -1) {
        dataConvertEx();
      } else if (canCount == 0) {
        dsf.layer.toast("转换生成文件已达到设定限制！")
      } else if (canCount > 0) {
        dsf.layer.confirm({
          message: "已存在" + canCount + "个转换文件，请确认是否继续转换生成新文件？",
          confirmButtonText: '确认',
        }, () => {
          dataConvertEx();
        })
      }
    }
  })
};
export default exportObj;
