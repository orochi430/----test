// 静安区政府收文
; (function () {
  const exportObj = {}
  exportObj.initHandle = function (formData, formStruct, vueData) {

    vueData.formMeta.controls.forEach((item, index) => {
      if (item.controlType == "extraPageNotInitView") {
        if (item.extra?.extraPageList?.length > 0) {
          vueData.$set(item, "show", 1)
        } else {
          vueData.$set(item, "show", 0)
        }
      }
    });

    let controlMergeFile = formStruct.controls.find(ctr => ctr.controlType == 'controlTemplateCode')
    if (controlMergeFile) {
      controlMergeFile.controlType = 'controlMergeFile'
      controlMergeFile.showLabel = false
      controlMergeFile.showLable = false
    }
    let bt = formData.main["B0001"].value;//获取标题
    let lwdw = formData.main["C-LW-0001"].value;//来文单位
    if (lwdw != null && lwdw != "" && lwdw != undefined) {
      if (lwdw.match("国务院") || lwdw.match("中央") || lwdw.match("省")) {
        vueData.$set(formData.main, "C-LW-0032", { "value": 1, "text": "中央及其他省市阅件" });
      }
      if (lwdw.match("上海市")) {
        vueData.$set(formData.main, "C-LW-0032", { "value": 2, "text": "本市各部门阅件" });
      }
      if (lwdw.match("市发展改革委") || lwdw.match("市委") || lwdw.match("中共上海市委办公厅")) {
        if (bt.match("任职") || bt.match("任免") || bt.match("免职")) {
          vueData.$set(formData.main, "C-LW-0032", { "value": 3, "text": "市委阅件-人事任免" });
        } else {
          vueData.$set(formData.main, "C-LW-0032", { "value": 4, "text": "市委阅件 - 其他文件" });
        }
      }
    }
    let fsdw = formStruct.controls.find(ctr => ctr.metaId == 'C-LW-0031')
    if ((!formData.main['C-LW-0031'] || !formData.main['C-LW-0031'].value) && (fsdw && !fsdw.privilege.editable)) {
      fsdw.show = false
    }


    function changeLunCi(val) {
      dsf.http
        .post("/ctrl/receivedocuments/getProposed", {
          "fid": formStruct.parameters.pk,
          "batchNum": val,
        })
        .then((res) => {
          console.log(res);
          if (res && res.data && res.data.code == 200) {
            let data = res.data.data
            vueData.$set(formData.main, "C-LW-0047", { "value": data.leaderText, "text": "" });
            vueData.$set(formData.main, "C-LW-0020", { "value": data.opinion });


            vueData.$set(formData.main, "B0006", { "text": data.jjcdText, "value": data.jjcd });
            vueData.$set(formData.main, "B0029", { "text": data.isRemoteText, "value": data.isRemote });
            vueData.$set(formData.main, "C-LW-0024", { "value": data.content1 });


            if (data.jjcd == "1") { //平件
              //将附送相关模板和备注都隐藏掉 并且给他设置默认值
              vueData.formMeta.controls.forEach((item, index) => {
                if (item.metaId == "B0029" || item.metaId == "C-LW-0024") {
                  vueData.$set(item, "show", 0)
                }
              });
            } else { //急件  显示复送部门
              vueData.formMeta.controls.forEach((item, index) => {
                if (item.metaId == "B0029") {
                  vueData.$set(item, "show", 1)
                }
              });
            }

            if (data.isRemote == "1") { //复送部门
              vueData.formMeta.controls.forEach((item, index) => {
                if (item.metaId == "C-LW-0024") {
                  vueData.$set(item, "show", 1)
                }
              });
            } else {
              vueData.formMeta.controls.forEach((item, index) => {
                if (item.metaId == "C-LW-0024") {
                  vueData.$set(item, "show", 0)
                }
              });
            }


            vueData.formMeta.controls.forEach((item, index) => {
              if (item.controlId == "IEKxSIZKntkHBGqf") {
                if (data?.lwOpinoinDTOList?.length > 0) {
                  vueData.$set(item.extra, "list", data.lwOpinoinDTOList);
                  vueData.$set(item, "show", 1)
                } else {
                  vueData.$set(item, "show", 0)
                }

                // item.extra.list = item.extra.list.concat(data.lwOpinoinDTOList)
              }

              if (item.controlId == "B0006") { //紧急程度

              }

            });

            // let index = formStruct.controls.findIndex(ctr => ctr.controlType == 'controlOpinionView')
            // if (index >= 0 && data.lwOpinoinDTOList) {
            //   vueData.$set(formStruct.controls[index].extra, "list", data.lwOpinoinDTOList);
            // }
          }
        });
    }

    let currentLc = formStruct.controls.find(ctr => ctr.metaId == '2310111806188AzT5hdfrOKwy2Seei7')
    changeLunCi(currentLc?.defaultValue?.value)

    //监听轮次的改动
    vueData.$bus.on("checkVal", function (busObj) {
      console.log(busObj)
      //获取到轮次之后开始请求数据  busObj.value
      if (busObj.metaData.metaId == "2310111806188AzT5hdfrOKwy2Seei7") {
        changeLunCi(busObj.value)
      }

      //紧急程度属性联动
      if (busObj.metaData.metaId == "B0006") {
        if (busObj.value == "1") { //平件
          //将附送相关模板和备注都隐藏掉 并且给他设置默认值
          vueData.formMeta.controls.forEach((item, index) => {
            if (item.metaId == "B0029" || item.metaId == "C-LW-0024") {
              vueData.$set(item, "show", 0)
            }
          });
          vueData.$set(formData.main, "B0029", { "text": "否", "value": "-1" });
          vueData.$set(formData.main, "C-LW-0024", { "value": "" });

        } else { //急件  显示复送部门
          vueData.formMeta.controls.forEach((item, index) => {
            if (item.metaId == "B0029") {
              vueData.$set(item, "show", 1)
              vueData.$set(formData.main, "C-LW-0024", { "value": "" });
            }
          });
        }
      }
    })



  }


  exportObj.saveAfter = function (vueData, obj, formData) {
    console.log("------------------------")
    //先获取默认意见
    dsf.http
      .post("fn/mobileFormComment/getH5CurrentComment", {
        pk: vueData.formMeta.parameters.pk,
        pid: vueData.formMeta.parameters.pId,
        pnid: vueData.formMeta.parameters.pnId,
        moduleId: vueData.formMeta.parameters.moduleId
      })
      .then(({ data }) => {
        if (data.data?.opinion?.length) {
          //调用保存方法进行保存
          dsf.http
            .post("fn/receivedocuments/updateOpinion", {
              "fid": vueData.formMeta.parameters.pk, //pk
              "batchNum": formData.main['2310111806188AzT5hdfrOKwy2Seei7'].value,   //-拟办次数   
              "opinion": formData.main['C-LW-0020'].value,  //元数据：C-LW-0020
              "ssLeader": formData.main['C-LW-0047'].value, //-送审领导  元数据：C-LW-0047
              "jjcd": formData.main['B0006'].value,
              "fjxgbm": formData.main['B0029'].value,
              "bz": formData.main['C-LW-0024'].value,
              "pnId": vueData.formMeta.parameters.pnId,
              "nodeId": vueData.formMeta.parameters.nodeId,
              "content": data.data?.opinion  //领导填写的意见
            })
            .then(({ data }) => {
              // dsf.layer.toast("保存成功", undefined, () => vueData.$router.go(0));
              dsf.layer.toast("保存成功")
            });
        }
      });

  }


  exportObj.sendAfter = function (formData, formMeta, vueData) {
    console.log('vueData', vueData.sendLineIds, formData)
    if (vueData.sendLineIds.includes("wTtrzFgQ7WHy0Sw")) {
      let params = {
        "pk": formMeta.parameters.pk
      };
      dsf.http.post("ctrl/statanLw/addDfwg", params).then(res => {
        if (res.data.code == 200) {
          console.log("===============  发送成功 ===========================")
        }
      }).error(function () { })
    }
  }

  window.spJS = exportObj
})()
