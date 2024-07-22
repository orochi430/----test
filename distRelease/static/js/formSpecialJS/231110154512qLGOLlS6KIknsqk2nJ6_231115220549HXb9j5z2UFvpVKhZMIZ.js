(function () {
  // 监狱局发文
  const exportObj = {};
  exportObj.initHandle = function (formData, formStruct, vueData) {
  };

  exportObj.SelectCyUnitFw = function (formData, formStruct, VueData) {
    VueData.showPerson = true;
    VueData.extra = {
      typesString: "person,department,post,group,privateGroup",
      rootObject: "5",
      multiple: true,
      tabs: [
        {
          key: "self_org",
          action: `fn/user/select/data?types=person&rootObject=2&action=self_org&async=true`,
          urlParams: {},
        },
      ],
    };
    // 重写选人确认后的getSelectUser方法，调用接口
    VueData.getSelectUser = function (data) {
      console.log(data);
      let id = "";
      let name = "";
      data.forEach((ele, i) => {
        i == 0 ? (id += ele.id) : (id += "," + ele.id);
        i == 0 ? (name += ele.name) : (name += "," + ele.name);
      });

      VueData.$set(formData.main, "240228170826DVSLnveBadCLAViFxmz", {
        value: name,
      });  //用户姓名
      VueData.$set(formData.main, "240228170901NaFr1Xa0p9RiSIjSEAP", {
        value: id,
      });  //用户ID
      
      VueData.showPerson = false;

    };
  }

  exportObj.giveOutFw = function (formData, formStruct, VueData) {
    let message
    if (formData.main["240228170901NaFr1Xa0p9RiSIjSEAP"].value) {
      message = '请确认是否发送'
    }else{
      message = '您还未选择分发单位，此操作会直接办结收文流程，请谨慎操作！'
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
        .post(`ctrl/correctionsSend/shareSend`,  {
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

  window.spJS = exportObj;
})();
