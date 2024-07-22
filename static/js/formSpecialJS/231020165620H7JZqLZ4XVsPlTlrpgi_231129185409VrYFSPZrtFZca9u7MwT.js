//陕西政府 收文
(function () {
  const exportObj = {};
  exportObj.initHandle = function (formData, formStruct, vueData) {
    function setSld(packRes) {
      if (packRes && packRes.schema) {
        let valueArr = packRes.value.split(",");
        let textArr = packRes.text.split(",");
        let schemaArr = packRes.schema.split(",");
        let sldValueResArr = [];
        let sldTextResArr = [];
        let sldSchemaResArr = [];
        //其他领导数据
        let qtdValueResArr = [];
        let qtdTextResArr = [];
        let qtdSchemaResArr = [];
        //秘书数据
        let msValueResArr = [];
        let msTextResArr = [];
        let msSchemaResArr = [];
        let allPromise = [];
        for (let i = 0; i < schemaArr.length; i++) {
          if (schemaArr[i].includes("231205010426QKc1GGb1VyNslk0yDSY") || schemaArr[i].includes("2311061653091ScjKMZjRs5Ph3PeUJX")) {
            sldValueResArr.push(valueArr[i]);
            sldTextResArr.push(textArr[i]);
            sldSchemaResArr.push(schemaArr[i]);
            //如果是省长、副省长、秘书长，同步其相关秘书
            let post = dsf.http.post("ctrl/swglsx/getMsData", { leaderId: valueArr[i] })
            allPromise.push(post);
            // post.then(function (result) {
            //   if ("success" == result.data.type) {
            //     let data = result.data.data
            //     if (data) {
            //       for (let i = 0; i < data.length; i++) {
            //         let item = data[i];
            //         msValueResArr.push(item.secretaryId);
            //         msTextResArr.push(item.secretaryName);
            //         msSchemaResArr.push(item.secretarySchema);
            //       }
            //     }
            //   }
            // })
          } else {
            qtdValueResArr.push(valueArr[i]);
            qtdTextResArr.push(textArr[i]);
            qtdSchemaResArr.push(schemaArr[i]);
          }
        }
        let allPromiseObj = Promise.all(allPromise);
        allPromiseObj.then(res => {
          console.log(res);
          res.forEach(item => {
            if (item.data.code == 200 && item.data.data) {
              let userData = item.data.data;
              for (let i = 0; i < userData.length; i++) {
                let userDataItem = userData[i];
                msValueResArr.push(userDataItem.secretaryId);
                msTextResArr.push(userDataItem.secretaryName);
                msSchemaResArr.push(userDataItem.secretarySchema);
              }
            }
          })
          vueData.$set(formData.main, "C-LW-0031", {
            "value": msValueResArr.join(","),
            "text": msTextResArr.join(","),
            "schema": msSchemaResArr.join(",")
          });
        })
        vueData.$set(formData.main, "231025004259dM4i6k80JZojg3iQVlK", {
          "value": sldValueResArr.join(","),
          "text": sldTextResArr.join(","),
          "schema": sldSchemaResArr.join(",")
        });
        vueData.$set(formData.main, "231025004505Rbq1RWK5rkki4QpaUQW", {
          "value": qtdValueResArr.join(","),
          "text": qtdTextResArr.join(","),
          "schema": qtdSchemaResArr.join(",")
        });
      }
    }
    vueData.$bus.on("selectUserBus", function (busObj) {
      console.log(busObj);
      if (busObj.metaData.metaId == "231025004049gIi9de1HYwrqMKGjAtK") {
        setSld(busObj)
      }
    })
  }
  exportObj.saveFilter = function (formData, formStruct, vueData) {
    function beforeSaveForm() {
      //1.添加元数据B0025主题词  当作标题,原B0001来文标题 改放到隐藏域中。B0025添加指定权限,B0001设置保存权限
      let lwlx = formData.main["B0056"].value;//来文类型
      if ("1" == lwlx) {//办文
        vueData.$set(formData.main, "B0001", { "value": "[办文]" + formData.main["B0025"].value })
      } else if ("3" == lwlx) {//阅文
        vueData.$set(formData.main, "B0001", { "value": "[阅文]" + formData.main["B0025"].value })
      } else if ("5" == lwlx) {//简报
        vueData.$set(formData.main, "B0001", { "value": "[简报]" + formData.main["B0025"].value })
      } else if ("7" == lwlx) {//其他
        vueData.$set(formData.main, "B0001", { "value": "[其他]" + formData.main["B0025"].value })
      } else if ("9" == lwlx) {//办文回复
        vueData.$set(formData.main, "B0001", { "value": "[办文回复]" + formData.main["B0025"].value })
      } else if ("11" == lwlx) {//批文回复
        vueData.$set(formData.main, "B0001", { "value": "[批文回复]" + formData.main["B0025"].value })
      } else if ("13" == lwlx) {//分送
        vueData.$set(formData.main, "B0001", { "value": "[分送]" + formData.main["B0025"].value })
      } else {
        vueData.$set(formData.main, "B0001", { "value": formData.main["B0025"].value + formData.main["C-LW-0044"].value })
      }
    }
    return new Promise(function (resolve, reject) {
      beforeSaveForm()
      resolve()
    })
  }
  window.spJS = exportObj;
})();