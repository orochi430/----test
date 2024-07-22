/**
 * 杭州党校  校委会 议题申报 会后材料上传附件
 * 210714140041n1ItTl74eVXpWCU2udz/230308102448a8OBHW25DN4fXOvZGeh?listId=210714143019UldfmAWkd5yrZV1WlqR   查看节点
 * listId=210714151401H16eMtIUTZEGuS5iYDb&method=draft&moduleId=210714140041n1ItTl74eVXpWCU2udz&validateByList=1&pk=" + pk  编辑
 */
(function() {
  const exportObj = {};
  exportObj.link = function(listid, moduleId, pk, vueData, itemValue) { 
    if (itemValue["210812150137UmsTsX4oHclQldgoTle"] == "1") {
      vueData.$router.push({
        path:`/commonForm/${moduleId}/${pk}`,
        query:{
            listId:"210714151401H16eMtIUTZEGuS5iYDb",
            method:"draft",
            validateByList:"1"
        }
      })  
    } else {
      vueData.$router.push({
        path: `/commonForm/${moduleId}/${pk}`,
        query: {
            listId:"210714143019UldfmAWkd5yrZV1WlqR"
        }
      });
    }
  };

  window.spListJS = exportObj;
})();
