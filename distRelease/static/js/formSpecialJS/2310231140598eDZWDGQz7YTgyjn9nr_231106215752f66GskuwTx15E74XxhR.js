// 成都一体化收文管理  子流程 字体样式
(function () {
  const exportObj = {};
  exportObj.init = function (vueData){
    console.log(111111,vueData,arguments);
    // dsf.http
    //   .post("fn/handleTipsMessage/queryHandleTipData", {
    //     pk: vueData.formMeta.parameters.pk,
    //     fPnId: vueData.formMeta.parameters.fPnId,
    //   }).then((res) => {
    //     dsf.layer.closeLoading(loading);

    //     if (res.data.type === "success") {
    //       const { showDate, showName, content, mobileShowDate } =
    //         res.data.data.first;
    //       this.showDate = showDate;
    //       this.showName = showName;
    //       this.mobileShowDate = mobileShowDate;
    //       // this.historicalView = historicalView;
    //       // this.content = content.replace(/[ ]/g, "");
    //       this.content = content;
    //       this.count = res.data.data.list.length;
    //       this.list = res.data.data.list;
    //       this.$nextTick(() => {
    //         this.height = this.$refs.fuyan.offsetHeight + 50;
    //         if (this.$refs.flag.offsetHeight <= 50) {
    //           this.more = true;
    //         }
    //       });
    //       if (this.content == "") {
    //         this["metaData"].show = 0;
    //       }
    //     } else {
    //       // dsf.layer.toast(res.data.message);
    //       console.log(res.data.message);
    //       this["metaData"].show = 0;
    //     }
    //   })
    //   .error((err) => {
    //     dsf.layer.closeLoading(loading);
    //     console.log(err);
    //   });
  }
  exportObj.initHandle = function (formData, formStruct, vueData) {
    const cssRule = `.layout_box{font-family: KT_GB2312 !important;}`; // 特殊样式写在此
    let resetStyle = document.createElement("style");
    resetStyle.type = "text/css";
    vueData.$el.appendChild(resetStyle);
    resetStyle.innerHTML = cssRule;
    let metaIds = ["C-LW-0021", "B0051", "B0052", "B0060", "B0018", "B0005", "B0015", "B0006", "C-LW-0002", "C-LW-0003", "C-LW-0027", "B0003", "B0012", "C-LW-0006", "C-LW-0020", "C-LW-0030","controlHandleTipsMessage"];
    // this["metaData"].show = 0;
    metaIds.forEach(item => {
      let obj = formStruct.controls.find(it => it.metaId == item && !it.privilege.editable && it.privilege.visible);
      if (obj &&(formData.main[item].value == "" || formData.main[item].text == "") ) {
        obj.show = 0;
        obj.privilege.visible = false;
      }

    })
  }
  window.spJS = exportObj
})();
