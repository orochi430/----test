
//电气 阅文专用单列表
(function () {
  const exportObj = {};
  exportObj.dataFilter = function (listData, vueData) {
    listData.forEach(item => {
      item.dataValue.time = item.dataValue.time.split(' ')[0]
    });
    setTimeout(() => {
      vueData.columns = [
        {
          "showCategory": "mainTitle",
          "showName": "标题",
          "showMetaColumn": "bt"
        },
        {
          "showCategory": "subTitleA",
          "showName": "文件种类",
          "icon": "iconwenjianleixing",
          "showMetaColumn": "moduleName"
        },
        {
          "showCategory": "subTitleC",
          "showName": "来自张三",
          "icon": "iconlaiyuan",
          "showMetaColumn": "name"
        },
        {
          "showCategory": "subTitleC",
          "showName": "时间",
          "icon": "iconriqi",
          "showMetaColumn": "time"
        }
      ]
    }, 100)
  };
  exportObj.yueBi = function (itemValue, vueData) {
    vueData.$toast.loading({
      forbidClick: true,
      message: "提交中"
    });
    dsf.http
      .post("fn/mobileToReadOperation/readed", {
        infoIds: itemValue.dataValue.info_id,
        distribIds: itemValue.dataValue.distribId
      })
      .then(({
        data
      }) => {
        const {
          message,
          result,
          type
        } = data;
        if (type === "success" || result) {
          if (itemValue.dataValue.moduleId == "221122111554rnFC2dUhof52qg6sXWI") {
            dsf.http.post("ctrl/ReadCommonController/readedAutoSend", {
              infoid: itemValue.dataValue.info_id
            }).then(result => {
              if (result.data.type == "success") {
                let data = result.data.data;
                if (!data) {
                  vueData.onRefresh && vueData.onRefresh()
                  return
                }
                let param = {
                  todoData: JSON.stringify(data)
                }
                dsf.http.post("ctrl/flow/batchEndNode", param).then(result => {
                  if (result.data.type == "success") {
                    dsf.http.post("ctrl/ReadCommonController/deletePnodesAbn", {
                      infoid: itemValue.dataValue.info_id
                    }).then((res) => {
                      if (res.data.type = "success") vueData.onRefresh && vueData.onRefresh();
                    })
                  } else {
                    dsf.layer.toast(result.data.message)
                  }
                })
              } else {
                dsf.layer.toast(result.data.message)
              }
            })
          } else {
            vueData.onRefresh && vueData.onRefresh();
            dsf.layer.toast(message);
          }
        } else {
          dsf.layer.toast(message)
        }

      })

  }
  window.spListJS = exportObj;
})()
