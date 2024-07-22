//【山东中烟】 我的稿件表单 预览按钮 点击跳转预览组件
(function () {
  const exportObj = {};

  let flagNod = 0;
  exportObj.initHandle = function(formData, formStruct, vueData) {
    vueData.$bus.on("inputRadio", function(busObj) {
      if(busObj.metaData.metaId == "220728152838ABErMiX8iNNYZIFQlYU") {
        if(busObj.text == "是") {
          dsf.layer.toast("定时发布时间为表单上的发布时间！")
        }
      }
    })
  }
  exportObj.articlesPreview = function (formData, formStruct, vueData) {
    vueData.$router.push({
      name: 'SDYCManuscriptPre',
      query: {
        pk: formStruct.parameters.pk
      }
    })
  }

  exportObj.customSend = function (formData, formStruct, vueData) {
    flagNod = 1;
    vueData.saveNoTip(function () {
      vueData.buttonHandle["send"](
        vueData.$route.params,
        vueData.formMeta,
        vueData.formData,
        vueData,
        vueData.$refs,
      )
      flagNod = 0;
    })
  }

  exportObj.saveAfter = function (vueData, formStruct, formData) {
    if (flagNod == 2) {
      window.location.reload()
    }
  }

  //保存时 若没有流程id 则通过栏目获取流程id，赋值保存
  exportObj.saveFilter = function (formData, formStruct, vueData) {
    let val = formData.main["220524105451Lj6TCC3BUMVCIt4ly3t"].value;
    let mansuId = formData.main["2205231846224d52rmrM117EEAU6fZ2"].value || formData.main["A0006"].value;
    return new Promise(function (resolve, reject) {
      if (!mansuId) {
        dsf.http.post('fn/sdycYuegao/getManuscrID', {
          coluId: val
        }).then((res) => {
          if (res.data.code == "200") {
            vueData.$set(formData.main, "2205231846224d52rmrM117EEAU6fZ2", {
              value: res.data.data.flowId
            })
            vueData.$set(formData.main, "A0006", {
              value: res.data.data.flowId
            })
            resolve()
          }
        })
      } else {
        resolve()
      }
      //拟稿时保存 替换路径
      if (flagNod == 0 && window.location.href.indexOf('listId') == -1) {
        flagNod = 2;
        vueData.$router.replace({
          path: `/commonForm/220523181758hhFIiKebfU4pzg2n2CF/${formStruct.parameters.pk}`,
          query: {
            listId: "220523182508bYzlMHAvNdcuNK8ayHf"
          }
        })
      }
    })
  }

  window.spJS = exportObj;
})();
