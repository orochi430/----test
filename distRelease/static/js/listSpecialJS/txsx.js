(function () {
   
    const exportObj = {};
    exportObj.initHandle = function (vueData) {
      console.log("initHandle");
    }

    // exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
    //     dsf.http.post("fn/remind/read?ids=" + itemValue.id).then(res => {
    //         itemValue.readStatus = 1;
    //       })
    //     console.log(listid);
    //     console.log(itemValue);
    //   }
  
    //此处window下面的对象spListJS要和表单spJS的区分，不然列表加载以后再打开表单会被冲掉。
    window.spListJS = exportObj;
  })();