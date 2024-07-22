(function () {
  // 129112 【北京市委党校国产化适配项目】--移动端，师讯通功能希望点开师讯通图标后有一个弹窗提醒里面输入点提示内容  2022年9月15日14:11:17  @luy
  const exportObj = {};
  let checked = ""
  window.bjswdxchange = () => {
    checked = $("#chk").attr("checked")
    console.log(checked)
  }

  exportObj.init = function (vueData) {
    console.log("init");
    checked = dsf.util.loadLocalStore("bjswdxchange")
    if (checked != "checked" || 1==1) {
      let template = '<div style="color:black;font-size:18px;text-align:left;">　　根据校（院）“六个一流”建设行动计划总目标要求，为了汇聚吸纳教职工智慧，倾听教职工呼声，创新推进民主治校，推动现实问题解决，切实以管理促提升、以服务促发展，促进首善一流党校（行政学院）建设，经校委会研究决定，特以校园网为依托，为全校教职工开通点对点网上交流服务平台——“师讯通”，望广大教职工在使用过程中坚持实事求是、理性发声，真正形成安全良好的闭环服务互动。</div>'
      //template += '<div style="margin-top:10px"><label style="display: flex;align-items: center;justify-content: center;flex-direction: inherit;" for="chk"><input onChange="bjswdxchange()" type="checkbox" name="chk" id="chk" />下次不再提醒</label></div>'
      dsf.layer.alert({
        message: template,
        confirmButtonText: "关闭"
      }, () => {
        // on close
        dsf.util.saveToLocalStore("bjswdxchange", $("#chk").attr("checked"));
      });
    }
  }
  exportObj.initHandle = function (vueData) {
    console.log("initHandle");
  }


  //此处window下面的对象spListJS要和表单spJS的区分，不然列表加载以后再打开表单会被冲掉。
  window.spListJS = exportObj;
})();
