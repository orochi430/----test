/**
 * 信息填报表单特殊处理
 */
 const exportObj = {};
 exportObj.initHandle = function (formData, formStruct, vueData) {
     //console.log("formStruct",formStruct);
     if(vueData.$route.query.projectName){
      let projectName=vueData.$route.query.projectName;
      vueData.$set(vueData.formData.main, "C-SITUATION-DISPATCH-001", {
        value: projectName
      })
     console.log("projectName",projectName);
    }
    if(vueData.$route.query.B0054){
      let B0054=vueData.$route.query.B0054;
      vueData.$set(vueData.formData.main, "B0054", {
        value: B0054
      })
     console.log("B0054",B0054);
    }
    if(vueData.$route.query.CPROJECTMAINTAIN006){
      let CPROJECTMAINTAIN006=vueData.$route.query.CPROJECTMAINTAIN006;
      vueData.$set(vueData.formData.main, "C-SITUATION-DISPATCH-027", {
        value: CPROJECTMAINTAIN006
      })
     console.log("C-SITUATION-DISPATCH-027",CPROJECTMAINTAIN006);
    }
 }

  //等价于saveFilter <=> saveBefore
  exportObj.saveFilter = function (formData, formStruct, vueData) {
    function dateFormat(date, fmt) {
      //日期格式化
      date = new Date(date);
      var o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'H+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        S: date.getMilliseconds()
      };
      var year = date.getFullYear().toString();
      year = year.length >= 4 ? year : '0000'.substr(0, 4 - year.length) + year;

      if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (year + '').substr(4 - RegExp.$1.length));
      for (var k in o)
        if (new RegExp('(' + k + ')').test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length === 1 ?
            o[k] :
            ('00' + o[k]).substr(('' + o[k]).length)
          );
      return fmt;
    }
    return new Promise(function (resolve, reject) {
        vueData.$set(vueData.formData.main, "C-SITUATION-DISPATCH-002", {
          value: dateFormat(new Date(),'yyyy-MM-dd HH:mm:ss')
        })
        //console.log("dateFormat(new Date(),'yyyy-MM-dd HH:mm:ss')",dateFormat(new Date(),'yyyy-MM-dd HH:mm:ss'));
        resolve();
        //reject();;
    });
  }
  export default exportObj;